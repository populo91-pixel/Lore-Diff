export const factions=[
{id:'space-marines',name:'Space Marines',clues:['Guerriers humains d’élite.','Ils sont transformés pour la guerre.','Armures énergétiques, bolters et chapitres.','On les appelle les Anges de la Mort.'],units:['Intercessors','Terminators','Infiltrators','Eradicators'],fact:'Les Space Marines sont les guerriers surhumains de l’Adeptus Astartes.'},
{id:'sororitas',name:'Adepta Sororitas',clues:['La foi est au cœur de leurs batailles.','Des ordres militants servent l’Empereur-Dieu.','Flammes, bolters et hymnes.','On les appelle les Sœurs de Bataille.'],units:['Battle Sisters','Seraphim','Retributors','Repentia'],fact:'Les Sœurs de Bataille combattent au nom de leur foi en l’Empereur.'},
{id:'astra-militarum',name:'Astra Militarum',clues:['Une force humaine immense.','Ses soldats restent de simples mortels.','Infanterie, chars et artillerie.','Cadia et ses Kasrkin font partie de son histoire.'],units:['Cadian Shock Troops','Kasrkin','Tempestus Scions','Leman Russ'],fact:'La Garde Impériale déploie des régiments de soldats et de blindés.'},
{id:'orks',name:'Orks',clues:['La guerre est une joie pour ce peuple.','Les chefs s’imposent par leur force.','Des hordes et des véhicules bricolés.','Une Waaagh! rassemble cette marée verte.'],units:['Boyz','Nobz','Warboss','Gretchin'],fact:'Les Orks se rassemblent pour la bataille sous l’autorité des plus forts.'},
{id:'necrons',name:'Nécrons',clues:['Un peuple ancien s’éveille.','Des dynasties gouvernent ses légions.','Leurs corps métalliques peuvent se reconstituer.','Leurs mondes-nécropoles abritent des armes gauss.'],units:['Necron Warriors','Immortals','Lychguard','Canoptek Scarabs'],fact:'Les Nécrons sont les héritiers métalliques d’un empire antique.'},
{id:'tyranids',name:'Tyranides',clues:['Cette menace vient d’au-delà de la galaxie.','Elle consume la matière vivante.','Ses créatures répondent à l’Esprit de la Ruche.','Ses flottes-ruches dévorent les mondes.'],units:['Termagants','Hormagaunts','Gargoyles','Tyranid Warriors'],fact:'Les flottes-ruches tyranides assimilent la biomasse des mondes.'},
{id:'tau',name:'Empire T’au',clues:['Un empire jeune et expansionniste.','Il rassemble différentes espèces.','Ses forces emploient drones et exo-armures.','Il agit au nom du Bien Suprême.'],units:['Strike Team','Pathfinders','Crisis Battlesuits','Broadside Battlesuits'],fact:'L’Empire T’au associe technologie de pointe et Bien Suprême.'},
{id:'aeldari',name:'Aeldari',clues:['Une civilisation ancienne et déclinante.','Certains survivants voyagent à bord de vaisseaux-mondes.','Ses prophètes et guerriers suivent des voies spécialisées.','Les Guerriers Aspects défendent ce peuple.'],units:['Dire Avengers','Howling Banshees','Striking Scorpions','Fire Dragons'],fact:'Les Aeldari des vaisseaux-mondes déploient notamment des Guerriers Aspects.'}
];
export const shuffle=xs=>{const a=[...xs];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
export const intruderFor=f=>{const outsider=shuffle(factions.filter(x=>x.id!==f.id))[0],wrong=shuffle(outsider.units)[0];return {outsider,wrong,options:shuffle([...shuffle(f.units).slice(0,3),wrong])}};
export const scoreFor=(miss,hints)=>Math.max(100,600-miss*150-hints*100);

// Catalog names remain English so unit clues and the intruder mode use one vocabulary.
const additions={
 'space-marines':['Dreadnought','Land Raider'],sororitas:['Canoness','Immolator'],'astra-militarum':['Basilisk','Rogal Dorn Battle Tank'],orks:['Deff Dread','Stormboyz'],necrons:['Monolith','Deathmarks'],tyranids:['Carnifex','Hive Tyrant'],tau:['Riptide Battlesuit','Stealth Battlesuits'],aeldari:['Warp Spiders','Dark Reapers']
};
const roles={
 'space-marines':['Eradicators','Un blindé ennemi bloque l’avancée. Retrouve les spécialistes des armes à fusion.','Les Eradicators sont des Space Marines spécialisés dans les armes à fusion.'],
 sororitas:['Repentia','Des guerrières cherchent la rédemption en combattant avec de lourdes épées tronçonneuses. Retrouve cette unité.','Les Repentia manient des eviscerators, de lourdes armes tronçonneuses à deux mains.'],
 'astra-militarum':['Basilisk','Le rapport mentionne un canon Earthshaker sur un véhicule d’artillerie. Identifie ce soutien.','Le Basilisk est un véhicule d’artillerie de l’Astra Militarum armé du canon Earthshaker.'],
 orks:['Stormboyz','Des Orks utilisent des fusées dorsales pour se jeter dans la bataille. Identifie l’unité.','Les Stormboyz utilisent des fusées dorsales pour propulser leurs assauts.'],
 necrons:['Deathmarks','Le rapport décrit des tireurs nécrons spécialisés dans l’élimination de cibles. Qui sont-ils ?','Les Deathmarks sont les tireurs spécialisés des dynasties nécrons.'],
 tyranids:['Gargoyles','Des créatures tyranides ailées, relativement petites, attaquent en essaim. Identifie l’unité.','Les Gargoyles sont des créatures tyranides ailées qui opèrent en essaims.'],
 tau:['Broadside Battlesuits','Une exo-armure T’au est dédiée au soutien lourd et peut porter un rail rifle. Retrouve cette unité.','Les Broadside Battlesuits fournissent un appui lourd, notamment avec leurs rail rifles.'],
 aeldari:['Fire Dragons','Des Guerriers Aspects sont spécialisés dans la destruction des blindés par armes à fusion. Retrouve le groupe.','Les Fire Dragons sont les spécialistes aeldari des armes à fusion et de l’attaque des blindés.']
};
for(const f of factions){f.units.push(...additions[f.id]);const [answer,brief,fact]=roles[f.id];f.role={answer,brief,fact};}
