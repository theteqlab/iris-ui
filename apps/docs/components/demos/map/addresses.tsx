"use client";

import { Map, MapMarker, banGeocoder } from "@irisui/ui/map";
import { workerUrl } from "./worker";

const venues = [
  { label: "Opéra de Lyon", address: "1 place de la Comédie, 69001 Lyon" },
  { label: "Halles Paul Bocuse", address: "102 cours Lafayette, 69003 Lyon" },
  { label: "Musée des Confluences", address: "86 quai Perrache, 69002 Lyon" },
];

export default function MapAddresses() {
  return (
    // French addresses: the Base Adresse Nationale finds them. The map fits the pins.
    <Map
      aria-label="Venues in Lyon"
      geocoder={banGeocoder}
      workerUrl={workerUrl}
      className="h-96 w-full"
    >
      {venues.map((venue, i) => (
        <MapMarker
          key={venue.label}
          address={venue.address}
          label={venue.label}
          tone={((i % 5) + 1) as 1 | 2 | 3}
        >
          <strong>{venue.label}</strong>
          <p className="m-0 text-sm text-text-muted">{venue.address}</p>
        </MapMarker>
      ))}
    </Map>
  );
}
