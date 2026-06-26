import { Eyebrow } from "./Eyebrow";
import { Button } from "./Button";
import { EditorialImage } from "./EditorialImage";

/**
 * Near full-screen hero: a cinematic color retreat photograph beneath a flat
 * dark overlay, with editorial typography and a faint hairline grid for
 * structure. The interface stays monochrome; the photography brings the color.
 */
export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-ink text-paper"
    >
      {/* Full-bleed photograph + flat dark tint for legibility */}
      <div className="absolute inset-0">
        <EditorialImage
          src="/images/hero-vista.jpg"
          alt="Sunrise breaking over a mountain wilderness"
          fill
          priority
          sizes="100vw"
          overlay="strong"
        />
      </div>

      {/* Editorial hairlines layered over the image */}
      <AbstractVisual />

      <div className="relative z-10 mx-auto w-full max-w-editorial px-6 pb-16 pt-32 md:px-10 lg:px-14">
        <div className="max-w-4xl">
          <div className="animate-fade-in-up" style={{ animationDelay: "60ms" }}>
            <Eyebrow inverted>Kingdom Leadership Collective</Eyebrow>
          </div>

          <h1
            className="mt-10 font-serif text-[3.25rem] font-normal leading-[1.02] tracking-tight text-balance animate-fade-in-up sm:text-7xl md:text-[5.5rem] lg:text-[6rem]"
            style={{ animationDelay: "140ms" }}
          >
            Build a Life
            <br />
            That Outlives You
          </h1>

          <p
            className="mt-10 max-w-2xl text-base leading-relaxed text-paper/70 animate-fade-in-up md:text-lg"
            style={{ animationDelay: "220ms" }}
          >
            A mentorship community for business leaders who want to lead with
            excellence, live with integrity, steward influence faithfully, and
            use success to expand God&apos;s Kingdom.
          </p>

          <div
            className="mt-12 flex flex-col gap-4 animate-fade-in-up sm:flex-row"
            style={{ animationDelay: "300ms" }}
          >
            <Button href="/signup" variant="primary" inverted>
              Apply for the Collective
            </Button>
            <Button href="#vision" variant="outline" inverted>
              Explore the Experience
            </Button>
          </div>
        </div>
      </div>

      {/* Quiet scroll affordance */}
      <div className="absolute inset-x-0 bottom-8 z-10 mx-auto flex max-w-editorial items-center justify-between px-6 md:px-10 lg:px-14">
        <span className="text-[0.65rem] uppercase tracking-micro text-paper/40">
          Scroll
        </span>
        <span className="text-[0.65rem] uppercase tracking-micro text-paper/40">
          By Invitation &amp; Application
        </span>
      </div>
    </section>
  );
}

/**
 * Decorative hairline structure layered over the hero photograph — strictly
 * flat, no gradients. Vertical rules aligned to the content measure keep the
 * editorial grid legible without competing with the image.
 */
function AbstractVisual() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-[1]">
      {/* Vertical editorial grid lines, aligned to the content measure */}
      <div className="absolute inset-0 mx-auto max-w-editorial px-6 md:px-10 lg:px-14">
        <div className="relative h-full">
          {[0, 50, 100].map((pct) => (
            <span
              key={pct}
              className="absolute top-0 h-full w-px bg-paper/[0.08]"
              style={{ left: `${pct}%` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
