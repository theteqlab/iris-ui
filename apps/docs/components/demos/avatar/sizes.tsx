"use client";

import { Avatar, AvatarFallback } from "@irisui/ui";

export default function AvatarSizes() {
  return (
    <>
      <Avatar size="sm">
        <AvatarFallback>CR</AvatarFallback>
      </Avatar>
      <Avatar tone={1}>
        <AvatarFallback>HM</AvatarFallback>
      </Avatar>
      <Avatar tone={3} size="lg">
        <AvatarFallback>LB</AvatarFallback>
      </Avatar>
    </>
  );
}
