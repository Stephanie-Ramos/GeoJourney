import { LngLatBounds, type Map } from "maplibre-gl";

import { journeyStops } from "../data/journeyStops";
import { journeyRoute } from "../data/journeyRoute";

// Zooms and pans the map so every stop and the whole route line are visible.
export function fitAllStops(map: Map) {
  const bounds = new LngLatBounds();

  // Include every stop
  journeyStops.forEach((stop) => {
    bounds.extend(stop.coordinates);
  });

  // Include the full route so no part of the line gets cut off
  (journeyRoute.geometry.coordinates as [number, number][]).forEach(
    (coordinate) => {
      bounds.extend(coordinate);
    }
  );

  // Make sure MapLibre has measured its current container size
  map.resize();

  map.fitBounds(bounds, {
    padding: 60,
    duration: 2000,
    maxZoom: 12,
  });
}