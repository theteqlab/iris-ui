import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { describe, expect, it } from "vitest";
import { expectNoAxeViolations } from "../../../../test/axe";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./card";

function Plan(props: Parameters<typeof Card>[0]) {
  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Pro</CardTitle>
        <CardDescription>For growing teams.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Unlimited projects.</p>
      </CardContent>
      <CardFooter>
        <button type="button">Choose</button>
      </CardFooter>
    </Card>
  );
}

describe("Card", () => {
  it("renders the glass variant with a heading by default", () => {
    const { container } = render(<Plan />);
    expect(container.firstChild).toHaveAttribute("data-variant", "glass");
    expect(screen.getByRole("heading", { level: 3, name: "Pro" })).toBeInTheDocument();
  });

  it("takes the strong and ink variants", () => {
    const { container, rerender } = render(<Plan variant="strong" />);
    expect(container.firstChild).toHaveAttribute("data-variant", "strong");
    rerender(<Plan variant="ink" />);
    expect(container.firstChild).toHaveAttribute("data-variant", "ink");
  });

  it("renders its child with asChild, and the title at another level", () => {
    render(
      <Card asChild>
        <article aria-labelledby="t">
          <CardTitle asChild>
            <h2 id="t">Stats</h2>
          </CardTitle>
        </article>
      </Card>,
    );
    const article = screen.getByRole("article", { name: "Stats" });
    expect(article).toHaveAttribute("data-variant", "glass");
    expect(screen.getByRole("heading", { level: 2 })).toBeInTheDocument();
  });

  it("forwards the ref and merges className", () => {
    const ref = createRef<HTMLDivElement>();
    render(<Card ref={ref} className="max-w-sm p-4" />);
    expect(ref.current?.className).toContain("max-w-sm");
    expect(ref.current?.className).not.toContain("p-7");
  });

  it("has no axe violations", async () => {
    const { container } = render(<Plan variant="ink" />);
    await expectNoAxeViolations(container);
  });
});
