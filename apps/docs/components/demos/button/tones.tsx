"use client";

import { Button, type Tone } from "@irisui/ui";

const tones: Tone[] = [1, 2, 3, 4, 5, "ink", "danger"];

export default function ButtonTones() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-3">
        {tones.map((tone) => (
          <Button key={tone} look="solid" tone={tone}>
            Tone {tone}
          </Button>
        ))}
      </div>
      <div className="flex flex-wrap gap-3">
        {tones.map((tone) => (
          <Button key={tone} look="outline" tone={tone}>
            Tone {tone}
          </Button>
        ))}
      </div>
    </div>
  );
}
