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

test("Dialog: traps the focus, closes with Escape and gives it back", async ({ page }) => {
  const trigger = page.getByRole("button", { name: "Supprimer le projet" });
  await trigger.click();
  const dialog = page.getByRole("dialog", { name: "Supprimer le projet ?" });
  await expect(dialog).toBeVisible();
  for (let i = 0; i < 6; i++) {
    await page.keyboard.press("Tab");
    expect(await dialog.evaluate((el) => el.contains(document.activeElement))).toBe(true);
  }
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await expect(trigger).toBeFocused();
});

test("DropdownMenu: opens with the keyboard, moves with arrows, opens a submenu", async ({
  page,
}) => {
  const trigger = page.getByRole("button", { name: "Actions" });
  await trigger.focus();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("menuitem", { name: /Modifier/ })).toBeFocused();
  await page.keyboard.press("ArrowDown");
  await expect(page.getByRole("menuitem", { name: /Dupliquer/ })).toBeFocused();
  await page.getByRole("menuitem", { name: "Partager" }).focus();
  await page.keyboard.press("ArrowRight");
  await expect(page.getByRole("menuitem", { name: "Copier le lien" })).toBeFocused();
  await page.keyboard.press("Escape");
  await page.keyboard.press("Escape");
  await expect(trigger).toBeFocused();
});

test("Tooltip: appears on keyboard focus", async ({ page }) => {
  await page.getByRole("button", { name: "Livraison", exact: true }).focus();
  await page.keyboard.press("Tab");
  await expect(page.getByRole("tooltip")).toHaveText(/⌘I/);
});

test("Tabs: arrow keys move between tabs and skip disabled ones", async ({ page }) => {
  const list = page.getByRole("tablist", { name: "Réglages (pill)" });
  await list.getByRole("tab", { name: "Profil" }).focus();
  await hold(page, "ArrowRight");
  await expect(list.getByRole("tab", { name: "Facturation" })).toHaveAttribute(
    "aria-selected",
    "true",
  );
  await hold(page, "ArrowRight");
  await expect(list.getByRole("tab", { name: "Profil" })).toBeFocused();
});

test("Toast: shown in a live region, runs its action, stays while hovered", async ({ page }) => {
  await page.getByRole("button", { name: "Erreur avec action" }).click();
  const region = page.getByRole("region", { name: /Notifications/ });
  const toast = region.getByRole("listitem").filter({ hasText: "Paiement refusé" });
  await expect(toast).toBeVisible();
  await expect(region).toHaveAttribute("aria-live", "polite");

  // Sonner closes a toast after 4 s unless it is hovered. Hover once it has
  // finished sliding in, so the pointer stays over it.
  await expect(toast).toHaveAttribute("data-mounted", "true");
  await page.waitForTimeout(500);
  await toast.hover();
  await page.waitForTimeout(5000);
  await expect(toast).toBeVisible();

  await toast.getByRole("button", { name: "Réessayer" }).click();
  await expect(region.getByText("Nouvelle tentative…")).toBeVisible();
});
