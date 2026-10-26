"use client";

import { Slider } from "@irisui/ui";

export default function SliderVertical() {
  return (
    <div className="flex h-48 gap-8">
      <Slider orientation="vertical" aria-label="Bass" defaultValue={[30]} />
      <Slider orientation="vertical" aria-label="Mid" defaultValue={[60]} />
      <Slider orientation="vertical" aria-label="Treble" defaultValue={[45]} />
      <Slider orientation="vertical" aria-label="Disabled" defaultValue={[50]} disabled />
    </div>
  );
}
