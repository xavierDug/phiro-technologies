import type { Dictionary } from "@/content/dictionaries/types";
import { sectionsFr } from "@/content/dictionaries/sections.fr";
import { formFr } from "@/content/dictionaries/form";

/**
 * Québec French, not France French.
 *
 * The vocabulary choices matter for search here: "blogue" and "référencement"
 * are the OQLF-sanctioned terms people in Québec actually type, where a France
 * translation would reach for "blog" and "SEO". Anglicisms that read as normal
 * in Paris read as lazy in Montréal.
 */
export const fr: Dictionary = {
  nav: {
    home: "Accueil",
    about: "À propos",
    work: "Réalisations",
    services: "Services",
    blog: "Blogue",
    contact: "Contact",
    switchLanguage: "Switch to English",
    menu: "Ouvrir le menu",
    close: "Fermer le menu",
  },
  blog: {
    eyebrow: "Blogue",
    title: "Notes de",
    titleAccent: "chantier",
    description:
      "Ce que nous apprenons en livrant des logiciels : décisions d'architecture, travail de performance, et le référencement technique que personne ne regarde avant que le trafic cesse d'arriver.",
    featured: "Dernier article",
    latest: "Autres articles",
    allPosts: "Tous les articles",
    readArticle: "Lire l'article",
    minuteRead: "min de lecture",
    emptyTitle: "Rien de publié pour l'instant",
    emptyBody:
      "Les premiers articles sont en cours d'écriture. Entre-temps, nos réalisations en disent davantage.",
    emptyCta: "Voir nos réalisations",
    backToBlog: "Retour au blogue",
    onThisPage: "Sur cette page",
    writtenBy: "Écrit par",
    published: "Publié le",
    updated: "Mis à jour le",
    share: "Partager",
    copyLink: "Copier le lien",
    linkCopied: "Lien copié",
    faqTitle: "Questions fréquentes",
    faqEyebrow: "FAQ",
    relatedTitle: "À lire ensuite",
    relatedEyebrow: "Sur le même thème",
    ctaTitle: "Vous voulez cet audit pour votre site ?",
    ctaBody:
      "Dites-nous ce que vous construisez et nous vous dirons ce qui le freine. Nous répondons en un jour ouvrable.",
    ctaButton: "Démarrer la conversation",
  },
  sections: sectionsFr,
  form: formFr,
  footer: {
    studio: "Studio",
    services: "Services",
    contact: "Contact",
  },
  common: {
    startProject: "Démarrer un projet",
    seeWork: "Voir nos réalisations",
    getInTouch: "Nous joindre",
    nextCaseStudy: "Étude de cas suivante",
    email: "Courriel",
    phone: "Téléphone",
    location: "Emplacement",
    responseTime: "En un jour ouvrable",
    allRightsReserved: "Tous droits réservés.",
    tagline: "Conçu avec intention",
  },
};
