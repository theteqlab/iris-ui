// Bundlers do not copy MapLibre's worker next to the map: point MapLibre to it.
// With Next.js, `new URL(…, import.meta.url)` emits the file as an asset.
export const workerUrl = new URL("maplibre-gl/dist/maplibre-gl-worker.mjs", import.meta.url).href;
