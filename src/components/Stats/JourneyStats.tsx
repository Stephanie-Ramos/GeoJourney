import type { RouteStats } from "../../utils/routeStats";

interface JourneyStatsProps {
  stats: RouteStats;
}

function JourneyStats({ stats }: JourneyStatsProps) {
  const percent = Math.round(stats.fraction * 100);

  return (
    <section className="journey-stats" aria-label="Journey progress">
      <div className="journey-stat">
        <span className="journey-stat-label">Distance</span>
        <strong>
          {stats.milesTraveled.toFixed(1)} / {stats.totalMiles.toFixed(1)} mi
        </strong>
      </div>

      <div className="journey-stat">
        <span className="journey-stat-label">Completed</span>
        <strong>{percent}%</strong>
      </div>

      <div className="journey-stat">
        <span className="journey-stat-label">Elevation</span>
        <strong>
          {stats.elevationMeters === null
            ? "N/A"
            : `${Math.round(stats.elevationMeters)} m`}
        </strong>
      </div>
    </section>
  );
}

export default JourneyStats;