"use client";

import { Button, toast } from "@irisui/ui";

// <Toaster /> is rendered once, at the root of the app.
export default function ToastDemo() {
  return (
    <Button
      look="glass"
      onClick={() => toast("Event created", { description: "Friday 14 June at 10:00" })}
    >
      Add to calendar
    </Button>
  );
}
