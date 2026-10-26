/** A position as `[longitude, latitude]`, the order MapLibre and GeoJSON use. */
export type LngLat = [lng: number, lat: number];

/** Finds the position of an address, or `null`. Called once per address (results are cached). */
export type Geocoder = (address: string, signal: AbortSignal) => Promise<LngLat | null>;

async function firstFeature(url: string, signal: AbortSignal): Promise<LngLat | null> {
  const response = await fetch(url, { signal });
  if (!response.ok) return null;
  const data = (await response.json()) as {
    features?: { geometry?: { coordinates?: [number, number] } }[];
  };
  const coordinates = data.features?.[0]?.geometry?.coordinates;
  return coordinates ? [coordinates[0], coordinates[1]] : null;
}

/**
 * Photon (photon.komoot.io): worldwide, OpenStreetMap data, no key. A shared public
 * service for reasonable use; for heavy traffic, host Photon or pass your own geocoder.
 */
export const photonGeocoder: Geocoder = (address, signal) =>
  firstFeature(`https://photon.komoot.io/api/?limit=1&q=${encodeURIComponent(address)}`, signal);

/** Base Adresse Nationale (api-adresse.data.gouv.fr): French addresses, open data, no key. */
export const banGeocoder: Geocoder = (address, signal) =>
  firstFeature(
    `https://api-adresse.data.gouv.fr/search/?limit=1&q=${encodeURIComponent(address)}`,
    signal,
  );

const caches = new WeakMap<Geocoder, Map<string, Promise<LngLat | null>>>();

/** Geocodes once per geocoder and address; failures resolve to `null`. */
export function geocode(geocoder: Geocoder, address: string): Promise<LngLat | null> {
  let cache = caches.get(geocoder);
  if (!cache) caches.set(geocoder, (cache = new Map()));
  const key = address.trim().toLowerCase();
  let result = cache.get(key);
  if (!result) {
    // Not tied to one component: two markers can share the request.
    result = geocoder(address, new AbortController().signal).catch(() => null);
    cache.set(key, result);
  }
  return result;
}
