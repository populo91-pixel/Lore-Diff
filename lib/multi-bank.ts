import { allQuestions } from "@/app/quiz/quiz-data";

export type MultiQuestion = {
  id: string;
  type: string;
  era: string;
  universe?: "wow" | "pokemon" | "dofus" | "runeterra";
  prompt: string;
  options: [string, string, string, string];
  correctIndex: number;
  fact: string;
  audio?: string;
  image?: string;
  imageMode?: "cover" | "silhouette" | "zoom";
};

export type MultiMode = "mega" | "wow" | "pokemon" | "dofus" | "runeterra";

const ROOM_MODE_BASE = 1_000_000_000_000;
const ROOM_MODES: MultiMode[] = ["mega","wow","pokemon","dofus","runeterra"];

export function isMultiMode(value: unknown): value is MultiMode {
  return typeof value === "string" && ROOM_MODES.includes(value as MultiMode);
}

export function encodeRoomSeed(mode: MultiMode, randomSeed: number) {
  return ROOM_MODES.indexOf(mode) * ROOM_MODE_BASE + Math.abs(Math.trunc(randomSeed)) % ROOM_MODE_BASE;
}

export function decodeRoomMode(seed: number): MultiMode {
  return ROOM_MODES[Math.floor(Math.max(0,seed) / ROOM_MODE_BASE)] || "mega";
}

export function questionCountForMode(mode: MultiMode) {
  return mode === "pokemon" || mode === "dofus" ? 15 : 20;
}

function decodeRandomSeed(seed: number) {
  return Math.max(0,seed) % ROOM_MODE_BASE;
}

