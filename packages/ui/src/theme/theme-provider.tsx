import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import {
  DEFAULT_MODE,
  DEFAULT_PALETTE,
  DEFAULT_STORAGE_KEY,
  isMode,
  isPalette,
  type Mode,
  type Palette,
  type ResolvedMode,
} from "./constants";
import { getThemeScript, type ThemeScriptOptions } from "./theme-script";

const useIsomorphicLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

export interface ThemeContextValue {
  palette: Palette;
  /** Mode as chosen: `light`, `dark` or `system`. */
  mode: Mode;
  /** Mode actually displayed, `system` resolved through `prefers-color-scheme`. */
  resolvedMode: ResolvedMode;
  setPalette: (palette: Palette) => void;
  setMode: (mode: Mode) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export interface ThemeProviderProps {
  children?: ReactNode;
  /** Controlled palette. */
  palette?: Palette;
  /** Initial palette when uncontrolled and nothing is stored. */
  defaultPalette?: Palette;
  onPaletteChange?: (palette: Palette) => void;
  /** Controlled mode. */
  mode?: Mode;
  /** Initial mode when uncontrolled and nothing is stored. */
  defaultMode?: Mode;
  onModeChange?: (mode: Mode) => void;
  /** localStorage key used to remember the user's choice. `null` disables persistence. */
  storageKey?: string | null;
}

interface StoredTheme {
  palette?: unknown;
  mode?: unknown;
}

function readStorage(key: string): StoredTheme {
  try {
    const parsed: unknown = JSON.parse(window.localStorage.getItem(key) ?? "{}");
    return parsed && typeof parsed === "object" ? (parsed as StoredTheme) : {};
  } catch {
    return {};
  }
}

function writeStorage(key: string, value: { palette: Palette; mode: Mode }): void {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage unavailable (private mode, quota): the choice is simply not remembered.
  }
}

const DARK_QUERY = "(prefers-color-scheme: dark)";

function subscribeColorScheme(onChange: () => void): () => void {
  const media = window.matchMedia(DARK_QUERY);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

function useSystemMode(): ResolvedMode {
  return useSyncExternalStore(
    subscribeColorScheme,
    () => (window.matchMedia(DARK_QUERY).matches ? "dark" : "light"),
    () => "light",
  );
}

/**
 * Optional. Sets `data-palette` and `data-mode` on `<html>` and remembers the
 * user's choice. Without it, the HTML attributes alone are enough: the
 * `system` mode is handled in CSS by the tokens.
 */
export function ThemeProvider({
  children,
  palette: paletteProp,
  defaultPalette = DEFAULT_PALETTE,
  onPaletteChange,
  mode: modeProp,
  defaultMode = DEFAULT_MODE,
  onModeChange,
  storageKey = DEFAULT_STORAGE_KEY,
}: ThemeProviderProps) {
  const [paletteState, setPaletteState] = useState<Palette>(defaultPalette);
  const [modeState, setModeState] = useState<Mode>(defaultMode);
  // Stored values are read after mount so that server and client render the same tree.
  const [restored, setRestored] = useState(false);

  const palette = paletteProp ?? paletteState;
  const mode = modeProp ?? modeState;
  const systemMode = useSystemMode();
  const resolvedMode: ResolvedMode = mode === "system" ? systemMode : mode;

  useIsomorphicLayoutEffect(() => {
    if (storageKey !== null) {
      const stored = readStorage(storageKey);
      if (isPalette(stored.palette)) setPaletteState(stored.palette);
      if (isMode(stored.mode)) setModeState(stored.mode);
    }
    setRestored(true);
  }, [storageKey]);

  useIsomorphicLayoutEffect(() => {
    if (!restored) return;
    const root = document.documentElement;
    root.setAttribute("data-palette", palette);
    root.setAttribute("data-mode", mode);
  }, [restored, palette, mode]);

  // Keep several tabs in sync.
  useEffect(() => {
    if (storageKey === null) return;
    const onStorage = (event: StorageEvent) => {
      if (event.key !== storageKey) return;
      const stored = readStorage(storageKey);
      if (isPalette(stored.palette)) setPaletteState(stored.palette);
      if (isMode(stored.mode)) setModeState(stored.mode);
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [storageKey]);

  const setPalette = useCallback(
    (next: Palette) => {
      if (paletteProp === undefined) setPaletteState(next);
      if (storageKey !== null) writeStorage(storageKey, { palette: next, mode });
      onPaletteChange?.(next);
    },
    [paletteProp, storageKey, mode, onPaletteChange],
  );

  const setMode = useCallback(
    (next: Mode) => {
      if (modeProp === undefined) setModeState(next);
      if (storageKey !== null) writeStorage(storageKey, { palette, mode: next });
      onModeChange?.(next);
    },
    [modeProp, storageKey, palette, onModeChange],
  );

  const value = useMemo<ThemeContextValue>(
    () => ({ palette, mode, resolvedMode, setPalette, setMode }),
    [palette, mode, resolvedMode, setPalette, setMode],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

/** Reads and changes the current theme. Must be used inside `ThemeProvider`. */
export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (context === null) {
    throw new Error("useTheme must be used within a <ThemeProvider>.");
  }
  return context;
}

export interface ThemeScriptProps extends ThemeScriptOptions {
  nonce?: string;
}

/** Renders the anti-flash script; place it in `<head>`. */
export function ThemeScript({ nonce, ...options }: ThemeScriptProps) {
  return (
    <script
      nonce={nonce}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: getThemeScript(options) }}
    />
  );
}
