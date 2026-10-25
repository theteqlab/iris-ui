import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { expectNoAxeViolations } from "../../../../test/axe";
import { Field, FieldError, FieldLabel } from "../field/field";
import { Checkbox } from "./checkbox";

describe("Checkbox", () => {
  it("toggles by clicking its label and with the keyboard", async () => {
    const onCheckedChange = vi.fn();
    render(<Checkbox onCheckedChange={onCheckedChange}>I accept the terms</Checkbox>);
    const checkbox = screen.getByRole("checkbox", { name: "I accept the terms" });
    expect(checkbox).not.toBeChecked();

    await userEvent.click(screen.getByText("I accept the terms"));
    expect(checkbox).toBeChecked();
    expect(checkbox).toHaveAttribute("data-state", "checked");

    checkbox.focus();
    await userEvent.keyboard(" ");
    expect(checkbox).not.toBeChecked();
    expect(onCheckedChange).toHaveBeenLastCalledWith(false);
  });

  it("shows the indeterminate state", () => {
    render(<Checkbox aria-label="Select all" defaultChecked="indeterminate" />);
    const checkbox = screen.getByRole("checkbox", { name: "Select all" });
    expect(checkbox).toHaveAttribute("aria-checked", "mixed");
    expect(checkbox).toHaveAttribute("data-state", "indeterminate");
  });

  it("is disabled", async () => {
    render(<Checkbox disabled>Off</Checkbox>);
    const checkbox = screen.getByRole("checkbox", { name: "Off" });
    expect(checkbox).toBeDisabled();
    await userEvent.click(screen.getByText("Off"));
    expect(checkbox).not.toBeChecked();
  });

  it("takes its label, error and invalid state from a Field", () => {
    render(
      <Field>
        <FieldLabel>Newsletter</FieldLabel>
        <Checkbox />
        <FieldError>Required.</FieldError>
      </Field>,
    );
    const checkbox = screen.getByRole("checkbox", { name: "Newsletter" });
    expect(checkbox).toHaveAttribute("aria-invalid", "true");
    expect(checkbox).toHaveAccessibleDescription("Required.");
    expect(checkbox).toHaveAttribute("data-invalid");
  });

  it("has no axe violations", async () => {
    const { container } = render(
      <div>
        <Checkbox defaultChecked>Checked</Checkbox>
        <Checkbox aria-label="Unlabelled" />
      </div>,
    );
    await expectNoAxeViolations(container);
  });
});
