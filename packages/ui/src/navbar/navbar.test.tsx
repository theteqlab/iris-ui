import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { expectNoAxeViolations } from "../../../../test/axe";
import { Navbar } from "./navbar";

describe("Navbar", () => {
  it("is a sticky, blurred banner by default", () => {
    render(
      <Navbar>
        <a href="/">iris-ui</a>
      </Navbar>,
    );
    const bar = screen.getByRole("banner");
    expect(bar).toHaveAttribute("data-variant", "bar");
    expect(bar).toHaveAttribute("data-blur");
    expect(bar.className).toContain("sticky");
  });

  it("sets the background opacity, kept between 0 and 1", () => {
    const { rerender } = render(<Navbar opacity={0.3} />);
    expect(screen.getByRole("banner").style.getPropertyValue("--navbar-opacity")).toBe("0.3");
    rerender(<Navbar opacity={4} />);
    expect(screen.getByRole("banner").style.getPropertyValue("--navbar-opacity")).toBe("1");
  });

  it("can float, not blur, and render another element", () => {
    render(
      <Navbar asChild variant="floating" position="static" blur={false}>
        <nav aria-label="Main" />
      </Navbar>,
    );
    const nav = screen.getByRole("navigation", { name: "Main" });
    expect(nav).toHaveAttribute("data-variant", "floating");
    expect(nav).not.toHaveAttribute("data-blur");
  });

  it("has no axe violations", async () => {
    const { container } = render(
      <Navbar>
        <a href="/">iris-ui</a>
      </Navbar>,
    );
    await expectNoAxeViolations(container);
  });
});
