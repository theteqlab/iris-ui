import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { expectNoAxeViolations } from "../../../../test/axe";
import { LocaleProvider, fr } from "../locale/messages";
import type { Geocoder } from "./geocode";
import { Map, MapMarker } from "./map";

// jsdom has no WebGL: a stand-in records what the components ask of MapLibre.
const maps: FakeMap[] = [];
class FakeMap {
  container: HTMLElement;
  canvas = document.createElement("canvas");
  touchZoomRotate = { disableRotation: vi.fn() };
  setStyle = vi.fn();
  zoomIn = vi.fn();
  zoomOut = vi.fn();
  jumpTo = vi.fn();
  fitBounds = vi.fn();
  remove = vi.fn();
  handlers: Record<string, (() => void)[]> = {};
  options: Record<string, unknown>;
  constructor(options: { container: HTMLElement }) {
    this.options = options;
    this.container = options.container;
    // Like MapLibre: the canvas is a focusable region.
    this.canvas.setAttribute("role", "region");
    this.canvas.tabIndex = 0;
    this.container.appendChild(this.canvas);
    maps.push(this);
  }
  getCanvas() {
    return this.canvas;
  }
  on(type: string, handler: () => void) {
    (this.handlers[type] ??= []).push(handler);
  }
  once(type: string, handler: () => void) {
    this.on(type, handler);
  }
  off(type: string, handler: () => void) {
    this.handlers[type] = (this.handlers[type] ?? []).filter((h) => h !== handler);
  }
  fire(type: string) {
    for (const handler of this.handlers[type] ?? []) handler();
  }
}
class FakeMarker {
  element: HTMLElement;
  lngLat: [number, number] | undefined;
  constructor(options: { element: HTMLElement }) {
    this.element = options.element;
  }
  setLngLat(lngLat: [number, number]) {
    this.lngLat = lngLat;
    return this;
  }
  addTo(map: FakeMap) {
    map.container.appendChild(this.element);
    return this;
  }
  remove() {
    this.element.remove();
    return this;
  }
}
const setWorkerUrl = vi.fn();
vi.mock("maplibre-gl", () => ({ Map: FakeMap, Marker: FakeMarker, setWorkerUrl }));

beforeEach(() => {
  maps.length = 0;
});

const map = () => maps[0]!;

describe("Map", () => {
  it("names the map's region (MapLibre's canvas)", async () => {
    render(<Map aria-label="Our shops" center={[4.83, 45.76]} />);
    expect(await screen.findByRole("region", { name: "Our shops" })).toBe(map().canvas);
  });

  it("leaves the zoom limits to MapLibre unless given", async () => {
    render(<Map aria-label="Map" center={[0, 0]} />);
    await waitFor(() => expect(maps).toHaveLength(1));
    expect(map().options).not.toHaveProperty("maxZoom");
    expect(map().options).not.toHaveProperty("minZoom");
  });

  it("tells MapLibre where its worker is", async () => {
    render(<Map aria-label="Map" center={[0, 0]} workerUrl="/maplibre-gl-worker.mjs" />);
    await waitFor(() => expect(maps).toHaveLength(1));
    expect(setWorkerUrl).toHaveBeenCalledWith("/maplibre-gl-worker.mjs");
  });

  it("loads the style through the theme", async () => {
    render(<Map aria-label="Map" center={[0, 0]} styleUrl="https://example.com/style.json" />);
    await waitFor(() => expect(map().setStyle).toHaveBeenCalled());
    const [url, options] = map().setStyle.mock.calls[0]!;
    expect(url).toBe("https://example.com/style.json");
    expect(options.transformStyle).toBeTypeOf("function");
  });

  it("restyles when the palette changes", async () => {
    render(<Map aria-label="Map" center={[0, 0]} />);
    await waitFor(() => expect(map().setStyle).toHaveBeenCalledTimes(1));
    document.documentElement.setAttribute("data-palette", "aurore");
    await waitFor(() => expect(map().setStyle).toHaveBeenCalledTimes(2));
    document.documentElement.removeAttribute("data-palette");
  });

  it("zooms with its buttons, labelled from LocaleProvider", async () => {
    render(
      <LocaleProvider messages={fr}>
        <Map aria-label="Carte" center={[0, 0]} />
      </LocaleProvider>,
    );
    await waitFor(() => expect(maps).toHaveLength(1));
    await userEvent.click(screen.getByRole("button", { name: "Zoom avant" }));
    await userEvent.click(screen.getByRole("button", { name: "Zoom arrière" }));
    expect(map().zoomIn).toHaveBeenCalledOnce();
    expect(map().zoomOut).toHaveBeenCalledOnce();
  });
});

describe("MapMarker", () => {
  it("places a labelled pin at its position, and fits the view to the markers", async () => {
    render(
      <Map aria-label="Shops">
        <MapMarker lngLat={[4.83, 45.76]} label="Lyon" />
        <MapMarker lngLat={[2.35, 48.85]} label="Paris" tone={2} />
      </Map>,
    );
    expect(await screen.findByRole("button", { name: "Lyon" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Paris" })).toHaveAttribute("data-tone", "2");
    await waitFor(() => expect(map().fitBounds).toHaveBeenCalled());
    expect(map().fitBounds.mock.lastCall![0]).toEqual([
      [2.35, 45.76],
      [4.83, 48.85],
    ]);
  });

  it("finds the position of an address with the Map's geocoder", async () => {
    const geocoder: Geocoder = vi.fn().mockResolvedValue([5.37, 43.3]);
    const onGeocode = vi.fn();
    render(
      <Map aria-label="Shop" geocoder={geocoder}>
        <MapMarker address="Vieux-Port, Marseille" label="Marseille" onGeocode={onGeocode} />
      </Map>,
    );
    expect(await screen.findByRole("button", { name: "Marseille" })).toBeInTheDocument();
    expect(geocoder).toHaveBeenCalledWith("Vieux-Port, Marseille", expect.any(AbortSignal));
    expect(onGeocode).toHaveBeenCalledWith([5.37, 43.3]);
    await waitFor(() =>
      expect(map().jumpTo).toHaveBeenCalledWith({ center: [5.37, 43.3], zoom: 12 }),
    );
  });

  it("opens its popover from the pin, and closes it when the map moves", async () => {
    render(
      <Map aria-label="Shop" center={[4.83, 45.76]}>
        <MapMarker lngLat={[4.83, 45.76]} label="Lyon shop">
          <p>Open 9 am to 7 pm.</p>
        </MapMarker>
      </Map>,
    );
    await userEvent.click(await screen.findByRole("button", { name: "Lyon shop" }));
    expect(screen.getByRole("dialog", { name: "Lyon shop" })).toHaveTextContent(
      "Open 9 am to 7 pm.",
    );
    act(() => map().fire("movestart"));
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
  });

  it("has no axe violations", async () => {
    const { container } = render(
      <Map aria-label="Shops" center={[4.83, 45.76]}>
        <MapMarker lngLat={[4.83, 45.76]} label="Lyon" />
      </Map>,
    );
    await screen.findByRole("button", { name: "Lyon" });
    await expectNoAxeViolations(container);
  });
});
