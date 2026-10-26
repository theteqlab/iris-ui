"use client";

import { Toggle } from "@irisui/ui";
import { HeartIcon } from "../icons";

export default function ToggleDemo() {
  return (
    <>
      <Toggle defaultPressed>Show grid</Toggle>
      {/* Icon alone: aria-label names it. */}
      <Toggle aria-label="Favourite">
        <HeartIcon />
      </Toggle>
      <Toggle size="sm">Small</Toggle>
      <Toggle disabled>Disabled</Toggle>
    </>
  );
}
