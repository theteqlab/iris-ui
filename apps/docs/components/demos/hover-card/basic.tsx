"use client";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@irisui/ui";

export default function HoverCardDemo() {
  return (
    <p className="m-0 text-md">
      Designed by{" "}
      <HoverCard>
        <HoverCardTrigger href="https://github.com/theteqlab" className="font-bold text-link">
          @camille
        </HoverCardTrigger>
        <HoverCardContent>
          <div className="flex gap-3">
            <Avatar>
              <AvatarImage src="/avatar.svg" alt="" />
              <AvatarFallback>CL</AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-1">
              <strong>Camille Laurent</strong>
              <p className="m-0 text-sm text-text-muted">Designer in Lyon. 42 projects.</p>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>{" "}
      in 2026.
    </p>
  );
}
