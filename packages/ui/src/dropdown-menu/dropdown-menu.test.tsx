import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { expectNoAxeViolations } from "../../../../test/axe";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "./dropdown-menu";

function Actions({ onEdit = vi.fn(), onDelete = vi.fn() }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>Actions</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Project</DropdownMenuLabel>
        <DropdownMenuItem onSelect={onEdit}>
          Edit <DropdownMenuShortcut>⌘E</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem disabled>Archive</DropdownMenuItem>
        <DropdownMenuCheckboxItem checked>Show grid</DropdownMenuCheckboxItem>
        <DropdownMenuRadioGroup value="list">
          <DropdownMenuRadioItem value="list">List</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="cards">Cards</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Share</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem>Copy link</DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="danger" onSelect={onDelete}>
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

describe("DropdownMenu", () => {
  it("opens, lists its items and runs the chosen one", async () => {
    const onEdit = vi.fn();
    render(<Actions onEdit={onEdit} />);
    await userEvent.click(screen.getByRole("button", { name: "Actions" }));
    expect(screen.getByRole("menu")).toBeInTheDocument();
    expect(screen.getByRole("menuitem", { name: "Archive" })).toHaveAttribute("data-disabled");
    expect(screen.getByRole("menuitemcheckbox", { name: "Show grid" })).toBeChecked();
    expect(screen.getByRole("menuitemradio", { name: "List" })).toBeChecked();

    await userEvent.click(screen.getByRole("menuitem", { name: /Edit/ }));
    expect(onEdit).toHaveBeenCalledOnce();
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it("is used with the keyboard", async () => {
    const onDelete = vi.fn();
    render(<Actions onDelete={onDelete} />);
    screen.getByRole("button", { name: "Actions" }).focus();
    await userEvent.keyboard("{Enter}");
    expect(screen.getByRole("menuitem", { name: /Edit/ })).toHaveFocus();
    await userEvent.keyboard("{End}{Enter}");
    expect(onDelete).toHaveBeenCalledOnce();
  });

  it("marks destructive items", async () => {
    render(<Actions />);
    await userEvent.click(screen.getByRole("button", { name: "Actions" }));
    expect(screen.getByRole("menuitem", { name: "Delete" })).toHaveAttribute(
      "data-variant",
      "danger",
    );
  });

  it("opens a submenu with the arrow key", async () => {
    render(<Actions />);
    await userEvent.click(screen.getByRole("button", { name: "Actions" }));
    screen.getByRole("menuitem", { name: "Share" }).focus();
    await userEvent.keyboard("{ArrowRight}");
    expect(await screen.findByRole("menuitem", { name: "Copy link" })).toBeInTheDocument();
  });

  it("has no axe violations when open", async () => {
    const { baseElement } = render(<Actions />);
    await userEvent.click(screen.getByRole("button", { name: "Actions" }));
    await expectNoAxeViolations(baseElement);
  });
});
