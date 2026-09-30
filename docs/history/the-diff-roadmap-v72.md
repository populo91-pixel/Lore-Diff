> Archive de la direction antérieure. Depuis le 30 septembre 2026, la roadmap active est [Lore Diff — direction et roadmap](../lore-diff-roadmap.md). Les projets globaux décrits ici ne sont plus des priorités.

# Lore Diff — transformation progressive

## Socle initial (v65)

Le site est un mélange de pages statiques (`public/*.html`, CSS et JS), de routes Next (`app/play`, `app/multi`) et de cinq API serveur. La base D1 est déjà active pour le défi quotidien et les salons multijoueurs. La navigation et les boucles de jeu sont surtout propres à chaque page.

| À garder | Rôle dans la suite |
| --- | --- |
| Idle WoW, Pokémon, LoL, Street Fighter et 40K | Entraînement spécialisé et contenu propre à chaque licence. |
| Runs par univers | Matière pour des certifications distinctes, sans leur imposer le même format. |
| Défi quotidien D1 | Rendez-vous partagé, score classé et défi entre amis. |
| Banque `app/quiz/quiz-data.ts` et multi `lib/multi-bank.ts` | Questions existantes à adapter à un modèle commun. |
| Moteur et salon multi | Base serveur pour le futur duel à seed commune. |
| HUD et effets arcade | Langage visuel et feedback à harmoniser, avec la personnalité des univers. |

Les redondances les plus coûteuses : scores, vies et records calculés séparément ; sélections de questions et identités de difficulté propres à chaque jeu ; multiplication des QCM et des runs qui alternent les mêmes modes Idle. Les blocages : aucun profil global vérifiable, pas de contrat de contenu commun (catégorie, difficulté, mécanique, sources fiables), pas de compte pour retrouver un profil sur plusieurs appareils, données audio/visuelles parfois externes, et aucun moteur partagé pour les mutateurs et les certifications. Les jeux existants ne doivent pas être convertis d'un coup.

## Première tranche jouable : The Diff / expédition 01

Trois univers existants : Azeroth, Pokémon et Runeterra. Douze paliers maximum, trois vies, une question textuelle par palier. Le joueur peut répondre sans choix pour doubler la valeur, ou révéler quatre choix. La sélection du prochain sujet donne priorité aux aptitudes où le joueur a été moins juste dans ses runs, sans répéter la même question. Après chaque secteur de trois paliers, il peut conserver son score et terminer, ou continuer avec un multiplicateur supérieur. Les règles initiales sécurisaient chaque secteur. Les nouvelles runs utilisent désormais les règles v2 décrites ci-dessous ; les runs déjà ouvertes gardent leurs règles originales. Le serveur décide des questions, des réponses et des scores. Le record et les taux par univers/aptitude sont calculés à partir des runs terminées, dans D1. Un cookie rattache le joueur à ce navigateur ; il n'y a pas de compte ni de synchronisation entre appareils. Les autres jeux ne contribuent pas encore au relevé, ce qui est indiqué à l'écran.

Ce prototype teste réellement le choix « répondre tôt / voir les choix » et « bank / push », ainsi qu'une première adaptation par faiblesse. Ce n'est pas encore la run infinie promise, ni le Player DNA de tout le site, ni une certification.

## Architecture cible sans migration massive

1. **Contrat `Challenge` versionné** : identifiant stable, univers, compétences testées, source, difficulté, famille mécanique, charge utile, méthode de validation et explication. Chaque univers fournit un adaptateur et garde ses écrans particuliers. Un contenu sans média fiable offre une mécanique textuelle valide ; il n'affiche pas un bouton audio ou visuel cassé.
2. **Moteur de run côté serveur** : seed, pool sans répétition, événements de réponse, checkpoints, vies, score et mutateurs composables. Les règles de score restent versionnées avec la run pour qu'un changement ne réécrive pas les résultats passés. La validation et les réponses ne sortent jamais avant la correction.
3. **Événements de maîtrise** : une épreuve terminée émet univers, aptitude, difficulté, variante et issue. Un agrégat Player DNA conserve échantillons et taux, puis une maîtrise par univers. Une jauge montre aussi combien de données l'étayent ; elle ne prétend pas connaître le joueur après trois questions.
4. **Identité** : le cookie actuel permet un essai persistant sur un navigateur. Ajouter un compte facultatif et une fusion explicite des historiques avant tout profil multi-appareil ou classement nominatif. Le multi existant peut utiliser le même contrat de question sans remplacer les salons actuels.

## Roadmap

