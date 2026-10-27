import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { expectNoAxeViolations } from "../../../../test/axe";
import { LocaleProvider, fr } from "../locale/messages";
import { Flag } from "./flag";

describe("Flag", () => {
  it("is an image named after the country, loading the SVG from flagcdn", () => {
    const { container } = render(<Flag code="DE" />);
    expect(screen.getByRole("img", { name: "Germany" })).toHaveAttribute("data-code", "de");
    expect(container.querySelector("img")).toHaveAttribute("src", "https://flagcdn.com/de.svg");
  });

  it("names the country in the LocaleProvider's language", () => {
    render(
      <LocaleProvider messages={fr}>
        <Flag code="de" />
      </LocaleProvider>,
    );
    expect(screen.getByRole("img", { name: "Allemagne" })).toBeInTheDocument();
  });

  it("takes a label, subdivisions and another base URL", () => {
    const { container } = render(
      <Flag code="gb-sct" label="Scotland" baseUrl="/flags" shape="round" size="lg" />,
    );
    const flag = screen.getByRole("img", { name: "Scotland" });
    expect(flag).toHaveAttribute("data-shape", "round");
    expect(flag).toHaveAttribute("data-size", "lg");
    expect(container.querySelector("img")).toHaveAttribute("src", "/flags/gb-sct.svg");
  });

  it("falls back to the code for an unknown country", () => {
    render(<Flag code="xx-yy" />);
    expect(screen.getByRole("img", { name: "XX-YY" })).toBeInTheDocument();
  });

  it("shows the country code when the image fails", () => {
    const { container } = render(<Flag code="fr" />);
    fireEvent.error(container.querySelector("img")!);
    expect(container.querySelector("img")).toBeNull();
    expect(screen.getByRole("img", { name: "France" })).toHaveTextContent("fr");
  });

  it("can be decorative", () => {
    const { container } = render(<Flag code="fr" decorative />);
    expect(screen.queryByRole("img")).toBeNull();
    expect(container.firstChild).toHaveAttribute("aria-hidden", "true");
  });

  it("has no axe violations", async () => {
    const { container } = render(
      <p>
        <Flag code="it" /> <Flag code="jp" shape="round" /> <Flag code="fr" decorative /> France
      </p>,
    );
    await expectNoAxeViolations(container);
  });
});
