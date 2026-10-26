"use client";

import { ScrollArea, Separator } from "@irisui/ui";

const tags = Array.from({ length: 40 }, (_, i) => `v1.${40 - i}.0`);

export default function ScrollAreaDemo() {
  return (
    <ScrollArea className="h-64 w-56 rounded-field border border-line" aria-label="Releases">
      <div className="p-4">
        <p className="m-0 mb-3 text-sm font-bold">Releases</p>
        {tags.map((tag) => (
          <div key={tag}>
            <p className="m-0 py-1 text-sm">{tag}</p>
            <Separator className="my-1" />
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
