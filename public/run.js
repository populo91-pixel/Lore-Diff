const BASE_RUN_STEPS = [
  {
    type: "PERSONNAGE", kicker: "IDENTIFICATION VISUELLE", code: "ID",
    questions: [
      { page:"Arthas Menethil", answer:"Arthas Menethil", options:["Arthas Menethil","Anduin Wrynn","Uther","Tirion Fordring"], fact:"Prince de Lordaeron, paladin déchu puis Roi-Liche.", fallback:"PRINCE DÉCHU" },
      { page:"Thrall", answer:"Thrall", options:["Thrall","Grommash","Durotan","Varok Saurcroc"], fact:"Ancien chef de guerre de la Horde et puissant chaman.", fallback:"CHAMAN ORC" },
      { page:"Jaina Proudmoore", answer:"Jaina Portvaillant", options:["Jaina Portvaillant","Alleria Coursevent","Valeera Sanguinar","Tyrande Murmevent"], fact:"Archimage de Kul Tiras et l’une des plus puissantes mages d’Azeroth.", fallback:"ARCHIMAGE DE KUL TIRAS" },
      { page:"Illidan Stormrage", answer:"Illidan Hurlorage", options:["Illidan Hurlorage","Malfurion Hurlorage","Kael’thas","Akama"], fact:"Le Traître est aussi le premier chasseur de démons.", fallback:"LE TRAÎTRE" },
      { page:"Sylvanas Windrunner", answer:"Sylvanas Coursevent", options:["Sylvanas Coursevent","Alleria Coursevent","Vereesa Coursevent","Dame Vashj"], fact:"Ancienne générale des forestiers devenue Reine Banshee.", fallback:"REINE BANSHEE" },
      { page:"Deathwing", answer:"Aile de mort", options:["Aile de mort","Malygos","Iridikron","Fyrakka"], fact:"Neltharion, l’Aspect de la Terre, fut corrompu par les Dieux très anciens.", fallback:"ASPECT CORROMPU" },
      { page:"Alexstrasza", answer:"Alexstrasza", options:["Alexstrasza","Ysera","Vyranoth","Chromie"], fact:"La Lieuse-de-Vie dirige le Vol draconique rouge.", fallback:"LIEUSE-DE-VIE" },
      { page:"Garrosh Hellscream", answer:"Garrosh Hurlenfer", options:["Garrosh Hurlenfer","Grommash Hurlenfer","Varok Saurcroc","Orgrim Marteau-du-Destin"], fact:"Fils de Grommash, Garrosh devint chef de guerre avant de déclencher le siège d’Orgrimmar.", fallback:"CHEF DE GUERRE DÉCHU" },
      { page:"Medivh", answer:"Medivh", options:["Medivh","Khadgar","Antonidas","Kalecgos"], fact:"Le dernier Gardien de Tirisfal est lié à la tour de Karazhan." },
      { page:"Uther the Lightbringer", answer:"Uther le Porteur de Lumière", options:["Uther le Porteur de Lumière","Tirion Fordring","Turalyon","Anduin Wrynn"], fact:"Uther est l’un des premiers paladins de la Main d’argent et le mentor d’Arthas." }
    ]
  },
  {
    type: "BIOME", kicker: "LECTURE DU TERRAIN", code: "ZN",
    questions: [
      { answer:"Nagrand", options:["Nagrand","Mulgore","Les Tarides","Vallée d’Ombrelune"], image:"https://wow.zamimg.com/uploads/screenshots/normal/314871-nagrand.jpg", source:"https://www.wowhead.com/cata/fr/zone=3518/nagrand", fact:"Nagrand est reconnaissable à ses plaines, ses îles flottantes et ses cascades.", fallback:"PLAINES · ÎLES FLOTTANTES" },
      { answer:"Orneval", options:["Orneval","Sombrivage","Féralas","Val’sharah"], image:"https://wow.zamimg.com/uploads/screenshots/normal/844507-ashenvale.jpg", source:"https://www.wowhead.com/classic/zone=331/ashenvale", fact:"Orneval est une ancienne forêt kaldorei disputée par l’Alliance et la Horde.", fallback:"FORÊT KALDOREI" },
      { answer:"Zuldazar", options:["Zuldazar","Strangleronce","Nazmir","Uldum"], image:"https://wow.zamimg.com/uploads/screenshots/normal/1076451-zuldazar.jpg", source:"https://www.wowhead.com/fr/zone=8499/zuldazar", fact:"La jungle de Zuldazar abrite Dazar’alor et ses immenses pyramides.", fallback:"JUNGLE · PYRAMIDES" },
      { answer:"Vashj’ir", options:["Vashj’ir","Nazjatar","Azshara","Rivage Brisé"], image:"https://wow.zamimg.com/uploads/screenshots/normal/549816-.jpg", source:"https://www.wowhead.com/zone=5146/vashjir", fact:"Vashj’ir est une zone entièrement sous-marine apparue avec Cataclysm.", fallback:"ROYAUME ENGLOUTI" },
      { answer:"Péninsule des Flammes infernales", options:["Péninsule des Flammes infernales","Vallée d’Ombrelune","Terres Foudroyées","Tranchantes"], image:"https://wow.zamimg.com/uploads/screenshots/normal/85552-peninsule-des-flammes-infernales-a-flight-view-of-the-dark-portal-in-hellfire.jpg", source:"https://www.wowhead.com/tbc/fr/zone=3483/peninsule-des-flammes-infernales", fact:"La Péninsule des Flammes infernales accueille les aventuriers à leur arrivée en Outreterre.", fallback:"TERRE ROUGE · PORTE DES TÉNÈBRES" },
      { answer:"Les Grisonnes", options:["Les Grisonnes","Fjord Hurlant","Pics Foudroyés","Haut-Roc"], image:"https://i.pinimg.com/originals/81/d4/7f/81d47f29b84884f4d7ba824864d68253.png", source:"https://www.pinterest.com/pin/grizzly-hills--205969382931647988/", fact:"Les Grisonnes sont célèbres pour leurs forêts de conifères et leur musique mélancolique.", fallback:"FORÊTS DU NORFENDRE" },
      { answer:"Uldum", options:["Uldum","Tanaris","Vol’dun","Silithus"], image:"https://wow.zamimg.com/uploads/blog/images/18246-today-in-uldum-and-vale-of-eternal-blossoms-for-january-16th.jpg", source:"https://www.wowhead.com/news/today-in-uldum-and-vale-of-eternal-blossoms-for-january-16th-307404", fact:"Uldum mêle désert, pyramides tol’vir et installations titanesques.", fallback:"DÉSERT · TITANS" },
      { answer:"Bastion", options:["Bastion","Maldraxxus","Sylvarden","Revendreth"], image:"https://i0.wp.com/aggronaut.com/wp-content/uploads/2020/09/World-of-Warcraft-Shadowlands-1280x720-1.jpg?fit=1280%2C720&ssl=1", source:"https://aggronaut.com/2020/09/14/a-main-for-shadowlands/", fact:"Bastion est le domaine lumineux des Kyrians dans l’Ombreterre.", fallback:"ROYAUME DES KYRIANS" },
      { answer:"Zereth Mortis", options:["Zereth Mortis","Korthia","Antorus","Argus"], image:"https://www.icy-veins.com/forums/uploads/monthly_2021_12/WoWScrnShot_120321_153627.jpg.4df6148b90e4be733ff2c56053c3fe9f.jpg", source:"https://www.icy-veins.com/forums/topic/62734-zereth-mortis-zone-preview/", fact:"Zereth Mortis est un atelier des Fondateurs où furent façonnés les royaumes de la Mort.", fallback:"ATELIER DES FONDATEURS" },
      { answer:"Rêve d’Émeraude", options:["Rêve d’Émeraude","Sylvarden","Val’sharah","Reflet-de-Lune"], image:"https://wow.4fansites.de/bilder/weltkarte/dracheninseln/der-smaragdgruene-traum/der-smaragdgruene-traum.jpg", source:"https://wow.4fansites.de/weltkarte-der-smaragdgruene-traum.php", fact:"Le Rêve d’Émeraude représente une Azeroth sauvage, liée au Vol draconique vert.", fallback:"RÊVE · VOL VERT" }
    ]
  },
  {
    type: "VILLE", kicker: "GÉOLOCALISATION", code: "CT",
    questions: [
      { answer:"Hurlevent", options:["Hurlevent","Boralus","Gilnéas","Lordaeron"], image:"https://i0.hdslb.com/bfs/archive/8e839a3c640ab0620f26bd33ecb068aeda3e09dd.png", source:"https://www.bilibili.com/video/BV1iW411b73R/", fact:"Hurlevent est la capitale humaine de l’Alliance.", fallback:"CAPITALE HUMAINE" },
      { answer:"Orgrimmar", options:["Orgrimmar","Forgefer","Grom’gol","Gadgetzan"], image:"https://media.guildsofwow.com/library-images/967649/1080/orgrimmar.jpg", source:"https://guildsofwow.com/gameofcrohns/post/4742/guild-meeting-05th-march-2022", fact:"Orgrimmar est la capitale orque et le cœur politique de la Horde.", fallback:"CAPITALE ORQUE" },
      { answer:"Dalaran", options:["Dalaran","Lune-d’Argent","Exodar","Shattrath"], image:"https://wowquesting.weebly.com/uploads/8/0/8/2/80828608/7186107_orig.jpg", source:"https://wowquesting.weebly.com/exploration-achievements.html", fact:"Dalaran est une cité de mages capable de se déplacer dans les airs.", fallback:"CITÉ FLOTTANTE DES MAGES" },
      { answer:"Suramar", options:["Suramar","Lune-d’Argent","Darnassus","Zin-Azshari"], image:"https://www.buffed.de/screenshots/original/2016/09/WoW_Legion_Suramar.jpg", source:"https://www.buffed.de/World-of-Warcraft-Spiel-42971/Guides/Suramar-Maskerade-Lebensretter-1208254/", fact:"Suramar est la cité ancestrale des Sacrenuit.", fallback:"CITÉ DES SACRENUIT" },
      { answer:"Les Pitons-du-Tonnerre", options:["Les Pitons-du-Tonnerre","Orgrimmar","Totem-du-Tonnerre","Garadar"], image:"https://wow.zamimg.com/uploads/screenshots/normal/283365.jpg", source:"https://www.wowhead.com/guide/new-players/city-overview", fact:"La capitale taurène est bâtie sur plusieurs mesas reliées par des ponts suspendus.", fallback:"CAPITALE TAURÈNE" },
      { answer:"Forgefer", options:["Forgefer","Gnomeregan","Grim Batol","Profondeurs de Rochenoire"], image:"https://commandboard.wordpress.com/wp-content/uploads/2014/09/ironforge2.jpg", source:"https://commandboard.wordpress.com/2014/09/", fact:"Forgefer est la capitale naine creusée sous Dun Morogh.", fallback:"CAPITALE SOUS LA MONTAGNE" },
      { answer:"Lune-d’Argent", options:["Lune-d’Argent","Suramar","Dalaran","Shattrath"], image:"https://wow.zamimg.com/uploads/screenshots/normal/413764-ciudad-de-lunargenta-the-bazaar-far-sight-used.jpg", source:"https://www.wowhead.com/mop-classic/es/zone=3487/ciudad-de-lunargenta", fact:"Lune-d’Argent est la capitale des Elfes de sang au nord des Royaumes de l’Est.", fallback:"CAPITALE DES ELFES DE SANG" },
      { answer:"L’Exodar", options:["L’Exodar","Le Vindicaar","Auchindoun","Cœur de Lumière"], image:"https://wow.4fansites.de/bilder/weltkarte/exodar/exodar_4.jpg", source:"https://wow.4fansites.de/weltkarte_die_exodar.php", fact:"L’Exodar est un vaisseau naaru écrasé devenu capitale des Draeneï.", fallback:"VAISSEAU DRAENEÏ" },
      { answer:"Boralus", options:["Boralus","Port-Liberté","Hurlevent","Baie-du-Butin"], image:"https://bnetcmsus-a.akamaihd.net/cms/blog_thumbnail/37/377KJKV4EED61597854578057.jpg", source:"https://worldofwarcraft.blizzard.com/pt-br/news/23492553/balance-ao-sabor-das-mar%C3%A9s-da-m%C3%BAsica-de-battle-for-azeroth", fact:"Boralus est le grand port et la capitale de Kul Tiras.", fallback:"PORT DE KUL TIRAS" },
      { answer:"Shattrath", options:["Shattrath","Dalaran","Auchindoun","Telaar"], image:"https://gamewave.fr/static/images/medias/upload/Amandine%20Hiver%202025/shattrath.webp", source:"https://gamewave.fr/world-of-warcraft-classic/wow-tbc-aldor-ou-clairvoyant-quelle-faction-de-shattrath-choisir/", fact:"Shattrath est la grande cité neutre de l’Outreterre, partagée entre Aldor et Clairvoyants.", fallback:"CITÉ NEUTRE D’OUTRETERRE" }
    ]
  },
  {
    type: "INSTANCE", kicker: "DONJON OU RAID", code: "RX",
    questions: [
      { answer:"Karazhan", options:["Karazhan","Naxxramas","Scholomance","Donjon d’Ombrecroc"], image:"https://www.denofgeek.com/wp-content/uploads/2021/02/world-of-warcraft-burning-crusade-karazhan-raid.jpg?resize=1024%2C614", source:"https://www.denofgeek.com/games/world-of-warcraft-burning-crusade-classic-best-moments/", fact:"Karazhan est la tour de Medivh, nichée dans le Défilé de Deuillevent.", fallback:"TOUR DE MEDIVH" },
      { answer:"Temple noir", options:["Temple noir","Citadelle des Flammes infernales","Bastion du Crépuscule","Puits d’éternité"], image:"https://bnetcmsus-a.akamaihd.net/cms/template_resource/HQ2VLXNZR1L11498693220026.jpg", source:"https://news.blizzard.com/en-us/article/20855984/the-black-temple-a-journey-through-time-walking", fact:"Le Temple noir fut le repaire d’Illidan en Outreterre.", fallback:"REPAIRE D’ILLIDAN" },
      { answer:"Ulduar", options:["Ulduar","Uldaman","Caveau d’Archavon","Salles de Foudre"], image:"https://www.buffed.de/screenshots/1280x1024/2009/05/Thorim_03.jpg", source:"https://www.buffed.de/World-of-Warcraft-Spiel-42971/Guides/Die-Hueter-von-Ulduar-790702/3/", fact:"Ulduar est une immense cité titanique qui emprisonne Yogg-Saron.", fallback:"PRISON DE YOGG-SARON" },
      { answer:"Cœur du Magma", options:["Cœur du Magma","Terres de Feu","Profondeurs de Rochenoire","Descente de l’Aile noire"], image:"https://blog-imgs-112.fc2.com/k/u/l/kultur2/raidinginmmo.jpg", source:"https://kultur.jp/oldpost-4066/", fact:"Le Cœur du Magma est le domaine de Ragnaros sous le mont Rochenoire.", fallback:"DOMAINE DE RAGNAROS" },
      { answer:"Citadelle de la Couronne de glace", options:["Citadelle de la Couronne de glace","Naxxramas","Caveau d’Archavon","Donjon d’Ombrecroc"], image:"https://www.pcgames.de/screenshots/1280x1024/2010/06/envy_15.jpg", source:"https://www.pcgames.de/World-of-Warcraft-Spiel-42971/Specials/Die-15-besten-World-of-Warcraft-Gilden-der-Welt-Wer-dominiert-den-PvE-Modus-749497/", fact:"La Citadelle de la Couronne de glace abrite le Trône de glace et le Roi-Liche.", fallback:"TRÔNE DU ROI-LICHE" },
      { answer:"Naxxramas", options:["Naxxramas","Stratholme","Scholomance","Caveau des Incarnations"], image:"https://vignette.wikia.nocookie.net/wowwiki/images/d/d3/Naxxramas.jpg/revision/latest?cb=20100719013321", source:"https://wowwiki.fandom.com/wiki/Naxxramas", fact:"Naxxramas est une nécropole volante du Fléau commandée par Kel’Thuzad.", fallback:"NÉCROPOLE DU FLÉAU" },
      { answer:"Terres de Feu", options:["Terres de Feu","Cœur du Magma","Trône des quatre vents","Descente de l’Aile noire"], image:"https://www.buffed.de/screenshots/1280x/2011/06/WoW_Patch_42_Sturm_auf_die_Feuerlande_Trailer_017.jpg", source:"https://www.buffed.de/World-of-Warcraft-Spiel-42971/Guides/WoW-Raid-Guide-Feuerlande-Ragnaros-Feuerlande-Live-Stand-831514/2/", fact:"Les Terres de Feu sont le plan élémentaire de Ragnaros.", fallback:"PLAN DE RAGNAROS" },
      { answer:"Château Nathria", options:["Château Nathria","Sanctum de Domination","Sépulcre des Fondateurs","Manoir Malvoie"], image:"https://wow.zamimg.com/uploads/screenshots/normal/1250596-.jpg", source:"https://www.wowhead.com/zone=13224/castle-nathria", fact:"Le Château Nathria est la forteresse de sire Denathrius en Revendreth.", fallback:"FORTERESSE DE DENATHRIUS" },
      { answer:"Les Mortemines", options:["Les Mortemines","Gnomeregan","Maraudon","Cavernes des Lamentations"], image:"https://www.hcguides.com/_next/image?q=75&url=%2Fdungeon%2Fthe-deadmines%2Fsmite.jpg&w=1200", source:"https://www.hcguides.com/dungeons/the-deadmines", fact:"Les Mortemines cachent le repaire de la Confrérie Défias sous la Marche de l’Ouest.", fallback:"REPAIRE DES DÉFIAS" },
      { answer:"Zul’Gurub", options:["Zul’Gurub","Zul’Aman","Atal’Dazar","Trône du tonnerre"], image:"https://media.wired.com/photos/5eea912945997e7f063bebf1/16%3A9/w_1615%2Ch_908%2Cc_limit/Security_WoW_ClassicZulGurub-Jindo_1920x1080.jpg", source:"https://warcraft.wiki.gg/wiki/WoW_Blog/Classic_Zul%27Gurub", fact:"Zul’Gurub est l’ancienne capitale des trolls Gurubashi au cœur de Strangleronce.", fallback:"CAPITALE GURUBASHI" }
    ]
  },
  {
    type: "GÉO", mode: "geo", kicker: "CARTE À POINTER", code: "MP",
    questions: [
      { answer:"Lune-d’Argent", x:.712, y:.064, prompt:"Où se trouve Lune-d’Argent ?", fact:"La capitale des Elfes de sang se trouve tout au nord des Royaumes de l’Est, dans les Bois des Chants éternels.", source:"https://worldofwarcraft.blizzard.com/es-mx/news/23156366/wow-classic-getting-around-azeroth" },
      { answer:"Stratholme", x:.788, y:.252, prompt:"Où se trouve Stratholme ?", fact:"La cité ravagée par le Fléau se situe au nord-est des Maleterres de l’Est.", source:"https://worldofwarcraft.blizzard.com/es-mx/news/23156366/wow-classic-getting-around-azeroth" },
      { answer:"Fossoyeuse", x:.277, y:.248, prompt:"Où se trouve Fossoyeuse ?", fact:"Fossoyeuse a été bâtie sous les ruines de Lordaeron, dans les Clairières de Tirisfal.", source:"https://worldofwarcraft.blizzard.com/es-mx/news/23156366/wow-classic-getting-around-azeroth" },
      { answer:"Gilnéas", x:.164, y:.398, prompt:"Où se trouve Gilnéas ?", fact:"La cité de Gilnéas se trouve au cœur de la péninsule située au sud-ouest de Lordaeron.", source:"https://worldofwarcraft.blizzard.com/es-mx/news/23156366/wow-classic-getting-around-azeroth" },
      { answer:"Hautes-terres Arathies", x:.568, y:.390, prompt:"Où sont les Hautes-terres Arathies ?", fact:"Cette région se trouve au nord des Paluns, autour de l’ancienne cité de Stromgarde.", source:"https://worldofwarcraft.blizzard.com/es-mx/news/23156366/wow-classic-getting-around-azeroth" },
      { answer:"Forgefer", x:.370, y:.546, prompt:"Où se trouve Forgefer ?", fact:"La capitale naine est creusée dans la montagne centrale de Dun Morogh.", source:"https://worldofwarcraft.blizzard.com/es-mx/news/23156366/wow-classic-getting-around-azeroth" },
      { answer:"Mont Rochenoire", x:.397, y:.672, prompt:"Où se trouve le mont Rochenoire ?", fact:"Le mont relie la Gorge des Vents brûlants aux Steppes Ardentes.", source:"https://worldofwarcraft.blizzard.com/es-mx/news/23156366/wow-classic-getting-around-azeroth" },
      { answer:"Hurlevent", x:.253, y:.725, prompt:"Où se trouve Hurlevent ?", fact:"La capitale humaine est située au nord-ouest de la forêt d’Elwynn.", source:"https://worldofwarcraft.blizzard.com/es-mx/news/23156366/wow-classic-getting-around-azeroth" },
      { answer:"Karazhan", x:.466, y:.816, prompt:"Où se trouve Karazhan ?", fact:"La tour de Medivh domine le Défilé de Deuillevent, à l’est du Bois de la Pénombre.", source:"https://worldofwarcraft.blizzard.com/es-mx/news/23156366/wow-classic-getting-around-azeroth" },
      { answer:"Les Mortemines", x:.179, y:.809, prompt:"Où se trouvent les Mortemines ?", fact:"L’entrée des Mortemines est cachée sous Ruisselune, dans la Marche de l’Ouest.", source:"https://worldofwarcraft.blizzard.com/es-mx/news/23156366/wow-classic-getting-around-azeroth" },
      { answer:"Zul’Gurub", x:.411, y:.851, prompt:"Où se trouve Zul’Gurub ?", fact:"L’ancienne capitale gurubashi se trouve dans le nord-est de Strangleronce.", source:"https://worldofwarcraft.blizzard.com/es-mx/news/23156366/wow-classic-getting-around-azeroth" },
      { answer:"Baie-du-Butin", x:.256, y:.961, prompt:"Où se trouve Baie-du-Butin ?", fact:"Le port gobelin est niché à l’extrême sud du cap Strangleronce.", source:"https://worldofwarcraft.blizzard.com/es-mx/news/23156366/wow-classic-getting-around-azeroth" }
    ]
  },
  {
    type: "INTRUS", kicker: "UN ÉLÉMENT NE COLLE PAS", code: "XX",
    questions: [
      { answer:"Anduin Wrynn", options:["Thrall","Garrosh Hurlenfer","Vol’jin","Anduin Wrynn"], prompt:"Qui n’a jamais été chef de guerre de la Horde ?", fact:"Anduin est un dirigeant de l’Alliance ; les trois autres ont dirigé la Horde." },
      { answer:"Khadgar", options:["Alexstrasza","Nozdormu","Ysera","Khadgar"], prompt:"Qui n’est pas un Aspect draconique ?", fact:"Khadgar est un archimage humain, pas un dragon Aspect." },
      { answer:"Karazhan", options:["Remparts des Flammes infernales","Basse-tourbière","Les salles des Sethekk","Karazhan"], prompt:"Quelle instance n’est pas un donjon à 5 joueurs de Burning Crusade ?", fact:"Karazhan est un raid, tandis que les trois autres sont des donjons à 5 joueurs." },
      { answer:"Sylvanas", options:["Kyrians","Nécro-seigneurs","Faë nocturnes","Sylvanas"], prompt:"Qui n’est pas une congrégation de l’Ombreterre ?", fact:"Sylvanas est un personnage ; les Kyrians, Nécro-seigneurs et Faë nocturnes sont des congrégations." },
      { answer:"Orgrimmar", options:["Hurlevent","Forgefer","Darnassus","Orgrimmar"], prompt:"Quelle capitale n’appartient pas à l’Alliance ?", fact:"Orgrimmar est la capitale orque de la Horde." },
      { answer:"Moine", options:["Guerrier","Paladin","Chevalier de la mort","Moine"], prompt:"Quelle classe ne peut pas porter d’armure en plaques ?", fact:"Le moine porte du cuir ; les trois autres classes peuvent porter des plaques." },
      { answer:"Yrel", options:["C’Thun","N’Zoth","Yogg-Saron","Yrel"], prompt:"Qui n’est pas un Dieu très ancien ?", fact:"Yrel est une paladine draeneï." },
      { answer:"Dalaran", options:["Hurlevent","Orgrimmar","Forgefer","Dalaran"], prompt:"Quelle cité est historiquement neutre plutôt qu’une capitale de faction jouable ?", fact:"Dalaran accueille les deux factions selon les époques ; les autres sont des capitales de race." },
      { answer:"Kalecgos", options:["Nozdormu","Chromie","Soridormi","Kalecgos"], prompt:"Quel dragon n’appartient pas au Vol bronze ?", fact:"Kalecgos appartient au Vol bleu." },
      { answer:"Illidan Hurlorage", options:["Kil’jaeden","Archimonde","Mannoroth","Illidan Hurlorage"], prompt:"Qui n’est pas un commandant de la Légion ardente ?", fact:"Illidan combat la Légion, malgré les pouvoirs gangrenés qu’il utilise." }
    ]
  },
  {
    type: "LORE", kicker: "ARCHIVES D’AZEROTH", code: "LR",
    questions: [
      { answer:"Merithra", options:["Merithra","Alexstrasza","Ysondre","Vyranoth"], prompt:"Qui succède à Ysera comme Aspect du Vol draconique vert ?", fact:"Merithra, fille d’Ysera, devient la nouvelle Aspect du Rêve.", fallback:"RÊVE D’ÉMERAUDE" },
      { answer:"Yogg-Saron", options:["Yogg-Saron","N’Zoth","C’Thun","Y’Shaarj"], prompt:"Quel Dieu très ancien était emprisonné sous Ulduar ?", fact:"Yogg-Saron, le Dieu de la mort, était contenu dans les profondeurs d’Ulduar.", fallback:"DIEU TRÈS ANCIEN" },
      { answer:"Vol’jin", options:["Vol’jin","Baine","Lor’themar","Sylvanas"], prompt:"Qui devient chef de guerre juste après Garrosh Hurlenfer ?", fact:"Vol’jin prend la tête de la Horde après le siège d’Orgrimmar.", fallback:"CHEF DE GUERRE" },
      { answer:"Deuillegivre", options:["Deuillegivre","Porte-Cendres","Hurlesang","Lame-tonnerre"], prompt:"Quelle arme précipite la chute d’Arthas ?", fact:"Deuillegivre vole les âmes et lie Arthas au destin du Roi-Liche.", fallback:"LAME RUNIQUE" },
      { answer:"Velen", options:["Velen","Kil’jaeden","Maraad","Turalyon"], prompt:"Qui conduit les Draeneï dans leur fuite loin d’Argus ?", fact:"Velen refuse l’offre de Sargeras et guide les Érédars qui deviendront les Draeneï.", fallback:"EXODE D’ARGUS" },
      { answer:"Sargeras", options:["Sargeras","Aggramar","Aman’Thul","Argus"], prompt:"Quel Titan plante une immense épée dans Azeroth ?", fact:"À la fin de Legion, Sargeras frappe Azeroth avec son épée avant d’être emprisonné.", fallback:"L’ÉPÉE EN SILITHUS" },
      { answer:"Thrall", options:["Thrall","Garrosh","Rexxar","Dranosh"], prompt:"Quel personnage est le fils de Durotan et Draka ?", fact:"Go’el, plus connu sous le nom de Thrall, est le fils de Durotan et Draka.", fallback:"FILS DE DUROTAN" },
      { answer:"Teldrassil", options:["Teldrassil","Nordrassil","Shaladrassil","Amirdrassil"], prompt:"Quel Arbre-Monde est incendié avant Battle for Azeroth ?", fact:"L’incendie de Teldrassil provoque l’évacuation de Darnassus et marque la Guerre des épines.", fallback:"GUERRE DES ÉPINES" },
      { answer:"Nozdormu", options:["Nozdormu","Malygos","Neltharion","Kalecgos"], prompt:"Quel Aspect draconique veille sur le temps ?", fact:"Nozdormu l’Intemporel dirige le Vol draconique bronze.", fallback:"VOL DRACONIQUE BRONZE" },
      { answer:"Le Trône de glace", options:["Le Trône de glace","Le Trône des quatre vents","Le Siège des Primats","Le Panthéon"], prompt:"Quel siège de pouvoir abrite le Roi-Liche ?", fact:"Le Trône de glace se trouve au sommet de la Citadelle de la Couronne de glace.", fallback:"SOMMET DE LA CITADELLE" }
    ]
  },
  {
    type: "CHRONO", kicker: "LIGNE TEMPORELLE", code: "TM",
    questions: [
      { answer:"La chute de Lordaeron", options:["La chute de Lordaeron","La réouverture de la Porte des ténèbres vers l’Outreterre","Le Cataclysme","Le siège d’Orgrimmar"], prompt:"Lequel de ces événements arrive en premier ?", fact:"La chute de Lordaeron précède les événements de Burning Crusade, Cataclysm et Mists of Pandaria.", fallback:"QUEL ÉVÉNEMENT D’ABORD ?" },
      { answer:"La défaite d’Illidan au Temple noir", options:["La défaite d’Illidan au Temple noir","La chute du Roi-Liche","La destruction de Theramore","L’arrivée de la Légion sur les îles Brisées"], prompt:"Lequel de ces événements arrive en premier ?", fact:"Illidan tombe au Temple noir pendant Burning Crusade, avant Wrath of the Lich King.", fallback:"QUEL ÉVÉNEMENT D’ABORD ?" },
      { answer:"La création de la Horde par Thrall", options:["La création de la Horde par Thrall","Le réveil d’Aile de mort","La libération de Garrosh par Kairoz","L’ouverture du portail vers Argus"], prompt:"Lequel de ces événements arrive en premier ?", fact:"Thrall rassemble la nouvelle Horde avant les événements de World of Warcraft.", fallback:"QUEL ÉVÉNEMENT D’ABORD ?" },
      { answer:"La destruction du Puits d’éternité", options:["La destruction du Puits d’éternité","La Première Guerre","L’invasion du Fléau","La découverte de la Pandarie"], prompt:"Lequel de ces événements arrive en premier ?", fact:"La destruction du Puits d’éternité conclut la Guerre des Anciens, des millénaires avant les autres événements.", fallback:"QUEL ÉVÉNEMENT D’ABORD ?" },
      { answer:"La défaite d’Aile de mort", options:["La défaite d’Aile de mort","Le siège d’Orgrimmar","La défaite d’Archimonde à Draenor","La chute d’Argus"], prompt:"Lequel de ces événements arrive en premier ?", fact:"Aile de mort est vaincu à la fin de Cataclysm, avant les campagnes suivantes.", fallback:"QUEL ÉVÉNEMENT D’ABORD ?" },
      { answer:"L’ouverture du portail vers Draenor", options:["L’ouverture du portail vers Draenor","La bataille du rivage Brisé","L’incendie de Teldrassil","La défaite du Geôlier"], prompt:"Lequel de ces événements arrive en premier ?", fact:"Le portail vers le Draenor alternatif ouvre la campagne de Warlords of Draenor.", fallback:"QUEL ÉVÉNEMENT D’ABORD ?" },
      { answer:"La Guerre des Anciens", options:["La Guerre des Anciens","L’ouverture de la Porte des ténèbres","La Troisième Guerre","Le Cataclysme"], prompt:"Lequel de ces conflits est le plus ancien ?", fact:"La Guerre des Anciens se déroule environ dix mille ans avant l’époque moderne d’Azeroth.", fallback:"CONFLIT LE PLUS ANCIEN" },
      { answer:"L’épuration de Stratholme", options:["L’épuration de Stratholme","La bataille du mont Hyjal","La fusion d’Arthas avec le Roi-Liche","L’assaut de la Citadelle de la Couronne de glace"], prompt:"Lequel de ces événements arrive en premier ?", fact:"L’épuration de Stratholme précède la chute d’Arthas puis la bataille du mont Hyjal.", fallback:"QUEL ÉVÉNEMENT D’ABORD ?" },
      { answer:"Cataclysm", options:["Cataclysm","Mists of Pandaria","Warlords of Draenor","Legion"], prompt:"Quelle extension est sortie en premier ?", fact:"Cataclysm précède Mists of Pandaria, Warlords of Draenor et Legion.", fallback:"ORDRE DES EXTENSIONS" },
      { answer:"La bataille du Portail du Courroux", options:["La bataille du Portail du Courroux","La destruction de Theramore","La mort de Vol’jin","L’ouverture du passage vers l’Ombreterre"], prompt:"Lequel de ces événements arrive en premier ?", fact:"Le Portail du Courroux est un événement de Wrath of the Lich King, bien antérieur aux trois autres.", fallback:"QUEL ÉVÉNEMENT D’ABORD ?" }
    ]
  }
];

