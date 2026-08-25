import type { Post } from "@/content/blog/types";

/**
 * French translation of `why-your-agency-website-doesnt-rank`.
 * Paired to it by `translationKey`, which is what hreflang reads — the slug is
 * translated on purpose, so it cannot be the join key.
 */
export const post: Post = {
  slug: "pourquoi-votre-site-agence-ne-se-classe-pas",
  locale: "fr",
  translationKey: "agency-site-seo-teardown",
  title: "Pourquoi le site de votre agence ne se classe pas",
  excerpt:
    "Cinq défauts techniques qui empêchent les sites d'agence de se classer : hôte canonique erroné, métadescriptions ignorées, absence de balisage d'entité. Trouvés sur notre propre site.",
  category: "Référencement technique",
  tags: [
    "référencement technique",
    "Next.js",
    "données structurées",
    "Core Web Vitals",
    "URL canoniques",
  ],
  publishedAt: "2026-08-25",
  author: {
    name: "Xavier Dugal",
    role: "Fondateur, Phiro Technologies",
  },
  cover: {
    src: "/SeoThumbnail.png",
    alt: "Une page de résultats affichant un extrait généré automatiquement au lieu d'une métadescription rédigée",
  },
  featured: true,
  body: [
    {
      type: "paragraph",
      text: "La plupart des sites d'agence sont magnifiques et invisibles. Le design est réfléchi, les textes sont serrés, les animations sont fluides — et le site ne se classe pour rien d'autre que son propre nom de domaine tapé directement dans la barre d'adresse. Le diagnostic habituel : il faudrait bloguer davantage. C'est généralement faux. Le site n'est pas sous-publié ; il est mal configuré techniquement, d'une manière que personne ne remarque, parce que la page paraît parfaite à un humain.",
    },
    {
      type: "paragraph",
      text: "Je le sais parce que j'ai audité notre propre site avant d'écrire ceci. Quatre des cinq points ci-dessous y étaient de véritables défauts — pas des cas hypothétiques, mais des problèmes reproductibles qui nous coûtaient du trafic. Le cinquième, nous l'avions déjà bien fait, et c'est celui que je vois le plus souvent mal fait partout ailleurs. Les voici, avec ce que chacun provoque réellement et comment le corriger.",
    },
    {
      type: "callout",
      tone: "note",
      title: "À qui ça s'adresse",
      text: "À quiconque exploite un site de studio ou d'agence sur Next.js, Astro ou une pile statique moderne. Les exemples de code visent Next.js 15 (App Router), mais quatre des cinq défauts sont indépendants du cadriciel.",
    },
    {
      type: "heading",
      level: 2,
      id: "canonical-host",
      text: "Votre hôte canonique ment à Google",
    },
    {
      type: "paragraph",
      text: "C'est celui qui m'a surpris, et c'est le défaut sérieux le plus courant que je rencontre. Votre site est accessible sous deux noms d'hôte — le domaine nu et le sous-domaine `www` — et l'un redirige vers l'autre. Très bien. Mais quelque part dans votre code se trouve une URL de base codée en dur, et elle pointe très probablement vers celui que vous avez tapé de mémoire plutôt que vers celui qui sert réellement la page.",
    },
    {
      type: "paragraph",
      text: "La nôtre pointait vers le domaine nu. Le domaine nu redirige en 307 vers `www`. Chaque balise canonique, chaque URL OpenGraph et chaque URL d'image absolue que nous générions dirigeait donc Google vers un nom d'hôte qui le renvoie aussitôt ailleurs.",
    },
    {
      type: "code",
      lang: "bash",
      caption:
        "Vérifiez le vôtre en une commande. L'en-tête Location indique l'hôte que vous devriez déclarer.",
      code: "curl -sSI https://exemple.com | grep -iE '^(HTTP|location)'\n\n# HTTP/1.1 307 Temporary Redirect\n# Location: https://www.exemple.com/",
    },
    {
      type: "paragraph",
      text: "Deux choses tournent mal. D'abord, **une 307 est une redirection temporaire** : elle dit explicitement aux robots que le déplacement n'est pas permanent et que l'URL d'origine doit rester indexée. C'est l'inverse d'une consolidation ; il vous faut une 301 ou une 308. Ensuite, une balise canonique qui pointe vers une URL de redirection est un signal contradictoire : la page affirme que sa vraie version se trouve à une adresse, et cette adresse répond qu'elle se trouve en fait ailleurs. Google finit par trancher, mais vous avez dépensé de l'autorité dans l'aller-retour et divisé vos signaux entre deux hôtes entre-temps.",
    },
    {
      type: "code",
      lang: "ts",
      caption:
        "Le correctif : une seule constante, utilisée partout, pointant vers l'hôte qui répond 200.",
      code: '// src/lib/seo.ts\nexport const SITE_URL = "https://www.exemple.com";\n\n// src/app/layout.tsx\nexport const metadata: Metadata = {\n  metadataBase: new URL(SITE_URL),\n  alternates: { canonical: "/" },\n};',
    },
    {
      type: "paragraph",
      text: "Corrigez ensuite la redirection elle-même au niveau de la plateforme. Sur Vercel, les réglages de domaine émettent une redirection temporaire par défaut ; passez-la en permanente. Sur Cloudflare ou nginx, assurez-vous que la règle renvoie une 301 plutôt qu'une 302.",
    },
    {
      type: "heading",
      level: 2,
      id: "meta-descriptions",
      text: "Google ignore les descriptions que vous avez écrites",
    },
    {
      type: "paragraph",
      text: "Voici une chose que la plupart des gens ignorent : **la métadescription n'est pas une directive.** C'est une suggestion. Google l'utilise lorsqu'il juge qu'elle résume vraiment utilement la page pour la requête en cours. Sinon, il écarte la vôtre et fabrique un extrait en piochant des fragments de phrases dans le contenu de la page.",
    },
    {
      type: "paragraph",
      text: "Cet extrait fabriqué est ce qui donne aux résultats de recherche cet air cassé : des bouts de phrases décousus, une étiquette de menu, une demi-intertitre, un fragment de témoignage. Si vos résultats ressemblent à du texte gratté, voilà pourquoi. Ce n'est pas un bogue d'affichage. C'est Google qui vous dit que votre description n'était pas assez bonne pour être utilisée.",
    },
    {
      type: "paragraph",
      text: "Les descriptions systématiquement écartées partagent un petit nombre de traits :",
    },
    {
      type: "list",
      items: [
        "**Absente ou trop courte.** Rien à exploiter : Google fabrique la sienne.",
        "**Formule générique.** La même phrase sur chaque page ne dit rien de spécifique, alors il cherche mieux dans le corps du texte.",
        "**Bourrée de mots-clés.** Lue comme du pourriel, donc écartée.",
        "**Dupliquée entre les routes.** Signale que les pages sont quasi identiques, ce qui est un problème distinct et pire.",
      ],
    },
    {
      type: "paragraph",
      text: "Le correctif n'a rien de glorieux : rédigez à la main une description distincte pour chaque route indexable, de 140 à 160 caractères, en menant avec le bénéfice concret plutôt qu'avec le nom de la marque. Traitez-la comme un texte publicitaire qui se trouve à vivre dans votre balise head. Et surtout — ne la dérivez jamais automatiquement du premier paragraphe de la page. C'est exactement l'entrée qui produit une description que Google jettera.",
    },
    {
      type: "callout",
      tone: "warn",
      title: "Le piège de la plupart des CMS",
      text: "Les descriptions générées automatiquement — le fameux réglage « les 155 premiers caractères du contenu » — donnent l'impression d'un problème réglé, et constituent le moyen le plus fiable de garantir que chacun de vos extraits sera réécrit.",
    },
    {
      type: "heading",
      level: 2,
      id: "entity-disambiguation",
      text: "Votre nom de marque est moins unique que vous ne le croyez",
    },
    {
      type: "paragraph",
      text: "Cherchez notre nom et vous obtenez une trousse de robotique pour enfants, une firme d'électronique automobile, une société-conseil en données et un studio danois de visualisation 3D. Nous nous situions sous chacun d'eux. Ce n'est pas un problème de classement au sens habituel — personne ne nous a battus sur le contenu. Google n'avait simplement pas assez d'information pour savoir que nous étions une entité distincte qui existe.",
    },
    {
      type: "paragraph",
      text: "Les données structurées corrigent cela, et presque aucun site d'agence n'en a. Un seul nœud `Organization` en JSON-LD qui déclare votre dénomination légale, votre localité, votre numéro de téléphone, votre date de fondation et — surtout — un tableau `sameAs` pointant vers des profils qui renvoient vers vous, c'est la différence entre être une chaîne de caractères non identifiée et être une entité résolvable dans le graphe de connaissances de Google.",
    },
    {
      type: "code",
      lang: "json",
      caption:
        "La déclaration d'entité minimale viable. C'est sameAs qui fait l'essentiel du travail.",
      code: '{\n  "@context": "https://schema.org",\n  "@type": ["Organization", "ProfessionalService"],\n  "@id": "https://www.exemple.com/#organization",\n  "name": "Studio Exemple",\n  "foundingDate": "2023",\n  "telephone": "+15145550100",\n  "address": {\n    "@type": "PostalAddress",\n    "addressLocality": "Montréal",\n    "addressRegion": "QC",\n    "addressCountry": "CA"\n  },\n  "sameAs": ["https://www.linkedin.com/company/studio-exemple"]\n}',
    },
    {
      type: "paragraph",
      text: "Une règle sur `sameAs` : n'y listez que des profils qui existent réellement et qui renvoient vers votre domaine. Une URL inatteignable dans ce tableau est pire qu'un tableau vide, parce que c'est une affirmation invérifiable à l'intérieur d'un bloc dont le seul but est la vérification.",
    },
    {
      type: "paragraph",
      text: "L'autre moitié se joue hors site et ne se code pas. Il vous faut une fiche d'établissement Google dont le nom, l'adresse et le téléphone sont **identiques au caractère près** à ce que déclare votre site. Google fait la correspondance par comparaison de chaînes : « Bureau 4 » et « Bur. 4 » sont deux entreprises différentes à ses yeux.",
    },
    {
      type: "heading",
      level: 2,
      id: "sitemap",
      text: "Sans plan de site, vous demandez à Google de deviner",
    },
    {
      type: "paragraph",
      text: "Un plan de site ne fera pas se classer une mauvaise page. Ce qu'il fait, c'est lever l'ambiguïté sur les URL qui existent, celles qui sont canoniques et la date de dernière modification de chacune. Sur un site de cinq pages, Google finira par tout trouver en suivant les liens. La valeur apparaît dès que vous ajoutez un blogue : les nouveaux articles sont découverts en heures plutôt qu'au prochain passage du robot.",
    },
    {
      type: "paragraph",
      text: "Dans Next.js, c'est un seul fichier, et le générer à partir de vos modules de contenu garantit qu'il ne peut jamais se désynchroniser des pages qui existent réellement.",
    },
    {
      type: "code",
      lang: "ts",
      caption:
        "src/app/sitemap.ts — dérivé du contenu : publier un article met le plan de site à jour.",
      code: 'import type { MetadataRoute } from "next";\nimport { allPosts } from "@/content/blog";\n\nexport default function sitemap(): MetadataRoute.Sitemap {\n  return [\n    { url: `${SITE_URL}/`, priority: 1, changeFrequency: "monthly" },\n    ...allPosts.map((post) => ({\n      url: `${SITE_URL}/blog/${post.slug}`,\n      lastModified: post.updatedAt ?? post.publishedAt,\n      priority: 0.7,\n    })),\n  ];\n}',
    },
    {
      type: "paragraph",
      text: "Associez-le à un `robots.txt` qui déclare l'emplacement du plan de site, et excluez les pages d'atterrissage de campagnes payantes. Ces pages reprennent généralement vos textes de services : les laisser entrer dans l'index revient à vous concurrencer vous-même sur vos propres mots-clés.",
    },
    {
      type: "heading",
      level: 2,
      id: "core-web-vitals",
      text: "Vos images vous coûtent discrètement des positions",
    },
    {
      type: "paragraph",
      text: "Les Core Web Vitals sont un facteur de classement confirmé, et sur un site d'agence porté par le design, la métrique qui échoue est presque toujours le **Largest Contentful Paint** — parce que le plus grand élément de contenu est une image pleine largeur exportée à 3000 pixels et déposée dans une simple balise `img`.",
    },
    {
      type: "paragraph",
      text: "Chaque balise brute livre l'original en pleine résolution, dans le format où il a été enregistré, sans attributs de largeur ni de hauteur — ce qui provoque aussi un décalage de mise en page pendant le chargement, poussant vers le bas le contenu qui suit.",
    },
    {
      type: "paragraph",
      text: "C'est le point sur lequel notre audit est revenu propre : toutes les images de contenu passent déjà par le composant d'image du cadriciel. Les seules balises brutes qui restent se trouvent dans des composants d'encadrement d'appareils — les maquettes de portable et de téléphone qui entourent nos captures d'écran — où la balise dessine un cadre plutôt qu'elle ne porte l'image. La distinction vaut la peine d'être faite, car c'est le test à appliquer à votre propre audit : une balise brute pose problème quand elle porte du contenu, pas quand elle trace une bordure.",
    },
    {
      type: "table",
      caption: "Ce qu'un composant d'image fait et qu'une balise brute ne fait pas.",
      head: ["Balise img brute", "Composant d'image du cadriciel"],
      rows: [
        ["Livre le fichier original", "Sert de l'AVIF ou du WebP selon le navigateur"],
        ["Une seule taille pour toutes les fenêtres", "Génère un srcset adaptatif"],
        ["Charge tout immédiatement", "Charge en différé sous la ligne de flottaison"],
        ["Aucune dimension intrinsèque", "Réserve l'espace : aucun décalage"],
      ],
    },
    {
      type: "paragraph",
      text: "La migration est mécanique, et c'est le meilleur rapport bénéfice-effort de toute cette liste. Marquez l'image d'en-tête comme prioritaire pour qu'elle ne soit pas chargée en différé, et laissez le reste aux réglages par défaut.",
    },
    {
      type: "heading",
      level: 2,
      id: "order",
      text: "Faites-les dans cet ordre",
    },
    {
      type: "paragraph",
      text: "Si vous n'avez qu'un après-midi, l'ordre compte plus que l'exhaustivité. Les deux premiers correctifs changent la façon dont vos pages existantes sont interprétées et présentées, ce qui se cumule avec tout ce que vous publierez ensuite. Le reste s'ajoute.",
    },
    {
      type: "list",
      ordered: true,
      items: [
        "**Corrigez l'hôte canonique.** Une constante, dix minutes, et la division des signaux cesse immédiatement.",
        "**Réécrivez chaque métadescription à la main.** Une heure d'écriture qui change la lecture de chaque résultat.",
        "**Ajoutez le JSON-LD Organization avec sameAs.** Le seul correctif qui s'attaque à l'ambiguïté du nom de marque.",
        "**Publiez un plan de site et un robots.txt.** Vingt minutes, et ça compte davantage à mesure que vous publiez.",
        "**Migrez les images vers un vrai composant d'image.** Mécanique, et le gain Core Web Vitals se mesure en une semaine.",
      ],
    },
    {
      type: "paragraph",
      text: "Rien de tout cela n'est ingénieux. C'est justement là le point. Si ces défauts persistent sur des sites par ailleurs excellents, c'est qu'ils sont invisibles pour quiconque regarde la page, y compris pour ceux qui l'ont construite. La revue de design passe. Le client est content. Et le site échoue discrètement à être trouvable par quiconque ne connaît pas déjà son nom.",
    },
    { type: "divider" },
    {
      type: "paragraph",
      text: "Nous avons reconstruit toute la couche de référencement de ce site autour des cinq correctifs ci-dessus. Si vous voulez le même audit pour le vôtre, [dites-nous ce que vous construisez](/fr/contact) — nous répondons en un jour ouvrable.",
    },
  ],
  faq: [
    {
      question: "Combien de temps avant que les correctifs techniques agissent sur le classement ?",
      answer:
        "Les correctifs de canonique et de redirection se manifestent généralement en une à trois semaines, une fois que Google a recensé de nouveau et consolidé les hôtes en double. Les métadescriptions réécrites peuvent apparaître en quelques jours. Les données structurées et la levée d'ambiguïté d'entité sont les plus lentes : comptez de quatre à huit semaines avant qu'une requête de marque bouge vraiment, parce que cela dépend de la réévaluation de votre entité face aux entités concurrentes.",
    },
    {
      question: "Un petit site d'agence a-t-il vraiment besoin d'un plan de site ?",
      answer:
        "Pour cinq pages statiques, Google trouvera tout en suivant les liens internes : le plan de site apporte peu. Il devient réellement utile dès que vous ajoutez un blogue ou une section qui grandit, parce qu'il fait passer la découverte des nouveaux articles de quelques jours à quelques heures et fournit une date de modification fiable.",
    },
    {
      question: "Pourquoi Google réécrit-il ma métadescription ?",
      answer:
        "Parce que la métadescription est une suggestion, pas une directive. Google la remplace par un extrait bâti à partir du contenu de la page dès qu'il la juge mal adaptée à la requête — le plus souvent quand elle est absente, trop courte, dupliquée entre les pages, générique ou générée automatiquement à partir du corps du texte. Rédiger une description distincte et précise par page est le seul correctif fiable.",
    },
    {
      question: "Une redirection 307 nuit-elle au référencement ?",
      answer:
        "Elle est plus faible qu'elle ne devrait l'être pour un déplacement permanent. Une 307 indique aux robots que la redirection est temporaire et que l'URL d'origine doit rester indexée, soit l'inverse de ce que l'on veut en consolidant un domaine nu vers www. Utilisez une 301 ou une 308 pour que les signaux de classement se consolident sur un seul hôte canonique.",
    },
  ],
};
