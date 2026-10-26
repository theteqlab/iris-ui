import { Map, MapMarker } from "@irisui/ui/map";
// Bundlers do not copy MapLibre's worker: Vite serves it from this URL.
import workerUrl from "maplibre-gl/dist/maplibre-gl-worker.mjs?url";

const shops = [
  { label: "Atelier Croix-Rousse", lngLat: [4.8317, 45.7743] as [number, number], tone: undefined },
  { label: "Boutique Bellecour", lngLat: [4.8322, 45.7578] as [number, number], tone: 2 as const },
  {
    label: "Entrepôt Gerland",
    lngLat: [4.8346, 45.7275] as [number, number],
    tone: "ink" as const,
  },
];

/** A map in the page, not in a glass section: backdrop-filter is never nested. */
export function MapShowcase() {
  return (
    <section
      aria-labelledby="map-title"
      data-testid="section-map"
      className="flex flex-col gap-4 py-2"
    >
      <h2 id="map-title" className="m-0 text-h3 font-medium">
        Map · MapMarker
      </h2>
      <Map aria-label="Nos boutiques à Lyon" workerUrl={workerUrl} className="h-[420px]">
        {shops.map((shop) => (
          <MapMarker key={shop.label} lngLat={shop.lngLat} label={shop.label} tone={shop.tone}>
            <strong>{shop.label}</strong>
            <p className="m-0 text-sm text-text-muted">Ouvert de 9 h à 19 h.</p>
          </MapMarker>
        ))}
      </Map>
    </section>
  );
}
