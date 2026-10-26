"use client";

import { Input } from "@irisui/ui";

export default function InputSizes() {
  return (
    <div className="flex w-80 flex-col gap-4">
      <Input size="sm" aria-label="Small" placeholder="Small (36 px)" />
      <Input size="md" aria-label="Medium" placeholder="Medium (44 px)" />
      <Input size="lg" aria-label="Large" placeholder="Large (56 px)" />
    </div>
  );
}
