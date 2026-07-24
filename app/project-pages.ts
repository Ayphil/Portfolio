export type ProjectMedia = {
  label: string;
  kind: "video" | "image" | "blueprint";
  /** Relative paths are served from this site; absolute URLs can point to R2, Stream, or another CDN. */
  src?: string;
  poster?: string;
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
      en: "A solo project inspired by Nodebuster, extended with RPG-style progression and mechanics. I built the entire game and most of its art — from custom production tools all the way to the Steam launch.",
      fr: "Un projet solo inspiré de Nodebuster, enrichi d'une progression et de mécaniques de type RPG. J'ai développé l'ensemble du jeu et la majorité de son art — des outils de production maison jusqu'au lancement sur Steam.",
    },
    facts: {
      en: ["Solo developer", "15 months of development", "Demo available on Steam", "Planned release Q1 2027"],
      fr: ["Développeur solo", "15 mois de développement", "Démo disponible sur Steam", "Sortie prévue T1 2027"],
    },
    link: "https://store.steampowered.com/app/3661570/Minimal_RPG/",
    sections: [
      {
        eyebrow: { en: "01 / Programming", fr: "01 / Programmation" },
        title: { en: "Three systems doing the heavy lifting", fr: "Trois systèmes qui portent le jeu" },
        body: {
          en: "Three systems stand out. The enemy behavior system looks simple on the surface but is modular, so a wide variety of enemies grows from the same core behaviors. The upgrade system is built entirely on ScriptableObjects, backed by custom editor tools that make creating and modifying upgrades much faster. And the player statistics system centralizes and feeds nearly every mechanic in the game.",
          fr: "Trois systèmes se démarquent. Le système de comportements des ennemis paraît simple en surface, mais il est modulaire : une grande variété d'ennemis découle des mêmes comportements de base. Le système d'améliorations repose entièrement sur des ScriptableObjects, soutenu par des outils d'éditeur maison qui accélèrent grandement leur création et leur modification. Enfin, le système de statistiques du joueur centralise et alimente presque toutes les mécaniques du jeu.",
        },
        bullets: {
          en: ["Enemy behaviors — modular building blocks for many enemy types", "Upgrades — ScriptableObject-driven with custom editor tools", "Player stats — a central hub feeding the game's mechanics"],
          fr: ["Comportements des ennemis — des blocs modulaires pour de nombreux types", "Améliorations — pilotées par ScriptableObjects avec des outils d'éditeur", "Statistiques du joueur — un cœur central qui alimente les mécaniques"],
        },
        media: [{ label: "Upgrade editor", kind: "image" }, { label: "Enemy types", kind: "video" }, { label: "Player stats system", kind: "image" }],
      },
      {
        eyebrow: { en: "02 / Design & progression", fr: "02 / Design et progression" },
        title: { en: "Documented systems, tuned by hand", fr: "Des systèmes documentés, équilibrés à la main" },
        body: {
          en: "I designed the whole game in Milanote, giving every major system its own documentation to make iteration easier. The upgrade system had a dedicated page per class listing every upgrade and its progression, and I balanced each class across different stages of the game using Excel spreadsheets.",
          fr: "J'ai conçu l'intégralité du jeu sur Milanote, en donnant à chaque système majeur sa propre documentation pour faciliter les itérations. Le système d'améliorations disposait d'une page par classe répertoriant chaque amélioration et sa progression, et j'ai équilibré chaque classe à différents moments de la progression à l'aide de feuilles Excel.",
        },
        media: [{ label: "Milanote — systems overview", kind: "image" }, { label: "Milanote — class upgrades", kind: "image" }, { label: "Excel balancing sheet", kind: "image" }],
      },
      {
        eyebrow: { en: "03 / User interface", fr: "03 / Interface utilisateur" },
        title: { en: "Guiding the eye with hierarchy", fr: "Guider le regard par la hiérarchie" },
        body: {
          en: "Most of the interface was designed in Figma, with the icons created in Inkscape. For each screen I leaned on visual-hierarchy principles to guide the player's attention naturally toward the information that matters most.",
          fr: "La majorité de l'interface a été conçue dans Figma, et les icônes créées dans Inkscape. Pour chaque écran, je me suis appuyé sur les principes de hiérarchie visuelle afin de guider naturellement l'attention du joueur vers les informations les plus importantes.",
        },
        media: [{ label: "Main menu", kind: "image" }, { label: "Upgrade screen", kind: "image" }, { label: "In-game HUD", kind: "image" }],
      },
      {
        eyebrow: { en: "04 / Steam publishing", fr: "04 / Publication sur Steam" },
        title: { en: "Taking it all the way to a store page", fr: "Aller jusqu'à la page de vente" },
        body: {
          en: "Publishing the game on Steam — currently as a demo — was a valuable learning experience. I created the capsules and promotional artwork, produced the gameplay trailer, wrote the store description, and configured and published the Steam page myself.",
          fr: "Publier le jeu sur Steam — pour l'instant sous forme de démo — a été une expérience très formatrice. J'ai réalisé les capsules et visuels promotionnels, produit la bande-annonce, rédigé la description et configuré puis mis en ligne la page Steam moi-même.",
        },
        media: [{ label: "Steam capsule", kind: "image" }, { label: "Gameplay trailer", kind: "video" }, { label: "Steam store page", kind: "image" }],
      },
    ],
  },
];

export function getProjectPage(slug: string) {
  return projectPages.find((project) => project.slug === slug);
}