const EARLY_BASE_PACK = {
  "INSTANCE": [
    { page:"Magtheridon's Lair", answer:"Le repaire de Magtheridon", options:["Le repaire de Magtheridon","Le repaire de Gruul","Le sanctuaire du Serpent","Le Temple noir"], fact:"Magtheridon est emprisonné sous la Citadelle des Flammes infernales.", fallback:"PRISON DU SEIGNEUR DES ABÎMES" },
    { page:"Serpentshrine Cavern", answer:"Le sanctuaire du Serpent", options:["Le sanctuaire du Serpent","La Basse-tourbière","Le Caveau de la vapeur","Le Temple noir"], fact:"Dame Vashj dirige ce raid enfoui dans le réservoir de Glissecroc.", fallback:"REPAIRE DE DAME VASHJ" },
    { page:"Tempest Keep", answer:"L’Œil", options:["L’Œil","Le Méchanar","L’Arcatraz","Le Botanica"], fact:"L’Œil est l’aile de raid du Donjon de la Tempête, occupée par Kael’thas.", fallback:"FORTERESSE DE KAEL’THAS" },
    { page:"Azjol-Nerub (instance)", answer:"Azjol-Nérub", options:["Azjol-Nérub","Ahn’kahet","Drak’Tharon","Gundrak"], fact:"Azjol-Nérub plonge sous la Désolation des dragons jusqu’au royaume d’Anub’arak.", fallback:"ROYAUME NÉRUBIEN" },
    { page:"The Oculus", answer:"L’Oculus", options:["L’Oculus","Le Nexus","L’Œil de l’éternité","Les salles de Foudre"], fact:"L’Oculus est une tour magique du Nexus parcourue à dos de drake.", fallback:"TOUR DU NEXUS" },
    { page:"Trial of the Crusader", answer:"L’Épreuve du croisé", options:["L’Épreuve du croisé","L’Épreuve du champion","Le Caveau d’Archavon","Naxxramas"], fact:"L’Épreuve du croisé est le raid du tournoi d’Argent en Couronne de glace.", fallback:"ARÈNE DU TOURNOI D’ARGENT" },
    { page:"Blackwing Descent", answer:"La Descente de l’Aile noire", options:["La Descente de l’Aile noire","Le repaire de l’Aile noire","Le Bastion du Crépuscule","Le Trône des quatre vents"], fact:"Nefarian poursuit ses expériences sous le mont Rochenoire.", fallback:"LABORATOIRE DE NEFARIAN" },
    { page:"Bastion of Twilight", answer:"Le Bastion du Crépuscule", options:["Le Bastion du Crépuscule","Grim Batol","La Descente de l’Aile noire","L’Âme des dragons"], fact:"Cho’gall dirige le Bastion du Crépuscule dans les hautes-terres du Crépuscule.", fallback:"FORTERESSE DE CHO’GALL" },
    { page:"Dragon Soul (raid)", answer:"L’Âme des dragons", options:["L’Âme des dragons","Les Terres de Feu","Le Bastion du Crépuscule","Le Trône des quatre vents"], fact:"L’Âme des dragons conclut Cataclysm par l’affrontement contre Aile de mort.", fallback:"DERNIER RAID DE CATACLYSM" }
  ],
  "LORE": [
    { answer:"Magtheridon", options:["Magtheridon","Mannoroth","Gruul","Kazzak"], prompt:"Quel seigneur des abîmes est emprisonné sous la Citadelle des Flammes infernales ?", fact:"Illidan renverse Magtheridon puis le fait emprisonner dans la citadelle." },
    { answer:"Kael’thas Haut-Soleil", options:["Kael’thas Haut-Soleil","Lor’themar Theron","Rommath","Anastérien Haut-Soleil"], prompt:"Qui s’empare du Donjon de la Tempête en Outreterre ?", fact:"Kael’thas et ses partisans prennent le contrôle de la forteresse naaru." },
    { answer:"Kil’jaeden", options:["Kil’jaeden","Archimonde","Sargeras","Magtheridon"], prompt:"Quel démon tente d’entrer en Azeroth par le Puits de soleil à la fin de TBC ?", fact:"Kil’jaeden est invoqué au plateau du Puits de soleil avant d’être repoussé." },
    { answer:"Terenas Menethil II", options:["Terenas Menethil II","Uther le Porteur de Lumière","Daelin Portvaillant","Antonidas"], prompt:"Qui est le père d’Arthas Menethil ?", fact:"Terenas II est le dernier roi de Lordaeron et le père d’Arthas." },
    { answer:"Tirion Fordring", options:["Tirion Fordring","Darion Mograine","Bolvar Fordragon","Alexandros Mograine"], prompt:"Qui dirige la Croisade d’argent pendant la campagne du Norfendre ?", fact:"Tirion fonde la Croisade d’argent et mène l’assaut final contre le Roi-Liche." },
    { answer:"Bolvar Fordragon", options:["Bolvar Fordragon","Darion Mograine","Tirion Fordring","Muradin Barbe-de-Bronze"], prompt:"Qui porte le Heaume de domination après la défaite d’Arthas ?", fact:"Bolvar devient le nouveau geôlier du Fléau au sommet du Trône de glace." },
    { answer:"Aile de mort", options:["Aile de mort","Ragnaros","Cho’gall","Al’Akir"], prompt:"Qui provoque le Cataclysme en surgissant du Tréfonds ?", fact:"Le retour d’Aile de mort fracture Azeroth et remodèle ses continents." },
    { answer:"Garrosh Hurlenfer", options:["Garrosh Hurlenfer","Vol’jin","Cairne Sabot-de-Sang","Varok Saurcroc"], prompt:"À qui Thrall confie-t-il la Horde au début de Cataclysm ?", fact:"Thrall nomme Garrosh chef de guerre avant de rejoindre le Cercle terrestre." },
    { answer:"L’Âme des dragons", options:["L’Âme des dragons","Porte-Cendres","Deuillegivre","Le Cœur d’Azeroth"], prompt:"Quel artefact est utilisé pour vaincre définitivement Aile de mort ?", fact:"Les Aspects et Thrall canalisent l’Âme des dragons contre Aile de mort." }
  ],
  "CHRONO": [
    { answer:"La réouverture de la Porte des ténèbres", options:["La réouverture de la Porte des ténèbres","La chute de Kael’thas dans l’Œil","La défaite d’Illidan","L’assaut du Puits de soleil"], prompt:"Quel événement de The Burning Crusade arrive en premier ?", fact:"La réouverture de la Porte lance l’expédition en Outreterre." },
    { answer:"L’exploration de Karazhan", options:["L’exploration de Karazhan","L’assaut du Temple noir","La bataille du mont Hyjal revisitée","L’ouverture de l’île de Quel’Danas"], prompt:"Quelle étape de progression TBC arrive en premier ?", fact:"Karazhan appartient au premier palier de raid de The Burning Crusade." },
    { answer:"La défaite de Dame Vashj", options:["La défaite de Dame Vashj","La défaite d’Illidan","L’invocation de Kil’jaeden au Puits de soleil","La restauration du Puits de soleil"], prompt:"Lequel de ces événements TBC arrive en premier ?", fact:"Le sanctuaire du Serpent précède le Temple noir et le plateau du Puits de soleil." },
    { answer:"La bataille du Portail du Courroux", options:["La bataille du Portail du Courroux","L’ouverture d’Ulduar","Le tournoi d’Argent","L’assaut de la Citadelle de la Couronne de glace"], prompt:"Quel événement de Wrath arrive en premier ?", fact:"Le Portail du Courroux fait partie de la campagne initiale du Norfendre." },
    { answer:"L’ouverture d’Ulduar", options:["L’ouverture d’Ulduar","L’Épreuve du croisé","La chute du Roi-Liche","L’ouverture du sanctum Rubis"], prompt:"Quelle étape de Wrath arrive en premier ?", fact:"Ulduar précède le tournoi d’Argent et l’assaut de la Citadelle." },
    { answer:"La défaite d’Anub’arak à l’Épreuve du croisé", options:["La défaite d’Anub’arak à l’Épreuve du croisé","La chute du Roi-Liche","L’attaque du sanctum Rubis","Le réveil d’Aile de mort"], prompt:"Lequel de ces événements arrive en premier ?", fact:"Anub’arak conclut l’Épreuve du croisé avant l’ouverture de la Citadelle." },
    { answer:"Le réveil d’Aile de mort", options:["Le réveil d’Aile de mort","La défaite de Nefarian","La chute de Ragnaros dans les Terres de Feu","Le combat final contre Aile de mort"], prompt:"Quel événement de Cataclysm arrive en premier ?", fact:"Le réveil d’Aile de mort provoque le Cataclysme et lance l’extension." },
    { answer:"La défaite de Nefarian", options:["La défaite de Nefarian","La chute de Ragnaros dans les Terres de Feu","L’assaut de l’Âme des dragons","La défaite d’Aile de mort"], prompt:"Quelle victoire de raid Cataclysm arrive en premier ?", fact:"La Descente de l’Aile noire appartient au premier palier de Cataclysm." },
    { answer:"Thrall quitte son rôle de chef de guerre", options:["Thrall quitte son rôle de chef de guerre","La chute de Ragnaros","L’assaut de l’Âme des dragons","La défaite d’Aile de mort"], prompt:"Quel événement arrive en premier pendant Cataclysm ?", fact:"Thrall confie la Horde à Garrosh dès le début de la crise élémentaire." }
  ]
};

