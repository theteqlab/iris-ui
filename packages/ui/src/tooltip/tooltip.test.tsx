import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { expectNoAxeViolations } from "../../../../test/axe";
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip";

function Save() {
  return (
    <Tooltip>
      <TooltipTrigger>Save</TooltipTrigger>
      <TooltipContent>Save the draft (⌘S)</TooltipContent>
    </Tooltip>
  );
}

describe("Tooltip", () => {
  it("opens on keyboard focus and describes its trigger", async () => {
    render(<Save />);
    await userEvent.tab();
    const tooltip = await screen.findByRole("tooltip");
    expect(tooltip).toHaveTextContent("Save the draft (⌘S)");
    expect(screen.getByRole("button", { name: "Save" })).toHaveAccessibleDescription(
      "Save the draft (⌘S)",
    );
  });

  it("closes with Escape", async () => {
    render(<Save />);
    await userEvent.tab();
    await screen.findByRole("tooltip");
    await userEvent.keyboard("{Escape}");
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
  });

  it("is controlled", () => {
    render(
      <Tooltip open>
        <TooltipTrigger>Info</TooltipTrigger>
        <TooltipContent>More details</TooltipContent>
      </Tooltip>,
    );
    expect(screen.getByRole("tooltip")).toHaveTextContent("More details");
  });

  it("has no axe violations when open", async () => {
    const { baseElement } = render(
      <Tooltip open>
        <TooltipTrigger>Info</TooltipTrigger>
        <TooltipContent>More details</TooltipContent>
      </Tooltip>,
    );
    await expectNoAxeViolations(baseElement);
  });
});
