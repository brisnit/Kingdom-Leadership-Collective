"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const LINKS = [
  // Root-relative hashes so in-page links also work from other routes
  // (e.g. /leadership), resolving back to the homepage section.
  { label: "Vision", href: "/#vision" },
  { label: "Rhythm", href: "/#rhythm" },
  { label: "Tracks", href: "/#tracks" },
  { label: "Resources", href: "/#resources" },
  { label: "Leadership", href: "/leadership" },
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
          href="/"
          aria-label="Kingdom Leadership Collective — home"
          className="flex items-center"
        >
          {/* Full horizontal logo: desktop, over the dark hero only */}
          <Image
            src="/images/klc-logo.png"
            alt="Kingdom Leadership Collective"
            width={763}
            height={200}
            priority
            className={cn(
              "hidden h-11 w-auto",
              !solid && "md:block",
            )}
          />
          {/* Shield mark: mobile always, and desktop once the bar turns white */}
          <Image
            src="/images/klc-shield.png"
            alt="Kingdom Leadership Collective"
            width={184}
            height={240}
            priority
            className={cn(
              "h-10 w-auto",
              !solid && "md:hidden",
            )}
          />
        </a>

        <div className="hidden items-center gap-6 lg:flex lg:gap-9">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={cn(
                "whitespace-nowrap text-[0.72rem] font-medium uppercase tracking-wider2 transition-colors duration-300",
                solid
                  ? "text-ink/70 hover:text-ink"
                  : "text-paper/70 hover:text-paper",
              )}
            >
              {link.label}
            </a>
          ))}
          {/* Thin divider separating wayfinding from account actions */}
          <span
            aria-hidden
            className={cn(
              "h-5 w-px shrink-0",
              solid ? "bg-ink/20" : "bg-paper/25",
            )}
          />
          <a
            href="/login"
            className={cn(
              "whitespace-nowrap border px-6 py-3 text-[0.72rem] font-medium uppercase tracking-wider2 transition-colors duration-300",
              solid
                ? "border-ink/30 text-ink hover:bg-ink hover:text-paper"
                : "border-paper/50 text-paper hover:bg-paper hover:text-ink",
            )}
          >
            Sign In
          </a>
          <a
            href="/signup"
            className={cn(
              "whitespace-nowrap px-6 py-3 text-[0.72rem] font-medium uppercase tracking-wider2 transition-colors duration-300",
              solid
                ? "bg-ink text-paper hover:bg-ink-soft"
                : "bg-paper text-ink hover:bg-paper/85",
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
            "lg:hidden",
            solid ? "text-ink" : "text-paper",
          )}
        >
          {open ? <X size={22} strokeWidth={1.25} /> : <Menu size={22} strokeWidth={1.25} />}
        </button>
      </nav>

      {/* Mobile sheet */}
      <div
        className={cn(
          "overflow-hidden border-line-light bg-paper transition-[max-height] duration-500 ease-out lg:hidden",
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
