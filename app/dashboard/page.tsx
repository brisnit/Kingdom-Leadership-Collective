import Link from "next/link";
import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import {
  getScoreboardState,
  overallScore,
  getEntriesForDate,
} from "@/lib/dashboard-data";
import { DIMENSIONS, DAILY_PERIODS } from "@/lib/domain";
import { todayISO, formatLongDate } from "@/lib/date";
import { ScoreMeter } from "@/components/dashboard/ScoreMeter";
import { Eyebrow } from "@/components/Eyebrow";
import { cn } from "@/lib/utils";

export const metadata: Metadata = { title: "Overview — Kingdom Leadership Collective" };

export default async function DashboardOverview() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const userId = user!.id;
  const today = todayISO();

  const [state, todayEntries, profileRes] = await Promise.all([
    getScoreboardState(supabase, userId),
    getEntriesForDate(supabase, userId, today),
    supabase.from("profiles").select("full_name").eq("id", userId).maybeSingle(),
  ]);

  const overall = overallScore(state);
  const firstName =
    profileRes.data?.full_name?.trim().split(" ")[0] ||
    (user!.email ? user!.email.split("@")[0] : "Leader");

  const completedPeriods = DAILY_PERIODS.filter((p) => {
    const c = todayEntries[p.key];
    return c && Object.keys(c).length > 0;
  }).length;

  return (
    <div className="mx-auto max-w-editorial px-6 py-14 md:px-10 md:py-20 lg:px-14">
      {/* Greeting */}
      <div className="flex flex-col gap-2">
        <Eyebrow>{formatLongDate(today)}</Eyebrow>
        <h1 className="mt-4 font-serif text-4xl leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
          Good to see you, {firstName}.
        </h1>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-ink/60">
          A single, honest view of the life you are building — measured against
          who you were, never against the leader beside you.
        </p>
      </div>

      {/* Top band: overall + today's rhythm */}
      <div className="mt-12 grid gap-px border border-line-light bg-line-light md:grid-cols-[1fr_1.4fr]">
        {/* Overall */}
        <div className="flex flex-col justify-between bg-ink p-8 text-paper md:p-10">
          <span className="text-[0.65rem] font-medium uppercase tracking-wider2 text-paper/50">
            Composite Standing
          </span>
          <div className="mt-10">
            <span className="font-serif text-7xl leading-none tabular-nums">
              {overall ?? "—"}
              {overall !== null && (
                <span className="ml-1 align-top text-2xl text-paper/40">%</span>
              )}
            </span>
            <p className="mt-5 max-w-xs text-xs leading-relaxed text-paper/50">
              {overall === null
                ? "Begin by assessing your five scoreboards to establish a baseline."
                : "The mean of your five scoreboards. Growth here reflects a whole life moving, not a single number."}
            </p>
          </div>
        </div>

        {/* Today's rhythm */}
        <div className="bg-paper p-8 md:p-10">
          <div className="flex items-center justify-between">
            <span className="text-[0.65rem] font-medium uppercase tracking-wider2 text-ink/45">
              Today&apos;s Rhythm
            </span>
            <span className="text-[0.65rem] uppercase tracking-wider2 text-ink/40">
              {completedPeriods} / 3 complete
            </span>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-px border border-line-light bg-line-light">
            {DAILY_PERIODS.map((p) => {
              const done =
                todayEntries[p.key] &&
                Object.keys(todayEntries[p.key]!).length > 0;
              return (
                <Link
                  key={p.key}
                  href="/dashboard/today"
                  className={cn(
                    "group flex flex-col justify-between p-5 transition-colors duration-300 md:p-6",
                    done ? "bg-ink text-paper" : "bg-paper hover:bg-paper-soft",
                  )}
                >
                  <span
                    className={cn(
                      "text-[0.6rem] font-medium uppercase tracking-wider2",
                      done ? "text-paper/55" : "text-ink/45",
                    )}
                  >
                    {p.label}
                  </span>
                  <span
                    className={cn(
                      "mt-10 text-[0.65rem] uppercase tracking-wider2",
                      done ? "text-paper" : "text-ink/55",
                    )}
                  >
                    {done ? "Recorded" : "Open"}
                  </span>
                </Link>
              );
            })}
          </div>

          <Link
            href="/dashboard/today"
            className="mt-6 inline-flex text-[0.7rem] font-medium uppercase tracking-wider2 text-ink underline underline-offset-4 hover:text-ink/60"
          >
            Continue today&apos;s rhythm →
          </Link>
        </div>
      </div>

      {/* Five scoreboards */}
      <div className="mt-20">
        <div className="flex items-end justify-between border-b border-line-light pb-6">
          <div>
            <Eyebrow>The Five Scoreboards</Eyebrow>
            <h2 className="mt-5 font-serif text-3xl tracking-tight sm:text-4xl">
              What Matters Most
            </h2>
          </div>
          <Link
            href="/dashboard/scoreboards"
            className="hidden text-[0.7rem] font-medium uppercase tracking-wider2 text-ink underline underline-offset-4 hover:text-ink/60 sm:inline"
          >
            Update assessment →
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-px bg-line-dark sm:grid-cols-2 lg:grid-cols-3">
          {DIMENSIONS.map((d) => (
            <ScoreMeter
              key={d.key}
              label={d.label}
              scoreboard={d.scoreboard}
              value={state[d.key].current}
              previous={state[d.key].previous}
              description={d.description}
            />
          ))}
          {/* Closing tile → action */}
          <Link
            href="/dashboard/scoreboards"
            className="group flex flex-col justify-between border border-line-dark bg-ink p-7 transition-colors duration-300 hover:bg-ink-soft md:p-8"
          >
            <span className="text-[0.65rem] font-medium uppercase tracking-wider2 text-paper/50">
              Assessment
            </span>
            <span className="mt-10 font-serif text-2xl leading-snug text-paper">
              Record where you stand today →
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
