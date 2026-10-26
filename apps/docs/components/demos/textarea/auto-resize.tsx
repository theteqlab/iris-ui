"use client";

import { Field, FieldDescription, FieldLabel, Textarea } from "@irisui/ui";

export default function TextareaAutoResize() {
  return (
    <Field className="w-96">
      <FieldLabel>Notes</FieldLabel>
      <Textarea autoResize rows={2} placeholder="Type a few lines…" />
      <FieldDescription>Grows as you type.</FieldDescription>
    </Field>
  );
}
