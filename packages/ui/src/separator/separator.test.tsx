import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { expectNoAxeViolations } from "../../../../test/axe";
import { Separator } from "./separator";

describe("Separator", () => {
  it("is decorative by default", () => {
    const { container } = render(<Separator />);
    expect(screen.queryByRole("separator")).toBeNull();
    expect(container.firstChild).toHaveAttribute("data-orientation", "horizontal");
  });

  it("is announced when not decorative, with its orientation", () => {
    render(<Separator decorative={false} orientation="vertical" />);
    expect(screen.getByRole("separator")).toHaveAttribute("aria-orientation", "vertical");
  });

  it("has no axe violations", async () => {
    const { container } = render(
      <div>
        <p>Above</p>
        <Separator decorative={false} />
        <p>Below</p>
      </div>,
    );
    await expectNoAxeViolations(container);
  });
});