Object.entries(EARLY_BASE_PACK).forEach(([type,questions]) => {
  const step = BASE_RUN_STEPS.find(entry => entry.type === type);
  if (step) step.questions.push(...questions);
});

const LOCAL_PORTRAITS = {
  "Arthas Menethil":"arthas", "Thrall":"thrall", "Jaina Proudmoore":"jaina",
  "Illidan Stormrage":"illidan", "Sylvanas Windrunner":"sylvanas", "Deathwing":"deathwing",
  "Alexstrasza":"alexstrasza", "Garrosh Hellscream":"garrosh", "Medivh":"medivh", "Uther the Lightbringer":"uther"
};
BASE_RUN_STEPS[0].questions.forEach(q=>{
  q.image=`/assets/warcraft/${LOCAL_PORTRAITS[q.page]}.png`;
  q.source='https://github.com/HeroesToolChest/heroes-images';
});

// Curated media only: unresolved wiki pages stay in the source bank, outside the draw.
const RUN_LOCAL_IMAGES = {
  ...Object.fromEntries(Object.entries(LOCAL_PORTRAITS).map(([page,file])=>[page,file+'.png'])),
  "The Lich King":"arthas.png", "Ragnaros":"Ragnaros.png", "Murloc":"murky.png",
  "Grom Hellscream":"Grommash.png", "Muradin Bronzebeard":"Muradin.jpg", "Gul'dan":"Guldan.jpg",
  "Kel'Thuzad":"Kelthuzad.webp", "Chen Stormstout":"Chen.png", "Anduin Wrynn":"Anduin.png",
  "Tyrande Whisperwind":"Tyrande.jpg", "Ysera":"Ysera.png", "Khadgar":"Khadgar.png",
  "Kael'thas Sunstrider":"Kael.jpg", "Lady Vashj":"VashJ.webp", "Tirion Fordring":"Tirion.png",
  "Bolvar Fordragon":"Bolvar.png", "Cho'gall":"Chogall.webp",
  "Argent Dawn":"d_argent_dawn.png", "Cenarion Circle":"k_cenarion_circle.png",
  "Kirin Tor":"k_dalaran.png", "The Wardens":"d_wardens.png",
  "Scarlet Crusade":"d_scarlet_crusade.png", "Shado-Pan":"k_shado_pan.png"
};
for(const q of RUN_VARIETY_QUESTIONS){const step=BASE_RUN_STEPS.find(s=>s.type===q.type)||EXTRA_RUN_STEPS.find(s=>s.type===q.type);if(step)step.questions.push(q)}
const RUN_STEPS = [...BASE_RUN_STEPS,...EXTRA_RUN_STEPS].map(step=>({
  ...step,
  questions:step.questions.filter(q=>!q.page||q.image||RUN_LOCAL_IMAGES[q.page]).map(q=>{
    if(RUN_LOCAL_IMAGES[q.page])return {...q,image:`/assets/warcraft/${RUN_LOCAL_IMAGES[q.page]}`};
    if(step.type==='VILLE'&&q.answer==='Hurlevent')return {...q,image:'/assets/warcraft/stormwind.jpg',source:'https://github.com/Daribon/Vanilla-Screenshot-Archive/tree/master/Cities/Stormwind'};
    return q;
  })
}));

