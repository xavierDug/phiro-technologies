import type { SectionsDict } from "@/content/dictionaries/sections.types";

/**
 * Québec French. Terminology follows OQLF usage rather than France usage:
 * "page d'atterrissage" not "landing page", "multilocataire" not "multi-tenant",
 * "courriel" not "e-mail". These are the words Québec buyers actually search,
 * and the anglicisms that read as normal in Paris read as careless in Montréal.
 *
 * Accent words are kept to one or two words so the serif-italic headline
 * treatment keeps the same rhythm it has in English.
 */
export const sectionsFr: SectionsDict = {
  hero: {
    badge: "Studio web montréalais · Disponibles pour de nouveaux projets",
    titleLead: "Des sites web qui vous amènent des",
    titleAccent: "clients",
    lead: "Phiro est un petit studio qui conçoit et développe des sites web rapides et clairs pour les entreprises qui ont besoin qu'ils travaillent — et les applications web derrière eux quand un site ne suffit plus.",
  },
  clients: {
    label: "Ils nous ont fait confiance",
  },
  intro: {
    eyebrow: "Le studio",
    statement:
      "La plupart des sites d'entreprise ont l'air corrects et ne font rien. Nous bâtissons l'autre sorte : clairs sur ce que vous offrez, rapides sur un téléphone, faciles à mettre à jour pour votre équipe — et jugés aux demandes qu'ils vous amènent.",
    link: "À propos du studio",
  },
  services: {
    eyebrow: "Services",
    title: "Ce que nous pouvons faire",
    accent: "pour vous",
    description:
      "Les sites web d'abord. Quand le site ne suffit plus, la même équipe bâtit le logiciel derrière.",
  },
  work: {
    eyebrow: "Réalisations choisies",
    title: "Projets",
    accent: "récents",
    allProjects: "Tous les projets",
  },
  process: {
    eyebrow: "Notre façon de travailler",
    title: "Quatre étapes, sans",
    accent: "théâtre",
  },
  stats: {
    ariaLabel: "Phiro en chiffres",
  },
  testimonial: {
    eyebrow: "La parole aux clients",
  },
  journal: {
    eyebrow: "Blogue",
    title: "Notes de",
    accent: "chantier",
    allArticles: "Tous les articles",
  },
  cta: {
    eyebrow: "Prochaine étape",
    title: "Un projet en",
    accent: "tête",
    description:
      "Dites-nous ce que vous cherchez à réaliser. Nous vous dirons honnêtement si nous sommes les bonnes personnes pour le bâtir.",
    emailUs: "Nous écrire",
  },
  about: {
    values: {
      eyebrow: "Ce en quoi nous croyons",
      title: "La technologie devrait paraître",
      accent: "évidente",
      description:
        "Pas brillante. Pas impressionnante. Évidente — comme si le site n'aurait raisonnablement pas pu fonctionner autrement. Y arriver, c'est tout le travail.",
    },
    journey: {
      eyebrow: "Le chemin parcouru",
      title: "Comment Phiro en est arrivée",
      accent: "là",
      description:
        "Version courte : nous avons continué à refuser de livrer ce que nous n'aurions pas voulu maintenir.",
    },
    team: {
      eyebrow: "Avec qui vous travaillez",
      title: "Vous parlez aux personnes qui le",
      accent: "bâtissent",
      description:
        "Pas de chargé de compte, pas de transfert à une équipe junior. La personne qui cadre votre site le conçoit, écrit le code et répond quand quelque chose doit changer.",
      name: "Xavier Dugal",
      role: "Fondateur, Phiro Technologies",
    },
    stack: {
      eyebrow: "Les outils que nous utilisons",
    },
    imageAlt: "Une séance de travail au studio, un portable ouvert sur le tableau de bord d'un client",
  },
  pages: {
    about: {
      eyebrow: "À propos du studio",
      title: "Un petit studio obsédé par les",
      accent: "détails",
      description:
        "Nous prenons au sérieux les parties ingrates — la structure, la vitesse, la deuxième année d'un site. C'est là que les bons sites se décident vraiment, bien après l'annonce du lancement.",
    },
    projects: {
      eyebrow: "Réalisations",
      title: "Là où les idées deviennent",
      accent: "réelles",
      description:
        "Des sites d'entreprises locales au SaaS multilocataire. Chaque étude de cas raconte ce qui a été réellement difficile, pas seulement ce qui a été livré.",
    },
    contact: {
      eyebrow: "Contact",
      title: "Commençons à",
      accent: "bâtir",
      description:
        "Trois questions rapides, puis les détails. Nous lisons chaque message nous-mêmes et répondons en un jour ouvrable — y compris ceux où la réponse honnête est que nous ne sommes pas les bonnes personnes.",
    },
  },
  contact: {
    emailLabel: "Courriel",
    phoneLabel: "Téléphone",
    basedIn: "Basés à",
    responseTime: "Délai de réponse",
  },
  notFound: {
    eyebrow: "Erreur 404",
    title: "Cette page a pris un",
    accent: "détour",
    description:
      "Le lien est peut-être ancien, ou la page a déménagé. Tout ce qui compte est à un clic.",
    home: "Retour à l'accueil",
    contact: "Dites-nous ce que vous cherchiez",
    popular: "Pages populaires",
  },
  projectCategories: {
    All: "Tous",
    SaaS: "SaaS",
    "Web App": "Application web",
    Website: "Site web",
    "E-commerce": "Commerce en ligne",
  },
  projectCount: { one: "projet", other: "projets" },
  caseStudy: {
    eyebrow: "Étude de cas",
    allWork: "Toutes les réalisations",
    client: "Client",
    year: "Année",
    role: "Rôle",
    stack: "Technologies",
    results: "Le résultat",
    screens: "Écrans",
    next: "Étude de cas suivante",
    visitSite: "Voir le site en ligne",
  },
};
