"use client";

import { Flag } from "@irisui/ui";

export default function FlagShapes() {
  return (
    <div className="flex flex-col gap-4">
      {(["rect", "square", "round"] as const).map((shape) => (
        <div key={shape} className="flex items-center gap-3">
          <span className="w-16 font-mono text-xs text-text-muted">{shape}</span>
          <Flag code="de" shape={shape} size="sm" />
          <Flag code="de" shape={shape} size="md" />
          <Flag code="de" shape={shape} size="lg" />
        </div>
      ))}
    </div>
  );
}
