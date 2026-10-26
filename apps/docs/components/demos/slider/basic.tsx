"use client";

import { Field, FieldLabel, Slider } from "@irisui/ui";
import { useState } from "react";

export default function SliderDemo() {
  const [volume, setVolume] = useState([60]);
  return (
    <Field className="w-full max-w-sm">
      <FieldLabel>Volume · {volume[0]} %</FieldLabel>
      <Slider value={volume} onValueChange={setVolume} />
    </Field>
  );
}
