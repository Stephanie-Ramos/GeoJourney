import type { Map } from "maplibre-gl";

interface BeginningSectionProps {
    map: Map | null;
    onBeginJourney: () => void;
    onOpenAbout: () => void;
}

function BeginningSection({ map, onBeginJourney, onOpenAbout }: BeginningSectionProps) {
    const handleBeginJourney = () => {
        if (!map) return;

        map.flyTo({
            center: [-118.1376, 33.9564],
            zoom: 12,
            duration: 3000,
            essential: true,
        });

        // Start the route after the camera flight finishes.
        map.once("moveend", () => {
            onBeginJourney();
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

                {/* NEW: milestone note, placed right before the button */}
                <p className="journey-note">
                    Each stop is a milestone, a completed project and the
                    skills it taught me, not a physical location.
                </p>

                <div className="beginning-buttons">
                    <button
                        className="begin-journey-button"
                        onClick={handleBeginJourney}
                        disabled={!map}
                    >
                        Begin the Journey
                    </button>

                    <button
                        className="begin-journey-button"
                        onClick={onOpenAbout}
                    >
                        About this Journey
                    </button>
                </div>
            </div>
        </section>
    );
}

export default BeginningSection; 