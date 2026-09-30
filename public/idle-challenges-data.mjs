// Pokémon types use the current chart; abilities and held items are excluded.
// Cries: https://github.com/PokeAPI/cries (latest), hosted locally with MP3 fallback.
export const species=[
 [16,'Roucool','Normal / Vol',1],[35,'Mélofée','Fée',1],[82,'Magnéton','Électrik / Acier',1],[94,'Ectoplasma','Spectre / Poison',1],[123,'Insécateur','Insecte / Vol',1],
 [241,'Écrémeuh','Normal',2],[309,'Dynavolt','Électrik',3],[310,'Élecsprint','Électrik',3],[323,'Camérupt','Feu / Sol',3],[324,'Chartor','Feu',3],[355,'Skelénox','Spectre',3],
 [387,'Tortipouss','Plante',4],[407,'Roserade','Plante / Poison',4],[408,'Kranidos','Roche',4],[429,'Magirêve','Spectre',4],[448,'Lucario','Combat / Acier',4],
 [71,'Empiflor','Plante / Poison',1],[114,'Saquedeneu','Plante',1],[45,'Rafflesia','Plante / Poison',1],[322,'Chamallot','Feu / Sol',3],[307,'Méditikka','Combat / Psy',3],[67,'Machopeur','Combat',1],[299,'Tarinor','Roche',3],
 [1,'Bulbizarre','Plante / Poison',1],[4,'Salamèche','Feu',1],[7,'Carapuce','Eau',1],[25,'Pikachu','Électrik',1],[39,'Rondoudou','Normal / Fée',1],[54,'Psykokwak','Eau',1],[133,'Évoli','Normal',1],[143,'Ronflex','Normal',1],
 [152,'Germignon','Plante',2],[155,'Héricendre','Feu',2],[158,'Kaiminus','Eau',2],[179,'Wattouat','Électrik',2],[196,'Mentali','Psy',2],[197,'Noctali','Ténèbres',2],[252,'Arcko','Plante',3],[393,'Tiplouf','Eau',4]
].map(([id,name,types,gen])=>({id,name,types,gen}));
export const byId=Object.fromEntries(species.map(p=>[p.id,p]));
export const cries=species.filter(p=>![71,114,45,322,307,67,299].includes(p.id)).map(p=>({id:'cri-'+p.id,answer:p.name,pokemon:p.id,gen:p.gen,types:p.types,source:'https://github.com/PokeAPI/cries',fact:`${p.name} · génération ${p.gen} · ${p.types}.`}));
const sixth=(id,difficulty,team,options,answer,objective,fact)=>({id:'six-'+id,difficulty,team,options:options.map(id=>byId[id].name),candidates:options,answer:byId[answer].name,pokemon:answer,objective,fact,source:'https://pokeapi.co/docs/v2#types'});
export const sixths=[
 sixth('electric','normal',[16,123,35,241,94],[323,310,407,448],323,'Ajoute une immunité aux attaques Électrik.', 'Camérupt est Feu / Sol : son type Sol annule les attaques Électrik.'),
 sixth('ground','easy',[82,310,324,323,448],[16,241,408,307],16,'Ton équipe est sensible au Sol. Ajoute une immunité Sol.', 'Roucool est Normal / Vol : son type Vol le protège des attaques Sol.'),
 sixth('ghost','normal',[94,355,429,307,35],[241,323,387,448],241,'Ajoute une immunité aux attaques Spectre.', 'Écrémeuh est Normal : les attaques Spectre ne peuvent pas le toucher.'),
 sixth('poison','easy',[35,387,114,241,16],[448,94,324,407],448,'Protège ton équipe : recrute un Pokémon immunisé au Poison.', 'Lucario est Combat / Acier. Le type Acier est immunisé aux attaques Poison.'),
 sixth('dragon','normal',[310,324,387,241,408],[35,448,323,123],35,'Ajoute une immunité aux attaques Dragon.', 'Mélofée est de type Fée dans la table actuelle : les attaques Dragon sont sans effet.'),
 sixth('fighting','easy',[241,82,408,299,448],[94,16,387,323],94,'Ajoute une immunité aux attaques Combat.', 'Le type Spectre d’Ectoplasma annule les attaques Combat. Roucool les reçoit avec une efficacité normale.'),
 sixth('fire','expert',[387,407,45,71,114],[324,123,82,35],324,'Ajoute une résistance aux attaques Feu.', 'Chartor est de type Feu : il ne reçoit que la moitié des dégâts Feu. Les types Plante et Acier y sont vulnérables.'),
 sixth('water','normal',[323,322,324,408,299],[387,241,448,94],387,'Ajoute une résistance aux attaques Eau.', 'Tortipouss est Plante : il résiste à l’Eau, contrairement aux trois autres candidats.'),
 sixth('ice','expert',[16,123,387,407,114],[82,241,408,307],82,'Ajoute une résistance aux attaques Glace.', 'Magnéton est Électrik / Acier. Son type Acier réduit de moitié les dégâts Glace.'),
 sixth('psychic','expert',[94,407,71,45,67],[82,35,241,408],82,'Ajoute une résistance aux attaques Psy.', 'Le type Acier de Magnéton résiste au Psy. Les trois autres candidats reçoivent des dégâts normaux.'),
 sixth('rock','normal',[16,123,324,310,35],[448,94,241,387],448,'Ajoute une double résistance aux attaques Roche.', 'Combat et Acier résistent tous deux à Roche : Lucario ne reçoit qu’un quart des dégâts.'),
 sixth('grass','expert',[323,322,408,299,241],[407,35,310,448],407,'Ajoute une double résistance aux attaques Plante.', 'Plante et Poison résistent tous deux à Plante : Roserade ne reçoit qu’un quart des dégâts.')
];

