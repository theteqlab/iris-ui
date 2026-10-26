"use client";

import {
  Field,
  FieldLabel,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@irisui/ui";

export default function SelectGroups() {
  return (
    <Field className="w-72">
      <FieldLabel>Shipping</FieldLabel>
      <Select defaultValue="post">
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>To your door</SelectLabel>
            <SelectItem value="post">Post · 3 days</SelectItem>
            <SelectItem value="courier">Courier · tomorrow</SelectItem>
          </SelectGroup>
          <SelectSeparator />
          <SelectGroup>
            <SelectLabel>Pick-up</SelectLabel>
            <SelectItem value="relay">Relay point</SelectItem>
            <SelectItem value="locker" disabled>
              Locker (unavailable)
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </Field>
  );
}
