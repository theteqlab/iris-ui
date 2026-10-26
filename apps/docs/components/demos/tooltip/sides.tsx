"use client";

import { Button, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@irisui/ui";

const sides = ["top", "right", "bottom", "left"] as const;

export default function TooltipSides() {
  return (
    // One provider: moving from one trigger to the next opens the next tooltip at once.
    <TooltipProvider delayDuration={300}>
      {sides.map((side) => (
        <Tooltip key={side}>
          <TooltipTrigger asChild>
            <Button look="outline">{side}</Button>
          </TooltipTrigger>
          <TooltipContent side={side}>Shown on the {side}</TooltipContent>
        </Tooltip>
      ))}
    </TooltipProvider>
  );
}
