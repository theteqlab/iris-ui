/**
 * Renames the npm scope of every workspace package.
 *
 *   node scripts/rename-scope.ts @new-scope
 *
 * The current scope is read from scope.config.json, the single source of
 * truth; every occurrence of "<scope>/" in the files tracked by git is
 * rewritten, then scope.config.json is updated. Run `pnpm install` afterwards.
 */
import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const CONFIG = join(ROOT, "scope.config.json");
const EXTENSIONS = /\.(json|ts|tsx|js|mjs|cjs|css|html|md|ya?ml)$/;

const next = process.argv[2];
if (!next || !/^@[a-z0-9][a-z0-9._-]*$/.test(next)) {
  console.error("Usage: node scripts/rename-scope.ts @new-scope");
  process.exit(1);
}

const { scope: current } = JSON.parse(readFileSync(CONFIG, "utf8")) as { scope: string };
if (current === next) {
  console.log(`Scope is already ${next}.`);
  process.exit(0);
}

function trackedFiles(): string[] {
  const out = execFileSync("git", ["ls-files", "-z"], { cwd: ROOT, encoding: "utf8" });
  return out
    .split("\0")
    .filter((file) => EXTENSIONS.test(file) && file !== "pnpm-lock.yaml")
    .map((file) => join(ROOT, file));
}

const pattern = new RegExp(`${current.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}/`, "g");
let changed = 0;
for (const file of trackedFiles()) {
  if (file === CONFIG) continue;
  const source = readFileSync(file, "utf8");
  const updated = source.replace(pattern, `${next}/`);
  if (updated !== source) {
    writeFileSync(file, updated);
    console.log(`  ${relative(ROOT, file)}`);
    changed++;
  }
}

writeFileSync(CONFIG, `${JSON.stringify({ scope: next }, null, 2)}\n`);
console.log(`\n${current} → ${next} in ${changed} file(s). Now run: pnpm install`);
