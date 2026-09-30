# Lore Diff — direction et roadmap actives

Décision du 30 septembre 2026. Ce document remplace la roadmap centrée sur le Player DNA, les certifications et un endgame obligatoire. L’[ancienne roadmap v72](history/the-diff-roadmap-v72.md) reste un historique technique, pas une liste de travaux à poursuivre.

## Promesse

**Un endroit où tu joues avec ta culture jeu vidéo.**

Les autres te font deviner. Lore Diff doit te faire jouer avec ce que tu sais. Simple à comprendre, difficile à maîtriser, agréable à rejouer. La qualité du jeu passe avant la méta-progression. Pokémon Run est la référence interne pour sa simplicité, sa session claire et son identité ; les autres licences reprennent cette philosophie, pas ses mécaniques.

## Quatre piliers

| Pilier | Rôle et limite |
| --- | --- |
| Daily | Un rendez-vous partagé, court, rapide sur téléphone et comparable entre amis. Le Daily actuel existe déjà : neuf questions et un défi commun. L’améliorer après les Runs, sans créer une deuxième énorme run quotidienne. |
| Idles | Des défis directs : personnage, citation, compétence, image ou son. Garder leur accès immédiat ; pas de couche de progression obligatoire. |
| Runs | Le principal espace de créativité : une session finie, une boucle claire, quelques familles d’épreuves fortes, du rythme et une difficulté lisible. |
| Multi | Des situations entre amis, avec contenu équitable. Faire fonctionner un premier format social avant d’empiler duel, équipes, relais et tournoi. |

The Diff reste **une expérience cross-univers facultative**. Il ne devient ni le passage obligé, ni la finalité de tous les jeux. Les univers sont réunis par la culture JV, la DA, le ton et la qualité de jeu ; aucun récit, RPG ou système central n’est nécessaire pour les relier.

## État à conserver

- Les jeux et contenus publiés en v72 restent disponibles. Cette décision ne supprime pas les parties ni les résultats.
- Les statistiques existantes de The Diff peuvent rester légères et locales à ce mode. L’extension du Player DNA à tout le site est suspendue.
- Le Daily et les salons multijoueurs existent déjà : partir de ces bases, pas annoncer qu’il faut tout créer.
- Les collections, certifications, progression globale, compte multi-appareil, difficulté adaptative globale et roguelite central ne sont plus des chantiers prioritaires.
- Aucun ajout de licence tant qu’une mécanique pertinente, sa valeur et une bonne idée de Run ne le justifient.

## Ordre de travail

| Ordre | Travail | Résultat attendu | État |
| --- | --- | --- | --- |
| 1 | Examiner Pokémon Run | Identifier la boucle forte, les redondances, le rythme, les familles et les frictions réelles. | Premier audit du code et des tirages terminé ; observations en jeu/mobile à compléter. |
| 2 | Améliorer Pokémon Run | Clarifier les familles, rapprocher question/réponses/correction et renforcer les décisions Pokémon existantes. Aucun nouveau système de progression. | Lot v74 implémenté : parcours client, correction immédiate, pause/reprise locale, crescendo et historique. Essais visuels sur téléphone à compléter. |
| 3 | En tirer la formule Lore Diff | Une règle de design courte : comprendre, agir, recevoir un retour, continuer ; variété contrôlée et identité de licence. | Première formule posée ; à confirmer après essais. |
| 4 | Revoir les autres Runs | Un univers à la fois. WoW : trier les nombreux formats ; SF : conserver mouvement/commande/casting ; 40K : rendre les transmissions et objectifs évidents. | Azeroth v74 implémenté : 12 épreuves, 4 familles, rotation des formats, chrono progressif et écran compact. SF puis 40K restent à revoir. |
| 5 | Améliorer le Daily existant | Quelques minutes, même contenu pour tous, peu de friction, partage simple. | Après clarification des Runs. |
| 6 | Développer le multi | Un premier mode social cohérent, avec même contenu et vraie interaction entre joueurs ; pas une course au clic comme seul ressort. | Après une boucle solo solide. |

