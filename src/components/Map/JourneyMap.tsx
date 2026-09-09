import { useEffect, useRef } from "react";
import { Map, Marker, NavigationControl, setWorkerUrl} from "maplibre-gl";
import workerUrl from "maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url";
import "maplibre-gl/dist/maplibre-gl.css";

import { journeyStops} from "../../data/journeyStops";
import { journeyRoute } from "../../data/journeyRoute";

setWorkerUrl(workerUrl); 

interface JourneyMapProps {
  onMapReady: (map: Map) => void;
  journeyStarted: boolean;
}

function JourneyMap({ onMapReady, journeyStarted }: JourneyMapProps) {
    const mapContainer = useRef<HTMLDivElement | null>(null);
    const mapRef = useRef<Map | null>(null);

    // Create the MapLibre map 
    useEffect(() => {
        if (!mapContainer.current) return;

        const map = new Map({
            container: mapContainer.current,
            style: "https://tiles.openfreemap.org/styles/liberty", 
            center: [-118.2625694824269, 34.078195697388836],
            zoom: 9,
        });

        // Store the MapLibre map in our ref
        mapRef.current = map;

        map.addControl(new NavigationControl(), "top-right");

        // Add the journey route after the map style loads
        map.on("load", () => {
            // giving the journeyRoute GeoJSON
            map.addSource("journey-route", {
                type: "geojson",
                data: journeyRoute,
            });
            // the source connects the layer to the journey-route
            map.addLayer({
                id: "journey-route-line",
                type: "line",
                source: "journey-route",
                layout: {
                "line-join": "round",
                "line-cap": "round",
                },
                // line appearance
                paint: {
                "line-color": '#008000',
                "line-width": 5,
                "line-opacity": 0,
                },
            });
        });

        // temp code: console log to fix the correct map position when page opens up and extract the exact coordinates to do so
        // Event listener
        // moveend happens when the map finishes moving.
        map.on("moveend", () => {
            // getCenter(): returns the map's current geographic centerpoint
            const center = map.getCenter();
            // lng: longitude
            // lat: latitude
            console.log("Center:", center.lng, center.lat);
            // getZoom() returns the map's current zoom level 
            console.log("Zoom:", map.getZoom());
        });

        journeyStops.forEach((stop) => {
            new Marker ()
                .setLngLat(stop.coordinates)
                .addTo(map);

        });

        // Give App.tsx access to the map
        onMapReady(map);

        return () => {
            map.remove();
            mapRef.current = null;
        };
    },[onMapReady]);

    // Reveal the route when the journey begins
    useEffect(() => {
        if (!journeyStarted) return;
        
        const map = mapRef.current;

        if (!map) return;

        // Wait until the map has finished loading
        if (!map.isStyleLoaded()) return;
        
        // Make sure the route layer exists
        if (!map.getLayer("journey-route-line")) return;

        map.setPaintProperty(
            "journey-route-line",
            "line-opacity",
             0.8
        );
    }, [journeyStarted]);

    return (<div ref={mapContainer} className="map-container" />);
}

export default JourneyMap; 