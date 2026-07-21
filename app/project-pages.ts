export type ProjectMedia = {
  label: string;
  kind: "video" | "image" | "blueprint";
};

export type ProjectPageSection = {
  eyebrow: { en: string; fr: string };
  title: { en: string; fr: string };
  body: { en: string; fr: string };
  bullets?: { en: string[]; fr: string[] };
  media?: ProjectMedia[];
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
];

export function getProjectPage(slug: string) {
  return projectPages.find((project) => project.slug === slug);
}
