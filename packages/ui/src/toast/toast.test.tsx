import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { expectNoAxeViolations } from "../../../../test/axe";
import { LocaleProvider, fr } from "../locale/messages";
import { Toaster, toast } from "./toast";

afterEach(() => {
  act(() => toast.dismiss());
});

describe("Toaster", () => {
  it("shows a toast in a named region", async () => {
    render(<Toaster />);
    act(() => {
      toast.success("Saved", { description: "Your changes are online." });
    });
    expect(await screen.findByText("Saved")).toBeInTheDocument();
    expect(screen.getByText("Your changes are online.")).toBeInTheDocument();
    expect(screen.getByRole("region", { name: /Notifications/ })).toBeInTheDocument();
    const item = screen.getByText("Saved").closest("li");
    expect(item).toHaveAttribute("data-type", "success");
    expect(item?.className).toContain("iris-toast");
  });

  it("runs the action", async () => {
    const onClick = vi.fn();
    render(<Toaster />);
    act(() => {
      toast.error("Payment failed", { action: { label: "Retry", onClick } });
    });
    await userEvent.click(await screen.findByRole("button", { name: "Retry" }));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("uses the locale for its labels", async () => {
    render(
      <LocaleProvider messages={fr}>
        <Toaster closeButton />
      </LocaleProvider>,
    );
    act(() => {
      toast.info("Nouvelle version");
    });
    expect(
      await screen.findByRole("button", { name: "Fermer la notification" }),
    ).toBeInTheDocument();
  });

  it("has no axe violations", async () => {
    const { baseElement } = render(<Toaster />);
    act(() => {
      toast.warning("Storage almost full");
    });
    await screen.findByText("Storage almost full");
    await expectNoAxeViolations(baseElement);
  });
});
