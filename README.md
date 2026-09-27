# GeoJourney

An interactive geospatial portfolio experience that visualizes my journey from **Treasure Island Park in Downey, California, to Crystal Lake Recreation Area in the San Gabriel Mountains**.

GeoJourney combines GIS, web mapping, environmental science, remote sensing, and software engineering into an interactive map-based portfolio.

## Project Overview

GeoJourney is designed as more than a traditional portfolio. Instead of presenting projects as a static list, the application uses a real-world route to create an interactive geospatial journey.

As the journey progresses, portfolio projects appear as geographic milestones along the route. A moving journey marker follows the route while an elevation profile dynamically displays the changing terrain.

### Journey

**Starting Point:** Treasure Island Park, Downey, California
**Destination:** Crystal Lake Recreation Area, San Gabriel Mountains

The route was generated using **BRouter** and imported into the application as GeoJSON data.

## Current Features

### Interactive Map

* MapLibre GL JS interactive map
* OpenFreeMap Liberty basemap
* Zoom and navigation controls
* Full-screen responsive map layout
* Custom journey and portfolio markers

### Journey Introduction

The application begins with an introductory panel describing the purpose of the journey.

The **Begin the Journey** button:

1. Flies the map to Treasure Island Park
2. Starts the route animation
3. Moves the journey marker along the route
4. Progressively draws the route

### Real Route Animation

The journey follows a real BRouter-generated route rather than a manually drawn line.

The route includes:

* Bike paths
* Shared-use paths
* Streets
* Mountain roads

The route is stored as GeoJSON and converted into TypeScript data used by the application.

### Portfolio Stops

Portfolio projects are represented as interactive stops along the journey.

Current stops include:

* **Treasure Island Park** — starting point
* **Guardrail End Treatments Dashboard** — portfolio project
* **Sedona Lightning Strikes Web App** — portfolio project
* **Crystal Lake Recreation Area** — destination

Portfolio stops can automatically pause the journey when the moving marker reaches them.

### Interactive Project Panels

Selecting a portfolio stop opens a project information panel containing:

* Project title
* Project name
* Description
* Technologies used
* Project link when available
* Continue Journey button

The destination displays a **Journey Complete** state.

### Dynamic Elevation Profile

The application includes an elevation profile based on the elevation values contained in the BRouter route.

The profile currently:

* Calculates cumulative route distance
* Displays minimum and maximum elevation
* Displays total route distance in miles
* Draws the elevation profile using SVG
* Displays a moving position marker
* Updates the marker as the journey progresses
* Calculates the marker's vertical position from the actual route elevation
* Interpolates between elevation points for smoother movement

The elevation marker therefore represents both:

**Horizontal position → distance traveled**

**Vertical position → elevation at that point in the journey**

## Technology Stack

### Front End

* React
* TypeScript
* Vite
* HTML
* CSS

### Mapping & Geospatial

* MapLibre GL JS
* OpenFreeMap
* BRouter
* GeoJSON
* SVG elevation visualization

### Development

* Node.js
* Git
* GitHub
* VS Code

## Project Structure

```text
geojourney/
├── src/
│   ├── components/
│   │   ├── Elevation/
│   │   │   └── ElevationProfile.tsx
│   │   │
│   │   ├── Intro/
│   │   │   └── BeginningSection.tsx
│   │   │
│   │   └── Map/
│   │       └── JourneyMap.tsx
│   │
│   ├── data/
│   │   ├── brouter-route.geojson
│   │   ├── journeyRoute.ts
│   │   └── journeyStops.ts
│   │
│   ├── types/
│   │   └── journey.ts
│   │
│   ├── App.tsx
│   └── index.css
│
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## Geospatial Data

The journey route is generated using BRouter and stored as GeoJSON.

The route contains coordinate information in the form:

```text
[longitude, latitude, elevation]
```

This allows the application to use the same dataset for multiple geospatial visualizations:

* Route mapping
* Journey animation
* Distance calculations
* Elevation calculations
* Elevation profile visualization

The starting point is:

```text
[-118.1376, 33.9564]
```

The destination is approximately:

```text
[-117.83, 34.322]
```

The actual BRouter endpoint is:

```text
[-117.830431, 34.321845]
```

## Application Architecture

The application uses React state and callbacks to connect the map, journey animation, project panels, and elevation profile.

The current data flow is:

```text
BRouter GeoJSON
       │
       ▼
journeyRoute.ts
       │
       ├───────────────┐
       ▼               ▼
 JourneyMap      ElevationProfile
       │               ▲
       │               │
       ▼               │
 Route Animation ──► Progress
       │
       ▼
 Portfolio Stops
       │
       ▼
 Project Panel
```

The journey animation calculates an overall route progress value between `0` and `1`.

That value is passed from `JourneyMap` to `App.tsx`, which then passes it to `ElevationProfile`.

```tsx
<JourneyMap
  onMapReady={setMap}
  journeyStarted={journeyStarted}
  resumeJourney={resumeJourney}
  onStopSelect={handleStopSelect}
  onProgressChange={setProgress}
/>

<ElevationProfile progress={progress} />
```

## Completed Development Milestones

The project has been developed incrementally through small, testable features.

### Map Foundation

* Built the initial GeoJourney map foundation
* Connected the journey button to map navigation
* Added smooth route animation

### Portfolio Journey

* Added interactive project panels
* Added portfolio stop detection
* Added journey pause/resume functionality
* Added destination completion state
* Added custom journey markers
* Added the Sedona portfolio stop

### Routing

* Replaced an estimated route with a BRouter-generated route
* Improved route animation speed
* Added route-proximity detection for portfolio stops
* Added route-proximity detection for the destination
* Prevented repeated stop detection

### Elevation Profile

* Added the elevation profile component
* Added distance-based elevation visualization
* Added elevation scale labels
* Connected the profile to journey progress
* Added a moving journey-position marker
* Connected the marker to actual route elevation
* Added elevation interpolation for smoother marker movement

## Development

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Run the application locally and open the development URL provided by Vite.

## Current Development Status

GeoJourney currently has a functional:

* Interactive MapLibre map
* Real BRouter route
* Animated journey marker
* Progressive route drawing
* Interactive portfolio stops
* Automatic journey pauses
* Resume journey functionality
* Destination completion state
* Dynamic elevation profile
* Distance-based elevation visualization
* Moving elevation position marker
* Interpolated elevation marker movement

The next development phase will focus on continuing to improve the visualization, interaction, accessibility, and portfolio presentation of the application.

## Project Goals

GeoJourney is being developed as a portfolio project demonstrating the intersection of:

**GIS + Geospatial Data + Web Mapping + Software Engineering + Environmental Science**

The project is intended to demonstrate practical experience with:

* Geospatial data structures
* GeoJSON
* Route data
* Spatial relationships
* Map-based interfaces
* Interactive data visualization
* React component architecture
* TypeScript
* State management
* Asynchronous animation
* Responsive UI
* Accessible interaction patterns