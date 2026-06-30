import { cn } from "@/lib/utils";

interface EyebrowProps {
  children: React.ReactNode;
  className?: string;
  /** Use on dark backgrounds to flip the rule + text color. */
  inverted?: boolean;
}

/**
 * Uppercase micro-label with wide letter spacing and a short leading rule.
 * The signature editorial accent of the site.
 */
export function Eyebrow({ children, className, inverted = false }: EyebrowProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-4 text-[0.7rem] font-medium uppercase tracking-micro",
        inverted ? "text-paper/70" : "text-ink/60",
        className,
      )}
    >
      <span aria-hidden className="h-px w-8 bg-gold" />
      {children}
    </span>
  );
}
