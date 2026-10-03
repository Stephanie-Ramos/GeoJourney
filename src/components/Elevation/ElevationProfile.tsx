import { journeyRoute } from "../../data/journeyRoute";

interface ElevationProfileProps {
  progress: number;
}

function calculateDistance(
  start: [number, number],
  end: [number, number]

) {
  const earthRadius = 6371000;

  const lat1 = (start[1] * Math.PI) / 180;
  const lat2 = (end[1] * Math.PI) / 180;

  const deltaLat =
    ((end[1] - start[1]) * Math.PI) / 180;

  const deltaLon =
    ((end[0] - start[0]) * Math.PI) / 180;

  const a =
    Math.sin(deltaLat / 2) ** 2 +
    Math.cos(lat1) *
      Math.cos(lat2) *
      Math.sin(deltaLon / 2) ** 2;

  const c =
    2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return earthRadius * c;
}

function ElevationProfile({
  progress,
}: ElevationProfileProps) {
  const coordinates = journeyRoute.geometry.coordinates;

  const routePoints = coordinates
    .filter(
      (coordinate): coordinate is [number, number, number] =>
        coordinate.length >= 3 &&
        typeof coordinate[2] === "number"
    );
  
  const distances = [0];

  for (let i = 1; i < routePoints.length; i++) {
    const previous = routePoints[i - 1];
    const current = routePoints[i];

    const segmentDistance = calculateDistance(
      [previous[0], previous[1]],
      [current[0], current[1]]
    );

    distances.push(
      distances[i - 1] + segmentDistance
    );
  }

  const elevations = routePoints.map(
    (coordinate) => coordinate[2]
  );

  const minimumElevation = Math.min(...elevations);
  const maximumElevation = Math.max(...elevations);

  const totalDistance =
    distances[distances.length - 1];
  
  const currentDistance = totalDistance * progress;

  const chartWidth = 700;
  const chartHeight = 160;
  const padding = 20;

  const elevationRange =
    maximumElevation - minimumElevation;

  const points = elevations.map((elevation, index) => {
    const x =
      padding +
      (distances[index] / totalDistance) *
        (chartWidth - padding * 2);

    const y =
      chartHeight -
      padding -
      ((elevation - minimumElevation) /
        elevationRange) *
        (chartHeight - padding * 2);

    return `${x},${y}`;
  });

  const currentX =
  padding +
  (currentDistance / totalDistance) *
    (chartWidth - padding * 2);
  
  const currentElevationIndex = distances.findIndex(
    (distance) => distance >= currentDistance
  );

  const currentIndex =
    currentElevationIndex === -1
      ? distances.length - 1
      : currentElevationIndex;

  const previousIndex =
    currentIndex === 0
      ? 0
      : currentIndex - 1;

  const previousDistance =
    distances[previousIndex];

  const currentPointDistance =
    distances[currentIndex];

  const distanceRange =
    currentPointDistance - previousDistance;

  const elevationProgress =
    distanceRange === 0
      ? 0
      : (currentDistance - previousDistance) /
        distanceRange;

  const currentElevation =
    elevations[previousIndex] +
    (elevations[currentIndex] -
      elevations[previousIndex]) *
      elevationProgress;

  const currentY =
    chartHeight -
    padding -
    ((currentElevation - minimumElevation) /
      elevationRange) *
      (chartHeight - padding * 2);

  return (
    <section className="elevation-profile">
      <h2>Elevation Profile</h2>

      <svg
        viewBox={`0 0 ${chartWidth} ${chartHeight}`}
        width="100%"
        height="160"
        role="img"
        aria-label="Elevation profile of the journey route"
      >
        <text
          x="0"
          y="20"
          fontSize="12"
        >
          {Math.round(maximumElevation)} m
        </text>

        <text
          x="0"
          y={chartHeight - 5}
          fontSize="12"
        >
          {Math.round(minimumElevation)} m
        </text>

        <polyline
          points={points.join(" ")}
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          opacity="0.25"
        />

        <polyline
          points={points
            .filter((_, index) => distances[index] <= currentDistance)
            .map((point) => point)
            .join(" ")}
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
        />

        <circle
          cx={currentX}
          cy={currentY}
          r="6"
          fill="currentColor"
        />        
      </svg>

      <div className="elevation-profile-labels">
        <span>
          0 mi
        </span>

        <span>
          {(totalDistance / 1609.34).toFixed(1)} mi
        </span>
      </div>
    </section>
  );
}

export default ElevationProfile;