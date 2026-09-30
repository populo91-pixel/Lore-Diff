# Pokémon Run — audit de départ

30 septembre 2026, état publié v72. Analyse de `/play/pokemon`, de sa sélection de questions, de sa banque et de ses styles. Ce document ne prétend pas mesurer le plaisir des joueurs, la durée réelle d’une session, les performances en production ni le rendu sur téléphone : ces observations restent à faire en jouant.

## Ce qui fonctionne dans la structure

- Une session de quinze épreuves, une progression visible et une fin identifiable. Aucun équipement, compte ou arbre de progression à apprendre.
- Une boucle stable : observer/lire, choisir, voir la correction, continuer. Le même geste demeure utilisable sur téléphone.
- Une identité Pokémon dans les sujets : silhouettes, types, efficacité des attaques, évolutions, personnages et régions. Les questions demandant un numéro de Pokédex sont exclues de la banque active.
- Les générations I–IV sont équilibrées dans le tirage, même si Kanto contient beaucoup plus de questions en banque.
- Les visuels Pokémon utilisent `object-fit: contain`, et l’image floutée est révélée après réponse. C’est une intention à conserver, avec dimensions à vérifier sur écran réel.
- Les réponses correctes/incorrectes ont un état visuel, une explication et un feedback arcade existant.

Ces qualités expliquent pourquoi le Run peut être une référence de simplicité. Elles ne prouvent pas encore que toutes ses épreuves sont des interactions distinctes.

## La variété réelle

Toutes les épreuves de cette route utilisent actuellement **quatre réponses à choisir**. Les intitulés COMBAT, ÉVOLUTION, INTRUS, etc. changent le raisonnement et le contenu, mais pas le contrôle utilisé. Ni le cri mystère ni le Bon sixième de Pokéidle ne sont intégrés à cette route.

La banque comprend 515 entrées et 495 identités de questions. Les vingt identités présentes dans deux niveaux viennent de questions accessibles partagées entre Facile et Normal ; il n’y a pas de doublon d’identité à l’intérieur de chacun des trois pools. Elle affiche 28 intitulés, dont 189 SILHOUETTE et 196 TYPE. Le sélecteur répartit les intitulés, ce qui limite leur domination pendant une partie.

| Niveau | Questions disponibles | Répartition Kanto / Johto / Hoenn / Sinnoh | Intitulés distincts moyens dans une run de 15 |
| --- | ---: | --- | ---: |
| Facile | 221 | 91 / 43 / 43 / 44 | 10,00 |
| Normal | 250 | 110 / 45 / 47 / 48 | 13,94 |
| Expert | 44 | 11 / 10 / 12 / 11 | 12,74 |

Mesure sur cent seeds par niveau. Sur ces 300 tirages : aucune succession de deux intitulés identiques, aucune image répétée dans une session. Cela mesure l’alternance des libellés, pas l’absence de sujets ou de raisonnements proches.

Le pool Expert est nettement moins profond : quinze questions consomment environ un tiers de ses 44 entrées. Une vraie histoire de tirage serait plus utile que l’ajout de nouveaux modes pour sa rejouabilité.

## Épreuves à privilégier

| Famille | Intérêt | Limite actuelle | Direction sans nouveau système |
| --- | --- | --- | --- |
| Reconnaître | Lecture visuelle immédiate, identité Pokémon évidente. | Plusieurs variantes restent des portraits floutés avec quatre noms. | Garder une présentation claire et un masquage utile, varier les sujets. |
| Utiliser les types | Exploiter une connaissance pour résoudre une situation. | Beaucoup de fiches demandent seulement le double type ; les rencontres demandent un multiplicateur. | Privilégier quelques choix d’action et situations lisibles avec types actuels explicités. |
| Comprendre les évolutions | Relations, pierres, échanges et conditions propres à Pokémon. | Des questions de mémoire parfois proches sous plusieurs intitulés. | Donner une situation précise et une condition à choisir, avec contexte d’édition quand nécessaire. |
| Connaître les aventures | Régions, champions, objets et légendaires donnent des respirations. | Trop de catégories affichées pour des questions ponctuelles. | Garder ce contenu dans la run sans en faire autant de modes séparés. |

