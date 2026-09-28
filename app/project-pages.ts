export type ProjectMedia = {
  label: string | { en: string; fr: string };
  kind: "video" | "image" | "blueprint";
  /** Relative paths are served from this site; absolute URLs can point to R2, Stream, or another CDN. */
  src?: string;
  /** Optional click-through asset for a higher-resolution or original version. */
  fullSrc?: string;
  poster?: string;
};

const projectMediaPath = (filename: string) => `/media/minimal-rpg/${filename}`;

const imageAsset = (label: ProjectMedia["label"], stem: string): ProjectMedia => ({
  label,
  kind: "image",
  src: projectMediaPath(`${stem}-preview.webp`),
  fullSrc: projectMediaPath(`${stem}-full.webp`),
});

const videoAsset = (label: ProjectMedia["label"], stem: string): ProjectMedia => ({
  label,
  kind: "video",
  src: projectMediaPath(`${stem}-preview.webm`),
  fullSrc: projectMediaPath(`${stem}-full.mp4`),
});

/**
 * Ordered content blocks for a section. Use `blocks` when a section needs
 * paragraphs, lists, and captioned media interleaved in a specific reading
 * order (tagline → media). Sections that only need one paragraph + optional
 * bullets + a trailing media grid can keep using body/bullets/media instead.
 */
export type ProjectSectionBlock =
  | { type: "text"; en: string; fr: string }
  | { type: "list"; en: string[]; fr: string[] }
  | { type: "linklist"; items: { en: string; fr: string; href: string }[] }
  | { type: "link"; en: string; fr: string; href: string }
  | { type: "media"; caption: { en: string; fr: string }; media: ProjectMedia[] };

export type ProjectPageSection = {
  id?: string;
  eyebrow: { en: string; fr: string };
  title: { en: string; fr: string };
  body?: { en: string; fr: string };
  bullets?: { en: string[]; fr: string[] };
  media?: ProjectMedia[];
  blocks?: ProjectSectionBlock[];
};

export type ProjectPageContent = {
  number: string;
  slug: string;
  title: { en: string; fr: string };
  subtitle: { en: string; fr: string };
  year: string;
  engine: string;
  role: { en: string; fr: string };
  status: { en: string; fr: string };
  tone: string;
  mark: string;
  cover?: ProjectMedia;
  intro: { en: string; fr: string };
  facts: { en: string[]; fr: string[] };
  link?: string;
  sections: ProjectPageSection[];
};

