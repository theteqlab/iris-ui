import axe from "axe-core";
import { expect } from "vitest";

/**
 * Runs axe-core on a rendered tree and fails with the list of violations.
 * Colour contrast is checked by the contrast gate on the tokens instead:
 * jsdom does not compute styles.
 */
export async function expectNoAxeViolations(container: Element): Promise<void> {
  const { violations } = await axe.run(container, {
    rules: { "color-contrast": { enabled: false } },
  });
  const report = violations.map(
    (v) => `${v.id}: ${v.help}\n  ${v.nodes.map((n) => n.target.join(" ")).join("\n  ")}`,
  );
  expect(report, report.join("\n\n")).toEqual([]);
}
