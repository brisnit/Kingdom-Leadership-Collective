import { Eyebrow } from "./Eyebrow";

const NAV = [
  { label: "Vision", href: "#vision" },
  { label: "Rhythm", href: "#rhythm" },
  { label: "Tracks", href: "#tracks" },
  { label: "Apply", href: "#apply" },
];

export function Footer() {
  return (
    <footer className="border-t border-line-dark bg-ink text-paper">
      <div className="mx-auto max-w-editorial px-6 py-20 md:px-10 md:py-24 lg:px-14">
        <div className="grid gap-16 md:grid-cols-[1.5fr_1fr]">
          <div className="max-w-md">
            <Eyebrow inverted>Kingdom Leadership Collective</Eyebrow>
            <p className="mt-8 font-serif text-3xl leading-tight md:text-4xl">
              A mentorship community for business leaders.
            </p>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-paper/55">
              Excellence, integrity, generosity, and spiritual vitality — pursued
              together, in one integrated life.
            </p>
          </div>

          <nav className="md:justify-self-end">
            <span className="text-[0.65rem] font-medium uppercase tracking-micro text-paper/40">
              Explore
            </span>
            <ul className="mt-6 space-y-4">
              {NAV.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="font-serif text-xl text-paper/85 transition-colors duration-300 hover:text-paper"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-20 flex flex-col gap-4 border-t border-paper/15 pt-8 text-[0.7rem] uppercase tracking-wider2 text-paper/40 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Kingdom Leadership Collective</span>
          <span>Build a life that outlives you.</span>
        </div>
      </div>
    </footer>
  );
}
