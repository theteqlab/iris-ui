"use client";

import { Alert, AlertDescription, AlertTitle } from "@irisui/ui";

export default function AlertDemo() {
  return (
    <Alert className="w-full max-w-lg">
      <AlertTitle>New version</AlertTitle>
      <AlertDescription>Version 2 is out: dark mode and a faster editor.</AlertDescription>
    </Alert>
  );
}
