"use client";

import {
  Toolbar,
  ToolbarButton,
  ToolbarSeparator,
  ToolbarToggleGroup,
  ToolbarToggleItem,
} from "@irisui/ui";

export default function ToolbarDemo() {
  return (
    <Toolbar aria-label="Formatting">
      <ToolbarToggleGroup type="multiple" aria-label="Text style" defaultValue={["bold"]}>
        <ToolbarToggleItem value="bold" aria-label="Bold">
          <strong>B</strong>
        </ToolbarToggleItem>
        <ToolbarToggleItem value="italic" aria-label="Italic">
          <em>I</em>
        </ToolbarToggleItem>
      </ToolbarToggleGroup>
      <ToolbarSeparator />
      <ToolbarToggleGroup type="single" aria-label="Alignment" defaultValue="left">
        <ToolbarToggleItem value="left">Left</ToolbarToggleItem>
        <ToolbarToggleItem value="center">Center</ToolbarToggleItem>
      </ToolbarToggleGroup>
      <ToolbarSeparator />
      <ToolbarButton>Share</ToolbarButton>
    </Toolbar>
  );
}
