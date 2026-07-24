"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { MouseEvent as ReactMouseEvent } from "react";
import { useLanguage } from "./language";
import { getProjectPage } from "./project-pages";
import type { ProjectMedia } from "./project-pages";

type Engine = "Unreal Engine 5" | "Unity" | "Figma";
type Contribution = "UX" | "Systems" | "Tech design" | "Solo dev";

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
  title: { en: string; fr: string };
  subtitle: { en: string; fr: string };
  year: string;
  engine: Engine;
  contributions: Contribution[];
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
    title: { en: "Super Maiden Riot", fr: "Super Maiden Riot" },
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
    title: { en: "Think Outside the Disk", fr: "Think Outside the Disk" },
    subtitle: { en: "Perspective-shifting prototype / 72 hours", fr: "Prototype à changement de perspective / 72 heures" },
    year: "2025",
    engine: "Unreal Engine 5",
    contributions: ["Tech design"],
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
    title: { en: "Drylite", fr: "Drylite" },
    subtitle: { en: "Weapon systems prototype / in progress", fr: "Prototype de systèmes d'armes / en cours" },
    year: "2026",
    engine: "Unreal Engine 5",
    contributions: ["Systems", "Tech design"],
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
    title: { en: "Graphic Design Projects", fr: "Projets de design graphique" },
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
  {
    number: "05",
    slug: "minimal-rpg",
    title: { en: "Minimal RPG", fr: "Minimal RPG" },
    subtitle: { en: "Solo RPG / 15 months", fr: "RPG en solo / 15 mois" },
    year: "2026",
    engine: "Unity",
    contributions: ["Solo dev", "Systems", "UX"],
    tone: "minimalrpg",
    mark: "MRP",
    description: {
      en: "A solo project inspired by Nodebuster, extended with RPG-style progression and mechanics. I built the entire game and most of its art, from custom production tools all the way to the Steam launch.",
      fr: "Un projet solo inspiré de Nodebuster, enrichi d'une progression et de mécaniques de type RPG. J'ai développé l'ensemble du jeu et la majorité de son art, des outils de production maison jusqu'au lancement sur Steam.",
    },
    facts: {
      en: ["Solo project — 15 months", "Demo available on Steam", "Planned release Q1 2027"],
      fr: ["Projet solo — 15 mois", "Démo disponible sur Steam", "Sortie prévue T1 2027"],
    },
    link: "https://store.steampowered.com/app/3661570/Minimal_RPG/",
    sections: [
      {
        heading: { en: "Programming", fr: "Programmation" },
        body: {
          en: "Three systems stand out: a modular enemy behavior system that builds many enemy types from the same core behaviors, an upgrade system built entirely on ScriptableObjects with custom editor tools, and a player statistics system that centralizes and feeds nearly every mechanic in the game.",
          fr: "Trois systèmes se démarquent : un système de comportements d'ennemis modulaire qui crée de nombreux types à partir des mêmes bases, un système d'améliorations entièrement basé sur des ScriptableObjects avec des outils d'éditeur maison, et un système de statistiques du joueur qui centralise et alimente presque toutes les mécaniques du jeu.",
        },
        bullets: {
          en: ["Modular enemy behaviors", "ScriptableObject-driven upgrades with custom editor tools", "Central player statistics system"],
          fr: ["Comportements d'ennemis modulaires", "Améliorations pilotées par ScriptableObjects avec outils d'éditeur", "Système central de statistiques du joueur"],
        },
        media: [{ label: "Upgrade editor", kind: "image" }, { label: "Enemy types", kind: "video" }, { label: "Player stats system", kind: "image" }],
      },
      {
        heading: { en: "Design & progression", fr: "Design et progression" },
        body: {
          en: "I designed the whole game in Milanote, giving every major system its own documentation. The upgrade system had a dedicated page per class, and I balanced each class across different stages of the game using Excel spreadsheets.",
          fr: "J'ai conçu l'intégralité du jeu sur Milanote, en donnant à chaque système majeur sa propre documentation. Le système d'améliorations disposait d'une page par classe, et j'ai équilibré chaque classe à différents moments de la progression à l'aide de feuilles Excel.",
        },
        media: [{ label: "Milanote — systems overview", kind: "image" }, { label: "Milanote — class upgrades", kind: "image" }, { label: "Excel balancing sheet", kind: "image" }],
      },
      {
        heading: { en: "User interface", fr: "Interface utilisateur" },
        body: {
          en: "Most of the interface was designed in Figma, with the icons created in Inkscape. I relied on visual-hierarchy principles to guide the player's attention naturally toward the most important information.",
          fr: "La majorité de l'interface a été conçue dans Figma, et les icônes créées dans Inkscape. Je me suis appuyé sur les principes de hiérarchie visuelle afin de guider naturellement l'attention du joueur vers les informations les plus importantes.",
        },
        media: [{ label: "Main menu", kind: "image" }, { label: "Upgrade screen", kind: "image" }, { label: "In-game HUD", kind: "image" }],
      },
      {
        heading: { en: "Steam publishing", fr: "Publication sur Steam" },
        body: {
          en: "Publishing the game on Steam — currently as a demo — was a valuable learning experience. I created the capsules and promotional artwork, produced the gameplay trailer, wrote the store description, and configured and published the Steam page myself.",
          fr: "Publier le jeu sur Steam — pour l'instant sous forme de démo — a été une expérience très formatrice. J'ai réalisé les capsules et visuels promotionnels, produit la bande-annonce, rédigé la description et configuré puis mis en ligne la page Steam moi-même.",
        },
        media: [{ label: "Steam capsule", kind: "image" }, { label: "Gameplay trailer", kind: "video" }, { label: "Steam store page", kind: "image" }],
      },
    ],
  },
];

