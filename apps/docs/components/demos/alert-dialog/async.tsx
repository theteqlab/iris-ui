"use client";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button,
} from "@irisui/ui";
import { useState } from "react";

export default function AlertDialogAsync() {
  const [open, setOpen] = useState(false);
  const [leaving, setLeaving] = useState(false);

  // A plain Button instead of AlertDialogAction: the dialog stays open until the work is done.
  const leave = () => {
    setLeaving(true);
    setTimeout(() => {
      setLeaving(false);
      setOpen(false);
    }, 1200);
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button look="glass">Leave the team</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Leave the team?</AlertDialogTitle>
          <AlertDialogDescription>You will lose access to its projects.</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={leaving}>Stay</AlertDialogCancel>
          <Button look="solid" tone="danger" loading={leaving} onClick={leave}>
            Leave
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
