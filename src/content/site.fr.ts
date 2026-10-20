import type {
  JourneyEntry,
  ProcessStep,
  Service,
  Stat,
  Testimonial,
  Value,
} from "@/content/site";

/**
 * French site content.
 *
 * Mirrors the English arrays in `site.ts` exactly — same length, same `index`
 * keys, same `span` values — because the layouts are driven by those fields.
 * The shared TypeScript types are what enforce it.
 */

export const servicesFr: Service[] = [
  {
    index: "01",
    title: "Sites vitrines",
    description:
      "Des sites rapides et distinctifs que votre équipe peut vraiment modifier — bâtis autour de la seule action que vos visiteurs doivent poser.",
    tags: ["Next.js · WordPress", "Contenu et structure"],
  },
  {
    index: "02",
    title: "Design web",
    description:
      "Un design d'interface et visuel qui part du quotidien de vos clients, pas d'un gabarit.",
    tags: ["Design d'interface", "Systèmes de design"],
  },
  {
    index: "03",
    title: "Référencement et performance",
    description:
      "Référencement technique, données structurées et Core Web Vitals — les failles que personne ne voit avant que le trafic cesse d'arriver.",
    tags: ["Audits", "Recherche locale"],
  },
  {
    index: "04",
    title: "Applications web et SaaS",
    description:
      "Systèmes de réservation, portails clients et plateformes multilocataires qui remplacent le chiffrier sur lequel l'entreprise repose en silence.",
    tags: [".NET · TypeScript", "Stripe"],
  },
  {
    index: "05",
    title: "Accompagnement après le lancement",
    description:
      "Hébergement, surveillance, mises à jour et améliorations continues. Nous restons après le lancement — la relation est le livrable.",
    tags: ["Maintenance", "Itération"],
  },
];

export const processStepsFr: ProcessStep[] = [
  {
    index: "01",
    title: "La clarté d'abord",
    description:
      "Avant la première ligne de code, nous trouvons la seule chose que ce site doit réussir — et nous vous aidons à reporter le reste.",
  },
  {
    index: "02",
    title: "Concevoir et développer ensemble",
    description:
      "Aucun mur de transfert. Les personnes qui le conçoivent sont celles qui le développent : ce qui est livré ressemble encore au design.",
  },
  {
    index: "03",
    title: "Bâti pour durer",
    description:
      "Du code propre, de vraies frontières, une performance mesurée. La deuxième année coûte moins cher que la première.",
  },
  {
    index: "04",
    title: "Partenaire, pas fournisseur",
    description:
      "Un accès direct aux personnes qui bâtissent votre site, et nous restons après le lancement.",
  },
];

/**
 * TODO(content): comme la version anglaise, ces témoignages sont des exemples
 * destinés à démontrer la mise en page. À remplacer par de vraies citations
 * attribuables avant la mise en ligne.
 */
export const testimonialsFr: Testimonial[] = [
  {
    quote:
      "Ils ont posé de meilleures questions que nos trois dernières agences réunies. Le développement a presque été la partie facile.",
    author: "Responsable des opérations",
    role: "Groupe de conditionnement physique",
  },
  {
    quote:
      "Le téléphone ne sonne pratiquement plus pour les rendez-vous. Ça seul m'a redonné la moitié de mes matinées.",
    author: "Propriétaire",
    role: "Optimum Car Health",
    featured: true,
  },
  {
    quote:
      "Nous avons livré en neuf semaines ce que notre équipe interne cadrait depuis huit mois.",
    author: "Fondateur",
    role: "Jeune pousse SaaS",
  },
  {
    quote:
      "La première agence à remettre notre devis en question au lieu de simplement le facturer. Ça nous a épargné un trimestre de travail.",
    author: "Gestionnaire de produit",
    role: "Logistique",
  },
  {
    quote:
      "Deux ans plus tard, la base de code reste facile à intégrer pour un nouvel employé. Ce n'était pas notre expérience avant.",
    author: "Directeur technique",
    role: "Plateforme B2B",
  },
  {
    quote:
      "Nos bénévoles mettent la saison entière à jour sans appeler personne. C'était tout l'objectif.",
    author: "Administratrice de club",
    role: "Club de Natation Mustang",
  },
];

export const statsFr: Stat[] = [
  { label: "Produits livrés", value: 24, suffix: "+" },
  { label: "Score Lighthouse moyen", value: 96 },
  { label: "Rétention des clients", value: 100, suffix: "%" },
  { label: "À Montréal depuis", value: 2023, literal: true },
];

export const journeyFr: JourneyEntry[] = [
  {
    year: "2023",
    title: "La vision naît",
    description:
      "Phiro commence par une conviction : la plupart des logiciels sont construits à l'envers — livrés vite, jamais compris. Les premiers mandats sont des sites web, et la discipline commence là.",
  },
  {
    year: "2024",
    title: "Poser les fondations",
    description:
      "La pile technologique se fixe : Next.js et TypeScript à l'avant, .NET et Dapper derrière, l'architecture propre comme non-négociable. Les projets grossissent et les frontières se précisent.",
  },
  {
    year: "2025",
    title: "Lancement et élan",
    description:
      "Members est livré — un SaaS multilocataire complet avec facturation, authentification et rapports. Phiro passe des sites web aux produits qui les accompagnent.",
  },
  {
    year: "La suite",
    title: "Élargir la vision",
    description:
      "Plus de sites clients, des partenariats plus longs, et une barre qui continue de monter. L'objectif n'a jamais été le volume — c'était de bâtir des choses qui tiennent.",
  },
];

export const valuesFr: Value[] = [
  {
    title: "Simple, pas simpliste",
    description:
      "La complexité est facile à ajouter et coûteuse à retirer. Nous investissons l'effort au départ pour que le produit reste compréhensible.",
  },
  {
    title: "Bâti pour durer",
    description:
      "Une vraie structure, une performance mesurée. La deuxième année d'un site devrait coûter moins cher que la première, pas plus.",
  },
  {
    title: "L'humain d'abord",
    description:
      "Les sites web sont utilisés par des personnes pressées. Chaque décision se mesure à cela, pas à un cahier des charges.",
  },
  {
    title: "Honnêtes sur les compromis",
    description:
      "Nous vous dirons quand une demande est une mauvaise idée, et pourquoi. Vous payez pour du jugement, pas pour de l'approbation.",
  },
];
