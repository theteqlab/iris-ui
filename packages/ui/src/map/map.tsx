import { cn } from "@irisui/utils";
import type { Map as MapLibreMap, Marker as MapLibreMarker } from "maplibre-gl";
import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { IconButton } from "../button/icon-button";
import type { Tone } from "../lib/look";
import { useMessages } from "../locale/messages";
import { Popover, PopoverContent, PopoverTrigger } from "../popover/popover";
import { MinusIcon, PlusIcon } from "./icons";
import { geocode, photonGeocoder, type Geocoder, type LngLat } from "./geocode";
import { readMapColors, themeMapStyle } from "./theme";

type MapLibre = typeof import("maplibre-gl");

/** OpenFreeMap's "Positron" style: free vector tiles from OpenStreetMap data, no key. */
export const OPENFREEMAP_STYLE = "https://tiles.openfreemap.org/styles/positron";

interface MapContextValue {
  lib: MapLibre | null;
  map: MapLibreMap | null;
  geocoder: Geocoder;
  /** Markers report their position (or null once removed), for `fitToMarkers`. */
  place: (id: object, position: LngLat | null) => void;
}

const MapContext = createContext<MapContextValue | null>(null);

export interface MapProps extends Omit<HTMLAttributes<HTMLDivElement>, "aria-label" | "onLoad"> {
  /** Required: what the map shows ("Our shops in Lyon"). */
  "aria-label": string;
  /** Initial centre, `[longitude, latitude]`. Without it, the map fits its markers. */
  center?: LngLat | undefined;
  /** Initial zoom, from 0 (the world) to 22. Default 12. */
  zoom?: number | undefined;
  minZoom?: number | undefined;
  maxZoom?: number | undefined;
  /**
   * Fits the view to the markers once they are placed. Default: true when there is no
   * `center`.
   */
  fitToMarkers?: boolean | undefined;
  /** A style in the OpenMapTiles schema, recoloured with the theme. Default: OpenFreeMap. */
  styleUrl?: string | undefined;
  /** Turns `MapMarker` addresses into positions. Default `photonGeocoder`. */
  geocoder?: Geocoder | undefined;
  /** Shows the zoom buttons. Default true. */
  zoomControls?: boolean | undefined;
  /** Pans and zooms with the pointer, touch and keyboard. Default true. */
  interactive?: boolean | undefined;
  /**
   * Where MapLibre's worker file is served. Bundlers do not copy it: with Vite,
   * `import workerUrl from "maplibre-gl/dist/maplibre-gl-worker.mjs?url"`; or copy the
   * file to your public folder and pass its path. Set once for every map of the page.
   */
  workerUrl?: string | undefined;
  /** Called with the MapLibre map once it is ready, to go further than these props. */
  onLoad?: ((map: MapLibreMap) => void) | undefined;
  /** Markers. */
  children?: ReactNode;
}

/**
 * A map of free OpenStreetMap tiles in the colours of the palette and mode: it is
 * recoloured when they change. Give it a height. Keyboard: arrows pan, + and − zoom.
 * Import `maplibre-gl/dist/maplibre-gl.css` once in your app.
 */
