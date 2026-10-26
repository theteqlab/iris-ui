"use client";

import { Avatar, AvatarFallback, AvatarGroup, AvatarImage } from "@irisui/ui";

export default function AvatarGroupDemo() {
  return (
    <AvatarGroup aria-label="Team: Camille, Hugo, Léa, Adam and 5 others">
      <Avatar>
        <AvatarImage src="/avatar.svg" alt="" />
        <AvatarFallback>CL</AvatarFallback>
      </Avatar>
      <Avatar tone={1}>
        <AvatarFallback>HM</AvatarFallback>
      </Avatar>
      <Avatar tone={2}>
        <AvatarFallback>LB</AvatarFallback>
      </Avatar>
      <Avatar tone={3}>
        <AvatarFallback>AD</AvatarFallback>
      </Avatar>
      <Avatar tone={5}>
        <AvatarFallback>+5</AvatarFallback>
      </Avatar>
    </AvatarGroup>
  );
}
