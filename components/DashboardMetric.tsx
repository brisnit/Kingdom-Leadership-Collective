import { cn } from "@/lib/utils";

interface DashboardMetricProps {
  label: string;
  value: number;
  caption: string;
  className?: string;
}

/**
 * Monochrome metric card with a square corner and a thin progress bar.
 * "Growth, not comparison" — the number reads as formation, not a score.
 */
export function DashboardMetric({
  label,
  value,
  caption,
  className,
}: DashboardMetricProps) {
  const clamped = Math.max(0, Math.min(100, value));

  return (
    <div
      className={cn(
        "flex flex-col justify-between border border-line-dark bg-ink p-7 md:p-8",
        className,
      )}
    >
      <div className="flex items-start justify-between">
        <span className="text-[0.65rem] font-medium uppercase tracking-wider2 text-paper/50">
          {label}
        </span>
        <span className="font-serif text-3xl leading-none text-paper tabular-nums">
          {clamped}
          <span className="ml-0.5 align-top text-base text-paper/45">%</span>
        </span>
      </div>

      <div className="mt-10">
        <div className="h-px w-full bg-paper/15">
          <div
            className="h-px bg-paper"
            style={{ width: `${clamped}%` }}
            role="progressbar"
            aria-valuenow={clamped}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={label}
          />
        </div>
        <p className="mt-4 text-xs leading-relaxed text-paper/55">{caption}</p>
      </div>
    </div>
  );
}
