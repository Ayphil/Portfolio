"use client";

import { useEffect, useMemo, useState } from "react";

type Language = "en" | "fr";
type Engine = "Unreal Engine 5" | "Figma";

type MediaPlaceholder = {
  label: string;
  kind: "video" | "image" | "blueprint";
};

type DetailSection = {
  heading: { en: string; fr: string };
  body?: { en: string; fr: string };
  bullets?: { en: string[]; fr: string[] };
  media?: MediaPlaceholder[];
};

type Project = {
  number: string;
  slug: string;
  title: string;
  subtitle: { en: string; fr: string };
  year: string;
  engine: Engine;
  contributions: string[];
  tone: string;
  mark: string;
  description: { en: string; fr: string };
  facts: { en: string[]; fr: string[] };
  link?: string;
  sections: DetailSection[];
};

const projects: Project[] = [
  {
    number: "01",
    slug: "super-maiden-riot",
    title: "Super Maiden Riot",
    subtitle: { en: "Co-op platformer / 10 weeks", fr: "Jeu de plateformes coop / 10 semaines" },
    year: "2025",
    engine: "Unreal Engine 5",
    contributions: ["Systems", "Tech design", "UX"],
    tone: "maiden",
    mark: "SMR",
    description: {
      en: "A symmetrical co-op platformer built around two princesses, three-button controls, and abilities that must feel instantly readable.",
      fr: "Un jeu de plateformes coopératif et symétrique autour de deux princesses, de trois boutons et d'habiletés immédiatement lisibles.",
    },
    facts: {
      en: ["Released October 2025", "Best Game Design — Ubisoft GameLab 2026", "Best Prototype nominee"],
      fr: ["Sorti en octobre 2025", "Meilleur Game Design — GameLab d'Ubisoft 2026", "Nomination — Meilleur Prototype"],
    },
    link: "https://humble-goats.itch.io/super-maiden-riot",
    sections: [
      {
        heading: { en: "Princess abilities", fr: "Habiletés des princesses" },
        body: {
          en: "I fully implemented the abilities for both princesses, making sure they worked together while staying intuitive for players. Each princess has a movement ability, a way to break blocks, and a way to move the other princess.",
          fr: "J'ai entièrement implémenté les habiletés des deux princesses en m'assurant qu'elles fonctionnent ensemble tout en restant intuitives. Chaque princesse possède une habileté de déplacement, une façon de briser les blocs et une façon de déplacer l'autre princesse.",
        },
        bullets: {
          en: ["Princess 1 — Punch, dash, interaction with Princess 2", "Princess 2 — Hair bounce, block breaking, interaction with Princess 1"],
          fr: ["Princesse 1 — Coup de poing, ruée, interaction avec la Princesse 2", "Princesse 2 — Rebond sur les cheveux, bris de blocs, interaction avec la Princesse 1"],
        },
        media: [
          { label: "Punch / Blueprint", kind: "blueprint" },
          { label: "Dash / Blueprint", kind: "blueprint" },
          { label: "Princess interaction", kind: "video" },
          { label: "Hair bounce / Blueprint", kind: "blueprint" },
          { label: "Block breaking", kind: "video" },
          { label: "Princess interaction", kind: "video" },
        ],
      },
      {
        heading: { en: "UI / UX", fr: "UI / UX" },
        body: {
          en: "I designed the main menu navigation and gallery, the in-game HUD, the pause menus for both princesses, and the supporting UX flows. I also created the wireframes in Figma.",
          fr: "J'ai conçu une partie de la navigation du menu principal et de la galerie, le HUD en jeu, les menus de pause des deux princesses ainsi que les flows UX. J'ai également réalisé les maquettes sur Figma.",
        },
        media: [
          { label: "HUD", kind: "video" },
          { label: "Princess pause menus", kind: "video" },
          { label: "Main menu flow", kind: "video" },
          { label: "Figma wireframes", kind: "image" },
        ],
      },
      {
        heading: { en: "Animation and systems", fr: "Animation et systèmes" },
        body: {
          en: "I integrated most of the princess animations and built the score, level-transition, and character-specific subtitle systems. The implementation was done primarily in Blueprints.",
          fr: "J'ai intégré la majorité des animations des princesses et développé les systèmes de score, de transition entre les niveaux et de sous-titres propres à chaque princesse. L'implémentation a été réalisée principalement avec les Blueprints.",
        },
        media: [
          { label: "Princess 1 animation transitions", kind: "video" },
          { label: "Princess 2 animation transitions", kind: "video" },
          { label: "Princess 2 Animation Blueprint", kind: "blueprint" },
          { label: "Score system", kind: "video" },
        ],
      },
    ],
  },
  {
    number: "02",
    slug: "think-outside-the-disk",
    title: "Think Outside the Disk",
    subtitle: { en: "Perspective-shifting prototype / 72 hours", fr: "Prototype à changement de perspective / 72 heures" },
    year: "2025",
    engine: "Unreal Engine 5",
    contributions: ["Tech design", "Programming"],
    tone: "disk",
    mark: "TOD",
    description: {
      en: "A 72-hour prototype where changing perspective changes movement, camera language, and the way the world is solved.",
      fr: "Un prototype réalisé en 72 heures où changer de perspective transforme le mouvement, la caméra et la façon de résoudre le monde.",
    },
    facts: {
      en: ["Released October 2025", "Best Prototype — UQAT internal competition"],
      fr: ["Sorti en octobre 2025", "Meilleur Prototype — concours interne de l'UQAT"],
    },
    link: "https://emyrstudio.itch.io/think-outside-the-disk",
    sections: [
      {
        heading: { en: "Main character ability", fr: "Habileté du personnage principal" },
        body: {
          en: "I programmed the sequence that shifts the game from one perspective to another. This included camera work, changes to the character's movement possibilities, and feedback through sound and music.",
          fr: "J'ai programmé la séquence qui fait passer le jeu d'une perspective à une autre. Cela incluait le travail de caméra, les changements aux possibilités de mouvement et le feedback sonore et musical.",
        },
        media: [{ label: "Perspective-shift sequence", kind: "video" }],
      },
      {
        heading: { en: "Environments", fr: "Environnements" },
        body: {
          en: "I also implemented the environmental interactions that make the perspective change meaningful during play.",
          fr: "J'ai aussi implémenté les interactions environnementales qui donnent un sens au changement de perspective pendant le jeu.",
        },
        bullets: {
          en: ["Spinning disks for more complex jumps", "A timed bomb that breaks the door and can reset the level", "Platforms that move from point A to point B"],
          fr: ["Des disques rotatifs pour des sauts plus complexes", "Une bombe à retardement qui brise la porte et peut réinitialiser le niveau", "Des plateformes qui se déplacent d'un point A à un point B"],
        },
        media: [
          { label: "Spinning disks", kind: "image" },
          { label: "Timed bomb", kind: "image" },
          { label: "Moving platforms", kind: "image" },
        ],
      },
      {
        heading: { en: "A smooth perspective shift", fr: "Un changement de perspective fluide" },
        body: {
          en: "Because the perspective shift was the core of the game, it needed to feel fluid. We used a highly compressed perspective camera rather than an orthographic camera, then carefully managed the curves as the camera moved back roughly 3,000 metres while zooming by the same amount.",
          fr: "Puisque le changement de perspective était au cœur du jeu, il devait être fluide. Nous avons choisi une caméra en perspective très écrasée plutôt qu'une caméra orthographique, puis géré soigneusement les courbes alors que la caméra reculait d'environ 3 000 mètres tout en zoomant d'autant.",
        },
      },
    ],
  },
  {
    number: "03",
    slug: "drylite",
    title: "Drylite",
    subtitle: { en: "Weapon systems prototype / in progress", fr: "Prototype de systèmes d'armes / en cours" },
    year: "2026",
    engine: "Unreal Engine 5",
    contributions: ["Systems", "Tech design", "Programming"],
    tone: "drylite",
    mark: "DRY",
    description: {
      en: "A data-driven Unreal weapon prototype focused on configurable firearms, modular attachments, enemy AI, and a clean inventory flow.",
      fr: "Un prototype d'armes Unreal piloté par les données, centré sur les fusils configurables, les attaches modulaires, l'IA ennemie et un flow d'inventaire clair.",
    },
    facts: {
      en: ["Started April 2026", "Project currently on hold"],
      fr: ["Commencé en avril 2026", "Projet actuellement en pause"],
    },
    sections: [
      {
        heading: { en: "Complex firearms", fr: "Fusils complexes" },
        body: {
          en: "I worked extensively in Blueprints to create firearms with many editable parameters. The system is data-driven so existing weapons can be tuned and new weapons can be added quickly, while using true projectiles instead of hitscan.",
          fr: "J'ai beaucoup travaillé avec les Blueprints pour créer des fusils comportant de nombreux paramètres modifiables. Le système est piloté par les données afin de faciliter l'équilibrage et l'ajout de nouvelles armes, tout en utilisant de vrais projectiles plutôt que des hitscans.",
        },
        media: [
          { label: "Main firearm Blueprint", kind: "blueprint" },
          { label: "Two contrasting weapons", kind: "image" },
        ],
      },
      {
        heading: { en: "Inventory", fr: "Inventaire" },
        body: {
          en: "I designed a clean and maintainable inventory flow using the Gameplay Message Subsystem and Common UI. Ammunition is stored as additional weapon data, leaving room for future values such as durability or food expiration.",
          fr: "J'ai conçu un flow d'inventaire clair et maintenable avec le Gameplay Message Subsystem et Common UI. Les munitions sont conservées comme données supplémentaires sur l'arme, ce qui laisse la place à des valeurs futures comme la durabilité ou la date d'expiration d'un aliment.",
        },
        media: [
          { label: "HUD → inventory request", kind: "image" },
          { label: "Complete inventory flow", kind: "image" },
        ],
      },
      {
        heading: { en: "Basic enemy AI", fr: "IA ennemie simple" },
        body: {
          en: "The first enemy approaches the player, fires a laser at close range, pauses briefly, and resumes its pursuit. I used Unreal Behaviour Trees to keep the behavior easy to inspect and extend.",
          fr: "Le premier ennemi s'approche du joueur, tire un laser à courte portée, attend brièvement puis reprend sa poursuite. J'ai utilisé les Behaviour Trees d'Unreal afin de garder un comportement facile à inspecter et à étendre.",
        },
        media: [
          { label: "Enemy behavior", kind: "video" },
          { label: "Enemy Behaviour Tree", kind: "blueprint" },
        ],
      },
      {
        heading: { en: "Modular attachments", fr: "Attaches modulaires" },
        body: {
          en: "I participated in the design of a system that turns enemy parts into memorable weapon attachments while preserving their original visual identity. One concept uses a mechanical hand to hold the weapon with an extra arm.",
          fr: "J'ai participé au design d'un système qui transforme des parties d'ennemis en attaches d'armes mémorables tout en conservant leur identité visuelle. Un concept utilise une main mécanique pour tenir l'arme avec un bras supplémentaire.",
        },
        media: [{ label: "Attachment concepts", kind: "image" }, { label: "Mechanical hand concept", kind: "image" }],
      },
    ],
  },
  {
    number: "04",
    slug: "graphic-design-projects",
    title: "Projets de design graphique",
    subtitle: { en: "UX and communication design", fr: "Design UX et communication" },
    year: "2026",
    engine: "Figma",
    contributions: ["UX"],
    tone: "graphic",
    mark: "UX",
    description: {
      en: "A small collection of interface redesigns and a board-game sell sheet, focused on clarity, hierarchy, and audience-appropriate tone.",
      fr: "Une collection de refontes d'interfaces et une feuille de vente pour un jeu de société, centrée sur la clarté, la hiérarchie et le ton adapté au public.",
    },
    facts: {
      en: ["Office of the Commissioner of Official Languages", "Board-game sell sheet"],
      fr: ["Commissariat aux langues officielles", "Feuille de vente pour un jeu de société"],
    },
    sections: [
      {
        heading: { en: "Office of the Commissioner of Official Languages", fr: "Commissariat aux langues officielles" },
        body: {
          en: "I redesigned several parts of the website with a focus on making mobile navigation more useful and making a timeline menu feel more engaging for a younger audience.",
          fr: "J'ai refondu plusieurs aspects du site avec l'objectif de rendre la navigation mobile plus utile et le menu d'une ligne du temps plus engageant pour un public jeune.",
        },
        media: [
          { label: "Mobile header — before", kind: "image" },
          { label: "Mobile header — after", kind: "image" },
          { label: "Mobile navigation — before", kind: "image" },
          { label: "Mobile navigation — after", kind: "image" },
          { label: "Timeline navigation — before", kind: "image" },
          { label: "Timeline navigation — after", kind: "image" },
        ],
      },
      {
        heading: { en: "Board-game sell sheet", fr: "Feuille de vente pour un jeu de société" },
        body: {
          en: "I created a sell sheet designed to communicate the game's value quickly, clearly, and effectively.",
          fr: "J'ai réalisé une feuille de vente conçue pour communiquer rapidement, clairement et efficacement la valeur du jeu.",
        },
        media: [{ label: "Sell sheet", kind: "image" }],
      },
    ],
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
    selectedKicker: "Selected work / 04 projects",
    selectedTitle: "Different worlds.\nSame obsession.",
    selectedBody:
      "I work across UX, systems, and technical design to make ambitious ideas feel inevitable in the hands of a player.",
    filterBy: "Filter by",
    contribution: "Contribution",
    engine: "Tool / engine",
    clear: "Clear all",
    showing: "Showing",
    projects: "projects",
    all: "All work",
    openNotes: "Open project notes",
    closeNotes: "Close project notes",
    visitProject: "Visit project",
    mediaPlaceholder: "Media placeholder",
    aboutKicker: "A little context",
    aboutTitle: "Good design leaves\nroom for discovery.",
    aboutBody:
      "I'm a game designer who likes the space between intention and accident. My practice moves between player research, paper prototypes, systems tuning, and the technical conversations that get ideas into a playable shape.",
    approach: "My approach",
    approachBody: "Observe → simplify → test → make it sing.",
    availability: "Available for select collaborations",
    contactTitle: "Have a world\nin mind?",
    contactBody: "Tell me what you're making. I'd love to hear the messy first version.",
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
    selectedKicker: "Projets choisis / 04 projets",
    selectedTitle: "Des mondes différents.\nLa même obsession.",
    selectedBody:
      "Je travaille en UX, systèmes et design technique pour rendre les idées ambitieuses évidentes entre les mains du joueur.",
    filterBy: "Filtrer par",
    contribution: "Contribution",
    engine: "Outil / moteur",
    clear: "Tout effacer",
    showing: "Afficher",
    projects: "projets",
    all: "Tous les projets",
    openNotes: "Ouvrir les notes du projet",
    closeNotes: "Fermer les notes du projet",
    visitProject: "Voir le projet",
    mediaPlaceholder: "Média à remplacer",
    aboutKicker: "Un peu de contexte",
    aboutTitle: "Le bon design laisse\nplace à la découverte.",
    aboutBody:
      "Je suis game designer et j'aime l'espace entre l'intention et l'accident. Ma pratique navigue entre recherche joueur, prototypes papier, équilibrage des systèmes et conversations techniques pour donner une forme jouable aux idées.",
    approach: "Ma méthode",
    approachBody: "Observer → simplifier → tester → faire chanter.",
    availability: "Disponible pour quelques collaborations",
    contactTitle: "Un monde\nen tête?",
    contactBody: "Parlez-moi de ce que vous créez. J'aimerais voir la première version, même brouillonne.",
    contactCta: "Ouvrir la conversation",
    footer: "Game design, systèmes et impossibilités bien choisies.",
  },
};

