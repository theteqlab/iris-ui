import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { expectNoAxeViolations } from "../../../../test/axe";
import { Switch } from "./switch";

describe("Switch", () => {
  it("toggles by clicking its label and with the keyboard", async () => {
    const onCheckedChange = vi.fn();
    render(<Switch onCheckedChange={onCheckedChange}>Notifications</Switch>);
    const toggle = screen.getByRole("switch", { name: "Notifications" });
    expect(toggle).not.toBeChecked();

    await userEvent.click(screen.getByText("Notifications"));
    expect(toggle).toBeChecked();
    expect(toggle).toHaveAttribute("data-state", "checked");

    toggle.focus();
    await userEvent.keyboard(" ");
    expect(onCheckedChange).toHaveBeenLastCalledWith(false);
  });

  it("takes a size", () => {
    render(<Switch aria-label="Wi-Fi" size="lg" />);
    const toggle = screen.getByRole("switch", { name: "Wi-Fi" });
    expect(toggle).toHaveAttribute("data-size", "lg");
    expect(toggle.className).toContain("w-[76px]");
  });

  it("requires a label at the type level", () => {
    // @ts-expect-error a Switch needs children, aria-label or aria-labelledby
    render(<Switch />);
    expect(screen.getByRole("switch")).toBeInTheDocument();
  });

  it("has no axe violations", async () => {
    const { container } = render(
      <div>
        <Switch defaultChecked>On</Switch>
        <Switch aria-label="Off" disabled />
      </div>,
    );
    await expectNoAxeViolations(container);
  });
});
