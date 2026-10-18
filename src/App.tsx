import { lazy, Suspense, useState, useCallback } from "react";
import { Map } from "maplibre-gl";

import BeginningSection from "./components/Intro/BeginningSection";
import type { JourneyStop } from "./types/journey";
import "./index.css";
import ElevationProfile from "./components/Elevation/ElevationProfile";

const JourneyMap = lazy(
  () => import("./components/Map/JourneyMap")
);

function App() {
  // A function that updates map 
  const [map, setMap] = useState<Map | null>(null);
  // when the user clicks the button then it tells JourneyMap to start the animation
  const [journeyStarted, setJourneyStarted] = useState(false);

  const [resumeJourney, setResumeJourney] = useState(0);

  const [progress, setProgress] = useState(0);

  const [selectedStop, setSelectedStop] = useState<JourneyStop | null>(null); 

  const [showAbout, setShowAbout] = useState(false);

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
      <BeginningSection
        map={map}
        onBeginJourney={() => setJourneyStarted(true)}
        onOpenAbout={() => setShowAbout(true)}
      />
      
      <Suspense
        fallback={<div className="map-loading">Loading map...</div>}
      >
        <JourneyMap
          onMapReady={setMap}
          journeyStarted={journeyStarted}
          resumeJourney={resumeJourney}
          onStopSelect={handleStopSelect}
          onProgressChange={setProgress}
        />
      </Suspense>

      <ElevationProfile progress={progress} />

      {showAbout && (
        <aside className="project-panel" role="dialog" aria-label="About this journey">
          <button
            className="project-panel-close"
            onClick={() => setShowAbout(false)}
            aria-label="Close about panel"
          >
            x
          </button>
          <p className="project-panel-label">ABOUT THIS JOURNEY</p>
          <h2>The Route</h2>
          <p>
            I’ve never owned a car, and for a long time that kept the outdoors
            just out of reach. So I mapped my own way there: a bike path from
            Treasure Island Park to the San Gabriel Mountains. This portfolio
            follows that route. Every stop is a milestone in my work, not a
            place on the ground, and together they show what it looks like to
            get somewhere the long way and make it anyway.
          </p>

          <p>
            The route begins at Treasure Island Park and ends at a campground
            in the San Gabriel Mountains. It stands for my career. The early
            miles are flat and steady, but the closer I get to the mountains,
            the steeper the climb becomes, just as the projects I take on grow
            more challenging the further I go. The campground is where the
            effort pays off.
          </p>

          <h3>A note on the map</h3>
          <p>
            The stops along this route aren’t real places. Each one is a
            milestone, a completed project and the skills I picked up along the
            way. The path is the story; the stops are the proof of progress.
          </p>

          <h3>About me</h3>
          <p>
            I work at the intersection of environmental studies, geography,
            remote sensing, and software engineering. I’m drawn to the ways we
            can read the land from above and build tools that help people
            understand it. This portfolio is one of those tools: a map that
            turns my work into a journey.
          </p>

          <div className="about-panel-actions">
            <a href="YOUR_RESUME_URL" target="_blank" rel="noopener noreferrer">
              View Resume
            </a>
            <a href="YOUR_LINKEDIN_URL" target="_blank" rel="noopener noreferrer">
              Connect on LinkedIn
            </a>
          </div>
        </aside>
      )}

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
      
    </main>
  );
}

export default App

// This application now has two pieces: BeginningSection component and JourneyMap