"use client";

import { AspectRatio } from "@irisui/ui";

export default function AspectRatioDemo() {
  return (
    <div className="w-full max-w-md">
      <AspectRatio ratio={16 / 9} className="overflow-hidden rounded-card">
        <div
          className="flex size-full items-center justify-center font-bold text-text-on-holo"
          style={{ background: "var(--holo)" }}
        >
          16 / 9
        </div>
      </AspectRatio>
    </div>
  );
}
