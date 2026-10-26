"use client";

import { Field, FieldDescription, FieldLabel, Input } from "@irisui/ui";

export default function FieldDisabled() {
  return (
    <Field disabled className="w-80">
      <FieldLabel>Plan</FieldLabel>
      <Input defaultValue="Team" />
      <FieldDescription>Only an owner can change the plan.</FieldDescription>
    </Field>
  );
}
