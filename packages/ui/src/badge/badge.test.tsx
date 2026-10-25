import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { describe, expect, it } from "vitest";
import { expectNoAxeViolations } from "../../../../test/axe";
import { Badge } from "./badge";

describe("Badge", () => {
  it("renders the label with the holo look by default", () => {
    render(<Badge>New</Badge>);
    const badge = screen.getByText("New");
    expect(badge).toHaveAttribute("data-look", "holo");
    expect(badge).not.toHaveAttribute("data-tone");
  });

  it("takes a look and a tone", () => {
    render(
      <Badge look="outline" tone="danger">
        Late
      </Badge>,
    );
    const badge = screen.getByText("Late");
    expect(badge).toHaveAttribute("data-look", "outline");
    expect(badge).toHaveAttribute("data-tone", "danger");
  });

  it("shows a decorative dot", () => {
    const { container } = render(<Badge dot>Online</Badge>);
    expect(container.querySelector("[aria-hidden='true']")).toBeInTheDocument();
    expect(screen.getByText("Online")).toHaveTextContent(/^Online$/);
  });

  it("forwards the ref and merges className", () => {
    const ref = createRef<HTMLSpanElement>();
    render(
      <Badge ref={ref} className="uppercase">
        Beta
      </Badge>,
    );
    expect(ref.current).toBe(screen.getByText("Beta"));
    expect(ref.current?.className).toContain("uppercase");
  });

  it("does not accept the ghost look", () => {
    // @ts-expect-error ghost is a Button look only
    render(<Badge look="ghost">Ghost</Badge>);
    expect(screen.getByText("Ghost")).toBeInTheDocument();
  });

  it("has no axe violations", async () => {
    const { container } = render(
      <div>
        <Badge>Holo</Badge>
        <Badge look="glass" tone={1}>
          Glass
        </Badge>
        <Badge look="solid" tone={4} dot>
          Solid
        </Badge>
      </div>,
    );
    await expectNoAxeViolations(container);
  });
});
