interface AboutPanelProps {
  onClose: () => void;
}

function AboutPanel({ onClose }: AboutPanelProps) {
  return (
    <aside
      className="project-panel about-panel"
      role="dialog"
      aria-label="About this journey"
    >
      <button
        className="about-panel-close"
        onClick={onClose}
        aria-label="Close about panel"
      >
        x
      </button>

      <p className="project-panel-label">ABOUT THIS JOURNEY</p>
      <h2>The Route</h2>

      <p>
        I’ve never owned a car, and for a long time that kept the outdoors
        just out of reach. So I mapped my own way there: a bike path from
        Treasure Island Park to the San Gabriel Mountains. This portfolio
        follows that route. Every stop is a milestone in my work, not a
        place on the ground, and together they show what it looks like to
        get somewhere the long way and make it anyway.
      </p>

      <p>
        The route begins at Treasure Island Park and ends at a campground
        in the San Gabriel Mountains. It stands for my career. The early
        miles are flat and steady, but the closer I get to the mountains,
        the steeper the climb becomes, just as the projects I take on grow
        more challenging the further I go. The campground is where the
        effort pays off.
      </p>

      <h3>A note on the map</h3>
      <p>
        The stops along this route aren’t real places. Each one is a
        milestone, a completed project and the skills I picked up along the
        way. The path is the story; the stops are the proof of progress.
      </p>

      <h3>About me</h3>
      <p>
        I work at the intersection of environmental studies, geography,
        remote sensing, and software engineering. I’m drawn to the ways we
        can read the land from above and build tools that help people
        understand it. This portfolio is one of those tools: a map that
        turns my work into a journey.
      </p>

      <div className="about-panel-actions">
        <a href="YOUR_RESUME_URL" target="_blank" rel="noopener noreferrer">
          View Resume
        </a>
        <a href="YOUR_LINKEDIN_URL" target="_blank" rel="noopener noreferrer">
          Connect on LinkedIn
        </a>
      </div>
    </aside>
  );
}

export default AboutPanel;