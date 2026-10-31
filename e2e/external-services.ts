import type { Page } from "@playwright/test";

/**
 * Third-party services, answered locally so that the tests neither need the network nor
 * depend on them: flagcdn's flags, OpenFreeMap's style and the geocoders.
 *
 * Serves OpenFreeMap's style as a minimal one (land only, no tiles) and answers the
 * geocoders with one position, so that the tests neither need the network nor depend
 * on a third-party service. The theming of real styles and the geocoders' parsing are
 * covered by the unit tests.
 */
/** A three-band flag for every code. */
async function stubFlags(page: Page) {
  await page.route("https://flagcdn.com/**", (route) =>
    route.fulfill({
      contentType: "image/svg+xml",
      body: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3 2"><path fill="#0055a4" d="M0 0h1v2H0z"/><path fill="#fff" d="M1 0h1v2H1z"/><path fill="#ef4135" d="M2 0h1v2H2z"/></svg>',
    }),
  );
}

export async function stubExternalServices(page: Page) {
  await stubFlags(page);
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
