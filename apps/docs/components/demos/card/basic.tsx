"use client";

import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@irisui/ui";

export default function CardDemo() {
  return (
    <Card className="w-96">
      <CardHeader>
        {/* Pick the heading level that fits the page. */}
        <CardTitle asChild>
          <h2>Team plan</h2>
        </CardTitle>
        <CardDescription>For studios of up to 10 people.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="m-0 text-h3 font-medium">
          €24 <span className="text-md text-text-muted">/ month</span>
        </p>
        <div className="flex gap-2">
          <Badge look="outline" tone={3}>
            Unlimited projects
          </Badge>
          <Badge look="outline" tone={2}>
            50 GB
          </Badge>
        </div>
      </CardContent>
      <CardFooter>
        <Button look="ghost">Compare plans</Button>
        <Button look="solid" tone={3}>
          Choose
        </Button>
      </CardFooter>
    </Card>
  );
}
