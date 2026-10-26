import { ServerCodeBlock } from "fumadocs-ui/components/codeblock.rsc";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { codeThemes } from "@/lib/shiki";
import { CodeCollapse } from "./code-collapse";
import { demos } from "./demos";

/** A live demo on the iris-ui background, followed by its source. */
export async function Demo({ name, code = true }: { name: string; code?: boolean }) {
  const Component = demos[name];
  if (!Component) throw new Error(`Unknown demo "${name}"`);
  const file = path.join(process.cwd(), "components/demos", `${name}.tsx`);
  const source = (await readFile(file, "utf8")).replace(/^"use client";\n\n/, "");

  return (
    <div className="not-prose my-6 overflow-hidden rounded-xl border border-fd-border">
      <div className="iris-docs-stage flex min-h-56 flex-wrap items-center justify-center gap-4 p-10">
        <Component />
      </div>
      {code && (
        <CodeCollapse>
          <ServerCodeBlock code={source} lang="tsx" themes={codeThemes} />
        </CodeCollapse>
      )}
    </div>
  );
}
