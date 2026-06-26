"use client";

import { useActionState } from "react";
import { signUp, type AuthState } from "@/app/(auth)/actions";
import { Field } from "./Field";
import { SubmitButton } from "./SubmitButton";

const initial: AuthState = {};

export function SignupForm() {
  const [state, formAction] = useActionState(signUp, initial);

  return (
    <form action={formAction} className="space-y-6">
      <Field
        label="Full Name"
        name="full_name"
        autoComplete="name"
        placeholder="Jonathan Reed"
        required
      />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Field
          label="Company"
          name="company"
          autoComplete="organization"
          placeholder="Reed Capital"
        />
        <Field
          label="Title"
          name="title"
          autoComplete="organization-title"
          placeholder="Founder & CEO"
        />
      </div>
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
        autoComplete="new-password"
        placeholder="At least 8 characters"
        required
      />

      {state.error && (
        <p className="border border-paper/25 px-4 py-3 text-sm text-paper/80">
          {state.error}
        </p>
      )}
      {state.notice && (
        <p className="border border-paper/40 bg-paper/5 px-4 py-3 text-sm text-paper/90">
          {state.notice}
        </p>
      )}

      <SubmitButton pendingLabel="Creating account…">
        Create your account
      </SubmitButton>
    </form>
  );
}
