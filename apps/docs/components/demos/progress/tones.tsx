"use client";

import { Progress } from "@irisui/ui";

export default function ProgressTones() {
  return (
    <div className="flex w-full max-w-md flex-col gap-4">
      <Progress aria-label="Tasks done" value={40} tone={3} />
      <Progress aria-label="Storage used" value={92} tone="danger" />
      <Progress aria-label="Steps" value={3} max={5} tone="ink" />
    </div>
  );
}
