"use client";

import { Field, FieldLabel, Input } from "@irisui/ui";
import { SearchIcon } from "../icons";

export default function InputSlots() {
  return (
    <div className="flex w-80 flex-col gap-5">
      <Input type="search" aria-label="Search" placeholder="Search…" startIcon={<SearchIcon />} />
      <Field>
        <FieldLabel>Budget</FieldLabel>
        <Input inputMode="decimal" defaultValue="1200" endSlot="EUR" />
      </Field>
    </div>
  );
}
