import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { expectNoAxeViolations } from "../../../../test/axe";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./accordion";

function Faq(props: { type?: "single" | "multiple"; level?: 2 | 3 }) {
  const items = (
    <>
      <AccordionItem value="ship">
        <AccordionTrigger level={props.level}>Shipping</AccordionTrigger>
        <AccordionContent>In 2 days.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="return">
        <AccordionTrigger level={props.level}>Returns</AccordionTrigger>
        <AccordionContent>Within 30 days.</AccordionContent>
      </AccordionItem>
    </>
  );
  return props.type === "multiple" ? (
    <Accordion type="multiple">{items}</Accordion>
  ) : (
    <Accordion type="single" collapsible>
      {items}
    </Accordion>
  );
}

describe("Accordion", () => {
  it("opens one section at a time, from the header's button", async () => {
    render(<Faq />);
    const shipping = screen.getByRole("button", { name: "Shipping" });
    expect(shipping).toHaveAttribute("aria-expanded", "false");
    await userEvent.click(shipping);
    expect(shipping).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("region", { name: "Shipping" })).toHaveTextContent("In 2 days.");
    await userEvent.click(screen.getByRole("button", { name: "Returns" }));
    expect(shipping).toHaveAttribute("aria-expanded", "false");
  });

  it("keeps several sections open with type multiple", async () => {
    render(<Faq type="multiple" />);
    await userEvent.click(screen.getByRole("button", { name: "Shipping" }));
    await userEvent.click(screen.getByRole("button", { name: "Returns" }));
    expect(screen.getAllByRole("region")).toHaveLength(2);
  });

  it("moves between headers with the arrow keys", async () => {
    render(<Faq />);
    screen.getByRole("button", { name: "Shipping" }).focus();
    await userEvent.keyboard("{ArrowDown}");
    expect(screen.getByRole("button", { name: "Returns" })).toHaveFocus();
  });

  it("puts the trigger in a heading of the chosen level", () => {
    render(<Faq level={2} />);
    expect(screen.getAllByRole("heading", { level: 2 })).toHaveLength(2);
  });

  it("has no axe violations, open", async () => {
    const { container } = render(<Faq />);
    await userEvent.click(screen.getByRole("button", { name: "Shipping" }));
    await expectNoAxeViolations(container);
  });
});
