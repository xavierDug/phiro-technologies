import type { OfferContent } from "@/content/offer";

/** Copie française pour `/fr/sites-web`. Les prix viennent de `OFFER_PRICES`. */
export const offerFr: OfferContent = {
  meta: {
    title: "Forfaits web",
    description:
      "Sites web à prix fixe pour les entreprises de Montréal et de la Rive-Sud : à partir de {essential}, en ligne en environ 5 jours ouvrables. Forfaits clairs, aucune surprise.",
  },
  hero: {
    eyebrow: "Forfaits web · Montréal et Rive-Sud",
    title: "Un site professionnel, en ligne en quelques",
    accent: "jours",
    lead: "Forfaits fixes, prix clairs, aucune surprise. Conçu et réalisé par un studio montréalais.",
    book: "Réserver 15 minutes",
    see: "Voir les forfaits",
    glance: ["À partir de **{essential}**", "En ligne en **~5 jours ouvrables**", "Prix **fixe**", "**{deposit}** au départ"],
    glanceLabel: "En bref",
    clientLabel: "Site client · Soudure FLF",
    desktopAlt: "Site de Soudure FLF sur ordinateur, conçu et réalisé par Phiro",
    phoneAlt: "Site de Soudure FLF sur téléphone",
  },
  packages: {
    eyebrow: "Forfaits",
    title: "Trois forfaits, des prix",
    accent: "fixes",
    description:
      "Tous les prix sont en dollars canadiens, avant taxes. Les délais commencent le jour où nous recevons vos textes et vos photos.",
    recommended: "Recommandé",
    quoted: "Sur devis",
    items: [
      {
        id: "essential",
        name: "Essentiel",
        blurb: "Une page soignée pour une entreprise qui doit inspirer confiance, rapidement.",
        priceKey: "essential",
        priceNote: "CAD · avant taxes",
        delivery: "Environ 5 jours ouvrables après réception de votre contenu.",
        features: [
          "Une page premium, environ 6 sections",
          "Conçu d'abord pour le mobile",
          "Formulaire de contact et appel en un clic",
          "Référencement local de base",
          "Votre domaine, connecté",
          "1 ronde de révisions",
        ],
        featureStyle: "check",
        cta: "Réserver 15 minutes",
      },
      {
        id: "standard",
        name: "Standard",
        blurb: "Jusqu'à cinq pages, pour donner à chacun de vos services la place qu'il mérite.",
        priceKey: "standard",
        priceNote: "CAD · avant taxes",
        delivery: "Environ 2 semaines après réception de votre contenu.",
        features: ["Jusqu'à 5 pages", "Tout ce qu'inclut Essentiel", "Statistiques de visites", "2 rondes de révisions"],
        featureStyle: "check",
        cta: "Réserver 15 minutes",
        recommended: true,
      },
      {
        id: "custom",
        name: "Sur mesure",
        blurb: "Pour un site qui doit faire plus qu'informer.",
        priceKey: null,
        priceNote: "Après un appel de 15 minutes",
        delivery: "Échéancier établi ensemble, selon la portée du projet.",
        features: [
          "Réservation en ligne",
          "Boutique en ligne",
          "Comptes clients",
          "Site bilingue",
          "Tout projet de plus grande envergure",
        ],
        featureStyle: "plus",
        cta: "Parlons-en",
      },
    ],
  },
  plans: {
    eyebrow: "Mensuel",
    title: "Votre site, bien",
    accent: "hébergé",
    description:
      "Choisissez-en un. L'hébergement est le minimum; l'entretien l'inclut et ajoute de petites modifications chaque mois.",
    perMonth: "/ mois",
    items: [
      {
        name: "Hébergement",
        badge: "Obligatoire",
        priceKey: "hosting",
        body: "Hébergement seulement. Votre site reste en ligne et rapide.",
      },
      {
        name: "Entretien",
        badge: "Hébergement inclus",
        priceKey: "care",
        body: "L'hébergement, plus jusqu'à 1 heure de modifications par mois : photos, heures d'ouverture, prix.",
      },
    ],
  },
  extras: {
    label: "Options",
    items: [
      { label: "Page supplémentaire", value: "{extraPage}" },
      { label: "Modifications additionnelles", value: "{hourly} / heure" },
      { label: "Version bilingue", value: "+{bilingual}", note: "du forfait" },
    ],
  },
  process: {
    eyebrow: "Démarche",
    title: "Trois étapes jusqu'au",
    accent: "lancement",
    description:
      "Un acompte de {deposit} pour commencer, le solde au lancement. Rien n'est mis en ligne sans votre approbation.",
    steps: [
      {
        title: "Un appel de 15 minutes",
        body: "Nous regardons votre entreprise et votre site actuel, puis choisissons ensemble le bon forfait. Sans engagement.",
      },
      {
        title: "Concept et contenu",
        body: "Vous nous envoyez vos textes, photos et logo avec l'acompte. Nous concevons le site et vous le révisez.",
      },
      {
        title: "Lancement",
        body: "Nous connectons votre domaine et mettons le site en ligne. Le solde est payable au lancement.",
      },
    ],
  },
  work: {
    title: "Réalisations récentes",
    seeAll: "Voir tous les projets",
  },
  faq: {
    eyebrow: "Questions",
    title: "Vos questions, nos",
    accent: "réponses",
    writePrompt: "Autre chose en tête? Écrivez-nous à",
    items: [
      {
        question: "Ai-je besoin d'un nom de domaine?",
        answer:
          "Si vous en avez déjà un, nous le connectons. Sinon, nous vous aidons à en enregistrer un à votre nom, pour qu'il reste le vôtre.",
      },
      {
        question: "Qui fournit les textes et les photos?",
        answer:
          "Vous, puisque vous connaissez votre entreprise mieux que quiconque. Nous vous envoyons une courte liste de ce qu'il nous faut, et le délai commence dès que nous l'avons.",
      },
      {
        question: "Qu'est-ce qu'une ronde de révisions?",
        answer:
          "Une ronde, c'est une liste de modifications sur la maquette que nous vous présentons. Essentiel en inclut une, Standard deux. Au-delà, les modifications sont à {hourly} l'heure.",
      },
      {
        question: "Et si nous voulons plus, plus tard?",
        answer:
          "Ajoutez des pages à {extraPage} chacune, passez à l'entretien pour des modifications mensuelles, ou demandez-nous un devis pour une fonction plus importante, comme la réservation ou une boutique.",
      },
      {
        question: "Que se passe-t-il si nous partons?",
        answer:
          "Votre domaine, vos textes et vos photos vous appartiennent. Avisez-nous : nous arrêtons le forfait mensuel et vous aidons à déplacer le site où vous voulez.",
      },
      {
        question: "Comment fonctionne le paiement?",
        answer:
          "Un acompte de {deposit} pour commencer, le solde au lancement. Tous les prix sont en dollars canadiens, avant taxes. Les forfaits mensuels sont facturés chaque mois.",
      },
    ],
  },
  booking: {
    eyebrow: "Réserver un appel",
    title: "Quinze minutes, puis vous",
    accent: "décidez",
    lead: "Dites-nous qui vous êtes et quand vous joindre. Nous vous rappelons en moins d'un jour ouvrable pour fixer le moment. Sans engagement.",
    phone: "Téléphone",
    email: "Courriel",
    studio: "Studio",
    packageLegend: "Quel forfait?",
    packageLabels: { essential: "Essentiel", standard: "Standard", custom: "Sur mesure", unsure: "Je ne sais pas encore" },
    name: "Votre nom",
    business: "Nom de l'entreprise",
    contact: "Téléphone ou courriel",
    contactPlaceholder: "514 555-0123 ou vous@entreprise.ca",
    contactHint: "Utilisé seulement pour fixer l'appel.",
    windowLegend: "Meilleur moment pour vous joindre",
    windowLabels: { morning: "Matin", afternoon: "Après-midi", any: "N'importe quand" },
    message: "Quelque chose à nous dire?",
    messagePlaceholder: "Votre métier, votre site actuel, une échéance…",
    optional: "facultatif",
    submit: "Réserver 15 minutes",
    sending: "Envoi…",
    footnote: "Réponse en moins d'un jour ouvrable. Prix en dollars canadiens, avant taxes.",
    successTitle: "Merci, {name}",
    successBody: "Nous vous appelons en moins d'un jour ouvrable pour fixer le moment. Rien d'autre à faire pour l'instant.",
    errors: {
      name: "Dites-nous à qui nous parlons.",
      business: "Pour quelle entreprise?",
      contactRequired: "Il nous faut un numéro de téléphone ou un courriel.",
      contactInvalid: "Ce n'est ni un numéro de téléphone ni un courriel valide.",
      package: "Choisissez-en un, ou « Je ne sais pas encore ».",
      messageLong: "Merci de faire plus court.",
      server: "Un problème de notre côté. Appelez-nous ou écrivez-nous plutôt.",
      network: "Impossible de joindre le serveur. Vérifiez votre connexion et réessayez.",
    },
  },
};
