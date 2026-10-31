import { journeyRoute } from "../data/journeyRoute";

export interface RouteStats {
  fraction: number;                 // 0 to 1, share of the route completed
  milesTraveled: number;
  totalMiles: number;
  elevationMeters: number | null;   // null if the route has no elevation data
}

const coordinates = journeyRoute.geometry.coordinates as number[][];

const EARTH_RADIUS_MILES = 3958.8;

// Great-circle distance between two [lng, lat] points, in miles
function haversineMiles(a: number[], b: number[]): number {
  const toRad = (degrees: number) => (degrees * Math.PI) / 180;

  const dLat = toRad(b[1] - a[1]);
  const dLng = toRad(b[0] - a[0]);

  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(a[1])) * Math.cos(toRad(b[1])) * Math.sin(dLng / 2) ** 2;

  return 2 * EARTH_RADIUS_MILES * Math.asin(Math.sqrt(h));
}

// cumulativeMiles[i] = distance from the start to route vertex i
const cumulativeMiles: number[] = [0];

for (let i = 1; i < coordinates.length; i++) {
  cumulativeMiles.push(
    cumulativeMiles[i - 1] + haversineMiles(coordinates[i - 1], coordinates[i])
  );
}

export const totalRouteMiles = cumulativeMiles[cumulativeMiles.length - 1];

/**
 * @param segmentIndex    index of the route vertex the marker just left
 * @param segmentProgress 0 to 1, how far along the current segment it is
 */
export function getRouteStats(
  segmentIndex: number,
  segmentProgress: number
): RouteStats {
  const lastIndex = coordinates.length - 1;
  const i = Math.min(Math.max(segmentIndex, 0), lastIndex - 1);
  const t = Math.min(Math.max(segmentProgress, 0), 1);

  const milesTraveled =
    cumulativeMiles[i] + (cumulativeMiles[i + 1] - cumulativeMiles[i]) * t;

  const startElevation = coordinates[i][2];
  const endElevation = coordinates[i + 1][2];

  const elevationMeters =
    typeof startElevation === "number" && typeof endElevation === "number"
      ? startElevation + (endElevation - startElevation) * t
      : null;

  return {
    fraction: totalRouteMiles > 0 ? milesTraveled / totalRouteMiles : 0,
    milesTraveled,
    totalMiles: totalRouteMiles,
    elevationMeters,
  };
}

// Stats shown before the journey begins
export const initialRouteStats: RouteStats = getRouteStats(0, 0);