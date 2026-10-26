"use client";

import { Card, Tabs, TabsContent, TabsList, TabsTrigger } from "@irisui/ui";

export default function TabsDemo() {
  return (
    <Card className="w-full max-w-lg">
      <Tabs defaultValue="profile">
        <TabsList aria-label="Settings">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
          <TabsTrigger value="api" disabled>
            API
          </TabsTrigger>
        </TabsList>
        <TabsContent value="profile">Name, photo and language.</TabsContent>
        <TabsContent value="billing">Plan and invoices.</TabsContent>
        <TabsContent value="api">Access keys.</TabsContent>
      </Tabs>
    </Card>
  );
}
