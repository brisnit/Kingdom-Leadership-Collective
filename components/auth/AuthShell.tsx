import Link from "next/link";
import { Eyebrow } from "@/components/Eyebrow";

interface AuthShellProps {
  eyebrow: string;
  title: string;
  intro: string;
  children: React.ReactNode;
  footer: React.ReactNode;
}

/**
 * Centered black auth screen. Keeps the editorial voice on the way in.
 */
export function AuthShell({
  eyebrow,
  title,
  intro,
  children,
  footer,
}: AuthShellProps) {
  return (
    <main className="flex min-h-[100svh] flex-col bg-ink text-paper">
      <header className="mx-auto flex h-20 w-full max-w-editorial items-center justify-between px-6 md:px-10">
        <Link
          href="/"
          className="font-serif text-lg tracking-tight text-paper sm:text-xl"
        >
          Kingdom Leadership Collective
        </Link>
        <Link
          href="/"
          className="text-[0.7rem] font-medium uppercase tracking-wider2 text-paper/55 transition-colors hover:text-paper"
        >
          Back to site
        </Link>
      </header>

      <div className="flex flex-1 items-center justify-center px-6 py-16">
        <div className="w-full max-w-md">
          <Eyebrow inverted>{eyebrow}</Eyebrow>
          <h1 className="mt-8 font-serif text-4xl leading-tight tracking-tight sm:text-5xl">
            {title}
          </h1>
          <p className="mt-5 text-sm leading-relaxed text-paper/60">{intro}</p>

          <div className="mt-10">{children}</div>

          <div className="mt-10 border-t border-paper/15 pt-8 text-sm text-paper/55">
            {footer}
          </div>
        </div>
      </div>
    </main>
  );
}
