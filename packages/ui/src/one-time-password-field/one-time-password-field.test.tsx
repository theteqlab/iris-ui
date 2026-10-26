import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { expectNoAxeViolations } from "../../../../test/axe";
import { Field, FieldLabel } from "../field/field";
import { OneTimePasswordField } from "./one-time-password-field";

function Code(props: { onValueChange?: (value: string) => void }) {
  return (
    <Field>
      <FieldLabel>Verification code</FieldLabel>
      <OneTimePasswordField length={4} onValueChange={props.onValueChange} />
    </Field>
  );
}

describe("OneTimePasswordField", () => {
  it("is a group named by its Field, with one labelled box per character", () => {
    render(<Code />);
    const group = screen.getByRole("group", { name: "Verification code" });
    expect(group).toBeInTheDocument();
    expect(screen.getAllByRole("textbox")).toHaveLength(4);
    expect(screen.getByRole("textbox", { name: "Character 1 of 4" })).toBeInTheDocument();
  });

  it("moves to the next box as you type", async () => {
    const onValueChange = vi.fn();
    render(<Code onValueChange={onValueChange} />);
    await userEvent.click(screen.getByRole("textbox", { name: "Character 1 of 4" }));
    await userEvent.keyboard("12");
    expect(screen.getByRole("textbox", { name: "Character 3 of 4" })).toHaveFocus();
    expect(onValueChange).toHaveBeenLastCalledWith("12");
  });

  it("has no axe violations", async () => {
    const { container } = render(<Code />);
    await expectNoAxeViolations(container);
  });
});
