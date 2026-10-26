"use client";

import { Field, FieldDescription, FieldLabel, Input } from "@irisui/ui";

export default function FieldDemo() {
  return (
    <Field required className="w-80">
      <FieldLabel>Username</FieldLabel>
      <Input placeholder="camille" />
      <FieldDescription>3 to 20 letters or digits.</FieldDescription>
    </Field>
  );
}
