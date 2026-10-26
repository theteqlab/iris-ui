"use client";

import { Button, Popover, PopoverClose, PopoverContent, PopoverTrigger } from "@irisui/ui";

export default function PopoverArrow() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button look="outline" tone={3}>
          Delivery
        </Button>
      </PopoverTrigger>
      <PopoverContent arrow side="top" aria-label="Delivery">
        <strong>Free delivery</strong>
        <p className="m-0 text-sm text-text-muted">From €50, in 2 working days.</p>
        <PopoverClose asChild>
          <Button size="sm" className="self-start">
            Got it
          </Button>
        </PopoverClose>
      </PopoverContent>
    </Popover>
  );
}
