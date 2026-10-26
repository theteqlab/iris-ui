"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@irisui/ui";

export default function AccordionDemo() {
  return (
    <Accordion type="single" collapsible defaultValue="shipping" className="w-full max-w-lg">
      <AccordionItem value="shipping">
        <AccordionTrigger level={2}>How long does shipping take?</AccordionTrigger>
        <AccordionContent>
          2 working days in mainland France, 4 elsewhere in Europe.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="returns">
        <AccordionTrigger level={2}>Can I return an item?</AccordionTrigger>
        <AccordionContent>Yes, for free, within 30 days.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="warranty">
        <AccordionTrigger level={2}>Is there a warranty?</AccordionTrigger>
        <AccordionContent>Two years on every product.</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
