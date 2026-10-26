"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, Card } from "@irisui/ui";

export default function AccordionMultiple() {
  return (
    <Card className="w-full max-w-lg py-2">
      {/* Several sections can stay open. */}
      <Accordion type="multiple" defaultValue={["account"]}>
        <AccordionItem value="account">
          <AccordionTrigger level={2}>Account</AccordionTrigger>
          <AccordionContent>Name, email and password.</AccordionContent>
        </AccordionItem>
        <AccordionItem value="notifications">
          <AccordionTrigger level={2}>Notifications</AccordionTrigger>
          <AccordionContent>Email and push alerts.</AccordionContent>
        </AccordionItem>
        <AccordionItem value="billing" disabled>
          <AccordionTrigger level={2}>Billing (owners only)</AccordionTrigger>
          <AccordionContent>Plan and invoices.</AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  );
}
