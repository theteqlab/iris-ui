"use client";

import { Alert, AlertDescription, AlertTitle } from "@irisui/ui";

export default function AlertTones() {
  return (
    <div className="grid w-full gap-4 md:grid-cols-2">
      <Alert tone="info">
        <AlertTitle>New version</AlertTitle>
        <AlertDescription>Version 2 is available.</AlertDescription>
      </Alert>
      <Alert tone="success">
        <AlertTitle>Saved</AlertTitle>
        <AlertDescription>Your changes are live.</AlertDescription>
      </Alert>
      <Alert tone="warning">
        <AlertTitle>Storage almost full</AlertTitle>
        <AlertDescription>2 GB left out of 50 GB.</AlertDescription>
      </Alert>
      <Alert tone="danger">
        <AlertTitle>Payment declined</AlertTitle>
        <AlertDescription>Check your card details.</AlertDescription>
      </Alert>
    </div>
  );
}
