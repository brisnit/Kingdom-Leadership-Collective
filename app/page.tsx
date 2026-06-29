import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { Footer } from "@/components/Footer";
import { Section, SectionHeader } from "@/components/Section";
import { Eyebrow } from "@/components/Eyebrow";
import { EditorialQuote } from "@/components/EditorialQuote";
import { ScoreboardCard } from "@/components/ScoreboardCard";
import { RhythmPanel } from "@/components/RhythmPanel";
import { TrackAccordion } from "@/components/TrackAccordion";
import { ResourceGrid } from "@/components/ResourceGrid";
import { MentorQuestion } from "@/components/MentorQuestion";
import { DashboardMetric } from "@/components/DashboardMetric";
import { CTASection } from "@/components/CTASection";
import { EditorialImage } from "@/components/EditorialImage";
import { Reveal } from "@/components/Reveal";
import {
  SCOREBOARDS,
  RHYTHM,
  APP_PANELS,
  TRACKS,
  GENEROSITY_DELIVERABLES,
  RESOURCES,
  MENTOR_QUESTIONS,
  ACCOUNTABILITY_AREAS,
  DASHBOARD,
  DIFFERENT_QUESTIONS,
  EXPERIENCES,
} from "@/lib/content";

const num = (i: number) => String(i + 1).padStart(2, "0");

