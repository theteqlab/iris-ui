"use client";

import { Button } from "@irisui/ui";

export default function ButtonAsChild() {
  return (
    <Button asChild look="glass">
      <a href="https://github.com/theteqlab/iris-ui">View on GitHub</a>
    </Button>
  );
}
