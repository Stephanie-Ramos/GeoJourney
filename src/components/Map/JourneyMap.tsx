import { useEffect, useRef, useCallback } from "react";
import {
  Map,
  Marker,
  NavigationControl,
  setWorkerUrl,
  type GeoJSONSource,
} from "maplibre-gl";

import workerUrl from "maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url";
import "maplibre-gl/dist/maplibre-gl.css";

import { journeyStops } from "../../data/journeyStops";
import { journeyRoute } from "../../data/journeyRoute";
import type { JourneyStop } from "../../types/journey";
import { fitAllStops } from "../../utils/mapView";

setWorkerUrl(workerUrl);

const routeCoordinates = journeyRoute.geometry.coordinates as [number, number][];

// Finds the route vertex closest to a stop's coordinates
function nearestRouteIndex(target: [number, number]): number {
  let bestIndex = 0;
  let bestDistance = Infinity;

  routeCoordinates.forEach(([lng, lat], index) => {
    const distance = (lng - target[0]) ** 2 + (lat - target[1]) ** 2;
    if (distance < bestDistance) {
      bestDistance = distance;
      bestIndex = index;
    }
  });

  return bestIndex;
}

// Portfolio and destination stops, in the order the route reaches them
const routeStops = journeyStops
  .filter((stop) => stop.type === "portfolio" || stop.type === "destination")
  .map((stop) => ({ stop, index: nearestRouteIndex(stop.coordinates) }))
  .sort((a, b) => a.index - b.index);

// Each stop's marker position, snapped onto the route line
// (a plain object, because `Map` in this file is MapLibre's Map)
const snappedCoordinates: Record<string, [number, number]> = Object.fromEntries(
  routeStops.map(({ stop, index }) => [stop.id, routeCoordinates[index]])
);

interface JourneyMapProps {
  onMapReady: (map: Map) => void;
  journeyStarted: boolean;
  resumeJourney: number;
  onStopSelect: (stop: JourneyStop) => void;
  onProgressChange: (progress: number) => void;
}

