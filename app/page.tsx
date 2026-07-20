"use client";

import { useEffect, useMemo, useState } from "react";

type Language = "en" | "fr";

type Project = {
  number: string;
  title: string;
  subtitle: string;
  year: string;
  engine: "Unreal" | "Unity" | "Godot";
  contributions: string[];
  tone: string;
  mark: string;
  description: { en: string; fr: string };
};

const projects: Project[] = [
  {
    number: "01",
    title: "The Last Signal",
    subtitle: "Narrative survival / 4 player",
    year: "2025",
    engine: "Unreal",
    contributions: ["UX", "Tech design"],
    tone: "signal",
    mark: "LS",
    description: {
      en: "A co-op communication system where silence becomes a resource.",
      fr: "Un système de communication coopératif où le silence devient une ressource.",
    },
  },
  {
    number: "02",
    title: "Tidepool",
    subtitle: "Tactical puzzle / PC",
    year: "2024",
    engine: "Godot",
    contributions: ["System", "Solo-dev"],
    tone: "tide",
    mark: "TP",
    description: {
      en: "Small rules, deep water: a systemic puzzle about rhythm and drift.",
      fr: "De petites règles, une grande profondeur : un puzzle systémique sur le rythme et la dérive.",
    },
  },
  {
    number: "03",
    title: "Soft Reset",
    subtitle: "Action platformer / PC + console",
    year: "2024",
    engine: "Unity",
    contributions: ["UX", "System"],
    tone: "reset",
    mark: "SR",
    description: {
      en: "A movement-first adventure designed around readable momentum.",
      fr: "Une aventure centrée sur le mouvement, conçue autour d'un élan lisible.",
    },
  },
  {
    number: "04",
    title: "Afterlight",
    subtitle: "Exploration / first-person",
    year: "2023",
    engine: "Unreal",
    contributions: ["Tech design", "UX"],
    tone: "afterlight",
    mark: "AL",
    description: {
      en: "A quiet world where every interface is part of the fiction.",
      fr: "Un monde silencieux où chaque interface fait partie de la fiction.",
    },
  },
  {
    number: "05",
    title: "Lumen Farm",
    subtitle: "Simulation / cozy systems",
    year: "2022",
    engine: "Unity",
    contributions: ["System", "Solo-dev"],
    tone: "lumen",
    mark: "LF",
    description: {
      en: "A farming loop built to make planning feel generous, not punishing.",
      fr: "Une boucle agricole où planifier reste généreux, jamais punitif.",
    },
  },
  {
    number: "06",
    title: "One More Turn",
    subtitle: "Strategy prototype / mobile",
    year: "2021",
    engine: "Godot",
    contributions: ["UX", "Solo-dev", "Tech design"],
    tone: "turn",
    mark: "OM",
    description: {
      en: "A pocket-sized strategy game with a surprisingly long tail.",
      fr: "Un jeu de stratégie de poche avec une rejouabilité surprenante.",
    },
  },
];

