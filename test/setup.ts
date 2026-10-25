import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";

afterEach(() => {
  cleanup();
  window.localStorage.clear();
  document.documentElement.removeAttribute("data-palette");
  document.documentElement.removeAttribute("data-mode");
});

// jsdom has no matchMedia; tests override `matches` with `mockMatchMedia`.
type Listener = (event: MediaQueryListEvent) => void;
const listeners = new Map<string, Set<Listener>>();
const matches = new Map<string, boolean>();

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) =>
    ({
      media: query,
      get matches() {
        return matches.get(query) ?? false;
      },
      onchange: null,
      addEventListener: (_: string, listener: Listener) => {
        if (!listeners.has(query)) listeners.set(query, new Set());
        listeners.get(query)!.add(listener);
      },
      removeEventListener: (_: string, listener: Listener) => {
        listeners.get(query)?.delete(listener);
      },
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: () => false,
    }) as unknown as MediaQueryList,
});

/** Sets a media query result and notifies its listeners. */
export function mockMatchMedia(query: string, value: boolean): void {
  matches.set(query, value);
  for (const listener of listeners.get(query) ?? []) {
    listener({ matches: value, media: query } as MediaQueryListEvent);
  }
}

afterEach(() => {
  matches.clear();
  listeners.clear();
});
