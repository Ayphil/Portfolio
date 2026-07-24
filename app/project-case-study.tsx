"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { MouseEvent as ReactMouseEvent } from "react";
import type { ProjectMedia, ProjectPageContent, ProjectPageSection } from "./project-pages";
import { projectPages } from "./project-pages";
import type { Language } from "./language";
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
    openFull: "Open full size",
    play: "Play video",
    pause: "Pause video",
    close: "Close",
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
    openFull: "Ouvrir en grand",
    play: "Lire la vidéo",
    pause: "Mettre en pause",
    close: "Fermer",
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
const forceMute = (event: { currentTarget: HTMLVideoElement }) => { event.currentTarget.muted = true; };
const resolveMediaLabel = (label: ProjectMedia["label"], language: Language) => typeof label === "string" ? label : label[language];
const mediaKey = (media: ProjectMedia) => media.src ?? resolveMediaLabel(media.label, "en");

function CaseStudyVideo({ media, mediaLabel, displayLabel, openFullLabel, playLabel, pauseLabel, onOpen }: { media: ProjectMedia; mediaLabel: string; displayLabel: string; openFullLabel: string; playLabel: string; pauseLabel: string; onOpen: (media: ProjectMedia) => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const togglePlayback = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.muted = true;
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  };

  return (
    <div className={`case-study-media media-video has-media${playing ? " is-playing" : ""}`}>
      <video
        ref={videoRef}
        className="case-study-media-video"
        loop
        muted
        playsInline
        preload="metadata"
        poster={media.poster ? resolveMediaUrl(media.poster) : undefined}
        onVolumeChange={forceMute}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        aria-label={mediaLabel}
      >
        <source src={resolveMediaUrl(media.src as string)} />
      </video>
      <button className="case-study-media-play" type="button" onClick={togglePlayback} aria-label={playing ? pauseLabel : playLabel}>
        <span aria-hidden="true">{playing ? "❚❚" : "▶"}</span>
      </button>
      <div className="case-study-media-label"><span>{displayLabel}</span><button className="case-study-media-open-label" type="button" onClick={() => onOpen(media)}>{openFullLabel} ⤢</button></div>
    </div>
  );
}

function CaseStudyMedia({ media, label, openFullLabel, playLabel, pauseLabel, language, onOpen }: { media: ProjectMedia; label: string; openFullLabel: string; playLabel: string; pauseLabel: string; language: Language; onOpen: (media: ProjectMedia) => void }) {
  const displayLabel = resolveMediaLabel(media.label, language);
  const mediaLabel = `${label}: ${displayLabel}`;

  if (media.src && media.kind === "video") {
    return <CaseStudyVideo media={media} mediaLabel={mediaLabel} displayLabel={displayLabel} openFullLabel={openFullLabel} playLabel={playLabel} pauseLabel={pauseLabel} onOpen={onOpen} />;
  }

  if (media.src && media.kind === "image") {
    return (
      <figure className="case-study-media media-image has-media">
        <button className="case-study-media-link" type="button" onClick={() => onOpen(media)} aria-label={`${openFullLabel}: ${displayLabel}`}>
          <img className="case-study-media-image" src={resolveMediaUrl(media.src)} alt={displayLabel} loading="lazy" />
        </button>
        <figcaption className="case-study-media-label"><span>{displayLabel}</span><span className="case-study-media-open-label">{openFullLabel} ⤢</span></figcaption>
      </figure>
    );
  }

  return (
    <div className={`case-study-media media-${media.kind}`} role="img" aria-label={mediaLabel}>
      <span className="case-study-media-type">{media.kind === "video" ? "▶" : media.kind === "blueprint" ? "BP" : "IMG"}</span>
      <span className="case-study-media-label">{displayLabel}</span>
      <span className="case-study-media-note">{label}</span>
    </div>
  );
}

