"use client";

import { Progress } from "@irisui/ui";
import { useEffect, useState } from "react";

export default function ProgressDemo() {
  const [value, setValue] = useState(24);

  useEffect(() => {
    const id = setInterval(() => setValue((v) => (v >= 100 ? 0 : v + 4)), 600);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex w-full max-w-md flex-col gap-2">
      <div className="flex justify-between text-sm font-medium">
        <span id="upload-label">Uploading photos</span>
        <span className="font-mono">{value} %</span>
      </div>
      <Progress aria-labelledby="upload-label" value={value} />
    </div>
  );
}
