"use client";

import { Field, FieldLabel, RadioGroup, RadioGroupItem } from "@irisui/ui";

export default function RadioGroupHorizontal() {
  return (
    <Field>
      <FieldLabel>Billing</FieldLabel>
      <RadioGroup orientation="horizontal" defaultValue="yearly">
        <RadioGroupItem value="monthly">Monthly</RadioGroupItem>
        <RadioGroupItem value="yearly">Yearly</RadioGroupItem>
      </RadioGroup>
    </Field>
  );
}
