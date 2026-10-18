# GeoJourney

An interactive geospatial portfolio experience that visualizes my journey from **Treasure Island Park in Downey, California, to Crystal Lake Recreation Area in the San Gabriel Mountains**.

GeoJourney combines GIS, web mapping, environmental science, remote sensing, and software engineering into an interactive map-based portfolio.

## Project Overview

GeoJourney is designed as more than a traditional portfolio. Instead of presenting projects as a static list, the application uses a real-world route to create an interactive geospatial journey.

As the journey progresses, portfolio projects appear as geographic milestones along the route. A moving journey marker follows the route while an elevation profile dynamically displays the changing terrain.

### Journey

- **Starting Point:** Treasure Island Park, Downey, California
- **Destination:** Crystal Lake Recreation Area, San Gabriel Mountains

The route was generated using **BRouter** and imported into the application as GeoJSON data.

## Current Features

### Interactive Map

- MapLibre GL JS interactive map
- OpenFreeMap Liberty basemap
- Zoom and navigation controls
- Full-screen responsive map layout
- Custom journey and portfolio markers

### Journey Introduction

The application begins with an introductory panel describing the purpose of the journey.

The **Begin the Journey** button:

1. Flies the map to Treasure Island Park.
2. Starts the route animation.
3. Moves the journey marker along the route.
4. Progressively draws the route.

### Real Route Animation

The journey follows a BRouter-generated route rather than a manually drawn line.

The route includes:

- Bike paths
- Shared-use paths
- Streets
- Mountain roads

The route is stored as GeoJSON and converted into TypeScript data used by the application.

### Portfolio Stops

Portfolio projects are represented as interactive stops along the journey.

Current stops include:

- **Treasure Island Park** — starting point
- **Guardrail End Treatments Dashboard** — portfolio project
- **Sedona Lightning Strikes Web App** — portfolio project
- **Crystal Lake Recreation Area** — destination

Portfolio stops can automatically pause the journey when the moving marker reaches them.

### Interactive Project Panels

Selecting a portfolio stop opens a project information panel containing:

- Project title
- Project description
- Technologies used
- Project link, when available
- Continue Journey button

The destination displays a **Journey Complete** state.

### Dynamic Elevation Profile

The application includes an elevation profile based on the elevation values contained in the route data.

The profile currently:

- Calculates cumulative route distance
- Displays minimum and maximum elevation
- Displays total route distance in miles
- Draws the elevation profile using SVG
- Displays a moving position marker
- Updates the marker as the journey progresses
- Calculates the marker's vertical position from route elevation
- Interpolates between elevation points for smoother movement

The elevation marker represents:

- **Horizontal position:** distance traveled
- **Vertical position:** elevation at that point in the journey

## Technology Stack

### Front End

- React
- TypeScript
- Vite
- HTML
- CSS

### Mapping and Geospatial

- MapLibre GL JS
- OpenFreeMap
- BRouter
- GeoJSON
- SVG elevation visualization

### Development

- Node.js
- Git
- GitHub
- VS Code

## Project Structure

