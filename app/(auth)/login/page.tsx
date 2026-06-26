import Link from "next/link";
import type { Metadata } from "next";
import { AuthShell } from "@/components/auth/AuthShell";
import { LoginForm } from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "Sign In — Kingdom Leadership Collective",
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ redirect?: string }>;
}) {
  const { redirect } = await searchParams;

  return (
    <AuthShell
      eyebrow="Member Access"
      title="Welcome Back"
      intro="Sign in to your private dashboard — your scoreboards, daily rhythm, and the work of an integrated life."
      footer={
        <span>
          Not yet a member?{" "}
          <Link href="/signup" className="text-paper underline underline-offset-4">
            Create your account
          </Link>
        </span>
      }
    >
      <LoginForm redirectTo={redirect} />
    </AuthShell>
  );
}
