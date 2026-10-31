import { lazy, Suspense, useState, useCallback } from "react";
import { Map } from "maplibre-gl";

import BeginningSection from "./components/Intro/BeginningSection";
import type { JourneyStop } from "./types/journey";
import "./index.css";
import AboutPanel from "./components/About/AboutPanel";
import JourneyStats from "./components/Stats/JourneyStats.tsx";
import { initialRouteStats, type RouteStats } from "./utils/routeStats.ts"

const JourneyMap = lazy(
  () => import("./components/Map/JourneyMap")
);

function App() {
  // A function that updates map
  const [map, setMap] = useState<Map | null>(null);

  // when the user clicks the button then it tells JourneyMap to start the animation
  const [journeyStarted, setJourneyStarted] = useState(false);

  const [resumeJourney, setResumeJourney] = useState(0);

  // Miles traveled, percent complete, and elevation for the stats bar
  const [stats, setStats] = useState<RouteStats>(initialRouteStats);

  const [selectedStop, setSelectedStop] = useState<JourneyStop | null>(null);

  const [showAbout, setShowAbout] = useState(false);

  const handleStopSelect = useCallback(
    (stop: JourneyStop) => {
      console.log("Selected stop:", stop);
      setShowAbout(false);
      setSelectedStop(stop);
    },
    []
  );

  return (
    // Here, we use the main tag to identify the central and unique core content of the webpage
    <main className="app">
      <BeginningSection
        map={map}
        onBeginJourney={() => setJourneyStarted(true)}
        onOpenAbout={() => {
          setSelectedStop(null);
          setShowAbout(true);
        }}
      />

      <div className="main-column">
        <div className="map-section">
          <Suspense fallback={<div className="map-loading">Loading map...</div>}>
            <JourneyMap
              onMapReady={setMap}
              journeyStarted={journeyStarted}
              resumeJourney={resumeJourney}
              onStopSelect={handleStopSelect}
              onProgressChange={setStats}
            />
          </Suspense>

          {showAbout && <AboutPanel onClose={() => setShowAbout(false)} />}

          {selectedStop && (
            <aside className="project-panel">
              <button
                className="project-panel-close"
                onClick={() => setSelectedStop(null)}
                aria-label="Close project panel"
              >
                x
              </button>
              <p className="project-panel-label">
                {selectedStop.type === "destination"
                  ? "JOURNEY COMPLETE"
                  : "PORTFOLIO PROJECT"}
              </p>
              <h2>{selectedStop.title}</h2>
              <h3>{selectedStop.name}</h3>
              <p className="project-panel-description">
                {selectedStop.description}
              </p>
              {selectedStop.projects && selectedStop.projects.length > 0 && (
                <ul className="stop-project-list">
                  {selectedStop.projects.map((project) => (
                    <li key={project.name} className="stop-project">
                      <h4>{project.name}</h4>

                      {project.description && <p>{project.description}</p>}

                      {project.technology && project.technology.length > 0 && (
                        <div className="technology-list">
                          {project.technology.map((technology) => (
                            <span key={technology} className="technology-tag">
                              {technology}
                            </span>
                          ))}
                        </div>
                      )}

                      {project.files && project.files.length > 0 && (
                        <div className="project-file-buttons">
                          {project.files.map((file) => (
                            <a
                              key={file.url}
                              href={file.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="project-file-button"
                            >
                              {file.label}
                            </a>
                          ))}
                        </div>
                      )}

                      {project.projectUrl && (
                        <a
                          href={project.projectUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="project-panel-link"
                        >
                          View Project
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              )}
              {selectedStop.technology &&
                selectedStop.technology.length > 0 && (
                  <div className="project-technologies">
                    <p className="technology-label">
                      TECHNOLOGIES
                    </p>

                    <div className="technology-list">
                      {selectedStop.technology.map(
                        (technology) => (
                          <span
                            key={technology}
                            className="technology-tag"
                          >
                            {technology}
                          </span>
                        )
                      )}
                    </div>
                  </div>
                )}

              {selectedStop.projectUrl && (
                <a
                  href={selectedStop.projectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-panel-link"
                >
                  View Project
                </a>
              )}
              {selectedStop.type !== "destination" && (
                <button
                  className="continue-journey-button"
                  onClick={() => {
                    setSelectedStop(null);
                    setResumeJourney((value) => value + 1);
                  }}
                >
                  Continue Journey
                </button>
              )}
            </aside>
          )}
        </div>

        <JourneyStats stats={stats} />
      </div>
    </main>
  );
}

export default App;
