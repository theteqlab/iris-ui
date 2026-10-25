import { describe, expect, it } from "vitest";
import { getThemeScript } from "./theme-script";

const run = (script: string) => new Function(script)();
const root = () => document.documentElement;

describe("getThemeScript", () => {
  it("applies the defaults when nothing is stored", () => {
    run(getThemeScript());
    expect(root()).toHaveAttribute("data-palette", "nacre");
    expect(root()).toHaveAttribute("data-mode", "system");
  });

  it("applies the stored palette and mode", () => {
    localStorage.setItem("@irisui/theme", JSON.stringify({ palette: "glacier", mode: "dark" }));
    run(getThemeScript());
    expect(root()).toHaveAttribute("data-palette", "glacier");
    expect(root()).toHaveAttribute("data-mode", "dark");
  });

  it("ignores invalid or corrupted stored values", () => {
    localStorage.setItem("@irisui/theme", JSON.stringify({ palette: "neon", mode: 3 }));
    run(getThemeScript({ defaultPalette: "aurore", defaultMode: "light" }));
    expect(root()).toHaveAttribute("data-palette", "aurore");
    expect(root()).toHaveAttribute("data-mode", "light");

    localStorage.setItem("@irisui/theme", "{not json");
    run(getThemeScript());
    expect(root()).toHaveAttribute("data-palette", "nacre");
  });

  it("uses a custom storage key", () => {
    localStorage.setItem("app-theme", JSON.stringify({ palette: "couchant" }));
    run(getThemeScript({ storageKey: "app-theme" }));
    expect(root()).toHaveAttribute("data-palette", "couchant");
  });
});
