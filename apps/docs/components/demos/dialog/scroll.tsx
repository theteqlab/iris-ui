"use client";

import {
  Button,
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@irisui/ui";

const sections = Array.from({ length: 8 }, (_, i) => i + 1);

export default function DialogScroll() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button look="glass">Read the terms</Button>
      </DialogTrigger>
      <DialogContent size="lg">
        <DialogHeader>
          <DialogTitle>Terms of use</DialogTitle>
        </DialogHeader>
        {/* The body scrolls; the header and the actions stay in place. */}
        <DialogBody>
          {sections.map((n) => (
            <p key={n} className="m-0 text-text-muted">
              {n}. The service is provided as is. You keep the rights to what you publish and grant
              us the right to show it to the people you share it with.
            </p>
          ))}
        </DialogBody>
        <DialogFooter className="pt-6">
          <DialogClose asChild>
            <Button look="solid" tone={3}>
              Accept
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
