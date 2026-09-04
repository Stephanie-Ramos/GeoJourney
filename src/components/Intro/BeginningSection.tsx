import type { Map } from "maplibre-gl";

interface BeginningSectionProps {
    map: Map | null;
}

function BeginningSection({ map }: BeginningSectionProps) {
    const handleBeginJourney = () => {
        // if the map has loaded yet, then don't try to control it  
        if (!map) return;

        // an animated transition that combines panning and zooming to between locations. 
        map.flyTo({
            // treasure island coordinates [lng, lat]
            center: [-118.1376, 33.9564],
            zoom: 12,
            // in miliseconds, it takes ~3 seconds for the camera to fly to the starting point 
            duration: 3000,
            // the animation should still occur even if the user has enabled reduced-motion preferences 
            essential: true,
        });
    };

    return (
        <section className="beginning-section">
            <div className="beginning content">
                <p className="eyebrow">A GEOSPATIAL JOURNEY</p>

                {/* Heading */}
                <h1>From the River to the Mountains</h1>

                {/* Portfolio Description */}
                <p className="beginning-description">
                    Exploring the intersection of environmental science, geography, remote sensing, and software engineering.
                </p>

                {/* Starting point location */}
                <div className="beginning-location">
                    <span className="location-label">JOURNEY BEGINS</span>
                    <h2>Treasure Island Park 🪎 </h2>
                    <p>Downey, California</p>
                </div>

                {/* Button */}
                <button className="begin-journey-button"
                    className="begin-journey-button"
                    onClick={handleBeginJourney}
                    disabled={!map}
                >
                    Begin the Journey
                </button>
            </div>
        </section>
    );
}

export default BeginningSection; 