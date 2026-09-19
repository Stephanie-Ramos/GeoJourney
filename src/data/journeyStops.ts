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
        ],
        projectUrl: "YOUR_PROJECT_URL",
    },
    {
        id: "sedona-lightning",
        name: "Sedona Lightning Strikes Web App",
        type: "portfolio",
        coordinates: [-117.95, 34.10],
        title: "Interactive Web Mapping",
        description:
            "An interactive web mapping project exploring lightning strike data through spatial visualization and web-based GIS.",
        technology: [
            "",
        ],
        projectUrl: "YOUR_PROJECT_URL",
    },
    {
        id: "crystal-lake",
        name: "Crystal Lake Recreation Area",
        type: "destination",
        coordinates: [-117.8300, 34.3220],
        title: "Journey Complete",
        description:
          "Crystal Lake represents the destination of this journey and the continued path toward integrating geospatial technology, environmental science, and software engineering.",
    },
];