import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { expectNoAxeViolations } from "../../../../test/axe";
import { Button } from "../button/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./alert-dialog";

function Confirm({ onDelete = () => {} }: { onDelete?: () => void }) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button>Delete</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete the file?</AlertDialogTitle>
          <AlertDialogDescription>It cannot be restored.</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction tone="danger" onClick={onDelete}>
            Delete file
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

describe("AlertDialog", () => {
  it("opens as an alertdialog, named and described, with the focus on Cancel", async () => {
    render(<Confirm />);
    await userEvent.click(screen.getByRole("button", { name: "Delete" }));
    const dialog = screen.getByRole("alertdialog", { name: "Delete the file?" });
    expect(dialog).toHaveAccessibleDescription("It cannot be restored.");
    expect(dialog).toHaveAttribute("data-size", "sm");
    expect(screen.getByRole("button", { name: "Cancel" })).toHaveFocus();
  });

  it("runs the action and closes", async () => {
    const onDelete = vi.fn();
    render(<Confirm onDelete={onDelete} />);
    await userEvent.click(screen.getByRole("button", { name: "Delete" }));
    await userEvent.click(screen.getByRole("button", { name: "Delete file" }));
    expect(onDelete).toHaveBeenCalledOnce();
    expect(screen.queryByRole("alertdialog")).toBeNull();
  });

  it("closes with Escape, not with a click outside", async () => {
    render(<Confirm />);
    const trigger = screen.getByRole("button", { name: "Delete" });
    await userEvent.click(trigger);
    // The page behind is inert (pointer-events: none): click it anyway.
    await userEvent.setup({ pointerEventsCheck: 0 }).click(document.body);
    expect(screen.getByRole("alertdialog")).toBeInTheDocument();
    await userEvent.keyboard("{Escape}");
    expect(screen.queryByRole("alertdialog")).toBeNull();
    expect(trigger).toHaveFocus();
  });

  it("styles its buttons as Buttons", async () => {
    render(<Confirm />);
    await userEvent.click(screen.getByRole("button", { name: "Delete" }));
    expect(screen.getByRole("button", { name: "Delete file" })).toHaveAttribute(
      "data-look",
      "solid",
    );
    expect(screen.getByRole("button", { name: "Delete file" })).toHaveAttribute(
      "data-tone",
      "danger",
    );
    expect(screen.getByRole("button", { name: "Cancel" })).toHaveAttribute("data-look", "ghost");
  });

  it("has no axe violations, open", async () => {
    render(<Confirm />);
    await userEvent.click(screen.getByRole("button", { name: "Delete" }));
    await expectNoAxeViolations(document.body);
  });
});
