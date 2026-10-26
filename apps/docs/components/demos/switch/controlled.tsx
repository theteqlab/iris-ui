"use client";

import { Switch } from "@irisui/ui";
import { useState } from "react";

export default function SwitchControlled() {
  const [on, setOn] = useState(true);
  return (
    <div className="flex flex-col items-center gap-3">
      <Switch checked={on} onCheckedChange={setOn}>
        Public profile
      </Switch>
      <p className="m-0 text-sm text-text-muted">
        {on ? "Anyone with the link can see it." : "Only you can see it."}
      </p>
    </div>
  );
}
