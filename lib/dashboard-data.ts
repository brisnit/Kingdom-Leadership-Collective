import type { SupabaseClient } from "@supabase/supabase-js";
import {
  DIMENSIONS,
  type Dimension,
  type TimeOfDay,
} from "@/lib/domain";

export interface DimensionState {
  current: number | null;
  previous: number | null;
  reflection: string | null;
  assessedAt: string | null;
  /** Chronological scores (oldest → newest) for a simple trend. */
  history: { score: number; assessedAt: string }[];
}

export type ScoreboardState = Record<Dimension, DimensionState>;

function emptyState(): DimensionState {
  return {
    current: null,
    previous: null,
    reflection: null,
    assessedAt: null,
    history: [],
  };
}

/**
 * Builds the per-dimension scoreboard state from the user's assessment history.
 * "Current" is the most recent score; "previous" is the one before it, used to
 * show movement (growth, not comparison).
 */
export async function getScoreboardState(
  supabase: SupabaseClient,
  userId: string,
): Promise<ScoreboardState> {
  const { data } = await supabase
    .from("scoreboard_assessments")
    .select("dimension, score, reflection, assessed_at")
    .eq("user_id", userId)
    .order("assessed_at", { ascending: true })
    .order("created_at", { ascending: true });

  const state = DIMENSIONS.reduce((acc, d) => {
    acc[d.key] = emptyState();
    return acc;
  }, {} as ScoreboardState);

  for (const row of data ?? []) {
    const dim = row.dimension as Dimension;
    if (!state[dim]) continue;
    const entry = state[dim];
    entry.previous = entry.current;
    entry.current = row.score;
    entry.reflection = row.reflection;
    entry.assessedAt = row.assessed_at;
    entry.history.push({ score: row.score, assessedAt: row.assessed_at });
  }

  return state;
}

/** Overall completeness across the five scoreboards (0–100). */
export function overallScore(state: ScoreboardState): number | null {
  const scored = DIMENSIONS.map((d) => state[d.key].current).filter(
    (v): v is number => typeof v === "number",
  );
  if (scored.length === 0) return null;
  return Math.round(scored.reduce((a, b) => a + b, 0) / scored.length);
}

export type DailyContent = Record<string, string>;
export type TodayEntries = Partial<Record<TimeOfDay, DailyContent>>;

/** Returns the user's entries for a given date, keyed by time of day. */
export async function getEntriesForDate(
  supabase: SupabaseClient,
  userId: string,
  date: string,
): Promise<TodayEntries> {
  const { data } = await supabase
    .from("daily_entries")
    .select("time_of_day, content")
    .eq("user_id", userId)
    .eq("entry_date", date);

  const out: TodayEntries = {};
  for (const row of data ?? []) {
    out[row.time_of_day as TimeOfDay] = (row.content ?? {}) as DailyContent;
  }
  return out;
}

/** A small recent-activity feed for the overview page. */
export async function getRecentEntries(
  supabase: SupabaseClient,
  userId: string,
  limit = 5,
): Promise<{ date: string; period: TimeOfDay }[]> {
  const { data } = await supabase
    .from("daily_entries")
    .select("entry_date, time_of_day, updated_at")
    .eq("user_id", userId)
    .order("updated_at", { ascending: false })
    .limit(limit);

  return (data ?? []).map((r) => ({
    date: r.entry_date as string,
    period: r.time_of_day as TimeOfDay,
  }));
}
