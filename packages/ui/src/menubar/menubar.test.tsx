import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { expectNoAxeViolations } from "../../../../test/axe";
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "./menubar";

function AppMenus() {
  return (
    <Menubar aria-label="Editor">
      <MenubarMenu>
        <MenubarTrigger>File</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>New</MenubarItem>
          <MenubarItem>Open</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>View</MenubarTrigger>
        <MenubarContent>
          <MenubarCheckboxItem checked>Rulers</MenubarCheckboxItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}

describe("Menubar", () => {
  it("is a menubar of menus", async () => {
    render(<AppMenus />);
    expect(screen.getByRole("menubar", { name: "Editor" })).toBeInTheDocument();
    await userEvent.click(screen.getByRole("menuitem", { name: "File" }));
    expect(screen.getByRole("menuitem", { name: "New" })).toBeInTheDocument();
  });

  it("moves between menus with the arrow keys", async () => {
    render(<AppMenus />);
    await userEvent.tab();
    expect(screen.getByRole("menuitem", { name: "File" })).toHaveFocus();
    await userEvent.keyboard("{ArrowRight}");
    expect(screen.getByRole("menuitem", { name: "View" })).toHaveFocus();
  });

  it("has no axe violations, open", async () => {
    render(<AppMenus />);
    await userEvent.click(screen.getByRole("menuitem", { name: "View" }));
    await expectNoAxeViolations(document.body);
  });
});
