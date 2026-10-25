import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { expect, test } from "@playwright/test";

const PALETTES = ["nacre", "aurore", "couchant", "glacier"] as const;
const MODES = ["light", "dark"] as const;
const STORAGE_KEY = "@irisui/theme";

const axeSource = readFileSync(
  createRequire(import.meta.url).resolve("axe-core/axe.min.js"),
  "utf8",
);

interface AxeViolation {
  id: string;
  help: string;
  nodes: { target: string[] }[];
}

for (const palette of PALETTES) {
  for (const mode of MODES) {
    test(`playground · ${palette} · ${mode}`, async ({ page }) => {
      const errors: string[] = [];
      page.on("pageerror", (error) => errors.push(error.message));
      page.on("console", (message) => {
        if (message.type() === "error") errors.push(message.text());
      });

      // The inline theme script reads the stored choice before the first paint.
      await page.addInitScript(
        ([key, value]) => window.localStorage.setItem(key, value),
        [STORAGE_KEY, JSON.stringify({ palette, mode })],
      );
      await page.goto("/");

      const html = page.locator("html");
      await expect(html).toHaveAttribute("data-palette", palette);
      await expect(html).toHaveAttribute("data-mode", mode);

      await page.addScriptTag({ content: axeSource });
      const violations = await page.evaluate(async () => {
        const axe = (window as unknown as { axe: { run: () => Promise<{ violations: unknown }> } })
          .axe;
        return (await axe.run()).violations as AxeViolation[];
      });
      const report = violations.map(
        (v) => `${v.id}: ${v.help} (${v.nodes.map((n) => n.target.join(" ")).join(", ")})`,
      );
      expect(report, report.join("\n")).toEqual([]);
      expect(errors).toEqual([]);
    });
  }
}
