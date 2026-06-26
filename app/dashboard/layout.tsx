import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { DashboardNav } from "@/components/dashboard/DashboardNav";

export const dynamic = "force-dynamic";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Middleware already guards this, but verify defensively on the server.
  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name")
    .eq("id", user.id)
    .maybeSingle();

  const name =
    profile?.full_name?.trim() ||
    (user.email ? user.email.split("@")[0] : "Member");

  return (
    <div className="min-h-screen bg-paper text-ink">
      <DashboardNav name={name} email={user.email ?? ""} />
      {children}
    </div>
  );
}
