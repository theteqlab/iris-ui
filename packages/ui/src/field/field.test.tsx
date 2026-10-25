import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { expectNoAxeViolations } from "../../../../test/axe";
import { Input } from "../input/input";
import { Textarea } from "../textarea/textarea";
import { Field, FieldDescription, FieldError, FieldLabel } from "./field";

describe("Field", () => {
  it("links the label, the description and the control", () => {
    render(
      <Field>
        <FieldLabel>Email</FieldLabel>
        <Input type="email" />
        <FieldDescription>We never share it.</FieldDescription>
      </Field>,
    );
    const input = screen.getByLabelText("Email");
    expect(input).toHaveAccessibleDescription("We never share it.");
    expect(input).not.toHaveAttribute("aria-invalid");
  });

  it("marks the control invalid when an error is shown, and describes it", () => {
    render(
      <Field>
        <FieldLabel>Code</FieldLabel>
        <Input />
        <FieldDescription>6 characters.</FieldDescription>
        <FieldError>This code has expired.</FieldError>
      </Field>,
    );
    const input = screen.getByLabelText("Code");
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAccessibleDescription("6 characters. This code has expired.");
    expect(input.parentElement).toHaveAttribute("data-invalid");
  });

  it("renders nothing for an empty error", () => {
    render(
      <Field>
        <FieldLabel>Name</FieldLabel>
        <Input />
        <FieldError>{null}</FieldError>
      </Field>,
    );
    expect(screen.getByLabelText("Name")).not.toHaveAttribute("aria-invalid");
  });

  it("passes disabled and required to the control", () => {
    render(
      <Field disabled required>
        <FieldLabel>Notes</FieldLabel>
        <Textarea />
      </Field>,
    );
    const textarea = screen.getByLabelText("Notes");
    expect(textarea).toBeDisabled();
    expect(textarea).toBeRequired();
  });

  it("keeps the control's own id and description", () => {
    render(
      <Field>
        <FieldLabel htmlFor="custom">City</FieldLabel>
        <p id="hint">Where you live.</p>
        <Input id="custom" aria-describedby="hint" />
        <FieldDescription>Optional.</FieldDescription>
      </Field>,
    );
    expect(screen.getByLabelText("City")).toHaveAccessibleDescription("Where you live. Optional.");
  });

  it("has no axe violations", async () => {
    const { container } = render(
      <Field>
        <FieldLabel>Promo code</FieldLabel>
        <Input />
        <FieldError>Expired.</FieldError>
      </Field>,
    );
    await expectNoAxeViolations(container);
  });
});