export default function Home() {
  return (
    <main>
      <Navigation />
      <Hero />

      {/* SECTION 1 — VISION */}
      <Section id="vision" soft>
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <Reveal>
            <Eyebrow>The Vision</Eyebrow>
            <h2 className="mt-8 font-serif text-4xl leading-[1.08] tracking-tight text-balance sm:text-5xl md:text-6xl">
              More Than Better Businesses. Better Leaders.
            </h2>
          </Reveal>
          <Reveal delay={120} className="max-w-xl lg:pt-4">
            <p className="text-lg leading-relaxed text-ink/75">
              The Collective exists to develop business leaders who become a
              blessing — to their families, their employees, their churches,
              their communities, and the world.
            </p>
            <p className="mt-6 text-base leading-relaxed text-ink/65">
              We measure success differently here. Not by the size of the
              enterprise alone, but by the depth of the leader and the breadth
              of their impact. Growth in profit means little without growth in
              the person stewarding it.
            </p>
          </Reveal>
        </div>

        <Reveal className="mt-16 md:mt-20">
          <EditorialImage
            src="/images/vision-family.jpg"
            alt="A family gathered close, reading scripture together by warm lamplight"
            ratio="aspect-[16/10]"
            sizes="(max-width: 768px) 100vw, 1200px"
            caption="A blessing to their families, their employees, and the world"
          />
        </Reveal>

        <Reveal className="mt-24 md:mt-32">
          <EditorialQuote cite="The Heart of the Collective">
            The goal isn&apos;t just to increase your income. It&apos;s to
            increase your impact. Because the people are the wealth.
          </EditorialQuote>
        </Reveal>
      </Section>

      {/* SECTION 2 — THE FIVE SCOREBOARDS */}
      <Section id="scoreboards">
        <Reveal>
          <SectionHeader>
            <Eyebrow>Five Scoreboards</Eyebrow>
            <h2 className="mt-8 font-serif text-4xl leading-[1.08] tracking-tight text-balance sm:text-5xl md:text-6xl">
              The Five Scoreboards That Matter Most
            </h2>
          </SectionHeader>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-px bg-line-light sm:grid-cols-2 lg:grid-cols-3">
          {SCOREBOARDS.map((s, i) => (
            <Reveal key={s.title} delay={(i % 3) * 90}>
              <ScoreboardCard
                index={num(i)}
                title={s.title}
                description={s.description}
              />
            </Reveal>
          ))}
          {/* Closing tile keeps the grid whole and restates the frame */}
          <Reveal delay={180} className="hidden lg:block">
            <div className="flex h-full flex-col justify-end border border-line-light bg-paper-soft p-8 md:p-10">
              <p className="font-serif text-2xl leading-snug text-ink/80">
                One integrated life — measured across every scoreboard at once.
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* SECTION 3 — ANNUAL RHYTHM */}
      <Section id="rhythm" dark>
        <Reveal>
          <SectionHeader>
            <Eyebrow inverted>The Annual Rhythm</Eyebrow>
            <h2 className="mt-8 font-serif text-4xl leading-[1.08] tracking-tight text-balance sm:text-5xl md:text-6xl">
              A Year of Formation, Strategy, and Brotherhood
            </h2>
          </SectionHeader>
        </Reveal>

        <Reveal className="mt-14">
          <EditorialImage
            dark
            parallax
            src="/images/summit-brotherhood.jpg"
            alt="A group of men on a river raft at sunset, mountains rising ahead"
            ratio="aspect-[16/10] md:aspect-[16/9]"
            sizes="(max-width: 768px) 100vw, 1200px"
            caption="The Kingdom Summit — Pebble Beach · Scottsdale · Coeur d'Alene · Sea Island · Palm Desert"
          />
        </Reveal>

        <div className="mt-12 grid gap-px bg-line-dark lg:grid-cols-3">
          {RHYTHM.map((panel, i) => (
            <Reveal key={panel.title} delay={i * 110}>
              <RhythmPanel
                dark
                index={num(i)}
                eyebrow={panel.eyebrow}
                title={panel.title}
                intro={panel.intro}
                details={panel.details}
                outcome={panel.outcome}
              />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* SECTION 4 — DAILY APP PREVIEW */}
      <Section id="app" soft>
        <Reveal>
          <SectionHeader>
            <Eyebrow>The Daily App</Eyebrow>
            <h2 className="mt-8 font-serif text-4xl leading-[1.08] tracking-tight text-balance sm:text-5xl md:text-6xl">
              A Rhythm for Every Day
            </h2>
            <p className="mt-6 text-base leading-relaxed text-ink/65">
              Morning, midday, and evening — a quiet structure that keeps faith
              and leadership in step from the first hour to the last.
            </p>
          </SectionHeader>
        </Reveal>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {APP_PANELS.map((panel, i) => (
            <Reveal key={panel.time} delay={i * 110}>
              <AppPanel time={panel.time} index={num(i)} items={panel.items} />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* SECTION 5 — FIVE DEVELOPMENT TRACKS */}
      <Section id="tracks" dark>
        <Reveal>
          <SectionHeader>
            <Eyebrow inverted>Development Tracks</Eyebrow>
            <h2 className="mt-8 font-serif text-4xl leading-[1.08] tracking-tight text-balance sm:text-5xl md:text-6xl">
              Integrated Growth for the Whole Leader
            </h2>
          </SectionHeader>
        </Reveal>
        <Reveal delay={120} className="mt-14">
          <TrackAccordion tracks={TRACKS} />
        </Reveal>
      </Section>

      {/* SECTION 6 — SIGNATURE GENEROSITY TRACK */}
      <Section id="generosity" className="bg-ink text-paper">
        <div className="grid gap-14 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <Reveal>
            <Eyebrow inverted>The Signature Distinctive</Eyebrow>
            <h2 className="mt-8 font-serif text-4xl leading-[1.08] tracking-tight text-balance sm:text-5xl md:text-6xl">
              From Giving Occasionally to Living Generously
            </h2>
            <p className="mt-8 max-w-md text-base leading-relaxed text-paper/65">
              Generosity is the signature distinctive of the Collective. We
              don&apos;t treat it as an afterthought to wealth — we build it into
              the architecture of a leader&apos;s life, family, and legacy.
            </p>
            <EditorialImage
              dark
              src="/images/generosity-meeting.jpg"
              alt="Executives in conversation around a boardroom table at sunset above the city"
              ratio="aspect-[5/4]"
              sizes="(max-width: 1024px) 100vw, 560px"
              caption="Built into the architecture of a leader's life"
              className="mt-10"
            />
          </Reveal>

          <div className="grid grid-cols-1 gap-px self-start bg-line-dark sm:grid-cols-2">
            {GENEROSITY_DELIVERABLES.map((d, i) => (
              <Reveal key={d.title} delay={(i % 2) * 100}>
                <div className="flex h-full flex-col border border-line-dark bg-ink p-8">
                  <span className="font-serif text-xl text-paper/30">
                    {num(i)}
                  </span>
                  <h3 className="mt-12 font-serif text-2xl leading-snug text-paper">
                    {d.title}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-paper/60">
                    {d.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* SECTION 7 — MEMBER RESOURCES */}
      <Section id="resources">
        <Reveal>
          <SectionHeader>
            <Eyebrow>Member Resources</Eyebrow>
            <h2 className="mt-8 font-serif text-4xl leading-[1.08] tracking-tight text-balance sm:text-5xl md:text-6xl">
              A Private Library for Leaders Who Steward Influence
            </h2>
          </SectionHeader>
        </Reveal>
        <Reveal delay={120} className="mt-16">
          <ResourceGrid items={RESOURCES} />
        </Reveal>
      </Section>

      {/* SECTION 8 — GUEST MENTORS */}
      <Section id="mentors" soft>
        <div className="grid gap-16 lg:grid-cols-[1fr_1fr] lg:gap-24">
          <Reveal>
            <Eyebrow>Guest Mentors</Eyebrow>
            <h2 className="mt-8 font-serif text-4xl leading-[1.08] tracking-tight text-balance sm:text-5xl md:text-6xl">
              Proven Practitioners, Not Celebrity Speakers
            </h2>
            <p className="mt-8 max-w-md text-base leading-relaxed text-ink/70">
              Our guest mentors are CEOs, founders, family business owners,
              pastors, philanthropists, financial planners, estate attorneys,
              and mission leaders — people who have actually built and given.
            </p>
          </Reveal>

          <Reveal delay={120}>
            <span className="text-[0.7rem] font-medium uppercase tracking-micro text-ink/45">
              Every mentor answers three questions
            </span>
            <div className="mt-8 space-y-10">
              {MENTOR_QUESTIONS.map((q, i) => (
                <MentorQuestion key={q} index={num(i)} question={q} />
              ))}
            </div>
          </Reveal>
        </div>
      </Section>

      {/* SECTION 9 — PEER ACCOUNTABILITY */}
      <Section id="accountability">
        <div className="grid gap-14 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <Reveal>
            <Eyebrow>Peer Accountability</Eyebrow>
            <h2 className="mt-8 font-serif text-4xl leading-[1.08] tracking-tight text-balance sm:text-5xl md:text-6xl">
              Leadership Was Never Meant to Be Carried Alone
            </h2>
            <p className="mt-8 max-w-md text-base leading-relaxed text-ink/70">
              Every member is placed into a confidential group of four for
              monthly check-ins. No performance. No posturing. Just honest
              conversation across the areas that actually shape a life.
            </p>
          </Reveal>

          <Reveal delay={120}>
            <ul className="grid grid-cols-2 border-l border-t border-line-light">
              {ACCOUNTABILITY_AREAS.map((area, i) => (
                <li
                  key={area}
                  className="border-b border-r border-line-light px-6 py-7"
                >
                  <span className="text-[0.7rem] tabular-nums tracking-wider2 text-ink/35">
                    {num(i)}
                  </span>
                  <p className="mt-3 font-serif text-xl text-ink">{area}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      {/* SECTION 10 — ANNUAL PERSONAL DASHBOARD */}
      <Section id="dashboard" dark>
        <Reveal>
          <SectionHeader>
            <Eyebrow inverted>The Annual Dashboard</Eyebrow>
            <h2 className="mt-8 font-serif text-4xl leading-[1.08] tracking-tight text-balance sm:text-5xl md:text-6xl">
              Growth, Not Comparison
            </h2>
            <p className="mt-6 text-base leading-relaxed text-paper/60">
              A personal view of formation across five dimensions — measured
              against who you were last year, never against the leader beside
              you.
            </p>
          </SectionHeader>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-px bg-line-dark sm:grid-cols-2 lg:grid-cols-3">
          {DASHBOARD.map((m, i) => (
            <Reveal key={m.label} delay={(i % 3) * 90}>
              <DashboardMetric
                label={m.label}
                value={m.value}
                caption={m.caption}
              />
            </Reveal>
          ))}
          <Reveal delay={180} className="hidden lg:block">
            <div className="flex h-full flex-col justify-center border border-line-dark bg-ink p-8">
              <p className="font-serif text-2xl leading-snug text-paper/80">
                Reviewed each year with your pastoral mentor.
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* SECTION 11 — WHAT MAKES THIS DIFFERENT */}
      <Section id="different" soft>
        <Reveal>
          <SectionHeader className="max-w-2xl">
            <Eyebrow>What Makes This Different</Eyebrow>
            <h2 className="mt-8 font-serif text-4xl leading-[1.08] tracking-tight text-balance sm:text-5xl md:text-6xl">
              The Questions Most Executive Groups Don&apos;t Ask
            </h2>
          </SectionHeader>
        </Reveal>

        <div className="mt-16 grid gap-x-16 gap-y-12 md:grid-cols-2">
          {DIFFERENT_QUESTIONS.map((q, i) => (
            <Reveal key={q} delay={(i % 2) * 100}>
              <MentorQuestion index={num(i)} question={q} />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* SECTION 12 — EXCEPTIONAL EXPERIENCES */}
      <Section id="experiences">
        <Reveal>
          <SectionHeader>
            <Eyebrow>Exceptional Experiences</Eyebrow>
            <h2 className="mt-8 font-serif text-4xl leading-[1.08] tracking-tight text-balance sm:text-5xl md:text-6xl">
              Built to Shape a Life, Not Just a Calendar
            </h2>
          </SectionHeader>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 border-l border-t border-line-light sm:grid-cols-2">
          {EXPERIENCES.map((exp, i) => (
            <Reveal key={exp} delay={(i % 2) * 80}>
              <div className="group flex items-baseline gap-6 border-b border-r border-line-light px-7 py-8 transition-colors duration-300 hover:bg-ink">
                <span className="text-[0.7rem] tabular-nums tracking-wider2 text-ink/35 transition-colors group-hover:text-paper/45">
                  {num(i)}
                </span>
                <span className="font-serif text-2xl text-ink transition-colors group-hover:text-paper">
                  {exp}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* SECTION 13 — PASTORAL DISTINCTIVE */}
      <Section id="pastoral" dark>
        <div className="grid gap-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-24">
          <Reveal>
            <Eyebrow inverted>The Pastoral Distinctive</Eyebrow>
            <h2 className="mt-8 font-serif text-4xl leading-[1.1] tracking-tight text-balance sm:text-5xl">
              Strategy Courses Are Common. Trusted Shepherding Is Rare.
            </h2>
            <EditorialImage
              dark
              parallax
              src="/images/pastoral-coast.jpg"
              alt="A quiet shoreline beneath a vast, brooding sky"
              ratio="aspect-[4/3]"
              sizes="(max-width: 1024px) 100vw, 480px"
              className="mt-10"
            />
          </Reveal>

          <Reveal delay={120} className="max-w-2xl lg:pt-2">
            <p className="font-serif text-2xl leading-[1.45] text-paper/90 md:text-[1.7rem]">
              The greatest strength of this community will not be the
              curriculum. It will be pastoral presence. Business leaders have
              access to countless strategy courses, but very few have a trusted
              shepherd who can help them integrate faith, leadership, and
              generosity into a coherent life.
            </p>

            <div className="mt-12 border-t border-paper/20 pt-12">
              <p className="text-lg leading-relaxed text-paper/70">
                Build a business that honors God. Lead people with humility. Love
                your family well. Live with open hands. Leave a legacy that
                points others to Jesus.
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* FINAL CTA */}
      <CTASection
        id="apply"
        eyebrow="Apply for the Collective"
        headline="Build What Outlives You"
        subheadline="For business leaders ready to pursue excellence, integrity, generosity, and spiritual vitality in one integrated life."
        primaryLabel="Apply for the Collective"
        primaryHref="/signup"
        secondaryLabel="Member Sign In"
        secondaryHref="/login"
        bgImage="/images/cta-desert.jpg"
        bgAlt="A desert canyon glowing under the last light of day"
      />

      <Footer />
    </main>
  );
}

/* ---------- Inline section helpers ---------- */

interface AppPanelProps {
  time: string;
  index: string;
  items: { label: string; body: string }[];
}

/**
 * A flat, square "phone panel" — explicitly NOT a rounded phone. A tall
 * monochrome rectangle with a labeled status bar and stacked entries.
 */
function AppPanel({ time, index, items }: AppPanelProps) {
  return (
    <div className="flex h-full flex-col border border-ink bg-ink text-paper">
      <div className="flex items-center justify-between border-b border-paper/20 px-6 py-4">
        <span className="text-[0.65rem] font-medium uppercase tracking-micro text-paper/60">
          {time}
        </span>
        <span className="font-serif text-sm text-paper/40">{index}</span>
      </div>
      <div className="flex flex-1 flex-col gap-px bg-paper/15">
        {items.map((item) => (
          <div key={item.label} className="bg-ink px-6 py-7">
            <span className="text-[0.6rem] font-medium uppercase tracking-wider2 text-paper/45">
              {item.label}
            </span>
            <p className="mt-3 font-serif text-lg leading-snug text-paper">
              {item.body}
            </p>
          </div>
        ))}
      </div>
      <div className="border-t border-paper/20 px-6 py-4">
        <span className="text-[0.6rem] uppercase tracking-micro text-paper/35">
          Kingdom Leadership Collective
        </span>
      </div>
    </div>
  );
}