const copy = {
  en: {
    nav: { reel: "Reel", work: "Selected work", about: "About", contact: "Contact", cv: "CV" },
    heroTitle: "Emmanuel Cyr",
    heroBody: "Tech Design, UX design and Systems",
    heroCta: "Explore the work",
    reelPlay: "Play demo reel",
    reelPause: "Stop demo reel",
    selectedKicker: "Selected work / 05 projects",
    selectedTitle: "Different worlds.\nSame drive.",
    selectedBody:
      "I work across UX, systems, and technical design to make ambitious ideas feel inevitable in the hands of a player.",
    filterBy: "Filter by",
    contribution: "Contribution",
    contributionLabels: { UX: "UX", Systems: "Systems", "Tech design": "Tech design", "Solo dev": "Solo dev" },
    engine: "Tool / engine",
    clear: "Clear all",
    showing: "Showing",
    projects: "projects",
    all: "All work",
    aboutKicker: "A little context",
    aboutTitle: "About me.",
    aboutBody:
      "I'm Emmanuel, a bilingual game design student based in Montréal. I move between player research, paper prototypes, systems tuning, and the technical conversations that get ideas into a playable shape. Outside of games, I spend time canot-camping, hiking, running, and camping.",
    background: "Background",
    backgroundItems: [
      { label: "Education", value: "B.A. in video game creation, design concentration — UQAT / 2025–present" },
      { label: "Web and content", value: "Webmaster assistant — Office of the Commissioner of Official Languages / May 2024–June 2025" },
      { label: "Published work", value: "Minimal RPG — Steam / October 2024–present" },
      { label: "Recognition", value: "Ubisoft Game Lab — Best Game Design; three additional nominations / 2026" },
      { label: "Languages", value: "French first language / English bilingual" },
    ],
    approach: "My approach",
    approachBody: "Observe → simplify → test → make it sing.",
    availability: "Available for select collaborations",
    contactTitle: "Have a world\nin mind?",
    contactBody: "Tell me what you're making. I'd love to hear the messy first version.",
    contactCta: "Start a conversation",
    footer: "Game design, systems, and the good kind of impossible.",
    linkedin: "LinkedIn",
    cv: "View CV",
    backToTop: "Back to top ↑",
  },
  fr: {
    nav: { reel: "Reel", work: "Projets choisis", about: "À propos", contact: "Contact", cv: "CV" },
    heroTitle: "Emmanuel Cyr",
    heroBody: "Design technique, design UX et systèmes",
    heroCta: "Voir les projets",
    reelPlay: "Lancer le demo reel",
    reelPause: "Arrêter le demo reel",
    selectedKicker: "Projets choisis / 05 projets",
    selectedTitle: "Différents mondes,\nLa même passion.",
    selectedBody:
      "Je travaille en UX, systèmes et design technique pour rendre les idées ambitieuses évidentes entre les mains du joueur.",
    filterBy: "Filtrer par",
    contribution: "Contribution",
    contributionLabels: { UX: "UX", Systems: "Systèmes", "Tech design": "Design technique", "Solo dev": "Développement solo" },
    engine: "Outil / moteur",
    clear: "Tout effacer",
    showing: "Afficher",
    projects: "projets",
    all: "Tous les projets",
    aboutKicker: "Un peu de contexte",
    aboutTitle: "À propos de moi.",
    aboutBody:
      "Je m'appelle Emmanuel et j'étudie le design de jeux vidéo à l'UQAT. Je navigue entre la recherche joueur, les prototypes papier, l'équilibrage des systèmes et les conversations techniques qui donnent une forme jouable aux idées. En dehors des jeux, j'aime le canot-camping, la randonnée, la course et le camping.",
    background: "Parcours",
    backgroundItems: [
      { label: "Éducation", value: "Baccalauréat en création de jeux vidéo, concentration Design — UQAT / 2025–aujourd'hui" },
      { label: "Web et contenu", value: "Assistant au webmestre — Commissariat aux langues officielles / mai 2024–juin 2025" },
      { label: "Projet publié", value: "Minimal RPG — Steam / octobre 2024–aujourd'hui" },
      { label: "Reconnaissance", value: "Ubisoft Game Lab — Meilleur Game Design; trois autres nominations / 2026" },
      { label: "Langues", value: "Français langue première / anglais bilingue" },
    ],
    approach: "Ma méthode",
    approachBody: "Observer → simplifier → tester → faire chanter.",
    availability: "Disponible pour quelques collaborations",
    contactTitle: "Un monde\nen tête?",
    contactBody: "Parlez-moi de ce que vous créez. J'aimerais voir la première version, même brouillonne.",
    contactCta: "Ouvrir la conversation",
    footer: "Game design, systèmes et impossibilités bien choisies.",
    linkedin: "LinkedIn",
    cv: "Voir le CV",
    backToTop: "Retour en haut ↑",
  },
};

