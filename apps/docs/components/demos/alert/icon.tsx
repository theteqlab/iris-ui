"use client";

import { Alert, AlertDescription, AlertTitle, Button } from "@irisui/ui";
import { SparkIcon } from "../icons";

export default function AlertIcon() {
  return (
    <div className="flex w-full max-w-lg flex-col gap-4">
      <Alert tone="success" icon={<SparkIcon />}>
        <AlertTitle>Welcome aboard</AlertTitle>
        <AlertDescription>Your workspace is ready.</AlertDescription>
      </Alert>
      <Alert tone="warning" icon={null}>
        <AlertTitle>Trial ends in 3 days</AlertTitle>
        <AlertDescription>Choose a plan to keep your projects.</AlertDescription>
        <Button size="sm" look="solid" tone="ink" className="mt-2 self-start">
          See plans
        </Button>
      </Alert>
    </div>
  );
}
