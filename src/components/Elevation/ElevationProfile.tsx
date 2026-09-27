import { journeyRoute } from "../../data/journeyRoute";

function ElevationProfile() {
  const coordinates = journeyRoute.geometry.coordinates;

  const elevations = coordinates
    .map((coordinate) => coordinate[2])
    .filter(
      (elevation): elevation is number =>
        typeof elevation === "number"
    );

  const minimumElevation = Math.min(...elevations);
  const maximumElevation = Math.max(...elevations);

  const chartWidth = 700;
  const chartHeight = 160;
  const padding = 20;

  const elevationRange =
    maximumElevation - minimumElevation;

  const points = elevations.map((elevation, index) => {
    const x =
      padding +
      (index / (elevations.length - 1)) *
        (chartWidth - padding * 2);

    const y =
      chartHeight -
      padding -
      ((elevation - minimumElevation) /
        elevationRange) *
        (chartHeight - padding * 2);

    return `${x},${y}`;
  });

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
        <polyline
          points={points.join(" ")}
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
        />
      </svg>

      <div className="elevation-profile-labels">
        <span>
          {Math.round(minimumElevation)} m
        </span>

        <span>
          {Math.round(maximumElevation)} m
        </span>
      </div>
    </section>
  );
}

export default ElevationProfile;