import { act, render, renderHook, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";
import { expectNoAxeViolations } from "../../../../test/axe";
import { mockMatchMedia } from "../../../../test/setup";
import { ThemeProvider, useTheme } from "./theme-provider";

const root = () => document.documentElement;
const stored = () => JSON.parse(localStorage.getItem("@irisui/theme") ?? "null");

function Switcher() {
  const { palette, mode, resolvedMode, setPalette, setMode } = useTheme();
  return (
    <div>
      <p>
        {palette} {mode} {resolvedMode}
      </p>
      <button type="button" onClick={() => setPalette("aurore")}>
        Aurore
      </button>
      <button type="button" onClick={() => setMode("dark")}>
        Dark
      </button>
    </div>
  );
}

describe("ThemeProvider", () => {
  it("sets data-palette and data-mode on <html>", () => {
    render(
      <ThemeProvider defaultPalette="glacier" defaultMode="light">
        <Switcher />
      </ThemeProvider>,
    );
    expect(root()).toHaveAttribute("data-palette", "glacier");
    expect(root()).toHaveAttribute("data-mode", "light");
  });

  it("changes and remembers the user's choice", async () => {
    const user = userEvent.setup();
    const onPaletteChange = vi.fn();
    render(
      <ThemeProvider onPaletteChange={onPaletteChange}>
        <Switcher />
      </ThemeProvider>,
    );
    await user.click(screen.getByRole("button", { name: "Aurore" }));
    await user.click(screen.getByRole("button", { name: "Dark" }));

    expect(root()).toHaveAttribute("data-palette", "aurore");
    expect(root()).toHaveAttribute("data-mode", "dark");
    expect(onPaletteChange).toHaveBeenCalledWith("aurore");
    expect(stored()).toEqual({ palette: "aurore", mode: "dark" });
  });

  it("restores the stored choice", () => {
    localStorage.setItem("@irisui/theme", JSON.stringify({ palette: "couchant", mode: "dark" }));
    render(
      <ThemeProvider>
        <Switcher />
      </ThemeProvider>,
    );
    expect(screen.getByText("couchant dark dark")).toBeInTheDocument();
  });

  it("does not persist when storageKey is null", async () => {
    const user = userEvent.setup();
    render(
      <ThemeProvider storageKey={null}>
        <Switcher />
      </ThemeProvider>,
    );
    await user.click(screen.getByRole("button", { name: "Aurore" }));
    expect(localStorage.length).toBe(0);
  });

  it("is controlled with palette and mode", async () => {
    const user = userEvent.setup();
    const onModeChange = vi.fn();
    render(
      <ThemeProvider palette="nacre" mode="light" onModeChange={onModeChange}>
        <Switcher />
      </ThemeProvider>,
    );
    await user.click(screen.getByRole("button", { name: "Dark" }));
    expect(onModeChange).toHaveBeenCalledWith("dark");
    expect(root()).toHaveAttribute("data-mode", "light");
  });

  it("resolves the system mode", () => {
    const wrapper = ({ children }: { children: ReactNode }) => (
      <ThemeProvider defaultMode="system">{children}</ThemeProvider>
    );
    const { result } = renderHook(() => useTheme(), { wrapper });
    expect(result.current.resolvedMode).toBe("light");

    act(() => mockMatchMedia("(prefers-color-scheme: dark)", true));
    expect(result.current.resolvedMode).toBe("dark");
  });

  it("syncs a change made in another tab", () => {
    render(
      <ThemeProvider>
        <Switcher />
      </ThemeProvider>,
    );
    act(() => {
      localStorage.setItem("@irisui/theme", JSON.stringify({ palette: "glacier", mode: "light" }));
      window.dispatchEvent(new StorageEvent("storage", { key: "@irisui/theme" }));
    });
    expect(root()).toHaveAttribute("data-palette", "glacier");
  });

  it("has no axe violations", async () => {
    const { container } = render(
      <ThemeProvider>
        <Switcher />
      </ThemeProvider>,
    );
    await expectNoAxeViolations(container);
  });
});

describe("useTheme", () => {
  it("throws outside ThemeProvider", () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    expect(() => renderHook(() => useTheme())).toThrow(/within a <ThemeProvider>/);
  });
});
