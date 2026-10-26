"use client";

import { Separator } from "@irisui/ui";

export default function SeparatorDemo() {
  return (
    <div className="w-full max-w-sm">
      <p className="m-0 font-bold">iris-ui</p>
      <p className="m-0 text-sm text-text-muted">Components in the Verre irisé style.</p>
      <Separator className="my-4" />
      <div className="flex h-5 items-center gap-4 text-sm">
        <span>Docs</span>
        <Separator orientation="vertical" />
        <span>Components</span>
        <Separator orientation="vertical" />
        <span>GitHub</span>
      </div>
    </div>
  );
}
