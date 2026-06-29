"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useParallax } from "@/lib/useParallax";

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
  /** Enable subtle scroll parallax on the image. */
  parallax?: boolean;
  /** Parallax travel in px (larger = more movement). */
  strength?: number;
}

const OVERLAY: Record<NonNullable<EditorialImageProps["overlay"]>, string> = {
  none: "",
  soft: "bg-ink/25",
  medium: "bg-ink/45",
  strong: "bg-ink/65",
};

/**
 * The single image primitive for the site. Color photography framed with sharp
 * corners, a hairline border, an optional flat dark overlay, and optional
 * subtle scroll parallax. A quiet zoom on hover keeps non-parallax frames
 * premium without animation noise.
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
  parallax = false,
  strength,
}: EditorialImageProps) {
  // Defaults tuned so parallax travel stays within the 11% scale headroom
  // (above) while the image is on screen — no edge ever shows in view.
  const layerRef = useParallax<HTMLDivElement>(
    strength ?? (fill ? 55 : 24),
    parallax,
  );

  // Fade each image in as it lazily loads. The effect guards against
  // already-cached images (whose onLoad may fire before hydration).
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    if (imgRef.current?.complete) setLoaded(true);
  }, []);

  const overlayNode =
    overlay !== "none" ? (
      <div aria-hidden className={cn("absolute inset-0", OVERLAY[overlay])} />
    ) : null;

  // A flat tone shown beneath the image until it loads.
  const placeholder = (
    <div
      aria-hidden
      className={cn(
        "absolute inset-0 transition-opacity duration-700",
        dark ? "bg-ink-soft" : "bg-paper-soft",
        loaded ? "opacity-0" : "opacity-100",
      )}
    />
  );

  const imageLayer = (
    <div
      ref={layerRef}
      className={cn(
        "absolute inset-0 transition-opacity duration-700 ease-out",
        loaded ? "opacity-100" : "opacity-0",
        parallax && "parallax-layer",
      )}
    >
      <Image
        ref={imgRef}
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        onLoad={() => setLoaded(true)}
        className={cn(
          "object-cover",
          !parallax &&
            "transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]",
        )}
      />
    </div>
  );

  if (fill) {
    return (
      <>
        {placeholder}
        {imageLayer}
        {overlayNode}
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
        {placeholder}
        {imageLayer}
        {overlayNode}
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
