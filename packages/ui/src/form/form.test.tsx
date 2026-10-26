import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { expectNoAxeViolations } from "../../../../test/axe";
import { Button } from "../button/button";
import { Input } from "../input/input";
import { Form, FormControl, FormField, FormLabel, FormMessage, FormSubmit } from "./form";

function Signup({ onSubmit = () => {} }: { onSubmit?: () => void }) {
  return (
    <Form
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit();
      }}
    >
      <FormField name="email">
        <FormLabel>Email</FormLabel>
        <FormControl asChild>
          <Input type="email" required />
        </FormControl>
        <FormMessage match="valueMissing">Enter your email.</FormMessage>
        <FormMessage match="typeMismatch">Enter a valid email.</FormMessage>
      </FormField>
      <FormSubmit asChild>
        <Button>Sign up</Button>
      </FormSubmit>
    </Form>
  );
}

describe("Form", () => {
  it("shows the matching message after a submit attempt, and does not submit", async () => {
    const onSubmit = vi.fn();
    render(<Signup onSubmit={onSubmit} />);
    expect(screen.queryByText("Enter your email.")).toBeNull();
    await userEvent.click(screen.getByRole("button", { name: "Sign up" }));
    expect(await screen.findByText("Enter your email.")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toHaveAttribute("data-invalid");
    expect(screen.getByLabelText("Email")).toHaveAccessibleDescription("Enter your email.");
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("submits a valid form", async () => {
    const onSubmit = vi.fn();
    render(<Signup onSubmit={onSubmit} />);
    await userEvent.type(screen.getByLabelText("Email"), "camille@example.com");
    await userEvent.click(screen.getByRole("button", { name: "Sign up" }));
    expect(onSubmit).toHaveBeenCalledOnce();
  });

  it("has no axe violations, with an error", async () => {
    const { container } = render(<Signup />);
    await userEvent.click(screen.getByRole("button", { name: "Sign up" }));
    await screen.findByText("Enter your email.");
    await expectNoAxeViolations(container);
  });
});
