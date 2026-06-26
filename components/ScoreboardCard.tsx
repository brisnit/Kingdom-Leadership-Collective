import { cn } from "@/lib/utils";

interface ScoreboardCardProps {
  index: string;
  title: string;
  description: string;
  className?: string;
}

/**
 * Sharp rectangular card with a numbered index, thin rule, and body line.
 * Hover inverts to black for a quiet, premium interaction.
 */
export function ScoreboardCard({
  index,
  title,
  description,
  className,
}: ScoreboardCardProps) {
  return (
    <div
      className={cn(
        "group flex h-full flex-col justify-between border border-line-light bg-paper p-8 transition-colors duration-500 ease-out hover:bg-ink md:p-10",
        className,
      )}
    >
      <div className="flex items-start justify-between">
        <span className="font-serif text-2xl text-ink/30 transition-colors duration-500 group-hover:text-paper/40">
          {index}
        </span>
        <span
          aria-hidden
          className="mt-3 h-px w-10 bg-ink/20 transition-colors duration-500 group-hover:bg-paper/30"
        />
      </div>
      <div className="mt-16">
        <h3 className="font-serif text-2xl leading-snug text-ink transition-colors duration-500 group-hover:text-paper md:text-[1.7rem]">
          {title}
        </h3>
        <p className="mt-4 text-sm leading-relaxed text-ink/65 transition-colors duration-500 group-hover:text-paper/70">
          {description}
        </p>
      </div>
    </div>
  );
}
