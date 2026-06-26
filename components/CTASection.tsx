import { Section } from "./Section";
import { Eyebrow } from "./Eyebrow";
import { Button } from "./Button";
import { Reveal } from "./Reveal";
import { EditorialImage } from "./EditorialImage";

interface CTASectionProps {
  id?: string;
  eyebrow: string;
  headline: string;
  subheadline: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel: string;
  secondaryHref: string;
  /** Optional full-bleed background photograph behind a flat dark overlay. */
  bgImage?: string;
  bgAlt?: string;
}

/**
 * Full closing call-to-action with a centered editorial stack. When `bgImage`
 * is provided it becomes a cinematic full-bleed section with a flat dark tint;
 * otherwise it stays solid black.
 */
export function CTASection({
  id,
  eyebrow,
  headline,
  subheadline,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
  bgImage,
  bgAlt = "",
}: CTASectionProps) {
  const content = (
    <Reveal className="mx-auto flex max-w-3xl flex-col items-center">
      <Eyebrow inverted>{eyebrow}</Eyebrow>
      <h2 className="mt-8 font-serif text-5xl leading-[1.05] tracking-tight text-balance sm:text-6xl md:text-7xl">
        {headline}
      </h2>
      <p className="mt-8 max-w-xl text-base leading-relaxed text-paper/75 md:text-lg">
        {subheadline}
      </p>
      <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row">
        <Button href={primaryHref} variant="primary" inverted>
          {primaryLabel}
        </Button>
        <Button href={secondaryHref} variant="outline" inverted>
          {secondaryLabel}
        </Button>
      </div>
    </Reveal>
  );

  if (!bgImage) {
    return (
      <Section id={id} dark className="text-center">
        {content}
      </Section>
    );
  }

  return (
    <section
      id={id}
      className="relative overflow-hidden bg-ink text-center text-paper"
    >
      <div className="absolute inset-0">
        <EditorialImage
          src={bgImage}
          alt={bgAlt}
          fill
          parallax
          strength={55}
          sizes="100vw"
          overlay="strong"
        />
      </div>
      <div className="relative z-10 mx-auto w-full max-w-editorial px-6 py-28 md:px-10 md:py-40 lg:px-14">
        {content}
      </div>
    </section>
  );
}