const $ = selector => document.querySelector(selector);
const el = {
  start:$("#startScreen"), quiz:$("#quizScreen"), end:$("#endScreen"), launch:$("#startRun"), replay:$("#replayRun"), quit:$("#quitRun"),
  difficulties:[...document.querySelectorAll("[data-run-difficulty]")], soloDifficulty:$("#soloDifficulty"),
  bankCount:$("#questionBankCount"), variantCount:$("#variantCount"),
  rail:$("#progressRail"), score:$("#scoreValue"), combo:$("#comboValue"), index:$("#roundIndex"), type:$("#roundType"), timer:$("#timerValue"), timerFill:$("#timerFill"),
  panel:$("#visualPanel"), image:$("#questionImage"), textVisual:$("#textVisual"), subjectTag:$("#subjectTag"), subjectName:$("#subjectName"), code:$("#visualCode"), kicker:$("#questionKicker"), question:$("#questionText"), answers:$("#answerGrid"),
  geo:$("#geoBoard"), geoGuess:$("#geoGuess"), geoTarget:$("#geoTarget"), geoLine:$("#geoLine"), geoConfirm:$("#geoConfirm"),
  audioConsole:$("#audioConsole"), audio:$("#audioSource"), audioLabel:$("#audioLabel"), playAudio:$("#playAudio"),
  feedback:$("#feedback"), feedbackLabel:$("#feedbackLabel"), feedbackAnswer:$("#feedbackAnswer"), feedbackFact:$("#feedbackFact"), source:$("#sourceLink"), next:$("#nextQuestion"),
  rank:$("#rankValue"), endTitle:$("#endTitle"), endSummary:$("#endSummary"), finalScore:$("#finalScore")
};

