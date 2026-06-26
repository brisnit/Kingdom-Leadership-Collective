import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { getEntriesForDate } from "@/lib/dashboard-data";
import type { TimeOfDay } from "@/lib/domain";
import { todayISO, formatLongDate } from "@/lib/date";
import { PageHeading } from "@/components/dashboard/PageHeading";
import { DailyRhythm } from "@/components/dashboard/DailyRhythm";

export const metadata: Metadata = {
  title: "Daily Rhythm — Kingdom Leadership Collective",
};

/** Open the period that fits the current hour. */
function periodForNow(): TimeOfDay {
  const h = new Date().getHours();
  if (h < 12) return "morning";
  if (h < 17) return "midday";
  return "evening";
}

export default async function TodayPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const today = todayISO();
  const entries = await getEntriesForDate(supabase, user!.id, today);

  return (
    <div className="mx-auto max-w-editorial px-6 py-14 md:px-10 md:py-20 lg:px-14">
      <PageHeading
        eyebrow={formatLongDate(today)}
        title="Today's Rhythm"
        intro="Morning, midday, and evening — a quiet structure that keeps faith and leadership in step from the first hour to the last. Your words are private to you."
      />

      <div className="mt-12">
        <DailyRhythm
          entryDate={today}
          entries={entries}
          initialPeriod={periodForNow()}
        />
      </div>
    </div>
  );
}
