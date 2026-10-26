"use client";

import { Badge } from "@irisui/ui";

export default function BadgeDemo() {
  return (
    <>
      <Badge>New</Badge>
      <Badge look="glass">Draft</Badge>
      <Badge look="solid">Published</Badge>
      <Badge look="outline">Archived</Badge>
    </>
  );
}
