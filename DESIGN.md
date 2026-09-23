# Du Pain sur la Planche — système visuel (refonte)

Sources : compte Instagram public @du_pain_sur_la_planche_29 (bio, ~30 posts
consultés le 23/09/2026), logo réel déjà présent dans `images/logo.png`, et
l'avant-projet d'agencement du futur magasin (PDF EVEMA, 11/06/2026, fourni
par la boulangère — **non reproduit sur le site**, document confidentiel,
utilisé uniquement comme référence de palette/matériaux/mobilier).
Complément oral de la boulangère (23/09/2026) : histoire des fondateurs,
équipe, partenariat boissons.

Rien n'est inventé côté identité ou côté faits. Ce qui reste à fournir est
marqué `[ENTRE CROCHETS]`. Les photos dans `images/instagram/` sont des
captures du compte Instagram réel (à remplacer par les fichiers originaux
haute résolution quand la boulangère les fournira).

## Ce que disent les références

| Observé | Conséquence pour le site |
|---|---|
| Logo réel : mascotte chef au trait (toque, bandeau, épaules), sans visage, dans un sceau noir rond avec « DU PAIN SUR LA PLANCHE » tracké autour | Le sceau devient l'élément signature : il s'appose comme un tampon, écho du palet en chocolat blanc que le pâtissier pose sur chaque dessert |
| Mobilier du futur magasin (avant-projet EVEMA) : plusieurs **planches à découper suspendues au plafond**, façon luminaire/déco | La planche (forme rectangulaire, trou de suspension, fil du bois) devient le support visuel des sections — pas des cartes, des planches |
| Frise rayures noir & blanc en haut de mur, utilisée avec parcimonie dans le futur magasin | Reprise en fine bande décorative, jamais en fond plein (le commit `57ba97f` avait déjà retiré une version « sale » de cette rayure — on la garde nette et rare) |
| Bois clair (chêne casella naturel), murs beige doux, touches noir mat | Palette bois chaud + crème + noir doux, pas de gris SaaS |
| Chaises bistrot en rotin/cannage, tables rondes claires à pied filaire noir | Ambiance café de quartier, pas hôtel |
| Graphismes Instagram : fond crème, gros aplats caramel façon marqueur, script « brush » chaleureux pour les annonces (« On vous accueille », « Nous recrutons », « Réouverture ») + capitales trackées pour la structure | Script brush réservé aux accroches ponctuelles ; capitales trackées pour les repères (eyebrows, prix, navigation) |
| Vraies photos : caissons kraft brunch, sandwichs sur pain garni, macarons, viennoiseries en vitrine | Remplacent les visuels génériques dans `images/instagram/` |
| Bio Instagram : Boulangerie Pâtisserie Snacking — 33 Allée de Kernisy, Quimper | Adresse réelle utilisée en pied de page / contact |

## Concept créatif central

Le nom du commerce est un jeu de mots littéral : *du pain sur la planche*.
Le site prend ce nom au pied de la lettre — chaque section est composée
comme un objet posé sur une planche en bois, légèrement de travers, comme
disposée à la main par le boulanger. Au scroll, les planches d'arrière-plan
dérivent doucement (écho direct des planches suspendues au plafond du futur
magasin). Un seul grand moment signature : en arrivant sur la section
« Notre histoire », le sceau-mascotte s'appose comme un tampon — rotation,
approche, léger rebond d'impact — avant de laisser place au texte, comme la
pastille que Jérémy pose sur chaque pâtisserie.

## 1. Personnalité
Une boulangerie-pâtisserie de quartier tenue par deux anciens collègues,
Justine et Benoist, qui ont additionné leurs métiers (boulangerie,
pâtisserie, traiteur, vente) pour ouvrir leur propre maison en 2022. Une
équipe jeune, entourée d'artisans passionnés. Le ton reste artisanal et
direct, jamais luxueux, avec une pointe de malice qui vient de leur propre
mascotte-tampon.

## 2. Typographie
- **Fraunces** (serif à empattements marqués, graisses 600–700 sur les
  titres) — solide, sculpté, proche d'une enseigne peinte à la main plutôt
  que d'un édito minimaliste.
- **Jost** (géométrique, capitales trackées 0.18–0.3em) — repères, eyebrows,
  navigation, prix.
- **Caveat** (script brush) — réservé aux accroches ponctuelles qui imitent
  les propres graphismes Instagram de la boulangerie (annonces, légendes
  manuscrites), jamais pour un titre principal.
- Work Sans en secours pour le corps de texte long (lisibilité).

## 3. Palette
| Token | Hex | Origine |
|---|---|---|
| `--paper` | #F7F0E1 | crème des visuels Instagram |
| `--paper-2` | #EEE1C7 | kraft clair / fond planche |
| `--oak` | #B9834F | chêne casella naturel (décor Egger du magasin) |
| `--oak-dark` | #8C5F35 | ombre du bois |
| `--ink` | #2A211B | noir doux (soft black U899, texte) |
| `--ink-soft` | #5B4C40 | texte secondaire |
| `--caramel` | #C08A3E | accent marqueur des visuels Instagram |
| `--cream-white` | #FFFCF5 | blanc chaud (vitrines, cartes) |
| `--stripe` | #201B17 | rayure noir & blanc, très dosée |

## 4. Traitement photo
Photos réelles (Instagram + boutique), recadrées irrégulièrement, jamais en
carte à coins ronds uniformes : posées comme sur un plan de travail, parfois
légèrement pivotées, ombre portée douce et directionnelle plutôt que ombre
de carte générique.

## 5. Langage graphique
- **Le sceau** : cercle noir mat, mascotte chef au trait en blanc, texte
  tracké en cercle. Utilisé comme tampon (accroche visuelle) et comme repère
  de marque (jamais comme simple logo redondant).
- **La planche** : rectangle à coins légèrement arrondis, trou de suspension
  en haut, léger grain de bois en fond ; support des titres de section et
  des visuels, jamais une "card" à ombre uniforme.
- **La frise rayée** : bande fine (8–14px) noir & blanc, utilisée en
  bordure de section rare, jamais en fond plein.

## 6. Mise en page
Sections asymétriques, gouttière `clamp(20px, 5vw, 72px)`, alignements
décalés d'une planche à l'autre. Pas de grille de cartes identiques.

## 7. Interactions
Liens soulignés au survol, focus visible caramel. Les planches
d'arrière-plan dérivent au scroll (amplitude modeste). Le sceau s'anime une
fois, à l'entrée de la section histoire.

## 8. Animation
`prefers-reduced-motion` respecté : dérive et tampon désactivés, état final
statique conservé. Aucun fade-in systématique.

## 9. Mobile
Moins de planches d'arrière-plan, disposées en une seule colonne. Le sceau
s'anime en un mouvement simple (scale) sans dépendre de la position de
scroll fine.

## Informations non confirmées
Les éléments suivants restent `[ENTRE CROCHETS]` en attendant confirmation :
horaires précises, téléphone, e-mail, prix. L'adresse (33 Allée de Kernisy,
Quimper) vient de la bio Instagram publique et est donc considérée fiable.
