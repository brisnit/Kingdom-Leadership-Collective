"use client";

import { useActionState } from "react";
import { saveDailyEntry, type ActionState } from "@/app/dashboard/actions";
import type { DailyPeriodDef } from "@/lib/domain";
import type { DailyContent } from "@/lib/dashboard-data";
import { SubmitButton } from "@/components/auth/SubmitButton";

const initial: ActionState = {};

interface DailyPeriodFormProps {
  def: DailyPeriodDef;
  entryDate: string;
  content: DailyContent;
}

export function DailyPeriodForm({ def, entryDate, content }: DailyPeriodFormProps) {
  const [result, formAction] = useActionState(saveDailyEntry, initial);

  return (
    <form action={formAction} className="space-y-8">
      <input type="hidden" name="time_of_day" value={def.key} />
      <input type="hidden" name="entry_date" value={entryDate} />

      <p className="max-w-xl text-sm leading-relaxed text-ink/60">{def.blurb}</p>

      <div className="space-y-px bg-line-light">
        {def.fields.map((field) => (
          <div key={field.name} className="bg-paper py-7">
            <div className="flex items-baseline gap-4">
              <span className="text-[0.62rem] font-medium uppercase tracking-wider2 text-ink/40">
                {field.label}
              </span>
            </div>
            <p className="mt-2 font-serif text-xl leading-snug text-ink">
              {field.prompt}
            </p>
            {field.multiline ? (
              <textarea
                name={field.name}
                rows={3}
                defaultValue={content[field.name] ?? ""}
                placeholder={field.helper ?? "Write freely…"}
                className="mt-4 w-full resize-none border border-ink/20 bg-transparent px-4 py-3 text-sm leading-relaxed text-ink placeholder:text-ink/30 focus:border-ink focus:outline-none"
              />
            ) : (
              <input
                name={field.name}
                type="text"
                defaultValue={content[field.name] ?? ""}
                placeholder={field.helper ?? ""}
                className="mt-4 w-full border border-ink/20 bg-transparent px-4 py-3 text-sm text-ink placeholder:text-ink/30 focus:border-ink focus:outline-none"
              />
            )}
          </div>
        ))}
      </div>

      {result.error && (
        <p className="border border-ink/30 px-4 py-3 text-sm text-ink/80">
          {result.error}
        </p>
      )}
      {result.ok && (
        <p className="border border-ink bg-ink px-4 py-3 text-sm text-paper">
          Saved. Your {def.label.toLowerCase()} rhythm is recorded for today.
        </p>
      )}

      <div className="max-w-xs">
        <SubmitButton
          pendingLabel="Saving…"
          className="bg-ink text-paper hover:bg-ink-soft"
        >
          Save {def.label}
        </SubmitButton>
      </div>
    </form>
  );
}
