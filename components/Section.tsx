import { cn } from "@/lib/utils";

interface SectionProps {
  id?: string;
  children: React.ReactNode;
  className?: string;
  /** Black background with white type. */
  dark?: boolean;
  /** Soft paper tone for gentle separation between white sections. */
  soft?: boolean;
  /** Removes the default vertical padding when a child needs full control. */
  flush?: boolean;
}

/**
 * The structural backbone. Controls background tone, vertical rhythm,
 * and the centered editorial measure used across the page.
 */
export function Section({
  id,
  children,
  className,
  dark = false,
  soft = false,
  flush = false,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "scroll-mt-20",
        dark && "bg-ink text-paper",
        soft && !dark && "bg-paper-soft text-ink",
        !dark && !soft && "bg-paper text-ink",
        !flush && "py-24 md:py-32 lg:py-40",
        className,
      )}
    >
      <div className="mx-auto w-full max-w-editorial px-6 md:px-10 lg:px-14">
        {children}
      </div>
    </section>
  );
}

interface SectionHeaderProps {
  children: React.ReactNode;
  className?: string;
}

/** Constrained heading column for editorial titles. */
export function SectionHeader({ children, className }: SectionHeaderProps) {
  return <div className={cn("max-w-3xl", className)}>{children}</div>;
}
