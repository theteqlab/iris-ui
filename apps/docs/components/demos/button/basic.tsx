"use client";

import { Button } from "@irisui/ui";

export default function ButtonDemo() {
  return (
    <>
      <Button>Holo</Button>
      <Button look="glass">Glass</Button>
      <Button look="solid">Solid</Button>
      <Button look="outline">Outline</Button>
      <Button look="ghost">Ghost</Button>
    </>
  );
}
