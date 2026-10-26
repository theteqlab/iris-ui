"use client";

import { Map, MapMarker } from "@irisui/ui/map";
import { workerUrl } from "./worker";

export default function MapDemo() {
  return (
    <Map aria-label="Our shops in Lyon" workerUrl={workerUrl} className="h-96 w-full">
      <MapMarker lngLat={[4.8317, 45.7743]} label="Croix-Rousse workshop">
        <strong>Croix-Rousse workshop</strong>
        <p className="m-0 text-sm text-text-muted">Open 9 am to 7 pm.</p>
      </MapMarker>
      <MapMarker lngLat={[4.8322, 45.7578]} label="Bellecour shop" tone={2}>
        <strong>Bellecour shop</strong>
        <p className="m-0 text-sm text-text-muted">Open every day.</p>
      </MapMarker>
      <MapMarker lngLat={[4.8346, 45.7275]} label="Gerland warehouse" tone="ink" />
    </Map>
  );
}
