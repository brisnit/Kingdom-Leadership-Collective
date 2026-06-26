import Link from "next/link";
import type { Metadata } from "next";
import { AuthShell } from "@/components/auth/AuthShell";
import { SignupForm } from "@/components/auth/SignupForm";

export const metadata: Metadata = {
  title: "Create Account — Kingdom Leadership Collective",
};

export default function SignupPage() {
  return (
    <AuthShell
      eyebrow="Establish Your Account"
      title="Begin the Work"
      intro="Create your member account to start tracking the five scoreboards and your daily rhythm of formation."
      footer={
        <span>
          Already a member?{" "}
          <Link href="/login" className="text-paper underline underline-offset-4">
            Sign in
          </Link>
        </span>
      }
    >
      <SignupForm />
    </AuthShell>
  );
}
