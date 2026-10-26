import type { Page } from "@playwright/test";

/**
 * Serves OpenFreeMap's style as a minimal one (land only, no tiles) and answers the
 * geocoders with one position, so that the tests neither need the network nor depend
 * on a third-party service. The theming of real styles and the geocoders' parsing are
 * covered by the unit tests.
 */
export async function stubMapTiles(page: Page) {
  await page.route("https://tiles.openfreemap.org/**", (route) =>
    route.fulfill({
      contentType: "application/json",
      body: JSON.stringify({
        version: 8,
        sources: {},
        layers: [{ id: "background", type: "background", paint: { "background-color": "#fff" } }],
      }),
    }),
  );
  await page.route(/^https:\/\/(api-adresse\.data\.gouv\.fr|photon\.komoot\.io)\//, (route) =>
    route.fulfill({
      contentType: "application/json",
      body: JSON.stringify({ features: [{ geometry: { coordinates: [4.835, 45.76] } }] }),
    }),
  );
}
