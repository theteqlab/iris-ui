"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@irisui/ui";

export default function TabsUnderline() {
  return (
    <Tabs defaultValue="week" look="underline" className="w-full max-w-lg">
      <TabsList aria-label="Period">
        <TabsTrigger value="day">Day</TabsTrigger>
        <TabsTrigger value="week">Week</TabsTrigger>
        <TabsTrigger value="month">Month</TabsTrigger>
      </TabsList>
      <TabsContent value="day">Sales today: 42.</TabsContent>
      <TabsContent value="week">Sales this week: 318.</TabsContent>
      <TabsContent value="month">Sales this month: 1,204.</TabsContent>
    </Tabs>
  );
}
