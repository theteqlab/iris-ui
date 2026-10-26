"use client";

import { Badge, type Tone } from "@irisui/ui";

const tones: Tone[] = [1, 2, 3, 4, 5, "ink", "danger"];

export default function BadgeTones() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-2">
        {tones.map((tone) => (
          <Badge key={tone} look="solid" tone={tone}>
            Tone {tone}
          </Badge>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {tones.map((tone) => (
          <Badge key={tone} look="outline" tone={tone}>
            Tone {tone}
          </Badge>
        ))}
      </div>
    </div>
  );
}
