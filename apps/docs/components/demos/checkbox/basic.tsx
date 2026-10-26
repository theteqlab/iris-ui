"use client";

import { Checkbox } from "@irisui/ui";

export default function CheckboxDemo() {
  return (
    <div className="flex flex-col gap-1">
      <Checkbox defaultChecked>Email me a summary every week</Checkbox>
      <Checkbox>Share anonymous usage data</Checkbox>
      <Checkbox disabled>Beta features (not available on your plan)</Checkbox>
    </div>
  );
}
