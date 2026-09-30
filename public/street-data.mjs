// Classic international names; roster: Super Street Fighter II (1993).
export const fighters=[
 ['ryu','Ryu','Japon','Homme','Ansatsuken','Street Fighter',1987,'Indépendant','Shinkū Hadōken',['Une boule d’énergie concentrée.','Un super projectile à plusieurs impacts.','Son nom commence par Shinkū.'],'🥋 ⚪ 🇯🇵 🌊'],
 ['ken','Ken','États-Unis','Homme','Ansatsuken','Street Fighter',1987,'Indépendant','Shōryū Reppa',['Une attaque qui monte vers le ciel.','Une succession de coups de poing ascendants.','Son nom se termine par Reppa.'],'🥋 🔴 🇺🇸 🔥'],
 ['chunli','Chun-Li','Chine','Femme','Kung-fu','Street Fighter II',1991,'Interpol','Hyakuretsukyaku',['Une rafale à très courte portée.','Les jambes frappent à toute vitesse.','On l’appelle aussi Lightning Kick.'],'🇨🇳 🦵 ⚡ 👮'],
 ['guile','Guile','États-Unis','Homme','Combat militaire','Street Fighter II',1991,'US Air Force','Sonic Boom',['Un projectile qui traverse l’écran.','Il se lance après une charge arrière.','Une onde sonique.'],'🇺🇸 ✈️ 💇 🌀'],
 ['blanka','Blanka','Brésil','Homme','Combat sauvage','Street Fighter II',1991,'Indépendant','Electric Thunder',['Une attaque autour du corps.','Le combattant devient une source d’électricité.','Peau verte, cheveux orange.'],'🇧🇷 🟢 ⚡ 🌴'],
 ['zangief','Zangief','Russie','Homme','Lutte','Street Fighter II',1991,'Indépendant','Spinning Piledriver',['Une projection à très courte portée.','Une rotation avant de retomber avec l’adversaire.','Le Red Cyclone en a fait sa signature.'],'🇷🇺 🤼 🐻 🌀'],
 ['dhalsim','Dhalsim','Inde','Homme','Yoga','Street Fighter II',1991,'Indépendant','Yoga Fire',['Une attaque à distance.','Une flamme sort de la bouche.','Le premier mot est Yoga.'],'🇮🇳 🧘 🔥 ↔️'],
 ['honda','E. Honda','Japon','Homme','Sumo','Street Fighter II',1991,'Indépendant','Hundred Hand Slap',['Des frappes répétées à courte portée.','Une rafale de paumes.','Le sumo rencontre la vitesse.'],'🇯🇵 🤼 🖐️ ♨️'],
 ['cammy','Cammy','Royaume-Uni','Femme','Combat militaire','Super Street Fighter II',1993,'Delta Red','Spiral Arrow',['Une attaque qui avance au ras du sol.','Le corps tourne, pieds en avant.','Le nom évoque une flèche en spirale.'],'🇬🇧 🐈 🟢 🪖'],
 ['deejay','Dee Jay','Jamaïque','Homme','Kickboxing','Super Street Fighter II',1993,'Indépendant','Air Slasher',['Une attaque à distance.','Une onde produite par un mouvement des bras.','Son utilisateur est un musicien jamaïcain.'],'🇯🇲 🎧 🥊 🎵'],
 ['thawk','T. Hawk','Mexique','Homme','Lutte','Super Street Fighter II',1993,'Thunderfoot','Condor Dive',['Une attaque venue des airs.','Une plongée en diagonale vers l’adversaire.','Son nom évoque un grand oiseau.'],'🇲🇽 🦅 🪶 💪'],
 ['feilong','Fei Long','Hong Kong','Homme','Kung-fu','Super Street Fighter II',1993,'Indépendant','Rekkaken',['Une suite de frappes vers l’avant.','Trois coups de poing que l’on peut enchaîner.','Le combattant est une star du cinéma.'],'🎬 🐉 👊 🇭🇰'],
 ['balrog','Balrog','États-Unis','Homme','Boxe','Street Fighter II',1991,'Shadaloo','Dash Straight',['Une attaque qui se rapproche rapidement.','Une charge suivie d’un direct.','Pas de coups de pied pour ce boxeur.'],'🇺🇸 🥊 💰 🚫🦵'],
 ['vega','Vega','Espagne','Homme','Ninjutsu espagnol','Street Fighter II',1991,'Shadaloo','Flying Barcelona Attack',['Une attaque acrobatique.','Un saut vers le mur, puis une attaque aérienne.','Un masque et une griffe.'],'🇪🇸 🌹 🎭 🗡️'],
 ['sagat','Sagat','Thaïlande','Homme','Muay-thaï','Street Fighter',1987,'Shadaloo','Tiger Shot',['Un projectile qui peut partir à deux hauteurs.','Son nom commence par un félin.','Un bandeau sur l’œil et une cicatrice au torse.'],'🇹🇭 🐅 👁️ 🦵'],
 ['bison','M. Bison','Inconnu','Homme','Psycho Power','Street Fighter II',1991,'Shadaloo','Psycho Crusher',['Le corps entier devient une arme.','Le combattant vole horizontalement entouré d’énergie.','Le chef de Shadaloo.'],'🪖 🔴 💜 🌍']
].map(([id,name,country,gender,style,debut,year,group,move,clues,emoji])=>({id,name,country,gender,style,debut,year,group,move,clues,emoji,img:`/assets/street/${id}.png`}));
export const byId=Object.fromEntries(fighters.map(f=>[f.id,f]));
export const commands=[
 {name:'Hadōken',fighter:'ryu',game:'Super Street Fighter II Turbo',seq:['↓','↘','→','P'],fact:'Quart de cercle avant + poing, personnage tourné vers la droite.'},
 {name:'Shōryūken',fighter:'ken',game:'Super Street Fighter II Turbo',seq:['→','↓','↘','P'],fact:'Avant, bas, diagonale avant + poing, personnage tourné vers la droite.'},
 {name:'Tatsumaki Senpūkyaku',fighter:'ryu',game:'Super Street Fighter II Turbo',seq:['↓','↙','←','K'],fact:'Quart de cercle arrière + pied, personnage tourné vers la droite.'},
 {name:'Spiral Arrow',fighter:'cammy',game:'Super Street Fighter II Turbo',seq:['↓','↘','→','K'],fact:'Quart de cercle avant + pied, personnage tourné vers la droite.'},
 {name:'Tiger Shot',fighter:'sagat',game:'Super Street Fighter II Turbo',seq:['↓','↘','→','P'],fact:'Quart de cercle avant + poing, personnage tourné vers la droite.'}
];
export const intruders=[
 {prompt:'Trois débutent dans Super Street Fighter II (1993). Écarte celui qui était déjà là.',ids:['cammy','thawk','feilong','guile'],answer:'guile',fact:'Guile fait partie des huit combattants jouables de Street Fighter II (1991).'},
 {prompt:'Trois font partie des quatre boss de Street Fighter II. Écarte l’intrus.',ids:['balrog','vega','bison','ken'],answer:'ken',fact:'Les quatre boss sont Balrog, Vega, Sagat et M. Bison (noms internationaux).'},
 {prompt:'Trois représentent le Japon. Écarte l’intrus.',ids:['ryu','honda','ken','ryu'],answer:'ken',fact:'Ken représente les États-Unis. Ryu et E. Honda représentent le Japon.'},
 {prompt:'Trois apparaissent dès Street Fighter (1987). Écarte l’intrus.',ids:['ryu','ken','sagat','chunli'],answer:'chunli',fact:'Chun-Li fait ses débuts dans Street Fighter II en 1991.'},
 {prompt:'Trois représentent les États-Unis. Écarte l’intrus.',ids:['ken','guile','balrog','deejay'],answer:'deejay',fact:'Dee Jay représente la Jamaïque.'}
].filter(x=>new Set(x.ids).size===4);
export const rivalries=[
 {lead:'ryu',answer:'ken',options:['ken','bison','honda','blanka'],prompt:'Retrouve son partenaire d’entraînement et rival de longue date.',fact:'Ryu et Ken se sont entraînés auprès de Gouken.'},
 {lead:'guile',answer:'bison',options:['bison','dhalsim','feilong','thawk'],prompt:'Retrouve le chef de Shadaloo qu’il poursuit après la disparition de Charlie Nash.',fact:'Guile combat Shadaloo et son chef M. Bison.'},
 {lead:'chunli',answer:'bison',options:['bison','ken','zangief','honda'],prompt:'Retrouve le chef de l’organisation liée à la disparition de son père.',fact:'La quête de Chun-Li la mène à Shadaloo.'},
 {lead:'sagat',answer:'ryu',options:['ryu','blanka','deejay','cammy'],prompt:'Retrouve celui qui lui a laissé sa grande cicatrice au torse.',fact:'La cicatrice de Sagat vient de son affrontement avec Ryu.'}
];
export const timelines=[
 {ids:['ryu','chunli','cammy'],fact:'Ryu : 1987 → Chun-Li : 1991 → Cammy : 1993.'},
 {ids:['ken','guile','deejay'],fact:'Ken : 1987 → Guile : 1991 → Dee Jay : 1993.'},
 {ids:['sagat','dhalsim','feilong'],fact:'Sagat : 1987 → Dhalsim : 1991 → Fei Long : 1993.'},
 {ids:['ryu','zangief','thawk'],fact:'Ryu : 1987 → Zangief : 1991 → T. Hawk : 1993.'}
];
export const shuffle=(arr,rng=Math.random)=>{const a=[...arr];for(let i=a.length-1;i>0;i--){const j=Math.floor(rng()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;};
export const normalize=s=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]/g,'');
export function compare(guess,target){return ['country','gender','style','debut','group'].map(key=>({key,value:guess[key],match:guess[key]===target[key]}));}
export function resolveTrial(state,correct,bonus=false){const damage=state.shield?0:(bonus?10:25);return {...state,hp:Math.max(0,state.hp-(correct?0:damage)),score:state.score+(correct?(bonus?150:300):0),super:Math.min(100,state.super+(correct?34:0)),shield:false};}