export const MULTI_QUESTIONS: MultiQuestion[] = [
  { id:"classic-01", type:"LORE", era:"CLASSIC", prompt:"Quel dragon noir se cache derrière l’identité du seigneur Victor Nefarius ?", options:["Nefarian","Onyxia","Aile de mort","Vaelastrasz"], correctIndex:0, fact:"Nefarian prend l’apparence de Victor Nefarius au sommet du pic Rochenoire." },
  { id:"classic-02", type:"LORE", era:"CLASSIC", prompt:"Quel nécromancien dirige Naxxramas à l’époque classique ?", options:["Kel’Thuzad","Ras Murmegivre","Baron Vaillefendre","Gothik le Moissonneur"], correctIndex:0, fact:"Kel’Thuzad commande Naxxramas au nom du Roi-Liche." },
  { id:"classic-03", type:"INSTANCE", era:"CLASSIC", prompt:"Dans quel raid classique affronte-t-on C’Thun ?", options:["Temple d’Ahn’Qiraj","Ruines d’Ahn’Qiraj","Cœur du Magma","Repaire de l’Aile noire"], correctIndex:0, fact:"C’Thun attend les joueurs au cœur du Temple d’Ahn’Qiraj." },
  { id:"classic-04", type:"INSTANCE", era:"CLASSIC", prompt:"Quel boss conclut le Repaire de l’Aile noire ?", options:["Nefarian","Chromaggus","Vaelastrasz","Tranchétripe"], correctIndex:0, fact:"Nefarian est la dernière rencontre du Repaire de l’Aile noire." },
  { id:"classic-05", type:"LOOT", era:"CLASSIC", prompt:"Quel boss détient l’Œil de Sulfuras ?", options:["Ragnaros","Garr","Golemagg","Majordomo Executus"], correctIndex:0, fact:"L’Œil de Sulfuras tombe sur Ragnaros et sert à créer Sulfuras." },
  { id:"classic-06", type:"LOOT", era:"CLASSIC", prompt:"Dans quel donjon obtient-on historiquement le Destrier de la mort ?", options:["Stratholme","Scholomance","Ombrecroc","Hache-Tripes"], correctIndex:0, fact:"La monture est associée au baron Vaillefendre dans Stratholme." },
  { id:"classic-07", type:"GÉO", era:"CLASSIC", prompt:"Dans quelle région se trouvent les Mortemines ?", options:["Marche de l’Ouest","Bois de la Pénombre","Forêt d’Elwynn","Les Carmines"], correctIndex:0, fact:"L’entrée des Mortemines se trouve à Ruisselune, dans la marche de l’Ouest." },
  { id:"classic-08", type:"GÉO", era:"CLASSIC", prompt:"Quelle zone relie la Horde à l’entrée d’Orgrimmar ?", options:["Durotar","Les Tarides","Azshara","Mulgore"], correctIndex:0, fact:"Orgrimmar est bâtie au nord de Durotar." },
  { id:"classic-09", type:"FACTION", era:"CLASSIC", prompt:"Qui dirige la Confrérie défias dans les Mortemines ?", options:["Edwin VanCleef","Genn Grisetête","Mathias Shaw","Benedictus"], correctIndex:0, fact:"Edwin VanCleef transforme les artisans spoliés de Hurlevent en Confrérie défias." },
  { id:"classic-10", type:"BESTIAIRE", era:"CLASSIC", prompt:"À quelle famille appartient un élémentaire de lave du Cœur du Magma ?", options:["Élémentaire","Démon","Géant","Aberration"], correctIndex:0, fact:"Les créatures de lave du Cœur du Magma sont des élémentaires de feu." },
  { id:"classic-11", type:"CONNEXION", era:"CLASSIC", prompt:"Quel lien unit Onyxia et Nefarian ?", options:["Ils sont frère et sœur","Ils sont père et fille","Ils sont rivaux sans lien","Ils sont maître et serviteur"], correctIndex:0, fact:"Onyxia et Nefarian sont les enfants d’Aile de mort." },
  { id:"classic-12", type:"CHRONO", era:"CLASSIC", prompt:"Quel raid classique est sorti avant Ahn’Qiraj ?", options:["Repaire de l’Aile noire","Naxxramas","Karazhan","Caverne du sanctuaire"], correctIndex:0, fact:"Le Repaire de l’Aile noire précède l’ouverture des portes d’Ahn’Qiraj." },
  { id:"classic-13", type:"ERREUR LORE", era:"CLASSIC", prompt:"Quelle affirmation sur Ragnaros est fausse ?", options:["Il dirige le Vol noir","Il est le Seigneur du Feu","Il règne sur les Terres de Feu","Il est invoqué au Cœur du Magma"], correctIndex:0, fact:"Ragnaros est un seigneur élémentaire ; Aile de mort dirige le Vol noir." },
  { id:"classic-14", type:"INTRUS", era:"CLASSIC", prompt:"Lequel n’est pas un boss du Cœur du Magma ?", options:["Nefarian","Garr","Gehennas","Golemagg"], correctIndex:0, fact:"Nefarian est le boss final du Repaire de l’Aile noire." },

  { id:"tbc-01", type:"LORE", era:"TBC", prompt:"Quel seigneur des abîmes est emprisonné sous la Citadelle des Flammes infernales ?", options:["Magtheridon","Mannoroth","Gruul","Kazzak"], correctIndex:0, fact:"Illidan renverse Magtheridon puis le fait emprisonner sous la citadelle." },
  { id:"tbc-02", type:"LORE", era:"TBC", prompt:"Qui s’empare du Donjon de la Tempête en Outreterre ?", options:["Kael’thas Haut-Soleil","Lor’themar Theron","Akama","Dame Vashj"], correctIndex:0, fact:"Kael’thas et ses partisans occupent la forteresse naaru." },
  { id:"tbc-03", type:"LORE", era:"TBC", prompt:"Quel démon tente d’entrer en Azeroth par le Puits de soleil ?", options:["Kil’jaeden","Archimonde","Sargeras","Magtheridon"], correctIndex:0, fact:"Kil’jaeden est invoqué au plateau du Puits de soleil puis repoussé." },
  { id:"tbc-04", type:"INSTANCE", era:"TBC", prompt:"Quel raid est dirigé par Dame Vashj ?", options:["Sanctuaire du Serpent","Caverne du sanctuaire","Temple noir","L’Œil"], correctIndex:0, fact:"Dame Vashj commande le sanctuaire du Serpent dans la Glissecroc." },
  { id:"tbc-05", type:"INSTANCE", era:"TBC", prompt:"Dans quelle zone d’Outreterre se trouve le Temple noir ?", options:["Vallée d’Ombrelune","Raz-de-Néant","Nagrand","Forêt de Terokkar"], correctIndex:0, fact:"Le Temple noir domine l’est de la vallée d’Ombrelune." },
  { id:"tbc-06", type:"LOOT", era:"TBC", prompt:"Quel boss peut lâcher le Trophée de l’Échine de dragon ?", options:["Gruul le Tue-dragon","Magtheridon","Prince Malchezaar","Kael’thas"], correctIndex:0, fact:"Ce bijou emblématique provient de Gruul." },
  { id:"tbc-07", type:"LOOT", era:"TBC", prompt:"Qui peut lâcher les Glaives de guerre d’Azzinoth ?", options:["Illidan Hurlorage","Dame Vashj","Archimonde","Kael’thas"], correctIndex:0, fact:"Les deux glaives légendaires tombent sur Illidan au Temple noir." },
  { id:"tbc-08", type:"EXTENSION", era:"TBC", prompt:"Quelles races deviennent jouables avec The Burning Crusade ?", options:["Elfes de sang et Draeneï","Worgens et Gobelins","Pandaren uniquement","Orcs mag’har et Nains sombrefer"], correctIndex:0, fact:"Les Elfes de sang rejoignent la Horde et les Draeneï l’Alliance." },
  { id:"tbc-09", type:"GÉO", era:"TBC", prompt:"Dans quelle région se trouve Shattrath ?", options:["Forêt de Terokkar","Nagrand","Marécage de Zangar","Péninsule des Flammes infernales"], correctIndex:0, fact:"Shattrath est bâtie dans la forêt de Terokkar." },
  { id:"tbc-10", type:"CHRONO", era:"TBC", prompt:"Quel événement de TBC arrive en premier ?", options:["Réouverture de la Porte des ténèbres","Défaite d’Illidan","Assaut du Puits de soleil","Restauration du Puits de soleil"], correctIndex:0, fact:"La réouverture de la Porte lance l’expédition en Outreterre." },
  { id:"tbc-11", type:"QUI A DIT ÇA", era:"TBC", prompt:"À quel boss appartient cette voix ?", options:["Illidan Hurlorage","Akama","Kael’thas Haut-Soleil","Maiev Chantelombre"], correctIndex:0, fact:"Illidan attend les joueurs au sommet du Temple noir.", audio:"https://wow.zamimg.com/sound-ids/live/enus/51/552499/BLACK_Illidan_01.ogg" },
  { id:"tbc-12", type:"QUI A DIT ÇA", era:"TBC", prompt:"À quel prince elfe de sang appartient cette voix ?", options:["Kael’thas Haut-Soleil","Lor’themar Theron","Prince Malchezaar","Illidan Hurlorage"], correctIndex:0, fact:"Kael’thas affronte les joueurs dans l’Œil.", audio:"https://wow.zamimg.com/sound-ids/live/enus/197/558277/TEMPEST_Kael_Intro01.ogg" },
  { id:"tbc-13", type:"CONNEXION", era:"TBC", prompt:"Quel lien unit Malfurion et Illidan Hurlorage ?", options:["Frères jumeaux","Père et fils","Maître et élève","Aucun lien familial"], correctIndex:0, fact:"Malfurion et Illidan sont frères jumeaux." },
  { id:"tbc-14", type:"BESTIAIRE", era:"TBC", prompt:"À quelle famille appartient un saccageur gangrené ?", options:["Machine","Démon","Élémentaire","Géant"], correctIndex:0, fact:"Le saccageur gangrené est une machine de guerre de la Légion." },
  { id:"tbc-15", type:"LORE", era:"TBC", prompt:"Quel naaru est retenu prisonnier à Lune-d’Argent ?", options:["M’uru","A’dal","K’ure","O’ros"], correctIndex:0, fact:"Les chevaliers de sang drainent d’abord la Lumière de M’uru." },
  { id:"tbc-16", type:"INSTANCE", era:"TBC", prompt:"Quel boss conclut Karazhan ?", options:["Prince Malchezaar","Le Conservateur","Dédain-du-Néant","Moroes"], correctIndex:0, fact:"Le prince Malchezaar est la rencontre finale traditionnelle de Karazhan." },
  { id:"tbc-17", type:"GÉO", era:"TBC", prompt:"Quelle zone d’Outreterre abrite le Réservoir de Glissecroc ?", options:["Marécage de Zangar","Nagrand","Forêt de Terokkar","Les Tranchantes"], correctIndex:0, fact:"Le Réservoir de Glissecroc se trouve sous le marécage de Zangar." },
  { id:"tbc-18", type:"FACTION", era:"TBC", prompt:"Quelle faction de Shattrath est menée par Voren’thal ?", options:["Les Clairvoyants","Les Aldor","Le Sha’tar","L’Œil pourpre"], correctIndex:0, fact:"Voren’thal dirige les Clairvoyants depuis leur terrasse à Shattrath." },
  { id:"tbc-19", type:"ERREUR LORE", era:"TBC", prompt:"Quelle affirmation sur Akama est fausse ?", options:["Il est un elfe de sang","Il est un Roué","Il sert d’abord Illidan","Il aide Maiev au Temple noir"], correctIndex:0, fact:"Akama est un draeneï Roué, pas un elfe de sang." },
  { id:"tbc-20", type:"INTRUS", era:"TBC", prompt:"Lequel n’est pas un raid de The Burning Crusade ?", options:["Ulduar","Karazhan","Le Temple noir","Le plateau du Puits de soleil"], correctIndex:0, fact:"Ulduar appartient à Wrath of the Lich King." },

  { id:"wotlk-01", type:"LORE", era:"WOTLK", prompt:"Qui est le père d’Arthas Menethil ?", options:["Terenas Menethil II","Uther","Antonidas","Daelin Portvaillant"], correctIndex:0, fact:"Terenas II est le dernier roi de Lordaeron et le père d’Arthas." },
  { id:"wotlk-02", type:"LORE", era:"WOTLK", prompt:"Qui dirige la Croisade d’argent au Norfendre ?", options:["Tirion Fordring","Darion Mograine","Bolvar Fordragon","Muradin"], correctIndex:0, fact:"Tirion mène l’assaut final contre le Roi-Liche." },
  { id:"wotlk-03", type:"LORE", era:"WOTLK", prompt:"Qui porte le Heaume de domination après Arthas ?", options:["Bolvar Fordragon","Darion Mograine","Tirion Fordring","Sylvanas"], correctIndex:0, fact:"Bolvar devient le nouveau geôlier du Fléau." },
  { id:"wotlk-04", type:"INSTANCE", era:"WOTLK", prompt:"Quel Dieu très ancien est emprisonné sous Ulduar ?", options:["Yogg-Saron","C’Thun","N’Zoth","Y’Shaarj"], correctIndex:0, fact:"Yogg-Saron est le prisonnier central d’Ulduar." },
  { id:"wotlk-05", type:"INSTANCE", era:"WOTLK", prompt:"Quel raid se déroule dans l’arène du tournoi d’Argent ?", options:["Épreuve du croisé","Épreuve du champion","Caveau d’Archavon","Sanctum Rubis"], correctIndex:0, fact:"L’Épreuve du croisé est le raid du tournoi d’Argent." },
  { id:"wotlk-06", type:"LOOT", era:"WOTLK", prompt:"Quel boss peut lâcher la Volonté du Porte-mort ?", options:["Porte-mort Saurcroc","Professeur Putricide","Seigneur Gargamoelle","Le Roi-Liche"], correctIndex:0, fact:"Ce bijou très recherché provient de Porte-mort Saurcroc." },
  { id:"wotlk-07", type:"LOOT", era:"WOTLK", prompt:"Dans quel raid récupère-t-on les fragments de Val’anyr ?", options:["Ulduar","Naxxramas","Épreuve du croisé","Citadelle de la Couronne de glace"], correctIndex:0, fact:"Les fragments de Val’anyr tombent sur les boss d’Ulduar." },
  { id:"wotlk-08", type:"EXTENSION", era:"WOTLK", prompt:"Quelle classe devient jouable avec Wrath of the Lich King ?", options:["Chevalier de la mort","Moine","Chasseur de démons","Évocateur"], correctIndex:0, fact:"Le chevalier de la mort est la première classe héroïque de WoW." },
  { id:"wotlk-09", type:"GÉO", era:"WOTLK", prompt:"Dans quelle région du Norfendre se trouve Ulduar ?", options:["Pics Foudroyés","Zul’Drak","Couronne de glace","Bassin de Sholazar"], correctIndex:0, fact:"Ulduar est creusée dans les pics Foudroyés." },
  { id:"wotlk-10", type:"CHRONO", era:"WOTLK", prompt:"Quel événement de Wrath arrive en premier ?", options:["Bataille du Portail du Courroux","Ouverture d’Ulduar","Tournoi d’Argent","Assaut de la Citadelle"], correctIndex:0, fact:"Le Portail du Courroux appartient à la campagne initiale du Norfendre." },
  { id:"wotlk-11", type:"QUI A DIT ÇA", era:"WOTLK", prompt:"Quel savant de la Citadelle entends-tu ?", options:["Professeur Putricide","Pulentraille","Trognepus","Seigneur Gargamoelle"], correctIndex:0, fact:"Putricide dirige l’aile de la Peste.", audio:"https://wow.zamimg.com/sound-ids/live/enus/78/558414/IC_Putricide_Aggro01.ogg" },
  { id:"wotlk-12", type:"QUI A DIT ÇA", era:"WOTLK", prompt:"Quel Dieu très ancien murmure ici ?", options:["Yogg-Saron","C’Thun","N’Zoth","Y’Shaarj"], correctIndex:0, fact:"Yogg-Saron est emprisonné sous Ulduar.", audio:"https://wow.zamimg.com/sound-ids/live/enus/130/564866/UR_YoggSaron_PhaseTwo01.ogg" },
  { id:"wotlk-13", type:"QUI A DIT ÇA", era:"WOTLK", prompt:"Quel envoyé des Titans prononce cette réplique ?", options:["Algalon l’Observateur","Loken","Mimiron","Thorim"], correctIndex:0, fact:"Algalon vient évaluer Azeroth après la chute de Loken.", audio:"https://wow.zamimg.com/sound-ids/live/enus/98/543586/UR_Algalon_Aggro01.ogg" },
  { id:"wotlk-14", type:"BESTIAIRE", era:"WOTLK", prompt:"À quelle famille appartient une wyrm de givre du Fléau ?", options:["Mort-vivant","Dragon vivant","Bête","Élémentaire"], correctIndex:0, fact:"Une wyrm de givre est le squelette relevé d’un dragon." },
  { id:"wotlk-15", type:"LORE", era:"WOTLK", prompt:"Qui trahit les forces réunies au Portail du Courroux ?", options:["Grand apothicaire Putrescin","Darion Mograine","Tirion Fordring","Garrosh Hurlenfer"], correctIndex:0, fact:"Putrescin déploie la Nouvelle Peste contre le Fléau et les armées vivantes." },
  { id:"wotlk-16", type:"INSTANCE", era:"WOTLK", prompt:"Quel gardien corrompu conclut les Salles de Foudre ?", options:["Loken","Sjonnir","Volkhan","Ionar"], correctIndex:0, fact:"Loken est le dernier boss des Salles de Foudre." },
  { id:"wotlk-17", type:"GÉO", era:"WOTLK", prompt:"Dans quelle zone se trouve le temple du Repos du ver ?", options:["Désolation des dragons","Toundra Boréenne","Grisonnes","Zul’Drak"], correctIndex:0, fact:"Le temple du Repos du ver domine la Désolation des dragons." },
  { id:"wotlk-18", type:"FACTION", era:"WOTLK", prompt:"Quelle faction est fondée par Tirion Fordring contre le Fléau ?", options:["La Croisade d’argent","La Lame d’ébène","Le Concordat argenté","Le Verdict des cendres"], correctIndex:0, fact:"Tirion unit l’Aube d’argent et la Main d’argent au sein de la Croisade d’argent." },
  { id:"wotlk-19", type:"ERREUR LORE", era:"WOTLK", prompt:"Quelle affirmation sur Bolvar est fausse ?", options:["Il tue Arthas en duel","Il survit au Portail du Courroux","Il est brûlé par les dragons rouges","Il devient le geôlier du Fléau"], correctIndex:0, fact:"Tirion et les aventuriers vainquent Arthas ; Bolvar prend ensuite le Heaume." },
  { id:"wotlk-20", type:"INTRUS", era:"WOTLK", prompt:"Lequel n’est pas un raid de Wrath of the Lich King ?", options:["Le Temple noir","Ulduar","Naxxramas","Le sanctum Rubis"], correctIndex:0, fact:"Le Temple noir appartient à The Burning Crusade." },

  { id:"cata-01", type:"LORE", era:"CATA", prompt:"Qui provoque le Cataclysme en surgissant du Tréfonds ?", options:["Aile de mort","Ragnaros","Cho’gall","Al’Akir"], correctIndex:0, fact:"Le retour d’Aile de mort fracture Azeroth." },
  { id:"cata-02", type:"LORE", era:"CATA", prompt:"À qui Thrall confie-t-il la Horde au début de Cataclysm ?", options:["Garrosh Hurlenfer","Vol’jin","Cairne","Varok Saurcroc"], correctIndex:0, fact:"Thrall nomme Garrosh chef de guerre avant de rejoindre le Cercle terrestre." },
  { id:"cata-03", type:"LORE", era:"CATA", prompt:"Quel artefact sert à vaincre définitivement Aile de mort ?", options:["L’Âme des dragons","Porte-Cendres","Deuillegivre","Le Cœur d’Azeroth"], correctIndex:0, fact:"Les Aspects et Thrall canalisent l’Âme des dragons." },
  { id:"cata-04", type:"INSTANCE", era:"CATA", prompt:"Qui dirige la Descente de l’Aile noire ?", options:["Nefarian","Cho’gall","Ragnaros","Sinestra"], correctIndex:0, fact:"Nefarian poursuit ses expériences sous le mont Rochenoire." },
  { id:"cata-05", type:"INSTANCE", era:"CATA", prompt:"Quel raid conclut Cataclysm ?", options:["L’Âme des dragons","Les Terres de Feu","Le Bastion du Crépuscule","Le Trône des quatre vents"], correctIndex:0, fact:"L’Âme des dragons se termine par la chute d’Aile de mort." },
  { id:"cata-06", type:"LOOT", era:"CATA", prompt:"Quel boss peut lâcher l’Œuf fumant de Millagazor ?", options:["Ragnaros","Alysrazor","Baleroc","Majordomo Forteramure"], correctIndex:0, fact:"Cette monture rare tombe sur Ragnaros." },
  { id:"cata-07", type:"LOOT", era:"CATA", prompt:"Quel combat peut lâcher Gurthalak, la Voix des profondeurs ?", options:["Folie d’Aile de mort","Ultraxion","Morchok","Échine d’Aile de mort"], correctIndex:0, fact:"Gurthalak fait partie du butin de la Folie d’Aile de mort." },
  { id:"cata-08", type:"EXTENSION", era:"CATA", prompt:"Quelles races deviennent jouables avec Cataclysm ?", options:["Worgens et Gobelins","Elfes de sang et Draeneï","Pandaren","Sacrenuit et Taurens de Haut-Roc"], correctIndex:0, fact:"Les Worgens rejoignent l’Alliance et les Gobelins la Horde." },
  { id:"cata-09", type:"GÉO", era:"CATA", prompt:"Quelle zone de Cataclysm est presque entièrement sous-marine ?", options:["Vashj’ir","Uldum","Le Tréfonds","Tol Barad"], correctIndex:0, fact:"Vashj’ir est un vaste royaume englouti." },
  { id:"cata-10", type:"CHRONO", era:"CATA", prompt:"Quelle victoire de raid Cataclysm arrive en premier ?", options:["Défaite de Nefarian","Chute de Ragnaros","Assaut de l’Âme des dragons","Défaite d’Aile de mort"], correctIndex:0, fact:"La Descente de l’Aile noire appartient au premier palier." },
  { id:"cata-11", type:"QUI A DIT ÇA", era:"CATA", prompt:"Quel Seigneur élémentaire prononce cette réplique ?", options:["Ragnaros","Al’Akir","Therazane","Neptulon"], correctIndex:0, fact:"Ragnaros revient dans les Terres de Feu.", audio:"https://wow.zamimg.com/sound-ids/live/enus/214/558806/VO_FL_RAGNAROS_AGGRO.ogg" },
  { id:"cata-12", type:"QUI A DIT ÇA", era:"CATA", prompt:"Quel chef du Marteau du crépuscule entends-tu ?", options:["Cho’gall","Halfus Brise-Wyrm","Gruul","Theralion"], correctIndex:0, fact:"Cho’gall règne au sommet du Bastion du Crépuscule.", audio:"https://wow.zamimg.com/sound-ids/live/enus/100/546148/VO_BT_Chogall_BotEvent01.ogg" },
  { id:"cata-13", type:"QUI A DIT ÇA", era:"CATA", prompt:"Quel dragon du Crépuscule prononce cette réplique ?", options:["Ultraxion","Morchok","Aile de mort","Nefarian"], correctIndex:0, fact:"Ultraxion attaque le temple du Repos du ver.", audio:"https://wow.zamimg.com/sound-ids/live/enus/42/572970/VO_DS_ULTRAXION_AGGRO_01.ogg" },
  { id:"cata-14", type:"BESTIAIRE", era:"CATA", prompt:"À quelle famille appartient un drake du Crépuscule ?", options:["Dragon","Aberration","Élémentaire","Bête"], correctIndex:0, fact:"Les drakes du Crépuscule forment un vol créé par les serviteurs d’Aile de mort." },
];

