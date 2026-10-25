import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef, useState } from "react";
import { describe, expect, it } from "vitest";
import { expectNoAxeViolations } from "../../../../test/axe";
import { LocaleProvider, fr } from "../locale/messages";
import { Textarea } from "./textarea";

describe("Textarea", () => {
  it("forwards native props and the ref", () => {
    const ref = createRef<HTMLTextAreaElement>();
    render(<Textarea ref={ref} aria-label="Message" rows={5} />);
    const textarea = screen.getByRole("textbox", { name: "Message" });
    expect(ref.current).toBe(textarea);
    expect(textarea).toHaveAttribute("rows", "5");
  });

  it("counts characters politely and links the counter", async () => {
    render(<Textarea aria-label="Bio" maxLength={10} showCount defaultValue="abc" />);
    const textarea = screen.getByRole("textbox");
    const counter = screen.getByText("3 / 10 characters");
    expect(counter).toHaveAttribute("aria-live", "polite");
    expect(textarea).toHaveAccessibleDescription("3 / 10 characters");

    await userEvent.type(textarea, "de");
    expect(screen.getByText("5 / 10 characters")).toBeInTheDocument();
  });

  it("counts a controlled value and uses the locale", async () => {
    function Controlled() {
      const [value, setValue] = useState("");
      return (
        <Textarea
          aria-label="Avis"
          maxLength={20}
          showCount
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      );
    }
    render(
      <LocaleProvider messages={fr}>
        <Controlled />
      </LocaleProvider>,
    );
    await userEvent.type(screen.getByRole("textbox"), "Super");
    expect(screen.getByText("5 / 20 caractères")).toBeInTheDocument();
  });

  it("needs maxLength to show a counter", () => {
    render(<Textarea aria-label="Free" showCount />);
    expect(screen.queryByText(/characters/)).not.toBeInTheDocument();
  });

  it("resizes to its content with autoResize", async () => {
    render(<Textarea aria-label="Grow" autoResize />);
    const textarea = screen.getByRole<HTMLTextAreaElement>("textbox");
    Object.defineProperty(textarea, "scrollHeight", { configurable: true, value: 120 });
    await userEvent.type(textarea, "a");
    expect(textarea.style.height).toBe("120px");
    expect(textarea.className).toContain("resize-none");
  });

  it("has no axe violations", async () => {
    const { container } = render(
      <Textarea aria-label="Comment" maxLength={100} showCount invalid />,
    );
    await expectNoAxeViolations(container);
  });
});
