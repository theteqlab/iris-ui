"use client";

import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@irisui/ui";
import { useState } from "react";

export default function DialogControlled() {
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  const save = () => {
    setSaving(true);
    // Close once the work is done.
    setTimeout(() => {
      setSaving(false);
      setOpen(false);
    }, 1200);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button look="glass">Publish</Button>
      </DialogTrigger>
      <DialogContent size="sm">
        <DialogHeader>
          <DialogTitle>Publish the article?</DialogTitle>
          <DialogDescription>It will be visible to everyone.</DialogDescription>
        </DialogHeader>
        <DialogFooter className="pt-6">
          <Button look="ghost" onClick={() => setOpen(false)} disabled={saving}>
            Not now
          </Button>
          <Button look="solid" tone={3} loading={saving} onClick={save}>
            Publish
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
