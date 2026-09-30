import type {QuizQuestion,Difficulty} from '../app/quiz/quiz-data';
export type Mechanic='deduction'|'intruder'|'association';
export type Challenge={id:number;world:'wow'|'pokemon'|'runeterra';difficulty:Difficulty;mechanic:Mechanic;skill:string;prompt:string;answer:string;options:string[];fact:string;source:string;clues?:string[];pairs?:[string,string][];aliases?:string[]};
const challenges:Challenge[]=[];
const sources={wow:'https://worldofwarcraft.blizzard.com/fr-fr/',pokemon:'https://www.pokemon.com/fr/pokedex',runeterra:'https://www.leagueoflegends.com/fr-fr/champions/'};
function deduction(world:Challenge['world'],rows:[string,string[],string[],string[]?][]){rows.forEach(([answer,clues,options,aliases],i)=>challenges.push({id:1000000+challenges.length,world,difficulty:i<2?'easy':i<4?'normal':'expert',mechanic:'deduction',skill:'personnages',prompt:world==='pokemon'?'Identifie le Pokémon avec le moins d’indices possible.':'Identifie le personnage avec le moins d’indices possible.',answer,options,fact:clues.join(' '),source:sources[world],clues,aliases}));}
deduction('wow',[
 ['Arthas Menethil',['Un ancien prince a basculé du côté du Fléau.','Sa lame runique vole les âmes.','Il règne sur la Couronne de glace.'],['Arthas Menethil','Bolvar Fordragon','Tirion Fordring','Uther'],['Arthas']],
 ['Jaina Portvaillant',['Cette mage a dirigé Theramore.','Elle appartient à la famille dirigeante de Kul Tiras.','Elle devient Grand Amiral de Kul Tiras.'],['Jaina Portvaillant','Katherine Portvaillant','Sylvanas Coursevent','Tyrande Murmevent'],['Jaina']],
 ['Illidan Hurlorage',['Il a combattu les démons avec leurs propres pouvoirs.','Il s’empare des armes du démon Azzinoth.','Le Traître vous attend au Temple noir.'],['Illidan Hurlorage','Malfurion Hurlorage','Kael’thas Haut-Soleil','Akama'],['Illidan']],
 ['Sylvanas Coursevent',['Elle a défendu Quel’Thalas de son vivant.','Arthas l’a relevée sous la forme d’une banshee.','Elle devient la dirigeante des Réprouvés.'],['Sylvanas Coursevent','Alleria Coursevent','Vereesa Coursevent','Calia Menethil'],['Sylvanas']],
 ['Medivh',['Un mystérieux prophète avertit les peuples avant la Troisième Guerre.','Il est associé au bâton Atiesh et à Karazhan.','Il fut un Gardien de Tirisfal corrompu par Sargeras.'],['Medivh','Khadgar','Antonidas','Malygos']],
 ['Neltharion',['Cet Aspect était chargé de la Terre.','La corruption des Dieux très anciens l’a changé.','Il sera connu sous le nom d’Aile de mort.'],['Neltharion','Nozdormu','Malygos','Kalecgos'],['Aile de mort','Deathwing']]
]);
deduction('pokemon',[
 ['Pikachu',['Des joues rouges emmagasinent de l’électricité.','Il évolue grâce à une Pierre Foudre.','Cette souris électrique accompagne Sacha.'],['Pikachu','Wattouat','Élecsprint','Rondoudou']],
 ['Ectoplasma',['Il est de type Spectre et Poison dans la table actuelle.','Il succède à Spectrum dans sa famille.','Il naît d’un échange de Spectrum dans Pokémon Platine.'],['Ectoplasma','Skelénox','Magirêve','Spiritomb']],
 ['Lucario',['Ce Pokémon de Sinnoh combine Combat et Acier.','Il peut percevoir l’aura.','Il est l’évolution de Riolu.'],['Lucario','Méditikka','Magnéton','Roserade']],
 ['Milobellus',['Ce Pokémon est réputé pour sa beauté.','Il est de type Eau et vient de Hoenn.','Il est l’évolution de Barpau.'],['Milobellus','Léviator','Lokhlass','Hyporoi']],
 ['Munja',['Une enveloppe abandonnée devient un Pokémon.','Il combine Insecte et Spectre.','Il peut apparaître lorsque Ningale évolue, avec une place libre et une Poké Ball.'],['Munja','Ninjask','Armulys','Migalos']],
 ['Spiritomb',['Ce Pokémon de Sinnoh est lié à une pierre.','Il combine Spectre et Ténèbres.','Sa description évoque cent huit esprits liés à une Clé de Voûte.'],['Spiritomb','Ténéfix','Noctali','Magirêve']]
]);
deduction('runeterra',[
 ['Ahri',['Une Vastaya peut manipuler l’essence vitale.','Elle possède neuf queues.','Son charme est celui d’une renarde.'],['Ahri','Neeko','Xayah','Nami']],
 ['Jinx',['Cette criminelle de Zaun adore semer le chaos.','Ses armes incluent une mitrailleuse et un lance-roquettes.','Sa super méga roquette peut traverser la carte.'],['Jinx','Vi','Caitlyn','Zeri']],
 ['Braum',['Un héros du Freljord protège les autres.','Il porte une imposante porte en guise de bouclier.','Une moustache et un cœur aussi grand que ses muscles.'],['Braum','Ornn','Volibear','Olaf']],
 ['Ekko',['Ce jeune inventeur a grandi à Zaun.','Son invention lui permet de manipuler le temps.','Le Fractureur du temps revient sur ses pas.'],['Ekko','Zilean','Jayce','Viktor']],
 ['Kindred',['Deux êtres représentent les aspects d’une même fin.','L’un accepte ceux qui ne fuient pas ; l’autre les poursuit.','L’Agneau et le Loup ne vont jamais l’un sans l’autre.'],['Kindred','Warwick','Lillia','Fiddlesticks']],
 ['Ornn',['Ce demi-dieu du Freljord préfère sa forge à la compagnie.','Il façonne le feu et le métal.','Le forgeron est le frère de Volibear.'],['Ornn','Volibear','Braum','Anivia']]
]);
function intruders(world:Challenge['world'],rows:[string,string[],string,string][]){rows.forEach(([prompt,options,answer,fact],i)=>challenges.push({id:1000000+challenges.length,world,difficulty:i<2?'easy':i<4?'normal':'expert',mechanic:'intruder',skill:world==='pokemon'?'mécaniques':'lore',prompt,options,answer,fact,source:sources[world]}));}
intruders('wow',[
 ['Dossier Cœur du Magma · écarte le boss qui vient d’un autre raid.',['Ragnaros','Magmadar','Garr','Onyxia'],'Onyxia','Onyxia possède son propre repaire. Ragnaros, Magmadar et Garr se rencontrent au Cœur du Magma.'],
 ['Dossier Naxxramas · écarte le boss étranger.',['Kel’Thuzad','Sapphiron','Le Recousu','Illidan Hurlorage'],'Illidan Hurlorage','Illidan se rencontre au Temple noir. Les trois autres boss appartiennent à Naxxramas.'],
 ['Dossier Karazhan · un nom est infiltré.',['Moroes','Le Conservateur','Prince Malchezaar','Dame Vashj'],'Dame Vashj','Dame Vashj se rencontre dans la Caverne du sanctuaire du Serpent. Les autres sont à Karazhan.'],
 ['Dossier Ulduar · un boss ne vient pas de ce raid.',['Hodir','Freya','Mimiron','Sindragosa'],'Sindragosa','Sindragosa se rencontre à la Citadelle de la Couronne de glace. Les trois gardiens sont à Ulduar.'],
 ['Dossier Plateau du Puits de soleil · repère l’intrus.',['Brutallus','Gangrebrume','Kil’jaeden','Supremus'],'Supremus','Supremus garde le Temple noir. Les trois autres boss appartiennent au Plateau du Puits de soleil.'],
 ['Dossier Zul’Aman, version raid de TBC · un nom vient d’ailleurs.',['Nalorakk','Akil’zon','Malacrass','Hakkar'],'Hakkar','Hakkar est le boss de Zul’Gurub classique. Nalorakk, Akil’zon et Malacrass sont à Zul’Aman.']
]);
intruders('pokemon',[
 ['Trois Pokémon de Kanto sont de type Eau. Écarte l’intrus.',['Carapuce','Psykokwak','Lokhlass','Salamèche'],'Salamèche','Salamèche est Feu. Les trois autres possèdent le type Eau.'],
 ['Trois sont des évolutions d’Évoli introduites à Kanto. Écarte l’intrus.',['Aquali','Voltali','Pyroli','Noctali'],'Noctali','Noctali arrive à Johto. Aquali, Voltali et Pyroli existent dès Kanto.'],
 ['Trois Pokémon ont le type Acier dans la table actuelle. Écarte l’intrus.',['Magnéton','Lucario','Steelix','Onix'],'Onix','Onix est Roche / Sol. Steelix, Magnéton et Lucario possèdent le type Acier.'],
 ['Trois Pokémon sont introduits à Sinnoh. Écarte l’intrus.',['Lucario','Roserade','Magirêve','Élecsprint'],'Élecsprint','Élecsprint arrive à Hoenn ; les trois autres sont introduits à Sinnoh.'],
 ['Trois évolutions nécessitent un échange avec objet tenu dans Pokémon Platine. Écarte l’intrus.',['Steelix','Cizayox','Hyporoi','Ectoplasma'],'Ectoplasma','Spectrum évolue en Ectoplasma par échange sans objet. Les trois autres évolutions demandent un objet tenu.'],
 ['Table des types actuelle, sans talent ni objet : trois annulent les attaques Spectre. Écarte l’intrus.',['Ronflex','Écrémeuh','Roucool','Skelénox'],'Skelénox','Les trois premiers possèdent le type Normal, immunisé au Spectre. Skelénox est Spectre et y est vulnérable.']
]);
intruders('runeterra',[
 ['Trois champions sont associés à Demacia. Écarte l’intrus.',['Garen','Lux','Jarvan IV','Darius'],'Darius','Darius est un chef militaire de Noxus. Les trois autres sont demaciens.'],
 ['Trois champions sont associés à Zaun. Écarte l’intrus.',['Jinx','Ekko','Zeri','Garen'],'Garen','Garen est demacien. Jinx, Ekko et Zeri sont associés à Zaun.'],
 ['Trois champions sont associés au Freljord. Écarte l’intrus.',['Ashe','Braum','Sejuani','Sivir'],'Sivir','Sivir est une mercenaire de Shurima. Les autres viennent du Freljord.'],
 ['Trois champions sont des yordles. Écarte l’intrus.',['Teemo','Lulu','Heimerdinger','Neeko'],'Neeko','Neeko est une Vastaya. Teemo, Lulu et Heimerdinger sont des yordles.'],
 ['Trois champions sont liés à la magie du Néant. Écarte l’intrus.',['Kassadin','Kai’Sa','Malzahar','Viego'],'Viego','Viego est lié à la Ruine et à la Brume noire, plutôt qu’au Néant.'],
 ['Trois champions portent une identité darkin. Écarte l’intrus.',['Aatrox','Rhaast','Varus','Xerath'],'Xerath','Xerath est un être ascensionné de Shurima. Aatrox, Rhaast et Varus sont darkin.']
]);
function associations(world:Challenge['world'],rows:[string,[string,string][],string][]){rows.forEach(([prompt,pairs,skill],i)=>challenges.push({id:1000000+challenges.length,world,difficulty:(['easy','normal','expert'] as const)[i],mechanic:'association',skill,prompt,pairs,options:[],answer:pairs.map(p=>p.join(' → ')).join(' · '),fact:pairs.map(p=>p.join(' → ')).join(' ; ')+'.',source:sources[world]}));}
associations('wow',[
 ['Relie chaque capitale à son peuple, à l’époque classique.',[['Hurlevent','Humains'],['Forgefer','Nains'],['Darnassus','Elfes de la nuit']],'géographie'],
 ['Relie le raid à son boss final dans TBC.',[['Temple noir','Illidan Hurlorage'],['L’Œil','Kael’thas Haut-Soleil'],['Caverne du sanctuaire du Serpent','Dame Vashj']],'lore'],
 ['Relie ces gardiens d’Ulduar à leur domaine.',[['Hodir','Glace'],['Freya','Vie'],['Mimiron','Machines']],'lore']
]);
associations('pokemon',[
 ['Relie le starter de Kanto à son type initial.',[['Bulbizarre','Plante / Poison'],['Salamèche','Feu'],['Carapuce','Eau']],'mécaniques'],
 ['Relie l’évolution d’Évoli à sa pierre, dans Pokémon Platine.',[['Aquali','Pierre Eau'],['Voltali','Pierre Foudre'],['Pyroli','Pierre Feu']],'mécaniques'],
 ['Relie l’évolution par échange à l’objet tenu, dans Pokémon Platine.',[['Cizayox','Peau Métal'],['Hyporoi','Écaille Draco'],['Porygon2','Améliorator']],'mécaniques']
]);
associations('runeterra',[
 ['Relie le champion à sa région.',[['Garen','Demacia'],['Darius','Noxus'],['Ashe','Freljord']],'géographie'],
 ['Relie ces compagnons à leur champion.',[['Tibbers','Annie'],['Pix','Lulu'],['Brut','Sejuani']],'personnages'],
 ['Relie les frères et sœurs de ces familles.',[['Katarina','Cassiopeia'],['Morgana','Kayle'],['Nasus','Renekton']],'lore']
]);
export const diffChallenges=challenges;
// Extra Run questions are appended after the historic bank, preserving old Diff IDs.
export const varietyRunQuestions:QuizQuestion[]=challenges.filter(c=>c.mechanic!=='association').map(c=>({universe:c.world,type:c.mechanic==='intruder'?'INTRUS':'DÉDUCTION',prompt:c.mechanic==='deduction'?c.clues!.join(' ')+ ' Qui est-ce ?':c.prompt,options:c.options as QuizQuestion['options'],correct:c.options.indexOf(c.answer),fact:c.fact,signal:c.mechanic==='intruder'?'≠':'???',difficulty:c.difficulty,generation:c.world==='pokemon'?(['Pikachu','Ectoplasma','Salamèche','Onix'].includes(c.answer)?1:['Noctali'].includes(c.answer)?2:['Lucario','Spiritomb','Élecsprint'].includes(c.answer)?4:3):undefined}));

