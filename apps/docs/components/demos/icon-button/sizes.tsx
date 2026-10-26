"use client";

import { IconButton } from "@irisui/ui";
import { ArrowIcon, HeartIcon, PlusIcon } from "../icons";

export default function IconButtonSizes() {
  return (
    <>
      <IconButton size="sm" look="glass" aria-label="Add">
        <PlusIcon />
      </IconButton>
      <IconButton look="outline" tone="danger" aria-label="Like">
        <HeartIcon />
      </IconButton>
      <IconButton size="lg" look="solid" tone={1} aria-label="Next">
        <ArrowIcon />
      </IconButton>
      <IconButton loading aria-label="Sync">
        <ArrowIcon />
      </IconButton>
    </>
  );
}
