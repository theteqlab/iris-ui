"use client";

import { Badge } from "@irisui/ui";

export default function BadgeDot() {
  return (
    <>
      <Badge look="outline" tone={3} dot>
        Online
      </Badge>
      <Badge look="outline" tone={4} dot>
        Away
      </Badge>
      <Badge look="outline" tone="danger" dot>
        Offline
      </Badge>
    </>
  );
}