varietyRunQuestions.push(
 {universe:'dofus',type:'INTRUS',difficulty:'easy',prompt:'Trois noms désignent une cité du Monde des Douze. Écarte l’intrus.',options:['Bonta','Brâkmar','Astrub','Frigost'],correct:3,fact:'Frigost est une île. Bonta, Brâkmar et Astrub sont des cités.',signal:'≠'},
 {universe:'dofus',type:'DÉDUCTION',difficulty:'normal',prompt:'Il manipule le temps. Son nom est celui du dieu que ses disciples vénèrent. Quelle classe est-ce ?',options:['Xélor','Iop','Sram','Eniripsa'],correct:0,fact:'La classe Xélor est liée au dieu du temps du même nom.',signal:'???'},
 {universe:'dofus',type:'INTRUS',difficulty:'normal',prompt:'Trois noms désignent une dimension divine. Écarte l’intrus.',options:['Enutrosor','Srambad','Xélorium','Sufokia'],correct:3,fact:'Sufokia est une cité côtière ; les trois autres sont des dimensions divines.',signal:'≠'},
 {universe:'dofus',type:'DÉDUCTION',difficulty:'easy',prompt:'C’est une famille de monstres laineux. Son Royal garde un donjon emblématique. Quelle famille ?',options:['Bouftous','Tofus','Bworks','Wabbits'],correct:0,fact:'Le Bouftou Royal est le boss du donjon des Bouftous.',signal:'???'},
 {universe:'dofus',type:'CONNEXION',difficulty:'normal',prompt:'Associe le maître à sa dimension : Roi Nidas, Reine des Voleurs, Vortex.',options:['Enutrosor · Srambad · Xélorium','Srambad · Xélorium · Enutrosor','Xélorium · Enutrosor · Srambad','Enutrosor · Xélorium · Srambad'],correct:0,fact:'Nidas règne sur Enutrosor, la Reine des Voleurs sur Srambad et Vortex est le boss de Xélorium.',signal:'↔'},
 {universe:'dofus',type:'DÉDUCTION',difficulty:'expert',prompt:'Une île glacée. Un comte et une horloge. Qui est au cœur de son destin ?',options:['Comte Harebourg','Roi Nidas','Wa Wabbit','Merkator'],correct:0,fact:'Le Comte Harebourg est au cœur de l’histoire de Frigost.',signal:'???'},
 {universe:'dofus',type:'CONNEXION',difficulty:'normal',prompt:'Quel duo réunit le père adoptif de Joris et l’antagoniste du film Dofus, livre 1 ?',options:['Kerubim Crépin et Julith','Atcham et Bakara','Ush Galesh et Dathura','Nox et Yugo'],correct:0,fact:'Kerubim a recueilli Joris ; Julith est l’antagoniste du film.',signal:'↔'},
 {universe:'dofus',type:'DÉDUCTION',difficulty:'normal',prompt:'Une forgeronne. Frigost. La Forgefroide. Retrouve le boss.',options:['Missiz Frizz','Nileza','Sylargh','Klime'],correct:0,fact:'Missiz Frizz dirige la Forgefroide à Frigost.',signal:'???'}
);
