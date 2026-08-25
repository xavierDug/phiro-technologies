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
    eyebrow: "Plateformes",
    title: "Ingénierie produit et SaaS",
    description:
      "Plateformes multilocataires, facturation et tableaux de bord — conçus pour survivre à leur deuxième année, pas seulement à leur lancement.",
    span: 3,
  },
  {
    index: "02",
    eyebrow: "Applications",
    title: "Applications web",
    description:
      "Outils internes et applications clients qui remplacent le chiffrier sur lequel l'entreprise repose en silence.",
    span: 3,
  },
  {
    index: "03",
    eyebrow: "Sites web",
    title: "Sites vitrines",
    description: "Des sites rapides et distinctifs que votre équipe peut vraiment modifier.",
    span: 2,
  },
  {
    index: "04",
    eyebrow: "Design",
    title: "Design d'interface",
    description:
      "Un design qui part du quotidien dans lequel vos utilisateurs sont déjà.",
    span: 2,
  },
  {
    index: "05",
    eyebrow: "Partenariat",
    title: "Nous restons après le lancement",
    description:
      "Surveillance, itération, et le retrait constant de ce qui vous ralentit.",
    span: 2,
  },
];

export const processStepsFr: ProcessStep[] = [
  {
    index: "01",
    title: "La clarté d'abord",
    description:
      "Avant la première ligne de code, nous cherchons la seule chose que ce produit doit réussir. La plupart des mandats en contiennent trois ; nous vous aidons à choisir celui qui compte et à reporter le reste.",
  },
  {
    index: "02",
    title: "Design et ingénierie ensemble",
    description:
      "Aucun mur de transfert. Les personnes qui conçoivent l'interface sont celles qui la développent : ce qui est spécifié est ce qui peut réellement être livré — et ce qui est livré ressemble encore au design.",
  },
  {
    index: "03",
    title: "Bâti pour évoluer",
    description:
      "Des contrats typés, une véritable couche de service, aucune logique dissimulée dans les gestionnaires de routes. La discipline ennuyeuse qui rend la deuxième année moins chère que la première.",
  },
  {
    index: "04",
    title: "Partenaire, pas fournisseur",
    description:
      "Vous avez un accès direct aux personnes qui construisent votre produit, et nous restons après le lancement. La relation est le livrable.",
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
  { label: "Années à bâtir", value: 4 },
  { label: "Score Lighthouse moyen", value: 96 },
  { label: "Rétention des clients", value: 100, suffix: "%" },
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
      "Members est livré — un SaaS multilocataire complet avec facturation, authentification et rapports. Phiro cesse d'être un studio qui fait des sites web pour devenir un studio qui bâtit des produits.",
  },
  {
    year: "La suite",
    title: "Élargir la vision",
    description:
      "Plus de travail produit, des partenariats plus longs, et une barre qui continue de monter. L'objectif n'a jamais été le volume — c'était de bâtir des choses qui tiennent.",
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
      "Des contrats typés et de vraies frontières. La deuxième année d'une base de code devrait coûter moins cher que la première, pas plus.",
  },
  {
    title: "L'humain d'abord",
    description:
      "Les logiciels sont utilisés par des personnes sous pression. Chaque décision se mesure à cela, pas à un cahier des charges.",
  },
  {
    title: "Honnêtes sur les compromis",
    description:
      "Nous vous dirons quand une demande est une mauvaise idée, et pourquoi. Vous payez pour du jugement, pas pour de l'approbation.",
  },
];