### Référence de travail Pokémon : améliorer sans agrandir

1. Présenter trois familles principales : **reconnaître**, **utiliser les types**, **comprendre les évolutions**. Les questions sur les régions, personnages et aventures restent des respirations. Ce regroupement organise le contenu existant ; il ne crée pas quatre nouveaux mini-jeux.
2. Mettre le sujet utile, la question et les réponses au centre. Réduire les panneaux « archive » lorsqu’ils ne contiennent aucun indice et les libellés répétés. Mesurer le scroll sur téléphone avant de fixer les dimensions.
3. Donner une correction courte et immédiatement compréhensible, avec une suite facile à atteindre. La lecture ne doit pas être forcée par un compte à rebours.
4. Vérifier si les situations obligent réellement à réfléchir. Par exemple, les types doivent aider à choisir une action, pas seulement à réciter le type d’un Pokémon. Tester d’abord quelques cas dans le Run actuel.
5. Améliorer la sélection des sujets et le crescendo à l’intérieur d’une session. En v74, les quinze épreuves progressent par trois groupes de cinq selon le niveau de départ ; la génération reste équilibrée de Kanto à Sinnoh.

### Lot v74 — parcours solo

- Pokémon : les nouvelles parties se jouent dans le navigateur, sans navigation complète à chaque réponse. Les anciens liens de parties `play=1` gardent leurs règles. Les quatre familles regroupent la banque existante ; aucun contenu inédit n’est annoncé. Le score libre est local, sans classement compétitif.
- Pokémon : reprise sur le même appareil, historique des sujets, correction et bilan par famille. Un visuel en échec propose réessayer ou passer sans pénalité. Les illustrations déjà présentes localement sont utilisées en premier.
- Azeroth : douze formats distincts par partie parmi les vingt formats actifs. Chaque run contient une localisation sur la carte, une réplique vocale et un thème musical. Les autres formats tournent ; l’historique des questions des formats absents est conservé.
- Azeroth : trois étapes de quatre épreuves, avec des formats plus exigeants en fin de parcours et moins de temps. Facile : 28/26/24 secondes ; Normal : 24/22/20 ; Expert : 20/18/16. Les questions elles-mêmes ne disposent pas encore d’une difficulté calibrée.
- Azeroth : pas de grand panneau vide pour les épreuves textuelles. Portraits entiers, carte et console audio redimensionnés ; correction proche des réponses et bilan par famille. Le chrono audio attend la lecture et les médias indisponibles ne coûtent aucune erreur.
- Vérification automatisée : 300 tirages Pokémon et 300 Azeroth, règles de score/reprise, équilibre des générations, montée des niveaux, rotation des formats et présence des médias locaux. Les handlers Azeroth sont exercés jusqu’au bilan, y compris lecture avant chrono, passage sans pénalité et double clic sur suivant. Cette vérification ne remplace pas un essai visuel et audio sur appareil réel.

**Formule à appliquer ensuite :** une consigne claire, une action adaptée à la licence, un retour bref et une suite immédiate. Trois moments de difficulté et quelques familles cohérentes suffisent ; les formats tournent pour la rejouabilité.

## Test avant tout ajout

- Le principe se comprend-il en environ dix secondes ?
- L’épreuve a-t-elle un intérêt propre à cette licence ?
- Peut-on jouer plusieurs minutes sans tutoriel compliqué ?
- La variété garde-t-elle une boucle stable ?
- La difficulté, le retour et la fin de session sont-ils lisibles ?
- Rejouer produit-il une nouvelle situation intéressante ?
- Peut-on retirer quelque chose pour clarifier le jeu ?
- Le futur multi pourrait-il créer une situation sociale plutôt qu’un simple classement de vitesse ?

**Avant chaque ajout : est-ce que cela rend le jeu plus amusant, ou ajoute seulement une couche ?**

Voir l’[audit Pokémon Run](pokemon-run-audit.md) pour les constats vérifiés et les points qui restent à observer.
