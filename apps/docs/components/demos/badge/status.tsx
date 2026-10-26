"use client";

import { Badge } from "@irisui/ui";

export default function BadgeStatus() {
  return (
    <>
      <Badge status="success">Paid</Badge>
      <Badge status="warning">Pending</Badge>
      <Badge status="danger">Failed</Badge>
      <Badge status="info">New</Badge>
      <Badge status="neutral">Draft</Badge>
    </>
  );
}