let run = [];
let round = 0;
let score = 0;
let combo = 1;
let correctCount = 0;
let seconds = 20;
let timerId;
let locked = true;
let renderToken = 0;
let geoPick = null;

let mediaWait, mediaBlocked=false, audioHasStarted=false, skippedCount=0;
let outcomes = [];
let difficulty = "normal";
try { difficulty = localStorage.getItem("loreDiffAzerothDifficulty") || "normal"; } catch { /* stockage privé indisponible */ }

const ACTIVE_TYPES = [
  "PERSONNAGE","GÉO","QUI A DIT ÇA","OST / THÈME","BIOME","SILHOUETTE","LOOT","VILLE","ZOOM","FACTION","CONNEXION",
  "INSTANCE","BESTIAIRE","INTRUS","EXTENSION","LORE","ERREUR LORE","STATUT","CARTE EXPRESS","CHRONO"
];
const activeQuestionCount = RUN_STEPS.filter(step => ACTIVE_TYPES.includes(step.type)).reduce((total,step) => total + step.questions.length,0);
el.bankCount.textContent = activeQuestionCount;
el.variantCount.textContent = `≈${Math.round(activeQuestionCount / ACTIVE_TYPES.length)}`;

function shuffle(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i],copy[j]] = [copy[j],copy[i]];
  }
  return copy;
}