function SectionBody({ section, language, t, onOpen, onAnchor }: { section: ProjectPageSection; language: Language; t: (typeof copy)[Language]; onOpen: (media: ProjectMedia) => void; onAnchor: (event: ReactMouseEvent<HTMLAnchorElement>) => void }) {
  const renderMedia = (media: ProjectMedia) => <CaseStudyMedia key={mediaKey(media)} media={media} label={t.media} openFullLabel={t.openFull} playLabel={t.play} pauseLabel={t.pause} language={language} onOpen={onOpen} />;
  if (section.blocks) {
    return (
      <div className="case-study-section-body">
        {section.blocks.map((block) => {
          if (block.type === "text") return <p key={block.en}>{block[language]}</p>;
          if (block.type === "list") return <ul key={block.en[0]}>{block[language].map((item) => <li key={item}>{item}</li>)}</ul>;
          if (block.type === "linklist") return (
            <ul className="case-study-linklist" key={block.items[0].en}>
              {block.items.map((item) => <li key={item.en}><a href={item.href} onClick={onAnchor}>{item[language]}<span aria-hidden="true">↘</span></a></li>)}
            </ul>
          );
          if (block.type === "link") {
            const external = !block.href.startsWith("#");
            return (
              <a
                className="case-study-section-link"
                key={block.href}
                href={block.href}
                onClick={external ? undefined : onAnchor}
                target={external ? "_blank" : undefined}
                rel={external ? "noreferrer" : undefined}
              >
                <span>{block[language]}</span><span aria-hidden="true">↗</span>
              </a>
            );
          }
          return (
            <div className="case-study-media-block" key={mediaKey(block.media[0])}>
              <p className="case-study-media-caption">{block.caption[language]}</p>
              {block.media.length > 1
                ? <div className="case-study-media-grid">{block.media.map(renderMedia)}</div>
                : renderMedia(block.media[0])}
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="case-study-section-body">
      {section.body && <p>{section.body[language]}</p>}
      {section.bullets && <ul>{section.bullets[language].map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}
      {section.media && <div className="case-study-media-grid">{section.media.map(renderMedia)}</div>}
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

  const [lightbox, setLightbox] = useState<ProjectMedia | null>(null);

  const closeLightbox = useCallback(() => setLightbox(null), []);

  useEffect(() => {
    if (!lightbox) return;
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setLightbox(null);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [lightbox]);

  const handleAnchor = useCallback((event: ReactMouseEvent<HTMLAnchorElement>) => {
    const href = event.currentTarget.getAttribute("href");
    if (!href?.startsWith("#")) return;
    const target = document.getElementById(href.slice(1));
    if (!target) return;
    event.preventDefault();
    window.history.pushState(null, "", href);
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const lightboxSrc = lightbox?.src ? resolveMediaUrl(lightbox.fullSrc ?? lightbox.src) : undefined;
  const lightboxLabel = lightbox ? resolveMediaLabel(lightbox.label, language) : "";

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
          {project.sections.map((section) => <section className="case-study-section" id={section.id} key={section.title.en}>
            <div className="case-study-section-heading"><p className="eyebrow">{section.eyebrow[language]}</p><h2>{section.title[language]}</h2></div>
            <SectionBody section={section} language={language} t={t} onOpen={setLightbox} onAnchor={handleAnchor} />
          </section>)}
        </div>
      </article>

      <nav className="case-study-next-nav" aria-label="Project navigation">
        <Link href={`/projects/${previous}`}><span>{t.previous}</span><strong>↙</strong></Link>
        <a href={withBasePath("/#work")} className="case-study-index-link">{indexLabel}<br />{t.back}</a>
        <Link href={`/projects/${next}`}><span>{t.next}</span><strong>↗</strong></Link>
      </nav>

      {lightbox && (
        <div className="media-lightbox" role="dialog" aria-modal="true" aria-label={lightboxLabel} onClick={closeLightbox}>
          <button className="media-lightbox-close" type="button" onClick={closeLightbox} aria-label={t.close}>×</button>
          <div className="media-lightbox-stage" onClick={(event) => event.stopPropagation()}>
            {lightbox.kind === "video"
              ? <video className="media-lightbox-media" src={lightboxSrc} autoPlay loop muted playsInline controls controlsList="nofullscreen nodownload noremoteplayback" disablePictureInPicture onVolumeChange={forceMute} />
              : <img className="media-lightbox-media" src={lightboxSrc} alt={lightboxLabel} />}
            <span className="media-lightbox-caption">{lightboxLabel}</span>
          </div>
        </div>
      )}
    </main>
  );
}