## Frictions et éléments à réduire

1. **Navigation entre chaque étape.** Répondre puis continuer utilise deux liens vers la route par épreuve, avec des paramètres de partie. La durée de ces navigations n’a pas été mesurée. Vérifier leur fluidité et la conservation du point de lecture avant d’ajouter des transitions longues.
2. **Distance entre sujet, réponses et suite.** Sur mobile, les styles prévoient un visuel de 300 px, puis le type, la question, quatre réponses verticales et la correction. Le risque de scroll est à confirmer sur téléphone. Rapprocher l’action utile est prioritaire.
3. **Panneaux sans indice.** Les épreuves sans image conservent un grand bloc ARCHIVE avec un signal textuel. Il doit être utile ou devenir compact ; la décoration ne doit pas repousser la question.
4. **Catégories répétées.** Route complète, catégorie dans l’en-tête, signal et catégorie au-dessus de la question multiplient les indications. Trois familles principales et quelques repères secondaires suffisent probablement ; à tester plutôt qu’imposer un nombre rigide.
5. **Difficulté statique.** Facile/Normal/Expert filtre le pool au départ. Aucun palier de difficulté croissante n’est organisé au sein des quinze questions. Un crescendo éditorial peut garder la boucle actuelle.
6. **Rejeu court plutôt qu’historique durable.** « Nouvelle série » exclut la série précédente via le lien. Revenir à l’accueil perd cette exclusion ; les anciennes séries ne forment pas un historique de tirage persistant.
7. **Images encore externes.** Les 402 entrées avec image utilisent une URL GitHub. 85 de ces références correspondent déjà à un fichier local dans `public/assets/reveal/`. Le composant ne prévoit pas de repli si l’image échoue. Un contenu inaccessible ne doit pas devenir une épreuve impossible.

Le score et l’avancement sont aujourd’hui transportés dans le lien ; « score validé » décrit trop fortement ce mode solo libre. Avant une compétition publique, l’autorité serveur devra déterminer le résultat. Cela ne nécessite pas de Player DNA global.

## Première formule Lore Diff

**Une session finie → une consigne claire → une action évidente → un retour immédiat → une nouvelle situation.**

Quelques familles créent la variété ; leur sélection et leur mise en scène donnent le rythme. La licence détermine les situations. Le HUD, les contrôles de base et le ton rendent le tout cohérent. Aucun RPG central ni profil complexe n’est nécessaire pour améliorer cette boucle.

Prochain travail : traiter d’abord la lisibilité et la continuité de la session, puis tester quelques meilleures situations de types/évolution. Conserver les contrôles qui fonctionnent ; une interaction plus compliquée doit prouver qu’elle apporte du plaisir.

## Vérifications réalisées

Lecture de `app/play/[world]/page.tsx`, `app/quiz/quiz-page.tsx`, `app/quiz/quiz-data.ts`, des banques Pokémon et de `app/quiz/quiz.module.css`. Comptage des entrées, identités, médias et niveaux ; inspection de 300 tirages. Pas de modification du gameplay pour produire cet audit. Pas de chronométrage humain ni de test visuel mobile dans cette phase.

## Suite implémentée — v74

Les constats ci-dessus décrivent la version auditée v72. Les nouvelles parties utilisent maintenant `PokemonRunClient` : correction sur place, reprise locale, historique et crescendo par groupes de cinq. Le regroupement expose quatre familles, avec l’aventure comme respiration. Les anciens liens `play=1` conservent l’ancien parcours. Voir la roadmap active pour le périmètre et les vérifications ; les observations visuelles/mobile restent à compléter.
