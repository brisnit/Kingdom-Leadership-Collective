import { Section } from "./Section";
import { Eyebrow } from "./Eyebrow";
import { Button } from "./Button";
import { Reveal } from "./Reveal";

interface CTASectionProps {
  id?: string;
  eyebrow: string;
  headline: string;
  subheadline: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel: string;
  secondaryHref: string;
}

/**
 * Full black closing call-to-action with centered editorial stack.
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
}: CTASectionProps) {
  return (
    <Section id={id} dark className="text-center">
      <Reveal className="mx-auto flex max-w-3xl flex-col items-center">
        <Eyebrow inverted>{eyebrow}</Eyebrow>
        <h2 className="mt-8 font-serif text-5xl leading-[1.05] tracking-tight text-balance sm:text-6xl md:text-7xl">
          {headline}
        </h2>
        <p className="mt-8 max-w-xl text-base leading-relaxed text-paper/65 md:text-lg">
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
    </Section>
  );
}
