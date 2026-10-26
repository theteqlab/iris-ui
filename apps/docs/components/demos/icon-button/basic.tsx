"use client";

import { IconButton } from "@irisui/ui";
import { GearIcon } from "../icons";

export default function IconButtonDemo() {
  return (
    <>
      <IconButton aria-label="Settings">
        <GearIcon />
      </IconButton>
      <IconButton look="glass" aria-label="Settings">
        <GearIcon />
      </IconButton>
      <IconButton look="solid" aria-label="Settings">
        <GearIcon />
      </IconButton>
      <IconButton look="outline" aria-label="Settings">
        <GearIcon />
      </IconButton>
      <IconButton look="ghost" aria-label="Settings">
        <GearIcon />
      </IconButton>
    </>
  );
}
