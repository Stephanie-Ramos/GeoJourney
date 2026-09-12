import { useEffect, useRef } from "react";
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

setWorkerUrl(workerUrl);

interface JourneyMapProps {
  onMapReady: (map: Map) => void;
  journeyStarted: boolean;
}

function JourneyMap({
  onMapReady,
  journeyStarted,
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

  // Keep the ref synchronized with React state
  useEffect(() => {
    journeyStartedRef.current = journeyStarted;
  }, [journeyStarted]);

  // Animate the route
  const animateRoute = () => {
    // Prevent the animation from starting more than once
    if (animationStartedRef.current) return;

    animationStartedRef.current = true;

    const map = mapRef.current;

    if (!map) return;

    const source = map.getSource("journey-route");

    if (!source) return;

    // Tell TypeScript this is a GeoJSON source
    const routeSource = source as GeoJSONSource;

    const coordinates = journeyRoute.geometry.coordinates;

    let currentIndex = 1;

    const drawNextPoint = () => {
      // Stop when the entire route has been drawn
      if (currentIndex >= coordinates.length) {
        return;
      }

      // Create a partial version of the route
      const partialRoute = {
        type: "Feature" as const,
        properties: {},
        geometry: {
          type: "LineString" as const,
          coordinates: coordinates.slice(
            0,
            currentIndex + 1
          ),
        },
      };

      // Update the route on the map
      routeSource.setData(partialRoute);

      currentIndex += 1;

      // Draw the next section after a short delay
      setTimeout(drawNextPoint, 500);
    };

    // Start drawing the route
    drawNextPoint();
  };

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

    // Add markers for each journey stop
    journeyStops.forEach((stop) => {
      new Marker()
        .setLngLat(stop.coordinates)
        .addTo(map);
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
    };
  }, [onMapReady]);

  // Start the route animation when
  // the user clicks "Begin the Journey"
  useEffect(() => {
    if (!journeyStarted) return;

    // Wait until the route has been created
    if (!routeReadyRef.current) return;

    animateRoute();
  }, [journeyStarted]);

  return (
    <div
      ref={mapContainer}
      className="map-container"
    />
  );
}

export default JourneyMap;
