import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef } from "react";
import { describe, expect, it, vi } from "vitest";
import { expectNoAxeViolations } from "../../../../test/axe";
import { Input } from "./input";

describe("Input", () => {
  it("forwards native props and the ref to the input", async () => {
    const ref = createRef<HTMLInputElement>();
    const onChange = vi.fn();
    render(<Input ref={ref} aria-label="Search" placeholder="Search…" onChange={onChange} />);
    const input = screen.getByRole("textbox", { name: "Search" });
    expect(ref.current).toBe(input);
    await userEvent.type(input, "glass");
    expect(input).toHaveValue("glass");
    expect(onChange).toHaveBeenCalledTimes(5);
  });

  it("styles the box, not the input, with className", () => {
    render(<Input aria-label="City" className="max-w-xs" inputClassName="text-right" size="lg" />);
    const input = screen.getByRole("textbox");
    expect(input.parentElement?.className).toContain("max-w-xs");
    expect(input.parentElement).toHaveAttribute("data-size", "lg");
    expect(input.className).toContain("text-right");
  });

  it("marks itself invalid", () => {
    render(<Input aria-label="Code" invalid />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input.parentElement).toHaveAttribute("data-invalid");
  });

  it("renders a decorative start icon and an end slot", () => {
    render(
      <Input
        aria-label="Amount"
        startIcon={<svg data-testid="icon" />}
        endSlot={<button type="button">Clear</button>}
      />,
    );
    expect(screen.getByTestId("icon").parentElement).toHaveAttribute("aria-hidden", "true");
    expect(screen.getByRole("button", { name: "Clear" })).toBeInTheDocument();
  });

  it("is disabled", () => {
    render(<Input aria-label="Off" disabled />);
    const input = screen.getByRole("textbox");
    expect(input).toBeDisabled();
    expect(input.parentElement).toHaveAttribute("data-disabled");
  });

  it("has no axe violations", async () => {
    const { container } = render(<Input aria-label="Email" type="email" invalid />);
    await expectNoAxeViolations(container);
  });
});
