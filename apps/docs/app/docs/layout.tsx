import { DocsLayout } from "fumadocs-ui/layouts/docs";
import type { ReactNode } from "react";
import { PaletteSwitcher } from "@/components/palette";
import { source } from "@/lib/source";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      tree={source.pageTree}
      nav={{ title: "iris-ui" }}
      links={[{ text: "GitHub", url: "https://github.com/theteqlab/iris-ui", external: true }]}
      sidebar={{ footer: <PaletteSwitcher /> }}
    >
      {children}
    </DocsLayout>
  );
}