// Each attacking question grants exactly one attack of the named type to each candidate.
// No moveset, ability, item or speed assumption is required.
const tactical=(id,difficulty,team,candidates,answer,objective,fact,rule)=>({...sixth(id,difficulty,[...new Set([...team,...species.map(p=>p.id)])].filter(id=>!candidates.includes(id)).slice(0,5),candidates,answer,objective,fact),rule});
sixths.push(
 tactical('eau-offense','easy',[4,155,324,408,299],[25,4,7,133],25,'Face à un adversaire Eau : qui peut infliger des dégâts super efficaces avec une attaque de son propre type ?','Pikachu utilise Électrik : dégâts ×2 sur Eau. Feu et Eau sont résistés ; Normal est neutre.',{kind:'attack',target:['Eau'],factor:2}),
 tactical('plante-offense','easy',[7,54,158,393,408],[4,7,25,133],4,'Face à un adversaire Plante : qui peut frapper super efficacement avec une attaque de son propre type ?','Salamèche utilise Feu : dégâts ×2 sur Plante. Eau et Électrik sont résistés.',{kind:'attack',target:['Plante'],factor:2}),
 tactical('feu-offense','easy',[152,252,387,123,82],[7,4,152,133],7,'Face à un adversaire Feu : qui peut frapper super efficacement avec une attaque de son propre type ?','Carapuce utilise Eau : dégâts ×2 sur Feu. Feu et Plante sont résistés.',{kind:'attack',target:['Feu'],factor:2}),
 tactical('psy-offense','easy',[67,307,94,407,45],[197,196,143,25],197,'Face à un adversaire Psy : qui peut frapper super efficacement avec une attaque de son propre type ?','Noctali utilise Ténèbres : dégâts ×2 sur Psy.',{kind:'attack',target:['Psy'],factor:2}),
 tactical('combat-offense','easy',[143,241,82,408,299],[196,197,133,7],196,'Face à un adversaire Combat : qui peut frapper super efficacement avec une attaque de son propre type ?','Mentali utilise Psy : dégâts ×2 sur Combat. Ténèbres est résisté.',{kind:'attack',target:['Combat'],factor:2}),
 tactical('sol-offense','easy',[25,179,310,82,324],[152,25,4,133],152,'Face à un adversaire Sol : qui peut frapper super efficacement avec une attaque de son propre type ?','Germignon utilise Plante : dégâts ×2 sur Sol. Électrik est sans effet.',{kind:'attack',target:['Sol'],factor:2}),
 tactical('dragon-offense','easy',[152,4,7,25,143],[35,4,25,54],35,'Face à un adversaire Dragon : qui peut frapper super efficacement avec une attaque de son propre type ?','Mélofée utilise Fée : dégâts ×2 sur Dragon. Feu, Eau et Électrik sont résistés.',{kind:'attack',target:['Dragon'],factor:2}),
 tactical('marais','normal',[25,179,310,82,324],[252,25,4,7],252,'Adversaire Eau / Sol : recrute celui dont une attaque de son propre type peut infliger ×4.','Arcko utilise Plante : les deux types de l’adversaire y sont faibles, soit ×4.',{kind:'attack',target:['Eau','Sol'],factor:4}),
 tactical('acier-plante','normal',[7,393,152,133,143],[155,448,393,196],155,'Adversaire Plante / Acier : recrute celui dont une attaque de son propre type peut infliger ×4.','Héricendre utilise Feu : Plante et Acier sont tous deux faibles au Feu, soit ×4.',{kind:'attack',target:['Plante','Acier'],factor:4}),
 tactical('eau-vol','normal',[7,54,393,152,143],[179,408,4,133],179,'Adversaire Eau / Vol : recrute celui dont une attaque de son propre type peut infliger ×4.','Wattouat utilise Électrik : Eau et Vol sont tous deux faibles à Électrik, soit ×4.',{kind:'attack',target:['Eau','Vol'],factor:4}),
 tactical('psy-tenebres','normal',[196,94,355,143,25],[123,35,448,25],123,'Adversaire Psy / Ténèbres : recrute celui dont une attaque de son propre type peut infliger ×4.','Insécateur utilise Insecte : les deux types y sont faibles, soit ×4.',{kind:'attack',target:['Psy','Ténèbres'],factor:4}),
 tactical('plante-poison','normal',[7,54,393,152,143],[196,25,7,133],196,'Adversaire Plante / Poison : recrute celui dont une attaque de son propre type peut infliger ×2.','Mentali utilise Psy : Poison est faible au Psy et Plante est neutre, soit ×2.',{kind:'attack',target:['Plante','Poison'],factor:2}),
 tactical('psy-spectre','expert',[94,355,429,307,35],[197,241,94,35],197,'Deux exigences : être immunisé au Psy et résister au Spectre. Qui convient ?','Noctali, de type Ténèbres, annule Psy et réduit Spectre de moitié.',{kind:'defend',attacks:['Psy','Spectre'],factors:[0,.5]}),
 tactical('feu-eau','expert',[152,252,387,123,82],[54,324,387,133],54,'Deux exigences : résister à la fois au Feu et à l’Eau. Qui convient ?','Psykokwak, de type Eau, réduit de moitié les attaques Feu comme Eau.',{kind:'defend',attacks:['Feu','Eau'],factors:[.5,.5]}),
 tactical('eau-electric','expert',[4,155,324,408,299],[152,323,7,25],152,'Deux exigences : résister à la fois à Eau et à Électrik. Qui convient ?','Germignon, de type Plante, réduit de moitié Eau et Électrik.',{kind:'defend',attacks:['Eau','Électrik'],factors:[.5,.5]}),
 tactical('deux-immunites','expert',[241,143,82,408,299],[355,241,16,197],355,'Deux exigences : être immunisé aux attaques Normal et Combat. Qui convient ?','Skelénox est Spectre : Normal et Combat sont tous deux sans effet.',{kind:'defend',attacks:['Normal','Combat'],factors:[0,0]}),
 tactical('plante-combat','expert',[7,54,393,143,82],[1,152,82,241],1,'Recrute un Pokémon qui reçoit ×0,25 de Plante et ×0,5 de Combat.','Bulbizarre combine Plante et Poison : double résistance Plante et résistance Combat.',{kind:'defend',attacks:['Plante','Combat'],factors:[.25,.5]}),
 tactical('sol-eau','expert',[82,310,324,323,448],[7,323,408,324],7,'Recrute un Pokémon qui résiste à Eau sans être faible au Sol.','Carapuce reçoit Eau à ×0,5 et Sol à ×1. Les autres candidats sont faibles à Eau et au Sol.',{kind:'defend',attacks:['Eau','Sol'],factors:[.5,1]})
);

