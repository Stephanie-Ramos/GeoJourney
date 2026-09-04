function BeginningSection() {
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
                <button className="begin-journey-button">
                    Begin the Journey
                </button>
            </div>
        </section>
    )
};

export default BeginningSection; 