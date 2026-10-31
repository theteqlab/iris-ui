"use client";

import { Flag } from "@irisui/ui";

export default function FlagDemo() {
  return (
    <>
      <Flag code="fr" size="lg" />
      <Flag code="jp" size="lg" />
      <Flag code="br" size="lg" />
      <Flag code="ca" size="lg" />
      <Flag code="gb-sct" label="Scotland" size="lg" />
    </>
  );
}
