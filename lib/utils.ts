/**
 * Minimal className combiner — joins truthy class strings.
 * Kept dependency-free to honor the WAT "tools should be lean" principle.
 */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}
