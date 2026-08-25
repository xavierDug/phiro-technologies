import type { Project } from "@/content/projects";

/**
 * French case studies.
 *
 * Mirrors `projects.ts` exactly: same slugs, same covers, same gallery sources
 * and frames, same metric values. Only prose differs. The slug is the join key
 * between the two locales, so it must never be translated — `/fr/projects/members`
 * and `/projects/members` are the same page in two languages, and hreflang says so.
 */
export const projectsFr: Project[] = [
  {
    slug: "members",
    title: "Members — SaaS de gestion de gym",
    name: "Members",
    client: "Phiro Technologies",
    year: "2025",
    category: "SaaS",
    role: "Design produit, ingénierie full-stack, infrastructure",
    summary:
      "Un SaaS multilocataire qui gère tout le volet administratif d'un gym : abonnements, paiements, présences et rapports.",
    intro:
      "Les gyms indépendants fonctionnent avec un assemblage de chiffriers, de lecteurs de cartes et de feuilles de présence papier. Members remplace le tout par un seul système : abonnements, abonnements Stripe, entrées à la porte, et un tableau de bord qui répond enfin à la question de savoir si l'entreprise croît vraiment.",
    cover: "/saas-gym.png",
    stack: [
      "Next.js",
      "TypeScript",
      ".NET 8",
      "Dapper",
      "SQL Server",
      "Stripe",
      "Firebase Auth",
      "Azure",
    ],
    challenge: {
      heading: "Le défi",
      body: [
        "Chaque gym que nous avons rencontré utilisait trois ou quatre outils déconnectés. Le statut d'abonnement vivait à un endroit, le statut de paiement à un autre, et les présences dans un cartable à l'accueil. Les réconcilier était une tâche manuelle que quelqu'un faisait le dimanche.",
        "La contrainte la plus difficile restait la multilocation. Un seul déploiement devait servir plusieurs gyms avec une isolation stricte des données, une facturation par client et une image de marque par client — sans le fardeau de maintenance par client qui tue discrètement les petits produits SaaS.",
      ],
    },
    approach: {
      heading: "Ce que nous avons bâti",
      body: [
        "Une API .NET en architecture propre avec une couche de dépôt au-dessus de Dapper — délibérément sans ORM, pour que chaque requête sur le schéma cloisonné par locataire reste explicite et vérifiable. La résolution du locataire se fait une seule fois, à l'entrée de la requête, et toutes les requêtes en aval en héritent.",
        "Stripe gère les abonnements, avec des webhooks qui pilotent l'état des adhésions : le statut de paiement et les droits d'accès ne peuvent jamais se contredire. L'interface Next.js est construite autour du quotidien du propriétaire : qui est ici maintenant, qui a cessé de payer, ce qui est entré ce mois-ci.",
      ],
    },
    outcome: {
      heading: "Le résultat",
      body: [
        "L'accueil est passé d'un cartable papier à un balayage de deux secondes. Les propriétaires ont un portrait des revenus en direct plutôt qu'une réconciliation de fin de mois, et les paiements refusés remontent le jour même plutôt que le mois suivant.",
      ],
    },
    metrics: [
      { label: "Accueil des membres plus rapide", value: 94, suffix: "%" },
      { label: "Heures d'administration économisées par semaine", value: 12, suffix: "h" },
      { label: "Temps de réconciliation", value: 0, suffix: "h" },
    ],
    gallery: [
      { src: "/saas-gym.png", alt: "Tableau de bord propriétaire de Members", frame: "safari" },
      { src: "/Demo.png", alt: "Vue de gestion des abonnements de Members", frame: "safari" },
      { src: "/IphoneMockup.png", alt: "Accueil mobile de Members", frame: "none" },
    ],
    featured: true,
  },
  {
    slug: "och-planner",
    title: "OCH Planner — Planification d'atelier automobile",
    name: "OCH Planner",
    client: "Optimum Car Health",
    year: "2024",
    category: "Web App",
    role: "Design produit, ingénierie full-stack",
    summary:
      "Réservation en ligne et planification d'atelier pour un garage automobile, en remplacement d'un fonctionnement au téléphone et au carnet.",
    intro:
      "Un garage occupé perd de l'argent de deux façons : des baies vides, et un conseiller au service qui passe la moitié de sa journée au téléphone. OCH Planner offre aux clients une réservation en ligne autonome, et donne à l'atelier une vue unique de l'horaire de chaque baie, chaque jour.",
    cover: "/OCHProject.png",
    stack: ["Next.js", "React", "TypeScript", "Firebase", "Tailwind CSS"],
    challenge: {
      heading: "Le défi",
      body: [
        "Les rendez-vous arrivaient par téléphone, sans rendez-vous et par texto, et vivaient dans un carnet papier. Les doubles réservations étaient courantes, et personne ne pouvait voir la capacité du lendemain sans lire physiquement le carnet.",
        "Tout remplacement devait être utilisable par des techniciens aux mains huileuses sur une tablette murale — ce qui excluait les interfaces denses de type bureau.",
      ],
    },
    approach: {
      heading: "Ce que nous avons bâti",
      body: [
        "Un parcours de réservation public qui n'offre que des plages que l'atelier peut réellement servir, piloté par la capacité réelle des baies et les durées de service plutôt que par un widget de calendrier générique.",
        "Derrière, un horaire d'atelier conçu pour être lu d'un coup d'œil : grandes cibles tactiles, types de service en couleurs, glisser-déposer pour replanifier. Firebase garde l'accueil et la tablette de l'atelier synchronisés en temps réel.",
      ],
    },
    outcome: {
      heading: "Le résultat",
      body: [
        "La réservation a quitté le téléphone presque entièrement dès le premier mois, et le carnet a été mis de côté. Les doubles réservations ont cessé d'être une catégorie de problème.",
      ],
    },
    metrics: [
      { label: "Réservations prises en ligne", value: 78, suffix: "%" },
      { label: "Moins de conflits d'horaire", value: 100, suffix: "%" },
      { label: "Temps au téléphone économisé par jour", value: 2, suffix: "h" },
    ],
    gallery: [
      { src: "/OCHProject.png", alt: "Interface de réservation OCH Planner", frame: "safari" },
      { src: "/PhiroGarageMock.png", alt: "Horaire d'atelier OCH Planner", frame: "none" },
    ],
    testimonial: {
      quote:
        "Le téléphone ne sonne pratiquement plus pour les rendez-vous. Ça seul m'a redonné la moitié de mes matinées.",
      author: "Propriétaire",
      role: "Optimum Car Health",
    },
    featured: true,
  },
  {
    slug: "soudure-flf",
    title: "Soudure FLF — Soudure industrielle",
    name: "Soudure FLF",
    client: "Soudure FLF",
    year: "2024",
    category: "Website",
    role: "Design, développement WebGL, intégration WordPress",
    summary:
      "Le site d'un fabricant où les produits s'explorent en modèles 3D interactifs plutôt qu'en photographies plates.",
    intro:
      "La fabrication industrielle est un métier tactile vendu à travers des photos de catalogue plates. Nous avons refait le site de Soudure FLF autour de modèles Three.js interactifs, pour qu'un client potentiel puisse retourner une pièce et la comprendre avant même de décrocher le téléphone.",
    cover: "/SoudureFLF.png",
    stack: ["WordPress", "Three.js", "JavaScript", "PHP", "SCSS"],
    challenge: {
      heading: "Le défi",
      body: [
        "Les photographies aplatissent les assemblages soudés en quelque chose d'illisible. L'équipe des ventes recevait les mêmes questions de géométrie à chaque appel.",
        "Le site devait aussi rester modifiable par une équipe non technique et se charger convenablement sur des connexions rurales — deux objectifs qui tirent directement contre la livraison d'actifs 3D.",
      ],
    },
    approach: {
      heading: "Ce que nous avons bâti",
      body: [
        "Des modèles compressés, encodés en Draco, qui se chargent progressivement derrière une image fixe : la page est lisible immédiatement et devient interactive un instant plus tard. Sur les connexions lentes ou en mode mouvement réduit, l'image fixe reste, tout simplement.",
        "Tout ce qui entoure la visionneuse est resté dans WordPress, pour que l'équipe modifie les textes et les produits exactement comme avant.",
      ],
    },
    outcome: {
      heading: "Le résultat",
      body: [
        "Les clients potentiels arrivent aux appels en comprenant déjà le produit, et le temps passé sur les pages produits a plus que doublé par rapport à l'ancien catalogue.",
      ],
    },
    metrics: [
      { label: "Temps passé sur les pages produits", value: 140, suffix: "%" },
      { label: "Performance Lighthouse", value: 92 },
      { label: "Produits modélisés en 3D", value: 18 },
    ],
    gallery: [
      {
        src: "/SoudureFLF.png",
        alt: "Page produit Soudure FLF avec visionneuse 3D",
        frame: "safari",
      },
    ],
    featured: true,
  },
  {
    slug: "coach-fitness",
    title: "Team OT13 — Entraînement personnel",
    name: "Team OT13",
    client: "Team OT13",
    year: "2023",
    category: "Website",
    role: "Design, intégration WordPress, référencement",
    summary:
      "Un site axé sur la conversion pour un entraîneur personnel, construit autour d'un seul objectif : des consultations réservées.",
    intro:
      "Le site d'un entraîneur personnel a exactement une tâche. Nous avons retiré tout ce qui ne rapprochait pas un visiteur d'une consultation, puis rendu le chemin restant rapide et évident sur un téléphone.",
    cover: "/TeamOT13.png",
    stack: ["WordPress", "PHP", "Tailwind CSS", "Google Analytics"],
    challenge: {
      heading: "Le défi",
      body: [
        "Le site précédent était une brochure : beaucoup de pages, aucun chemin. Les visiteurs arrivaient, lisaient, et repartaient sans prochaine étape.",
        "La quasi-totalité du trafic était mobile et local : la performance mobile et la visibilité en recherche locale comptaient bien plus que le fini sur ordinateur.",
      ],
    },
    approach: {
      heading: "Ce que nous avons bâti",
      body: [
        "Une page à récit unique — preuve, méthode, tarifs, réservation — avec l'appel à l'action de réservation constamment accessible plutôt qu'enterré au bas de la page.",
        "Les fondations du référencement local : données structurées, pages de localisation, images compressées, et une intégration qui obtient de bons scores sur mobile sans qu'une extension de mise en cache la soutienne.",
      ],
    },
    outcome: {
      heading: "Le résultat",
      body: [
        "Les demandes de consultation ont environ triplé au premier trimestre après le lancement, à volume de trafic égal.",
      ],
    },
    metrics: [
      { label: "Plus de demandes de consultation", value: 210, suffix: "%" },
      { label: "Score Lighthouse mobile", value: 96 },
      { label: "Impressions en recherche locale", value: 3, suffix: "x" },
    ],
    gallery: [
      { src: "/TeamOT13.png", alt: "Page d'atterrissage de Team OT13", frame: "safari" },
      {
        src: "/SeoThumbnail.png",
        alt: "Croissance de la visibilité en recherche après le lancement",
        frame: "none",
      },
    ],
  },
  {
    slug: "cn-mustang",
    title: "Club de Natation Mustang",
    name: "CN Mustang",
    client: "Club de Natation Mustang",
    year: "2023",
    category: "Website",
    role: "Développeur principal, maintenance continue",
    summary:
      "Le site public et le centre d'information des membres d'un club de natation, maintenu saison après saison.",
    intro:
      "Un club de natation compétitive publie constamment — horaires, résultats de compétitions, périodes d'inscription — à des parents qui ont besoin de la réponse en dix secondes, sur un téléphone, au bord de la piscine. Nous avons refait le site autour de cette réalité.",
    cover: "/CNMustang.png",
    stack: ["WordPress", "PHP", "JavaScript", "SCSS"],
    challenge: {
      heading: "Le défi",
      body: [
        "L'information de la saison était éparpillée entre des PDF, des publications Facebook et des courriels. Les parents posaient les mêmes questions aux bénévoles chaque semaine, faute d'un seul endroit fiable où regarder.",
        "Les personnes qui maintiennent le site sont des bénévoles, pas des éditeurs web : tout ce qui aurait exigé une aisance technique se serait dégradé en une saison.",
      ],
    },
    approach: {
      heading: "Ce que nous avons bâti",
      body: [
        "Un modèle de contenu structuré pour les horaires, les groupes et les résultats : mettre la saison à jour consiste à remplir des champs plutôt qu'à modifier une mise en page.",
        "Une architecture d'information pensée d'abord pour le mobile et bâtie autour des questions réellement posées, plus une maintenance technique continue pour que le club n'ait jamais à penser aux mises à jour ni à la sécurité.",
      ],
    },
    outcome: {
      heading: "Le résultat",
      body: [
        "Les demandes répétitives des parents ont fortement diminué, et le club a mené plusieurs saisons de mises à jour de contenu sans intervention de développeur.",
      ],
    },
    metrics: [
      { label: "Saisons maintenues", value: 3 },
      { label: "Moins de demandes répétées", value: 60, suffix: "%" },
      { label: "Formation des bénévoles requise", value: 0, suffix: "h" },
    ],
    gallery: [
      {
        src: "/CNMustang.png",
        alt: "Page d'accueil du Club de Natation Mustang",
        frame: "safari",
      },
    ],
  },
];
