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
        id: "mapping-fundamentals",
        name: "Mapping Fundamentals",
        type: "portfolio",
        coordinates: [-118.10, 33.99], // placeholder: must sit on your route
        title: "Milestone 1",
        description:
        "The foundations: turning raw data into accurate, readable maps.",
        projects: [
        { name: "Georeference and Digitize", description: "TODO", technology: [] },
        { name: "Map Elements", description: "TODO", technology: [] },
        { name: "Annotation", description: "TODO", technology: [] },
        ],
    },
    {
        id: "design-cad-terrain",
        name: "Design, CAD & Terrain",
        type: "portfolio",
        coordinates: [-118.05, 34.03], // your old Dashboard coordinates
        title: "Milestone 2",
        description:
        "Moving from reading maps to producing designs and surfaces.",
        projects: [
        { name: "Digital Illustration Design", description: "TODO", technology: [] },
        { name: "Working with CAD", description: "TODO", technology: [] },
        { name: "AutoCAD Designs", description: "TODO", technology: [] },
        { name: "Deriving Surfaces from CAD", description: "TODO", technology: [] },
        ],
    },
    {
        id: "remote-sensing",
        name: "Remote Sensing",
        type: "portfolio",
        coordinates: [-117.949959, 34.143412], // your old Sedona coordinates
        title: "Milestone 3",
        description:
        "The steep climb: reading the land from above with imagery analysis.",
        projects: [
        { name: "Band Combinations", description: "TODO", technology: [] },
        { name: "NDVI using Red and Red Edge", description: "TODO", technology: [] },
        { name: "Supervised Image Classification", description: "TODO", technology: [] },
        { name: "Height Profile", description: "TODO", technology: [] },
        ],
    },
    {
        id: "web-applied-gis",
        name: "Web and Applied GIS",
        type: "portfolio",
        coordinates: [-117.89, 34.23],
        title: "Milestone 4",
        description: 
            "The final ascent: finished tools people can use in the field and on the web.",
        projects: [
            { name: "StoryMap", description: "", technology: []}, 
            { 
                name: "Dashboard", 
                description: "Guardrail End Treatments Dashboard: an ArcGIS Online dashboard showing the replacement status of guardrail end treatments, with a pie chart of guardrails along US routes, a status gauge, and a web map of Dallas.",
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
                name: "Field Application", description: "", technology: []
            }, 
        ],
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