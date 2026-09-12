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

setWorkerUrl(workerUrl);

interface JourneyMapProps {
  onMapReady: (map: Map) => void;
  journeyStarted: boolean;
  resumeJourney: number;
  onStopSelect: (stop: JourneyStop) => void;
}

function JourneyMap({
  onMapReady,
  journeyStarted,
  resumeJourney,
  onStopSelect,
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

  const coordinates = journeyRoute.geometry.coordinates;

  // Find the Guardrail Dashboard portfolio stop
  const guardrailStop = journeyStops.find(
    (stop) => stop.id === "guardrail-dashboard"
  );

  if (!guardrailStop) {
    console.error(
      "Guardrail Dashboard stop not found."
    );

    return;
  }

  const segmentDuration = 1000;

  const animateSegment = (startTime: number) => {
    const currentTime = performance.now();

    const elapsed = currentTime - startTime;

    const progress = Math.min(
      elapsed / segmentDuration,
      1
    );

    // Get the current and next coordinate
    const start =
      coordinates[segmentIndexRef.current];

    const end =
      coordinates[segmentIndexRef.current + 1];

    // Interpolate longitude
    const longitude =
      start[0] +
      (end[0] - start[0]) * progress;

    // Interpolate latitude
    const latitude =
      start[1] +
      (end[1] - start[1]) * progress;

    const markerPosition: [number, number] = [
      longitude,
      latitude,
    ];

    if (journeyMarkerRef.current) {
      journeyMarkerRef.current.setLngLat(
        markerPosition
      );
    }

    // Build the route currently visible
    const animatedCoordinates = [
      ...coordinates.slice(
        0,
        segmentIndexRef.current + 1
      ),
      [longitude, latitude] as [number, number],
    ];

    const partialRoute = {
      type: "Feature" as const,
      properties: {},
      geometry: {
        type: "LineString" as const,
        coordinates: animatedCoordinates,
      },
    };

    // Update the route on the map
    routeSource.setData(partialRoute);

    // Continue animating this segment
    if (progress < 1) {
      requestAnimationFrame(() => {
        animateSegment(startTime);
      });

      return;
    }

    // Move to the next segment
    segmentIndexRef.current++;

    // Check whether the moving marker
    // has reached the Guardrail Dashboard stop
    if (
      segmentIndexRef.current < coordinates.length &&
      coordinates[segmentIndexRef.current][0] ===
        guardrailStop.coordinates[0] &&
      coordinates[segmentIndexRef.current][1] ===
        guardrailStop.coordinates[1]

    ) {
      onStopSelect(guardrailStop); 
      
    // This allows us to call animateRoute() again when the user presses Continue Journey
      animationStartedRef.current = false;

      return;
    }

    // Check whether the entire route has been drawn
    if (
      segmentIndexRef.current >=
      coordinates.length - 1
    ) {
      return;
    }

    // Start the next segment
    requestAnimationFrame(() => {
      animateSegment(performance.now());
    });
  };

  // Start the first segment
  animateSegment(performance.now());
  }, [onStopSelect]);

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
    map.addControl(
      new NavigationControl(),
      "top-right"
    );

    // Wait until the map style has loaded
    map.on("load", () => {
      // Add the journey route as a GeoJSON source
      map.addSource("journey-route", {
        type: "geojson",

        // Start by displaying only the first
        // two coordinates of the route
        data: {
          ...journeyRoute,
          geometry: {
            ...journeyRoute.geometry,
            coordinates:
              journeyRoute.geometry.coordinates.slice(0, 2),
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
        journeyRoute.geometry.coordinates[0] as [
            number,
            number
        ];

      const markerElement = document. createElement("div");
      
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

    // Temporary debugging:
    // prints the map center and zoom after movement
    map.on("moveend", () => {
      const center = map.getCenter();

      console.log(
        "Center:",
        center.lng,
        center.lat
      );

      console.log(
        "Zoom:",
        map.getZoom()
      );
    });

    journeyStops.forEach((stop) => {
      const marker = new Marker()
        .setLngLat(stop.coordinates)
        .addTo(map);

      const markerElement = marker.getElement();

    // make the marker interactive 
      markerElement.style.cursor = "pointer";
    // receive mouse events
      markerElement.style.pointerEvents = "auto";

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
    };
  }, [onMapReady, onStopSelect, animateRoute]);

  // Start the route animation when
  // the user clicks "Begin the Journey"
  // Journey-start effect
  useEffect(() => {
    if (!journeyStarted) return;

    // Wait until the route has been created
    if (!routeReadyRef.current) return;

    animateRoute();
  }, [journeyStarted, animateRoute]);

  // Journey-resume effect
  useEffect(() => {
    if (resumeJourney === 0) return;

    if (!routeReadyRef.current) return;

    animateRoute();
}, [resumeJourney, animateRoute]);

  return (
    <div
      ref={mapContainer}
      className="map-container"
    />
  );
}

export default JourneyMap;
