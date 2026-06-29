import type { Metadata } from "next";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Section } from "@/components/Section";
import { Eyebrow } from "@/components/Eyebrow";
import { Button } from "@/components/Button";
import { EditorialImage } from "@/components/EditorialImage";
import { Reveal } from "@/components/Reveal";
import { LEADERS } from "@/lib/leadership";

export const metadata: Metadata = {
  title: "Leadership — Kingdom Leadership Collective",
  description:
    "The pastors, practitioners, and mentors who shepherd the Kingdom Leadership Collective.",
};

export default function LeadershipPage() {
  return (
    <main>
      <Navigation />

      {/* Dark page header so the transparent nav stays legible */}
      <section className="relative flex min-h-[60vh] items-end overflow-hidden bg-ink pb-16 pt-40 text-paper md:min-h-[68vh]">
        <div className="mx-auto w-full max-w-editorial px-6 md:px-10 lg:px-14">
          <Reveal>
            <Eyebrow inverted>Leadership</Eyebrow>
            <h1 className="mt-8 max-w-4xl font-serif text-5xl leading-[1.04] tracking-tight text-balance sm:text-6xl md:text-7xl">
              Proven Practitioners. Trusted Shepherds.
            </h1>
            <p className="mt-8 max-w-xl text-base leading-relaxed text-paper/70 md:text-lg">
              The Collective is led by people who have built, given, and
              shepherded at the highest levels — and who care as much about your
              soul as your strategy.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Bio blocks, alternating image side */}
      {LEADERS.map((leader, i) => {
        const imageFirst = i % 2 === 0;
        return (
          <Section key={leader.name} soft={i % 2 === 1}>
            <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
              <Reveal
                className={imageFirst ? "lg:order-1" : "lg:order-2"}
              >
                <EditorialImage
                  src={leader.image}
                  alt={leader.imageAlt}
                  ratio="aspect-[5/4]"
                  sizes="(max-width: 1024px) 100vw, 560px"
                />
              </Reveal>

              <Reveal
                delay={120}
                className={imageFirst ? "lg:order-2" : "lg:order-1"}
              >
                <Eyebrow>{leader.role}</Eyebrow>
                <h2 className="mt-7 font-serif text-4xl leading-tight tracking-tight sm:text-5xl">
                  {leader.name}
                </h2>
                <p className="mt-6 border-l border-ink/20 pl-6 font-serif text-xl italic leading-snug text-ink/75">
                  {leader.tagline}
                </p>
                <div className="mt-8 space-y-5">
                  {leader.bio.map((para, p) => (
                    <p
                      key={p}
                      className="text-[0.95rem] leading-relaxed text-ink/70"
                    >
                      {para}
                    </p>
                  ))}
                </div>
              </Reveal>
            </div>
          </Section>
        );
      })}

      {/* Closing CTA */}
      <Section dark className="text-center">
        <Reveal className="mx-auto flex max-w-3xl flex-col items-center">
          <Eyebrow inverted>Join the Collective</Eyebrow>
          <h2 className="mt-8 font-serif text-4xl leading-[1.08] tracking-tight text-balance sm:text-5xl md:text-6xl">
            Be Mentored by People Who Have Walked It
          </h2>
          <p className="mt-8 max-w-xl text-base leading-relaxed text-paper/65 md:text-lg">
            Membership is by application and invitation. If you are a business
            leader pursuing excellence, integrity, and generosity in one
            integrated life, we would be glad to begin a conversation.
          </p>
          <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row">
            <Button href="/#apply" variant="primary" inverted>
              Apply for the Collective
            </Button>
            <Button href="/" variant="outline" inverted>
              Explore the Experience
            </Button>
          </div>
        </Reveal>
      </Section>

      <Footer />
    </main>
  );
}
