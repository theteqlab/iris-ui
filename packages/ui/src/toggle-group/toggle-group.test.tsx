import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { expectNoAxeViolations } from "../../../../test/axe";
import { ToggleGroup, ToggleGroupItem } from "./toggle-group";

function Align(props: { type?: "single" | "multiple" }) {
  const items = (
    <>
      <ToggleGroupItem value="left">Left</ToggleGroupItem>
      <ToggleGroupItem value="center">Center</ToggleGroupItem>
      <ToggleGroupItem value="right">Right</ToggleGroupItem>
    </>
  );
  return props.type === "multiple" ? (
    <ToggleGroup type="multiple" aria-label="Styles" size="sm">
      {items}
    </ToggleGroup>
  ) : (
    <ToggleGroup type="single" aria-label="Alignment" defaultValue="left">
      {items}
    </ToggleGroup>
  );
}

describe("ToggleGroup", () => {
  it("keeps one item pressed with type single", async () => {
    render(<Align />);
    expect(screen.getByRole("radio", { name: "Left" })).toBeChecked();
    await userEvent.click(screen.getByRole("radio", { name: "Right" }));
    expect(screen.getByRole("radio", { name: "Right" })).toBeChecked();
    expect(screen.getByRole("radio", { name: "Left" })).not.toBeChecked();
  });

  it("presses several items with type multiple, at the group's size", async () => {
    render(<Align type="multiple" />);
    await userEvent.click(screen.getByRole("button", { name: "Left" }));
    await userEvent.click(screen.getByRole("button", { name: "Right" }));
    expect(screen.getByRole("button", { name: "Left" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("button", { name: "Right" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("button", { name: "Left" })).toHaveAttribute("data-size", "sm");
  });

  it("moves between items with the arrow keys", async () => {
    render(<Align />);
    await userEvent.tab();
    expect(screen.getByRole("radio", { name: "Left" })).toHaveFocus();
    await userEvent.keyboard("{ArrowRight}");
    expect(screen.getByRole("radio", { name: "Center" })).toHaveFocus();
  });

  it("has no axe violations", async () => {
    const { container } = render(<Align />);
    await expectNoAxeViolations(container);
  });
});