export const Map = forwardRef<HTMLDivElement, MapProps>(function Map(
  {
    center,
    zoom = 12,
    minZoom,
    maxZoom,
    fitToMarkers,
    styleUrl = OPENFREEMAP_STYLE,
    geocoder = photonGeocoder,
    zoomControls = true,
    interactive = true,
    workerUrl,
    onLoad,
    className,
    children,
    "aria-label": label,
    ...props
  },
  forwardedRef,
) {
  const messages = useMessages();
  const container = useRef<HTMLDivElement>(null);
  const root = useRef<HTMLDivElement>(null);
  useImperativeHandle(forwardedRef, () => root.current as HTMLDivElement);
  const [state, setState] = useState<{ lib: MapLibre; map: MapLibreMap } | null>(null);
  const positions = useRef(new globalThis.Map<object, LngLat>());
  const [placed, setPlaced] = useState(0);

  // The initial view and the callbacks are read once, when the map is created.
  const initial = useRef({ center, zoom, minZoom, maxZoom, interactive, workerUrl, onLoad, label });

  useEffect(() => {
    let cancelled = false;
    let map: MapLibreMap | undefined;
    void import("maplibre-gl").then((lib) => {
      if (cancelled || !container.current) return;
      const { center, zoom, minZoom, maxZoom, interactive, workerUrl, onLoad, label } =
        initial.current;
      if (workerUrl) lib.setWorkerUrl(workerUrl);
      map = new lib.Map({
        container: container.current,
        center: center ?? [0, 20],
        zoom: center ? zoom : 1,
        // Only when given: MapLibre reads null as 0.
        ...(minZoom === undefined ? {} : { minZoom }),
        ...(maxZoom === undefined ? {} : { maxZoom }),
        interactive,
        attributionControl: { compact: true },
        dragRotate: false,
        pitchWithRotate: false,
      });
      map.touchZoomRotate.disableRotation();
      // MapLibre makes the canvas a focusable region: it carries the name.
      map.getCanvas().setAttribute("aria-label", label);
      // Tiles that fail to load (offline, blocked) are not worth a console error.
      map.on("error", (event) => console.warn("[iris-ui Map]", event.error?.message));
      map.once("load", () => onLoad?.(map!));
      setState({ lib, map });
    });
    return () => {
      cancelled = true;
      map?.remove();
      setState(null);
    };
  }, []);

  // The style, recoloured now and whenever the palette or the mode changes.
  useEffect(() => {
    const map = state?.map;
    const el = root.current;
    if (!map || !el) return;
    const apply = () =>
      map.setStyle(styleUrl, {
        diff: true,
        transformStyle: (_previous, next) => themeMapStyle(next, readMapColors(el)),
      });
    apply();
    const observer = new MutationObserver(apply);
    observer.observe(document.documentElement, {
      attributeFilter: ["data-palette", "data-mode", "class"],
    });
    const scheme = window.matchMedia("(prefers-color-scheme: dark)");
    scheme.addEventListener("change", apply);
    return () => {
      observer.disconnect();
      scheme.removeEventListener("change", apply);
    };
  }, [state, styleUrl]);

  const place = useCallback((id: object, position: LngLat | null) => {
    if (position) positions.current.set(id, position);
    else positions.current.delete(id);
    setPlaced((n) => n + 1);
  }, []);

  const fit = fitToMarkers ?? center === undefined;
  useEffect(() => {
    const map = state?.map;
    const all = [...positions.current.values()];
    if (!map || !fit || all.length === 0) return;
    if (all.length === 1) {
      map.jumpTo({ center: all[0]!, zoom: initial.current.zoom });
      return;
    }
    const lngs = all.map((p) => p[0]);
    const lats = all.map((p) => p[1]);
    map.fitBounds(
      [
        [Math.min(...lngs), Math.min(...lats)],
        [Math.max(...lngs), Math.max(...lats)],
      ],
      { padding: 64, maxZoom: 15, animate: false },
    );
  }, [state, fit, placed]);

  const context = useMemo<MapContextValue>(
    () => ({ lib: state?.lib ?? null, map: state?.map ?? null, geocoder, place }),
    [state, geocoder, place],
  );

  return (
    <MapContext.Provider value={context}>
      <div
        ref={root}
        className={cn("iris-map relative isolate h-96 overflow-hidden rounded-card", className)}
        {...props}
      >
        {/* Sized, not positioned: MapLibre's own CSS makes it `position: relative`. */}
        <div ref={container} className="size-full" />
        {zoomControls && (
          <div className="absolute top-3 right-3 z-10 flex flex-col gap-2">
            <IconButton
              look="glass"
              size="sm"
              aria-label={messages.zoomIn}
              onClick={() => state?.map.zoomIn()}
            >
              <PlusIcon />
            </IconButton>
            <IconButton
              look="glass"
              size="sm"
              aria-label={messages.zoomOut}
              onClick={() => state?.map.zoomOut()}
            >
              <MinusIcon />
            </IconButton>
          </div>
        )}
        {children}
      </div>
    </MapContext.Provider>
  );
});

