import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { getScoreboardState } from "@/lib/dashboard-data";
import { DIMENSIONS } from "@/lib/domain";
import { formatLongDate } from "@/lib/date";
import { PageHeading } from "@/components/dashboard/PageHeading";
import { ScoreboardForm } from "@/components/dashboard/ScoreboardForm";

export const metadata: Metadata = {
  title: "Scoreboards — Kingdom Leadership Collective",
};

export default async function ScoreboardsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const state = await getScoreboardState(supabase, user!.id);

  // Build a compact history timeline across all dimensions.
  const lastAssessed = DIMENSIONS.map((d) => state[d.key].assessedAt)
    .filter(Boolean)
    .sort()
    .pop() as string | undefined;

  return (
    <div className="mx-auto max-w-editorial px-6 py-14 md:px-10 md:py-20 lg:px-14">
      <PageHeading
        eyebrow="The Five Scoreboards"
        title="Where You Stand"
        intro="An honest self-assessment across the five areas that define a whole leader. Set each from 0 to 100. This is formation, not performance — record what is true."
      >
        {lastAssessed && (
          <div className="text-right">
            <span className="text-[0.6rem] uppercase tracking-wider2 text-ink/40">
              Last recorded
            </span>
            <p className="mt-1 font-serif text-lg text-ink">
              {formatLongDate(lastAssessed)}
            </p>
          </div>
        )}
      </PageHeading>

      <div className="mt-12">
        <ScoreboardForm state={state} />
      </div>
    </div>
  );
}
