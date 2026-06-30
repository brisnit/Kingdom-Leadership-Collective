import { cn } from "@/lib/utils";

interface EditorialQuoteProps {
  children: React.ReactNode;
  cite?: string;
  className?: string;
  dark?: boolean;
}

/**
 * Bold pullquote treatment — large serif, generous leading,
 * framed by thin top/bottom rules.
 */
export function EditorialQuote({
  children,
  cite,
  className,
  dark = false,
}: EditorialQuoteProps) {
  return (
    <figure className={cn("mx-auto max-w-4xl text-center", className)}>
      <div aria-hidden className="mx-auto mb-12 h-px w-16 bg-gold" />
      <blockquote>
        <p className="font-serif text-3xl font-normal leading-[1.3] tracking-tight text-balance sm:text-4xl md:text-[2.9rem] md:leading-[1.28]">
          {children}
        </p>
      </blockquote>
      {cite && (
        <figcaption
          className={cn(
            "mt-10 text-[0.7rem] font-medium uppercase tracking-micro",
            dark ? "text-paper/60" : "text-ink/55",
          )}
        >
          {cite}
        </figcaption>
      )}
      <div aria-hidden className="mx-auto mt-12 h-px w-16 bg-gold" />
    </figure>
  );
}
