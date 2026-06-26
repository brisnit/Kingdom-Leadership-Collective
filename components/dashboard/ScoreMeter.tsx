import { cn } from "@/lib/utils";

interface ScoreMeterProps {
  label: string;
  scoreboard: string;
  value: number | null;
  previous?: number | null;
  description?: string;
  className?: string;
}

/**
 * A single scoreboard reading: large number, thin progress rule, and a quiet
 * delta versus the prior assessment. Monochrome, square, on black.
 */
export function ScoreMeter({
  label,
  scoreboard,
  value,
  previous,
  description,
  className,
}: ScoreMeterProps) {
  const has = typeof value === "number";
  const delta =
    has && typeof previous === "number" ? value! - previous : null;

  return (
    <div
      className={cn(
        "flex h-full flex-col justify-between border border-line-dark bg-ink p-7 md:p-8",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <span className="text-[0.65rem] font-medium uppercase tracking-wider2 text-paper/50">
            {label}
          </span>
          <p className="mt-1 text-[0.7rem] text-paper/35">{scoreboard}</p>
        </div>
        <span className="font-serif text-4xl leading-none text-paper tabular-nums">
          {has ? value : "—"}
          {has && <span className="ml-0.5 align-top text-base text-paper/40">%</span>}
        </span>
      </div>

      <div className="mt-8">
        <div className="h-px w-full bg-paper/15">
          <div
            className="h-px bg-paper transition-[width] duration-700"
            style={{ width: `${has ? value : 0}%` }}
          />
        </div>
        <div className="mt-4 flex items-center justify-between">
          {description ? (
            <p className="max-w-[18rem] text-xs leading-relaxed text-paper/50">
              {description}
            </p>
          ) : (
            <span />
          )}
          {delta !== null && delta !== 0 && (
            <span className="shrink-0 text-[0.65rem] uppercase tracking-wider2 text-paper/55">
              {delta > 0 ? `▲ +${delta}` : `▼ ${delta}`}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
