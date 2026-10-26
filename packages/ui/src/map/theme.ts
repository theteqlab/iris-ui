import type { TransformStyleFunction } from "maplibre-gl";

export type MapStyle = Parameters<TransformStyleFunction>[1];
type Layer = MapStyle["layers"][number];

/** Colours of the map, read from the `--map-*` tokens of the current palette and mode. */
export interface MapColors {
  land: string;
  water: string;
  park: string;
  building: string;
  road: string;
  roadMajor: string;
  boundary: string;
  label: string;
  labelHalo: string;
}

const tokens: Record<keyof MapColors, string> = {
  land: "--map-land",
  water: "--map-water",
  park: "--map-park",
  building: "--map-building",
  road: "--map-road",
  roadMajor: "--map-road-major",
  boundary: "--map-boundary",
  label: "--map-label",
  labelHalo: "--map-label-halo",
};

const clamp = (n: number) => Math.round(Math.min(255, Math.max(0, n)));

/**
 * A computed colour as `rgba()`, which MapLibre parses. Browsers return `color-mix()`
 * results as `color(srgb r g b / a)`, with channels from 0 to 1.
 */
export function toRgba(computed: string): string {
  const srgb = /^color\(srgb\s+([\d.e-]+)\s+([\d.e-]+)\s+([\d.e-]+)(?:\s*\/\s*([\d.e-]+))?\)$/.exec(
    computed.trim(),
  );
  if (srgb) {
    const [r, g, b] = [srgb[1], srgb[2], srgb[3]].map((c) => clamp(Number(c) * 255));
    return `rgba(${r}, ${g}, ${b}, ${srgb[4] ?? 1})`;
  }
  const rgb = /^rgba?\(\s*([\d.]+)[\s,]+([\d.]+)[\s,]+([\d.]+)(?:\s*[,/]\s*([\d.]+))?\s*\)$/.exec(
    computed.trim(),
  );
  if (rgb)
    return `rgba(${clamp(+rgb[1]!)}, ${clamp(+rgb[2]!)}, ${clamp(+rgb[3]!)}, ${rgb[4] ?? 1})`;
  return computed;
}

/**
 * Resolves the tokens to plain colours, as MapLibre needs them: a custom property
 * read back is its raw text (`color-mix(…)`), so each token is applied to a probe
 * element and its computed colour is read.
 */
export function readMapColors(from: Element): MapColors {
  const probe = document.createElement("span");
  probe.style.display = "none";
  from.appendChild(probe);
  const colors = {} as MapColors;
  for (const [key, token] of Object.entries(tokens) as [keyof MapColors, string][]) {
    probe.style.color = `var(${token})`;
    colors[key] = toRgba(getComputedStyle(probe).color);
  }
  probe.remove();
  return colors;
}

const majorRoads = /motorway|trunk|primary/;

/** The colour a layer should take, from its OpenMapTiles source layer and its id. */
function colorFor(layer: Layer, colors: MapColors): string | undefined {
  if (layer.type === "background") return colors.land;
  const source = "source-layer" in layer ? layer["source-layer"] : undefined;
  switch (source) {
    case "water":
    case "waterway":
      return colors.water;
    case "park":
      return colors.park;
    case "landcover":
      return /wood|grass|forest|park/.test(layer.id) ? colors.park : colors.land;
    case "landuse":
      return colors.land;
    case "building":
      return colors.building;
    case "transportation":
      return majorRoads.test(layer.id) ? colors.roadMajor : colors.road;
    case "boundary":
      return colors.boundary;
    default:
      return undefined;
  }
}

/**
 * Recolours an OpenMapTiles style (OpenFreeMap, MapTiler…) with the theme: land, water,
 * parks, buildings, roads, boundaries and labels. Layers of other schemas keep their colours.
 */
export function themeMapStyle(style: MapStyle, colors: MapColors): MapStyle {
  const layers = style.layers.map((layer): Layer => {
    if (layer.type === "symbol") {
      return {
        ...layer,
        paint: {
          ...layer.paint,
          "text-color": colors.label,
          "text-halo-color": colors.labelHalo,
          "text-halo-width": 1.5,
        },
      };
    }
    const color = colorFor(layer, colors);
    if (!color) return layer;
    switch (layer.type) {
      case "background":
        return { ...layer, paint: { ...layer.paint, "background-color": color } };
      case "fill":
        return {
          ...layer,
          paint: { ...layer.paint, "fill-color": color, "fill-outline-color": color },
        };
      case "line":
        return { ...layer, paint: { ...layer.paint, "line-color": color } };
      default:
        return layer;
    }
  });
  return { ...style, layers };
}