| Étape | Livrable vérifiable | Critère de sortie |
| --- | --- | --- |
| 1. Preuve jouable | Expédition 01, décision bank/push, réponse libre/choix, record D1, premiers signaux DNA. | Une run peut être terminée, perdue, reprise après rechargement et rejouée sans modifier les jeux existants. |
| 2. Contenu et mesure | Adaptateurs WoW/Pokémon/LoL avec catégories fiables, variantes visuelles/audio seulement si assets vérifiés ; échantillons et difficulté mieux calibrés. | Chaque univers apporte au moins deux mécaniques distinctes et ses erreurs nourrissent le même profil. |
| 3. Player DNA global | Événements émis par Daily et les jeux convertis progressivement, agrégats D1, fiche partageable sans données personnelles exposées. | Les modes reliés influencent réellement la fiche et la sélection des prochaines épreuves. |
| 4. Endgame | Pool assez profond pour The Diff longue, mutateurs testés, catégories transversales The Connection éditées et sourcées. | Le système évite les répétitions et affiche honnêtement la limite du contenu. |
| 5. Maîtrise et multi | Certifications spécifiques par univers, puis duel à seed commune et party run sur le contrat partagé. | Autorité serveur, équité des questions et progression cohérente entre solo et multi. |

Priorité après cette tranche : approfondir les familles existantes, puis relier progressivement les autres jeux au profil commun. La difficulté ne doit pas se résumer à masquer quatre boutons.


## Priorités validées après comparaison — 29 septembre 2026