export interface MapMarkerProps {
  /** Position, `[longitude, latitude]`. Or give an `address`. */
  lngLat?: LngLat | undefined;
  /** An address, turned into a position by the Map's geocoder. Ignored with `lngLat`. */
  address?: string | undefined;
  /** Required: the pin's name, read by screen readers ("Lyon shop"). */
  label: string;
  /** Pin colour. Default: the holographic film. */
  tone?: Tone | undefined;
  /** Shown in a popover when the pin is pressed. */
  children?: ReactNode;
  /** Called when the pin is pressed. */
  onClick?: (() => void) | undefined;
  /** Called with the position found for `address` (or null). */
  onGeocode?: ((position: LngLat | null) => void) | undefined;
}

const noSubscription = () => () => {};
const isClient = () => true;
const isServer = () => false;

/** A pin on the map, at a position or an address; a button, with an optional popover. */
export function MapMarker({
  lngLat,
  address,
  label,
  tone,
  children,
  onClick,
  onGeocode,
}: MapMarkerProps) {
  const context = useContext(MapContext);
  if (!context) throw new Error("MapMarker must be inside a Map.");
  const { lib, map, geocoder, place } = context;
  // Created after hydration: the server renders no pin, nor does the first client render.
  const hydrated = useSyncExternalStore(noSubscription, isClient, isServer);
  const element = useMemo(() => (hydrated ? document.createElement("div") : null), [hydrated]);
  const [found, setFound] = useState<LngLat | null>(null);
  const [open, setOpen] = useState(false);
  const [id] = useState(() => ({}));
  const onGeocodeRef = useRef(onGeocode);
  useEffect(() => {
    onGeocodeRef.current = onGeocode;
  });

  useEffect(() => {
    if (lngLat || !address) return;
    let current = true;
    void geocode(geocoder, address).then((position) => {
      if (!current) return;
      setFound(position);
      onGeocodeRef.current?.(position);
    });
    return () => {
      current = false;
    };
  }, [lngLat, address, geocoder]);

  const position = lngLat ?? found;
  const lng = position?.[0];
  const lat = position?.[1];

  const marker = useRef<MapLibreMarker | null>(null);
  useEffect(() => {
    if (!lib || !map || !element) return;
    marker.current = new lib.Marker({ element, anchor: "bottom" });
    return () => {
      marker.current?.remove();
      marker.current = null;
    };
  }, [lib, map, element]);

  useEffect(() => {
    const current = marker.current;
    if (!current || !map || lng === undefined || lat === undefined) {
      place(id, null);
      return;
    }
    current.setLngLat([lng, lat]).addTo(map);
    place(id, [lng, lat]);
    return () => {
      current.remove();
      place(id, null);
    };
  }, [map, lng, lat, id, place, lib, element]);

  // The popover would stay behind while the map moves: close it.
  useEffect(() => {
    if (!map || !open) return;
    const close = () => setOpen(false);
    map.on("movestart", close);
    return () => {
      map.off("movestart", close);
    };
  }, [map, open]);

  if (!element) return null;
  const pin = (
    <button
      type="button"
      aria-label={label}
      data-tone={tone}
      onClick={onClick}
      className="iris-look iris-map-pin iris-interactive relative block size-11 cursor-pointer border-0 bg-transparent p-0"
    >
      <span aria-hidden="true" className="iris-map-pin-head" />
    </button>
  );
  return createPortal(
    children ? (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>{pin}</PopoverTrigger>
        <PopoverContent side="top" sideOffset={4} aria-label={label}>
          {children}
        </PopoverContent>
      </Popover>
    ) : (
      pin
    ),
    element,
  );
}
