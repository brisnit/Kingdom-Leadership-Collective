"use client";

import { useActionState } from "react";
import { signIn, type AuthState } from "@/app/(auth)/actions";
import { Field } from "./Field";
import { SubmitButton } from "./SubmitButton";

const initial: AuthState = {};

export function LoginForm({ redirectTo }: { redirectTo?: string }) {
  const [state, formAction] = useActionState(signIn, initial);

  return (
    <form action={formAction} className="space-y-6">
      <input type="hidden" name="redirect" value={redirectTo ?? "/dashboard"} />

      <Field
        label="Email"
        name="email"
        type="email"
        autoComplete="email"
        placeholder="you@company.com"
        required
      />
      <Field
        label="Password"
        name="password"
        type="password"
        autoComplete="current-password"
        placeholder="••••••••"
        required
      />

      {state.error && (
        <p className="border border-paper/25 px-4 py-3 text-sm text-paper/80">
          {state.error}
        </p>
      )}

      <SubmitButton pendingLabel="Signing in…">Enter the Collective</SubmitButton>
    </form>
  );
}
