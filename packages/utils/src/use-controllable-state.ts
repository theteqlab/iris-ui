import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

const useIsomorphicLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

export interface UseControllableStateParams<T> {
  /** Controlled value. When defined, the component is controlled. */
  value?: T | undefined;
  /** Initial value when uncontrolled. */
  defaultValue: T;
  /** Called with the next value, in both controlled and uncontrolled modes. */
  onChange?: ((value: T) => void) | undefined;
}

type SetStateFn<T> = (next: T | ((prev: T) => T)) => void;

/**
 * State that can be either controlled (`value` + `onChange`) or uncontrolled
 * (`defaultValue`), following the Radix / shadcn convention.
 */
export function useControllableState<T>({
  value,
  defaultValue,
  onChange,
}: UseControllableStateParams<T>): [T, SetStateFn<T>] {
  const [uncontrolled, setUncontrolled] = useState<T>(defaultValue);
  const isControlled = value !== undefined;
  const current = isControlled ? value : uncontrolled;

  // Refs are synced after render (not during it) so `setValue` stays stable.
  const onChangeRef = useRef(onChange);
  const currentRef = useRef(current);
  useIsomorphicLayoutEffect(() => {
    onChangeRef.current = onChange;
    currentRef.current = current;
  });

  const setValue = useCallback<SetStateFn<T>>(
    (next) => {
      const resolved =
        typeof next === "function" ? (next as (prev: T) => T)(currentRef.current) : next;
      if (Object.is(resolved, currentRef.current)) return;
      if (!isControlled) {
        // Several updates in one event must chain, before the next render syncs the ref.
        currentRef.current = resolved;
        setUncontrolled(resolved);
      }
      onChangeRef.current?.(resolved);
    },
    [isControlled],
  );

  return [current, setValue];
}
