"use client";

import { Field, FieldDescription, FieldLabel, OneTimePasswordField } from "@irisui/ui";

export default function OneTimePasswordFieldDemo() {
  return (
    <Field>
      <FieldLabel>Verification code</FieldLabel>
      <OneTimePasswordField />
      <FieldDescription>Sent by SMS to the number ending in 42.</FieldDescription>
    </Field>
  );
}
