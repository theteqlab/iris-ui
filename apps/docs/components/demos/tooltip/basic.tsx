"use client";

import { IconButton, Tooltip, TooltipContent, TooltipTrigger } from "@irisui/ui";
import { InfoIcon } from "../icons";

export default function TooltipDemo() {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <IconButton look="glass" aria-label="Keyboard shortcuts">
          <InfoIcon />
        </IconButton>
      </TooltipTrigger>
      <TooltipContent>Shortcut: ⌘ /</TooltipContent>
    </Tooltip>
  );
}
