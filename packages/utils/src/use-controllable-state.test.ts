import { act, renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { useControllableState } from "./use-controllable-state";

describe("useControllableState", () => {
  it("is uncontrolled with defaultValue", () => {
    const onChange = vi.fn();
    const { result } = renderHook(() => useControllableState({ defaultValue: 1, onChange }));
    expect(result.current[0]).toBe(1);

    act(() => result.current[1](2));
    expect(result.current[0]).toBe(2);
    expect(onChange).toHaveBeenCalledWith(2);
  });

  it("chains updater functions called in the same event", () => {
    const { result } = renderHook(() => useControllableState({ defaultValue: 0 }));
    act(() => {
      result.current[1]((n) => n + 1);
      result.current[1]((n) => n + 1);
    });
    expect(result.current[0]).toBe(2);
  });

  it("is controlled with value and only reports changes", () => {
    const onChange = vi.fn();
    const { result, rerender } = renderHook(
      ({ value }) => useControllableState({ value, defaultValue: 0, onChange }),
      { initialProps: { value: 5 } },
    );
    act(() => result.current[1](6));
    expect(onChange).toHaveBeenCalledWith(6);
    expect(result.current[0]).toBe(5);

    rerender({ value: 6 });
    expect(result.current[0]).toBe(6);
  });

  it("does not call onChange when the value is unchanged", () => {
    const onChange = vi.fn();
    const { result } = renderHook(() => useControllableState({ defaultValue: "a", onChange }));
    act(() => result.current[1]("a"));
    expect(onChange).not.toHaveBeenCalled();
  });

  it("keeps a stable setter and calls the latest onChange", () => {
    const first = vi.fn();
    const second = vi.fn();
    const { result, rerender } = renderHook(
      ({ onChange }) => useControllableState({ defaultValue: 0, onChange }),
      { initialProps: { onChange: first } },
    );
    const setter = result.current[1];
    rerender({ onChange: second });
    expect(result.current[1]).toBe(setter);

    act(() => result.current[1](1));
    expect(first).not.toHaveBeenCalled();
    expect(second).toHaveBeenCalledWith(1);
  });
});