function JourneyMap({
  onMapReady,
  journeyStarted,
  resumeJourney,
  onStopSelect,
  onProgressChange,
}: JourneyMapProps) {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<Map | null>(null);

  // Tracks whether the route animation has already started
  const animationStartedRef = useRef(false);

  // Tracks whether the route source and layer are ready
  const routeReadyRef = useRef(false);

  // Keeps the latest journeyStarted value available
  // inside the MapLibre load event
  const journeyStartedRef = useRef(false);

  const journeyMarkerRef = useRef<Marker | null>(null);

  // Remembers which route segment the journey is currently on
  const segmentIndexRef = useRef(0);

  // Remembers which stops have already opened their panel
  const reachedStopsRef = useRef<Set<string>>(new Set());

  // Keep the ref synchronized with React state
  useEffect(() => {
    journeyStartedRef.current = journeyStarted;
  }, [journeyStarted]);

  // Animate the route
  const animateRoute = useCallback(() => {
    // Prevent the animation from starting more than once
    if (animationStartedRef.current) return;

    animationStartedRef.current = true;

    const map = mapRef.current;
    if (!map) return;

    const source = map.getSource("journey-route");
    if (!source) return;

    const routeSource = source as GeoJSONSource;
    const coordinates = routeCoordinates;
    const segmentDuration = 100;

    const animateSegment = (startTime: number) => {
      const elapsed = performance.now() - startTime;
      const progress = Math.min(elapsed / segmentDuration, 1);

      const start = coordinates[segmentIndexRef.current];
      const end = coordinates[segmentIndexRef.current + 1];

      const longitude = start[0] + (end[0] - start[0]) * progress;
      const latitude = start[1] + (end[1] - start[1]) * progress;

      const markerPosition: [number, number] = [longitude, latitude];

      const overallProgress =
        (segmentIndexRef.current + progress) / (coordinates.length - 1);

      onProgressChange(overallProgress);

      if (journeyMarkerRef.current) {
        journeyMarkerRef.current.setLngLat(markerPosition);
        map.setCenter(markerPosition);
      }

      // Build the route currently visible
      const animatedCoordinates = [
        ...coordinates.slice(0, segmentIndexRef.current + 1),
        [longitude, latitude] as [number, number],
      ];

      routeSource.setData({
        type: "Feature" as const,
        properties: {},
        geometry: {
          type: "LineString" as const,
          coordinates: animatedCoordinates,
        },
      });

      // Continue animating this segment
      if (progress < 1) {
        requestAnimationFrame(() => {
          animateSegment(startTime);
        });
        return;
      }

      // Move to the next segment
      segmentIndexRef.current++;

      // Did the marker just arrive at a stop?
      const arrived = routeStops.find(
        ({ stop, index }) =>
          index === segmentIndexRef.current &&
          !reachedStopsRef.current.has(stop.id)
      );

      if (arrived) {
        reachedStopsRef.current.add(arrived.stop.id);
        onStopSelect(arrived.stop);
        animationStartedRef.current = false;
        return;
      }

      // Has the entire route been drawn?
      if (segmentIndexRef.current >= coordinates.length - 1) {
        return;
      }

      // Start the next segment
      requestAnimationFrame(() => {
        animateSegment(performance.now());
      });
    };

    animateSegment(performance.now());
  }, [onStopSelect, onProgressChange]);

  // Create the MapLibre map
  useEffect(() => {
    if (!mapContainer.current) return;

    const map = new Map({
      container: mapContainer.current,
      style: "https://tiles.openfreemap.org/styles/liberty",
      center: [-118.2625694824269, 34.078195697388836],
      zoom: 9,
    });

    // Store the map instance
    mapRef.current = map;

    // Add zoom and rotation controls
    map.addControl(new NavigationControl(), "top-right");

    // Wait until the map style has loaded
    map.on("load", () => {
      // Show the whole route and every stop when the page first loads
      fitAllStops(map);

      // 3D terrain from free AWS elevation tiles
      map.addSource("terrain-dem", {
        type: "raster-dem",
        tiles: [
          "https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png",
        ],
        encoding: "terrarium",
        tileSize: 256,
        minzoom: 0,
        maxzoom: 15,
        attribution: "Terrain Tiles on AWS (registry.opendata.aws/terrain-tiles)",
      });

map.setTerrain({ source: "terrain-dem", exaggeration: 1.4 });

      // Add the journey route as a GeoJSON source
      map.addSource("journey-route", {
        type: "geojson",

        // Start by displaying only the first
        // two coordinates of the route
        data: {
          ...journeyRoute,
          geometry: {
            ...journeyRoute.geometry,
            coordinates: journeyRoute.geometry.coordinates.slice(0, 2),
          },
        },
      });

      // Add the route line to the map
      map.addLayer({
        id: "journey-route-line",
        type: "line",
        source: "journey-route",

        layout: {
          "line-join": "round",
          "line-cap": "round",
        },

        paint: {
          "line-color": "#008000",
          "line-width": 5,
          "line-opacity": 0.8,
        },
      });

      const startingCoordinate: [number, number] =
        journeyRoute.geometry.coordinates[0] as [number, number];

      const markerElement = document.createElement("div");

      markerElement.className = "journey-marker";

      const journeyMarker = new Marker({
        element: markerElement,
        anchor: "center",
      })
        .setLngLat(startingCoordinate)
        .addTo(map);

      journeyMarkerRef.current = journeyMarker;

      // The route is now ready
      routeReadyRef.current = true;

      // If the user clicked Begin Journey
      // before the map finished loading,
      // start the animation now.
      if (journeyStartedRef.current) {
        animateRoute();
      }
    });

    // Add a marker for every stop
    journeyStops.forEach((stop) => {
      const markerElement = document.createElement("div");

      markerElement.className = `stop-marker stop-marker-${stop.type}`;
      markerElement.setAttribute("role", "button");
      markerElement.setAttribute("aria-label", `Open ${stop.name}`);
      markerElement.tabIndex = 0;

      new Marker({
        element: markerElement,
        anchor: "center",
      })
        .setLngLat(snappedCoordinates[stop.id] ?? stop.coordinates)
        .addTo(map);

      markerElement.addEventListener("click", (event) => {
        // prevents the click from continuing down to the map's interaction handling
        event.stopPropagation();

        onStopSelect(stop);
      });
    });

    // Give the parent App component
    // access to the MapLibre map
    onMapReady(map);

    // Clean up the map when the component unmounts
    return () => {
      map.remove();

      mapRef.current = null;
      routeReadyRef.current = false;
      animationStartedRef.current = false;
      journeyMarkerRef.current = null;
      segmentIndexRef.current = 0;
      reachedStopsRef.current = new Set();
    };
  }, [onMapReady, onStopSelect, animateRoute]);

  // Start the route animation when
  // the user clicks "Begin the Journey"
  useEffect(() => {
    if (!journeyStarted) return;

    // Wait until the route has been created
    if (!routeReadyRef.current) return;

    animateRoute();
  }, [journeyStarted, animateRoute]);

  // Resume the route animation when
  // the user clicks "Continue Journey"
  useEffect(() => {
    if (resumeJourney === 0) return;

    if (!routeReadyRef.current) return;

    animateRoute();
  }, [resumeJourney, animateRoute]);

  return <div ref={mapContainer} className="map-container" />;
}

export default JourneyMap;