const filterGroups = {
  contribution: ["UX", "Systems", "Tech design", "Solo dev"] as Contribution[],
  engine: ["Unreal Engine 5", "Unity", "Figma"] as Engine[],
};

const withBasePath = (path: string) => `/Portfolio${path}`;

const isRemoteMedia = (path: string) => /^https?:\/\//i.test(path);
const resolveMediaUrl = (path: string) => (isRemoteMedia(path) ? path : withBasePath(path.startsWith("/") ? path : `/${path}`));

type HoverMediaItem = { src: string; poster?: string; kind: "video" | "image" };

/** Collect the real (src-backed) preview media for a project, in reading order, for the hover reel. */
function collectHoverMedia(slug: string): HoverMediaItem[] {
  const page = getProjectPage(slug);
  if (!page) return [];

  const items: HoverMediaItem[] = [];
  const pushMedia = (media?: ProjectMedia[]) => {
    media?.forEach((entry) => {
      if (!entry.src) return;
      items.push({
        src: resolveMediaUrl(entry.src),
        poster: entry.poster ? resolveMediaUrl(entry.poster) : undefined,
        kind: entry.kind === "video" ? "video" : "image",
      });
    });
  };

  page.sections.forEach((section) => {
    pushMedia(section.media);
    section.blocks?.forEach((block) => {
      if (block.type === "media") pushMedia(block.media);
    });
  });

  return items;
}

