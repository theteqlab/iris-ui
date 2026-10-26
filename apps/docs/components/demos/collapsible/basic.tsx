"use client";

import { Button, Collapsible, CollapsibleContent, CollapsibleTrigger } from "@irisui/ui";
import { useState } from "react";

const repos = ["iris-ui", "iris-docs", "iris-site"];

export default function CollapsibleDemo() {
  const [open, setOpen] = useState(false);
  return (
    <Collapsible open={open} onOpenChange={setOpen} className="flex w-72 flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-bold">@camille starred 3 repositories</span>
        <CollapsibleTrigger asChild>
          <Button look="ghost" size="sm">
            {open ? "Hide" : "Show"}
          </Button>
        </CollapsibleTrigger>
      </div>
      <div className="rounded-field border border-line px-4 py-2 text-sm">{repos[0]}</div>
      <CollapsibleContent className="flex flex-col gap-2">
        {repos.slice(1).map((repo) => (
          <div key={repo} className="rounded-field border border-line px-4 py-2 text-sm">
            {repo}
          </div>
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
}
