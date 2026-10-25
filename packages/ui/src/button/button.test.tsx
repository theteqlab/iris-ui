import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef } from "react";
import { describe, expect, it, vi } from "vitest";
import { expectNoAxeViolations } from "../../../../test/axe";
import { LocaleProvider, fr } from "../locale/messages";
import { Button } from "./button";
import { IconButton } from "./icon-button";

const Icon = () => <svg data-testid="icon" aria-hidden="true" />;

describe("Button", () => {
  it("renders a type=button with the holo look and no tone by default", () => {
    render(<Button>Save</Button>);
    const button = screen.getByRole("button", { name: "Save" });
    expect(button).toHaveAttribute("type", "button");
    expect(button).toHaveAttribute("data-look", "holo");
    expect(button).not.toHaveAttribute("data-tone");
    expect(button).toHaveAttribute("data-size", "md");
  });

  it("defaults to the ink tone for the other looks", () => {
    render(
      <>
        <Button look="glass">Glass</Button>
        <Button look="solid" tone={3} size="lg">
          Solid
        </Button>
      </>,
    );
    expect(screen.getByRole("button", { name: "Glass" })).toHaveAttribute("data-tone", "ink");
    const solid = screen.getByRole("button", { name: "Solid" });
    expect(solid).toHaveAttribute("data-tone", "3");
    expect(solid).toHaveAttribute("data-size", "lg");
  });

  it("renders icons before and after the label", () => {
    render(
      <Button startIcon={<Icon />} endIcon={<Icon />}>
        Next
      </Button>,
    );
    expect(screen.getAllByTestId("icon")).toHaveLength(2);
  });

  it("calls onClick and forwards the ref", async () => {
    const onClick = vi.fn();
    const ref = createRef<HTMLButtonElement>();
    render(
      <Button ref={ref} onClick={onClick}>
        Go
      </Button>,
    );
    await userEvent.click(screen.getByRole("button", { name: "Go" }));
    expect(onClick).toHaveBeenCalledOnce();
    expect(ref.current).toBe(screen.getByRole("button"));
  });

  it("blocks clicks and announces the state while loading, without losing its label", async () => {
    const onClick = vi.fn();
    render(
      <Button loading onClick={onClick}>
        Pay
      </Button>,
    );
    const button = screen.getByRole("button", { name: /Pay/ });
    expect(button).toHaveAttribute("aria-busy", "true");
    expect(button).toHaveAttribute("aria-disabled", "true");
    expect(button).toHaveAccessibleName("Pay Loading");
    await userEvent.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });

  it("uses the locale's loading text", () => {
    render(
      <LocaleProvider messages={fr}>
        <Button loading>Payer</Button>
      </LocaleProvider>,
    );
    expect(screen.getByRole("button")).toHaveAccessibleName("Payer Chargement");
  });

  it("is disabled", async () => {
    const onClick = vi.fn();
    render(
      <Button disabled onClick={onClick}>
        Off
      </Button>,
    );
    const button = screen.getByRole("button", { name: "Off" });
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute("data-disabled");
    await userEvent.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });

  it("renders its child with asChild", () => {
    render(
      <Button asChild look="outline">
        <a href="/docs">Docs</a>
      </Button>,
    );
    const link = screen.getByRole("link", { name: "Docs" });
    expect(link).toHaveAttribute("href", "/docs");
    expect(link).toHaveAttribute("data-look", "outline");
    expect(link).not.toHaveAttribute("type");
    expect(link.className).toContain("iris-look");
  });

  it("merges className", () => {
    render(<Button className="w-full px-8">Wide</Button>);
    const button = screen.getByRole("button");
    expect(button.className).toContain("w-full");
    expect(button.className).toContain("px-8");
    expect(button.className).not.toContain("px-[22px]");
  });

  it("has no axe violations", async () => {
    const { container } = render(
      <div>
        <Button>Holo</Button>
        <Button look="glass" tone={2}>
          Glass
        </Button>
        <Button look="outline" loading>
          Loading
        </Button>
        <Button look="ghost" disabled>
          Ghost
        </Button>
      </div>,
    );
    await expectNoAxeViolations(container);
  });
});

describe("IconButton", () => {
  it("is named by aria-label and round", () => {
    render(
      <IconButton aria-label="Close" look="glass">
        <Icon />
      </IconButton>,
    );
    const button = screen.getByRole("button", { name: "Close" });
    expect(button.className).toContain("aspect-square");
    expect(button).toHaveAttribute("data-tone", "ink");
  });

  it("requires aria-label at the type level", () => {
    // @ts-expect-error aria-label is required
    render(<IconButton>{<Icon />}</IconButton>);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("shows a spinner while loading", () => {
    render(
      <IconButton aria-label="Refresh" loading>
        <Icon />
      </IconButton>,
    );
    expect(screen.queryByTestId("icon")).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Refresh" })).toHaveAttribute("aria-busy", "true");
  });

  it("has no axe violations", async () => {
    const { container } = render(
      <IconButton aria-label="Settings">
        <Icon />
      </IconButton>,
    );
    await expectNoAxeViolations(container);
  });
});
