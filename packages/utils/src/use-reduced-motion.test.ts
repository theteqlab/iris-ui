import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { mockMatchMedia } from "../../../test/setup";
import { useReducedMotion } from "./use-reduced-motion";

const QUERY = "(prefers-reduced-motion: reduce)";

describe("useReducedMotion", () => {
  it("is false by default", () => {
    const { result } = renderHook(() => useReducedMotion());
    expect(result.current).toBe(false);
  });

  it("follows the system setting", () => {
    mockMatchMedia(QUERY, true);
    const { result } = renderHook(() => useReducedMotion());
    expect(result.current).toBe(true);

    act(() => mockMatchMedia(QUERY, false));
    expect(result.current).toBe(false);
  });
});
