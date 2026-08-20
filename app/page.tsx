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
        <p className="eyebrow">IT systems · Security · Documentation</p>
      </header>

      <section className="hero" aria-labelledby="portfolio-title">
        <div className="intro">
          <p className="section-label">Interactive curriculum vitae</p>
          <h1 id="portfolio-title">
            Milos
            <span>Dimitrijevic</span>
          </h1>
        </div>

        <div className="tile-grid" id="projects" aria-label="Portfolio projects">
          <div className="decorative-block decor-one" aria-hidden="true" />
          <div className="decorative-block decor-two" aria-hidden="true" />
          <div className="decorative-block decor-three" aria-hidden="true" />
          <div className="decorative-block decor-four" aria-hidden="true" />
          <div className="decorative-block decor-five" aria-hidden="true" />
          <div className="decorative-block decor-six" aria-hidden="true" />
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
      </footer>

      {activeProject && (
        <div
          className="modal-backdrop"
          role="presentation"
          onClick={(event) => {
            if (event.target === event.currentTarget) setActiveProject(null);
          }}
        >
          <section
            className="project-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            onClick={(event) => event.stopPropagation()}
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
