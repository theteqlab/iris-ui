"use client";

import { Input } from "@irisui/ui";

export default function InputInvalid() {
  return (
    <div className="flex w-80 flex-col gap-4">
      <Input invalid aria-label="Postcode" defaultValue="75O01" />
      <Input disabled aria-label="Country" defaultValue="France" />
    </div>
  );
}
