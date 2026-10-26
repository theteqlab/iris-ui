"use client";

import { Field, FieldDescription, FieldLabel, PasswordToggleField } from "@irisui/ui";

export default function PasswordToggleFieldDemo() {
  return (
    <Field className="w-80">
      <FieldLabel>Password</FieldLabel>
      <PasswordToggleField autoComplete="new-password" defaultValue="glass-and-film" />
      <FieldDescription>At least 12 characters.</FieldDescription>
    </Field>
  );
}
