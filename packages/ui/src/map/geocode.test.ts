import { afterEach, describe, expect, it, vi } from "vitest";
import { banGeocoder, geocode, photonGeocoder, type Geocoder } from "./geocode";

const feature = (lng: number, lat: number) =>
  new Response(JSON.stringify({ features: [{ geometry: { coordinates: [lng, lat] } }] }));

afterEach(() => vi.unstubAllGlobals());

describe("geocoders", () => {
  it("Photon: returns the first result as [lng, lat]", async () => {
    const fetch = vi.fn().mockResolvedValue(feature(4.83, 45.76));
    vi.stubGlobal("fetch", fetch);
    expect(await photonGeocoder("Lyon", new AbortController().signal)).toEqual([4.83, 45.76]);
    expect(fetch.mock.calls[0]![0]).toBe("https://photon.komoot.io/api/?limit=1&q=Lyon");
  });

  it("BAN: encodes the address", async () => {
    const fetch = vi.fn().mockResolvedValue(feature(2.35, 48.85));
    vi.stubGlobal("fetch", fetch);
    expect(await banGeocoder("8 bd du Port, Paris", new AbortController().signal)).toEqual([
      2.35, 48.85,
    ]);
    expect(fetch.mock.calls[0]![0]).toBe(
      "https://api-adresse.data.gouv.fr/search/?limit=1&q=8%20bd%20du%20Port%2C%20Paris",
    );
  });

  it("returns null when nothing is found or the service fails", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(new Response(JSON.stringify({ features: [] }))),
    );
    expect(await photonGeocoder("nowhere", new AbortController().signal)).toBeNull();
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response("", { status: 503 })));
    expect(await photonGeocoder("Lyon", new AbortController().signal)).toBeNull();
  });
});

describe("geocode", () => {
  it("asks once per address, whatever its case and spaces", async () => {
    const geocoder: Geocoder = vi.fn().mockResolvedValue([1, 2]);
    await geocode(geocoder, "Lyon");
    expect(await geocode(geocoder, "  lyon ")).toEqual([1, 2]);
    expect(geocoder).toHaveBeenCalledOnce();
  });

  it("resolves to null when the geocoder throws", async () => {
    const geocoder: Geocoder = vi.fn().mockRejectedValue(new Error("offline"));
    expect(await geocode(geocoder, "Lyon")).toBeNull();
  });
});