```text
geojourney/
├── src/
│   ├── components/
│   │   ├── Elevation/
│   │   │   └── ElevationProfile.tsx
│   │   ├── Intro/
│   │   │   └── BeginningSection.tsx
│   │   └── Map/
│   │       └── JourneyMap.tsx
│   ├── data/
│   │   ├── brouter-route.geojson
│   │   ├── journeyRoute.ts
│   │   └── journeyStops.ts
│   ├── types/
│   │   └── journey.ts
│   ├── App.tsx
│   └── index.css
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## Geospatial Data

The journey route was generated using BRouter and exported as GeoJSON. The route data is stored in `src/data/brouter-route.geojson` and converted into application-ready TypeScript data in `src/data/journeyRoute.ts`.

The route coordinates use the following structure:

```text
[longitude, latitude, elevation]
```

The application uses the route geometry and elevation values for:

- Route rendering
- Journey animation
- Cumulative distance calculations
- Elevation calculations
- Elevation profile visualization

### Key Coordinates

**Starting point — Treasure Island Park**

```text
[-118.1376, 33.9564]
```

**Approximate destination**

```text
[-117.83, 34.322]
```

**BRouter route endpoint**

```text
[-117.830431, 34.321845]
```

The approximate destination coordinates and the generated route endpoint differ slightly. The route endpoint represents the end of the generated route geometry.

## Data Sources and Methodology

This section documents the sources, processing workflow, and limitations of the geospatial data used in GeoJourney.

### Route Geometry and Routing

BRouter was used to generate the route between the starting point and destination. The route was exported as GeoJSON and incorporated into the application.

- **Routing service:** [BRouter](https://brouter.de/brouter-web/)
- **Original route file:** `src/data/brouter-route.geojson`
- **Application route data:** `src/data/journeyRoute.ts`
- **Route geometry:** GeoJSON LineString
- **Coordinate structure:** Longitude, latitude, and elevation, where elevation is present

The route geometry supplies the coordinates used to progressively draw the route and move the journey marker. It also provides the spatial reference for the elevation profile.

The generated route is approximately **73.1 km (45.4 miles)** long, with approximately **1,944 m (6,378 ft) of ascent** according to the route metadata previously recorded during development. These figures should be verified against the current route file and its generation settings before being treated as final published statistics.

### Basemap and Mapping Technology

GeoJourney uses the OpenFreeMap Liberty style to display the interactive basemap. MapLibre GL JS renders the map and provides the client-side mapping functionality.

- **Basemap style and tile service:** [OpenFreeMap](https://openfreemap.org/)
- **Style URL:** `https://tiles.openfreemap.org/styles/liberty`
- **Mapping library:** [MapLibre GL JS](https://maplibre.org/)
- **Route format:** GeoJSON
- **Route visualization:** MapLibre line layer

MapLibre is the mapping technology used to render and interact with the map; it is not the original source of the route geometry.

### Elevation Profile

The elevation profile uses elevation values associated with the route coordinates. The application calculates cumulative distance along the route and uses the route's elevation values to display the terrain profile.

As the journey progresses, the application updates a marker along the elevation profile to represent the journey's current position.

Elevation values and ascent statistics are estimates associated with the generated route data. They should not be interpreted as independently surveyed measurements. The underlying elevation-data provider and any elevation processing applied by the routing service should be confirmed when available.

### Data Processing Workflow

The geospatial data workflow is:

1. Generate the route using BRouter.
2. Export the route geometry as GeoJSON.
3. Store the original route in `src/data/brouter-route.geojson`.
4. Convert the route into application-ready TypeScript data in `src/data/journeyRoute.ts`.
5. Load the route into MapLibre GL JS for progressive route rendering and marker animation.
6. Use the route coordinates to calculate cumulative distance and render the elevation profile.

This workflow separates the source route data from the application logic that visualizes it.

### Data Limitations

The route is a generated visualization connecting the portfolio's starting point and destination. It includes a mixture of paths, streets, and mountain roads.

The route should not be interpreted as a verified, safe, or currently accessible cycling route. Road conditions, path access, closures, surface types, and route suitability have not necessarily been independently verified.

Portfolio stops represent milestones in the developer's project journey rather than the physical locations of the featured projects.

### Attribution, Licensing, and Reproducibility

The project should retain appropriate attribution and comply with the applicable licensing terms for the routing service, underlying geographic data, basemap, and any elevation datasets.

For reproducibility, document the following details as they are verified:

- Date the route was generated or downloaded
- BRouter routing profile and relevant configuration
- Original route export format
- Data conversion and processing steps
- Underlying road-network and elevation-data sources, where available
- Applicable attribution and licensing requirements

The exact date, routing profile, and underlying elevation-data provider have not yet been confirmed in this README and should not be inferred.

## Application Architecture

The application uses React state and callbacks to connect the map, journey animation, project panels, and elevation profile.

The data flow is:

```text
BRouter GeoJSON
       |
       v
journeyRoute.ts
       |
       +----------------+
       v                v
  JourneyMap     ElevationProfile
       |                ^
       |                |
       v                |
 Route Animation ----> Progress
       |
       v
 Portfolio Stops
       |
       v
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

- Built the initial GeoJourney map foundation
- Connected the journey button to map navigation
- Added route animation

### Portfolio Journey

- Added interactive project panels
- Added portfolio stop detection
- Added journey pause/resume functionality
- Added destination completion state
- Added custom journey markers
- Added the Sedona portfolio stop

### Routing

- Replaced an estimated route with a BRouter-generated route
- Adjusted route animation speed
- Added route-proximity detection for portfolio stops
- Added route-proximity detection for the destination
- Prevented repeated stop detection

### Elevation Profile

- Added the elevation profile component
- Added distance-based elevation visualization
- Added elevation scale labels
- Connected the profile to journey progress
- Added a moving journey-position marker
- Connected the marker to route elevation values
- Added elevation interpolation for smoother marker movement

### Performance

- Split MapLibre into a separate JavaScript bundle
- Lazy-loaded the journey map component
- Added a loading fallback while the journey map component loads

## Development

### Prerequisites

- Node.js
- npm
- Git

### Installation

Clone the repository and navigate to the project directory:

```bash
git clone <https://github.com/Stephanie-Ramos/GeoJourney>
cd geojourney
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local development URL provided by Vite.

### Production Build

Run the TypeScript checks and create a production build:

```bash
npm run build
```

The production files are generated in the `dist/` directory.

## Current Development Status

GeoJourney currently includes:

- Interactive MapLibre map
- BRouter-generated route
- Animated journey marker
- Progressive route drawing
- Interactive portfolio stops
- Automatic journey pauses
- Resume journey functionality
- Destination completion state
- Dynamic elevation profile
- Cumulative distance visualization
- Moving elevation position marker
- Interpolated elevation marker movement
- Lazy-loaded journey map component
- Code splitting for MapLibre

The next development phase focuses on improving camera transitions, animation consistency, accessibility, geospatial data validation, and the overall portfolio presentation.

## Project Goals

GeoJourney is being developed as a portfolio project demonstrating the intersection of:

**GIS + Geospatial Data + Web Mapping + Software Engineering + Environmental Science**

The project is intended to demonstrate practical experience with:

- Geospatial data structures
- GeoJSON
- Route data and visualization
- Spatial relationships
- Map-based interfaces
- Interactive data visualization
- React component architecture
- TypeScript
- State management
- Asynchronous animation
- Responsive UI
- Accessible interaction patterns
- Geospatial data provenance and documentation
- Front-end performance optimization
