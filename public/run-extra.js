const EXTRA_RUN_STEPS = [
  {
    type:"OST / THÈME", mode:"audio", kicker:"ARCHIVE MUSICALE DE ZONE", code:"OST",
    questions:[
      { answer:"La forêt d’Elwynn", options:["La forêt d’Elwynn","Les Grisonnes","Teldrassil","Le bois de la Pénombre"], prompt:"À quelle zone appartient ce thème ?", audio:"https://wow.zamimg.com/sound-ids/live/enus/244/53492/dayforest01.mp3", start:0, source:"https://www.youtube.com/watch?v=MW4fASDkQXA", fact:"Ce thème pastoral accompagne l’exploration de la forêt d’Elwynn.", fallback:"THÈME CLASSIC" },
      { answer:"Hurlevent", options:["Hurlevent","Forgefer","Lordaeron","Dalaran"], prompt:"Quelle capitale reconnais-tu grâce à son thème ?", audio:"https://wow.zamimg.com/sound-ids/live/enus/219/53211/stormwind_intro-moment.mp3", start:0, source:"https://www.youtube.com/watch?v=roMWEeV2P4U", fact:"Les cuivres solennels signalent l’entrée dans Hurlevent.", fallback:"THÈME CLASSIC" },
      { answer:"Les Grisonnes", options:["Les Grisonnes","Le fjord Hurlant","Les pics Foudroyés","La Désolation des dragons"], prompt:"À quelle zone du Norfendre appartient ce thème ?", audio:"https://wow.zamimg.com/sound-ids/live/enus/202/229834/gh_intro1uni01.mp3", start:0, source:"https://www.youtube.com/watch?v=gn3vYlkxHpE", fact:"La vièle caractéristique des Grisonnes est l’un des sons les plus reconnaissables de Wrath.", fallback:"THÈME WOTLK" },
      { answer:"Ulduar", options:["Ulduar","Naxxramas","La Citadelle de la Couronne de glace","Le Nexus"], prompt:"Quelle instance titanique reconnais-tu à ce thème ?", audio:"https://wow.zamimg.com/sound-ids/live/enus/242/293874/ur_ulduarraidextaction02.mp3", start:0, source:"https://www.youtube.com/watch?v=EpQSBmsj5L4", fact:"Cette atmosphère monumentale accompagne la cité titanique d’Ulduar.", fallback:"THÈME WOTLK" },
      { answer:"Les pics Foudroyés", options:["Les pics Foudroyés","La Couronne de glace","Joug-d’Hiver","Zul’Drak"], prompt:"À quelle zone glacée appartient ce thème ?", audio:"https://wow.zamimg.com/sound-ids/live/enus/68/229956/sp_generalwalkb_day02.mp3", start:0, source:"https://www.youtube.com/watch?v=C9IXUwqxIao", fact:"Le thème ample et glacé accompagne l’ascension des pics Foudroyés.", fallback:"THÈME WOTLK" }
    ]
  },
  {
    type:"QUI A DIT ÇA", mode:"audio", kicker:"RÉPLIQUE VOCALE", code:"VO",
    questions:[
      { answer:"Seigneur du Fléau Tyrannus", options:["Seigneur du Fléau Tyrannus","Bolvar Fordragon","Darion Mograine","Le roi Ymiron"], prompt:"À qui appartient cette voix ?", audio:"https://wow.zamimg.com/sound-ids/live/enus/52/559668/PS_Tyrannus_Prefight01.ogg", source:"https://www.wowhead.com/npc=36658/scourgelord-tyrannus", fact:"Tyrannus commande la Fosse de Saron au nom du Roi-Liche.", fallback:"SIGNAL VOCAL" },
      { answer:"Brann Barbe-de-Bronze", options:["Brann Barbe-de-Bronze","Magni Barbe-de-Bronze","Muradin Barbe-de-Bronze","Dagran Thaurissan II"], prompt:"À qui appartient cette voix ?", audio:"https://wow.zamimg.com/sound-ids/live/enus/104/5768808/VO_110_Brann_Bronzebeard_257930.ogg", source:"https://www.wowhead.com/npc=206017/brann-bronzebeard", fact:"Brann est l’explorateur le plus célèbre de la Ligue des explorateurs.", fallback:"SIGNAL VOCAL" },
      { answer:"Augure stellaire Etraeus", options:["Augure stellaire Etraeus","Grand botaniste Tel’arn","Trilliax","Krosus"], prompt:"À quel boss appartient cette voix ?", audio:"https://wow.zamimg.com/sound-ids/live/enus/74/1349194/VO_701_Star_Augur_Etraeus_13.ogg", source:"https://www.wowhead.com/npc=103758/star-augur-etraeus", fact:"Etraeus observe le cosmos depuis les hauteurs du palais Sacrenuit.", fallback:"SIGNAL DU VIDE" },
      { answer:"Le Chevalier noir", options:["Le Chevalier noir","Baron Vaillefendre","Sire Zeliek","Alexandros Mograine"], prompt:"À qui appartient cette réplique ?", audio:"https://wow.zamimg.com/sound-ids/live/enus/46/545070/AC_BlackKnight_GhostRes01.ogg", source:"https://www.wowhead.com/npc=35451/the-black-knight", fact:"Le Chevalier noir est l’adversaire final de l’Épreuve du champion.", fallback:"SIGNAL MORT-VIVANT" },
      { answer:"Un gangregarde", options:["Un gangregarde","Un marcheur du Vide","Un infernal","Un diablotin"], prompt:"Quelle créature prononce cette réplique ?", audio:"https://wow.zamimg.com/sound-ids/live/enus/251/547323/DOOM_KILL01.ogg", source:"https://www.wowhead.com/sound=6119/summondoomguard", fact:"Cette voix démoniaque appartient à la famille des gardes invoqués par les démonistes.", fallback:"SIGNAL DÉMONIAQUE" },
      { answer:"Kil’ruk le Saccageur de vent", options:["Kil’ruk le Saccageur de vent","Hisek le Gardien de l’essaim","Iyyokuk le Lucide","Korven le Primordial"], prompt:"Quel Parangon des Klaxxi entends-tu ?", audio:"https://wow.zamimg.com/sound-ids/live/enus/214/640726/VO_DW_KILRUK_EXALTED_EVENT_12.ogg", source:"https://www.wowhead.com/npc=62538/kilruk-the-wind-reaver", fact:"Kil’ruk prévient que les Klaxxi serviraient Y’Shaarj s’il revenait.", fallback:"SIGNAL MANTIDE" },
      { answer:"Xal’atath", options:["Xal’atath","Alleria Coursevent","Sara","Azshara"], prompt:"Quelle voix liée au Vide entends-tu ?", audio:"https://wow.zamimg.com/sound-ids/live/enus/57/1391161/VO_703_Xalatath_Blade_OF_The_Black_Empire_31.ogg", source:"https://www.wowhead.com/npc=216052/xalatath", fact:"Xal’atath fut longtemps emprisonnée dans la Lame de l’Empire noir.", fallback:"MURMURE DU VIDE" }
    ]
  },
  {
    type:"SILHOUETTE", mode:"silhouette", kicker:"FORME NON IDENTIFIÉE", code:"SH",
    questions:[
      { page:"Ragnaros", answer:"Ragnaros", options:["Ragnaros","Therazane","Al’Akir","Neptulon"], prompt:"Qui se cache derrière cette silhouette ?", fact:"Ragnaros est le Seigneur du Feu et maître du Cœur du Magma.", fallback:"SEIGNEUR ÉLÉMENTAIRE" },
      { page:"The Lich King", answer:"Le Roi-Liche", options:["Le Roi-Liche","Le Geôlier","Teron Fielsang","Darion Mograine"], prompt:"Qui se cache derrière cette silhouette ?", fact:"La couronne et Deuillegivre rendent la silhouette du Roi-Liche immédiatement reconnaissable.", fallback:"ROI DU FLÉAU" },
      { page:"Murloc", answer:"Un murloc", options:["Un murloc","Un gnoll","Un kobold","Un hozen"], prompt:"Quelle créature reconnais-tu ?", fact:"Les murlocs sont devenus l’une des mascottes les plus connues de Warcraft.", fallback:"MRGLGLGL" },
      { page:"Illidan Stormrage", answer:"Illidan Hurlorage", options:["Illidan Hurlorage","Malfurion Hurlorage","Dargul","Kur’talos Corvaltus"], prompt:"Qui se cache derrière cette silhouette ?", fact:"Ses cornes, ses ailes et ses glaives de guerre trahissent Illidan.", fallback:"CHASSEUR DE DÉMONS" },
      { page:"Deathwing", answer:"Aile de mort", options:["Aile de mort","Galakrond","Iridikron","Razsageth"], prompt:"Quel dragon reconnais-tu ?", fact:"Les plaques d’élémentium maintiennent le corps brisé d’Aile de mort.", fallback:"ASPECT CORROMPU" },
      { page:"Grom Hellscream", answer:"Grommash Hurlenfer", options:["Grommash Hurlenfer","Garrosh Hurlenfer","Durotan","Orgrim Marteau-du-Destin"], prompt:"Quel orc reconnais-tu ?", fact:"Grommash manie la légendaire hache Hurlesang.", fallback:"CHEF CHANTEGUERRE" }
    ]
  },
  {
    type:"LOOT", kicker:"TABLE DE BUTIN", code:"LT",
    questions:[
      { answer:"Illidan Hurlorage", options:["Illidan Hurlorage","Kael’thas Haut-Soleil","Archimonde","Magtheridon"], prompt:"Quel boss peut lâcher les Glaives de guerre d’Azzinoth ?", fact:"Les deux glaives légendaires tombent sur Illidan au Temple noir." },
      { answer:"Ragnaros", options:["Ragnaros","Nefarian","C’Thun","Onyxia"], prompt:"Quel boss détient l’Œil de Sulfuras ?", fact:"L’Œil de Sulfuras permet de créer la masse légendaire Sulfuras." },
      { answer:"Le Roi-Liche", options:["Le Roi-Liche","Yogg-Saron","Kel’Thuzad","Anub’arak"], prompt:"Sur quel boss obtient-on Invincible ?", fact:"La monture Invincible peut tomber sur le Roi-Liche en difficulté héroïque." },
      { answer:"Kael’thas Haut-Soleil", options:["Kael’thas Haut-Soleil","Dame Vashj","Gruul","Prince Malchezaar"], prompt:"Quel boss peut lâcher les Cendres d’Al’ar ?", fact:"La monture tombe sur Kael’thas dans l’Œil du Donjon de la Tempête." },
      { answer:"Garrosh Hurlenfer", options:["Garrosh Hurlenfer","Lei Shen","Sha de la peur","Ra Den"], prompt:"Quel boss pouvait lâcher les Défenses de Mannoroth ?", fact:"Les épaulières iconiques proviennent de Garrosh au siège d’Orgrimmar." },
      { answer:"Le baron Vaillefendre", options:["Le baron Vaillefendre","Baron d’Argelaine","Ramstein Grandgosier","Maleki le Blafard"], prompt:"Quel boss est associé au Destrier de la mort ?", fact:"La monture est historiquement liée au baron Vaillefendre à Stratholme." }
    ]
  },
  {
    type:"FACTION", kicker:"EMBLÈME ET ALLÉGEANCE", code:"FC",
    questions:[
      { page:"Argent Crusade", answer:"La Croisade d’argent", options:["La Croisade d’argent","L’Aube d’argent","La Main d’argent","La Croisade écarlate"], prompt:"À quelle faction appartient cet emblème ?", fact:"Tirion Fordring fonde la Croisade d’argent contre le Fléau." },
      { page:"Cenarion Circle", answer:"Le Cercle cénarien", options:["Le Cercle cénarien","Les Gardiens d’Hyjal","La Rêverie","Le Concordat de Valdrakken"], prompt:"À quelle faction appartient cet emblème ?", fact:"Le Cercle cénarien rassemble druides et défenseurs de la nature." },
      { page:"Kirin Tor", answer:"Le Kirin Tor", options:["Le Kirin Tor","Les Clairvoyants","Le Concordat argenté","Les Shen’dralar"], prompt:"À quelle faction appartient cet emblème ?", fact:"Le Kirin Tor gouverne la cité magique de Dalaran." },
      { page:"Bilgewater Cartel", answer:"Le cartel Baille-Fonds", options:["Le cartel Baille-Fonds","La KapitalRisk","Les Gentepression","Le cartel Gentepression"], prompt:"Quel cartel gobelin reconnais-tu ?", fact:"Le cartel Baille-Fonds rejoint la Horde après le Cataclysme." },
      { page:"The Wardens", answer:"Les Gardiennes", options:["Les Gardiennes","Les Sentinelles","Le Guet de Maiev","Les Veilleurs"], prompt:"À quelle organisation kaldorei appartient cet emblème ?", fact:"Maiev Chantelombre est la plus célèbre des Gardiennes." },
      { page:"The Earthen Ring", answer:"Le Cercle terrestre", options:["Le Cercle terrestre","Le Marteau du crépuscule","Les Hydraxiens","Le Tréfonds"], prompt:"À quelle faction appartient cet emblème ?", fact:"Le Cercle terrestre est une organisation chamanique dirigée contre les crises élémentaires." }
    ]
  },
  {
    type:"ZOOM", mode:"zoom", kicker:"DÉTAIL SOUS SURVEILLANCE", code:"ZM",
    questions:[
      { answer:"Nagrand", options:["Nagrand","Mulgore","Arathi","Les Tarides"], prompt:"Reconnais la zone avant la fin du dézoom.", image:"https://wow.zamimg.com/uploads/screenshots/normal/314871-nagrand.jpg", source:"https://www.wowhead.com/zone=3518/nagrand", fact:"Les îles flottantes et les plaines vertes caractérisent Nagrand.", fallback:"DÉTAIL DE ZONE" },
      { answer:"Ulduar", options:["Ulduar","Uldaman","Uldir","Antorus"], prompt:"Reconnais l’instance avant la fin du dézoom.", image:"https://www.buffed.de/screenshots/1280x1024/2009/05/Thorim_03.jpg", source:"https://www.wowhead.com/zone=4273/ulduar", fact:"L’architecture titanique et les éclairs évoquent Ulduar.", fallback:"DÉTAIL TITANIQUE" },
      { answer:"Suramar", options:["Suramar","Lune-d’Argent","Dalaran","Zin-Azshari"], prompt:"Reconnais la ville avant la fin du dézoom.", image:"https://www.buffed.de/screenshots/original/2016/09/WoW_Legion_Suramar.jpg", source:"https://www.wowhead.com/zone=7637/suramar", fact:"Suramar se distingue par son architecture Sacrenuit violette et dorée.", fallback:"DÉTAIL URBAIN" },
      { answer:"Le Temple noir", options:["Le Temple noir","Karazhan","Antorus","Auchindoun"], prompt:"Reconnais le raid avant la fin du dézoom.", image:"https://bnetcmsus-a.akamaihd.net/cms/template_resource/HQ2VLXNZR1L11498693220026.jpg", source:"https://worldofwarcraft.blizzard.com/news/20855984", fact:"Le Temple noir domine la vallée d’Ombrelune en Outreterre.", fallback:"DÉTAIL DE RAID" },
      { answer:"Zuldazar", options:["Zuldazar","Nazmir","Uldum","Vol’dun"], prompt:"Reconnais la zone avant la fin du dézoom.", image:"https://wow.zamimg.com/uploads/screenshots/normal/1076451-zuldazar.jpg", source:"https://www.wowhead.com/zone=8499/zuldazar", fact:"Les pyramides dorées signalent le cœur de l’empire zandalari.", fallback:"DÉTAIL ZANDALARI" },
      { answer:"Forgefer", options:["Forgefer","Gnomeregan","Grim Batol","Rochenoire"], prompt:"Reconnais la capitale avant la fin du dézoom.", image:"https://commandboard.wordpress.com/wp-content/uploads/2014/09/ironforge2.jpg", source:"https://warcraft.wiki.gg/wiki/Ironforge", fact:"La lave et la pierre taillée révèlent la capitale naine.", fallback:"DÉTAIL DE CAPITALE" }
    ]
  },
  {
    type:"CONNEXION", kicker:"RELATION ENTRE DEUX ARCHIVES", code:"LK",
    questions:[
      { answer:"Frères", options:["Frères","Père et fils","Maître et élève","Rivaux sans lien familial"], prompt:"Quel lien unit Malfurion et Illidan Hurlorage ?", fact:"Malfurion et Illidan sont frères jumeaux." },
      { answer:"Sœurs", options:["Sœurs","Cousines","Mère et fille","Aucun lien familial"], prompt:"Quel lien unit Sylvanas et Alleria Coursevent ?", fact:"Alleria, Sylvanas et Vereesa sont les trois sœurs Coursevent." },
      { answer:"Père et fils", options:["Père et fils","Frères","Chef et garde du corps","Oncle et neveu"], prompt:"Quel lien unit Varian et Anduin Wrynn ?", fact:"Anduin est le fils et héritier du roi Varian." },
      { answer:"Maître et apprenti", options:["Maître et apprenti","Frères","Rivaux politiques","Père et fils"], prompt:"Quel lien unit Medivh et Khadgar ?", fact:"Khadgar est envoyé à Karazhan comme apprenti de Medivh." },
      { answer:"Père et fils", options:["Père et fils","Frères d’armes","Oncle et neveu","Chef et prisonnier"], prompt:"Quel lien unit Grommash et Garrosh Hurlenfer ?", fact:"Garrosh est le fils de Grommash." },
      { answer:"Mère et fille", options:["Mère et fille","Sœurs","Aspect et consort","Aucun lien familial"], prompt:"Quel lien unit Ysera et Merithra ?", fact:"Merithra est la fille d’Ysera et lui succède à la tête du Vol vert." }
    ]
  },
  {
    type:"EXTENSION", kicker:"DATE DE DÉPLOIEMENT", code:"XP",
    questions:[
      { answer:"Legion", options:["Legion","Warlords of Draenor","Battle for Azeroth","Shadowlands"], prompt:"Dans quelle extension Suramar devient-elle une zone jouable majeure ?", fact:"Suramar et la campagne des Sacrenuit sont au centre de Legion." },
      { answer:"Cataclysm", options:["Cataclysm","Wrath of the Lich King","Mists of Pandaria","Warlords of Draenor"], prompt:"Dans quelle extension apparaît Vashj’ir ?", fact:"Vashj’ir est l’une des nouvelles zones de Cataclysm." },
      { answer:"Mists of Pandaria", options:["Mists of Pandaria","Cataclysm","Legion","Battle for Azeroth"], prompt:"Dans quelle extension affronte-t-on Garrosh au siège d’Orgrimmar ?", fact:"Le siège d’Orgrimmar conclut Mists of Pandaria." },
      { answer:"The Burning Crusade", options:["The Burning Crusade","Wrath of the Lich King","Classic","Cataclysm"], prompt:"Dans quelle extension Karazhan devient-elle un raid ?", fact:"Karazhan est le premier grand raid à 10 joueurs de The Burning Crusade." },
      { answer:"Battle for Azeroth", options:["Battle for Azeroth","Legion","Shadowlands","Dragonflight"], prompt:"Dans quelle extension découvre-t-on Zuldazar ?", fact:"Zuldazar est l’une des trois zones principales de la Horde dans Battle for Azeroth." },
      { answer:"Dragonflight", options:["Dragonflight","Shadowlands","Battle for Azeroth","The War Within"], prompt:"Dans quelle extension visite-t-on les îles aux Dragons ?", fact:"Les îles aux Dragons sont le continent principal de Dragonflight." }
    ]
  },
  {
    type:"BESTIAIRE", kicker:"CLASSIFICATION DE CRÉATURE", code:"BST",
    questions:[
      { answer:"Aberration", options:["Aberration","Démon","Mort-vivant","Élémentaire"], prompt:"À quelle famille appartient un Sans-Visage ?", fact:"Les Sans-Visage sont des aberrations liées aux Dieux très anciens." },
      { answer:"Élémentaire", options:["Élémentaire","Démon","Dragon","Géant"], prompt:"À quelle famille appartient Ragnaros ?", fact:"Ragnaros est un seigneur élémentaire du feu." },
      { answer:"Mort-vivant", options:["Mort-vivant","Humanoïde","Aberration","Démon"], prompt:"À quelle famille appartient une abomination du Fléau ?", fact:"Les abominations sont des constructions de chairs mortes animées par la nécromancie." },
      { answer:"Démon", options:["Démon","Aberration","Élémentaire","Bête"], prompt:"À quelle famille appartient un seigneur des abîmes ?", fact:"Mannoroth et Magtheridon sont des seigneurs des abîmes démoniaques." },
      { answer:"Bête", options:["Bête","Dragon","Humanoïde","Élémentaire"], prompt:"À quelle famille appartient un sabre-de-nuit sauvage ?", fact:"Les sabres-de-nuit sont de grandes bêtes félines de Kalimdor." },
      { answer:"Dragon", options:["Dragon","Bête","Aberration","Élémentaire"], prompt:"À quelle famille appartient un drake du Néant ?", fact:"Les drakes du Néant sont des dragons transformés par les énergies de l’Outreterre." }
    ]
  },
  {
    type:"ORDRE RAID", kicker:"PROGRESSION D’INSTANCE", code:"RD",
    questions:[
      { answer:"Le Conservateur", options:["Le Conservateur","Prince Malchezaar","Plaie-de-Nuit","Dédain-du-Néant"], prompt:"Quel boss de Karazhan est normalement rencontré le plus tôt ?", fact:"Le Conservateur précède les rencontres de la partie supérieure de la tour." },
      { answer:"Dame Murmemort", options:["Dame Murmemort","Sindragosa","Professeur Putricide","Le Roi-Liche"], prompt:"Quel boss de la Citadelle de la Couronne de glace arrive le plus tôt ?", fact:"Dame Murmemort est le deuxième boss, bien avant les ailes supérieures." },
      { answer:"Tranchétripe l’Indompté", options:["Tranchétripe l’Indompté","Nefarian","Chromaggus","Vaelastrasz le Corrompu"], prompt:"Quel boss du Repaire de l’Aile noire est rencontré en premier ?", fact:"Tranchétripe ouvre la progression du Repaire de l’Aile noire." },
      { answer:"Léviathan des flammes", options:["Léviathan des flammes","Yogg-Saron","Général Vezax","Mimiron"], prompt:"Quel boss d’Ulduar est rencontré en premier ?", fact:"Le Léviathan des flammes attend les joueurs dans la zone du Siège d’Ulduar." },
      { answer:"Immerseus", options:["Immerseus","Garrosh Hurlenfer","Les Parangons des Klaxxi","Malkorok"], prompt:"Quel boss du siège d’Orgrimmar est rencontré en premier ?", fact:"Immerseus est la première rencontre du raid." },
      { answer:"Hurlaile", options:["Hurlaile","Sire Denathrius","Le Conseil du Sang","Le Destructeur affamé"], prompt:"Quel boss du château Nathria est rencontré en premier ?", fact:"Hurlaile garde l’entrée du château Nathria." }
    ]
  },
  {
    type:"ERREUR LORE", kicker:"UNE ARCHIVE EST FALSIFIÉE", code:"ER",
    questions:[
      { subject:"Thrall", page:"Thrall", answer:"Thrall est né sur Draenor.", options:["Thrall est né sur Draenor.","Thrall est le fils de Durotan.","Son nom orc est Go’el.","Il a été élevé par des humains."], prompt:"Thrall : quelle affirmation est fausse ?", fact:"Thrall est né en Azeroth, peu après l’arrivée de ses parents par la Porte des ténèbres.", fallback:"THRALL" },
      { subject:"Jaina Portvaillant", page:"Jaina Proudmoore", answer:"Jaina est née à Dalaran.", options:["Jaina est née à Dalaran.","Jaina est originaire de Kul Tiras.","Elle a étudié auprès d’Antonidas.","Elle a dirigé Theramore."], prompt:"Jaina : quelle affirmation est fausse ?", fact:"Jaina est née à Kul Tiras, puis étudie la magie à Dalaran.", fallback:"JAINA" },
      { subject:"Illidan Hurlorage", page:"Illidan Stormrage", answer:"Illidan est un paladin déchu.", options:["Illidan est un paladin déchu.","Illidan est le frère de Malfurion.","Il a consommé le crâne de Gul’dan.","Il a été emprisonné pendant des millénaires."], prompt:"Illidan : quelle affirmation est fausse ?", fact:"Illidan est un sorcier et chasseur de démons, pas un paladin.", fallback:"ILLIDAN" },
      { subject:"Aile de mort", page:"Deathwing", answer:"Aile de mort dirigeait le Vol bleu.", options:["Aile de mort dirigeait le Vol bleu.","Son ancien nom est Neltharion.","Il était l’Aspect de la Terre.","Les Dieux très anciens l’ont corrompu."], prompt:"Aile de mort : quelle affirmation est fausse ?", fact:"Neltharion dirigeait le Vol noir ; Malygos dirigeait le Vol bleu.", fallback:"AILE DE MORT" },
      { subject:"Sylvanas Coursevent", page:"Sylvanas Windrunner", answer:"Sylvanas était une prêtresse de la Lune.", options:["Sylvanas était une prêtresse de la Lune.","Elle fut générale des forestiers.","Arthas l’a transformée en banshee.","Elle a dirigé les Réprouvés."], prompt:"Sylvanas : quelle affirmation est fausse ?", fact:"Sylvanas était générale des forestiers de Lune-d’Argent.", fallback:"SYLVANAS" },
      { subject:"Anduin Wrynn", page:"Anduin Wrynn", answer:"Anduin est le fils d’Arthas.", options:["Anduin est le fils d’Arthas.","Anduin est le fils de Varian.","Il utilise la Lumière.","Il a régné sur Hurlevent."], prompt:"Anduin : quelle affirmation est fausse ?", fact:"Anduin est le fils de Varian Wrynn.", fallback:"ANDUIN" }
    ]
  },
  {
    type:"STATUT", kicker:"MORT, VIVANT OU AUTRE CHOSE", code:"ST",
    questions:[
      { answer:"Mort", options:["Mort","Vivant","Disparu","Emprisonné"], prompt:"Quel est le statut d’Arthas Menethil après Shadowlands ?", fact:"Le dernier fragment de son âme disparaît dans l’Ombreterre." },
      { answer:"Vivante", options:["Vivante","Morte","Ressuscitée par le Fléau","Emprisonnée dans le Néant"], prompt:"Quel est le statut de Jaina Portvaillant ?", fact:"Jaina est toujours vivante et active parmi les dirigeants d’Azeroth." },
      { answer:"Mort", options:["Mort","Vivant","Aspect actuel","Porté disparu"], prompt:"Quel est le statut de Varian Wrynn ?", fact:"Varian meurt au rivage Brisé face à Gul’dan." },
      { answer:"Morte, retournée en Ardenweald", options:["Morte, retournée en Ardenweald","Vivante en Azeroth","Prisonnière du Cauchemar","Devenue mort-vivante"], prompt:"Quel est le statut d’Ysera à la fin de Dragonflight ?", fact:"Ysera retourne en Ardenweald après son passage temporaire en Azeroth, tandis que Merithra dirige le Vol vert." },
      { answer:"Mort", options:["Mort","Vivant","En stase","Dirige toujours la Horde"], prompt:"Quel est le statut de Vol’jin ?", fact:"Vol’jin meurt après la bataille du rivage Brisé, mais son esprit continue d’intervenir." },
      { answer:"Vivante", options:["Vivante","Morte","Transformée en dragon","Prisonnière du Geôlier"], prompt:"Quel est le statut d’Alexstrasza ?", fact:"Alexstrasza demeure l’Aspect du Vol draconique rouge." }
    ]
  },
  {
    type:"CARTE EXPRESS", kicker:"ORIENTATION SANS BOUSSOLE", code:"NX",
    questions:[
      { answer:"Lune-d’Argent", options:["Lune-d’Argent","Fossoyeuse","Forgefer","Hurlevent"], prompt:"Quelle ville se trouve le plus au nord des Royaumes de l’Est ?", fact:"Lune-d’Argent se trouve dans les Bois des Chants éternels, à l’extrême nord." },
      { answer:"Baie-du-Butin", options:["Baie-du-Butin","Hurlevent","Karazhan","Forgefer"], prompt:"Quel lieu se trouve le plus au sud des Royaumes de l’Est ?", fact:"Baie-du-Butin est située tout au sud de Strangleronce." },
      { answer:"Forgefer", options:["Forgefer","Darnassus","L’Exodar","Orgrimmar"], prompt:"Quelle capitale est située en Dun Morogh ?", fact:"Forgefer est creusée sous les montagnes enneigées de Dun Morogh." },
      { answer:"Karazhan", options:["Karazhan","Scholomance","Stratholme","Naxxramas"], prompt:"Quelle instance se trouve dans le Défilé de Deuillevent ?", fact:"Karazhan est la tour de Medivh dans le Défilé de Deuillevent." },
      { answer:"Orgrimmar", options:["Orgrimmar","Les Pitons-du-Tonnerre","Lune-d’Argent","Fossoyeuse"], prompt:"Quelle capitale de la Horde se trouve en Durotar ?", fact:"Orgrimmar est bâtie au nord de Durotar." },
      { answer:"Zul’Gurub", options:["Zul’Gurub","Uldaman","Gnomeregan","Donjon d’Ombrecroc"], prompt:"Quelle instance se trouve en Strangleronce ?", fact:"Zul’Gurub est l’ancienne capitale des trolls Gurubashi." }
    ]
  }
];

