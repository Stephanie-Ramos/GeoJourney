import { useState, useCallback } from "react";
import { Map } from "maplibre-gl";

import JourneyMap from "./components/Map/JourneyMap";
import BeginningSection from "./components/Intro/BeginningSection";
import type { JourneyStop } from "./types/journey";

function App() {
  // A function that updates map 
  const [map, setMap] = useState<Map | null>(null);
  // when the user clicks the button then it tells JourneyMap to start the animation
  const [journeyStarted, setJourneyStarted] = useState(false);

  const [resumeJourney, setResumeJourney] = useState(0);

  const [selectedStop, setSelectedStop] = useState<JourneyStop | null>(null); 

  const handleStopSelect = useCallback(
  (stop: JourneyStop) => {
    console.log("Selected stop:", stop);
    setSelectedStop(stop);
  },
  []
);


  return (
    // Here, we use the main tag to identify the central and unique core content of the webpage
    <main className="app">
      {/* BeginningSection doesnt have a map property */}
      <BeginningSection map={map} onBeginJourney={() => setJourneyStarted(true)}/>
      <JourneyMap onMapReady={setMap} journeyStarted={journeyStarted} resumeJourney={resumeJourney} onStopSelect={handleStopSelect}/>
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
            PORTFOLIO PROJECT
          </p>
          <h2>{selectedStop.title}</h2>
          <h3>{selectedStop.name}</h3>
          <p className="project-panel-description">
            {selectedStop.description}
          </p>
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
          <button
            className="continue-journey-button"
            onClick={() => {
              setSelectedStop(null);
              setResumeJourney((value) => value + 1);
            }}
          >
            Continue Journey
          </button>
        </aside>
      )}
    </main>
  );
}

export default App

// This application now has two pieces: BeginningSection component and JourneyMap