import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { expectNoAxeViolations } from "../../../../test/axe";
import { Field, FieldDescription, FieldLabel } from "../field/field";
import { RadioGroup, RadioGroupItem } from "./radio-group";

function Shipping(props: Parameters<typeof RadioGroup>[0]) {
  return (
    <RadioGroup aria-label="Shipping" {...props}>
      <RadioGroupItem value="standard">Standard</RadioGroupItem>
      <RadioGroupItem value="express">Express</RadioGroupItem>
      <RadioGroupItem value="pickup" disabled>
        Pickup
      </RadioGroupItem>
    </RadioGroup>
  );
}

describe("RadioGroup", () => {
  it("selects with a click, and moves with the arrow keys", async () => {
    const onValueChange = vi.fn();
    render(<Shipping defaultValue="standard" onValueChange={onValueChange} />);
    const standard = screen.getByRole("radio", { name: "Standard" });
    expect(standard).toBeChecked();

    await userEvent.click(screen.getByText("Express"));
    const express = screen.getByRole("radio", { name: "Express" });
    expect(express).toBeChecked();
    expect(onValueChange).toHaveBeenLastCalledWith("express");

    // Arrow keys move the focus (selection on arrow is checked in a real browser, e2e).
    express.focus();
    await userEvent.keyboard("{ArrowUp}");
    expect(standard).toHaveFocus();
    await userEvent.keyboard(" ");
    expect(standard).toBeChecked();
  });

  it("skips disabled options", async () => {
    render(<Shipping defaultValue="express" />);
    screen.getByRole("radio", { name: "Express" }).focus();
    await userEvent.keyboard("{ArrowDown}");
    expect(screen.getByRole("radio", { name: "Standard" })).toHaveFocus();
  });

  it("is laid out horizontally on request", () => {
    render(<Shipping orientation="horizontal" />);
    const group = screen.getByRole("radiogroup");
    expect(group).toHaveAttribute("aria-orientation", "horizontal");
    expect(group.className).toContain("flex-row");
  });

  it("is named and described by its Field", () => {
    render(
      <Field>
        <FieldLabel>Delivery</FieldLabel>
        <RadioGroup>
          <RadioGroupItem value="home">Home</RadioGroupItem>
        </RadioGroup>
        <FieldDescription>No delivery on Sundays.</FieldDescription>
      </Field>,
    );
    const group = screen.getByRole("radiogroup", { name: "Delivery" });
    expect(group).toHaveAccessibleDescription("No delivery on Sundays.");
  });

  it("has no axe violations", async () => {
    const { container } = render(<Shipping defaultValue="standard" />);
    await expectNoAxeViolations(container);
  });
});
