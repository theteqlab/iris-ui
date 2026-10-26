import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { expectNoAxeViolations } from "../../../../test/axe";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from "./context-menu";

function FileMenu({ onDelete = () => {} }: { onDelete?: () => void }) {
  return (
    <ContextMenu>
      <ContextMenuTrigger>Right-click the file</ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>
          Rename <ContextMenuShortcut>F2</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem variant="danger" onSelect={onDelete}>
          Delete
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}

describe("ContextMenu", () => {
  it("opens on a right click and runs the chosen item", async () => {
    const onDelete = vi.fn();
    render(<FileMenu onDelete={onDelete} />);
    fireEvent.contextMenu(screen.getByText("Right-click the file"));
    expect(screen.getByRole("menu")).toBeInTheDocument();
    await userEvent.click(screen.getByRole("menuitem", { name: "Delete" }));
    expect(onDelete).toHaveBeenCalledOnce();
    expect(screen.queryByRole("menu")).toBeNull();
  });

  it("marks the destructive item", () => {
    render(<FileMenu />);
    fireEvent.contextMenu(screen.getByText("Right-click the file"));
    expect(screen.getByRole("menuitem", { name: "Delete" })).toHaveAttribute(
      "data-variant",
      "danger",
    );
  });

  it("has no axe violations, open", async () => {
    render(<FileMenu />);
    fireEvent.contextMenu(screen.getByText("Right-click the file"));
    await expectNoAxeViolations(document.body);
  });
});