const copy = {
  en: {
    nav: { reel: "Reel", work: "Selected work", about: "About", contact: "Contact" },
    kicker: "Game designer / systems thinker",
    heroTitle: "Designing\nmeaningful\nsystems.",
    heroBody:
      "I turn complex rules into clear, tactile experiences — from the first input to the moment a player surprises themselves.",
    heroCta: "Explore the work",
    reelLabel: "Demo reel / 01:18",
    reelPlay: "Play demo reel",
    reelPause: "Pause reel",
    reelNote: "A cut of worlds, rules, and readable moments.",
    selectedKicker: "Selected work / 06 projects",
    selectedTitle: "Different worlds.\nSame obsession.",
    selectedBody:
      "I work across UX, systems, and technical design to make ambitious ideas feel inevitable in the hands of a player.",
    filterBy: "Filter by",
    contribution: "Contribution",
    engine: "Engine",
    clear: "Clear all",
    showing: "Showing",
    projects: "projects",
    all: "All work",
    aboutKicker: "A little context",
    aboutTitle: "Good design leaves\nroom for discovery.",
    aboutBody:
      "I’m a game designer who likes the space between intention and accident. My practice moves between player research, paper prototypes, systems tuning, and the technical conversations that get ideas into a playable shape.",
    approach: "My approach",
    approachBody: "Observe → simplify → test → make it sing.",
    availability: "Available for select collaborations",
    contactTitle: "Have a world\nin mind?",
    contactBody: "Tell me what you’re making. I’d love to hear the messy first version.",
    contactCta: "Start a conversation",
    footer: "Game design, systems, and the good kind of impossible.",
  },
  fr: {
    nav: { reel: "Reel", work: "Projets choisis", about: "À propos", contact: "Contact" },
    kicker: "Game designer / pensée systémique",
    heroTitle: "Concevoir des\nsystèmes qui\ncomptent.",
    heroBody:
      "Je transforme des règles complexes en expériences claires et tactiles — de la première action au moment où le joueur se surprend lui-même.",
    heroCta: "Voir les projets",
    reelLabel: "Demo reel / 01:18",
    reelPlay: "Lancer le demo reel",
    reelPause: "Mettre en pause",
    reelNote: "Un montage de mondes, de règles et de moments lisibles.",
    selectedKicker: "Projets choisis / 06 projets",
    selectedTitle: "Des mondes différents.\nLa même obsession.",
    selectedBody:
      "Je travaille en UX, systèmes et design technique pour rendre les idées ambitieuses évidentes entre les mains du joueur.",
    filterBy: "Filtrer par",
    contribution: "Contribution",
    engine: "Moteur",
    clear: "Tout effacer",
    showing: "Afficher",
    projects: "projets",
    all: "Tous les projets",
    aboutKicker: "Un peu de contexte",
    aboutTitle: "Le bon design laisse\nplace à la découverte.",
    aboutBody:
      "Je suis game designer et j’aime l’espace entre l’intention et l’accident. Ma pratique navigue entre recherche joueur, prototypes papier, équilibrage des systèmes et conversations techniques pour donner une forme jouable aux idées.",
    approach: "Ma méthode",
    approachBody: "Observer → simplifier → tester → faire chanter.",
    availability: "Disponible pour quelques collaborations",
    contactTitle: "Un monde\nen tête?",
    contactBody: "Parlez-moi de ce que vous créez. J’aimerais voir la première version, même brouillonne.",
    contactCta: "Ouvrir la conversation",
    footer: "Game design, systèmes et impossibilités bien choisies.",
  },
};

const filterGroups = {
  contribution: ["UX", "Tech design", "System", "Solo-dev"],
  engine: ["Unreal", "Unity", "Godot"],
};

