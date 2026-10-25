import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { expectNoAxeViolations } from "../../../../test/axe";
import { Progress } from "./progress";

describe("Progress", () => {
  it("exposes its value and fills accordingly", () => {
    render(<Progress aria-label="Import" value={68} />);
    const bar = screen.getByRole("progressbar", { name: "Import" });
    expect(bar).toHaveAttribute("aria-valuenow", "68");
    expect(bar).toHaveAttribute("aria-valuemax", "100");
    expect(bar).toHaveAttribute("data-state", "loading");
    expect((bar.firstChild as HTMLElement).style.transform).toBe("translateX(-32%)");
  });

  it("takes a custom max and is complete at max", () => {
    render(<Progress aria-label="Steps" value={3} max={3} />);
    const bar = screen.getByRole("progressbar");
    expect(bar).toHaveAttribute("data-state", "complete");
    expect((bar.firstChild as HTMLElement).style.transform).toBe("translateX(-0%)");
  });

  it("is indeterminate without a value", () => {
    render(<Progress aria-label="Loading" />);
    const bar = screen.getByRole("progressbar");
    expect(bar).toHaveAttribute("data-state", "indeterminate");
    expect(bar).not.toHaveAttribute("aria-valuenow");
  });

  it("takes a tone", () => {
    render(<Progress aria-label="Quota" value={40} tone="danger" />);
    expect(screen.getByRole("progressbar")).toHaveAttribute("data-tone", "danger");
  });

  it("has no axe violations", async () => {
    const { container } = render(<Progress aria-label="Upload" value={20} />);
    await expectNoAxeViolations(container);
  });
});
