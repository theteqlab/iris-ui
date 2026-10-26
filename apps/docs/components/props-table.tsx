import { createGenerator, type DocEntry } from "fumadocs-typescript";
import { AutoTypeTable } from "fumadocs-typescript/ui";
import path from "node:path";
import { codeThemes } from "@/lib/shiki";

const generator = createGenerator({
  tsconfigPath: path.join(process.cwd(), "tsconfig.json"),
  cache: false,
});

const entry = path.join(process.cwd(), "../../packages/ui/src/index.ts");

/** Optional props already show a "?": drop `| undefined` (and the parentheses it needed). */
const withoutUndefined = (type: string) =>
  type.endsWith(" | undefined") ? type.slice(0, -12).replace(/^\((\(.*)\)$/, "$1") : type;

function clean(entry: DocEntry) {
  entry.type = withoutUndefined(entry.type);
  entry.simplifiedType = withoutUndefined(entry.simplifiedType);
  // Our JSDoc ends with "Default `md`.": shown as the default value instead.
  const match = /\s*Default:? (`[^`]+`|\w+)\.?\s*$/.exec(entry.description);
  if (!match || entry.tags.some((t) => t.name === "default" || t.name === "defaultValue")) return;
  entry.description = entry.description.slice(0, match.index).trim();
  const value = match[1]!.replace(/^`|`$/g, "");
  const literal = /^(true|false|null|-?\d[\d.]*|".*")$/.test(value);
  entry.tags.push({ name: "default", text: literal ? value : JSON.stringify(value) });
}

/**
 * Props of an exported type, read from the source and its JSDoc. `pick` keeps the
 * props worth documenting (the rest are the element's HTML attributes).
 */
export function PropsTable({ type, pick }: { type: string; pick?: string[] }) {
  // One Pick per prop keeps them in the order given.
  const picked = pick ? pick.map((p) => `Pick<${type}, ${JSON.stringify(p)}>`).join(" & ") : type;
  return (
    <AutoTypeTable
      generator={generator}
      path={entry}
      name="Props"
      type={`import type { ${type} } from "./index";\nexport type Props = ${picked};`}
      shiki={{ themes: codeThemes }}
      // Full types (`"sm" | "md" | "lg"`), not their kind (`union`).
      options={{
        typeSimplifier: { shouldSimplify: () => false },
        transform: clean,
      }}
    />
  );
}
