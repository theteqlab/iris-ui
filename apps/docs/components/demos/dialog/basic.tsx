"use client";

import {
  Button,
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Field,
  FieldLabel,
  Input,
} from "@irisui/ui";

export default function DialogDemo() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button look="holo">Edit profile</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>Changes are saved when you click Save.</DialogDescription>
        </DialogHeader>
        <DialogBody>
          <Field>
            <FieldLabel>Name</FieldLabel>
            <Input defaultValue="Camille Laurent" />
          </Field>
          <Field>
            <FieldLabel>Email</FieldLabel>
            <Input type="email" defaultValue="camille@example.com" />
          </Field>
        </DialogBody>
        <DialogFooter>
          <DialogClose asChild>
            <Button look="ghost">Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button look="solid" tone={3}>
              Save
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
