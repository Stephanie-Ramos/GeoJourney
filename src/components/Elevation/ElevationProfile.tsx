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

  return (
    <section className="elevation-profile">
      <h2>Elevation Profile</h2>

      <p>
        Minimum elevation: {Math.round(minimumElevation)} m
      </p>

      <p>
        Maximum elevation: {Math.round(maximumElevation)} m
      </p>
    </section>
  );
}

export default ElevationProfile;