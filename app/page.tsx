"use client";

import { useEffect, useRef, useState } from "react";

const projects = [
  { title: "Security trainings", index: "01", className: "tile-security" },
  { title: "Knowledgebases", index: "02", className: "tile-knowledge" },
  { title: "OpenVPN", index: "03", className: "tile-openvpn" },
  { title: "GLPI", index: "04", className: "tile-glpi" },
];

export default function Home() {
  const [activeProject, setActiveProject] = useState<string | null>(null);
  const closeButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!activeProject) return;
    closeButton.current?.focus();
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveProject(null);
    };
    document.body.classList.add("modal-open");
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.classList.remove("modal-open");
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeProject]);

  return (
    <main className="portfolio-shell">
      <header className="site-header">
        <a className="monogram" href="#projects" aria-label="Milos Dimitrijevic — home">
          MD<span>.</span>
        </a>
        <p className="eyebrow">IT systems · Security · Documentation</p>
      </header>

      <section className="hero" aria-labelledby="portfolio-title">
        <div className="intro">
          <p className="section-label">Selected work / 2026</p>
          <h1 id="portfolio-title">
            Milos
            <span>Dimitrijevic</span>
          </h1>
          <p className="intro-copy">
            Practical systems, clear instructions, and secure infrastructure —
            explored through four focused projects.
          </p>
        </div>

        <div className="tile-grid" id="projects" aria-label="Portfolio projects">
          <div className="decorative-block" aria-hidden="true" />
          {projects.map((project) => (
            <button
              className={`project-tile ${project.className}`}
              key={project.title}
              onClick={() => setActiveProject(project.title)}
              aria-label={`Open ${project.title} preview`}
            >
              <span className="tile-index">{project.index}</span>
              <span className="tile-title">{project.title}</span>
              <span className="tile-action" aria-hidden="true">↗</span>
            </button>
          ))}
        </div>
      </section>

      <footer>
        <span>Portfolio</span>
        <span>Scroll to explore</span>
      </footer>

      {activeProject && (
        <div
          className="modal-backdrop"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setActiveProject(null);
          }}
        >
          <section
            className="project-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <div className="modal-heading">
              <div>
                <p className="section-label">Project preview</p>
                <h2 id="modal-title">{activeProject}</h2>
              </div>
              <button
                className="close-button"
                ref={closeButton}
                onClick={() => setActiveProject(null)}
                aria-label="Close project preview"
              >
                ×
              </button>
            </div>
            <div className="video-placeholder">
              <span className="play-button" aria-hidden="true">▶</span>
              <p>Video preview coming soon</p>
              <small>Your project video can be added here later.</small>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}
