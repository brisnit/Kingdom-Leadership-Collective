"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const LINKS = [
  { label: "Vision", href: "#vision" },
  { label: "Rhythm", href: "#rhythm" },
  { label: "Tracks", href: "#tracks" },
  { label: "Resources", href: "#resources" },
];

/**
 * Fixed header. Transparent over the black hero, then resolves to a solid
 * white bar with a hairline rule once the user scrolls past the fold.
 */
export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile sheet is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const solid = scrolled || open;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-500",
        solid
          ? "border-b border-line-light bg-paper/95 backdrop-blur-sm"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <nav className="mx-auto flex h-20 max-w-editorial items-center justify-between px-6 md:px-10 lg:px-14">
        <a
          href="#top"
          className={cn(
            "font-serif text-lg leading-none tracking-tight transition-colors duration-500 sm:text-xl",
            solid ? "text-ink" : "text-paper",
          )}
        >
          Kingdom Leadership
          <span className="hidden sm:inline"> Collective</span>
        </a>

        <div className="hidden items-center gap-10 md:flex">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={cn(
                "text-[0.72rem] font-medium uppercase tracking-wider2 transition-colors duration-300",
                solid
                  ? "text-ink/70 hover:text-ink"
                  : "text-paper/70 hover:text-paper",
              )}
            >
              {link.label}
            </a>
          ))}
          <a
            href="/login"
            className={cn(
              "text-[0.72rem] font-medium uppercase tracking-wider2 transition-colors duration-300",
              solid
                ? "text-ink/70 hover:text-ink"
                : "text-paper/70 hover:text-paper",
            )}
          >
            Sign In
          </a>
          <a
            href="/signup"
            className={cn(
              "px-6 py-3 text-[0.72rem] font-medium uppercase tracking-wider2 transition-colors duration-300",
              solid
                ? "bg-ink text-paper hover:bg-ink-soft"
                : "border border-paper/50 text-paper hover:bg-paper hover:text-ink",
            )}
          >
            Apply
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className={cn(
            "md:hidden",
            solid ? "text-ink" : "text-paper",
          )}
        >
          {open ? <X size={22} strokeWidth={1.25} /> : <Menu size={22} strokeWidth={1.25} />}
        </button>
      </nav>

      {/* Mobile sheet */}
      <div
        className={cn(
          "overflow-hidden border-line-light bg-paper transition-[max-height] duration-500 ease-out md:hidden",
          open ? "max-h-[80vh] border-t" : "max-h-0",
        )}
      >
        <div className="flex flex-col px-6 py-4">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="border-b border-line-light py-5 font-serif text-2xl text-ink"
            >
              {link.label}
            </a>
          ))}
          <a
            href="/login"
            onClick={() => setOpen(false)}
            className="border-b border-line-light py-5 font-serif text-2xl text-ink/60"
          >
            Sign In
          </a>
          <a
            href="/signup"
            onClick={() => setOpen(false)}
            className="mt-6 bg-ink px-6 py-4 text-center text-[0.72rem] font-medium uppercase tracking-wider2 text-paper"
          >
            Apply for the Collective
          </a>
        </div>
      </div>
    </header>
  );
}
