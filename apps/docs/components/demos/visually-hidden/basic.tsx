"use client";

import { Button, VisuallyHidden } from "@irisui/ui";

export default function VisuallyHiddenDemo() {
  return (
    <Button look="glass">
      Read more
      {/* Screen readers hear "Read more about the Team plan". */}
      <VisuallyHidden> about the Team plan</VisuallyHidden>
    </Button>
  );
}
