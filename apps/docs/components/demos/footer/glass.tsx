"use client";

import { Footer, FooterBottom, FooterColumn, FooterColumns, FooterLink } from "@irisui/ui";

export default function FooterGlass() {
  return (
    <Footer variant="glass" className="w-full">
      <FooterColumns className="lg:grid-cols-3">
        <FooterColumn title="Shop">
          <FooterLink href="#">New in</FooterLink>
          <FooterLink href="#">Gift cards</FooterLink>
        </FooterColumn>
        <FooterColumn title="Help">
          <FooterLink href="#">Delivery</FooterLink>
          <FooterLink href="#">Returns</FooterLink>
        </FooterColumn>
        <FooterColumn title="Legal">
          <FooterLink href="#">Terms</FooterLink>
          <FooterLink href="#">Privacy</FooterLink>
        </FooterColumn>
      </FooterColumns>
      <FooterBottom>© 2026 Atelier Lumière</FooterBottom>
    </Footer>
  );
}
