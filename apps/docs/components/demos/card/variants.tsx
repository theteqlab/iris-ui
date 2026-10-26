"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@irisui/ui";

export default function CardVariants() {
  return (
    <div className="grid w-full gap-4 sm:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle>Glass</CardTitle>
          <CardDescription>The default surface.</CardDescription>
        </CardHeader>
        <CardContent>Frosted glass with the iridescent rim.</CardContent>
      </Card>
      <Card variant="strong">
        <CardHeader>
          <CardTitle>Strong</CardTitle>
          <CardDescription>To stand out.</CardDescription>
        </CardHeader>
        <CardContent>The holographic film.</CardContent>
      </Card>
      <Card variant="ink">
        <CardHeader>
          <CardTitle>Ink</CardTitle>
          <CardDescription>For contrast.</CardDescription>
        </CardHeader>
        <CardContent>Ink glass, light text.</CardContent>
      </Card>
    </div>
  );
}
