"use client";

import { useEffect, useRef, useState } from "react";

const projects = [
  { title: "Security trainings", index: "01", className: "tile-security" },
  { title: "Knowledgebases", index: "02", className: "tile-knowledge" },
  { title: "OpenVPN", index: "03", className: "tile-openvpn" },
  { title: "GLPI", index: "04", className: "tile-glpi" },
  { title: "Curriculum vitae", index: "05", className: "tile-cv" },
];

const jobs = [
  { title: "ISO", company: "Energy Casino/LV Bet, Gzira, Malta", years: "2023–Present", note: "Added to previous responsibilities", items: ["MGA Key function", "Small scale pentesting", "Risk assessments and management", "Defining and maintaining policies and documentation", "Internal trainings (preparation and execution)"] },
  { title: "IT Officer", company: "Energy Casino/LV Bet, Gzira, Malta", years: "2019–2023", items: ["Technical user support", "Hardware and Software maintenance", "Azure Administration (AAD, Intune, Exchange, MS 365)", "Server administration (Dell)", "GSuite Administration", "VMWare, ProxMox"] },
  { title: "Customer Production Part Approval Process, Quality Engineering", company: "Methode Electronic, Birkirkara, Malta", years: "2017–2019", items: ["Preparation of PPAP packages and PSW", "Support PFMEA and DFMEA activities ensuring that design and manufacturing issues are identified and risk mitigated", "Audit and release manufacturing lines and procedures", "Preparing quality documentation (APQP, QPS/QCP)", "Structural problem-solving (5why, Ishikawa, Pareto, 8D)"] },
  { title: "Quality Technician, Quality Engineering", company: "Methode Electronic, Birkirkara, Malta", years: "2015–2017", items: ["Developing quality assurance plans by conducting hazard analyses", "Preparing quality documentation and reports", "Data gathering and analysis for internal use and updating quality instructions as needed", "Conducting preliminary measurements and coordinating with other departments on correction and/or preventive maintenance", "Continuous improvement and structured problem solving"] },
  { title: "Quality Assurance", company: "Rhea Software – Usablenet, Belgrade, Serbia", years: "2014–2015", items: ["Development and execution of end-to-end test plans", "Manual testing on mobile web and apps (iOS, Android)", "Team lead for assistive page testing"] },
  { title: "Coaxial network maintenance coordinator", company: "SBB/United Group, Belgrade, Serbia", years: "2014", items: ["Network supervision", "Planning preventive network maintenance", "Detection of problems, dispatching field crew", "Review of quality and pace of work", "Configuration of modems and digital receivers"] },
  { title: "Technical Support (Level 1 and 2) for cable and ADSL internet", company: "SBB/United Group, Belgrade, Serbia", years: "2008–2010", items: ["Fast problem-solving either by navigating customers through setup or remotely accessing equipment", "Troubleshooting and maintenance of LAN, WAN and video networks", "LAN network management", "Detection of problems, dispatching field crew", "Answering customer emails and monitoring forum discussions", "Receiving inbound calls from customers"] },
];

function CVContent() {
  return <div className="cv-layout">
    <aside className="cv-sidebar">
      <h2>Contact</h2>
      <div className="cv-contact"><p><span>Mobile</span><a href="tel:+35677165227">+356 77165227</a></p><p><span>LinkedIn</span><a href="https://www.linkedin.com/in/milos-dimitrijevic/" target="_blank" rel="noreferrer">linkedin.com/in/milos-dimitrijevic</a></p><p><span>Email</span><a href="mailto:milosdimitrijevic84@hotmail.com">milosdimitrijevic84@hotmail.com</a></p></div>
      <h2>Education</h2>
      <div className="cv-entry compact"><h3>Information Systems Management</h3><p>MQF/EQF LVL 6</p><p>Union University, Serbia</p><p>2016–2018</p></div>
      <div className="cv-entry compact"><h3>Internet Technologies</h3><p>ICT College, Serbia</p><p>2010–2016</p></div>
      <h2>Skills</h2><ul className="cv-list">{["Office 365", "Azure", "GSuite", "Hardware/Software", "CRM", "LAN/WAN Support", "Linux", "Basic coding", "PS"].map(skill => <li key={skill}>{skill}</li>)}</ul>
    </aside>
    <article className="cv-main"><p className="cv-kicker">Milos Dimitrijevic</p><h2>Work experience</h2>{jobs.map(job => <div className="cv-entry" key={job.title}><h3>{job.title}</h3><strong>{job.company}</strong><p>{job.years}</p>{job.note && <p>{job.note}</p>}<ul className="cv-list">{job.items.map(item => <li key={item}>{item}</li>)}</ul></div>)}</article>
  </div>;
}

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
          <div className="decorative-block decor-two" aria-hidden="true" />
          <div className="decorative-block decor-three" aria-hidden="true" />
          <div className="decorative-block decor-four" aria-hidden="true" />
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
          className={`modal-backdrop ${activeProject === "Curriculum vitae" ? "cv-backdrop" : ""}`}
          role="presentation"
          onClick={(event) => {
            if (event.target === event.currentTarget) setActiveProject(null);
          }}
        >
          <section
            className={`project-modal ${activeProject === "Curriculum vitae" ? "cv-modal-panel" : ""}`}
            role="dialog"
            aria-modal="true"
            aria-labelledby={activeProject === "Curriculum vitae" ? undefined : "modal-title"}
            aria-label={activeProject === "Curriculum vitae" ? "Curriculum vitae" : undefined}
            onClick={(event) => event.stopPropagation()}
          >
            {activeProject === "Curriculum vitae" ? <button
              className="close-button cv-close"
              ref={closeButton}
              onClick={() => setActiveProject(null)}
              aria-label="Close curriculum vitae"
            >×</button> : <div className="modal-heading">
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
            </div>}
            {activeProject === "Curriculum vitae" ? <CVContent /> : <div className="video-placeholder">
              <span className="play-button" aria-hidden="true">▶</span>
              <p>Video preview coming soon</p>
              <small>Your project video can be added here later.</small>
            </div>}
          </section>
        </div>
      )}
    </main>
  );
}
