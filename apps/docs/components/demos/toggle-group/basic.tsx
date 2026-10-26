"use client";

import { ToggleGroup, ToggleGroupItem } from "@irisui/ui";

export default function ToggleGroupDemo() {
  return (
    <ToggleGroup type="single" defaultValue="week" aria-label="Period">
      <ToggleGroupItem value="day">Day</ToggleGroupItem>
      <ToggleGroupItem value="week">Week</ToggleGroupItem>
      <ToggleGroupItem value="month">Month</ToggleGroupItem>
    </ToggleGroup>
  );
}
