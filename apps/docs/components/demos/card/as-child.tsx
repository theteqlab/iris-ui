"use client";

import { Card, CardDescription, CardHeader, CardTitle } from "@irisui/ui";

export default function CardAsChild() {
  return (
    // The whole card is the link; the title is an <h2>.
    <Card asChild className="w-80 no-underline">
      <a href="#card-as-child">
        <CardHeader>
          <CardTitle asChild>
            <h2>Getting started</h2>
          </CardTitle>
          <CardDescription>Install iris-ui and pick a palette in 5 minutes.</CardDescription>
        </CardHeader>
      </a>
    </Card>
  );
}
