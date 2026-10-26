"use client";

import { Field, FieldLabel, Input } from "@irisui/ui";

export default function InputDemo() {
  return (
    <Field className="w-80">
      <FieldLabel>Full name</FieldLabel>
      <Input placeholder="Camille Laurent" autoComplete="name" />
    </Field>
  );
}
