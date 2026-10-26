import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { VisuallyHidden } from "./visually-hidden";

describe("VisuallyHidden", () => {
  it("names an icon button without showing the text", () => {
    render(
      <button type="button">
        <svg aria-hidden="true" />
        <VisuallyHidden>Settings</VisuallyHidden>
      </button>,
    );
    expect(screen.getByRole("button", { name: "Settings" })).toBeInTheDocument();
    expect(screen.getByText("Settings")).toHaveStyle({ position: "absolute", width: "1px" });
  });
});
