"use client";

import { Button, toast } from "@irisui/ui";

export default function ToastTones() {
  return (
    <>
      <Button
        look="outline"
        tone={3}
        onClick={() => toast.success("Saved", { description: "Your changes are live." })}
      >
        Success
      </Button>
      <Button look="outline" tone={2} onClick={() => toast.info("A new version is available")}>
        Info
      </Button>
      <Button look="outline" tone={4} onClick={() => toast.warning("Storage almost full")}>
        Warning
      </Button>
      <Button
        look="outline"
        tone="danger"
        onClick={() => toast.error("Payment declined", { description: "Check your card." })}
      >
        Error
      </Button>
    </>
  );
}
