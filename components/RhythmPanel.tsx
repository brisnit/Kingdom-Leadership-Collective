import { cn } from "@/lib/utils";

interface RhythmDetail {
  label: string;
  value: string;
}

interface RhythmPanelProps {
  index: string;
  eyebrow: string;
  title: string;
  intro: string;
  details: RhythmDetail[];
  outcome?: string;
  className?: string;
  /** Render light-on-black for dark sections. */
  dark?: boolean;
}

/**
 * Tall editorial panel for the annual rhythm. Labeled detail rows are
 * separated by thin rules rather than boxes — magazine, not dashboard.
 */
export function RhythmPanel({
  index,
  eyebrow,
  title,
  intro,
  details,
  outcome,
  className,
  dark = false,
}: RhythmPanelProps) {
  const rule = dark ? "border-paper/15" : "border-line-light";

  return (
    <article
      className={cn(
        "flex h-full flex-col border p-8 md:p-10",
        dark ? "border-paper/15 bg-ink text-paper" : "border-line-light bg-paper",
        className,
      )}
    >
      <div className="flex items-baseline justify-between">
        <span
          className={cn(
            "text-[0.7rem] font-medium uppercase tracking-micro",
            dark ? "text-paper/50" : "text-ink/50",
          )}
        >
          {eyebrow}
        </span>
        <span
          className={cn(
            "font-serif text-xl",
            dark ? "text-paper/25" : "text-ink/25",
          )}
        >
          {index}
        </span>
      </div>

      <h3
        className={cn(
          "mt-8 font-serif text-3xl leading-tight",
          dark ? "text-paper" : "text-ink",
        )}
      >
        {title}
      </h3>
      <p
        className={cn(
          "mt-4 text-sm leading-relaxed",
          dark ? "text-paper/65" : "text-ink/65",
        )}
      >
        {intro}
      </p>

      <dl className={cn("mt-8 flex-1 border-t", rule)}>
        {details.map((d) => (
          <div
            key={d.label}
            className={cn("flex flex-col gap-1 border-b py-4", rule)}
          >
            <dt
              className={cn(
                "text-[0.65rem] font-medium uppercase tracking-wider2",
                dark ? "text-paper/45" : "text-ink/45",
              )}
            >
              {d.label}
            </dt>
            <dd
              className={cn(
                "text-sm leading-relaxed",
                dark ? "text-paper/80" : "text-ink/80",
              )}
            >
              {d.value}
            </dd>
          </div>
        ))}
      </dl>

      {outcome && (
        <p
          className={cn(
            "mt-8 text-sm leading-relaxed",
            dark ? "text-paper/75" : "text-ink/75",
          )}
        >
          <span
            className={cn(
              "font-serif italic",
              dark ? "text-paper" : "text-ink",
            )}
          >
            Departs with —{" "}
          </span>
          {outcome}
        </p>
      )}
    </article>
  );
}
