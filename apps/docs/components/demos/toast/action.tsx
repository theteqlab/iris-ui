"use client";

import { Button, toast } from "@irisui/ui";

export default function ToastAction() {
  return (
    <Button
      look="solid"
      tone="danger"
      onClick={() =>
        toast("Project deleted", {
          action: { label: "Undo", onClick: () => toast.success("Project restored") },
        })
      }
    >
      Delete project
    </Button>
  );
}
