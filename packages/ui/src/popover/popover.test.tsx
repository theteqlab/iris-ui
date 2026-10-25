import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { expectNoAxeViolations } from "../../../../test/axe";
import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from "./popover";

function Help({ arrow = false }) {
  return (
    <Popover>
      <PopoverTrigger>Help</PopoverTrigger>
      <PopoverContent arrow={arrow} side="top" aria-label="Help">
        <p>Shipping takes 2 days.</p>
        <PopoverClose>Got it</PopoverClose>
      </PopoverContent>
    </Popover>
  );
}

describe("Popover", () => {
  it("opens from its trigger and closes with Escape", async () => {
    render(<Help />);
    const trigger = screen.getByRole("button", { name: "Help" });
    await userEvent.click(trigger);
    expect(screen.getByRole("dialog", { name: "Help" })).toBeInTheDocument();
    expect(trigger).toHaveAttribute("aria-expanded", "true");

    await userEvent.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });

  it("closes with PopoverClose", async () => {
    render(<Help />);
    await userEvent.click(screen.getByRole("button", { name: "Help" }));
    await userEvent.click(screen.getByRole("button", { name: "Got it" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("shows an optional arrow", async () => {
    const { baseElement } = render(<Help arrow />);
    await userEvent.click(screen.getByRole("button", { name: "Help" }));
    expect(baseElement.querySelector("svg.fill-popover")).toBeInTheDocument();
  });

  it("has no axe violations when open", async () => {
    const { baseElement } = render(<Help />);
    await userEvent.click(screen.getByRole("button", { name: "Help" }));
    await expectNoAxeViolations(baseElement);
  });
});
