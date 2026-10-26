"use client";

import {
  Button,
  Field,
  FieldLabel,
  Input,
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@irisui/ui";

export default function PopoverDemo() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button look="glass">Dimensions</Button>
      </PopoverTrigger>
      <PopoverContent aria-label="Dimensions">
        <strong>Dimensions</strong>
        <div className="grid grid-cols-2 gap-3">
          <Field>
            <FieldLabel>Width</FieldLabel>
            <Input size="sm" defaultValue="1200" endSlot="px" />
          </Field>
          <Field>
            <FieldLabel>Height</FieldLabel>
            <Input size="sm" defaultValue="800" endSlot="px" />
          </Field>
        </div>
        <PopoverClose asChild>
          <Button size="sm" look="solid" className="self-end">
            Apply
          </Button>
        </PopoverClose>
      </PopoverContent>
    </Popover>
  );
}
