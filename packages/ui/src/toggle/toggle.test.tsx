import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { expectNoAxeViolations } from "../../../../test/axe";
import { Toggle } from "./toggle";

describe("Toggle", () => {
  it("is a button that stays pressed", async () => {
    const onPressedChange = vi.fn();
    render(<Toggle onPressedChange={onPressedChange}>Bold</Toggle>);
    const button = screen.getByRole("button", { name: "Bold" });
    expect(button).toHaveAttribute("aria-pressed", "false");
    await userEvent.click(button);
    expect(button).toHaveAttribute("aria-pressed", "true");
    expect(button).toHaveAttribute("data-state", "on");
    expect(onPressedChange).toHaveBeenCalledWith(true);
  });

  it("toggles with Space and Enter", async () => {
    render(<Toggle aria-label="Italic">I</Toggle>);
    const button = screen.getByRole("button", { name: "Italic" });
    button.focus();
    await userEvent.keyboard(" ");
    expect(button).toHaveAttribute("aria-pressed", "true");
    await userEvent.keyboard("{Enter}");
    expect(button).toHaveAttribute("aria-pressed", "false");
  });

  it("has the size's height", () => {
    render(<Toggle size="lg">Grid</Toggle>);
    expect(screen.getByRole("button")).toHaveAttribute("data-size", "lg");
  });

  it("has no axe violations", async () => {
    const { container } = render(<Toggle defaultPressed>Bold</Toggle>);
    await expectNoAxeViolations(container);
  });
});
