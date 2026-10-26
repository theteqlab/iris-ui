"use client";

import { Progress } from "@irisui/ui";

export default function ProgressIndeterminate() {
  return (
    <div className="w-full max-w-md">
      {/* No value: the film slides until the work is done. */}
      <Progress aria-label="Preparing the export" />
    </div>
  );
}
