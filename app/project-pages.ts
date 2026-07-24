export type ProjectMedia = {
  label: string;
  kind: "video" | "image" | "blueprint";
  /** Relative paths are served from this site; absolute URLs can point to R2, Stream, or another CDN. */
  src?: string;
  /** Optional click-through asset for a higher-resolution or original version. */
  fullSrc?: string;
  poster?: string;
};

/**
 * Ordered content blocks for a section. Use `blocks` when a section needs
 * paragraphs, lists, and captioned media interleaved in a specific reading
 * order (tagline → media). Sections that only need one paragraph + optional
 * bullets + a trailing media grid can keep using body/bullets/media instead.
 */
export type ProjectSectionBlock =
  | { type: "text"; en: string; fr: string }
  | { type: "list"; en: string[]; fr: string[] }
  | { type: "media"; caption: { en: string; fr: string }; media: ProjectMedia[] };

export type ProjectPageSection = {
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
  intro: { en: string; fr: string };
  facts: { en: string[]; fr: string[] };
  link?: string;
  sections: ProjectPageSection[];
};

export const projectPages: ProjectPageContent[] = [
  {
    number: "01",
    slug: "super-maiden-riot",
    title: { en: "Super Maiden Riot", fr: "Super Maiden Riot" },
    subtitle: { en: "Co-op platformer / 10 weeks", fr: "Jeu de plateformes coop / 10 semaines" },
    year: "2025",
    engine: "Unreal Engine 5",
    role: { en: "Systems / Tech design / UX", fr: "Systèmes / Design technique / UX" },
    status: { en: "Released", fr: "Sorti" },
    tone: "maiden",
    mark: "SMR",
    intro: {
      en: "A symmetrical co-op platformer built around two princesses, a restricted three-button control scheme, and abilities that need to read instantly.",
      fr: "Un jeu de plateformes coopératif et symétrique autour de deux princesses, d'un schéma de contrôle limité à trois boutons et d'habiletés immédiatement lisibles.",
    },
    facts: {
      en: ["Released October 2025", "Best Game Design — Ubisoft GameLab 2026", "Best Prototype nominee"],
      fr: ["Sorti en octobre 2025", "Meilleur Game Design — GameLab d'Ubisoft 2026", "Nomination — Meilleur Prototype"],
    },
    link: "https://humble-goats.itch.io/super-maiden-riot",
    sections: [
      {
        eyebrow: { en: "01 / Core systems", fr: "01 / Systèmes centraux" },
        title: { en: "Abilities built for symmetry", fr: "Des habiletés pensées pour la symétrie" },
        body: {
          en: "I fully implemented the abilities for both princesses and designed them to work as a readable pair. Each character has a movement ability, a way to break blocks, and a way to move the other princess — the same categories, expressed through different verbs.",
          fr: "J'ai entièrement implémenté les habiletés des deux princesses et je les ai conçues comme une paire lisible. Chaque personnage possède une habileté de déplacement, une façon de briser les blocs et une façon de déplacer l'autre princesse — les mêmes catégories, exprimées par des verbes différents.",
        },
        bullets: {
          en: ["Princess 1: punch, dash, and partner interaction", "Princess 2: hair bounce, block breaking, and partner interaction"],
          fr: ["Princesse 1 : coup de poing, ruée et interaction avec sa partenaire", "Princesse 2 : rebond sur les cheveux, bris de blocs et interaction avec sa partenaire"],
        },
        media: [{ label: "Punch / Blueprint", kind: "blueprint" }, { label: "Dash / Blueprint", kind: "blueprint" }, { label: "Princess interactions", kind: "video" }],
      },
      {
        eyebrow: { en: "02 / Interface", fr: "02 / Interface" },
        title: { en: "Less input, more clarity", fr: "Moins d'entrées, plus de clarté" },
        body: {
          en: "With only A, B, and the D-pad available, every prompt and menu transition had to carry its weight. I designed the HUD, the unique pause menus, the main-menu flow, and the supporting Figma wireframes.",
          fr: "Avec seulement A, B et la croix directionnelle, chaque invite et chaque transition de menu devait être utile. J'ai conçu le HUD, les menus de pause propres à chaque princesse, le flow du menu principal et les maquettes Figma associées.",
        },
        media: [{ label: "HUD", kind: "video" }, { label: "Princess pause menus", kind: "video" }, { label: "Main menu flow", kind: "video" }, { label: "Figma wireframes", kind: "image" }],
      },
      {
        eyebrow: { en: "03 / Supporting systems", fr: "03 / Systèmes complémentaires" },
        title: { en: "Making the moment feel good", fr: "Rendre le moment agréable" },
        body: {
          en: "I integrated most of the princess animations and built the score, level-transition, and character-specific subtitle systems. I also observed playtests to understand which interactions felt natural before committing them to Blueprints.",
          fr: "J'ai intégré la majorité des animations des princesses et développé les systèmes de score, de transition entre les niveaux et de sous-titres propres à chaque personnage. J'ai aussi observé des tests de jeu pour comprendre quelles interactions semblaient naturelles avant de les fixer dans les Blueprints.",
        },
        media: [{ label: "Animation transitions", kind: "video" }, { label: "Princess 2 Animation Blueprint", kind: "blueprint" }, { label: "Score system", kind: "video" }],
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
    role: { en: "Tech design", fr: "Design technique" },
    status: { en: "Released", fr: "Sorti" },
    tone: "disk",
    mark: "TOD",
    intro: {
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
        eyebrow: { en: "01 / Main ability", fr: "01 / Habileté principale" },
        title: { en: "A shift you can feel", fr: "Un changement que l'on ressent" },
        body: {
          en: "I programmed the sequence that shifts the game from one perspective to another. That meant coordinating camera movement, changing the character's movement possibilities, and using sound and music as a second feedback channel.",
          fr: "J'ai programmé la séquence qui fait passer le jeu d'une perspective à une autre. Il fallait coordonner le mouvement de caméra, modifier les possibilités de mouvement du personnage et utiliser le son et la musique comme second canal de feedback.",
        },
        media: [{ label: "Perspective-shift sequence", kind: "video" }],
      },
      {
        eyebrow: { en: "02 / Environments", fr: "02 / Environnements" },
        title: { en: "The level reacts too", fr: "Le niveau réagit aussi" },
        body: {
          en: "The environment had to make the perspective change useful rather than merely spectacular. I implemented spinning disks, the timed bomb that opens the next door, and moving platforms that establish a clear rhythm through each level.",
          fr: "L'environnement devait rendre le changement de perspective utile plutôt que simplement spectaculaire. J'ai implémenté les disques rotatifs, la bombe à retardement qui ouvre la prochaine porte et les plateformes mobiles qui donnent un rythme clair à chaque niveau.",
        },
        media: [{ label: "Spinning disks", kind: "image" }, { label: "Timed bomb", kind: "image" }, { label: "Moving platforms", kind: "image" }],
      },
      {
        eyebrow: { en: "03 / Short analysis", fr: "03 / Courte analyse" },
        title: { en: "Keeping a 3,000-metre camera move smooth", fr: "Garder fluide un mouvement de caméra de 3 000 mètres" },
        body: {
          en: "We used a highly compressed perspective camera rather than an orthographic camera to preserve the 3D feeling. During the shift, the camera moves back roughly 3,000 metres while zooming by the same amount, so the transition curves needed careful tuning to avoid a noticeable hitch.",
          fr: "Nous avons choisi une caméra en perspective très écrasée plutôt qu'une caméra orthographique pour préserver l'effet 3D. Pendant le changement, la caméra recule d'environ 3 000 mètres tout en zoomant d'autant, ce qui demandait des courbes soigneusement réglées pour éviter une saccade.",
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
    role: { en: "Systems / Tech design", fr: "Systèmes / Design technique" },
    status: { en: "On hold", fr: "En pause" },
    tone: "drylite",
    mark: "DRY",
    intro: {
      en: "A data-driven Unreal weapon prototype focused on configurable firearms, modular attachments, enemy AI, and a clean inventory flow.",
      fr: "Un prototype d'armes Unreal piloté par les données, centré sur les fusils configurables, les attaches modulaires, l'IA ennemie et un flow d'inventaire clair.",
    },
    facts: {
      en: ["Started April 2026", "Full gun system + UI flow", "Project currently on hold"],
      fr: ["Commencé en avril 2026", "Système d'armes complet + flow UI", "Projet actuellement en pause"],
    },
    sections: [
      {
        eyebrow: { en: "01 / Firearms", fr: "01 / Fusils" },
        title: { en: "Weapons as editable data", fr: "Des armes définies par les données" },
        body: {
          en: "I built configurable firearms in Blueprints with true projectiles rather than hitscan. The weapons are data-driven so tuning an existing rifle or adding a new one does not require rebuilding the system around it.",
          fr: "J'ai créé des fusils configurables dans les Blueprints avec de vrais projectiles plutôt que des hitscans. Les armes sont pilotées par les données afin de faciliter l'équilibrage d'un fusil existant ou l'ajout d'une nouvelle arme sans reconstruire le système.",
        },
        media: [{ label: "Main firearm Blueprint", kind: "blueprint" }, { label: "Two contrasting weapons", kind: "image" }],
      },
      {
        eyebrow: { en: "02 / Inventory", fr: "02 / Inventaire" },
        title: { en: "A UI flow that stays maintainable", fr: "Un flow UI qui reste maintenable" },
        body: {
          en: "The HUD sends a request to an inventory that owns the player's item list. I used the Gameplay Message Subsystem to keep widgets decoupled and Common UI to keep only one foreground interface active at a time.",
          fr: "Le HUD envoie une requête à un inventaire qui contient la liste des objets du joueur. J'ai utilisé le Gameplay Message Subsystem pour découpler les widgets et Common UI pour ne garder qu'une seule interface au premier plan.",
        },
        media: [{ label: "HUD → inventory request", kind: "image" }, { label: "Complete inventory flow", kind: "image" }],
      },
      {
        eyebrow: { en: "03 / Enemy AI", fr: "03 / IA ennemie" },
        title: { en: "Simple behaviour, clear extension points", fr: "Un comportement simple, facile à étendre" },
        body: {
          en: "The first enemy approaches the player, fires a laser at close range, pauses briefly, and resumes the chase. Behaviour Trees keep the current behaviour visible while leaving space for future tests.",
          fr: "Le premier ennemi s'approche du joueur, tire un laser à courte portée, attend brièvement puis reprend sa poursuite. Les Behaviour Trees rendent le comportement actuel lisible tout en laissant de la place aux tests futurs.",
        },
        media: [{ label: "Enemy behavior", kind: "video" }, { label: "Enemy Behaviour Tree", kind: "blueprint" }],
      },
      {
        eyebrow: { en: "04 / Attachments", fr: "04 / Attaches" },
        title: { en: "Strange parts with a visual identity", fr: "Des pièces étranges avec une identité visuelle" },
        body: {
          en: "I helped design a system that turns enemy parts into memorable weapon attachments while preserving their original visual identity. One concept uses a mechanical hand to hold the rifle with an extra arm.",
          fr: "J'ai participé au design d'un système qui transforme des parties d'ennemis en attaches mémorables tout en conservant leur identité visuelle. Un concept utilise une main mécanique pour tenir le fusil avec un bras supplémentaire.",
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
    role: { en: "UX", fr: "UX" },
    status: { en: "Selected work", fr: "Projets choisis" },
    tone: "graphic",
    mark: "UX",
    intro: {
      en: "A small collection of interface redesigns and a board-game sell sheet, focused on clarity, hierarchy, and an audience-appropriate tone.",
      fr: "Une collection de refontes d'interfaces et une feuille de vente pour un jeu de société, centrée sur la clarté, la hiérarchie et un ton adapté au public.",
    },
    facts: {
      en: ["Office of the Commissioner of Official Languages", "Mobile and timeline navigation", "Board-game sell sheet"],
      fr: ["Commissariat aux langues officielles", "Navigation mobile et ligne du temps", "Feuille de vente pour un jeu de société"],
    },
    sections: [
      {
        eyebrow: { en: "01 / Interface redesign", fr: "01 / Refonte d'interface" },
        title: { en: "Making mobile navigation feel intentional", fr: "Rendre la navigation mobile intentionnelle" },
        body: {
          en: "For the Office of the Commissioner of Official Languages website, I redesigned the mobile header and navigation menu, then reworked a timeline navigation pattern to feel more engaging for a younger audience.",
          fr: "Pour le site du Commissariat aux langues officielles, j'ai refondu le header et le menu de navigation sur mobile, puis repensé une navigation de ligne du temps pour la rendre plus engageante auprès d'un public jeune.",
        },
        media: [{ label: "Mobile header — before", kind: "image" }, { label: "Mobile header — after", kind: "image" }, { label: "Mobile navigation — before", kind: "image" }, { label: "Mobile navigation — after", kind: "image" }, { label: "Timeline navigation — before", kind: "image" }, { label: "Timeline navigation — after", kind: "image" }],
      },
      {
        eyebrow: { en: "02 / Communication", fr: "02 / Communication" },
        title: { en: "A sell sheet that gets to the point", fr: "Une feuille de vente qui va droit au but" },
        body: {
          en: "I created a board-game sell sheet with a clear hierarchy and a concise visual rhythm, designed to communicate the game's value quickly and effectively.",
          fr: "J'ai réalisé une feuille de vente pour un jeu de société avec une hiérarchie claire et un rythme visuel concis, afin de communiquer rapidement et efficacement la valeur du jeu.",
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
    role: { en: "Solo developer — design, programming, art, publishing", fr: "Développeur solo — design, programmation, art, publication" },
    status: { en: "Demo on Steam", fr: "Démo sur Steam" },
    tone: "minimalrpg",
    mark: "MRP",
    intro: {
      en: "A solo project inspired by Nodebuster, extended with RPG-style progression and mechanics. I built the entire game and most of its art, from custom production tools all the way to the Steam launch.",
      fr: "Un projet solo inspiré de Nodebuster, enrichi d'une progression et de mécaniques de type RPG. J'ai développé l'ensemble du jeu et la majorité de son art, des outils de production maison jusqu'au lancement sur Steam.",
    },
    facts: {
      en: ["Solo developer", "15 months of development", "Demo available on Steam", "Planned release Q1 2027"],
      fr: ["Développeur solo", "15 mois de développement", "Démo disponible sur Steam", "Sortie prévue T1 2027"],
    },
    link: "https://store.steampowered.com/app/3661570/Minimal_RPG/",
    sections: [
      {
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
            type: "list",
            en: ["The development tools I built to speed up production.", "The progression system and its balancing.", "The user interface (UI).", "The Steam publishing process."],
            fr: ["Les outils de développement que j'ai créés pour accélérer la production.", "Le système de progression et son équilibrage.", "L'interface utilisateur (UI).", "Le processus de publication sur Steam."],
          },
          {
            type: "text",
            en: "Beyond that, I programmed the entire game and created most of the art assets, with the exception of a few UI decorations.",
            fr: "En plus de cela, j'ai développé l'ensemble du jeu et réalisé la majorité des éléments artistiques, à l'exception de quelques ornements de l'interface.",
          },
        ],
      },
      {
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
            media: [{ label: "Upgrade editor", kind: "image", src: "/media/minimal-rpg/upgrade-scriptable-object-preview.webp", fullSrc: "/media/minimal-rpg/upgrade-scriptable-object-full.webp" }],
          },
          {
            type: "media",
            caption: {
              en: "Video showcasing different enemy behaviors (this scene is only intended as a showcase and is not an actual level): a wyvern egg, a charging boar, a bird that shoots projectiles at the player, and a slime that splits into multiple smaller slimes.",
              fr: "Vidéo présentant différents comportements d'ennemis (cette scène sert uniquement de démonstration et ne représente pas un véritable niveau) : un œuf de wyverne, un sanglier qui rue, un oiseau qui tire des projectiles sur le joueur et un slime qui se divise en plusieurs slimes.",
            },
            media: [{ label: "Enemy behaviors (not real level, for showcase)", kind: "video", src: "/media/minimal-rpg/enemy-types-preview.webm", fullSrc: "/media/minimal-rpg/enemy-types-full.mp4" }],
          },
          {
            type: "media",
            caption: {
              en: "Videos showcasing different systems built using ScriptableObjects.",
              fr: "Vidéos présentant différents systèmes utilisant des ScriptableObjects.",
            },
            media: [{ label: "ScriptableObject systems", kind: "video", src: "/media/minimal-rpg/scriptable-objects-preview.webm", fullSrc: "/media/minimal-rpg/scriptable-objects-full.mp4" }],
          },
        ],
      },
      {
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
              { label: "Class pages", kind: "image", src: "/media/minimal-rpg/milanote-classes-preview.webp", fullSrc: "/media/minimal-rpg/milanote-classes-full.webp" },
              { label: "Enemy lab", kind: "image", src: "/media/minimal-rpg/milanote-enemy-lab-preview.webp", fullSrc: "/media/minimal-rpg/milanote-enemy-lab-full.webp" },
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
            media: [{ label: "Balancing spreadsheet", kind: "image", src: "/media/minimal-rpg/excel-balancing-preview.webp", fullSrc: "/media/minimal-rpg/excel-balancing-full.webp" }],
          },
        ],
      },
      {
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
            media: [{ label: "Class selection", kind: "image", src: "/media/minimal-rpg/class-selection-preview.webp", fullSrc: "/media/minimal-rpg/class-selection-full.webp" }],
          },
        ],
      },
      {
        eyebrow: { en: "05", fr: "05" },
        title: { en: "Steam Publishing", fr: "Publication sur Steam" },
        blocks: [
          {
            type: "text",
            en: "Publishing the game on Steam (currently as a demo) has been a valuable learning experience.",
            fr: "Publier le jeu sur Steam (pour le moment sous forme de démo) a été une excellente expérience.",
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
        ],
      },
    ],
  },
];

export function getProjectPage(slug: string) {
  return projectPages.find((project) => project.slug === slug);
}
