import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { expectNoAxeViolations } from "../../../../test/axe";
import { Button } from "../button/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./collapsible";

function Repos() {
  return (
    <Collapsible>
      <p>3 repositories</p>
      <CollapsibleTrigger asChild>
        <Button look="ghost">Show all</Button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <p>iris-ui</p>
      </CollapsibleContent>
    </Collapsible>
  );
}

describe("Collapsible", () => {
  it("shows and hides its content from the trigger", async () => {
    render(<Repos />);
    const trigger = screen.getByRole("button", { name: "Show all" });
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByText("iris-ui")).toBeNull();
    await userEvent.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText("iris-ui")).toBeVisible();
    expect(trigger).toHaveAttribute("aria-controls", screen.getByText("iris-ui").parentElement?.id);
  });

  it("has no axe violations, open", async () => {
    const { container } = render(<Repos />);
    await userEvent.click(screen.getByRole("button", { name: "Show all" }));
    await expectNoAxeViolations(container);
  });
});