const raid=(id,name,era,bosses,source)=>({id,name,era,bosses,source});
export const raids=[
 raid('molten','Cœur du Magma','Classic',['Lucifron','Magmadar','Gehennas','Garr','Baron Geddon','Shazzrah','Golemagg l’Incinérateur','Ragnaros'],'Molten_Core'),
 raid('blackwing','Repaire de l’Aile noire','Classic',['Tranchetripe l’Indompté','Vaelastrasz le Corrompu','Chromaggus','Nefarian'],'Blackwing_Lair'),
 raid('aq','Temple d’Ahn’Qiraj','Classic',['Le Prophète Skeram','Sartura','Fankriss l’Inflexible','C’Thun'],'Temple_of_Ahn%27Qiraj'),
 raid('kara','Karazhan','The Burning Crusade',['Attumen le Veneur','Moroes','Damoiselle de vertu','Le Conservateur','Ombre d’Aran','Dédain-du-Néant','Plaie-de-Nuit','Prince Malchezaar'],'Karazhan'),
 raid('serpent','Caverne du sanctuaire du Serpent','The Burning Crusade',['Hydross l’Instable','Le Rôdeur d’en bas','Leotheras l’Aveugle','Dame Vashj'],'Serpentshrine_Cavern'),
 raid('eye','L’Œil','The Burning Crusade',['Al’ar','Saccageur du Vide','Grande astromancienne Solarian','Kael’thas Haut-Soleil'],'The_Eye'),
 raid('temple','Temple noir','The Burning Crusade',['Supremus','Ombre d’Akama','Mère Shahraz','Illidan Hurlorage'],'Black_Temple'),
 raid('sunwell','Plateau du Puits de soleil','The Burning Crusade',['Kalecgos','Brutallus','Gangrebrume','Kil’jaeden'],'Sunwell_Plateau'),
 raid('naxx','Naxxramas','Wrath of the Lich King',['Anub’Rekhan','Maexxna','Le Recousu','Sapphiron','Kel’Thuzad'],'Naxxramas'),
 raid('ulduar','Ulduar','Wrath of the Lich King',['Ignis le maître de la Fournaise','Tranchécaille','Déconstructeur XT-002','Kologarn','Auriaya','Hodir','Thorim','Freya','Mimiron','Général Vezax','Yogg-Saron'],'Ulduar'),
 raid('crusader','L’Épreuve du croisé','Wrath of the Lich King',['Gormok l’Empaleur','Glace-Hurlante','Seigneur Jaraxxus','Anub’arak'],'Trial_of_the_Crusader'),
 raid('icc','Citadelle de la Couronne de glace','Wrath of the Lich King',['Seigneur Gargamoelle','Dame Murmemort','Porte-mort Saurcroc','Pulentraille','Trognepus','Professeur Putricide','Reine de sang Lana’thel','Sindragosa','Le Roi-Liche'],'Icecrown_Citadel')
];

