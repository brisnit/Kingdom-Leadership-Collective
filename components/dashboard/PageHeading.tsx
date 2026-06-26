import { Eyebrow } from "@/components/Eyebrow";

interface PageHeadingProps {
  eyebrow: string;
  title: string;
  intro?: string;
  children?: React.ReactNode;
}

/** Consistent editorial header for each dashboard page. */
export function PageHeading({ eyebrow, title, intro, children }: PageHeadingProps) {
  return (
    <div className="flex flex-col gap-8 border-b border-line-light pb-10 md:flex-row md:items-end md:justify-between">
      <div className="max-w-2xl">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="mt-6 font-serif text-4xl leading-[1.05] tracking-tight sm:text-5xl">
          {title}
        </h1>
        {intro && (
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-ink/65">
            {intro}
          </p>
        )}
      </div>
      {children && <div className="shrink-0">{children}</div>}
    </div>
  );
}
