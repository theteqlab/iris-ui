"use client";

import { ToggleGroup, ToggleGroupItem } from "@irisui/ui";
import { useState } from "react";

export default function ToggleGroupMultiple() {
  const [styles, setStyles] = useState<string[]>(["bold"]);
  return (
    <div className="flex flex-col items-center gap-3">
      <ToggleGroup
        type="multiple"
        value={styles}
        onValueChange={setStyles}
        aria-label="Text style"
        size="sm"
      >
        <ToggleGroupItem value="bold" aria-label="Bold">
          <strong>B</strong>
        </ToggleGroupItem>
        <ToggleGroupItem value="italic" aria-label="Italic">
          <em>I</em>
        </ToggleGroupItem>
        <ToggleGroupItem value="underline" aria-label="Underline">
          <span className="underline">U</span>
        </ToggleGroupItem>
      </ToggleGroup>
      <p className="m-0 text-sm text-text-muted">{styles.join(", ") || "No style"}</p>
    </div>
  );
}
