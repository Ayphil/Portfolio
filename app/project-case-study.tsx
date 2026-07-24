"use client";

import Link from "next/link";
import { useMemo } from "react";
import type { ProjectMedia, ProjectPageContent } from "./project-pages";
import { projectPages } from "./project-pages";
import { useLanguage } from "./language";

const copy = {
  en: {
    back: "Back to selected work",
    project: "Project",
    role: "Role",
    engine: "Tool / engine",
    status: "Status",
    facts: "At a glance",
    media: "Media placeholder",
    visit: "Play / view project",
    next: "Next project",
    previous: "Previous project",
    menu: "Portfolio navigation",
    cv: "CV",
  },
  fr: {
    back: "Retour aux projets choisis",
    project: "Projet",
    role: "Rôle",
    engine: "Outil / moteur",
    status: "Statut",
    facts: "En bref",
    media: "Média à remplacer",
    visit: "Jouer / voir le projet",
    next: "Projet suivant",
    previous: "Projet précédent",
    menu: "Navigation du portfolio",
    cv: "CV",
  },
};

const withBasePath = (path: string) => `/Portfolio${path}`;
const isRemoteMedia = (path: string) => /^https?:\/\//i.test(path);
const resolveMediaUrl = (path: string) => isRemoteMedia(path) ? path : withBasePath(path.startsWith("/") ? path : `/${path}`);

function CaseStudyMedia({ media, label }: { media: ProjectMedia; label: string }) {
  const mediaLabel = `${label}: ${media.label}`;

  if (media.src && media.kind === "video") {
    return (
      <div className="case-study-media media-video has-media">
        <video className="case-study-media-video" controls preload="metadata" poster={media.poster ? resolveMediaUrl(media.poster) : undefined} aria-label={mediaLabel}>
          <source src={resolveMediaUrl(media.src)} />
        </video>
        <span className="case-study-media-label">{media.label}</span>
      </div>
    );
  }

  if (media.src && media.kind === "image") {
    return (
      <figure className="case-study-media media-image has-media">
        <img className="case-study-media-image" src={resolveMediaUrl(media.src)} alt={media.label} loading="lazy" />
        <figcaption className="case-study-media-label">{media.label}</figcaption>
      </figure>
    );
  }

  return (
    <div className={`case-study-media media-${media.kind}`} role="img" aria-label={mediaLabel}>
      <span className="case-study-media-type">{media.kind === "video" ? "▶" : media.kind === "blueprint" ? "BP" : "IMG"}</span>
      <span className="case-study-media-label">{media.label}</span>
      <span className="case-study-media-note">{label}</span>
    </div>
  );
}

export default function ProjectCaseStudy({ project }: { project: ProjectPageContent }) {
  const [language, setLanguage] = useLanguage();
  const t = copy[language];
  const order = useMemo(() => projectPages.map((entry) => entry.slug), []);
  const currentIndex = useMemo(() => Math.max(0, order.indexOf(project.slug)), [order, project.slug]);
  const previous = order[(currentIndex + order.length - 1) % order.length];
  const next = order[(currentIndex + 1) % order.length];
  const indexLabel = `01 — ${String(order.length).padStart(2, "0")}`;

  return (
    <main className="case-study-shell">
      <header className="case-study-header">
        <a className="brand" href={withBasePath("/#reel")} aria-label="Back to portfolio home">
          <span className="brand-text">game design<br />portfolio</span>
        </a>
        <nav className="case-study-nav" aria-label={t.menu}>
          <a href={withBasePath("/#work")}>{t.back}</a>
          <a href={withBasePath("/#contact")}>Contact</a>
          <a href={withBasePath("/CV_Emmanuel_Cyr.pdf")} target="_blank" rel="noreferrer">{t.cv}</a>
        </nav>
        <button className="language-toggle" type="button" onClick={() => setLanguage((current) => current === "en" ? "fr" : "en")} aria-label="Switch language">
          <span className={language === "en" ? "is-active" : ""}>EN</span><span className="language-divider">/</span><span className={language === "fr" ? "is-active" : ""}>FR</span>
        </button>
      </header>

      <article className="case-study-content">
        <div className="case-study-breadcrumb"><a href={withBasePath("/#work")}>{t.back}</a><span>↗</span><span>{project.number} / {project.title[language]}</span></div>

        <section className="case-study-hero" aria-labelledby="case-study-title">
          <div className="case-study-hero-copy">
            <p className="eyebrow"><span>{project.number}</span>{t.project}</p>
            <p className="case-study-kicker">{project.subtitle[language]}</p>
            <h1 id="case-study-title">{project.title[language]}</h1>
            <p className="case-study-intro">{project.intro[language]}</p>
            {project.link && <a className="case-study-cta" href={project.link} target="_blank" rel="noreferrer"><span>{t.visit}</span><span>↗</span></a>}
          </div>
          <div className={`case-study-art project-${project.tone}`} aria-label={`${project.title[language]} visual placeholder`} role="img">
            <span className="case-study-art-index">{project.number} / {project.year}</span>
            <span className="case-study-art-mark">{project.mark}</span>
            <span className="case-study-art-caption">{project.engine}<br />{project.status[language]}</span>
          </div>
        </section>

        <section className="case-study-meta" aria-label={t.facts}>
          <div className="case-study-meta-item"><span>{t.role}</span><strong>{project.role[language]}</strong></div>
          <div className="case-study-meta-item"><span>{t.engine}</span><strong>{project.engine}</strong></div>
          <div className="case-study-meta-item"><span>{t.status}</span><strong>{project.status[language]}</strong></div>
          <div className="case-study-facts"><span>{t.facts}</span>{project.facts[language].map((fact) => <strong key={fact}>{fact}</strong>)}</div>
        </section>

        <div className="case-study-sections">
          {project.sections.map((section) => <section className="case-study-section" key={section.title.en}>
            <div className="case-study-section-heading"><p className="eyebrow">{section.eyebrow[language]}</p><h2>{section.title[language]}</h2></div>
            <div className="case-study-section-body"><p>{section.body[language]}</p>{section.bullets && <ul>{section.bullets[language].map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}{section.media && <div className="case-study-media-grid">{section.media.map((media) => <CaseStudyMedia key={media.label} media={media} label={t.media} />)}</div>}</div>
          </section>)}
        </div>
      </article>

      <nav className="case-study-next-nav" aria-label="Project navigation">
        <Link href={`/projects/${previous}`}><span>{t.previous}</span><strong>↙</strong></Link>
        <a href={withBasePath("/#work")} className="case-study-index-link">{indexLabel}<br />{t.back}</a>
        <Link href={`/projects/${next}`}><span>{t.next}</span><strong>↗</strong></Link>
      </nav>
    </main>
  );
}
