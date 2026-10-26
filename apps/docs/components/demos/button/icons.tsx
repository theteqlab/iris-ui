"use client";

import { Button } from "@irisui/ui";
import { ArrowIcon, PlusIcon } from "../icons";

export default function ButtonIcons() {
  return (
    <>
      <Button startIcon={<PlusIcon />}>New project</Button>
      <Button look="outline" tone={2} endIcon={<ArrowIcon />}>
        Continue
      </Button>
    </>
  );
}
