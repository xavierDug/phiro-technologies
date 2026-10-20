import type { BudgetId, ProjectTypeId, TimelineId } from "@/server/contact/contact.dto";

/**
 * Contact-form copy.
 *
 * The option LABELS live here per locale, while the option IDs stay in
 * `contact.dto.ts`. That split matters: the id is what crosses the wire and
 * what the server validates, so it must never change with the display language.
 *
 * The notification email keeps using the English labels from the DTO — it is
 * read by us, not by the person filling in the form.
 */
export interface FormDict {
  steps: [string, string, string];
  projectLegend: string;
  projectHint: string;
  budgetLegend: string;
  budgetHint: string;
  timelineLegend: string;
  contactLegend: string;
  contactHint: string;
  name: string;
  company: string;
  optional: string;
  email: string;
  message: string;
  messagePlaceholder: string;
  groupProjectType: string;
  groupBudget: string;
  groupTimeline: string;
  back: string;
  continue: string;
  send: string;
  sending: string;
  successTitle: string;
  /** `{name}` is replaced with the sender's first name. */
  successBody: string;
  errors: {
    projectType: string;
    budget: string;
    timeline: string;
    name: string;
    emailRequired: string;
    emailInvalid: string;
    message: string;
    generic: string;
    checkFields: string;
    network: string;
  };
  projectTypes: Record<ProjectTypeId, string>;
  budgets: Record<BudgetId, string>;
  timelines: Record<TimelineId, string>;
}

export const formEn: FormDict = {
  steps: ["Project", "Scope", "Details"],
  projectLegend: "What are you building?",
  projectHint: "Closest match is fine — we'll figure out the rest together.",
  budgetLegend: "Rough budget?",
  budgetHint: "This shapes what we can honestly recommend. No wrong answer.",
  timelineLegend: "When do you want to start?",
  contactLegend: "How do we reach you?",
  contactHint: "Last step — then tell us about the project.",
  name: "Name",
  company: "Company",
  optional: "(optional)",
  email: "Email",
  message: "What are you trying to make happen?",
  messagePlaceholder: "The problem, who it's for, and anything you've already tried.",
  groupProjectType: "Project type",
  groupBudget: "Budget",
  groupTimeline: "Timeline",
  back: "Back",
  continue: "Continue",
  send: "Send message",
  sending: "Sending",
  successTitle: "Message sent",
  successBody:
    "Thanks {name} — we've got it. You'll hear back within one business day, usually sooner.",
  errors: {
    projectType: "Pick the closest match.",
    budget: "A rough range is fine.",
    timeline: "Roughly when are you hoping to start?",
    name: "Tell us who we're speaking with.",
    emailRequired: "We need an email to reply to.",
    emailInvalid: "That email doesn't look right.",
    message: "A sentence or two would help.",
    generic: "Something went wrong. Please try again.",
    checkFields: "Please check the highlighted fields.",
    network: "Could not reach the server. Check your connection.",
  },
  projectTypes: {
    saas: "SaaS product",
    "web-app": "Web application",
    website: "Marketing site",
    design: "Design only",
    other: "Something else",
  },
  budgets: {
    "under-5k": "Under $5k",
    "5k-15k": "$5k – $15k",
    "15k-40k": "$15k – $40k",
    "40k-plus": "$40k+",
    unsure: "Not sure yet",
  },
  timelines: {
    asap: "As soon as possible",
    "1-3-months": "1 – 3 months",
    "3-6-months": "3 – 6 months",
    exploring: "Just exploring",
  },
};

export const formFr: FormDict = {
  steps: ["Projet", "Portée", "Détails"],
  projectLegend: "Que construisez-vous ?",
  projectHint: "Le choix le plus proche suffit — nous démêlerons le reste ensemble.",
  budgetLegend: "Budget approximatif ?",
  budgetHint:
    "Cela oriente ce que nous pouvons honnêtement recommander. Il n'y a pas de mauvaise réponse.",
  timelineLegend: "Quand souhaitez-vous commencer ?",
  contactLegend: "Comment vous joindre ?",
  contactHint: "Dernière étape — puis parlez-nous du projet.",
  name: "Nom",
  company: "Entreprise",
  optional: "(facultatif)",
  email: "Courriel",
  message: "Qu'essayez-vous de réaliser ?",
  messagePlaceholder:
    "Le problème, à qui il s'adresse, et ce que vous avez déjà essayé.",
  groupProjectType: "Type de projet",
  groupBudget: "Budget",
  groupTimeline: "Échéancier",
  back: "Retour",
  continue: "Continuer",
  send: "Envoyer le message",
  sending: "Envoi en cours",
  successTitle: "Message envoyé",
  successBody:
    "Merci {name} — nous l'avons bien reçu. Vous aurez une réponse en un jour ouvrable, souvent plus tôt.",
  errors: {
    projectType: "Choisissez l'option la plus proche.",
    budget: "Un ordre de grandeur suffit.",
    timeline: "Vers quand espérez-vous commencer ?",
    name: "Dites-nous à qui nous parlons.",
    emailRequired: "Il nous faut un courriel pour vous répondre.",
    emailInvalid: "Ce courriel ne semble pas valide.",
    message: "Une ou deux phrases nous aideraient.",
    generic: "Une erreur est survenue. Veuillez réessayer.",
    checkFields: "Veuillez vérifier les champs en surbrillance.",
    network: "Impossible de joindre le serveur. Vérifiez votre connexion.",
  },
  projectTypes: {
    saas: "Produit SaaS",
    "web-app": "Application web",
    website: "Site vitrine",
    design: "Design seulement",
    other: "Autre chose",
  },
  budgets: {
    "under-5k": "Moins de 5 000 $",
    "5k-15k": "5 000 $ – 15 000 $",
    "15k-40k": "15 000 $ – 40 000 $",
    "40k-plus": "40 000 $ et plus",
    unsure: "Pas encore certain",
  },
  timelines: {
    asap: "Dès que possible",
    "1-3-months": "1 – 3 mois",
    "3-6-months": "3 – 6 mois",
    exploring: "Simple exploration",
  },
};
