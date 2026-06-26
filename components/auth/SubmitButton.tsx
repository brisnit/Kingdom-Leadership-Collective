"use client";

import { useFormStatus } from "react-dom";
import { cn } from "@/lib/utils";

interface SubmitButtonProps {
  children: React.ReactNode;
  pendingLabel?: string;
  className?: string;
}

/**
 * Full-width rectangular submit that reflects the form's pending state.
 */
export function SubmitButton({
  children,
  pendingLabel = "Please wait…",
  className,
}: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={cn(
        "w-full bg-paper px-8 py-4 text-[0.72rem] font-medium uppercase tracking-wider2 text-ink transition-colors duration-300 hover:bg-paper/85 disabled:cursor-not-allowed disabled:opacity-60",
        className,
      )}
    >
      {pending ? pendingLabel : children}
    </button>
  );
}
