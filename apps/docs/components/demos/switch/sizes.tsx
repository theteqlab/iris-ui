"use client";

import { Switch } from "@irisui/ui";

export default function SwitchSizes() {
  return (
    <>
      <Switch size="sm" aria-label="Small" defaultChecked />
      <Switch size="md" aria-label="Medium" defaultChecked />
      <Switch size="lg" aria-label="Large" defaultChecked />
    </>
  );
}