function questionKey(question) {
  return [question.answer,question.subject,question.page,question.audio,question.image,question.prompt].filter(Boolean).join("|");
}

function pickRun() {
  let rotations = {};
  try { const saved=JSON.parse(localStorage.getItem("loreDiffAzerothRotationV2") || "{}"); if(saved&&typeof saved==='object'&&!Array.isArray(saved))rotations=saved; } catch { /* no history yet */ }
  const draw=AzerothRun.draw(RUN_STEPS.filter(step=>ACTIVE_TYPES.includes(step.type)),rotations);
  try { localStorage.setItem("loreDiffAzerothRotationV2",JSON.stringify(draw.rotations)); } catch { /* stockage privé indisponible */ }
  return draw.run;
}

function paintRail() {
  el.rail.innerHTML = run.map((step,index) => `<li class="${index < round ? "done" : index === round ? "active" : ""}" title="${AzerothRun.families[step.family].label} · ${step.type}" ${index===round?'aria-current="step"':''}>${index+1}. ${AzerothRun.families[step.family].label}</li>`).join("");
  el.score.textContent = String(score).padStart(4,"0");
  el.combo.textContent = `×${combo}`;
}

async function wikiImage(page) {
  return `/api/warcraft-image?title=${encodeURIComponent(page)}`;
}

function showTextVisual(text, fallback = false) {
  el.image.hidden = true;
  el.textVisual.hidden = false;
  el.textVisual.classList.toggle("fallback",fallback);
  el.textVisual.querySelector("b").textContent = text;
}

function loadImage(source, alt) {
  return new Promise(resolve => {
    const done = ok => { clearTimeout(timeout); el.image.onload = null; el.image.onerror = null; resolve(ok); };
    const timeout = setTimeout(() => done(false),5000);
    el.image.onload = () => done(true);
    el.image.onerror = () => done(false);
    el.image.referrerPolicy = "no-referrer";
    el.image.alt = alt;
    el.image.src = source;
  });
}

