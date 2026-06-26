import { cn } from "@/lib/utils";

interface ResourceGridProps {
  items: string[];
  className?: string;
}

/**
 * Refined index-style grid. Each cell is a numbered, hover-inverting
 * rectangle joined by shared hairline rules (negative margins).
 */
export function ResourceGrid({ items, className }: ResourceGridProps) {
  return (
    <ul
      className={cn(
        "grid grid-cols-1 border-l border-t border-line-light sm:grid-cols-2 lg:grid-cols-3",
        className,
      )}
    >
      {items.map((item, i) => (
        <li
          key={item}
          className="group flex items-center gap-5 border-b border-r border-line-light px-6 py-6 transition-colors duration-300 hover:bg-ink"
        >
          <span className="text-[0.7rem] font-medium tabular-nums tracking-wider2 text-ink/35 transition-colors duration-300 group-hover:text-paper/50">
            {String(i + 1).padStart(2, "0")}
          </span>
          <span className="text-[0.95rem] leading-snug text-ink transition-colors duration-300 group-hover:text-paper">
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}
