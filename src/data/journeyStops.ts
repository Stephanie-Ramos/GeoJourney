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
    // MILESTONE 1: MAPPING FUNDAMENTALS
    {
        id: "mapping-fundamentals",
        name: "Mapping Fundamentals",
        type: "portfolio",
        coordinates: [-118.10, 33.99], // placeholder: must sit on your route
        title: "Milestone 1",
        description:
        "The foundations: turning raw data into accurate, readable maps.",
        projects: [
        { name: "Georeference and Digitize", 
            description: "Georeferencing is the process of aligning images to real-world coordinates by assigning spatial reference information, ensuring the data accurately reflects its geographic location on the map.  Digitizing converts physical maps or images into digital format by tracing features like boundaries or roads, creating vector layers that can be analyzed and edited. Within Los Angeles County, I georeferenced and digitized parcel maps.", 
            technology: ["ArcGIS Pro"],
            files: [
                { label: "View",url: "public/mappingFundamentals/georeferenceAndDigitize" }
            ]
        },
        { name: "Map Elements", 
            description: "Map elements are components of a map that enhance its readability and functionality, including the title, legend, scale bar, north arrow, map projection, and metadata, which together provide context, orientation, and interpretive information to help users understand the map's content and purpose. I designed a map to demonstrate the Hispanic population per county in California in the year 2018 in a graduated color symbology.", 
            technology: ["ArcGIS Pro"],
            files: [
                { label: "View",url: "public/mappingFundamentals/mapElements" }
            ]
        },
        { name: "Annotation", 
            description: "Annotation using GIS involves creating and managing text labels or symbols on a map to provide additional information or context, such as place names, building labels, or other descriptive details, which can be customized in terms of font, size, and placement for clarity and readability. I annotated to display the council district members and neighborhoods in the City of Riverside.", 
            technology: ["ArcGIS Pro"],
            files: [
                { label: "View",url: "public/mappingFundamentals/annotation" }
            ]
        }],
    },
    // MILESTONE 2: DESIGN, CAD AND TERRAIN 
    {
        id: "design-cad-terrain",
        name: "Design, CAD & Terrain",
        type: "portfolio",
        coordinates: [-118.05, 34.03], // your old Dashboard coordinates
        title: "Milestone 2",
        description:
        "Moving from reading maps to producing designs and surfaces.",
        projects: [
        { name: "Digital Illustration Design", 
            description: "Graphic Design is visual communication combined with art and technology to convey information. In Adobe Illustrator, I combined color theory, elements of art, and principles of design to create visually appealing designs.", 
            technology: ["Adobe Illustrator"],
             files: [
                { label: "View Portfolio",url: "public/designCadTerrain/graphicDesignPortfolio.pdf" }
            ]
        },
        { name: "Working with CAD", 
            description: "The transform tool is utilized to align a CAD file with a specific coordinate system or reference points. This tool allows you to select points on the CAD file and corresponding points on a basemap, enabling you to accurately position and scale the CAD data within the GIS environment. This process ensures that the CAD file aligns correctly with other geographic data layers for accurate mapping and analysis. I aligned a CAD file to the Rio Hondo College campus basemap.", 
            technology: ["ArcGIS Pro"],
            files: [
                { label: "View", url: "public/designCadTerrain/workingWithCad"}
            ] 
        },
        { name: "AutoCAD Designs", 
            description: "AutoCAD is a computer-aided design (CAD) software used to create precise 2D drawings and 3D models for planning, design, and documentation. It is widely used in architecture, engineering, construction, manufacturing, and interior design to draft floor plans, technical schematics, site layouts, and detailed construction documents. AutoCAD helps users visualize designs, ensure accuracy, and efficiently communicate ideas through standardized, professional drawings.", 
            technology: ["AutoCAD"],
            files: [
                { label: "View Portfolio", url: "public/designCadTerrain/AutoCADPortfolio.pdf"}
            ]
        },
        { name: "Deriving Surfaces from CAD", 
            description: "Deriving surfaces from CAD involves converting CAD (Computer-Aided Design) data into 3D terrain models or surface representations for use in GIS applications, enabling detailed spatial analysis and visualization.", 
            technology: ["ArcGIS Pro"],
            files: [
                { label: "View", url: "public/designCadTerrain/derivingSurfacesFromCad.png"}
            ]
        }],
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
        { name: "Band Combinations", 
            description: "Band combination is where different spectral bands (channels) from multispectral images are combined to enhance certain features of the image. Each band corresponds to a specific wavelength range of the electromagnetic spectrum, and by combining these bands in various ways, specific characteristics of the Earth's surface or objects can be highlighted. I compared true color image (321RGB) using JPG photos to false color composite (431RGB) using multispectral photos.", 
            technology: ["ENVI"],
            files: [
                { label: "View", url: ""}
            ]
        },
        { name: "NDVI using Red and Red Edge", 
            description: "The Normalized Difference Vegetation Index (NDVI) assesses vegetation health and density by analyzing reflectance in the visible (red) and near-infrared (NIR) light spectra. The formula for NDVI is: NDVI = (NIR−Red) / (NIR+Red)", 
            technology: ["ENVI"],
            files: [
                { label: "View to Compare Band Combinations", url: "public/remoteSensing/bandCombinations.png"}
            ]
        },
        { name: "Supervised Image Classification", 
            description: "Supervised image classification is a process in which a computer system is trained to categorize images into predefined classes based on labeled training data. At Richard’s Property at Yale University, I classified features of the landscape to distinguish land covers of forest, crops, and salt marshes using ENVI software.", 
            technology: ["ENVI"],
            files: [
                { label: "View", url: "public/remoteSensing/supervisedImageClassification"}
            ]
        },
        { name: "Height Profile", 
            description: "Height profile analysis involves measuring the vertical dimensions of objects captured in raster data such as 3D models generated from drone imagery. This analysis helps in understanding the spatial distribution and structural characteristics of features within the landscape.", 
            technology: ["Reality Capture"],
            files: [
                { label: "View", url: "public/remoteSensing/heightProfile"}
            ]
        }],
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
            { name: "StoryMap", 
                description: "A digital storytelling tool that combines maps, narrative text, images, and multimedia to present complex information in an engaging, interactive format. It allows users to explore spatial data while following a cohesive story. In this project, titled “Eaton Fire and the Impact on the Altadena Community,” I use a StoryMap to document the devastating effects of the Eaton Fire on Altadena’s environment, residents, and infrastructure.", 
                technology: ["ArcGIS Online"],
                projectUrl: "https://storymaps.arcgis.com/stories/8a2c0714dacd457283dafcbfdfdc8108"
            }, 
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
            projectUrl: "https://riohondo.maps.arcgis.com/apps/dashboards/8b243b89f47d4439b3cc975bdfd57c25",
            },
            {
                name: "Field Application", 
                description: "A field application is a mobile or tablet-based tool designed to collect, update, and manage geographic data in real-time while out in the field often using ArcGIS Field Maps or Survey123. This field application records lightning strikes in Arizona.",
                technology: ["ArcGIS Online"],
                projectUrl: "https://www.arcgis.com/apps/mapviewer/index.html?webmap=31d4df07e6e64237a5f55262f7447743&extent=-114.696,32.9152,-108.28,36.6187"
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