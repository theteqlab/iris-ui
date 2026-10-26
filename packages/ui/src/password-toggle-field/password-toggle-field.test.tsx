import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { expectNoAxeViolations } from "../../../../test/axe";
import { Field, FieldError, FieldLabel } from "../field/field";
import { LocaleProvider, fr } from "../locale/messages";
import { PasswordToggleField } from "./password-toggle-field";

function Password(props: { error?: string }) {
  return (
    <Field>
      <FieldLabel>Password</FieldLabel>
      <PasswordToggleField defaultValue="s3cret" />
      <FieldError>{props.error}</FieldError>
    </Field>
  );
}

describe("PasswordToggleField", () => {
  it("is a labelled password input, hidden by default", () => {
    render(<Password />);
    const input = screen.getByLabelText("Password");
    expect(input).toHaveAttribute("type", "password");
    expect(input).toHaveAttribute("autocomplete", "current-password");
  });

  it("shows and hides the password from its button", async () => {
    const onVisibilityChange = vi.fn();
    render(<PasswordToggleField aria-label="Password" onVisibilityChange={onVisibilityChange} />);
    await userEvent.click(screen.getByRole("button", { name: "Show password" }));
    expect(screen.getByLabelText("Password")).toHaveAttribute("type", "text");
    expect(onVisibilityChange).toHaveBeenCalledWith(true);
    await userEvent.click(screen.getByRole("button", { name: "Hide password" }));
    expect(screen.getByLabelText("Password")).toHaveAttribute("type", "password");
  });

  it("takes its button labels from LocaleProvider", () => {
    render(
      <LocaleProvider messages={fr}>
        <PasswordToggleField aria-label="Mot de passe" />
      </LocaleProvider>,
    );
    expect(screen.getByRole("button", { name: "Afficher le mot de passe" })).toBeInTheDocument();
  });

  it("is invalid with a Field error", () => {
    render(<Password error="Too short." />);
    expect(screen.getByLabelText("Password")).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByLabelText("Password")).toHaveAccessibleDescription("Too short.");
  });

  it("has no axe violations", async () => {
    const { container } = render(<Password />);
    await expectNoAxeViolations(container);
  });
});
