"use client";

import { Field, FieldLabel, Textarea } from "@irisui/ui";

export default function TextareaDemo() {
  return (
    <Field className="w-96">
      <FieldLabel>Message</FieldLabel>
      <Textarea placeholder="Tell us what you need…" />
    </Field>
  );
}
