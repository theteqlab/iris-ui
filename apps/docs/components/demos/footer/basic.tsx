"use client";

import { Footer, FooterBottom, FooterColumn, FooterColumns, FooterLink } from "@irisui/ui";

export default function FooterDemo() {
  return (
    <Footer className="w-full">
      <FooterColumns>
        <div className="col-span-2 flex flex-col gap-2 sm:col-span-1">
          <strong>iris-ui</strong>
          <p className="m-0 text-sm text-text-muted">Components in the Verre irisé style.</p>
        </div>
        <FooterColumn title="Product">
          <FooterLink href="/docs">Docs</FooterLink>
          <FooterLink href="/docs/components/button">Components</FooterLink>
        </FooterColumn>
        <FooterColumn title="Community">
          <FooterLink href="https://github.com/theteqlab/iris-ui">GitHub</FooterLink>
          <FooterLink href="https://www.npmjs.com/package/@irisui/ui">npm</FooterLink>
        </FooterColumn>
      </FooterColumns>
      <FooterBottom>
        <span>© 2026 theteqlab</span>
        <span>MIT licence</span>
      </FooterBottom>
    </Footer>
  );
}
