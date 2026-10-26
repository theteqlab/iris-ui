import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { expectNoAxeViolations } from "../../../../test/axe";
import { Field, FieldLabel } from "../field/field";
import { Slider } from "./slider";

describe("Slider", () => {
  it("is a named slider moved by the arrow keys", async () => {
    const onValueChange = vi.fn();
    render(
      <Slider aria-label="Volume" defaultValue={[40]} step={5} onValueChange={onValueChange} />,
    );
    const thumb = screen.getByRole("slider", { name: "Volume" });
    expect(thumb).toHaveAttribute("aria-valuenow", "40");
    thumb.focus();
    await userEvent.keyboard("{ArrowRight}");
    expect(onValueChange).toHaveBeenLastCalledWith([45]);
    await userEvent.keyboard("{End}");
    expect(thumb).toHaveAttribute("aria-valuenow", "100");
  });

  it("labels each thumb of a range", () => {
    render(<Slider defaultValue={[20, 80]} thumbLabels={["Minimum price", "Maximum price"]} />);
    expect(screen.getByRole("slider", { name: "Minimum price" })).toHaveAttribute(
      "aria-valuenow",
      "20",
    );
    expect(screen.getByRole("slider", { name: "Maximum price" })).toHaveAttribute(
      "aria-valuenow",
      "80",
    );
  });

  it("takes its name from a Field label", () => {
    render(
      <Field>
        <FieldLabel>Brightness</FieldLabel>
        <Slider defaultValue={[50]} />
      </Field>,
    );
    expect(screen.getByRole("slider", { name: "Brightness" })).toBeInTheDocument();
  });

  it("uses the tone for the range", () => {
    const { container } = render(<Slider aria-label="Speed" defaultValue={[10]} tone={3} />);
    expect(container.firstChild).toHaveAttribute("data-tone", "3");
  });

  it("has no axe violations", async () => {
    const { container } = render(
      <Slider defaultValue={[20, 80]} thumbLabels={["Minimum", "Maximum"]} />,
    );
    await expectNoAxeViolations(container);
  });
});
