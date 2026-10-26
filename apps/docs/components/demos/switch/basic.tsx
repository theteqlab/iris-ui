"use client";

import { Switch } from "@irisui/ui";

export default function SwitchDemo() {
  return (
    <div className="flex flex-col gap-2">
      <Switch defaultChecked>Notifications</Switch>
      <Switch>Dark mode on schedule</Switch>
      <Switch disabled>Two-step sign-in (managed by your company)</Switch>
    </div>
  );
}
