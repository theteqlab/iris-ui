import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { describe, expect, it, vi } from "vitest";
import { expectNoAxeViolations } from "../../../../test/axe";
import { Button } from "../button/button";
import { LocaleProvider, fr } from "../locale/messages";
import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog";

function Delete(props: Parameters<typeof Dialog>[0] & { size?: "sm" | "md" | "lg" }) {
  const { size, ...root } = props;
  return (
    <Dialog {...root}>
      <DialogTrigger asChild>
        <Button>Delete project</Button>
      </DialogTrigger>
      <DialogContent size={size}>
        <DialogHeader>
          <DialogTitle>Delete the project?</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <DialogDescription>This cannot be undone.</DialogDescription>
          <input aria-label="Project name" />
        </DialogBody>
        <DialogFooter>
          <DialogClose asChild>
            <Button look="outline">Cancel</Button>
          </DialogClose>
          <Button look="solid" tone="danger">
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

describe("Dialog", () => {
  it("opens from its trigger, named and described, with the focus inside", async () => {
    render(<Delete />);
    await userEvent.click(screen.getByRole("button", { name: "Delete project" }));
    const dialog = screen.getByRole("dialog", { name: "Delete the project?" });
    expect(dialog).toHaveAccessibleDescription("This cannot be undone.");
    expect(dialog).toHaveAttribute("data-size", "md");
    expect(dialog.contains(document.activeElement)).toBe(true);
  });

  it("closes with Escape and gives the focus back to the trigger", async () => {
    render(<Delete />);
    const trigger = screen.getByRole("button", { name: "Delete project" });
    await userEvent.click(trigger);
    await userEvent.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });

  it("closes with the close button and with DialogClose", async () => {
    const onOpenChange = vi.fn();
    render(<Delete onOpenChange={onOpenChange} />);
    await userEvent.click(screen.getByRole("button", { name: "Delete project" }));
    await userEvent.click(screen.getByRole("button", { name: "Close" }));
    expect(onOpenChange).toHaveBeenLastCalledWith(false);

    await userEvent.click(screen.getByRole("button", { name: "Delete project" }));
    await userEvent.click(screen.getByRole("button", { name: "Cancel" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("keeps the focus inside with Tab", async () => {
    render(<Delete defaultOpen />);
    const dialog = screen.getByRole("dialog");
    for (let i = 0; i < 6; i++) {
      await userEvent.tab();
      expect(dialog.contains(document.activeElement)).toBe(true);
    }
  });

  it("is controlled", async () => {
    function Controlled() {
      const [open, setOpen] = useState(false);
      return (
        <>
          <span>{open ? "open" : "closed"}</span>
          <Delete open={open} onOpenChange={setOpen} size="lg" />
        </>
      );
    }
    render(<Controlled />);
    await userEvent.click(screen.getByRole("button", { name: "Delete project" }));
    expect(screen.getByText("open")).toBeInTheDocument();
    expect(screen.getByRole("dialog")).toHaveAttribute("data-size", "lg");
  });

  it("uses the locale's close label", async () => {
    render(
      <LocaleProvider messages={fr}>
        <Delete defaultOpen />
      </LocaleProvider>,
    );
    expect(screen.getByRole("button", { name: "Fermer" })).toBeInTheDocument();
  });

  it("has no axe violations when open", async () => {
    const { baseElement } = render(<Delete defaultOpen />);
    await expectNoAxeViolations(baseElement);
  });
});
