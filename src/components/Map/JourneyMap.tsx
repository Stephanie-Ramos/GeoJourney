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
            center: [-118.1376, 33.9564],
            zoom: 9,
        });

        map.addControl(new NavigationControl(), "top-right");

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