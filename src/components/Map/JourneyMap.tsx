import { useEffect, useRef } from "react";
import { Map, Marker, NavigationControl, setWorkerUrl} from "maplibre-gl";
import workerUrl from "maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url";
import "maplibre-gl/dist/maplibre-gl.css";

import { journeyStops} from "../../data/journeyStops";

setWorkerUrl(workerUrl); 

function JourneyMap() {
    const mapContainer = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!mapContainer.current) return;

        const map = new Map({
            container: mapContainer.current,
            style: "https://tiles.openfreemap.org/styles/liberty", 
            center: [-118.2625694824269, 34.078195697388836],
            zoom: 9,
        });

        map.addControl(new NavigationControl(), "top-right");

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

        return () => {
            map.remove();
        };
    },[]);

    return <div ref={mapContainer} className="map-container" />

}

export default JourneyMap; 