"use client";

import { Slider } from "@irisui/ui";
import { useState } from "react";

export default function SliderRange() {
  const [price, setPrice] = useState([40, 160]);
  return (
    <div className="flex w-full max-w-sm flex-col gap-2">
      <div className="flex justify-between text-sm font-medium">
        <span>Price</span>
        <span>
          €{price[0]} – €{price[1]}
        </span>
      </div>
      {/* Two values: two thumbs, each with its label. */}
      <Slider
        value={price}
        onValueChange={setPrice}
        min={0}
        max={200}
        step={10}
        minStepsBetweenThumbs={1}
        thumbLabels={["Minimum price", "Maximum price"]}
        tone={3}
      />
    </div>
  );
}
