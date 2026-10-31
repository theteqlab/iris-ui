"use client";

import { Button, IconButton, Navbar } from "@irisui/ui";
import { SearchIcon } from "../icons";

export default function NavbarFloating() {
  return (
    <div
      tabIndex={0}
      aria-label="Page content"
      className="h-64 w-full overflow-y-auto rounded-card"
    >
      {/* A rounded panel with a margin, floating over the page. */}
      <Navbar variant="floating" className="justify-between">
        <strong>Atelier</strong>
        <div className="flex items-center gap-2">
          <IconButton look="ghost" aria-label="Search">
            <SearchIcon />
          </IconButton>
          <Button look="holo" size="sm">
            Book a visit
          </Button>
        </div>
      </Navbar>
      <div className="flex flex-col gap-3 p-4 pt-8">
        {Array.from({ length: 8 }, (_, i) => (
          <p key={i} className="m-0 text-text-muted">
            Paragraph {i + 1}. Scroll to see it pass under the bar.
          </p>
        ))}
      </div>
    </div>
  );
}
