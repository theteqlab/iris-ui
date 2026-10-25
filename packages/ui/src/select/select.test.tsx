import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { expectNoAxeViolations } from "../../../../test/axe";
import { Field, FieldError, FieldLabel } from "../field/field";
import { LocaleProvider, fr } from "../locale/messages";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "./select";

function Carrier(props: Parameters<typeof Select>[0]) {
  return (
    <Select {...props}>
      <SelectTrigger aria-label="Carrier">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Home</SelectLabel>
          <SelectItem value="colissimo">Colissimo</SelectItem>
          <SelectItem value="chronopost">Chronopost</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectItem value="relay">Mondial Relay</SelectItem>
        <SelectItem value="dpd" disabled>
          DPD
        </SelectItem>
      </SelectContent>
    </Select>
  );
}

describe("Select", () => {
  it("shows the placeholder, opens and chooses an option", async () => {
    const onValueChange = vi.fn();
    render(<Carrier onValueChange={onValueChange} />);
    const trigger = screen.getByRole("combobox", { name: "Carrier" });
    expect(trigger).toHaveTextContent("Select…");

    await userEvent.click(trigger);
    expect(screen.getByRole("listbox")).toBeInTheDocument();
    expect(screen.getByRole("group", { name: "Home" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "DPD" })).toHaveAttribute("aria-disabled", "true");

    await userEvent.click(screen.getByRole("option", { name: "Chronopost" }));
    expect(onValueChange).toHaveBeenCalledWith("chronopost");
    expect(trigger).toHaveTextContent("Chronopost");
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("marks the chosen option", async () => {
    render(<Carrier defaultValue="relay" />);
    await userEvent.click(screen.getByRole("combobox"));
    expect(screen.getByRole("option", { name: "Mondial Relay" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
  });

  it("uses the locale's placeholder", () => {
    render(
      <LocaleProvider messages={fr}>
        <Carrier />
      </LocaleProvider>,
    );
    expect(screen.getByRole("combobox")).toHaveTextContent("Choisir…");
  });

  it("takes its label, error and state from a Field", () => {
    render(
      <Field required>
        <FieldLabel>Plan</FieldLabel>
        <Select>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pro">Pro</SelectItem>
          </SelectContent>
        </Select>
        <FieldError>Choose a plan.</FieldError>
      </Field>,
    );
    const trigger = screen.getByRole("combobox", { name: "Plan" });
    expect(trigger).toHaveAttribute("aria-invalid", "true");
    expect(trigger).toHaveAttribute("aria-required", "true");
    expect(trigger).toHaveAccessibleDescription("Choose a plan.");
  });

  it("is disabled", () => {
    render(<Carrier disabled />);
    expect(screen.getByRole("combobox")).toBeDisabled();
  });

  it("has no axe violations, closed and open", async () => {
    const { baseElement } = render(<Carrier defaultValue="colissimo" />);
    await expectNoAxeViolations(baseElement);
    await userEvent.click(screen.getByRole("combobox"));
    await expectNoAxeViolations(baseElement);
  });
});