raids.push(
 raid('zg','Zul’Gurub','Classic',['Grand prêtre Venoxis','Grande prêtresse Jeklik','Grand prêtre Thekal','Grande prêtresse Arlokk','Hakkar'],'Zul%27Gurub_(Classic)'),
 raid('aq-ruins','Ruines d’Ahn’Qiraj','Classic',['Kurinnaxx','Général Rajaxx','Moam','Buru Grandgosier','Ayamiss le Chasseur','Ossirian l’Intouché'],'Ruins_of_Ahn%27Qiraj'),
 raid('za','Zul’Aman','The Burning Crusade',['Nalorakk','Akil’zon','Jan’alai','Halazzi','Malacrass','Zul’jin'],'Zul%27Aman_(raid)'),
 raid('hyjal','Sommet d’Hyjal','The Burning Crusade',['Rage Froidhiver','Anetheron','Kaz’rogal','Azgalor','Archimonde'],'Battle_for_Mount_Hyjal')
);

raids.push(
 raid('onyxia','Repaire d’Onyxia','Classic',['Onyxia'],'Onyxia%27s_Lair'),
 raid('gruul','Repaire de Gruul','The Burning Crusade',['Haut Roi Maulgar','Gruul le Tue-Dragon'],'Gruul%27s_Lair'),
 raid('magtheridon','Repaire de Magtheridon','The Burning Crusade',['Magtheridon'],'Magtheridon%27s_Lair'),
 raid('malygos','L’Œil de l’éternité','Wrath of the Lich King',['Malygos'],'Eye_of_Eternity'),
 raid('obsidian','Sanctum Obsidien','Wrath of the Lich King',['Sartharion','Vespéron','Ténébron','Obscuron'],'Obsidian_Sanctum')
);

// Extend training now; preserve today’s shared daily raid draw until midnight.
for(const raid of raids.slice(16))raid.introducedDay='2026-10-01';
