import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { expectNoAxeViolations } from "../../../../test/axe";
import {
  Toolbar,
  ToolbarButton,
  ToolbarSeparator,
  ToolbarToggleGroup,
  ToolbarToggleItem,
} from "./toolbar";

function Formatting() {
  return (
    <Toolbar aria-label="Formatting">
      <ToolbarToggleGroup type="multiple" aria-label="Style">
        <ToolbarToggleItem value="bold">Bold</ToolbarToggleItem>
        <ToolbarToggleItem value="italic">Italic</ToolbarToggleItem>
      </ToolbarToggleGroup>
      <ToolbarSeparator />
      <ToolbarButton>Share</ToolbarButton>
    </Toolbar>
  );
}

describe("Toolbar", () => {
  it("is a named toolbar with one Tab stop and arrow keys inside", async () => {
    render(<Formatting />);
    expect(screen.getByRole("toolbar", { name: "Formatting" })).toBeInTheDocument();
    await userEvent.tab();
    expect(screen.getByRole("button", { name: "Bold" })).toHaveFocus();
    await userEvent.keyboard("{ArrowRight}{ArrowRight}");
    expect(screen.getByRole("button", { name: "Share" })).toHaveFocus();
    await userEvent.tab();
    expect(document.body).toHaveFocus();
  });

  it("presses its toggle items", async () => {
    render(<Formatting />);
    await userEvent.click(screen.getByRole("button", { name: "Italic" }));
    expect(screen.getByRole("button", { name: "Italic" })).toHaveAttribute("aria-pressed", "true");
  });

  it("has no axe violations", async () => {
    const { container } = render(<Formatting />);
    await expectNoAxeViolations(container);
  });
});
