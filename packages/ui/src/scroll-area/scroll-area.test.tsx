import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { expectNoAxeViolations } from "../../../../test/axe";
import { ScrollArea } from "./scroll-area";

describe("ScrollArea", () => {
  it("renders its content in a viewport the keyboard can reach", () => {
    render(
      <ScrollArea className="h-40" aria-label="Tags">
        <p>Content</p>
      </ScrollArea>,
    );
    const content = screen.getByText("Content");
    const viewport = content.closest("[data-radix-scroll-area-viewport]");
    expect(viewport).toHaveAttribute("tabindex", "0");
  });

  it("has no axe violations", async () => {
    const { container } = render(
      <ScrollArea className="h-40" scrollbars="both">
        <p>Content</p>
      </ScrollArea>,
    );
    await expectNoAxeViolations(container);
  });
});