const REPLAYABILITY_PACK = {
  "SILHOUETTE": [
    { page:"Muradin Bronzebeard", answer:"Muradin Barbe-de-Bronze", options:["Muradin Barbe-de-Bronze","Magni Barbe-de-Bronze","Brann Barbe-de-Bronze","Falstad Marteau-Hardi"], prompt:"Quel nain reconnais-tu ?", fact:"Muradin est le frère de Magni et Brann, et l’un des premiers maîtres d’armes d’Arthas.", fallback:"PRINCE NAIN" },
    { page:"Gul'dan", answer:"Gul’dan", options:["Gul’dan","Ner’zhul","Cho’gall","Kilrogg Œil-Mort"], prompt:"Quel démoniste reconnais-tu ?", fact:"Gul’dan fonde le Conseil des Ombres et livre les orcs à la Légion.", fallback:"PREMIER DÉMONISTE" },
    { page:"Kel'Thuzad", answer:"Kel’Thuzad", options:["Kel’Thuzad","Noth le Porte-Peste","Anub’arak","Malykriss"], prompt:"Quelle liche reconnais-tu ?", fact:"Kel’Thuzad commande Naxxramas au service du Roi-Liche.", fallback:"MAÎTRE DE NAXXRAMAS" },
    { page:"Chen Stormstout", answer:"Chen Brune-d’Orage", options:["Chen Brune-d’Orage","Taran Zhu","Ji Patte de Feu","Aysa Poète des Nuages"], prompt:"Quel pandaren reconnais-tu ?", fact:"Chen est un maître brasseur et un grand voyageur originaire de l’île Vagabonde.", fallback:"MAÎTRE BRASSEUR" }
  ],
  "LOOT": [
    { answer:"Attumen le Veneur", options:["Attumen le Veneur","Moroes","Le Conservateur","Prince Malchezaar"], prompt:"Quel boss de Karazhan peut lâcher le Destrier de guerre embrasé ?", fact:"Le destrier de guerre embrasé est la monture rare associée à Attumen le Veneur." },
    { answer:"Yogg-Saron", options:["Yogg-Saron","Mimiron","Algalon","Général Vezax"], prompt:"Quel boss d’Ulduar peut lâcher la Tête de Mimiron ?", fact:"La Tête de Mimiron provient de Yogg-Saron dans sa version la plus exigeante." },
    { answer:"Anzu", options:["Anzu","Ikiss","Talon-Roi Ikitiss","Aeonus"], prompt:"Quel boss est associé aux Rênes du seigneur corbeau ?", fact:"Anzu peut lâcher la célèbre monture du seigneur corbeau dans les salles des Sethekk." },
    { answer:"Onyxia", options:["Onyxia","Nefarian","Vaelastrasz","Sinestra"], prompt:"Quel boss peut lâcher Vis’kag le Saigneur ?", fact:"Vis’kag le Saigneur fait partie de la table de butin d’Onyxia." }
  ],
  "FACTION": [
    { page:"Argent Dawn", answer:"L’Aube d’argent", options:["L’Aube d’argent","La Croisade d’argent","La Main d’argent","La Croisade écarlate"], prompt:"À quelle faction appartient cet emblème ?", fact:"L’Aube d’argent combat le Fléau avant la création de la Croisade d’argent." },
    { page:"Scarlet Crusade", answer:"La Croisade écarlate", options:["La Croisade écarlate","L’Aube d’argent","Les Écarlates renégats","La Main d’argent"], prompt:"Quelle faction fanatique reconnais-tu ?", fact:"La Croisade écarlate traque les morts-vivants tout en sombrant dans le fanatisme." },
    { page:"Steamwheedle Cartel", answer:"Le cartel Gentepression", options:["Le cartel Gentepression","Le cartel Baille-Fonds","La KapitalRisk","Les Corsandre"], prompt:"Quel cartel gobelin reconnais-tu ?", fact:"Le cartel Gentepression contrôle notamment Gadgetzan et Baie-du-Butin." },
    { page:"Shado-Pan", answer:"Les Pandashan", options:["Les Pandashan","Les Astres vénérables","Le Lotus doré","Les Klaxxi"], prompt:"Quelle organisation pandarène reconnais-tu ?", fact:"Les Pandashan protègent la Pandarie contre les menaces qui sommeillent derrière la Muraille." }
  ],
  "ZOOM": [
    { answer:"Orgrimmar", options:["Orgrimmar","Pitons-du-Tonnerre","Grom’gol","Garadar"], prompt:"Reconnais la capitale avant la fin du dézoom.", image:"https://media.guildsofwow.com/library-images/967649/1080/orgrimmar.jpg", source:"https://guildsofwow.com/gameofcrohns/post/4742/guild-meeting-05th-march-2022", fact:"Les remparts rouges et les pointes métalliques trahissent Orgrimmar.", fallback:"DÉTAIL ORC" },
    { answer:"Bastion", options:["Bastion","Sylvarden","Maldraxxus","Revendreth"], prompt:"Reconnais le royaume avant la fin du dézoom.", image:"https://i0.wp.com/aggronaut.com/wp-content/uploads/2020/09/World-of-Warcraft-Shadowlands-1280x720-1.jpg?fit=1280%2C720&ssl=1", source:"https://aggronaut.com/2020/09/14/a-main-for-shadowlands/", fact:"La lumière dorée et l’architecture kyriane signalent Bastion.", fallback:"DÉTAIL KYRIAN" },
    { answer:"Les Terres de Feu", options:["Les Terres de Feu","Cœur du Magma","Tréfonds","Bastion du Crépuscule"], prompt:"Reconnais le raid avant la fin du dézoom.", image:"https://www.buffed.de/screenshots/1280x/2011/06/WoW_Patch_42_Sturm_auf_die_Feuerlande_Trailer_017.jpg", source:"https://www.buffed.de/World-of-Warcraft-Spiel-42971/Guides/WoW-Raid-Guide-Feuerlande-Ragnaros-Feuerlande-Live-Stand-831514/2/", fact:"La lave omniprésente appartient au domaine élémentaire de Ragnaros.", fallback:"DÉTAIL EN FUSION" },
    { answer:"Boralus", options:["Boralus","Hurlevent","Baie-du-Butin","Port-Liberté"], prompt:"Reconnais la ville avant la fin du dézoom.", image:"https://bnetcmsus-a.akamaihd.net/cms/blog_thumbnail/37/377KJKV4EED61597854578057.jpg", source:"https://worldofwarcraft.blizzard.com/pt-br/news/23492553/balance-ao-sabor-das-mar%C3%A9s-da-m%C3%BAsica-de-battle-for-azeroth", fact:"Les quais fortifiés et l’architecture de Kul Tiras indiquent Boralus.", fallback:"DÉTAIL PORTUAIRE" }
  ],
  "CONNEXION": [
    { answer:"Maître et élève", options:["Maître et élève","Père et fils","Frères d’armes","Rivaux politiques"], prompt:"Quel lien unit Uther et Arthas ?", fact:"Uther forme Arthas à la voie du paladin avant leur rupture à Stratholme." },
    { answer:"Père et fille", options:["Père et fille","Frère et sœur","Maître et élève","Chef et générale"], prompt:"Quel lien unit Daelin et Jaina Portvaillant ?", fact:"Jaina est la fille de l’amiral Daelin Portvaillant." },
    { answer:"Sœurs", options:["Sœurs","Mère et fille","Aspect et consort","Aucun lien familial"], prompt:"Quel lien unit Alexstrasza et Ysera ?", fact:"Alexstrasza et Ysera sont sœurs et deviennent toutes deux des Aspects draconiques." },
    { answer:"Père et fille", options:["Père et fille","Oncle et nièce","Frère et sœur","Roi et générale"], prompt:"Quel lien unit Bolvar et Taelia Fordragon ?", fact:"Taelia est la fille de Bolvar Fordragon." }
  ],
  "EXTENSION": [
    { answer:"Wrath of the Lich King", options:["Wrath of the Lich King","The Burning Crusade","Cataclysm","Legion"], prompt:"Dans quelle extension découvre-t-on le Norfendre ?", fact:"Le Norfendre est le continent principal de Wrath of the Lich King." },
    { answer:"Shadowlands", options:["Shadowlands","Battle for Azeroth","Dragonflight","Legion"], prompt:"Dans quelle extension Oribos sert-elle de capitale centrale ?", fact:"Oribos est le carrefour des royaumes de l’Ombreterre dans Shadowlands." },
    { answer:"Warlords of Draenor", options:["Warlords of Draenor","The Burning Crusade","Mists of Pandaria","Legion"], prompt:"Dans quelle extension explore-t-on le Draenor alternatif ?", fact:"Warlords of Draenor se déroule sur une version alternative de Draenor." },
    { answer:"The War Within", options:["The War Within","Dragonflight","Midnight","Battle for Azeroth"], prompt:"Dans quelle extension Khaz Algar devient-elle le continent principal ?", fact:"Khaz Algar est le cadre principal de The War Within." }
  ],
  "BESTIAIRE": [
    { answer:"Géant", options:["Géant","Bête","Humanoïde","Élémentaire"], prompt:"À quelle famille appartient un magnataure ?", fact:"Les magnataures sont de gigantesques créatures apparentées aux géants." },
    { answer:"Bête", options:["Bête","Démon","Élémentaire","Dragon"], prompt:"À quelle famille appartient un chien du magma ?", fact:"Les chiens du magma sont classés parmi les bêtes malgré leur lien avec les profondeurs volcaniques." },
    { answer:"Démon", options:["Démon","Mort-vivant","Aberration","Humanoïde"], prompt:"À quelle famille appartient un nathrezim ?", fact:"Les nathrezim, aussi appelés seigneurs de l’effroi, sont des démons manipulateurs." },
    { answer:"Mort-vivant", options:["Mort-vivant","Humanoïde","Bête","Aberration"], prompt:"À quelle famille appartient une goule du Fléau ?", fact:"Les goules sont des morts-vivants relevés par la nécromancie du Fléau." }
  ],
  "ERREUR LORE": [
    { subject:"Arthas Menethil", page:"Arthas Menethil", answer:"Arthas a été formé par Tirion Fordring.", options:["Arthas a été formé par Tirion Fordring.","Arthas est le fils de Terenas Menethil II.","Il fut prince de Lordaeron.","Il a brandi Deuillegivre."], prompt:"Arthas : quelle affirmation est fausse ?", fact:"Le mentor d’Arthas était Uther le Porteur de Lumière, pas Tirion Fordring.", fallback:"ARTHAS" },
    { subject:"Tyrande Murmevent", page:"Tyrande Whisperwind", answer:"Tyrande dirige le Vol draconique vert.", options:["Tyrande dirige le Vol draconique vert.","Elle est grande prêtresse d’Élune.","Elle dirige les Kaldorei.","Elle partage sa vie avec Malfurion."], prompt:"Tyrande : quelle affirmation est fausse ?", fact:"Tyrande dirige les Kaldorei ; le Vol vert est lié à Ysera puis Merithra.", fallback:"TYRANDE" },
    { subject:"Garrosh Hurlenfer", page:"Garrosh Hellscream", answer:"Garrosh est le fils de Durotan.", options:["Garrosh est le fils de Durotan.","Garrosh a été chef de guerre.","Il est le fils de Grommash.","Il est le boss final du siège d’Orgrimmar."], prompt:"Garrosh : quelle affirmation est fausse ?", fact:"Garrosh est le fils de Grommash Hurlenfer ; Thrall est le fils de Durotan.", fallback:"GARROSH" },
    { subject:"Ysera", page:"Ysera", answer:"Ysera dirige le Vol draconique rouge.", options:["Ysera dirige le Vol draconique rouge.","Elle est liée au Rêve d’Émeraude.","Elle est la sœur d’Alexstrasza.","Elle meurt pendant Legion."], prompt:"Ysera : quelle affirmation est fausse ?", fact:"Ysera dirigeait le Vol vert ; Alexstrasza dirige le Vol rouge.", fallback:"YSERA" },
    { subject:"Khadgar", page:"Khadgar", answer:"Khadgar était l’apprenti d’Antonidas.", options:["Khadgar était l’apprenti d’Antonidas.","Khadgar a étudié à Karazhan.","Son maître était Medivh.","Il a rejoint les Fils de Lothar."], prompt:"Khadgar : quelle affirmation est fausse ?", fact:"Khadgar était l’apprenti de Medivh à Karazhan.", fallback:"KHADGAR" },
    { subject:"Gul’dan", page:"Gul'dan", answer:"Gul’dan était un chaman draeneï.", options:["Gul’dan était un chaman draeneï.","Gul’dan était un orc.","Il a fondé le Conseil des Ombres.","Il a servi Kil’jaeden."], prompt:"Gul’dan : quelle affirmation est fausse ?", fact:"Gul’dan était un orc devenu démoniste, pas un chaman draeneï.", fallback:"GUL’DAN" }
  ],
  "STATUT": [
    { answer:"Mort", options:["Mort","Vivant","Emprisonné","Porté disparu"], prompt:"Quel est le statut de Garrosh Hurlenfer après Shadowlands ?", fact:"Thrall détruit définitivement l’âme de Garrosh dans l’Ombreterre." },
    { answer:"Mort", options:["Mort","Vivant","Ressuscité par le Fléau","Prisonnier du Néant"], prompt:"Quel est le statut de Kael’thas Haut-Soleil ?", fact:"Kael’thas meurt à la terrasse des Magistères ; son âme apparaît ensuite en Revendreth." },
    { answer:"Mort", options:["Mort","Vivant","Chef de guerre actuel","Prisonnier à Orgrimmar"], prompt:"Quel est le statut de Varok Saurcroc après Battle for Azeroth ?", fact:"Varok Saurcroc meurt lors de son mak’gora contre Sylvanas devant Orgrimmar." },
    { answer:"Mort", options:["Mort","Vivant","Prisonnier au Néant","Chef du Conseil des Ombres"], prompt:"Quel est le statut du Gul’dan de la chronologie principale ?", fact:"Le Gul’dan originel meurt dans la Tombe de Sargeras avant les événements de World of Warcraft." }
  ],
  "CARTE EXPRESS": [
    { answer:"Les Maleterres de l’Est", options:["Les Maleterres de l’Est","Les Clairières de Tirisfal","Les Hinterlands","Les Maleterres de l’Ouest"], prompt:"Dans quelle région se trouve Stratholme ?", fact:"Stratholme se trouve au nord des Maleterres de l’Est." },
    { answer:"Les Paluns", options:["Les Paluns","Dun Morogh","Loch Modan","Les Hautes-terres Arathies"], prompt:"Dans quelle région se trouve le port de Menethil ?", fact:"Le port de Menethil se trouve sur la côte ouest des Paluns." },
    { answer:"Entre la Gorge des Vents brûlants et les Steppes Ardentes", options:["Entre la Gorge des Vents brûlants et les Steppes Ardentes","Entre Dun Morogh et les Paluns","Entre Duskwood et le Défilé de Deuillevent","Entre les Maleterres et les Hinterlands"], prompt:"Où se situe le mont Rochenoire ?", fact:"Le mont Rochenoire relie la Gorge des Vents brûlants aux Steppes Ardentes." },
    { answer:"Au sud-ouest de Lordaeron", options:["Au sud-ouest de Lordaeron","Au nord de Quel’Thalas","À l’est des Maleterres","Au sud de Strangleronce"], prompt:"Où se situe la péninsule de Gilnéas ?", fact:"Gilnéas occupe la péninsule située au sud-ouest de Lordaeron." }
  ]
};

