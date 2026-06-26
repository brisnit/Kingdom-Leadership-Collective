import { cn } from "@/lib/utils";

interface FieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
}

/**
 * Square, hairline-ruled input on the dark auth screens. No radius, no glow —
 * just a thin underline-style box that sharpens on focus.
 */
export function Field({ label, name, className, ...props }: FieldProps) {
  return (
    <label className="block">
      <span className="text-[0.65rem] font-medium uppercase tracking-wider2 text-paper/55">
        {label}
      </span>
      <input
        name={name}
        className={cn(
          "mt-3 w-full border border-paper/25 bg-transparent px-4 py-3.5 text-[0.95rem] text-paper placeholder:text-paper/30 transition-colors duration-300 focus:border-paper focus:outline-none",
          className,
        )}
        {...props}
      />
    </label>
  );
}