const projectPageEntries: ProjectPageContent[] = [
  {
    number: "01",
    slug: "super-maiden-riot",
    title: { en: "Super Maiden Riot", fr: "Super Maiden Riot" },
    subtitle: { en: "Co-op platformer / 10 weeks", fr: "Jeu de plateformes coop / 10 semaines" },
    year: "2026",
    engine: "Unreal Engine 5",
    role: { en: "Systems / Tech design / UX", fr: "Systèmes / Design technique / UX" },
    status: { en: "Released", fr: "Sorti" },
    tone: "maiden",
    mark: "SMR",
    cover: imageAsset("Super Maiden Riot cover", "super-maiden-riot-cover"),
    intro: {
      en: "A symmetrical co-op platformer with two princesses and only three buttons. Each ability had to be easy to understand at a glance.",
      fr: "Un jeu de plateformes coopératif et symétrique avec deux princesses et seulement trois boutons. Chaque habileté devait se comprendre d'un coup d'œil.",
    },
    facts: {
      en: ["Released in April 2026", "Best Game Design — Ubisoft GameLab 2026", "Three other nominations, including Best Prototype"],
      fr: ["Sorti en avril 2026", "Meilleur Game Design — GameLab d'Ubisoft 2026", "Trois autres nominations, dont Meilleur Prototype"],
    },
    link: "https://humble-goats.itch.io/super-maiden-riot",
    sections: [
      {
        eyebrow: { en: "01 / Core systems", fr: "01 / Systèmes centraux" },
        title: { en: "Princess abilities", fr: "Habiletés des princesses" },
        body: {
          en: "I implemented all the abilities for both princesses and made sure they worked well together. Each princess has a movement ability, a way to break blocks, and a way to move the other princess.",
          fr: "J'ai implémenté toutes les habiletés des deux princesses et je me suis assuré qu'elles fonctionnent bien ensemble. Chaque princesse possède une habileté de déplacement, une façon de briser les blocs et une façon de déplacer l'autre princesse.",
        },
        bullets: {
          en: ["Princess 1: punch, dash, and partner interaction", "Princess 2: hair bounce, block breaking, and partner interaction"],
          fr: ["Princesse 1 : coup de poing, ruée et interaction avec sa partenaire", "Princesse 2 : rebond sur les cheveux, bris de blocs et interaction avec sa partenaire"],
        },
        media: [
          videoAsset({ en: "Princess 1 — punch", fr: "Princesse 1 — coup de poing" }, "smr-p1-punch"),
          videoAsset({ en: "Princess 1 — dash", fr: "Princesse 1 — ruée" }, "smr-p1-dash"),
          videoAsset({ en: "Princess 1 — partner interaction", fr: "Princesse 1 — interaction avec la Princesse 2" }, "smr-p1-interaction"),
          videoAsset({ en: "Princess 2 — block break", fr: "Princesse 2 — bris de blocs" }, "smr-p2-break"),
          videoAsset({ en: "Princess 2 — partner interaction", fr: "Princesse 2 — interaction avec la Princesse 1" }, "smr-p2-interaction"),
          videoAsset({ en: "Princess 2 — rebound", fr: "Princesse 2 — rebond" }, "smr-p2-rebound"),
        ],
      },
      {
        eyebrow: { en: "02 / Interface", fr: "02 / Interface" },
        title: { en: "UI / UX", fr: "UI / UX" },
        body: {
          en: "The game only uses A, B, and the D-pad, so menus and prompts had to stay simple. I designed the HUD, a pause menu for each princess, and the main menu flow, along with the Figma wireframes.",
          fr: "Le jeu n'utilise que A, B et la croix directionnelle, donc les menus et les indications devaient rester simples. J'ai conçu le HUD, un menu de pause pour chaque princesse et le flow du menu principal, ainsi que les maquettes Figma.",
        },
        media: [
          videoAsset({ en: "Princess pause menus", fr: "Menus de pause des princesses" }, "smr-pause-menu"),
          videoAsset({ en: "Main menu flow", fr: "Navigation du menu principal" }, "smr-menu-flow"),
        ],
      },
      {
        eyebrow: { en: "03 / Other mechanics", fr: "03 / Autres mécaniques" },
        title: { en: "Animation and other systems", fr: "Animation et autres systèmes" },
        body: {
          en: "I integrated most of the princess animations and built the score, level transition, and character-specific subtitle systems, mostly in Blueprints.",
          fr: "J'ai intégré la majorité des animations des princesses et développé les systèmes de score, de transition entre les niveaux et de sous-titres propres à chaque personnage, principalement avec les Blueprints.",
        },
        media: [
          imageAsset({ en: "Princess 1 Animation Blueprint", fr: "Blueprint d'animation de la Princesse 1" }, "smr-p1-animation-blueprint"),
          imageAsset({ en: "Princess 2 Animation Blueprint", fr: "Blueprint d'animation de la Princesse 2" }, "smr-p2-animation-blueprint"),
          videoAsset({ en: "Character-specific subtitles", fr: "Sous-titres propres à chaque personnage" }, "smr-subtitle"),
        ],
      },
    ],
  },
  {
    number: "03",
    slug: "think-outside-the-disk",
    title: { en: "Think Outside the Disk", fr: "Think Outside the Disk" },
    subtitle: { en: "Perspective-shifting prototype / 72 hours", fr: "Prototype à changement de perspective / 72 heures" },
    year: "2025",
    engine: "Unreal Engine 5",
    role: { en: "Tech design", fr: "Design technique" },
    status: { en: "Released", fr: "Sorti" },
    tone: "disk",
    mark: "TOD",
    cover: imageAsset("Think Outside the Disk cover", "think-outside-disk-thumbnail"),
    intro: {
      en: "A prototype made in 72 hours where the player can switch perspective, which changes the camera, how the character moves, and how each level is solved.",
      fr: "Un prototype réalisé en 72 heures où le joueur peut changer de perspective, ce qui modifie la caméra, les déplacements du personnage et la façon de résoudre chaque niveau.",
    },
    facts: {
      en: ["Released October 2025", "Best Prototype — UQAT internal competition"],
      fr: ["Sorti en octobre 2025", "Meilleur Prototype — concours interne de l'UQAT"],
    },
    link: "https://emyrstudio.itch.io/think-outside-the-disk",
    sections: [
      {
        eyebrow: { en: "01 / Main ability", fr: "01 / Habileté principale" },
        title: { en: "Perspective shift", fr: "Changement de perspective" },
        body: {
          en: "I programmed the sequence that switches the game from one perspective to the other. This included the camera movement, changes to what the character can do, and the sound and music feedback.",
          fr: "J'ai programmé la séquence qui fait passer le jeu d'une perspective à l'autre. Cela comprenait le mouvement de caméra, les changements aux possibilités de mouvement du personnage et le feedback sonore et musical.",
        },
        media: [
          videoAsset("Perspective-shift sequence", "think-outside-disk-perspective-switch"),
          videoAsset("Full playthrough", "think-outside-disk-full-playthrough"),
        ],
      },
      {
        eyebrow: { en: "02 / Environments", fr: "02 / Environnements" },
        title: { en: "Level elements", fr: "Éléments de niveau" },
        body: {
          en: "I also implemented the level elements that use the perspective change: spinning disks for harder jumps, a timed bomb that breaks the door and can reset the level, and platforms that move between two points.",
          fr: "J'ai aussi implémenté les éléments de niveau qui utilisent le changement de perspective : des disques rotatifs pour des sauts plus difficiles, une bombe à retardement qui brise la porte et peut réinitialiser le niveau, et des plateformes qui se déplacent entre deux points.",
        },
        media: [
          videoAsset("Spinning disks", "think-outside-disk-climb-disk"),
          videoAsset("Timed bomb", "think-outside-disk-bomb"),
          videoAsset("Moving platforms", "think-outside-disk-moving-platform"),
        ],
      },
      {
        eyebrow: { en: "03 / Short analysis", fr: "03 / Courte analyse" },
        title: { en: "Making the camera shift smooth", fr: "Un changement de caméra fluide" },
        body: {
          en: "We used a very compressed perspective camera instead of an orthographic one to keep a 3D look. During the shift, the camera moves back about 3,000 metres while zooming in by the same amount, so we had to tune the curves carefully to avoid a visible jump.",
          fr: "Nous avons utilisé une caméra en perspective très écrasée plutôt qu'une caméra orthographique pour garder un rendu 3D. Pendant le changement, la caméra recule d'environ 3 000 mètres tout en zoomant d'autant, donc nous avons dû régler les courbes avec soin pour éviter une saccade.",
        },
      },
    ],
  },
  {
    number: "04",
    slug: "drylite",
    title: { en: "Drylite", fr: "Drylite" },
    subtitle: { en: "Weapon systems prototype / on hold", fr: "Prototype de systèmes d'armes / en pause" },
    year: "2026",
    engine: "Unreal Engine 5",
    role: { en: "Systems / Tech design", fr: "Systèmes / Design technique" },
    status: { en: "On hold", fr: "En pause" },
    tone: "drylite",
    mark: "DRY",
    intro: {
      en: "An Unreal prototype built around configurable weapons, modular attachments, a basic enemy AI, and an inventory.",
      fr: "Un prototype Unreal construit autour d'armes configurables, d'attaches modulaires, d'une IA ennemie simple et d'un inventaire.",
    },
    facts: {
      en: ["Started April 2026", "Full gun system + UI flow", "Project currently on hold"],
      fr: ["Commencé en avril 2026", "Système d'armes complet + flow UI", "Projet actuellement en pause"],
    },
    sections: [
      {
        eyebrow: { en: "01 / Firearms", fr: "01 / Fusils" },
        title: { en: "Firearms", fr: "Fusils" },
        body: {
          en: "I built the firearms in Blueprints, with real projectiles instead of hitscan. Each weapon is defined by data, so tuning an existing weapon or adding a new one is quick.",
          fr: "J'ai créé les fusils dans les Blueprints, avec de vrais projectiles plutôt que du hitscan. Chaque arme est définie par des données, ce qui rend rapide l'équilibrage d'une arme existante ou l'ajout d'une nouvelle.",
        },
        media: [
          imageAsset("Main firearm Blueprint", "drylite-gun-blueprint"),
          imageAsset("Weapon statistics", "drylite-gun-stats"),
          videoAsset("AK and Deagle test", "drylite-ak-deagle-test"),
        ],
      },
      {
        eyebrow: { en: "02 / Inventory", fr: "02 / Inventaire" },
        title: { en: "Inventory", fr: "Inventaire" },
        body: {
          en: "The HUD sends a request to the inventory, which holds the player's items. I used the Gameplay Message Subsystem so the widgets don't depend on each other directly, and Common UI so only one menu is open at a time.",
          fr: "Le HUD envoie une requête à l'inventaire, qui contient les objets du joueur. J'ai utilisé le Gameplay Message Subsystem pour que les widgets ne dépendent pas directement les uns des autres, et Common UI pour qu'un seul menu soit ouvert à la fois.",
        },
        media: [
          imageAsset("HUD → inventory request", "drylite-message-sender"),
          imageAsset("Inventory response", "drylite-message-receiver"),
          videoAsset("Complete inventory flow", "drylite-inventory-showcase"),
        ],
      },
      {
        eyebrow: { en: "03 / Enemy AI", fr: "03 / IA ennemie" },
        title: { en: "Enemy AI", fr: "IA ennemie" },
        body: {
          en: "The first enemy moves toward the player, fires a laser at close range, waits briefly, then starts chasing again. I used Behaviour Trees so the behaviour is easy to read and to expand later.",
          fr: "Le premier ennemi s'approche du joueur, tire un laser à courte portée, attend brièvement puis reprend sa poursuite. J'ai utilisé les Behaviour Trees pour que le comportement soit facile à lire et à enrichir plus tard.",
        },
        media: [
          videoAsset("Enemy behavior", "drylite-enemy-showcase"),
          imageAsset("Enemy Behaviour Tree", "drylite-behaviour-tree"),
        ],
      },
      {
        eyebrow: { en: "04 / Attachments", fr: "04 / Attaches" },
        title: { en: "Attachments", fr: "Attaches" },
        body: {
          en: "I helped design a system that turns enemy parts into weapon attachments that keep the look of the enemy they came from. One concept is a mechanical hand that holds the rifle as an extra arm.",
          fr: "J'ai participé au design d'un système qui transforme des parties d'ennemis en attaches d'armes qui gardent l'apparence de l'ennemi d'origine. Un des concepts est une main mécanique qui tient le fusil comme un bras supplémentaire.",
        },
        media: [imageAsset("Attachment concepts", "drylite-attachments")],
      },
    ],
  },
  {
    number: "05",
    slug: "graphic-design-projects",
    title: { en: "Graphic Design Projects", fr: "Projets de design graphique" },
    subtitle: { en: "UX and communication design", fr: "Design UX et communication" },
    year: "2026",
    engine: "Figma",
    role: { en: "UX", fr: "UX" },
    status: { en: "Selected work", fr: "Projets choisis" },
    tone: "graphic",
    mark: "UX",
    intro: {
      en: "Interface redesigns for a government website and a sell sheet for a board game.",
      fr: "Des refontes d'interface pour un site gouvernemental et une feuille de vente pour un jeu de société.",
    },
    facts: {
      en: ["Office of the Commissioner of Official Languages", "Mobile and timeline navigation", "Board-game sell sheet"],
      fr: ["Commissariat aux langues officielles", "Navigation mobile et ligne du temps", "Feuille de vente pour un jeu de société"],
    },
    sections: [
      {
        eyebrow: { en: "01 / Interface redesign", fr: "01 / Refonte d'interface" },
        title: { en: "Official Languages website", fr: "Site des langues officielles" },
        body: {
          en: "For the Office of the Commissioner of Official Languages website, I redesigned the mobile header and navigation menu. I also reworked the timeline navigation to make it more interesting for a younger audience.",
          fr: "Pour le site du Commissariat aux langues officielles, j'ai refait le header et le menu de navigation sur mobile. J'ai aussi retravaillé la navigation de la ligne du temps pour la rendre plus intéressante pour un public jeune.",
        },
        media: [
          imageAsset("Mobile header — before", "graphic-clo-ocol-header-avant"),
          imageAsset("Mobile header — after", "graphic-clo-ocol-header-apres"),
          imageAsset("Mobile navigation — before", "graphic-clo-ocol-nav-avant"),
          imageAsset("Mobile navigation — after", "graphic-clo-ocol-nav-apres"),
          imageAsset("Timeline navigation — before", "graphic-clo-ocol-chrono-avant"),
          imageAsset("Timeline navigation — after", "graphic-clo-ocol-chrono-apres"),
        ],
      },
      {
        eyebrow: { en: "02 / Communication", fr: "02 / Communication" },
        title: { en: "Board game sell sheet", fr: "Feuille de vente" },
        body: {
          en: "I made a sell sheet for a board game, meant to show what makes the game worth playing at a glance.",
          fr: "J'ai réalisé une feuille de vente pour un jeu de société, pensée pour montrer l'intérêt du jeu en un coup d'œil.",
        },
        media: [imageAsset("Sell sheet", "graphic-sell-sheet")],
      },
    ],
  },
  {
    number: "02",
    slug: "minimal-rpg",
    title: { en: "Minimal RPG", fr: "Minimal RPG" },
    subtitle: { en: "Solo RPG / since 2024", fr: "RPG en solo / depuis 2024" },
    year: "2026",
    engine: "Unity",
    role: { en: "Solo developer — design, programming, art, publishing", fr: "Développeur solo — design, programmation, art, publication" },
    status: { en: "Demo on Steam", fr: "Démo sur Steam" },
    tone: "minimalrpg",
    mark: "MRP",
    cover: imageAsset("Minimal RPG cover", "minimal-rpg-cover"),
    intro: {
      en: "A solo project inspired by Nodebuster, with RPG-style progression and mechanics. I made the whole game and most of its art, from the production tools to the Steam demo.",
      fr: "Un projet solo inspiré de Nodebuster, avec une progression et des mécaniques de type RPG. J'ai réalisé tout le jeu et la majorité de son art, des outils de production jusqu'à la démo sur Steam.",
    },
    facts: {
      en: ["Solo developer", "In development since October 2024", "Demo available on Steam", "Planned release Q1 2027"],
      fr: ["Développeur solo", "En développement depuis octobre 2024", "Démo disponible sur Steam", "Sortie prévue T1 2027"],
    },
    link: "https://store.steampowered.com/app/3661570/Minimal_RPG/",
    sections: [
      {
        id: "contributions",
        eyebrow: { en: "01", fr: "01" },
        title: { en: "Contributions", fr: "Contributions" },
        blocks: [
          {
            type: "text",
            en: "I developed this project entirely on my own. The goal was to create a game inspired by Nodebuster, while adding RPG-inspired progression and mechanics.",
            fr: "J'ai réalisé ce projet entièrement seul. L'objectif était de créer un jeu inspiré de Nodebuster, tout en y ajoutant une progression et des mécaniques inspirées des RPG.",
          },
          {
            type: "text",
            en: "The aspects I'm most proud of are:",
            fr: "Les aspects dont je suis le plus fier sont les suivants :",
          },
          {
            type: "linklist",
            items: [
              { en: "The development tools I built to speed up production.", fr: "Les outils de développement que j'ai créés pour accélérer la production.", href: "#programming" },
              { en: "The progression system and its balancing.", fr: "Le système de progression et son équilibrage.", href: "#design-progression" },
              { en: "The user interface (UI).", fr: "L'interface utilisateur (UI).", href: "#user-interface" },
              { en: "The Steam publishing process.", fr: "Le processus de publication sur Steam.", href: "#steam-publishing" },
            ],
          },
          {
            type: "text",
            en: "Beyond that, I programmed the entire game and created most of the art assets, with the exception of a few UI decorations.",
            fr: "En plus de cela, j'ai développé l'ensemble du jeu et réalisé la majorité des éléments artistiques, à l'exception de quelques ornements de l'interface.",
          },
        ],
      },
      {
        id: "programming",
        eyebrow: { en: "02", fr: "02" },
        title: { en: "Programming", fr: "Programmation" },
        blocks: [
          {
            type: "text",
            en: "Among all the systems in the project, four stand out the most:",
            fr: "Parmi tous les systèmes du projet, quatre se démarquent particulièrement :",
          },
          {
            type: "list",
            en: [
              "The enemy behavior system. Although it appears simple on the surface, it was designed to be modular, allowing a wide variety of enemies to be created from the same core behaviors.",
              "The upgrade system, built entirely around ScriptableObjects. I also developed several custom editor tools to make creating and modifying upgrades much faster.",
              "The player statistics system, which serves as the foundation for many of the game's mechanics.",
              "More broadly, my extensive use of ScriptableObjects to build flexible, reusable, and easily maintainable systems.",
            ],
            fr: [
              "Le système de comportements des ennemis. Bien qu'il paraisse simple en surface, il est conçu de manière modulaire et permet de créer une grande variété d'ennemis à partir des mêmes bases.",
              "Le système d'améliorations, entièrement basé sur des ScriptableObjects. J'ai également développé plusieurs outils d'éditeur afin de simplifier leur création et leur modification.",
              "Le système de statistiques du joueur, qui centralise et alimente l'ensemble des mécaniques du jeu.",
              "De manière plus générale, mon utilisation des ScriptableObjects afin de créer des systèmes flexibles, réutilisables et faciles à maintenir.",
            ],
          },
          {
            type: "media",
            caption: {
              en: "Screenshot of the upgrade editor.",
              fr: "Capture de l'éditeur des améliorations.",
            },
            media: [{ label: { en: "Upgrade editor", fr: "Éditeur d'améliorations" }, kind: "image", src: "/media/minimal-rpg/upgrade-scriptable-object-preview.webp", fullSrc: "/media/minimal-rpg/upgrade-scriptable-object-full.webp" }],
          },
          {
            type: "media",
            caption: {
              en: "Video showcasing different enemy behaviors (this scene is only intended as a showcase and is not an actual level): a wyvern egg, a charging boar, a bird that shoots projectiles at the player, and a slime that splits into multiple smaller slimes.",
              fr: "Vidéo présentant différents comportements d'ennemis (cette scène sert uniquement de démonstration et ne représente pas un véritable niveau) : un œuf de wyverne, un sanglier qui rue, un oiseau qui tire des projectiles sur le joueur et un slime qui se divise en plusieurs slimes.",
            },
            media: [{ label: { en: "Enemy behaviors (not real level, for showcase)", fr: "Comportements d'ennemis (démonstration, pas un vrai niveau)" }, kind: "video", src: "/media/minimal-rpg/enemy-types-preview.webm", fullSrc: "/media/minimal-rpg/enemy-types-full.mp4" }],
          },
          {
            type: "media",
            caption: {
              en: "Videos showcasing different systems built using ScriptableObjects.",
              fr: "Vidéos présentant différents systèmes utilisant des ScriptableObjects.",
            },
            media: [{ label: { en: "ScriptableObject systems", fr: "Systèmes ScriptableObject" }, kind: "video", src: "/media/minimal-rpg/scriptable-objects-preview.webm", fullSrc: "/media/minimal-rpg/scriptable-objects-full.mp4" }],
          },
        ],
      },
      {
        id: "design-progression",
        eyebrow: { en: "03", fr: "03" },
        title: { en: "Game Design & Progression", fr: "Design et progression" },
        blocks: [
          {
            type: "text",
            en: "I designed the entire game using Milanote, a tool similar to Miro. Every major system had its own documentation, making iteration much easier.",
            fr: "J'ai conçu l'intégralité du design du jeu sur Milanote, un outil similaire à Miro. Chaque système possédait sa propre documentation afin de faciliter les itérations.",
          },
          {
            type: "text",
            en: "The upgrade system, in particular, had dedicated pages for each class, listing every available upgrade and its progression.",
            fr: "Le système d'améliorations, en particulier, disposait d'une page dédiée pour chacune des classes, répertoriant l'ensemble des améliorations disponibles ainsi que leur progression.",
          },
          {
            type: "media",
            caption: {
              en: "Screenshots of Milanote pages.",
              fr: "Captures de pages Milanote.",
            },
            media: [
              { label: { en: "Class pages", fr: "Pages des classes" }, kind: "image", src: "/media/minimal-rpg/milanote-classes-preview.webp", fullSrc: "/media/minimal-rpg/milanote-classes-full.webp" },
              { label: { en: "Enemy lab", fr: "Laboratoire d'ennemis" }, kind: "image", src: "/media/minimal-rpg/milanote-enemy-lab-preview.webp", fullSrc: "/media/minimal-rpg/milanote-enemy-lab-full.webp" },
            ],
          },
          {
            type: "text",
            en: "I also used Excel spreadsheets to balance each class throughout different stages of the game's progression.",
            fr: "J'ai également utilisé une feuille Excel afin d'équilibrer chaque classe à différents moments de la progression.",
          },
          {
            type: "media",
            caption: {
              en: "Screenshot of the balancing spreadsheet.",
              fr: "Capture de la feuille Excel.",
            },
            media: [{ label: { en: "Balancing spreadsheet", fr: "Feuille d'équilibrage" }, kind: "image", src: "/media/minimal-rpg/excel-balancing-preview.webp", fullSrc: "/media/minimal-rpg/excel-balancing-full.webp" }],
          },
        ],
      },
      {
        id: "user-interface",
        eyebrow: { en: "04", fr: "04" },
        title: { en: "User Interface", fr: "Interface utilisateur" },
        blocks: [
          {
            type: "text",
            en: "Most of the interface was designed in Figma, while the icons were created in Inkscape.",
            fr: "J'ai conçu la majorité de l'interface dans Figma, puis créé les icônes dans Inkscape.",
          },
          {
            type: "text",
            en: "When designing each screen, I relied on visual hierarchy principles to naturally guide the player's attention toward the most important information.",
            fr: "Lors de la conception des différents écrans, je me suis appuyé sur les principes de hiérarchie visuelle afin de guider naturellement le regard du joueur et de mettre en avant les informations importantes.",
          },
          {
            type: "media",
            caption: {
              en: "Screenshots of various in-game screens.",
              fr: "Captures de différents écrans du jeu.",
            },
            media: [{ label: { en: "Class selection", fr: "Sélection de classe" }, kind: "image", src: "/media/minimal-rpg/class-selection-preview.webp", fullSrc: "/media/minimal-rpg/class-selection-full.webp" }],
          },
        ],
      },
      {
        id: "steam-publishing",
        eyebrow: { en: "05", fr: "05" },
        title: { en: "Steam Publishing", fr: "Publication sur Steam" },
        blocks: [
          {
            type: "text",
            en: "Publishing the game on Steam (currently as a demo) taught me a lot.",
            fr: "Publier le jeu sur Steam (pour le moment sous forme de démo) m'a beaucoup appris.",
          },
          {
            type: "text",
            en: "As part of the process, I created:",
            fr: "J'ai notamment réalisé :",
          },
          {
            type: "list",
            en: ["Promotional capsules and marketing artwork.", "The gameplay trailer.", "The Steam store page description.", "The Steam page setup and publishing."],
            fr: ["Les capsules et visuels promotionnels.", "La bande-annonce (trailer).", "La rédaction de la description de la page Steam.", "La configuration et la mise en ligne de la page Steam."],
          },
          {
            type: "link",
            en: "View Steam page",
            fr: "Voir la page Steam",
            href: "https://store.steampowered.com/app/3661570/Minimal_RPG/",
          },
        ],
      },
    ],
  },
];

export const projectOrder = [
  "super-maiden-riot",
  "minimal-rpg",
  "think-outside-the-disk",
  "drylite",
  "graphic-design-projects",
] as const;

export const projectPages: ProjectPageContent[] = projectOrder.flatMap((slug) => {
  const project = projectPageEntries.find((entry) => entry.slug === slug);
  return project ? [project] : [];
});

export function getProjectPage(slug: string) {
  return projectPages.find((project) => project.slug === slug);
}
