import type { JourneyStop } from "../types/journey";

export const journeyStops: JourneyStop[] = [
    {
        id: "treasure-island-park",
        name: "Treasure Island Park",
        type: "starting-point",
        coordinates: [-118.1376, 33.9564],
        title: "Where My Journey Begins",
        description: 
            "The starting point of my geospatial journey from Southeast Los Angeles toward the San Gabriel Mountains",

    },

    {
        id: "crystal-lake",
        name: "Crystal Lake Recreation Area",
        type: "destination",
        coordinates: [-117.8300, 34.3220],
        title: "The Destination",
        description:
        "A mountain destination in the San Gabriel Mountains representing exploration, growth, and my future aspirations in geospatial technology.",
    },
];