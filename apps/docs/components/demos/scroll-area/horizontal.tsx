"use client";

import { ScrollArea } from "@irisui/ui";

const colours = ["Rose", "Lilac", "Mint", "Sand", "Sky", "Coral", "Lemon", "Pearl", "Ocean"];

export default function ScrollAreaHorizontal() {
  return (
    <ScrollArea
      scrollbars="horizontal"
      type="always"
      className="w-full max-w-md rounded-field border border-line"
      aria-label="Swatches"
    >
      <div className="flex w-max gap-3 p-4">
        {colours.map((name, i) => (
          <div
            key={name}
            className="flex h-24 w-32 items-end rounded-field p-3 text-sm font-bold text-text-on-holo"
            style={{ background: `var(--tone-${(i % 5) + 1})` }}
          >
            {name}
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