Object.entries(REPLAYABILITY_PACK).forEach(([type,questions]) => {
  const step = EXTRA_RUN_STEPS.find(entry => entry.type === type);
  if (step) step.questions.push(...questions);
});

const EARLY_EXPANSIONS_PACK = {
  "QUI A DIT ÇA": [
    { answer:"Illidan Hurlorage", options:["Illidan Hurlorage","Akama","Kael’thas Haut-Soleil","Maiev Chantelombre"], prompt:"Quel boss de The Burning Crusade prononce cette réplique ?", audio:"https://wow.zamimg.com/sound-ids/live/enus/51/552499/BLACK_Illidan_01.ogg", source:"https://www.wowhead.com/npc=22917/illidan-stormrage", fact:"Illidan attend les joueurs au sommet du Temple noir.", fallback:"ARCHIVE TBC" },
    { answer:"Kael’thas Haut-Soleil", options:["Kael’thas Haut-Soleil","Lor’themar Theron","Prince Malchezaar","Illidan Hurlorage"], prompt:"À quel prince elfe de sang appartient cette voix ?", audio:"https://wow.zamimg.com/sound-ids/live/enus/197/558277/TEMPEST_Kael_Intro01.ogg", source:"https://www.wowhead.com/npc=19622/kaelthas-sunstrider", fact:"Kael’thas affronte les joueurs dans l’Œil du Donjon de la Tempête.", fallback:"ARCHIVE TBC" },
    { answer:"Dame Vashj", options:["Dame Vashj","Reine Azshara","Tyrande Murmevent","Maiev Chantelombre"], prompt:"Quelle naga prononce cette réplique ?", audio:"https://wow.zamimg.com/sound-ids/live/enus/146/553618/COIL_LadyVashj_Intro01.ogg", source:"https://www.wowhead.com/npc=21212/lady-vashj", fact:"Dame Vashj commande le sanctuaire du Serpent dans la Glissecroc.", fallback:"ARCHIVE TBC" },
    { answer:"Professeur Putricide", options:["Professeur Putricide","Pulentraille","Trognepus","Seigneur Gargamoelle"], prompt:"Quel savant de la Citadelle entends-tu ?", audio:"https://wow.zamimg.com/sound-ids/live/enus/78/558414/IC_Putricide_Aggro01.ogg", source:"https://www.wowhead.com/npc=36678/professor-putricide", fact:"Putricide dirige les expériences de l’aile de la Peste à la Citadelle de la Couronne de glace.", fallback:"ARCHIVE WOTLK" },
    { answer:"Yogg-Saron", options:["Yogg-Saron","C’Thun","N’Zoth","Y’Shaarj"], prompt:"Quel Dieu très ancien murmure ici ?", audio:"https://wow.zamimg.com/sound-ids/live/enus/130/564866/UR_YoggSaron_PhaseTwo01.ogg", source:"https://www.wowhead.com/npc=33288/yogg-saron", fact:"Yogg-Saron est emprisonné sous Ulduar.", fallback:"ARCHIVE WOTLK" },
    { answer:"Algalon l’Observateur", options:["Algalon l’Observateur","Loken","Mimiron","Thorim"], prompt:"Quel envoyé des Titans prononce cette réplique ?", audio:"https://wow.zamimg.com/sound-ids/live/enus/98/543586/UR_Algalon_Aggro01.ogg", source:"https://www.wowhead.com/npc=32871/algalon-the-observer", fact:"Algalon vient évaluer Azeroth après la chute de Loken.", fallback:"ARCHIVE WOTLK" },
    { answer:"Sindragosa", options:["Sindragosa","Saphiron","Lana’thel","Alexstrasza"], prompt:"Quel dragon de givre entends-tu ?", audio:"https://wow.zamimg.com/sound-ids/live/enus/199/560327/IC_Sindragosa_Aggro01.ogg", source:"https://www.wowhead.com/npc=36853/sindragosa", fact:"Sindragosa garde l’une des ailes supérieures de la Citadelle de la Couronne de glace.", fallback:"ARCHIVE WOTLK" },
    { answer:"Ragnaros", options:["Ragnaros","Al’Akir","Therazane","Majordomo Fandral Forteramure"], prompt:"Quel Seigneur élémentaire prononce cette réplique ?", audio:"https://wow.zamimg.com/sound-ids/live/enus/214/558806/VO_FL_RAGNAROS_AGGRO.ogg", source:"https://www.wowhead.com/npc=52409/ragnaros", fact:"Ragnaros revient dans les Terres de Feu pendant Cataclysm.", fallback:"ARCHIVE CATA" },
    { answer:"Cho’gall", options:["Cho’gall","Halfus Brise-Wyrm","Gruul","Theralion"], prompt:"Quel chef du Marteau du crépuscule entends-tu ?", audio:"https://wow.zamimg.com/sound-ids/live/enus/100/546148/VO_BT_Chogall_BotEvent01.ogg", source:"https://www.wowhead.com/npc=43324/chogall", fact:"Cho’gall règne au sommet du Bastion du Crépuscule.", fallback:"ARCHIVE CATA" },
    { answer:"Ultraxion", options:["Ultraxion","Morchok","Aile de mort","Nefarian"], prompt:"Quel dragon du Crépuscule prononce cette réplique ?", audio:"https://wow.zamimg.com/sound-ids/live/enus/42/572970/VO_DS_ULTRAXION_AGGRO_01.ogg", source:"https://www.wowhead.com/npc=55294/ultraxion", fact:"Ultraxion attaque le temple du Repos du ver dans l’Âme des dragons.", fallback:"ARCHIVE CATA" },
    { answer:"Ozruk", options:["Ozruk","Peau-de-Pierre","Corborus","Grande prêtresse Azil"], prompt:"Quel gardien de pierre entends-tu ?", audio:"https://wow.zamimg.com/sound-ids/live/enus/171/557995/VO_SC_Ozruk_Event03.ogg", source:"https://www.wowhead.com/npc=42188/ozruk", fact:"Ozruk protège le Cœur-de-Pierre dans le Tréfonds.", fallback:"ARCHIVE CATA" }
  ],
  "LOOT": [
    { answer:"Gruul le Tue-dragon", options:["Gruul le Tue-dragon","Magtheridon","Prince Malchezaar","Le Saccageur du Vide"], prompt:"Quel boss peut lâcher le Trophée de l’Échine de dragon ?", fact:"Ce bijou très recherché provient de Gruul dans son repaire." },
    { answer:"Leotheras l’Aveugle", options:["Leotheras l’Aveugle","Dame Vashj","Hydross l’Instable","Karathress"], prompt:"Quel boss est associé au Talisman du tsunami ?", fact:"Le Talisman du tsunami tombe sur Leotheras dans le sanctuaire du Serpent." },
    { answer:"Illidan Hurlorage", options:["Illidan Hurlorage","Archimonde","Kael’thas Haut-Soleil","Dame Vashj"], prompt:"Quel boss peut lâcher la Folie du traître ?", fact:"La Folie du traître appartient à la table de butin d’Illidan au Temple noir." },
    { answer:"Porte-mort Saurcroc", options:["Porte-mort Saurcroc","Professeur Putricide","Seigneur Gargamoelle","Le Roi-Liche"], prompt:"Quel boss peut lâcher la Volonté du Porte-mort ?", fact:"Ce bijou emblématique provient de Porte-mort Saurcroc à la Citadelle." },
    { answer:"Ulduar", options:["Ulduar","Naxxramas","L’Épreuve du croisé","La Citadelle de la Couronne de glace"], prompt:"Dans quel raid récupère-t-on les fragments de Val’anyr ?", fact:"Les fragments nécessaires à Val’anyr tombent sur les boss d’Ulduar." },
    { answer:"Algalon l’Observateur", options:["Algalon l’Observateur","Yogg-Saron","Mimiron","Général Vezax"], prompt:"Quel boss peut lâcher la Comète ?", fact:"La Comète est un bijou très rare obtenu sur Algalon à Ulduar." },
    { answer:"La Folie d’Aile de mort", options:["La Folie d’Aile de mort","Ultraxion","Morchok","Échine d’Aile de mort"], prompt:"Quel combat peut lâcher Gurthalak, la Voix des profondeurs ?", fact:"Gurthalak fait partie du butin de la Folie d’Aile de mort." },
    { answer:"Ragnaros", options:["Ragnaros","Alysrazor","Baleroc","Majordomo Forteramure"], prompt:"Quel boss peut lâcher l’Œuf fumant de Millagazor ?", fact:"La monture rare des Terres de Feu tombe sur Ragnaros." },
    { answer:"L’Âme des dragons", options:["L’Âme des dragons","Les Terres de Feu","Le Bastion du Crépuscule","Descente de l’Aile noire"], prompt:"Dans quel raid trouve-t-on la Fiole des ombres ?", fact:"La Fiole des ombres est un bijou de l’Âme des dragons." }
  ],
  "EXTENSION": [
    { answer:"The Burning Crusade", options:["The Burning Crusade","Wrath of the Lich King","Cataclysm","Classic"], prompt:"Dans quelle extension les Elfes de sang et les Draeneï deviennent-ils jouables ?", fact:"Ces deux peuples rejoignent le jeu avec The Burning Crusade." },
    { answer:"The Burning Crusade", options:["The Burning Crusade","Wrath of the Lich King","Cataclysm","Mists of Pandaria"], prompt:"Dans quelle extension les joueurs découvrent-ils l’Outreterre ?", fact:"La Porte des ténèbres mène en Outreterre dans The Burning Crusade." },
    { answer:"The Burning Crusade", options:["The Burning Crusade","Wrath of the Lich King","Cataclysm","Legion"], prompt:"Dans quelle extension les arènes cotées apparaissent-elles ?", fact:"Le système d’arènes est introduit avec The Burning Crusade." },
    { answer:"Wrath of the Lich King", options:["Wrath of the Lich King","The Burning Crusade","Cataclysm","Mists of Pandaria"], prompt:"Dans quelle extension le chevalier de la mort devient-il jouable ?", fact:"Le chevalier de la mort est la classe héroïque introduite avec Wrath." },
    { answer:"Wrath of the Lich King", options:["Wrath of the Lich King","Cataclysm","Classic","Legion"], prompt:"Dans quelle extension découvre-t-on Joug-d’Hiver ?", fact:"Joug-d’Hiver est la grande zone JcJ extérieure du Norfendre." },
    { answer:"Wrath of the Lich King", options:["Wrath of the Lich King","The Burning Crusade","Cataclysm","Mists of Pandaria"], prompt:"Dans quelle extension apparaît le tournoi d’Argent ?", fact:"Le tournoi d’Argent est ajouté au nord de la Couronne de glace pendant Wrath." },
    { answer:"Cataclysm", options:["Cataclysm","Wrath of the Lich King","Mists of Pandaria","Warlords of Draenor"], prompt:"Dans quelle extension les Worgens et les Gobelins deviennent-ils jouables ?", fact:"Gilnéas et Kezan fournissent les nouvelles races de Cataclysm." },
    { answer:"Cataclysm", options:["Cataclysm","The Burning Crusade","Wrath of the Lich King","Mists of Pandaria"], prompt:"Dans quelle extension l’archéologie est-elle introduite ?", fact:"L’archéologie arrive comme métier secondaire avec Cataclysm." },
    { answer:"Cataclysm", options:["Cataclysm","Wrath of the Lich King","Mists of Pandaria","Legion"], prompt:"Dans quelle extension Kalimdor et les Royaumes de l’Est sont-ils profondément remaniés ?", fact:"Le réveil d’Aile de mort transforme le monde dans Cataclysm." }
  ],
  "BESTIAIRE": [
    { answer:"Machine", options:["Machine","Démon","Élémentaire","Géant"], prompt:"À quelle famille appartient un saccageur gangrené ?", fact:"Le saccageur gangrené est une gigantesque machine de guerre de la Légion." },
    { answer:"Humanoïde", options:["Humanoïde","Bête","Démon","Aberration"], prompt:"À quelle famille appartient un arakkoa ?", fact:"Les arakkoa sont un peuple humanoïde aviaire de Draenor." },
    { answer:"Bête", options:["Bête","Dragon","Élémentaire","Aberration"], prompt:"À quelle famille appartient une raie du Néant ?", fact:"Les raies du Néant sont des bêtes volantes de l’Outreterre." },
    { answer:"Humanoïde", options:["Humanoïde","Mort-vivant","Bête","Aberration"], prompt:"À quelle famille appartient un vrykul vivant ?", fact:"Les vrykuls sont des humanoïdes géants du Norfendre." },
    { answer:"Mort-vivant", options:["Mort-vivant","Dragon","Bête","Élémentaire"], prompt:"À quelle famille appartient une wyrm de givre du Fléau ?", fact:"Une wyrm de givre est le squelette relevé d’un dragon." },
    { answer:"Humanoïde", options:["Humanoïde","Bête","Mort-vivant","Démon"], prompt:"À quelle famille appartient un nérubien non-mort-vivant ?", fact:"Les nérubiens sont un peuple humanoïde insectoïde d’Azjol-Nérub." },
    { answer:"Humanoïde", options:["Humanoïde","Bête","Élémentaire","Dragon"], prompt:"À quelle famille appartient un tol’vir ?", fact:"Les tol’vir sont des constructions titanesques intelligentes classées humanoïdes." },
    { answer:"Humanoïde", options:["Humanoïde","Aberration","Élémentaire","Géant"], prompt:"À quelle famille appartient un trogg de pierre ?", fact:"Les troggs de pierre du Tréfonds sont des humanoïdes liés aux anciennes créations titanesques." },
    { answer:"Dragon", options:["Dragon","Aberration","Élémentaire","Bête"], prompt:"À quelle famille appartient un drake du Crépuscule ?", fact:"Les drakes du Crépuscule forment un vol draconique créé par les serviteurs d’Aile de mort." }
  ],
  "ERREUR LORE": [
    { subject:"Kael’thas Haut-Soleil", page:"Kael'thas Sunstrider", answer:"Kael’thas était le roi de Lune-d’Argent.", options:["Kael’thas était le roi de Lune-d’Argent.","Il était le fils d’Anastérien.","Il a rejoint Illidan en Outreterre.","Il a dirigé les forces elfes de sang."], prompt:"Kael’thas : quelle affirmation est fausse ?", fact:"Kael’thas porte le titre de prince ; son père Anastérien fut le dernier roi de Quel’Thalas.", fallback:"KAEL’THAS" },
    { subject:"Dame Vashj", page:"Lady Vashj", answer:"Dame Vashj servait Jaina Portvaillant.", options:["Dame Vashj servait Jaina Portvaillant.","Elle était une naga.","Elle a servi la reine Azshara.","Elle a rejoint Illidan en Outreterre."], prompt:"Dame Vashj : quelle affirmation est fausse ?", fact:"Vashj a servi Azshara puis Illidan, jamais Jaina.", fallback:"DAME VASHJ" },
    { subject:"Tirion Fordring", page:"Tirion Fordring", answer:"Tirion est devenu le nouveau Roi-Liche.", options:["Tirion est devenu le nouveau Roi-Liche.","Il a dirigé la Croisade d’argent.","Il a manié Porte-Cendres.","Il a brisé Deuillegivre avec Porte-Cendres."], prompt:"Tirion : quelle affirmation est fausse ?", fact:"Bolvar Fordragon prend la couronne du Roi-Liche après la chute d’Arthas.", fallback:"TIRION" },
    { subject:"Bolvar Fordragon", page:"Bolvar Fordragon", answer:"Bolvar était le roi héréditaire de Hurlevent.", options:["Bolvar était le roi héréditaire de Hurlevent.","Il a été brûlé par les flammes draconiques.","Il a porté le Heaume de domination.","Il est le père de Taelia."], prompt:"Bolvar : quelle affirmation est fausse ?", fact:"Bolvar fut régent de Hurlevent, pas son roi héréditaire.", fallback:"BOLVAR" },
    { subject:"Cho’gall", page:"Cho'gall", answer:"Cho’gall était un chef ogre à une seule tête.", options:["Cho’gall était un chef ogre à une seule tête.","Il a dirigé le clan Marteau-du-Crépuscule.","Il a servi les Dieux très anciens.","Il est affronté au Bastion du Crépuscule."], prompt:"Cho’gall : quelle affirmation est fausse ?", fact:"Cho’gall est l’ogre-mage à deux têtes le plus célèbre d’Azeroth.", fallback:"CHO’GALL" },
    { subject:"Thrall", page:"Thrall", answer:"Thrall reste chef de guerre pendant tout Cataclysm.", options:["Thrall reste chef de guerre pendant tout Cataclysm.","Il rejoint le Cercle terrestre.","Il aide les Aspects contre Aile de mort.","Garrosh lui succède à la tête de la Horde."], prompt:"Thrall pendant Cataclysm : quelle affirmation est fausse ?", fact:"Thrall abandonne son rôle de chef de guerre à Garrosh pour aider le Cercle terrestre.", fallback:"THRALL" }
  ],
  "CARTE EXPRESS": [
    { answer:"La péninsule des Flammes infernales", options:["La péninsule des Flammes infernales","Nagrand","Raz-de-Néant","Marécage de Zangar"], prompt:"Dans quelle zone d’Outreterre débouche la Porte des ténèbres ?", fact:"Le portail d’Azeroth s’ouvre sur la péninsule des Flammes infernales." },
    { answer:"La forêt de Terokkar", options:["La forêt de Terokkar","Nagrand","Vallée d’Ombrelune","Raz-de-Néant"], prompt:"Dans quelle région d’Outreterre se trouve Shattrath ?", fact:"Shattrath est située au nord-ouest de la forêt de Terokkar." },
    { answer:"La vallée d’Ombrelune", options:["La vallée d’Ombrelune","Raz-de-Néant","Les Tranchantes","Nagrand"], prompt:"Dans quelle zone d’Outreterre se trouve le Temple noir ?", fact:"Le Temple noir domine l’est de la vallée d’Ombrelune." },
    { answer:"La forêt du Chant de cristal", options:["La forêt du Chant de cristal","La Désolation des dragons","La Couronne de glace","Zul’Drak"], prompt:"Au-dessus de quelle zone flotte Dalaran pendant Wrath ?", fact:"Dalaran flotte au-dessus de la forêt du Chant de cristal." },
    { answer:"La Couronne de glace", options:["La Couronne de glace","Les pics Foudroyés","Zul’Drak","La Désolation des dragons"], prompt:"Dans quelle zone se trouve la Citadelle du Roi-Liche ?", fact:"La Citadelle de la Couronne de glace domine l’ouest du Norfendre." },
    { answer:"Les pics Foudroyés", options:["Les pics Foudroyés","La Toundra Boréenne","Le bassin de Sholazar","Les Grisonnes"], prompt:"Dans quelle région se trouve Ulduar ?", fact:"Ulduar est creusée dans les pics Foudroyés." },
    { answer:"Vashj’ir", options:["Vashj’ir","Uldum","Le Tréfonds","Les hautes-terres du Crépuscule"], prompt:"Quelle zone de Cataclysm est presque entièrement sous-marine ?", fact:"Vashj’ir est un vaste royaume englouti au large des Royaumes de l’Est." },
    { answer:"Le Tréfonds", options:["Le Tréfonds","Uldum","Hyjal","Tol Barad"], prompt:"Quelle zone se rejoint par le Maelström pendant Cataclysm ?", fact:"Le Maelström ouvre la voie vers le plan élémentaire de la terre : le Tréfonds." },
    { answer:"Les hautes-terres du Crépuscule", options:["Les hautes-terres du Crépuscule","Les terres Ingrates","Le Tréfonds","Le mont Hyjal"], prompt:"Quelle zone de Cataclysm se trouve au nord des Paluns ?", fact:"Les hautes-terres du Crépuscule occupent la côte à l’est des Hinterlands et au nord des Paluns." }
  ]
};

Object.entries(EARLY_EXPANSIONS_PACK).forEach(([type,questions]) => {
  const step = EXTRA_RUN_STEPS.find(entry => entry.type === type);
  if (step) step.questions.push(...questions);
});
