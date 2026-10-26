import { describe, expect, it } from "vitest";
import { themeMapStyle, toRgba, type MapColors, type MapStyle } from "./theme";

const colors: MapColors = {
  land: "rgb(1, 1, 1)",
  water: "rgb(2, 2, 2)",
  park: "rgb(3, 3, 3)",
  building: "rgb(4, 4, 4)",
  road: "rgb(5, 5, 5)",
  roadMajor: "rgb(6, 6, 6)",
  boundary: "rgb(7, 7, 7)",
  label: "rgb(8, 8, 8)",
  labelHalo: "rgb(9, 9, 9)",
};

// A few layers as OpenFreeMap's styles name them, in the OpenMapTiles schema.
const style: MapStyle = {
  version: 8,
  sources: { openmaptiles: { type: "vector", url: "https://example.com/tiles.json" } },
  layers: [
    { id: "background", type: "background", paint: { "background-color": "#fff" } },
    {
      id: "water",
      type: "fill",
      source: "openmaptiles",
      "source-layer": "water",
      paint: { "fill-color": "#00f", "fill-opacity": 0.8 },
    },
    {
      id: "landcover_wood",
      type: "fill",
      source: "openmaptiles",
      "source-layer": "landcover",
      paint: { "fill-color": "#0f0" },
    },
    {
      id: "building",
      type: "fill",
      source: "openmaptiles",
      "source-layer": "building",
      paint: { "fill-color": "#999" },
    },
    {
      id: "highway_motorway",
      type: "line",
      source: "openmaptiles",
      "source-layer": "transportation",
      paint: { "line-color": "#f80", "line-width": 3 },
    },
    {
      id: "highway_minor",
      type: "line",
      source: "openmaptiles",
      "source-layer": "transportation",
      paint: { "line-color": "#ccc" },
    },
    {
      id: "waterway",
      type: "line",
      source: "openmaptiles",
      "source-layer": "waterway",
      paint: { "line-color": "#00f" },
    },
    {
      id: "boundary_country",
      type: "line",
      source: "openmaptiles",
      "source-layer": "boundary",
      paint: { "line-color": "#000" },
    },
    {
      id: "place_city",
      type: "symbol",
      source: "openmaptiles",
      "source-layer": "place",
      layout: { "text-field": "{name}" },
      paint: { "text-color": "#333" },
    },
    {
      id: "custom",
      type: "fill",
      source: "openmaptiles",
      "source-layer": "aeroway",
      paint: { "fill-color": "#abc" },
    },
  ],
};

const paint = (themed: MapStyle, id: string) =>
  themed.layers.find((layer) => layer.id === id)?.paint as Record<string, unknown>;

describe("themeMapStyle", () => {
  const themed = themeMapStyle(style, colors);

  it("colours land, water, parks and buildings", () => {
    expect(paint(themed, "background")["background-color"]).toBe(colors.land);
    expect(paint(themed, "water")["fill-color"]).toBe(colors.water);
    expect(paint(themed, "landcover_wood")["fill-color"]).toBe(colors.park);
    expect(paint(themed, "building")["fill-color"]).toBe(colors.building);
  });

  it("keeps the other paint properties", () => {
    expect(paint(themed, "water")["fill-opacity"]).toBe(0.8);
    expect(paint(themed, "highway_motorway")["line-width"]).toBe(3);
  });

  it("tells major roads from the others, and colours waterways and boundaries", () => {
    expect(paint(themed, "highway_motorway")["line-color"]).toBe(colors.roadMajor);
    expect(paint(themed, "highway_minor")["line-color"]).toBe(colors.road);
    expect(paint(themed, "waterway")["line-color"]).toBe(colors.water);
    expect(paint(themed, "boundary_country")["line-color"]).toBe(colors.boundary);
  });

  it("gives labels the text colour and a halo", () => {
    expect(paint(themed, "place_city")["text-color"]).toBe(colors.label);
    expect(paint(themed, "place_city")["text-halo-color"]).toBe(colors.labelHalo);
  });

  it("leaves layers of unknown source layers as they are, and the input untouched", () => {
    expect(paint(themed, "custom")["fill-color"]).toBe("#abc");
    expect(paint(style, "water")["fill-color"]).toBe("#00f");
  });
});

describe("toRgba", () => {
  it("turns the browser's color(srgb …) into rgba()", () => {
    expect(toRgba("color(srgb 0.969804 0.964314 0.983529)")).toBe("rgba(247, 246, 251, 1)");
    expect(toRgba("color(srgb 1 0 0.5 / 0.25)")).toBe("rgba(255, 0, 128, 0.25)");
  });

  it("normalises rgb() and rgba()", () => {
    expect(toRgba("rgb(10, 20, 30)")).toBe("rgba(10, 20, 30, 1)");
    expect(toRgba("rgba(10, 20, 30, 0.5)")).toBe("rgba(10, 20, 30, 0.5)");
    expect(toRgba("rgb(10 20 30 / 0.5)")).toBe("rgba(10, 20, 30, 0.5)");
  });
});
