import { MODES, PALETTES, useTheme, type Mode, type Palette } from "@irisui/ui";
import { cn } from "@irisui/utils";
import { Showcase } from "./Showcase";

const PALETTE_LABELS: Record<Palette, string> = {
  nacre: "Nacre",
  aurore: "Aurore",
  couchant: "Couchant",
  glacier: "Glacier",
};

const MODE_LABELS: Record<Mode, string> = {
  light: "Clair",
  dark: "Sombre",
  system: "Système",
};

interface SegmentedProps<T extends string> {
  legend: string;
  name: string;
  options: readonly T[];
  labels: Record<T, string>;
  value: T;
  onChange: (value: T) => void;
}

function Segmented<T extends string>({
  legend,
  name,
  options,
  labels,
  value,
  onChange,
}: SegmentedProps<T>) {
  return (
    <fieldset className="flex flex-wrap items-center gap-2 border-0 p-0">
      <legend className="sr-only">{legend}</legend>
      <span aria-hidden className="mr-1 font-mono text-xs text-text-muted uppercase">
        {legend}
      </span>
      {options.map((option) => (
        <label
          key={option}
          className={cn(
            "inline-flex min-h-11 cursor-pointer items-center rounded-pill px-4 text-sm font-medium",
            "transition-colors duration-(--duration-fast) ease-out",
            "has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-focus-ring",
            option === value ? "bg-selected-bg text-selected-text" : "text-text hover:bg-glass",
          )}
        >
          <input
            type="radio"
            name={name}
            value={option}
            checked={option === value}
            onChange={() => onChange(option)}
            className="sr-only"
          />
          {labels[option]}
        </label>
      ))}
    </fieldset>
  );
}

export function App() {
  const { palette, mode, resolvedMode, setPalette, setMode } = useTheme();

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-10 px-4 py-8 sm:px-8">
      <header
        className={cn(
          "flex flex-wrap items-center justify-between gap-4 rounded-panel px-5 py-3",
          "border border-glass-border bg-glass shadow-rim",
          "backdrop-blur-glass backdrop-saturate-(--glass-saturate)",
        )}
      >
        <span className="font-bold">Playground</span>
        <div className="flex flex-wrap items-center gap-4">
          <Segmented
            legend="Palette"
            name="palette"
            options={PALETTES}
            labels={PALETTE_LABELS}
            value={palette}
            onChange={setPalette}
          />
          <Segmented
            legend="Mode"
            name="mode"
            options={MODES}
            labels={MODE_LABELS}
            value={mode}
            onChange={setMode}
          />
        </div>
      </header>

      <main className="flex flex-col gap-12">
        <h1 className="m-0 text-h2 leading-tight font-medium tracking-display">Composants</h1>
        <Showcase />

        <article
          className={cn(
            "flex max-w-xl flex-col gap-4 rounded-card p-7",
            "border border-glass-border bg-glass shadow-glass",
            "backdrop-blur-glass backdrop-saturate-(--glass-saturate)",
          )}
        >
          <h2 className="m-0 text-h3 font-medium">Thème</h2>
          <dl className="m-0 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 font-mono text-sm">
            <dt className="text-text-muted">data-palette</dt>
            <dd className="m-0">{palette}</dd>
            <dt className="text-text-muted">data-mode</dt>
            <dd className="m-0">
              {mode}
              {mode === "system" && ` → ${resolvedMode}`}
            </dd>
          </dl>
        </article>
      </main>
    </div>
  );
}
