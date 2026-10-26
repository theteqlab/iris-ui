"use client";

import {
  Field,
  FieldError,
  FieldLabel,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@irisui/ui";
import { useState } from "react";

export default function SelectInvalid() {
  const [plan, setPlan] = useState<string>();
  return (
    <Field required className="w-72">
      <FieldLabel>Plan</FieldLabel>
      <Select value={plan} onValueChange={setPlan}>
        <SelectTrigger size="lg">
          <SelectValue placeholder="Choose a plan" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="free">Free</SelectItem>
          <SelectItem value="pro">Pro</SelectItem>
          <SelectItem value="team">Team</SelectItem>
        </SelectContent>
      </Select>
      <FieldError>{plan ? null : "Choose a plan to continue."}</FieldError>
    </Field>
  );
}
