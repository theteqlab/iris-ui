import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { expectNoAxeViolations } from "../../../../test/axe";
import { Footer, FooterBottom, FooterColumn, FooterColumns, FooterLink } from "./footer";

function SiteFooter() {
  return (
    <Footer variant="glass">
      <FooterColumns>
        <FooterColumn title="Product">
          <FooterLink href="/docs">Docs</FooterLink>
          <FooterLink href="/changelog">Changelog</FooterLink>
        </FooterColumn>
        <FooterColumn title="Company">
          <FooterLink href="/about">About</FooterLink>
        </FooterColumn>
      </FooterColumns>
      <FooterBottom>© 2026 theteqlab</FooterBottom>
    </Footer>
  );
}

describe("Footer", () => {
  it("is a contentinfo landmark with named link columns", () => {
    render(<SiteFooter />);
    expect(screen.getByRole("contentinfo")).toHaveAttribute("data-variant", "glass");
    const product = screen.getByRole("navigation", { name: "Product" });
    expect(product.querySelectorAll("li a")).toHaveLength(2);
    expect(screen.getByRole("link", { name: "Changelog" })).toHaveAttribute("href", "/changelog");
  });

  it("has no axe violations", async () => {
    const { container } = render(<SiteFooter />);
    await expectNoAxeViolations(container);
  });
});