const CROSS_UNIVERSE_QUESTIONS: MultiQuestion[] = allQuestions
  .filter(question => question.universe !== "wow")
  .map((question, index) => ({
    id:`mega-${question.universe}-${index}`,
    type:question.type,
    era:question.universe === "pokemon" ? "KANTO" : question.universe === "dofus" ? "KROSMOZ" : "RUNETERRA",
    universe:question.universe,
    prompt:question.prompt,
    options:question.options,
    correctIndex:question.correct,
    fact:question.fact,
    image:question.image,
    imageMode:question.imageMode,
  }));

function randomFromSeed(seed: number) {
  let value = seed >>> 0;
  return () => {
    value += 0x6d2b79f5;
    let next = value;
    next = Math.imul(next ^ (next >>> 15), next | 1);
    next ^= next + Math.imul(next ^ (next >>> 7), next | 61);
    return ((next ^ (next >>> 14)) >>> 0) / 4294967296;
  };
}

export function questionsForRoom(seed: number, count: number, mode: MultiMode = "mega") {
  const random = randomFromSeed(decodeRandomSeed(seed));
  const shuffle = <T,>(items: T[]) => {
    for (let index = items.length - 1; index > 0; index -= 1) {
      const swap = Math.floor(random() * (index + 1));
      [items[index], items[swap]] = [items[swap], items[index]];
    }
    return items;
  };
  const buckets = {
    wow:shuffle(MULTI_QUESTIONS.map(question => ({ ...question,universe:"wow" as const }))),
    pokemon:shuffle(CROSS_UNIVERSE_QUESTIONS.filter(question => question.universe === "pokemon")),
    dofus:shuffle(CROSS_UNIVERSE_QUESTIONS.filter(question => question.universe === "dofus")),
    runeterra:shuffle(CROSS_UNIVERSE_QUESTIONS.filter(question => question.universe === "runeterra")),
  };
  if (mode !== "mega") {
    return shuffle([...buckets[mode]]).slice(0,count).map(question => {
      const correct = question.options[question.correctIndex];
      const options = [...question.options];
      for (let index = options.length - 1; index > 0; index -= 1) {
        const swap = Math.floor(random() * (index + 1));
        [options[index], options[swap]] = [options[swap], options[index]];
      }
      return { ...question,options:options as [string,string,string,string],correctIndex:options.indexOf(correct) };
    });
  }
  const universeOrder = shuffle(["wow","pokemon","dofus","runeterra"] as const).slice();
  const questions: MultiQuestion[] = [];
  const cursors = { wow:0,pokemon:0,dofus:0,runeterra:0 };
  while (questions.length < count) {
    let added = false;
    for (const universe of universeOrder) {
      const question = buckets[universe][cursors[universe]++];
      if (question) {
        questions.push(question);
        added = true;
        if (questions.length === count) break;
      }
    }
    if (!added) break;
  }
  return questions.map(question => {
    const correct = question.options[question.correctIndex];
    const options = [...question.options];
    for (let index = options.length - 1; index > 0; index -= 1) {
      const swap = Math.floor(random() * (index + 1));
      [options[index], options[swap]] = [options[swap], options[index]];
    }
    return {
      ...question,
      options: options as [string, string, string, string],
      correctIndex: options.indexOf(correct),
    };
  });
}
