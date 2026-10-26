"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@irisui/ui";

export default function AvatarDemo() {
  return (
    <>
      <Avatar>
        <AvatarImage src="/avatar.svg" alt="Camille Laurent" />
        <AvatarFallback>CL</AvatarFallback>
      </Avatar>
      {/* No picture (or one that fails to load): the initials. */}
      <Avatar tone={2}>
        <AvatarFallback>HM</AvatarFallback>
      </Avatar>
    </>
  );
}
