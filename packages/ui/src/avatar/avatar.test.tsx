import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { expectNoAxeViolations } from "../../../../test/axe";
import { Avatar, AvatarFallback, AvatarGroup, AvatarImage } from "./avatar";

describe("Avatar", () => {
  it("shows the initials while the image has not loaded", () => {
    render(
      <Avatar>
        <AvatarImage src="/camille.png" alt="Camille Roux" />
        <AvatarFallback>CR</AvatarFallback>
      </Avatar>,
    );
    // jsdom never loads images: the fallback stays.
    expect(screen.getByText("CR")).toBeInTheDocument();
  });

  it("takes a tone and a size, ink and md by default", () => {
    const { container, rerender } = render(
      <Avatar>
        <AvatarFallback>HM</AvatarFallback>
      </Avatar>,
    );
    const root = container.firstChild as HTMLElement;
    expect(root).toHaveAttribute("data-tone", "ink");
    expect(root).toHaveAttribute("data-size", "md");
    rerender(
      <Avatar tone={3} size="lg">
        <AvatarFallback>HM</AvatarFallback>
      </Avatar>,
    );
    expect(root).toHaveAttribute("data-tone", "3");
    expect(root.className).toContain("size-14");
  });

  it("groups avatars", () => {
    render(
      <AvatarGroup aria-label="Team">
        <Avatar>
          <AvatarFallback>CR</AvatarFallback>
        </Avatar>
        <Avatar tone={2}>
          <AvatarFallback>LB</AvatarFallback>
        </Avatar>
      </AvatarGroup>,
    );
    expect(screen.getByRole("group", { name: "Team" }).children).toHaveLength(2);
  });

  it("has no axe violations", async () => {
    const { container } = render(
      <Avatar>
        <AvatarFallback>CR</AvatarFallback>
      </Avatar>,
    );
    await expectNoAxeViolations(container);
  });
});
