"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import {
  DIMENSION_MAP,
  DAILY_PERIOD_MAP,
  type Dimension,
  type TimeOfDay,
} from "@/lib/domain";

export interface ActionState {
  error?: string;
  ok?: boolean;
}

/**
 * Records a fresh assessment for one or more of the five scoreboards.
 * Each submitted dimension becomes a new dated row, preserving history.
 */
export async function saveScoreboards(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Your session has expired. Please sign in again." };

  const rows: {
    user_id: string;
    dimension: Dimension;
    score: number;
    reflection: string | null;
  }[] = [];

  for (const key of Object.keys(DIMENSION_MAP) as Dimension[]) {
    const raw = formData.get(`score_${key}`);
    if (raw === null || raw === "") continue;
    const score = Number(raw);
    if (!Number.isFinite(score) || score < 0 || score > 100) {
      return { error: `Scores must be between 0 and 100 (${DIMENSION_MAP[key].label}).` };
    }
    const reflection = String(formData.get(`reflection_${key}`) ?? "").trim();
    rows.push({
      user_id: user.id,
      dimension: key,
      score: Math.round(score),
      reflection: reflection || null,
    });
  }

  if (rows.length === 0) {
    return { error: "Enter a score for at least one scoreboard." };
  }

  const { error } = await supabase.from("scoreboard_assessments").insert(rows);
  if (error) return { error: error.message };

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/scoreboards");
  return { ok: true };
}

/**
 * Upserts a single daily-rhythm entry (morning / midday / evening) for today.
 * Stores the period's prompt answers as JSON on a per-user-per-day row.
 */
export async function saveDailyEntry(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Your session has expired. Please sign in again." };

  const period = String(formData.get("time_of_day") ?? "") as TimeOfDay;
  const def = DAILY_PERIOD_MAP[period];
  if (!def) return { error: "Unknown time of day." };

  const entryDate = String(formData.get("entry_date") ?? "");
  if (!/^\d{4}-\d{2}-\d{2}$/.test(entryDate)) {
    return { error: "Invalid date." };
  }

  const content: Record<string, string> = {};
  for (const field of def.fields) {
    const value = String(formData.get(field.name) ?? "").trim();
    if (value) content[field.name] = value;
  }

  const { error } = await supabase.from("daily_entries").upsert(
    {
      user_id: user.id,
      entry_date: entryDate,
      time_of_day: period,
      content,
    },
    { onConflict: "user_id,entry_date,time_of_day" },
  );
  if (error) return { error: error.message };

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/today");
  return { ok: true };
}