Références : [LoLdle](https://loldle.net), [Pokédle](https://pokedle.net), [Gamedle](https://www.gamedle.wtf), [Bandle](https://bandle.app), [Trivia Murder Party 2](https://www.jackboxgames.com/games/trivia-murder-party-2). Les recommandations concernent leur structure de jeu observable, sans prétendre mesurer leur rétention.

| Priorité | État | Livrable |
| --- | --- | --- |
| Risque compréhensible | Implémenté, règles v2 | Encaisser termine ; pousser laisse les points exposés. Au palier 6 uniquement, 50 % sont protégés. Montants de perte et de gain affichés avant de choisir. |
| Progression des contraintes | Première tranche implémentée | Deux aides seulement pour révéler les choix dans les paliers 7–12. Passer coûte une vie et rapporte zéro point. |
| Bilan utile | Première tranche implémentée | Force et faiblesse de la run avec nombre de réponses, correction des erreurs, lien d'entraînement vers l'univers concerné, record et rejouer. |
| Difficulté réelle et variété | Première tranche implémentée, règles v3 | 45 défis édités : déduction, intrus, association dans chaque univers. Les trois formats apparaissent dans chaque secteur. Sujets accessibles aux paliers 1–3, confirmés aux paliers 4–6 et experts aux paliers 7–12. |
| Trois défis ciblés après bilan | À développer | Prescrire puis jouer trois épreuves sur une faiblesse ; aujourd'hui le lien mène au Run existant, pas à une sélection personnalisée. |
| Player DNA commun | À développer | Relier Daily puis Idles/Runs, conserver difficulté, usage d'indices et nombre d'échantillons ; « en cours de découverte » pour les petits volumes. |
| Défi équitable entre amis | À développer | Seed et règles communes, résultat partageable ; séparer cette compétition des entraînements personnalisés. |
| Accueil qui donne une raison de revenir | À compléter | Reprendre, défi quotidien, battre son record ; univers accessibles en carrousel et accès lisibles déjà présents. |
| Saisie et médias robustes | À développer | Variantes acceptées, recherche de noms quand pertinente, aucun média indisponible ne coûte une vie. |

### Règles v2 de The Diff

Douze épreuves, trois vies. Après 3, 6 et 9 épreuves, encaisser protège le total et termine la partie. Pousser augmente le multiplicateur sans protéger automatiquement les gains : une défaite ramène au montant sécurisé. Seule la continuation au palier 6 protège la moitié du total courant. Les six premières épreuves gardent les choix à la demande ; les six dernières partagent deux aides. Réponse libre ×2, réponse avec choix ×1. Pas d'argent ni de récompense achetée. Les règles sont stockées dans la partie, et les anciennes parties restent compatibles. Les résultats passés ne sont pas recalculés.

Le bilan qualifie seulement les observations de cette run ; il affiche les effectifs pour ne pas présenter une réponse isolée comme une maîtrise durable. Pas encore de défi social identique, de nouveaux formats audio/visuels, ni de profil global tous jeux.

## Contenu et variété — tranche du 30 septembre 2026

Les deux premières priorités de cette tranche sont implémentées : diversifier The Diff, puis enrichir les Idles et Runs existants. Cela ne termine pas les chantiers Player DNA global, entraînement personnalisé ni multijoueur équitable ci-dessus.

### The Diff : règles v3

Chaque secteur propose une déduction à indices progressifs, un intrus et une association interactive de trois paires. Chaque univers rencontre les trois familles au cours d’une expédition complète. Aucun défi ne se répète dans une run. Les sujets et distracteurs changent avec le niveau ; les deux derniers secteurs utilisent la banque experte. Le calibrage reste éditorial, à affiner avec les résultats réels.

Un défi vaut au maximum 200 points avant multiplicateur. Un indice ou un lien confirmé retire 50 points à sa valeur, avec un minimum de 50. Pour une déduction, les choix ramènent la base de 200 à 100 points avant la réduction due aux indices. Les six derniers paliers partagent deux aides pour les indices, liens confirmés et choix. L’écran affiche la valeur réelle de chaque option. Les règles bank/push et le checkpoint à 50 % au palier 6 restent ceux de v2.

Les identifiants historiques des questions sont conservés. Les runs v1/v2 déjà ouvertes conservent leur banque, leurs scores et leurs règles. Le serveur valide les associations et ne transmet ni solution ni correction avant la réponse. Le profil demeure limité aux runs The Diff terminées sur ce navigateur.

### Jeux existants

| Jeu | Enrichissement de cette tranche |
| --- | --- |
| Pokéidle | 8 évolutions ajoutées : échanges, objets, pierres et conditions nocturnes, avec le contexte Pokémon Platine. Banque de 26 évolutions ; illustrations locales pour chaque étape. La série quotidienne déjà commencée est restaurée par ses identifiants. |
| Pokémon Run | 12 dossiers de déduction/intrus ajoutés. Banque de 515 questions ; sélection toujours équilibrée entre générations I–IV. |
| WoWidle | 3 dossiers d’armes contextualisés par époque/porteur ; 5 raids ajoutés à la banque d’intrus. Les raids de moins de trois boss servent uniquement à fournir des intrus. |
| Azeroth Run | 12 nouveaux dossiers de lore/intrus, intégrés aux formats existants. |
| LoLidle | 10 codes emoji supplémentaires. Les champions sans citation ne sont jamais sélectionnés pour le mode Citation. |
| Runeterra Run | 12 dossiers de déduction/intrus ; la sélection répartit les familles et évite deux formats identiques consécutifs lorsque le pool le permet. |
| Street Run | 6 dossiers de casting SFIII–SF6 remplacent les anciens castings SFII dans les nouvelles runs ; écoles, disciplines, pays et premiers épisodes. Tirage de trois dossiers avec historique. |
| Streetidle | Historique par mode pour les identités Classique, Voix, Technique, Illustration et Emoji ; les identités anciennes reviennent après épuisement des inédites. OST conserve sa rotation existante. |
| 40Kidle / 40K Run | Mode Ordre de mission : 8 objectifs de reconnaissance du rôle d’une unité. 16 unités supplémentaires alimentent aussi l’intrus. La run mélange désormais quatre formats. |
| Krosmoz Run | 8 dossiers de déduction, intrus et connexion ; répartition des familles améliorée. |

Les nouveaux emojis et raids sont disponibles immédiatement en entraînement ; leur introduction quotidienne est datée du 1er octobre pour conserver le tirage du 30 septembre. Les médias existants restent en place ; aucun son externe n’a été ajouté à cette tranche. Les nouvelles illustrations Pokémon viennent du dépôt [PokeAPI/sprites](https://github.com/PokeAPI/sprites/tree/master/sprites/pokemon/other/official-artwork), fichiers numérotés conservés dans `public/assets/reveal/`.

### Vérifications

- Moteur The Diff : 180 expéditions complètes, diversité par secteur/univers, progression, unicité, indices, réponses courtes, encaissement, défaite et compatibilité v2.
- API The Diff avec SQLite : trois expéditions complètes, reprise, propriétaire, origine, confidentialité des réponses, réponses simultanées, actions invalides, indices et profil sauvegardé.
- Interactions The Diff sans rendu navigateur : complétion et modification des liens, retrait des doublons, lien confirmé, affichage des points et soumission d’un intrus.
- Street : six castings, leurs portraits locaux et 50 tirages ; 40K : huit objectifs d’unité, 48 unités et 160 dossiers d’intrus.
- Idles : contenu, fichiers locaux, conditions des équipes, 210 tirages, sauvegarde et score ; 300 tirages Pokémon Run équilibrés I–IV.
- Types TypeScript et compilation de production vérifiés avant publication. Le rendu visuel réel sur téléphone reste à examiner avec un navigateur.