async function prepareVisual(step, question, token) {
  el.panel.classList.toggle("character-active",step.type === "PERSONNAGE");
  el.panel.classList.toggle("emblem-active",step.type === "FACTION");
  el.panel.classList.toggle("geo-active",step.mode === "geo");
  el.panel.classList.toggle("audio-active",step.mode === "audio");
  el.panel.classList.toggle("silhouette-active",step.mode === "silhouette");
  el.panel.classList.toggle("zoom-active",step.mode === "zoom");
  el.geo.hidden = step.mode !== "geo";
  el.audioConsole.hidden = step.mode !== "audio";
  if (step.mode === "geo") {
    el.panel.classList.remove("loading");
    el.image.hidden = true;
    el.textVisual.hidden = true;
    return;
  }
  if (step.mode === "audio") {
    el.panel.classList.remove("loading");
    el.image.hidden = true;
    el.textVisual.hidden = true;
    el.timer.textContent="—";el.timerFill.style.width="100%";
    el.audio.hidden = true;
    el.audioLabel.textContent = "CHRONO EN ATTENTE DE LA PREMIÈRE ÉCOUTE";
    el.playAudio.disabled = false;
    el.playAudio.textContent = "▶ ÉCOUTER LE SIGNAL";
    if(question.audio) { el.audio.src=question.audio; el.audio.load(); }
    else mediaFailure("Aucun extrait disponible pour cette épreuve.");
    return;
  }
  el.panel.classList.add("loading");
  el.image.hidden = true;
  showTextVisual("?",false);
  let source = question.image || (LOCAL_PORTRAITS[question.page] ? `/assets/warcraft/${LOCAL_PORTRAITS[question.page]}.png` : null);
  if (!source && question.page) {
    try { source = await wikiImage(question.page); } catch { source = null; }
  }
  if (token !== renderToken) return;
  if (source) {
    const loaded = await loadImage(source,question.subject ? `Portrait de ${question.subject}` : "Visuel mystère de l’épreuve");
    if (token !== renderToken) return;
    if (loaded) { el.image.hidden = false; el.textVisual.hidden = true; }
    else { showTextVisual("VISUEL INDISPONIBLE",true); mediaFailure("Le visuel n’a pas pu charger. Le chrono est arrêté."); }
  } else if (question.prompt) {
    showTextVisual(step.code,false);
  } else {
    showTextVisual("VISUEL INDISPONIBLE",true); mediaFailure("Le visuel est indisponible. Le chrono est arrêté.");
  }
  el.panel.classList.remove("loading");
}

function startTimer() {
  clearInterval(timerId);
  const duration = AzerothRun.duration(difficulty,run[round].stage);
  seconds = duration;
  el.timer.textContent = seconds;
  el.timerFill.style.width = "100%";
  el.timerFill.classList.remove("danger");
  const started = performance.now();
  timerId = setInterval(() => {
    const elapsed = (performance.now() - started) / 1000;
    const left = Math.max(0,duration - elapsed);
    seconds = Math.ceil(left);
    el.timer.textContent = seconds;
    el.timerFill.style.width = `${left / duration * 100}%`;
    el.timerFill.classList.toggle("danger",left <= Math.min(6,duration * .3));
    if (left <= 0) {
      clearInterval(timerId);
      if (run[round].mode === "geo") finishGeo(null);
      else answer(null);
    }
  },100);
}

async function renderQuestion() {
  const token = ++renderToken;
  mediaBlocked=false; audioHasStarted=false;
  document.querySelector("#mediaProblem").hidden=true;
  locked = true;
  clearInterval(timerId);
  const step = run[round];
  const question = step.question;
  stopAudio();
  paintRail();
  el.index.textContent = `ÉPREUVE ${String(round + 1).padStart(2,"0")} / ${String(run.length).padStart(2,"0")}`;
  el.type.textContent = `${AzerothRun.families[step.family].label} · ${step.type}`;
  el.index.textContent += ` · ${AzerothRun.stages[step.stage]}`;
  const hasMedia = step.mode === "geo" || step.mode === "audio" || !!question.image || !!question.page;
  el.panel.hidden = !hasMedia;
  document.querySelector("#questionStage").classList.toggle("media-layout",hasMedia);
  document.querySelector("#questionStage").classList.toggle("map-layout",step.mode === "geo");
  el.code.textContent = `${step.code}-${String(round + 1).padStart(2,"0")}`;
  el.kicker.textContent = question.subject ? `${step.kicker} // ${question.subject.toUpperCase()}` : step.kicker;
  el.question.textContent = step.mode === "silhouette" ? "Qui se cache dans cette image floutée ?" : question.prompt || (step.type === "PERSONNAGE" ? "Qui est ce personnage ?" : step.type === "BIOME" ? "Dans quelle zone sommes-nous ?" : step.type === "VILLE" ? "Quelle ville vois-tu ?" : "Quel est ce donjon ou raid ?");
  el.subjectTag.hidden = !question.subject;
  el.subjectName.textContent = question.subject || "";
  el.feedback.hidden = true;
  el.feedback.classList.remove("wrong");
  el.panel.classList.remove("revealed");
  el.source.hidden = true;
  el.answers.innerHTML = "";
  geoPick = null;
  el.geoGuess.hidden = true;
  el.geoTarget.hidden = true;
  el.geoLine.hidden = true;
  el.geoConfirm.hidden = true;
  el.geoConfirm.disabled = false;
  el.answers.hidden = step.mode === "geo";
  if (step.mode !== "geo") {
    shuffle(question.options).forEach((option,index) => {
      const button = document.createElement("button");
      button.className = "answer-button";
      button.type = "button";
      button.disabled = true;
      button.dataset.answer = option;
      button.innerHTML = `<b>${String.fromCharCode(65 + index)}</b><span>${option}</span>`;
      button.addEventListener("click",() => answer(option));
      el.answers.append(button);
    });
  }
  if(hasMedia)await prepareVisual(step,question,token);
  if (token !== renderToken) return;
  if(mediaBlocked)return;
  locked = false;
  if(step.mode!=="audio")el.answers.querySelectorAll("button").forEach(b=>b.disabled=false);
  window.LoreFX?.beat('round',{reset:round===0,label:round===run.length-1?'DERNIÈRE ÉPREUVE':`ÉPREUVE ${round+1} / ${run.length}`,detail:step.type});
  if(step.mode!=="audio")startTimer();
  el.question.focus({preventScroll:true});
  el.question.scrollIntoView({block:"nearest",behavior:"instant"});
}

function mediaFailure(message) {
  if(locked && el.feedback.hidden===false)return;
  mediaBlocked=true;locked=true;clearInterval(timerId);stopAudio();
  document.querySelector("#mediaProblem").hidden=false;
  document.querySelector("#mediaProblemText").textContent=message;
  el.answers.querySelectorAll("button").forEach(b=>b.disabled=true);
  el.playAudio.disabled=true;
  el.audioLabel.textContent="EXTRAIT INDISPONIBLE · CHRONO ARRÊTÉ";
}
function confirmPlayback(){
  if(mediaBlocked||run[round]?.mode!=='audio'||el.feedback.hidden===false)return;
  clearTimeout(mediaWait);locked=false;
  el.audioConsole.classList.add('playing');el.playAudio.textContent="■ COUPER LE SIGNAL";
  el.audioLabel.textContent="LECTURE EN COURS";
  el.answers.querySelectorAll('button').forEach(b=>b.disabled=false);
  if(!audioHasStarted){audioHasStarted=true;startTimer();}
}
function stopAudio() {
  clearTimeout(mediaWait);el.audio.pause();
  if(el.audio.currentTime)el.audio.currentTime=0;
  el.audioConsole.classList.remove('playing');
  el.audioLabel.textContent=audioHasStarted?'LECTURE ARRÊTÉE':'CHRONO EN ATTENTE DE LA PREMIÈRE ÉCOUTE';
  el.playAudio.textContent="▶ RÉÉCOUTER LE SIGNAL";
}
async function playAudioSignal(){
  if(locked||mediaBlocked||run[round]?.mode!=='audio')return;
  const token=renderToken,question=run[round].question;
  el.playAudio.textContent="DÉMARRAGE DU SIGNAL…";
  mediaWait=setTimeout(()=>{if(token===renderToken)mediaFailure("Aucun démarrage audio confirmé. Réessaie ou passe sans pénalité.");},4000);
  try {
    el.audio.muted=false;el.audio.volume=1;
    el.audio.currentTime=question.start||0;
    await el.audio.play();
    if(token!==renderToken)el.audio.pause();
  } catch {if(token===renderToken)mediaFailure("L’extrait audio est indisponible. Passe sans pénalité.");}
}
el.audio.addEventListener('playing',confirmPlayback);
el.audio.addEventListener('error',()=>{if(run[round]?.mode==='audio'&&el.feedback.hidden)mediaFailure("L’extrait audio ne peut pas être chargé.");});
document.querySelector('#retryMedia').addEventListener('click',renderQuestion);
document.querySelector('#skipMedia').addEventListener('click',()=>{
  if(!mediaBlocked)return;skippedCount++;outcomes[round]=null;stopAudio();
  if(round>=run.length-1)finishRun();else{round++;renderQuestion();}
});

function placeGeoMarker(x,y) {
  geoPick = { x:Math.min(1,Math.max(0,x)), y:Math.min(1,Math.max(0,y)) };
  el.geoGuess.style.left = `${geoPick.x * 100}%`;
  el.geoGuess.style.top = `${geoPick.y * 100}%`;
  el.geoGuess.hidden = false;
  el.geoConfirm.hidden = false;
}

