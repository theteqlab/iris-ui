import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { expectNoAxeViolations } from "../../../../test/axe";
import { Alert, AlertDescription, AlertTitle } from "./alert";

describe("Alert", () => {
  it("is a polite status by default, with the info tone", () => {
    render(
      <Alert>
        <AlertTitle>Update available</AlertTitle>
        <AlertDescription>Version 2 is out.</AlertDescription>
      </Alert>,
    );
    const alert = screen.getByRole("status");
    expect(alert).toHaveAttribute("data-tone", "info");
    expect(alert).toHaveTextContent("Update availableVersion 2 is out.");
  });

  it("is an alert for warnings and errors", () => {
    render(
      <>
        <Alert tone="warning">Storage almost full.</Alert>
        <Alert tone="danger">Payment failed.</Alert>
        <Alert tone="success">Saved.</Alert>
      </>,
    );
    expect(screen.getAllByRole("alert")).toHaveLength(2);
    expect(screen.getByRole("status")).toHaveAttribute("data-tone", "success");
  });

  it("shows a decorative icon that can be replaced or hidden", () => {
    const { container, rerender } = render(<Alert>Info</Alert>);
    expect(container.querySelector(".iris-status-icon")).toHaveAttribute("aria-hidden", "true");
    rerender(<Alert icon={<svg data-testid="custom" />}>Info</Alert>);
    expect(screen.getByTestId("custom")).toBeInTheDocument();
    rerender(<Alert icon={null}>Info</Alert>);
    expect(container.querySelector(".iris-status-icon")).not.toBeInTheDocument();
  });

  it("has no axe violations", async () => {
    const { container } = render(
      <div>
        <Alert tone="danger">
          <AlertTitle>Payment failed</AlertTitle>
          <AlertDescription>Check your card details.</AlertDescription>
        </Alert>
      </div>,
    );
    await expectNoAxeViolations(container);
  });
});
