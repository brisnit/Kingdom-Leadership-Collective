"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useInView } from "@/lib/useInView";

interface DashboardMetricProps {
  label: string;
  value: number;
  caption: string;
  className?: string;
}

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Monochrome metric card with a square corner and a thin progress bar.
 * The number counts up and the bar fills once the card scrolls into view —
 * "growth, not comparison." Honors prefers-reduced-motion.
 */
export function DashboardMetric({
  label,
  value,
  caption,
  className,
}: DashboardMetricProps) {
  const clamped = Math.max(0, Math.min(100, value));
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.4 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (prefersReducedMotion()) {
      setDisplay(clamped);
      return;
    }

    const duration = 1100;
    let raf = 0;
    let start = 0;

    const tick = (now: number) => {
      if (!start) start = now;
      const t = Math.min((now - start) / duration, 1);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.round(eased * clamped));
      if (t < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, clamped]);

  return (
    <div
      ref={ref}
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
          {display}
          <span className="ml-0.5 align-top text-base text-gold">%</span>
        </span>
      </div>

      <div className="mt-10">
        <div className="h-px w-full bg-paper/15">
          <div
            className="metric-bar h-px bg-gold transition-[width] duration-[1100ms] ease-[cubic-bezier(0.33,1,0.68,1)]"
            style={{ width: `${inView ? clamped : 0}%` }}
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
