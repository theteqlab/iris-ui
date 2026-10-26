// Fails when the docs site is out of step with the components:
// every component of packages/ui has a page, listed in the sidebar, with live demos,
// and every demo is shown somewhere.
// Usage: node scripts/check-docs.ts
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const ui = "packages/ui/src";
const pages = "apps/docs/content/docs/components";
const demos = "apps/docs/components/demos";
// Folders of packages/ui that hold helpers, not components.
const notComponents = new Set(["lib", "locale", "theme"]);

const errors: string[] = [];

// One component per .tsx file: button/button.tsx, button/icon-button.tsx…
const components = readdirSync(ui)
  .filter((entry) => statSync(join(ui, entry)).isDirectory() && !notComponents.has(entry))
  .flatMap((folder) =>
    readdirSync(join(ui, folder))
      .filter((file) => file.endsWith(".tsx") && !file.endsWith(".test.tsx"))
      .map((file) => file.slice(0, -4)),
  );

const sidebar = (JSON.parse(readFileSync(join(pages, "meta.json"), "utf8")) as { pages: string[] })
  .pages;
const used = new Set<string>();

for (const slug of components) {
  const page = join(pages, `${slug}.mdx`);
  if (!existsSync(page)) {
    errors.push(`${slug}: no page. Add ${page} (copy dialog.mdx as a model).`);
    continue;
  }
  if (!sidebar.includes(slug))
    errors.push(`${slug}: not in the sidebar. Add it to ${pages}/meta.json.`);
  const names = [...readFileSync(page, "utf8").matchAll(/<Demo name="([^"]+)"/g)].map((m) => m[1]!);
  if (names.length === 0)
    errors.push(`${slug}: the page has no <Demo />. Add one under ${demos}/${slug}/.`);
  for (const name of names) {
    used.add(name);
    if (!existsSync(join(demos, `${name}.tsx`))) {
      errors.push(`${slug}: <Demo name="${name}" /> has no file ${demos}/${name}.tsx.`);
    }
  }
}

for (const page of readdirSync(pages).filter((file) => file.endsWith(".mdx"))) {
  const slug = page.slice(0, -4);
  if (!components.includes(slug)) errors.push(`${page}: no component ${slug} in ${ui}.`);
}

for (const folder of readdirSync(demos).filter((e) => statSync(join(demos, e)).isDirectory())) {
  for (const file of readdirSync(join(demos, folder)).filter((f) => f.endsWith(".tsx"))) {
    const name = `${folder}/${file.slice(0, -4)}`;
    if (!used.has(name)) errors.push(`${demos}/${name}.tsx: shown on no page.`);
  }
}

if (errors.length > 0) {
  console.error(`Docs out of date:\n  ${errors.join("\n  ")}`);
  process.exit(1);
}
console.log(`Docs: ${components.length} components, each with its page and demos.`);
