"use client";

import { PasswordToggleField } from "@irisui/ui";

export default function PasswordToggleFieldSizes() {
  return (
    <div className="flex w-80 flex-col gap-4">
      <PasswordToggleField size="sm" aria-label="Small" defaultValue="small" />
      <PasswordToggleField invalid aria-label="Invalid" defaultValue="short" />
      <PasswordToggleField size="lg" aria-label="Large" defaultValue="large" />
    </div>
  );
}
