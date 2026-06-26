"use client";

import { useState } from "react";
import { DAILY_PERIODS, type TimeOfDay } from "@/lib/domain";
import type { TodayEntries } from "@/lib/dashboard-data";
import { DailyPeriodForm } from "./DailyPeriodForm";
import { cn } from "@/lib/utils";

interface DailyRhythmProps {
  entryDate: string;
  entries: TodayEntries;
  /** Which period to open first (by clock). */
  initialPeriod: TimeOfDay;
}

export function DailyRhythm({
  entryDate,
  entries,
  initialPeriod,
}: DailyRhythmProps) {
  const [active, setActive] = useState<TimeOfDay>(initialPeriod);

  return (
    <div className="grid gap-px border border-line-light bg-line-light lg:grid-cols-[16rem_1fr]">
      {/* Period rail */}
      <ul className="bg-paper lg:border-r lg:border-line-light">
        <div className="flex lg:flex-col">
          {DAILY_PERIODS.map((p, i) => {
            const isActive = p.key === active;
            const done =
              entries[p.key] && Object.keys(entries[p.key]!).length > 0;
            return (
              <li key={p.key} className="flex-1">
                <button
                  type="button"
                  onClick={() => setActive(p.key)}
                  aria-pressed={isActive}
                  className={cn(
                    "flex w-full items-center justify-between gap-3 border-b border-line-light px-5 py-5 text-left transition-colors duration-300 lg:px-7 lg:py-6",
                    isActive
                      ? "bg-ink text-paper"
                      : "bg-paper text-ink/55 hover:text-ink",
                  )}
                >
                  <span className="flex items-baseline gap-3">
                    <span
                      className={cn(
                        "text-[0.65rem] tabular-nums tracking-wider2",
                        isActive ? "text-paper/45" : "text-ink/35",
                      )}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-serif text-xl">{p.label}</span>
                  </span>
                  <span
                    aria-hidden
                    className={cn(
                      "h-1.5 w-1.5",
                      done
                        ? isActive
                          ? "bg-paper"
                          : "bg-ink"
                        : isActive
                          ? "border border-paper/50"
                          : "border border-ink/30",
                    )}
                  />
                </button>
              </li>
            );
          })}
        </div>
      </ul>

      {/* Active period form */}
      <div className="bg-paper p-7 md:p-10">
        {DAILY_PERIODS.map((p) =>
          p.key === active ? (
            <div key={p.key}>
              <div className="mb-8 flex items-baseline justify-between border-b border-line-light pb-6">
                <h2 className="font-serif text-3xl tracking-tight">{p.label}</h2>
                <span className="text-[0.65rem] uppercase tracking-wider2 text-ink/40">
                  {entries[p.key] && Object.keys(entries[p.key]!).length > 0
                    ? "Recorded"
                    : "Not yet recorded"}
                </span>
              </div>
              <DailyPeriodForm
                def={p}
                entryDate={entryDate}
                content={entries[p.key] ?? {}}
              />
            </div>
          ) : null,
        )}
      </div>
    </div>
  );
}