export default function Home() {
  const [language, setLanguage] = useState<Language>("en");
  const [activeContributions, setActiveContributions] = useState<string[]>([]);
  const [activeEngines, setActiveEngines] = useState<string[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const t = copy[language];

  useEffect(() => {
    if (!isPlaying) return;
    const timer = window.setInterval(() => {
      setProgress((value) => {
        if (value >= 100) {
          setIsPlaying(false);
          return 0;
        }
        return value + 0.42;
      });
    }, 300);
    return () => window.clearInterval(timer);
  }, [isPlaying]);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const contributionMatch = activeContributions.every((filter) =>
        project.contributions.includes(filter),
      );
      const engineMatch =
        activeEngines.length === 0 || activeEngines.includes(project.engine);
      return contributionMatch && engineMatch;
    });
  }, [activeContributions, activeEngines]);

  const toggleFilter = (filter: string, group: "contribution" | "engine") => {
    const setter = group === "contribution" ? setActiveContributions : setActiveEngines;
    setter((current) =>
      current.includes(filter)
        ? current.filter((item) => item !== filter)
        : [...current, filter],
    );
  };

  const clearFilters = () => {
    setActiveContributions([]);
    setActiveEngines([]);
  };

  return (
    <main className="site-shell">
      <header className="site-header">
        <a className="brand" href="#reel" aria-label="Back to top">
          <span className="brand-mark">g<span>d</span></span>
          <span className="brand-text">game design<br />portfolio</span>
        </a>
        <nav className="main-nav" aria-label="Primary navigation">
          <a href="#reel">{t.nav.reel}</a>
          <a href="#work">{t.nav.work}</a>
          <a href="#about">{t.nav.about}</a>
          <a href="#contact">{t.nav.contact}</a>
        </nav>
        <div className="header-tools">
          <span className="availability-dot" aria-hidden="true" />
          <button
            className="language-toggle"
            type="button"
            onClick={() => setLanguage((current) => (current === "en" ? "fr" : "en"))}
            aria-label="Switch language"
          >
            <span className={language === "en" ? "is-active" : ""}>EN</span>
            <span className="language-divider">/</span>
            <span className={language === "fr" ? "is-active" : ""}>FR</span>
          </button>
        </div>
      </header>

      <section className="hero-section" id="reel" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow"><span>01</span>{t.kicker}</p>
          <h1 id="hero-title">{t.heroTitle.split("\n").map((line) => <span key={line}>{line}</span>)}</h1>
          <p className="hero-body">{t.heroBody}</p>
          <a className="text-link" href="#work">
            <span>{t.heroCta}</span><span className="link-arrow">↘</span>
          </a>
        </div>

        <div className="reel-column">
          <div className="reel-frame">
            <div className="reel-meta">
              <span>{t.reelLabel}</span>
              <span className="reel-live"><i /> {isPlaying ? "PLAYING" : "LOOP"}</span>
            </div>
            <div className={`reel-visual ${isPlaying ? "is-playing" : ""}`}>
              <div className="reel-orbit orbit-one" />
              <div className="reel-orbit orbit-two" />
              <div className="reel-grid" />
              <div className="reel-slice slice-one" />
              <div className="reel-slice slice-two" />
              <div className="reel-slice slice-three" />
              <div className="reel-word">PLAY<br /><span>THE</span><br />SYSTEM</div>
              <div className="reel-corner corner-top">A / 04</div>
              <div className="reel-corner corner-bottom">FEELING<br />IS A RULE</div>
              <button
                className="reel-play"
                type="button"
                onClick={() => setIsPlaying((current) => !current)}
                aria-label={isPlaying ? t.reelPause : t.reelPlay}
              >
                <span className="play-icon">{isPlaying ? "Ⅱ" : "▶"}</span>
                <span>{isPlaying ? t.reelPause : t.reelPlay}</span>
              </button>
              <span className="reel-time">00:{String(Math.floor(progress * 0.78)).padStart(2, "0")} / 01:18</span>
            </div>
            <div className="reel-controls">
              <span className="reel-control-label">01</span>
              <div className="reel-progress" aria-hidden="true"><span style={{ width: `${progress}%` }} /></div>
              <span className="reel-control-label">06</span>
            </div>
          </div>
          <p className="reel-note">{t.reelNote}<span>↗</span></p>
        </div>
      </section>

      <section className="work-section section-wrap" id="work" aria-labelledby="work-title">
        <div className="section-intro">
          <p className="eyebrow"><span>02</span>{t.selectedKicker}</p>
          <div className="work-heading-grid">
            <h2 id="work-title">{t.selectedTitle.split("\n").map((line) => <span key={line}>{line}</span>)}</h2>
            <p>{t.selectedBody}</p>
          </div>
        </div>

        <div className="filter-panel" aria-label={t.filterBy}>
          <div className="filter-summary">
            <span className="filter-label">{t.filterBy}</span>
            <span className="filter-count">{String(filteredProjects.length).padStart(2, "0")} / 06</span>
          </div>
          <div className="filter-groups">
            <div className="filter-group">
              <span className="filter-group-title">{t.contribution}</span>
              <div className="filter-options">
                {filterGroups.contribution.map((filter) => (
                  <button
                    type="button"
                    key={filter}
                    className={activeContributions.includes(filter) ? "filter-chip is-selected" : "filter-chip"}
                    onClick={() => toggleFilter(filter, "contribution")}
                    aria-pressed={activeContributions.includes(filter)}
                  >{filter}</button>
                ))}
              </div>
            </div>
            <div className="filter-group">
              <span className="filter-group-title">{t.engine}</span>
              <div className="filter-options">
                {filterGroups.engine.map((filter) => (
                  <button
                    type="button"
                    key={filter}
                    className={activeEngines.includes(filter) ? "filter-chip is-selected" : "filter-chip"}
                    onClick={() => toggleFilter(filter, "engine")}
                    aria-pressed={activeEngines.includes(filter)}
                  >{filter}</button>
                ))}
              </div>
            </div>
          </div>
          <button className="clear-filters" type="button" onClick={clearFilters}>
            <span>{t.clear}</span><span>×</span>
          </button>
        </div>

        <div className="project-grid">
          {filteredProjects.map((project) => (
            <article className="project-card" key={project.title}>
              <a href="#contact" className="project-visual-link" aria-label={`${project.title} project details`}>
                <div className={`project-visual project-${project.tone}`}>
                  <div className="project-no">{project.number}</div>
                  <div className="project-mark">{project.mark}</div>
                  <div className="project-visual-detail">{project.engine} / {project.year}</div>
                  <span className="project-open">↗</span>
                </div>
              </a>
              <div className="project-info">
                <div>
                  <p className="project-kicker">{project.subtitle}</p>
                  <h3>{project.title}</h3>
                </div>
                <span className="project-year">{project.year}</span>
              </div>
              <p className="project-description">{project.description[language]}</p>
              <div className="project-tags">
                {project.contributions.map((contribution) => <span key={contribution}>{contribution}</span>)}
                <span className="engine-tag">{project.engine}</span>
              </div>
            </article>
          ))}
        </div>
        {filteredProjects.length === 0 && (
          <div className="empty-state">
            <p>{language === "en" ? "No project matches that combination yet." : "Aucun projet ne correspond encore à cette combinaison."}</p>
            <button type="button" onClick={clearFilters}>{t.clear}</button>
          </div>
        )}
      </section>

      <section className="about-section section-wrap" id="about" aria-labelledby="about-title">
        <div className="about-stamp"><span>03</span><span>ABOUT<br />THE<br />PRACTICE</span></div>
        <div className="about-copy">
          <p className="eyebrow">{t.aboutKicker}</p>
          <h2 id="about-title">{t.aboutTitle.split("\n").map((line) => <span key={line}>{line}</span>)}</h2>
          <p className="about-body">{t.aboutBody}</p>
          <div className="approach-row">
            <span className="approach-label">{t.approach}</span>
            <span className="approach-text">{t.approachBody}</span>
          </div>
        </div>
        <div className="about-visual" aria-hidden="true">
          <div className="about-visual-ring ring-a" />
          <div className="about-visual-ring ring-b" />
          <div className="about-cross cross-a" />
          <div className="about-cross cross-b" />
          <span>ITERATE<br />WITH INTENT</span>
        </div>
      </section>

      <footer className="contact-section section-wrap" id="contact">
        <div className="contact-topline">
          <span className="eyebrow">04 / {t.availability}</span>
          <span className="contact-index">2026—∞</span>
        </div>
        <div className="contact-grid">
          <h2>{t.contactTitle.split("\n").map((line) => <span key={line}>{line}</span>)}</h2>
          <div className="contact-copy">
            <p>{t.contactBody}</p>
            <a className="contact-cta" href="mailto:hello@yourname.dev">
              <span>{t.contactCta}</span><span className="contact-arrow">↗</span>
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>{t.footer}</span>
          <div className="footer-links"><a href="mailto:hello@yourname.dev">Email</a><a href="#reel">Back to top ↑</a></div>
        </div>
      </footer>
    </main>
  );
}
