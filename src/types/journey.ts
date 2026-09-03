export type JourneyStopType = 
| "starting-point" 
| "portfolio"
| "destination"
| "future"; 

export interface JourneyStop {
    id: string;
    name: string;
    type: JourneyStopType;
    coordinates: [number, number];
    title: string;
    description: string;
}