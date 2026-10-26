"use client";

import {
  Field,
  FieldLabel,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@irisui/ui";

export default function SelectDemo() {
  return (
    <Field className="w-72">
      <FieldLabel>Country</FieldLabel>
      <Select>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="be">Belgium</SelectItem>
          <SelectItem value="ca">Canada</SelectItem>
          <SelectItem value="fr">France</SelectItem>
          <SelectItem value="ch">Switzerland</SelectItem>
        </SelectContent>
      </Select>
    </Field>
  );
}
