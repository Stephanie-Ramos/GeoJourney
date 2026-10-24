export type JourneyStopType = 
| "starting-point" 
| "portfolio"
| "destination"
| "future"; 

export interface StopProject {
    name: string;
    description?: string;
    technology?: string[];
    projectUrl?: string;
}

export interface JourneyStop {
    id: string;
    name: string;
    type: JourneyStopType;
    coordinates: [number, number];
    title: string;
    description: string;

    // Portfolio stops: the projects shown in this stop's panel
    projects?: StopProject[];

    // Old single-project field (remove once every stop uses 'projects')
    technology?: string[];
    projectUrl?: string;
}