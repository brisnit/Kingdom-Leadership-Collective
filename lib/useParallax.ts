"use client";

import { useEffect, useRef } from "react";

/**
 * Subtle scroll parallax. Returns a ref to attach to the moving layer; the
 * layer should be styled with `.parallax-layer` (translate via the --py CSS
 * variable this hook sets). Movement is computed from the element's position
 * in the viewport and updated on a single rAF tick per scroll event.
 *
 * Fully inert when `enabled` is false or the user prefers reduced motion.
 */
export function useParallax<T extends HTMLElement = HTMLDivElement>(
  strength = 40,
  enabled = true,
) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !enabled) return;

    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    let raf = 0;
    let ticking = false;

    const update = () => {
      ticking = false;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      // 0 when the element is centered in the viewport; ±1 roughly a screen away.
      let progress = (rect.top + rect.height / 2 - vh / 2) / vh;
      progress = Math.max(-1.2, Math.min(1.2, progress));
      const shift = -progress * strength;
      el.style.setProperty("--py", `${shift.toFixed(2)}px`);
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        raf = requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [strength, enabled]);

  return ref;
}
