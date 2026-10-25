import { describe, expect, it } from "vitest";
import { cn } from "./cn";

describe("cn", () => {
  it("joins class names and drops falsy values", () => {
    expect(cn("a", false, undefined, ["b", { c: true, d: false }])).toBe("a b c");
  });

  it("keeps the last of two conflicting Tailwind utilities", () => {
    expect(cn("p-2", "p-4")).toBe("p-4");
    expect(cn("rounded-field", "rounded-card")).toBe("rounded-card");
  });

  it("knows the iris-ui theme keys", () => {
    // `text-h3` is a font size and `text-text-muted` a colour: both are kept.
    expect(cn("text-h3", "text-text-muted")).toBe("text-h3 text-text-muted");
    expect(cn("text-sm", "text-h3")).toBe("text-h3");
    expect(cn("shadow-glass", "shadow-holo")).toBe("shadow-holo");
  });
});
