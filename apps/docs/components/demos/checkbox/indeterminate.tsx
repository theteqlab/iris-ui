"use client";

import { Checkbox } from "@irisui/ui";
import { useState } from "react";

const files = ["brief.pdf", "moodboard.png", "budget.xlsx"];

export default function CheckboxIndeterminate() {
  const [selected, setSelected] = useState<string[]>(["brief.pdf"]);
  const all =
    selected.length === files.length ? true : selected.length > 0 ? "indeterminate" : false;

  return (
    <div className="flex flex-col gap-1">
      <Checkbox
        checked={all}
        onCheckedChange={(checked) => setSelected(checked === true ? files : [])}
      >
        All files
      </Checkbox>
      <div className="flex flex-col gap-1 pl-8">
        {files.map((file) => (
          <Checkbox
            key={file}
            checked={selected.includes(file)}
            onCheckedChange={(checked) =>
              setSelected((s) => (checked ? [...s, file] : s.filter((f) => f !== file)))
            }
          >
            {file}
          </Checkbox>
        ))}
      </div>
    </div>
  );
}
