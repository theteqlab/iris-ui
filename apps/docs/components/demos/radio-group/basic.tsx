"use client";

import { Field, FieldLabel, RadioGroup, RadioGroupItem } from "@irisui/ui";

export default function RadioGroupDemo() {
  return (
    <Field>
      <FieldLabel>Delivery</FieldLabel>
      <RadioGroup defaultValue="standard">
        <RadioGroupItem value="standard">Standard · 3 to 5 days</RadioGroupItem>
        <RadioGroupItem value="express">Express · tomorrow</RadioGroupItem>
        <RadioGroupItem value="pickup">Pick up in store</RadioGroupItem>
      </RadioGroup>
    </Field>
  );
}
