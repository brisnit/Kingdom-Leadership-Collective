import { cn } from "@/lib/utils";

interface MentorQuestionProps {
  index: string;
  question: string;
  className?: string;
  dark?: boolean;
}

/**
 * A single recurring question, rendered as a large serif line over a
 * numbered label and thin top rule.
 */
export function MentorQuestion({
  index,
  question,
  className,
  dark = false,
}: MentorQuestionProps) {
  return (
    <div
      className={cn(
        "border-t pt-8",
        dark ? "border-paper/20" : "border-ink/15",
        className,
      )}
    >
      <span
        className={cn(
          "text-[0.7rem] font-medium tracking-micro",
          dark ? "text-paper/45" : "text-ink/40",
        )}
      >
        {index}
      </span>
      <p
        className={cn(
          "mt-5 font-serif text-2xl leading-snug md:text-[1.65rem]",
          dark ? "text-paper" : "text-ink",
        )}
      >
        {question}
      </p>
    </div>
  );
}