function drawGeoLine(from,to) {
  const width = el.geo.clientWidth;
  const height = el.geo.clientHeight;
  const dx = (to.x - from.x) * width;
  const dy = (to.y - from.y) * height;
  el.geoLine.style.left = `${from.x * 100}%`;
  el.geoLine.style.top = `${from.y * 100}%`;
  el.geoLine.style.width = `${Math.hypot(dx,dy)}px`;
  el.geoLine.style.transform = `rotate(${Math.atan2(dy,dx)}rad)`;
  el.geoLine.hidden = false;
}

function finishGeo(choice) {
  if (locked) return;
  locked = true;
  clearInterval(timerId);
  const question = run[round].question;
  const target = { x:question.x, y:question.y };
  el.geoConfirm.disabled = true;
  el.geoTarget.style.left = `${target.x * 100}%`;
  el.geoTarget.style.top = `${target.y * 100}%`;
  el.geoTarget.hidden = false;

  let close = false;
  if (choice) {
    drawGeoLine(choice,target);
    const distance = Math.hypot(choice.x - target.x,choice.y - target.y);
    close = distance <= .12;
    const base = Math.max(100,Math.round(1100 * (1 - distance / .55)));
    const gained = Math.round((base + seconds * 10) * combo);
    score += gained;
    el.feedbackLabel.textContent = distance <= .06 ? `PLEIN DANS LA ZONE · +${gained}` : `ÉCART ${Math.round(distance * 100)}% · +${gained}`;
    if (close) { correctCount += 1; combo = Math.min(3,combo + 1); }
    else combo = 1;
  } else {
    el.feedbackLabel.textContent = "TEMPS ÉCOULÉ";
    combo = 1;
  }

  outcomes[round]=close;
  window.LoreFX?.beat(close?'correct':'wrong',{label:close?'Zone repérée.':'LOCALISATION MANQUÉE'});
  el.feedback.classList.toggle("wrong",!close);
  el.feedbackAnswer.textContent = question.answer;
  el.feedbackFact.textContent = question.fact;
  el.source.href = question.source;
  el.source.hidden = false;
  el.next.textContent = round === run.length - 1 ? "VOIR MON RÉSULTAT →" : "ÉPREUVE SUIVANTE →";
  el.feedback.hidden = false;
  paintRail();
  el.feedback.scrollIntoView({ behavior:"instant",block:"nearest" });
}

function answer(choice) {
  if (locked) return;
  locked = true;
  clearInterval(timerId);
  stopAudio();
  el.panel.classList.add("revealed");
  const question = run[round].question;
  const correct = choice === question.answer;
  const buttons = [...el.answers.querySelectorAll("button")];
  buttons.forEach(button => {
    button.disabled = true;
    if (button.dataset.answer === question.answer) button.classList.add("correct");
    else if (button.dataset.answer === choice) button.classList.add("wrong");
  });
  if (correct) {
    const gained = (500 + seconds * 25) * combo;
    score += gained;
    correctCount += 1;
    el.feedbackLabel.textContent = `CORRECT · +${gained}`;
    combo = Math.min(3,combo + 1);
  } else {
    el.feedbackLabel.textContent = choice === null ? "TEMPS ÉCOULÉ" : "MAUVAISE RÉPONSE";
    combo = 1;
  }
  outcomes[round]=correct;
  window.LoreFX?.beat(correct?'correct':'wrong',{label:correct?'Archive retrouvée.':choice===null?'TEMPS ÉCOULÉ':'ON SE REPREND.'});
  el.feedback.classList.toggle("wrong",!correct);
  el.feedbackAnswer.textContent = question.answer;
  el.feedbackFact.textContent = question.fact;
  if (question.source) { el.source.href = question.source; el.source.hidden = false; }
  else if (question.page) { el.source.href = `https://warcraft.wiki.gg/wiki/${encodeURIComponent(question.page.replaceAll(" ","_"))}`; el.source.hidden = false; }
  el.next.textContent = round === run.length - 1 ? "VOIR MON RÉSULTAT →" : "ÉPREUVE SUIVANTE →";
  el.feedback.hidden = false;
  paintRail();
  el.feedback.scrollIntoView({ behavior:"instant",block:"nearest" });
}

function finishRun() {
  window.LoreFX?.beat('finish',{detail:`${correctCount} / ${run.length} épreuves réussies.`});
  clearInterval(timerId);
  stopAudio();
  el.quiz.hidden = true;
  el.end.hidden = false;
  const accuracy = correctCount / Math.max(1,run.length-skippedCount);
  const rank = accuracy >= .9 ? "S" : accuracy >= .7 ? "A" : accuracy >= .5 ? "B" : "C";
  const title = rank === "S" ? "MAÎTRE<br />DU LORE" : rank === "A" ? "ARCHIVISTE<br />CONFIRMÉ" : rank === "B" ? "AVENTURIER<br />SOLIDE" : "TOURISTE<br />D’AZEROTH";
  el.rank.textContent = rank;
  el.endTitle.innerHTML = title;
  el.endSummary.textContent = `${correctCount} épreuves réussies sur ${run.length-skippedCount} jouables. ${skippedCount ? skippedCount+" épreuve(s) indisponible(s), sans pénalité. " : ""} ${correctCount === run.length ? "Run parfait : aucune archive ne t’a résisté." : accuracy >= .7 ? "Bonne maîtrise, mais quelques zones restent à explorer." : "Il va falloir refaire quelques quêtes avant le prochain run."}`;
  const recap=document.querySelector("#familyRecap");recap.replaceChildren();
  for(const [family,meta] of Object.entries(AzerothRun.families)){
    const indices=run.map((s,i)=>s.family===family&&outcomes[i]!==null?i:-1).filter(i=>i>=0);
    const item=document.createElement("span");item.textContent=`${meta.label} · ${indices.filter(i=>outcomes[i]).length}/${indices.length}`;recap.appendChild(item);
  }
  el.finalScore.textContent = `${score} POINTS`;
  window.scrollTo({ top:0,behavior:"smooth" });
}

function startRun() {
  ++renderToken;
  clearInterval(timerId);
  run = pickRun();
  round = 0;
  score = 0;
  combo = 1;
  correctCount = 0;
  skippedCount = 0;
  outcomes = [];
  el.start.hidden = true;
  el.end.hidden = true;
  el.quiz.hidden = false;
  window.scrollTo({ top:0,behavior:"smooth" });
  renderQuestion();
}

el.launch.addEventListener("click",startRun);
el.replay.addEventListener("click",startRun);
el.quit.addEventListener("click",startRun);
function selectDifficulty(value) {
  difficulty = ["easy","normal","expert"].includes(value) ? value : "normal";
  try { localStorage.setItem("loreDiffAzerothDifficulty",difficulty); } catch { /* stockage privé indisponible */ }
  el.difficulties.forEach(button => button.classList.toggle("selected",button.dataset.runDifficulty === difficulty));
  const names={easy:"FACILE",normal:"NORMAL",expert:"EXPERT"};
  el.soloDifficulty.textContent = `12 ÉPREUVES · ${names[difficulty]}`;
  el.difficulties.forEach(button=>button.setAttribute("aria-pressed",String(button.dataset.runDifficulty===difficulty)));
}
el.difficulties.forEach(button => button.addEventListener("click",() => selectDifficulty(button.dataset.runDifficulty)));
selectDifficulty(difficulty);
el.playAudio.addEventListener("click",() => {
  if (!el.audio.paused) stopAudio();
  else playAudioSignal();
});
el.audio.addEventListener("ended",stopAudio);
el.geo.addEventListener("click",event => {
  if (locked) return;
  const rect = el.geo.getBoundingClientRect();
  placeGeoMarker((event.clientX - rect.left) / rect.width,(event.clientY - rect.top) / rect.height);
});
el.geo.addEventListener("keydown",event => {
  if (locked) return;
  if (event.key === "Enter" && geoPick) { event.preventDefault(); finishGeo(geoPick); return; }
  const movement = { ArrowLeft:[-.02,0], ArrowRight:[.02,0], ArrowUp:[0,-.02], ArrowDown:[0,.02] }[event.key];
  if (!movement) return;
  event.preventDefault();
  const current = geoPick || { x:.5,y:.5 };
  placeGeoMarker(current.x + movement[0],current.y + movement[1]);
});
el.geoConfirm.addEventListener("click",() => { if (geoPick) finishGeo(geoPick); });
el.next.addEventListener("click",() => { if(el.feedback.hidden)return; if (round >= run.length - 1) finishRun(); else { round += 1; renderQuestion(); } });
