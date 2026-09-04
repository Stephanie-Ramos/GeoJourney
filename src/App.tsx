import JourneyMap from "./components/Map/JourneyMap"
import BeginningSection from "./components/Intro/BeginningSection";

function App() {
  return (
    // Here, we use the main tag to identify the central and unique core content of the webpage
    <main className="app">
      <BeginningSection />
      <JourneyMap />
    </main>
  );
}

export default App

// This application now has two pieces: BeginningSection component and JourneyMap