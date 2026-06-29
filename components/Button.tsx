import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "ghost";

interface ButtonProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  variant?: Variant;
  children: React.ReactNode;
  /** Render light-on-dark when placed on a black section. */
  inverted?: boolean;
}

/**
 * Perfect rectangle. Sharp corners. No radius, ever.
 * Anchor-based so it doubles as in-page navigation.
 */
export function Button({
  href,
  variant = "primary",
  inverted = false,
  className,
  children,
  ...props
}: ButtonProps) {
  const base =
    "group inline-flex items-center justify-center gap-3 whitespace-nowrap px-9 py-4 text-[0.72rem] font-medium uppercase tracking-wider2 transition-colors duration-300 ease-out select-none";

  const variants: Record<Variant, string> = {
    primary: inverted
      ? "bg-paper text-ink hover:bg-paper/85"
      : "bg-ink text-paper hover:bg-ink-soft",
    outline: inverted
      ? "border border-paper/40 text-paper hover:bg-paper hover:text-ink"
      : "border border-ink/30 text-ink hover:bg-ink hover:text-paper",
    ghost: inverted
      ? "text-paper hover:text-paper/60"
      : "text-ink hover:text-ink/60",
  };

  return (
    <a href={href} className={cn(base, variants[variant], className)} {...props}>
      {children}
    </a>
  );
}
