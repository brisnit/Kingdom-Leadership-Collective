"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { signOut } from "@/app/(auth)/actions";

const LINKS = [
  { label: "Overview", href: "/dashboard" },
  { label: "Scoreboards", href: "/dashboard/scoreboards" },
  { label: "Daily Rhythm", href: "/dashboard/today" },
];

interface DashboardNavProps {
  name: string;
  email: string;
}

/**
 * Fixed top bar for the member area. Editorial, monochrome, square — the
 * inside of the house matches the front door.
 */
export function DashboardNav({ name, email }: DashboardNavProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/dashboard"
      ? pathname === "/dashboard"
      : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-40 border-b border-line-light bg-paper/95 backdrop-blur-sm">
      <div className="mx-auto flex h-20 max-w-editorial items-center justify-between px-6 md:px-10 lg:px-14">
        <div className="flex items-center gap-10">
          <Link href="/dashboard" className="font-serif text-lg tracking-tight">
            Kingdom Leadership
            <span className="hidden sm:inline"> Collective</span>
          </Link>
          <nav className="hidden items-center gap-8 md:flex">
            {LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-[0.72rem] font-medium uppercase tracking-wider2 transition-colors duration-300",
                  isActive(link.href)
                    ? "text-ink"
                    : "text-ink/45 hover:text-ink",
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="hidden items-center gap-6 md:flex">
          <div className="text-right leading-tight">
            <p className="text-sm text-ink">{name}</p>
            <p className="text-[0.65rem] uppercase tracking-wider2 text-ink/40">
              {email}
            </p>
          </div>
          <form action={signOut}>
            <button
              type="submit"
              className="border border-ink/25 px-5 py-2.5 text-[0.68rem] font-medium uppercase tracking-wider2 text-ink transition-colors duration-300 hover:bg-ink hover:text-paper"
            >
              Sign Out
            </button>
          </form>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="md:hidden"
        >
          {open ? <X size={22} strokeWidth={1.25} /> : <Menu size={22} strokeWidth={1.25} />}
        </button>
      </div>

      {/* Mobile sheet */}
      <div
        className={cn(
          "overflow-hidden border-line-light bg-paper transition-[max-height] duration-500 ease-out md:hidden",
          open ? "max-h-[80vh] border-t" : "max-h-0",
        )}
      >
        <div className="flex flex-col px-6 py-2">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={cn(
                "border-b border-line-light py-5 font-serif text-2xl",
                isActive(link.href) ? "text-ink" : "text-ink/60",
              )}
            >
              {link.label}
            </Link>
          ))}
          <div className="flex items-center justify-between py-6">
            <div className="leading-tight">
              <p className="text-sm text-ink">{name}</p>
              <p className="text-[0.65rem] uppercase tracking-wider2 text-ink/40">
                {email}
              </p>
            </div>
            <form action={signOut}>
              <button
                type="submit"
                className="border border-ink/25 px-5 py-2.5 text-[0.68rem] font-medium uppercase tracking-wider2 text-ink"
              >
                Sign Out
              </button>
            </form>
          </div>
        </div>
      </div>
    </header>
  );
}