function ProjectHoverReel({ items, active }: { items: HoverMediaItem[]; active: boolean }) {
  const [index, setIndex] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  // Restart from the first slide whenever the hover ends so the next hover is fresh.
  useEffect(() => {
    if (!active) setIndex(0);
  }, [active]);

  // Auto-advance through the media while hovered (respects reduced-motion).
  useEffect(() => {
    if (!active || items.length <= 1) return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % items.length);
    }, 2400);
    return () => window.clearInterval(id);
  }, [active, items.length]);

  // Only the visible slide's video should play.
  useEffect(() => {
    videoRefs.current.forEach((video, slide) => {
      if (!video) return;
      if (active && slide === index) {
        video.currentTime = 0;
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
  }, [active, index]);

  return (
    <div className={active ? "project-reel is-active" : "project-reel"} aria-hidden="true">
      <div className="project-reel-track" style={{ transform: `translateX(-${index * 100}%)` }}>
        {items.map((item, slide) => (
          <div className="project-reel-slide" key={item.src}>
            {item.kind === "video" ? (
              <video
                ref={(el) => {
                  videoRefs.current[slide] = el;
                }}
                src={item.src}
                poster={item.poster}
                muted
                loop
                playsInline
                preload="metadata"
                tabIndex={-1}
              />
            ) : (
              <img src={item.src} alt="" loading="lazy" />
            )}
          </div>
        ))}
      </div>
      {items.length > 1 && (
        <div className="project-reel-dots">
          {items.map((item, slide) => (
            <span key={item.src} className={slide === index ? "is-on" : ""} />
          ))}
        </div>
      )}
    </div>
  );
}

function ProjectVisual({ project, language }: { project: Project; language: "en" | "fr" }) {
  const items = useMemo(() => collectHoverMedia(project.slug), [project.slug]);
  const [active, setActive] = useState(false);

  return (
    <a
      href={withBasePath(`/projects/${project.slug}`)}
      className="project-visual-link"
      aria-label={`${project.title[language]} project details`}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onFocus={() => setActive(true)}
      onBlur={() => setActive(false)}
    >
      <div className={`project-visual project-${project.tone}`}>
        <div className="project-no">{project.number}</div>
        <div className="project-mark">{project.mark}</div>
        <div className="project-visual-detail">{project.engine} / {project.year}</div>
        {items.length > 0 && <ProjectHoverReel items={items} active={active} />}
        <span className="project-open">↗</span>
      </div>
    </a>
  );
}

export default function Home() {
  const [language, setLanguage] = useLanguage();
  const [activeContributions, setActiveContributions] = useState<Contribution[]>([]);
  const [activeEngines, setActiveEngines] = useState<Engine[]>([]);
  const [isPlaying, setIsPlaying] = useState(true);
  const reelPlayerRef = useRef<HTMLVideoElement>(null);
  const t = copy[language];

  useEffect(() => {
    const video = reelPlayerRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;
    video.loop = true;
    video.volume = 0;

    const startPlayback = () => {
      video.muted = true;
      video.volume = 0;
      video.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    };
    const handleEnded = () => {
      video.currentTime = 0;
      startPlayback();
    };

    video.addEventListener("ended", handleEnded);

    if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
      startPlayback();
    } else {
      video.addEventListener("canplay", startPlayback, { once: true });
    }

    return () => {
      video.removeEventListener("canplay", startPlayback);
      video.removeEventListener("ended", handleEnded);
    };
  }, []);

  const toggleReel = () => {
    const video = reelPlayerRef.current;
    if (!video) return;

    if (!video.paused) {
      video.pause();
      video.currentTime = 0;
      setIsPlaying(false);
      return;
    }

    if (video.ended) video.currentTime = 0;
    video.muted = true;
    video.volume = 0;
    video.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
  };

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const contributionMatch = activeContributions.every((filter) => project.contributions.includes(filter));
      const engineMatch = activeEngines.length === 0 || activeEngines.includes(project.engine);
      return contributionMatch && engineMatch;
    });
  }, [activeContributions, activeEngines]);

  const toggleContributionFilter = (filter: Contribution) => {
    setActiveContributions((current) => current.includes(filter) ? current.filter((item) => item !== filter) : [...current, filter]);
  };

  const toggleEngineFilter = (filter: Engine) => {
    setActiveEngines((current) => current.includes(filter) ? current.filter((item) => item !== filter) : [...current, filter]);
  };

  const clearFilters = () => {
    setActiveContributions([]);
    setActiveEngines([]);
  };

  const handleSectionLink = (event: ReactMouseEvent<HTMLAnchorElement>) => {
    const href = event.currentTarget.getAttribute("href");
    if (!href?.startsWith("#")) return;

    const target = document.getElementById(href.slice(1));
    if (!target) return;

    event.preventDefault();
    window.history.pushState(null, "", href);
    window.scrollTo({
      top: target.getBoundingClientRect().top + window.scrollY,
      behavior: "auto",
    });
  };

  return (
    <main className="site-shell">
      <div className="intro-window">
      <header className="site-header">
        <a className="brand" href="#reel" onClick={handleSectionLink} aria-label="Back to top">
          <span className="brand-text">game design<br />portfolio</span>
        </a>
        <nav className="main-nav" aria-label="Primary navigation">
          <a href="#reel" onClick={handleSectionLink}>{t.nav.reel}</a>
          <a href="#work" onClick={handleSectionLink}>{t.nav.work}</a>
          <a href="#about" onClick={handleSectionLink}>{t.nav.about}</a>
          <a href="#contact" onClick={handleSectionLink}>{t.nav.contact}</a>
          <a href={withBasePath("/CV_Emmanuel_Cyr.pdf")} target="_blank" rel="noreferrer">{t.nav.cv}</a>
        </nav>
        <div className="header-tools">
          <button className="language-toggle" type="button" onClick={() => setLanguage((current) => current === "en" ? "fr" : "en")} aria-label="Switch language">
            <span className={language === "en" ? "is-active" : ""}>EN</span><span className="language-divider">/</span><span className={language === "fr" ? "is-active" : ""}>FR</span>
          </button>
        </div>
      </header>

      <section className="hero-section" id="reel" aria-labelledby="hero-title">
        <div className="hero-copy">
          <h1 id="hero-title">{t.heroTitle.split("\n").map((line) => <span key={line}>{line}</span>)}</h1>
          <p className="hero-body">{t.heroBody}</p>
          <a className="text-link" href="#work" onClick={handleSectionLink}><span>{t.heroCta}</span><span className="link-arrow">↘</span></a>
        </div>

        <div className="reel-column">
          <div className="reel-frame">
            <div className="reel-visual">
              <video
                ref={reelPlayerRef}
                className="reel-video"
                src={withBasePath("/demo-reel.mp4")}
                poster={withBasePath("/demo-reel-poster.jpg")}
                title="Emmanuel Cyr demo reel"
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                aria-hidden="true"
                tabIndex={-1}
              />
              <div className="reel-video-shade" aria-hidden="true" />
              <button className="reel-play" type="button" onClick={toggleReel} aria-label={isPlaying ? t.reelPause : t.reelPlay}>
                <span className="play-icon">{isPlaying ? "Ⅱ" : "▶"}</span><span>{isPlaying ? t.reelPause : t.reelPlay}</span>
              </button>
            </div>
          </div>
        </div>
      </section>
      </div>

      <section className="work-section section-wrap" id="work" aria-labelledby="work-title">
        <div className="section-intro">
          <p className="eyebrow"><span>01</span>{t.selectedKicker}</p>
          <div className="work-heading-grid"><h2 id="work-title">{t.selectedTitle.split("\n").map((line) => <span key={line}>{line}</span>)}</h2><p>{t.selectedBody}</p></div>
        </div>

        <div className="filter-panel" aria-label={t.filterBy}>
          <div className="filter-summary"><span className="filter-label">{t.filterBy}</span><span className="filter-count">{String(filteredProjects.length).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}</span></div>
          <div className="filter-groups">
            <div className="filter-group"><span className="filter-group-title">{t.contribution}</span><div className="filter-options">{filterGroups.contribution.map((filter) => <button type="button" key={filter} className={activeContributions.includes(filter) ? "filter-chip is-selected" : "filter-chip"} onClick={() => toggleContributionFilter(filter)} aria-pressed={activeContributions.includes(filter)}>{t.contributionLabels[filter]}</button>)}</div></div>
            <div className="filter-group"><span className="filter-group-title">{t.engine}</span><div className="filter-options">{filterGroups.engine.map((filter) => <button type="button" key={filter} className={activeEngines.includes(filter) ? "filter-chip is-selected" : "filter-chip"} onClick={() => toggleEngineFilter(filter)} aria-pressed={activeEngines.includes(filter)}>{filter}</button>)}</div></div>
          </div>
          <button className="clear-filters" type="button" onClick={clearFilters}><span>{t.clear}</span><span>×</span></button>
        </div>

        <div className="project-grid">
          {filteredProjects.map((project) => (
            <article className="project-card" key={project.slug} id={`project-${project.slug}`}>
              <ProjectVisual project={project} language={language} />
              <div className="project-info"><div><p className="project-kicker">{project.subtitle[language]}</p><a className="project-title-link" href={withBasePath(`/projects/${project.slug}`)}><h3>{project.title[language]}</h3></a></div><span className="project-year">{project.year}</span></div>
              <p className="project-description">{project.description[language]}</p>
              <div className="project-tags">{project.contributions.map((contribution) => <span key={contribution}>{t.contributionLabels[contribution]}</span>)}<span className="engine-tag">{project.engine}</span></div>
              <div className="project-facts">{project.facts[language].map((fact) => <span key={fact}>{fact}</span>)}</div>
            </article>
          ))}
        </div>
        {filteredProjects.length === 0 && <div className="empty-state"><p>{language === "en" ? "No project matches that combination yet." : "Aucun projet ne correspond encore à cette combinaison."}</p><button type="button" onClick={clearFilters}>{t.clear}</button></div>}
      </section>

      <section className="about-section section-wrap" id="about" aria-labelledby="about-title">
        <div className="about-stamp"><span>02</span><span>ABOUT<br />THE<br />PRACTICE</span></div>
        <div className="about-copy"><p className="eyebrow">{t.aboutKicker}</p><h2 id="about-title">{t.aboutTitle.split("\n").map((line) => <span key={line}>{line}</span>)}</h2><p className="about-body">{t.aboutBody}</p><div className="about-facts" aria-label={t.background}>{t.backgroundItems.map((item) => <div className="about-fact" key={item.label}><span>{item.label}</span><strong>{item.value}</strong></div>)}</div><div className="about-links"><a href="https://store.steampowered.com/app/3661570/Minimal_RPG/" target="_blank" rel="noreferrer">Minimal RPG / Steam <span>↗</span></a><a href="https://www.linkedin.com/in/emmanuelcyr/" target="_blank" rel="noreferrer">{t.linkedin} <span>↗</span></a><a href={withBasePath("/CV_Emmanuel_Cyr.pdf")} target="_blank" rel="noreferrer">{t.cv} <span>↗</span></a></div><div className="approach-row"><span className="approach-label">{t.approach}</span><span className="approach-text">{t.approachBody}</span></div></div>
        <div className="about-visual" aria-hidden="true"><div className="about-visual-ring ring-a" /><div className="about-visual-ring ring-b" /><div className="about-cross cross-a" /><div className="about-cross cross-b" /><span>ITERATE<br />WITH INTENT</span></div>
      </section>

      <footer className="contact-section section-wrap" id="contact">
        <div className="contact-topline"><span className="eyebrow">03 / {t.availability}</span><span className="contact-index">2026—∞</span></div>
        <div className="contact-grid"><h2>{t.contactTitle.split("\n").map((line) => <span key={line}>{line}</span>)}</h2><div className="contact-copy"><p>{t.contactBody}</p><a className="contact-cta" href="mailto:emmanuel.cyr159@gmail.com"><span>{t.contactCta}</span><span className="contact-arrow">↗</span></a></div></div>
        <div className="footer-bottom"><span>{t.footer}</span><div className="footer-links"><a href="mailto:emmanuel.cyr159@gmail.com">Email</a><a href="https://www.linkedin.com/in/emmanuelcyr/" target="_blank" rel="noreferrer">{t.linkedin}</a><a href={withBasePath("/CV_Emmanuel_Cyr.pdf")} target="_blank" rel="noreferrer">{t.cv}</a><a href="#reel" onClick={handleSectionLink}>{t.backToTop}</a></div></div>
      </footer>
    </main>
  );
}
