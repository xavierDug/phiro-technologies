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
    badge: "Disponibles pour de nouveaux projets",
    titleLead: "Conçu avec",
    titleAccent: "intention",
    lead: "Nous concevons et développons des logiciels intelligents et évolutifs pour des entreprises qui ont besoin qu'ils tiennent encore la route dans trois ans.",
    scroll: "Défiler",
  },
  stack: {
    eyebrow: "Les outils que nous utilisons",
    ariaLabel: "Technologies avec lesquelles nous travaillons",
  },
  services: {
    eyebrow: "Nos services",
    title: "Des logiciels qui font leurs",
    accent: "preuves",
    description:
      "Quatre disciplines, une seule équipe. Nous menons un produit de la première question inconfortable jusqu'à la version sur laquelle les gens comptent.",
  },
  work: {
    eyebrow: "Réalisations choisies",
    title: "Des projets qui parlent d'",
    accent: "eux-mêmes",
    allProjects: "Tous les projets",
  },
  craft: {
    eyebrow: "Le savoir-faire",
    title: "Pensé pour chaque écran où il",
    accent: "atterrit",
    description:
      "Une équipe, une base de code, un standard — que ça s'ouvre sur un portable au bureau ou sur un téléphone dans un atelier.",
    points: [
      "Conçu et développé par les mêmes personnes",
      "Typé de bout en bout, de la base de données au bouton",
      "Rapide sur un téléphone, sur de vrais réseaux",
      "Livré documenté, pas abandonné",
    ],
    imageAlt: "Un tableau de bord Phiro sur un portable, une tablette et un téléphone",
    cta: "Voir en production",
  },
  process: {
    eyebrow: "Notre façon de travailler",
    title: "Quatre étapes, sans",
    accent: "théâtre",
    description:
      "La même séquence à chaque mandat, qu'il s'agisse d'une page d'atterrissage ou d'une plateforme multilocataire.",
  },
  testimonials: {
    eyebrow: "Clients",
    title: "Ce que c'est de travailler avec",
    accent: "nous",
  },
  mission: {
    eyebrow: "Ce en quoi nous croyons",
    title: "La technologie devrait paraître",
    accent: "évidente",
    description:
      "Pas brillante. Pas impressionnante. Évidente — comme si le produit n'aurait raisonnablement pas pu fonctionner autrement. Y arriver, c'est tout le travail.",
  },
  journey: {
    eyebrow: "Le chemin parcouru",
    title: "Comment Phiro en est arrivée",
    accent: "là",
    description:
      "Version courte : nous avons continué à refuser de livrer ce que nous n'aurions pas voulu maintenir.",
  },
  cta: {
    eyebrow: "Prochaine étape",
    title: "Prêt à bâtir quelque chose de",
    accent: "grand",
    description:
      "Dites-nous ce que vous cherchez à réaliser. Nous vous dirons honnêtement si nous sommes les bonnes personnes pour le construire.",
    emailUs: "Nous écrire directement",
  },
  pages: {
    about: {
      eyebrow: "À propos",
      title: "Bâtir avec",
      accent: "intention",
      description:
        "Nous sommes une petite équipe qui prend au sérieux les parties ingrates — les frontières, les contrats, la deuxième année d'une base de code. C'est là que les bons produits se décident vraiment.",
    },
    projects: {
      eyebrow: "Réalisations",
      title: "Là où les idées deviennent",
      accent: "réelles",
      description:
        "Du SaaS multilocataire aux sites produits interactifs. Chaque étude de cas raconte ce qui a été réellement difficile, pas seulement ce qui a été livré.",
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
    basedIn: "Basés à",
    responseTime: "Délai de réponse",
    reachDirectly: "Ou joignez-nous directement",
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
    client: "Client",
    year: "Année",
    role: "Rôle",
    stack: "Technologies",
    results: "Résultats",
    screens: "Écrans",
    next: "Étude de cas suivante",
  },
};
