"use client";

import { Button } from "@irisui/ui";
import { useState } from "react";

export default function ButtonLoading() {
  const [loading, setLoading] = useState(false);

  const save = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1500);
  };

  return (
    <>
      <Button look="solid" tone={3} loading={loading} onClick={save}>
        Save
      </Button>
      <Button disabled>Disabled</Button>
    </>
  );
}
