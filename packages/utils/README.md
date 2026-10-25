# @irisui/utils

Shared utilities and React hooks for
[iris-ui](https://github.com/theteqlab/iris-ui).

## Install

```sh
npm install @irisui/utils
```

`react` (18 or 19) is a peer dependency.

## API

### `cn(...inputs)`

Merges class names with [clsx](https://github.com/lukeed/clsx) and resolves
conflicting Tailwind utilities with
[tailwind-merge](https://github.com/dcastil/tailwind-merge) (last one wins).
It knows the custom theme keys of `@irisui/tokens/tailwind.css`, so `text-h3`
is treated as a font size, not a text color.

```ts
import { cn } from "@irisui/utils";

cn("rounded-card p-4", isActive && "bg-glass-strong", className);
```

### `useControllableState({ value, defaultValue, onChange })`

State that can be controlled (`value` + `onChange`) or uncontrolled
(`defaultValue`), following the Radix convention. Returns `[value, setValue]`;
`setValue` accepts a value or an updater function.

```tsx
import { useControllableState } from "@irisui/utils";

function Toggle({ pressed, defaultPressed = false, onPressedChange }: ToggleProps) {
  const [isPressed, setPressed] = useControllableState({
    value: pressed,
    defaultValue: defaultPressed,
    onChange: onPressedChange,
  });
  return <button aria-pressed={isPressed} onClick={() => setPressed((p) => !p)} />;
}
```

### `useReducedMotion()`

Returns `true` when the user asked the system for less motion
(`prefers-reduced-motion: reduce`). Always `false` on the server.

## License

[MIT](./LICENSE)
