/**
 * Domain model shared by the executive dashboard. Mirrors the language of the
 * marketing site so the "inside" feels like a continuation of the "outside."
 */

export type Dimension =
  | "business"
  | "leadership"
  | "character"
  | "generosity"
  | "spiritual";

export interface DimensionDef {
  key: Dimension;
  /** Short label used in the dashboard. */
  label: string;
  /** The full scoreboard name from the marketing site. */
  scoreboard: string;
  description: string;
}

export const DIMENSIONS: DimensionDef[] = [
  {
    key: "business",
    label: "Business",
    scoreboard: "Business Health",
    description:
      "Sustainable growth, profitability, and operational excellence built to endure.",
  },
  {
    key: "leadership",
    label: "Leadership",
    scoreboard: "Leadership Capacity",
    description:
      "Casting vision, developing people, and carrying weight with composure.",
  },
  {
    key: "character",
    label: "Character",
    scoreboard: "Character & Integrity",
    description:
      "Who you are when no one is watching — the foundation under everything.",
  },
  {
    key: "generosity",
    label: "Generosity",
    scoreboard: "Generosity & Stewardship",
    description:
      "Holding resources with open hands and deploying them for Kingdom impact.",
  },
  {
    key: "spiritual",
    label: "Spiritual",
    scoreboard: "Spiritual Vitality",
    description:
      "A living, unhurried walk with God that keeps the soul anchored.",
  },
];

export const DIMENSION_MAP: Record<Dimension, DimensionDef> = DIMENSIONS.reduce(
  (acc, d) => {
    acc[d.key] = d;
    return acc;
  },
  {} as Record<Dimension, DimensionDef>,
);

export type TimeOfDay = "morning" | "midday" | "evening";

export interface DailyField {
  /** Key stored inside the daily_entries.content JSONB. */
  name: string;
  label: string;
  prompt: string;
  /** Optional short helper shown under the input. */
  helper?: string;
  /** Single-line vs multi-line. */
  multiline?: boolean;
}

export interface DailyPeriodDef {
  key: TimeOfDay;
  label: string;
  blurb: string;
  fields: DailyField[];
}

export const DAILY_PERIODS: DailyPeriodDef[] = [
  {
    key: "morning",
    label: "Morning",
    blurb: "Set the day's foundation before the demands arrive.",
    fields: [
      {
        name: "scripture",
        label: "Scripture",
        prompt: "What passage are you sitting with today?",
        helper: "A reference or a line worth carrying.",
      },
      {
        name: "devotional",
        label: "Devotional",
        prompt: "What is this text saying to you as a leader?",
        multiline: true,
      },
      {
        name: "reflection",
        label: "Reflection",
        prompt: "One question to carry into the work ahead.",
        multiline: true,
      },
      {
        name: "prayer",
        label: "Prayer",
        prompt: "How are you handing the day to God?",
        multiline: true,
      },
    ],
  },
  {
    key: "midday",
    label: "Midday",
    blurb: "A pause at the desk to lead on purpose.",
    fields: [
      {
        name: "quote",
        label: "Leadership Quote",
        prompt: "A line worth pausing on.",
      },
      {
        name: "challenge",
        label: "Business Challenge",
        prompt: "One practical move to apply before evening.",
        multiline: true,
      },
    ],
  },
  {
    key: "evening",
    label: "Evening",
    blurb: "Close the day examined, grateful, and unhurried.",
    fields: [
      {
        name: "gratitude",
        label: "Gratitude",
        prompt: "Three things worth naming from today.",
        multiline: true,
      },
      {
        name: "journal",
        label: "Journal",
        prompt: "What decisions or tension are you processing?",
        multiline: true,
      },
      {
        name: "prayer",
        label: "Prayer",
        prompt: "How are you handing the day back to God?",
        multiline: true,
      },
    ],
  },
];

export const DAILY_PERIOD_MAP: Record<TimeOfDay, DailyPeriodDef> =
  DAILY_PERIODS.reduce((acc, p) => {
    acc[p.key] = p;
    return acc;
  }, {} as Record<TimeOfDay, DailyPeriodDef>);
