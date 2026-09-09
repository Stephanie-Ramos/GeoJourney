import { useState } from "react";
import { Map } from "maplibre-gl";

import JourneyMap from "./components/Map/JourneyMap";
import BeginningSection from "./components/Intro/BeginningSection";

function App() {
  // A function that updates map 
  const [map, setMap] = useState<Map | null>(null);
  // when the user clicks the button then it tells JourneyMap to start the animation
  const [journeyStarted, setJourneyStarted] = useState(false);


  return (
    // Here, we use the main tag to identify the central and unique core content of the webpage
    <main className="app">
      {/* BeginningSection doesnt have a map property */}
      <BeginningSection map={map} onBeginJourney={() => setJourneyStarted(true)}/>
      <JourneyMap onMapReady={setMap} journeyStarted={journeyStarted}/>
    </main>
  );
}

export default App

// This application now has two pieces: BeginningSection component and JourneyMap