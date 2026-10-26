import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { expectNoAxeViolations } from "../../../../test/axe";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./hover-card";

function Profile() {
  return (
    <HoverCard openDelay={0}>
      <HoverCardTrigger href="https://example.com/camille">@camille</HoverCardTrigger>
      <HoverCardContent>
        <p>Designer in Lyon.</p>
      </HoverCardContent>
    </HoverCard>
  );
}

describe("HoverCard", () => {
  it("keeps the trigger a plain link", () => {
    render(<Profile />);
    expect(screen.getByRole("link", { name: "@camille" })).toHaveAttribute(
      "href",
      "https://example.com/camille",
    );
  });

  it("opens when the pointer rests on the link", async () => {
    render(<Profile />);
    await userEvent.hover(screen.getByRole("link", { name: "@camille" }));
    expect(await screen.findByText("Designer in Lyon.")).toBeInTheDocument();
  });

  it("has no axe violations, open", async () => {
    render(<Profile />);
    await userEvent.hover(screen.getByRole("link", { name: "@camille" }));
    await screen.findByText("Designer in Lyon.");
    await expectNoAxeViolations(document.body);
  });
});
