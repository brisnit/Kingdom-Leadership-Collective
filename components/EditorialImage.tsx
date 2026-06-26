import Image from "next/image";
import { cn } from "@/lib/utils";

interface EditorialImageProps {
  src: string;
  alt: string;
  /** Aspect ratio utility, e.g. "aspect-[4/5]". Ignored when `fill` is set. */
  ratio?: string;
  className?: string;
  /** Stretch to fill a positioned parent (for full-bleed backgrounds). */
  fill?: boolean;
  sizes?: string;
  priority?: boolean;
  /**
   * Flat black tint laid over the image for text legibility. A solid rgba
   * layer — never a gradient — to honor the design system.
   */
  overlay?: "none" | "soft" | "medium" | "strong";
  /** Optional caption rendered as an uppercase micro-label beneath the frame. */
  caption?: string;
  /** Flip border + caption colors for placement on black sections. */
  dark?: boolean;
}

const OVERLAY: Record<NonNullable<EditorialImageProps["overlay"]>, string> = {
  none: "",
  soft: "bg-ink/25",
  medium: "bg-ink/45",
  strong: "bg-ink/65",
};

/**
 * The single image primitive for the site. Color photography framed with sharp
 * corners, a hairline border, and an optional flat dark overlay. A quiet zoom
 * on hover keeps interactions premium without animation noise.
 */
export function EditorialImage({
  src,
  alt,
  ratio = "aspect-[4/3]",
  className,
  fill = false,
  sizes = "100vw",
  priority = false,
  overlay = "none",
  caption,
  dark = false,
}: EditorialImageProps) {
  if (fill) {
    return (
      <>
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
        {overlay !== "none" && (
          <div aria-hidden className={cn("absolute inset-0", OVERLAY[overlay])} />
        )}
      </>
    );
  }

  return (
    <figure className={className}>
      <div
        className={cn(
          "group relative overflow-hidden border",
          dark ? "border-line-dark" : "border-line-light",
          ratio,
        )}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
        />
        {overlay !== "none" && (
          <div aria-hidden className={cn("absolute inset-0", OVERLAY[overlay])} />
        )}
      </div>
      {caption && (
        <figcaption
          className={cn(
            "mt-4 text-[0.65rem] font-medium uppercase tracking-micro",
            dark ? "text-paper/50" : "text-ink/45",
          )}
        >
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