const filterGroups = {
  contribution: ["UX", "Systems", "Tech design", "Programming"],
  engine: ["Unreal Engine 5", "Figma"],
};

function MediaPlaceholderCard({ media, label }: { media: MediaPlaceholder; label: string }) {
  return (
    <div className={`media-placeholder media-${media.kind}`} role="img" aria-label={`${label}: ${media.label}`}>
      <span className="media-placeholder-index">{media.kind === "video" ? "▶" : media.kind === "blueprint" ? "BP" : "IMG"}</span>
      <span className="media-placeholder-label">{media.label}</span>
      <span className="media-placeholder-note">{label}</span>
    </div>
  );
}

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
      const contributionMatch = activeContributions.every((filter) => project.contributions.includes(filter));
      const engineMatch = activeEngines.length === 0 || activeEngines.includes(project.engine);
      return contributionMatch && engineMatch;
    });
  }, [activeContributions, activeEngines]);

  const toggleFilter = (filter: string, group: "contribution" | "engine") => {
    const setter = group === "contribution" ? setActiveContributions : setActiveEngines;
    setter((current) => current.includes(filter) ? current.filter((item) => item !== filter) : [...current, filter]);
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
          <button className="language-toggle" type="button" onClick={() => setLanguage((current) => current === "en" ? "fr" : "en")} aria-label="Switch language">
            <span className={language === "en" ? "is-active" : ""}>EN</span><span className="language-divider">/</span><span className={language === "fr" ? "is-active" : ""}>FR</span>
          </button>
        </div>
      </header>

      <section className="hero-section" id="reel" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow"><span>01</span>{t.kicker}</p>
          <h1 id="hero-title">{t.heroTitle.split("\n").map((line) => <span key={line}>{line}</span>)}</h1>
          <p className="hero-body">{t.heroBody}</p>
          <a className="text-link" href="#work"><span>{t.heroCta}</span><span className="link-arrow">↘</span></a>
        </div>

        <div className="reel-column">
          <div className="reel-frame">
            <div className="reel-meta"><span>{t.reelLabel}</span><span className="reel-live"><i /> {isPlaying ? "PLAYING" : "LOOP"}</span></div>
            <div className={`reel-visual ${isPlaying ? "is-playing" : ""}`}>
              <div className="reel-orbit orbit-one" /><div className="reel-orbit orbit-two" /><div className="reel-grid" />
              <div className="reel-slice slice-one" /><div className="reel-slice slice-two" /><div className="reel-slice slice-three" />
              <div className="reel-word">PLAY<br /><span>THE</span><br />SYSTEM</div>
              <div className="reel-corner corner-top">A / 04</div><div className="reel-corner corner-bottom">FEELING<br />IS A RULE</div>
              <button className="reel-play" type="button" onClick={() => setIsPlaying((current) => !current)} aria-label={isPlaying ? t.reelPause : t.reelPlay}>
                <span className="play-icon">{isPlaying ? "Ⅱ" : "▶"}</span><span>{isPlaying ? t.reelPause : t.reelPlay}</span>
              </button>
              <span className="reel-time">00:{String(Math.floor(progress * 0.78)).padStart(2, "0")} / 01:18</span>
            </div>
            <div className="reel-controls"><span className="reel-control-label">01</span><div className="reel-progress" aria-hidden="true"><span style={{ width: `${progress}%` }} /></div><span className="reel-control-label">04</span></div>
          </div>
          <p className="reel-note">{t.reelNote}<span>↖</span></p>
        </div>
      </section>

      <section className="work-section section-wrap" id="work" aria-labelledby="work-title">
        <div className="section-intro">
          <p className="eyebrow"><span>02</span>{t.selectedKicker}</p>
          <div className="work-heading-grid"><h2 id="work-title">{t.selectedTitle.split("\n").map((line) => <span key={line}>{line}</span>)}</h2><p>{t.selectedBody}</p></div>
        </div>

        <div className="filter-panel" aria-label={t.filterBy}>
          <div className="filter-summary"><span className="filter-label">{t.filterBy}</span><span className="filter-count">{String(filteredProjects.length).padStart(2, "0")} / 04</span></div>
          <div className="filter-groups">
            <div className="filter-group"><span className="filter-group-title">{t.contribution}</span><div className="filter-options">{filterGroups.contribution.map((filter) => <button type="button" key={filter} className={activeContributions.includes(filter) ? "filter-chip is-selected" : "filter-chip"} onClick={() => toggleFilter(filter, "contribution")} aria-pressed={activeContributions.includes(filter)}>{filter}</button>)}</div></div>
            <div className="filter-group"><span className="filter-group-title">{t.engine}</span><div className="filter-options">{filterGroups.engine.map((filter) => <button type="button" key={filter} className={activeEngines.includes(filter) ? "filter-chip is-selected" : "filter-chip"} onClick={() => toggleFilter(filter, "engine")} aria-pressed={activeEngines.includes(filter)}>{filter}</button>)}</div></div>
          </div>
          <button className="clear-filters" type="button" onClick={clearFilters}><span>{t.clear}</span><span>×</span></button>
        </div>

        <div className="project-grid">
          {filteredProjects.map((project) => (
            <article className="project-card" key={project.title} id={`project-${project.slug}`}>
              <a href={project.link ?? `#project-${project.slug}`} className="project-visual-link" target={project.link ? "_blank" : undefined} rel={project.link ? "noreferrer" : undefined} aria-label={`${project.title} project details`}>
                <div className={`project-visual project-${project.tone}`}><div className="project-no">{project.number}</div><div className="project-mark">{project.mark}</div><div className="project-visual-detail">{project.engine} / {project.year}</div><span className="project-open">↗</span></div>
              </a>
              <div className="project-info"><div><p className="project-kicker">{project.subtitle[language]}</p><h3>{project.title}</h3></div><span className="project-year">{project.year}</span></div>
              <p className="project-description">{project.description[language]}</p>
              <div className="project-tags">{project.contributions.map((contribution) => <span key={contribution}>{contribution}</span>)}<span className="engine-tag">{project.engine}</span></div>
              <div className="project-facts">{project.facts[language].map((fact) => <span key={fact}>{fact}</span>)}</div>
              <details className="project-details">
                <summary><span className="details-open">{t.openNotes}</span><span className="details-close">{t.closeNotes}</span><span className="details-plus">+</span></summary>
                <div className="project-detail-content">
                  {project.sections.map((section) => <section className="detail-section" key={section.heading.en}><h4>{section.heading[language]}</h4>{section.body && <p>{section.body[language]}</p>}{section.bullets && <ul>{section.bullets[language].map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}{section.media && <div className="media-grid">{section.media.map((media) => <MediaPlaceholderCard key={media.label} media={media} label={t.mediaPlaceholder} />)}</div>}</section>)}
                  {project.link && <a className="detail-project-link" href={project.link} target="_blank" rel="noreferrer">{t.visitProject}<span>↗</span></a>}
                </div>
              </details>
            </article>
          ))}
        </div>
        {filteredProjects.length === 0 && <div className="empty-state"><p>{language === "en" ? "No project matches that combination yet." : "Aucun projet ne correspond encore à cette combinaison."}</p><button type="button" onClick={clearFilters}>{t.clear}</button></div>}
      </section>

      <section className="about-section section-wrap" id="about" aria-labelledby="about-title">
        <div className="about-stamp"><span>03</span><span>ABOUT<br />THE<br />PRACTICE</span></div>
        <div className="about-copy"><p className="eyebrow">{t.aboutKicker}</p><h2 id="about-title">{t.aboutTitle.split("\n").map((line) => <span key={line}>{line}</span>)}</h2><p className="about-body">{t.aboutBody}</p><div className="approach-row"><span className="approach-label">{t.approach}</span><span className="approach-text">{t.approachBody}</span></div></div>
        <div className="about-visual" aria-hidden="true"><div className="about-visual-ring ring-a" /><div className="about-visual-ring ring-b" /><div className="about-cross cross-a" /><div className="about-cross cross-b" /><span>ITERATE<br />WITH INTENT</span></div>
      </section>

      <footer className="contact-section section-wrap" id="contact">
        <div className="contact-topline"><span className="eyebrow">04 / {t.availability}</span><span className="contact-index">2026—∞</span></div>
        <div className="contact-grid"><h2>{t.contactTitle.split("\n").map((line) => <span key={line}>{line}</span>)}</h2><div className="contact-copy"><p>{t.contactBody}</p><a className="contact-cta" href="mailto:hello@yourname.dev"><span>{t.contactCta}</span><span className="contact-arrow">↗</span></a></div></div>
        <div className="footer-bottom"><span>{t.footer}</span><div className="footer-links"><a href="mailto:hello@yourname.dev">Email</a><a href="#reel">Back to top ↑</a></div></div>
      </footer>
    </main>
  );
}
