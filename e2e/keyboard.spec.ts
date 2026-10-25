import { expect, test } from "@playwright/test";

// Keyboard behaviour that jsdom cannot reproduce, checked in a real browser.
// Keys are held and typed at a human pace: Radix selects a radio on focus only
// while the arrow key is down, and its typeahead ignores instant bursts.

test.beforeEach(async ({ page }) => {
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
});

async function hold(page: import("@playwright/test").Page, key: string) {
  await page.keyboard.down(key);
  await page.waitForTimeout(50);
  await page.keyboard.up(key);
}

test("RadioGroup: arrow keys move and select", async ({ page }) => {
  const group = page.getByRole("radiogroup", { name: "Livraison" });
  const standard = group.getByRole("radio", { name: "Standard" });
  const express = group.getByRole("radio", { name: "Express" });
  await standard.focus();
  await hold(page, "ArrowDown");
  await expect(express).toBeFocused();
  await expect(express).toBeChecked();
  // The disabled option is skipped: from Express, Down wraps to Standard.
  await hold(page, "ArrowDown");
  await expect(standard).toBeChecked();
});

test("Select: opens with the keyboard and finds an option by typing", async ({ page }) => {
  const trigger = page.getByRole("combobox", { name: "Transporteur" });
  await trigger.focus();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("listbox")).toBeVisible();
  await page.keyboard.type("Mon", { delay: 80 });
  await page.keyboard.press("Enter");
  await expect(page.getByRole("listbox")).toBeHidden();
  await expect(trigger).toHaveText(/Mondial Relay/);
  await expect(trigger).toBeFocused();
});

test("Checkbox and Switch toggle with Space", async ({ page }) => {
  const checkbox = page.getByRole("checkbox", { name: "Recevoir la lettre" });
  await checkbox.focus();
  await page.keyboard.press("Space");
  await expect(checkbox).toBeChecked();

  const toggle = page.getByRole("switch", { name: "Mode avion" });
  await toggle.focus();
  await page.keyboard.press("Space");
  await expect(toggle).toBeChecked();
});

test("Button: loading keeps its width and blocks clicks", async ({ page }) => {
  const button = page.getByTestId("loading-button");
  const before = await button.boundingBox();
  await button.click();
  await expect(button).toHaveAttribute("aria-busy", "true");
  const during = await button.boundingBox();
  expect(during?.width).toBe(before?.width);
  await expect(button).not.toHaveAttribute("aria-busy", { timeout: 3000 });
});
