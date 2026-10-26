"use client";

import { Field, FieldLabel, Textarea } from "@irisui/ui";

export default function TextareaCount() {
  return (
    <Field className="w-96">
      <FieldLabel>Bio</FieldLabel>
      <Textarea maxLength={160} showCount defaultValue="Designer in Lyon." />
    </Field>
  );
}
