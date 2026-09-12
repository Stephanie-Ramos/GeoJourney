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
        id: "guardrail-dashboard",
        name: "Guardrail End Treatments Dashboard",
        type: "portfolio",
        coordinates: [-118.05, 34.03],
        title: "Dashboard",
        description: 
            "A dashboard in ArcGIS Online is an interactive interface that integrates maps, charts, and other visualizations to provide a comprehensive, real-time view of geographic data and key metrics. This dashboard displays the status of replaced guardrails end treatments on an indicator with a pie chart demonstrating the guardrails along the US routes, gauge of replacement status, and a web map in Dallas.",
        technology: [
            "ArcGIS Online",
            "Field Maps",
            "Survey123",
            "QuickCapture",
            "ArcGIS Dashboards", 
        ]
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