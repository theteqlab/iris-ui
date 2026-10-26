"use client";

import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@irisui/ui";

export default function DialogDanger() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button look="outline" tone="danger">
          Delete project
        </Button>
      </DialogTrigger>
      {/* No close button: the choice must be explicit. */}
      <DialogContent size="sm" showClose={false} onInteractOutside={(e) => e.preventDefault()}>
        <DialogHeader className="pr-7">
          <DialogTitle>Delete this project?</DialogTitle>
          <DialogDescription>
            Its 12 files will be deleted. This cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="pt-6">
          <DialogClose asChild>
            <Button look="ghost">Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button look="solid" tone="danger">
              Delete
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
