"use client";

import { useActionState, useState } from "react";
import { saveScoreboards, type ActionState } from "@/app/dashboard/actions";
import { DIMENSIONS, type Dimension } from "@/lib/domain";
import type { ScoreboardState } from "@/lib/dashboard-data";
import { SubmitButton } from "@/components/auth/SubmitButton";
import { cn } from "@/lib/utils";

const initial: ActionState = {};

export function ScoreboardForm({ state }: { state: ScoreboardState }) {
  const [result, formAction] = useActionState(saveScoreboards, initial);

  // Live values so the meter fills as the leader sets each score.
  const [values, setValues] = useState<Record<Dimension, string>>(() => {
    const seed = {} as Record<Dimension, string>;
    for (const d of DIMENSIONS) {
      seed[d.key] =
        state[d.key].current !== null ? String(state[d.key].current) : "";
    }
    return seed;
  });

  const setValue = (key: Dimension, raw: string) => {
    if (raw === "") return setValues((v) => ({ ...v, [key]: "" }));
    const n = Math.max(0, Math.min(100, Math.round(Number(raw) || 0)));
    setValues((v) => ({ ...v, [key]: String(n) }));
  };

  return (
    <form action={formAction} className="space-y-px bg-line-light">
      {DIMENSIONS.map((d) => {
        const fill = values[d.key] === "" ? 0 : Number(values[d.key]);
        return (
          <div key={d.key} className="bg-paper p-7 md:p-9">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto]">
              <div>
                <div className="flex items-baseline gap-4">
                  <h3 className="font-serif text-2xl text-ink">{d.label}</h3>
                  <span className="text-[0.65rem] uppercase tracking-wider2 text-ink/40">
                    {d.scoreboard}
                  </span>
                </div>
                <p className="mt-2 max-w-lg text-sm leading-relaxed text-ink/60">
                  {d.description}
                </p>

                {/* Live meter */}
                <div className="mt-6 h-px w-full max-w-lg bg-ink/15">
                  <div
                    className="h-px bg-ink transition-[width] duration-300"
                    style={{ width: `${fill}%` }}
                  />
                </div>
              </div>

              {/* Square number entry */}
              <div className="flex items-start gap-3">
                <label className="block">
                  <span className="sr-only">{d.label} score</span>
                  <input
                    name={`score_${d.key}`}
                    type="number"
                    min={0}
                    max={100}
                    inputMode="numeric"
                    value={values[d.key]}
                    onChange={(e) => setValue(d.key, e.target.value)}
                    placeholder="—"
                    className="w-24 border border-ink/25 bg-transparent px-3 py-3 text-center font-serif text-3xl tabular-nums text-ink focus:border-ink focus:outline-none"
                  />
                </label>
                <span className="pt-4 text-sm text-ink/40">/ 100</span>
              </div>
            </div>

            <label className="mt-6 block">
              <span className="text-[0.6rem] font-medium uppercase tracking-wider2 text-ink/40">
                Reflection (optional)
              </span>
              <textarea
                name={`reflection_${d.key}`}
                rows={2}
                defaultValue={state[d.key].reflection ?? ""}
                placeholder="What's behind this number right now?"
                className="mt-2 w-full resize-none border border-ink/20 bg-transparent px-4 py-3 text-sm text-ink placeholder:text-ink/30 focus:border-ink focus:outline-none"
              />
            </label>
          </div>
        );
      })}

      <div className="bg-paper p-7 md:p-9">
        {result.error && (
          <p className="mb-5 border border-ink/30 px-4 py-3 text-sm text-ink/80">
            {result.error}
          </p>
        )}
        {result.ok && (
          <p className="mb-5 border border-ink bg-ink px-4 py-3 text-sm text-paper">
            Assessment recorded. Your standing is updated.
          </p>
        )}
        <div className={cn("max-w-xs")}>
          <SubmitButton
            pendingLabel="Recording…"
            className="bg-ink text-paper hover:bg-ink-soft"
          >
            Record Assessment
          </SubmitButton>
        </div>
        <p className="mt-4 text-xs leading-relaxed text-ink/45">
          Each save creates a new dated reading, so your history — and your
          growth — is preserved.
        </p>
      </div>
    </form>
  );
}
