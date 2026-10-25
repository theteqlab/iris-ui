import { cn } from "@irisui/utils";
import {
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type ChangeEvent,
  type TextareaHTMLAttributes,
} from "react";
import { useFieldControl } from "../field/field";
import { useMessages } from "../locale/messages";

const useIsomorphicLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Marks the field invalid (red border and ring, `aria-invalid`). Also set by `Field`. */
  invalid?: boolean;
  /** Grows with its content instead of scrolling. */
  autoResize?: boolean;
  /** Shows `count / maxLength` under the field, announced politely. Requires `maxLength`. */
  showCount?: boolean;
  /** Counter text. Default from `LocaleProvider` ("12 / 200 characters"). */
  counterLabel?: (count: number, max: number) => string;
}

/** Multi-line text field. The ref and every native prop go to the `<textarea>`. */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  {
    invalid: invalidProp,
    autoResize = false,
    showCount = false,
    counterLabel,
    className,
    onChange,
    rows = 3,
    ...props
  },
  forwardedRef,
) {
  const messages = useMessages();
  const counterId = useId();
  const max = props.maxLength;
  const withCounter = showCount && max !== undefined;
  const { invalid, control } = useFieldControl({
    ...props,
    "aria-invalid": invalidProp || props["aria-invalid"],
    "aria-describedby":
      [props["aria-describedby"], withCounter ? counterId : undefined].filter(Boolean).join(" ") ||
      undefined,
  });

  const innerRef = useRef<HTMLTextAreaElement | null>(null);
  const setRef = useCallback(
    (node: HTMLTextAreaElement | null) => {
      innerRef.current = node;
      if (typeof forwardedRef === "function") forwardedRef(node);
      else if (forwardedRef) forwardedRef.current = node;
    },
    [forwardedRef],
  );

  const initial = String(props.value ?? props.defaultValue ?? "");
  const [uncontrolledCount, setUncontrolledCount] = useState(initial.length);
  const count = props.value !== undefined ? String(props.value).length : uncontrolledCount;

  const resize = useCallback(() => {
    const node = innerRef.current;
    if (!autoResize || !node) return;
    node.style.height = "auto";
    node.style.height = `${node.scrollHeight}px`;
  }, [autoResize]);

  useIsomorphicLayoutEffect(resize, [resize, props.value]);

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setUncontrolledCount(event.target.value.length);
    resize();
    onChange?.(event);
  };

  const textarea = (
    <textarea
      ref={setRef}
      rows={rows}
      data-invalid={invalid ? "" : undefined}
      data-disabled={control.disabled ? "" : undefined}
      onChange={handleChange}
      {...control}
      className={cn(
        "iris-field box-border block min-h-(--control-lg) w-full px-3.5 py-2.5 font-sans text-md",
        "disabled:cursor-not-allowed",
        autoResize ? "resize-none overflow-hidden" : "resize-y",
        className,
      )}
    />
  );

  if (!withCounter) return textarea;
  return (
    <div className="flex flex-col gap-1">
      {textarea}
      <p
        id={counterId}
        aria-live="polite"
        className={cn("m-0 self-end text-sm text-text-muted", count >= max && "text-danger-text")}
      >
        {(counterLabel ?? messages.characterCount)(count, max)}
      </p>
    </div>
  );
});
