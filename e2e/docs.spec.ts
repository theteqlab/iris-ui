import { readdirSync, readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { expect, test, type Page } from "@playwright/test";
import { stubMapTiles } from "./map-tiles";

const axeSource = readFileSync(
  createRequire(import.meta.url).resolve("axe-core/axe.min.js"),
  "utf8",
);

interface AxeViolation {
  id: string;
  help: string;
  nodes: { target: string[] }[];
}

/**
 * Violations on the page. `region` and `landmark-unique` are left out: they flag the
 * Fumadocs layout (the table of contents, the code blocks of its tabs), not iris-ui.
 */
async function axeReport(page: Page): Promise<string[]> {
  const violations = await page.evaluate(async () => {
    const axe = (
      window as unknown as {
        axe: { run: (options: object) => Promise<{ violations: unknown }> };
      }
    ).axe;
    const options = {
      rules: { region: { enabled: false }, "landmark-unique": { enabled: false } },
    };
    return (await axe.run(options)).violations as AxeViolation[];
  });
  return violations.map(
    (v) => `${v.id}: ${v.help} (${v.nodes.map((n) => n.target.join(" ")).join(", ")})`,
  );
}

const pages = [
  "",
  ...readdirSync("apps/docs/content/docs/components")
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => `components/${file.replace(/\.mdx$/, "")}`),
];

test.beforeEach(async ({ page }) => {
  await stubMapTiles(page);
});

for (const slug of pages) {
  for (const colorScheme of ["light", "dark"] as const) {
    test(`docs · /${slug} · ${colorScheme}`, async ({ page }) => {
      const errors: string[] = [];
      page.on("pageerror", (error) => errors.push(error.message));
      page.on("console", (message) => {
        if (message.type() === "error") errors.push(message.text());
      });
      await page.emulateMedia({ colorScheme });
      await page.goto(`/docs/${slug}${slug ? "/" : ""}`);
      await expect(page.locator("h1")).toBeVisible();

      await page.addScriptTag({ content: axeSource });
      expect(await axeReport(page)).toEqual([]);
      expect(errors).toEqual([]);
    });
  }
}

for (const colorScheme of ["light", "dark"] as const) {
  test(`docs · open dialog · ${colorScheme}`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("console", (message) => {
      if (message.type() === "error") errors.push(message.text());
    });
    await page.emulateMedia({ colorScheme });
    await page.goto("/docs/components/dialog/");

    // next-themes sets the iris-ui mode next to Fumadocs' class.
    await expect(page.locator("html")).toHaveAttribute("data-mode", colorScheme);

    await page.addScriptTag({ content: axeSource });
    // Open: the dialog over the page, contrast included.
    await page.getByRole("button", { name: "Edit profile" }).click();
    await expect(page.getByRole("dialog", { name: "Edit profile" })).toBeVisible();
    expect(await axeReport(page)).toEqual([]);

    expect(errors).toEqual([]);
  });
}

test("docs · the demo opens and closes from the keyboard", async ({ page }) => {
  await page.goto("/docs/components/dialog/");
  const trigger = page.getByRole("button", { name: "Edit profile" });
  await trigger.focus();
  await page.keyboard.press("Enter");
  const dialog = page.getByRole("dialog", { name: "Edit profile" });
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole("textbox", { name: "Name" })).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await expect(trigger).toBeFocused();
});

test("docs · the palette switcher sets and remembers the palette", async ({ page }) => {
  await page.goto("/docs/components/dialog/");
  await page.getByRole("button", { name: "Glacier" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-palette", "glacier");
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-palette", "glacier");
  await expect(page.getByRole("button", { name: "Glacier" })).toHaveAttribute(
    "aria-pressed",
    "true",
  );
});
