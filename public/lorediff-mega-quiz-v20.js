(() => {
  const pokemon = [
    [1,"Bulbizarre",["Plante","Poison"],"De base","Forêt","Vert","Pokémon Graine",1],[3,"Florizarre",["Plante","Poison"],"Finale","Prairie","Vert","Pokémon Graine",1],
    [4,"Salamèche",["Feu"],"De base","Montagne","Rouge","Pokémon Lézard",4],[6,"Dracaufeu",["Feu","Vol"],"Finale","Montagne","Rouge","Pokémon Flamme",4],
    [7,"Carapuce",["Eau"],"De base","Eau douce","Bleu","Pokémon Minitortue",7],[9,"Tortank",["Eau"],"Finale","Eau douce","Bleu","Pokémon Carapace",7],
    [12,"Papilusion",["Insecte","Vol"],"Finale","Forêt","Blanc","Pokémon Papillon",10],[15,"Dardargnan",["Insecte","Poison"],"Finale","Forêt","Jaune","Pokémon Guêpoison",13],
    [18,"Roucarnage",["Normal","Vol"],"Finale","Forêt","Marron","Pokémon Oiseau",16],[24,"Arbok",["Poison"],"Finale","Prairie","Violet","Pokémon Cobra",23],
    [25,"Pikachu",["Électrik"],"Intermédiaire","Forêt","Jaune","Pokémon Souris",172],[26,"Raichu",["Électrik"],"Finale","Forêt","Jaune","Pokémon Souris",172],
    [31,"Nidoqueen",["Poison","Sol"],"Finale","Prairie","Bleu","Pokémon Perceur",29],[34,"Nidoking",["Poison","Sol"],"Finale","Prairie","Violet","Pokémon Perceur",32],
    [38,"Feunard",["Feu"],"Finale","Prairie","Jaune","Pokémon Renard",37],[45,"Rafflesia",["Plante","Poison"],"Finale","Prairie","Rouge","Pokémon Fleur",43],
    [49,"Aéromite",["Insecte","Poison"],"Finale","Forêt","Violet","Pokémon Papipoison",48],[59,"Arcanin",["Feu"],"Finale","Prairie","Marron","Pokémon Légendaire",58],
    [65,"Alakazam",["Psy"],"Finale","Zone urbaine","Marron","Pokémon Psy",63],[68,"Mackogneur",["Combat"],"Finale","Montagne","Gris","Pokémon Colosse",66],
    [71,"Empiflor",["Plante","Poison"],"Finale","Forêt","Vert","Pokémon Carnivore",69],[76,"Grolem",["Roche","Sol"],"Finale","Montagne","Marron","Pokémon Titanesque",74],
    [80,"Flagadoss",["Eau","Psy"],"Finale","Bord de mer","Rose","Pokémon Symbiose",79],[94,"Ectoplasma",["Spectre","Poison"],"Finale","Zone urbaine","Violet","Pokémon Ombre",92],
    [103,"Noadkoko",["Plante","Psy"],"Finale","Forêt","Jaune","Pokémon Fruitpalme",102],[112,"Rhinoféros",["Sol","Roche"],"Intermédiaire","Terrain accidenté","Gris","Pokémon Perceur",111],
    [113,"Leveinard",["Normal"],"Intermédiaire","Zone urbaine","Rose","Pokémon Œuf",440],[130,"Léviator",["Eau","Vol"],"Finale","Eau douce","Bleu","Pokémon Terrifiant",129],
    [131,"Lokhlass",["Eau","Glace"],"Sans évolution","Mer","Bleu","Pokémon Transport",131],[133,"Évoli",["Normal"],"De base","Zone urbaine","Marron","Pokémon Évolutif",133],
    [134,"Aquali",["Eau"],"Finale","Zone urbaine","Bleu","Pokémon Bulleur",133],[135,"Voltali",["Électrik"],"Finale","Zone urbaine","Jaune","Pokémon Orage",133],
    [143,"Ronflex",["Normal"],"Intermédiaire","Montagne","Noir","Pokémon Pionceur",446],[144,"Artikodin",["Glace","Vol"],"Sans évolution","Montagne","Bleu","Pokémon Glaciaire",144],
    [149,"Dracolosse",["Dragon","Vol"],"Finale","Bord de mer","Marron","Pokémon Dragon",147],[150,"Mewtwo",["Psy"],"Sans évolution","Rare","Violet","Pokémon Génétique",150],[151,"Mew",["Psy"],"Sans évolution","Rare","Rose","Pokémon Nouveau",151]
  ].map(([id,name,types,evolution,habitat,color,category,family]) => ({id,name,types,evolution,habitat,color,category,family,image:`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}));

  const dofus = [
    ["Joris Jurgen","Joris Jurgen","Héros","Bonta","Gardien","Âge des Dofus","Allié"],["Kerubim Crépin","Kerubim Crépin","Héros","Bonta","Ecaflip","Âge des Dofus","Allié"],
    ["Julith","Julith","Héroïne","Brâkmar","Huppermage","Âge des Dofus","Ennemi"],["Jahash Jurgen","Jahash Jurgen","Héros","Bonta","Huppermage","Âge des Dofus","Allié"],
    ["Goultard","Goultard","Héros","Amakna","Iop","Âge des Dofus","Allié"],["Dark Vlad","Dark Vlad","Alter ego","Amakna","Iop","Classique","Ennemi"],
    ["Otomaï","Otomaï","Héros","Île d'Otomaï","Alchimiste","Classique","Allié"],["Djaul","Djaul","Démon","Brâkmar","Guerrier","Origines","Ennemi"],
    ["Bolgrot","Bolgrot","Dragon","Amakna","Dragon","Âge des Dofus","Ennemi"],["Qilby","Qilby","Héros","Inconnu","Eliatrope","Origines","Ennemi"],
    ["Bouftou Royal","Bouftou Royal","Boss","Amakna","Monstre","Classique","Ennemi"],["Wa Wabbit","Wa Wabbit","Souverain","Île des Wabbits","Wabbit","Classique","Ennemi"],
    ["Moon","Moon","Boss","Île de Moon","Singe","Classique","Ennemi"],["Dragon Cochon","Dragon Cochon","Boss","Amakna","Monstre","Classique","Ennemi"],
    ["Chêne Mou","Chêne Mou","Boss","Forêt des Abraknydes","Monstre","Classique","Ennemi"],["Kralamoure Géant","Kralamoure Géant","Boss","Île d'Otomaï","Kraken","Classique","Ennemi"],
    ["Péki Péki","Péki Péki","Boss","Pandala","Animal","Classique","Ennemi"],["Minotot","Minotot","Boss","Île du Minotoror","Minotaure","Classique","Ennemi"],
    ["Comte Harebourg","Comte Harebourg","Souverain","Frigost","Xélor","Frigost","Ennemi"],["Missiz Frizz","Missiz Frizz","Boss","Frigost","Forgeronne","Frigost","Ennemi"],
    ["Nileza","Nileza","Boss","Frigost","Alchimiste","Frigost","Ennemi"],["Sylargh","Sylargh","Boss","Frigost","Bricoleur","Frigost","Ennemi"],
    ["Tengu Givrefoux","Tengu Givrefoux","Boss","Frigost","Givrefoux","Frigost","Ennemi"],["Glourséleste","Glourséleste","Boss","Frigost","Glours","Frigost","Ennemi"],
    ["Roi Nidas","Roi Nidas","Souverain","Enutrosor","Enutrof","Dimensions divines","Ennemi"],["Reine des Voleurs","Reine des Voleurs","Souveraine","Srambad","Roublard","Dimensions divines","Ennemi"],
    ["Vortex","Vortex","Boss","Xélorium","Mage","Dimensions divines","Ennemi"],["Chalœil","Chalœil","Boss","Ecaflipus","Ecaflip","Dimensions divines","Ennemi"],
    ["Koutoulou","Koutoulou","Boss","Abysses","Entité","Abysses","Ennemi"],["Capitaine Meno","Capitaine Meno","Boss","Abysses","Steamer","Abysses","Ennemi"],
    ["Dantinéa","Dantinéa","Boss","Abysses","Sirène","Abysses","Ennemi"],["Ilyzaelle","Ilyzaelle","Boss","Brâkmar","Gardienne","Tours de la Fratrie","Ennemi"],
    ["Grozilla","Grozilla","Boss","Vulkania","Reptile","Événement","Ennemi"],["Grasmera","Grasmera","Boss","Vulkania","Reptile","Événement","Ennemi"],
    ["Imagiro","Imagiro","Boss","Pandala","Dragon","Pandala","Variable"],["Orukam","Orukam","Boss","Pandala","Dragon","Pandala","Variable"]
  ].map(([name,page,nature,zone,role,era,attitude]) => ({name,page,nature,zone,role,era,attitude}));

  const shuffle = list => [...list].sort(() => Math.random() - .5);
  const pick = list => list[Math.floor(Math.random() * list.length)];
  const unique = list => [...new Set(list)];
  const letters = ["A","B","C","D"];
  function choices(values,answer){return shuffle([answer,...shuffle(unique(values).filter(value=>value!==answer)).slice(0,3)]);}
  function itemChoices(items,item){return choices(items.map(entry=>entry.name),item.name);}
  function factPokemon(item){return `#${String(item.id).padStart(3,"0")} · ${item.types.join(" / ")} · ${item.category}.`;}
  function factDofus(item){return `${item.name} · ${item.nature} · ${item.zone} · ${item.era}.`;}

  function pokemonQuestion(type,index){
    const item=pick(pokemon), values=field=>pokemon.map(entry=>entry[field]);
    const base={type,index,item,answer:item.name,options:itemChoices(pokemon,item),fact:factPokemon(item),image:item.image,kicker:"ARCHIVES DE KANTO"};
    if(type==="PERSONNAGE") return {...base,prompt:"Quel est ce Pokémon ?",code:"ID"};
    if(type==="SILHOUETTE") return {...base,prompt:"À qui appartient cette silhouette ?",code:"SL",silhouette:true};
    if(type==="TYPE") return {...base,prompt:`Quel est le type principal de ${item.name} ?`,answer:item.types[0],options:choices(pokemon.flatMap(entry=>entry.types),item.types[0]),image:null,code:"TY"};
    if(type==="DOUBLE TYPE") {const answer=item.types.join(" / ");return {...base,prompt:`Quelle combinaison de types appartient à ${item.name} ?`,answer,options:choices(pokemon.map(entry=>entry.types.join(" / ")),answer),image:null,code:"2T"};}
    if(type==="ÉVOLUTION") return {...base,prompt:`Quel est le stade d’évolution de ${item.name} ?`,answer:item.evolution,options:choices(values("evolution"),item.evolution),image:null,code:"EV"};
    if(type==="HABITAT") return {...base,prompt:`Quel habitat est associé à ${item.name} ?`,answer:item.habitat,options:choices(values("habitat"),item.habitat),image:null,code:"HB"};
    if(type==="COULEUR") return {...base,prompt:`Quelle est la couleur Pokédex de ${item.name} ?`,answer:item.color,options:choices(values("color"),item.color),image:null,code:"CL"};
    if(type==="POKÉDEX") {const answer=`#${String(item.id).padStart(3,"0")}`;return {...base,prompt:`Quel est le numéro de ${item.name} dans le Pokédex national ?`,answer,options:choices(pokemon.map(entry=>`#${String(entry.id).padStart(3,"0")}`),answer),image:null,code:"DX"};}
    if(type==="INTRUS"){const shared=pick(unique(pokemon.map(entry=>entry.types[0])).filter(value=>pokemon.filter(entry=>entry.types[0]===value).length>=3));const trio=shuffle(pokemon.filter(entry=>entry.types[0]===shared)).slice(0,3);const odd=pick(pokemon.filter(entry=>entry.types[0]!==shared));return {...base,item:odd,prompt:`Quel Pokémon n’a pas le type ${shared} comme type principal ?`,answer:odd.name,options:shuffle([...trio.map(entry=>entry.name),odd.name]),fact:`${odd.name} est de type ${odd.types.join(" / ")}.`,image:null,code:"XX"};}
    if(type==="CONNEXION"){const families=unique(pokemon.map(entry=>entry.family)).filter(family=>pokemon.filter(entry=>entry.family===family).length>=2);const family=pick(families);const pair=shuffle(pokemon.filter(entry=>entry.family===family));const anchor=pair[0],answer=pair[1];return {...base,item:answer,prompt:`Lequel appartient à la même famille d’évolution que ${anchor.name} ?`,answer:answer.name,options:itemChoices(pokemon,answer),fact:`${anchor.name} et ${answer.name} partagent la même lignée évolutive.`,image:null,code:"CN"};}
    if(type==="CATÉGORIE") return {...base,prompt:`Quelle catégorie officielle décrit ${item.name} ?`,answer:item.category,options:choices(values("category"),item.category),image:null,code:"CT"};
    if(type==="MATCH"){const answer=`${item.name} — ${item.types.join(" / ")}`;const wrong=shuffle(pokemon.filter(entry=>entry!==item)).slice(0,3).map(entry=>{const falseType=pick(pokemon.filter(other=>other.types.join(" / ")!==entry.types.join(" / ")));return `${entry.name} — ${falseType.types.join(" / ")}`});return {...base,prompt:"Quelle association Pokémon / type est correcte ?",answer,options:shuffle([answer,...wrong]),image:null,code:"MT"};}
    if(type==="LORE") return {...base,prompt:`Quel Pokémon porte la catégorie « ${item.category.replace("Pokémon ","")} » ?`,answer:item.name,options:itemChoices(pokemon,item),image:null,code:"LR"};
    if(type==="BESTIAIRE") return {...base,prompt:`Quel Pokémon vit surtout dans l’habitat « ${item.habitat} » ?`,answer:item.name,options:itemChoices(pokemon,item),image:null,code:"BT"};
    return {...base,prompt:"Identification éclair : quel est ce Pokémon ?",code:"CH"};
  }

  function dofusQuestion(type,index){
    const item=pick(dofus), values=field=>dofus.map(entry=>entry[field]);
    const base={type,index,item,answer:item.name,options:itemChoices(dofus,item),fact:factDofus(item),page:item.page,kicker:"ARCHIVES DU KROSMOZ"};
    if(type==="PERSONNAGE") return {...base,prompt:"Qui est cette figure du Krosmoz ?",code:"ID"};
    if(type==="SILHOUETTE") return {...base,prompt:"À qui appartient cette silhouette ?",code:"SL",silhouette:true};
    if(type==="NATURE") return {...base,prompt:`Quelle est la nature de ${item.name} ?`,answer:item.nature,options:choices(values("nature"),item.nature),page:null,code:"NT"};
    if(type==="ZONE") return {...base,prompt:`À quelle zone ${item.name} est-il principalement lié ?`,answer:item.zone,options:choices(values("zone"),item.zone),page:null,code:"ZN"};
    if(type==="ARCHÉTYPE") return {...base,prompt:`Quel archétype correspond à ${item.name} ?`,answer:item.role,options:choices(values("role"),item.role),page:null,code:"AR"};
    if(type==="ÉPOQUE") return {...base,prompt:`À quelle époque rattache-t-on ${item.name} ?`,answer:item.era,options:choices(values("era"),item.era),page:null,code:"EP"};
    if(type==="ATTITUDE") return {...base,prompt:`Quelle attitude décrit ${item.name} dans nos archives ?`,answer:item.attitude,options:choices(values("attitude"),item.attitude),page:null,code:"AT"};
    if(type==="BOSS"){const candidates=dofus.filter(entry=>entry.nature==="Boss"),answer=pick(candidates);return {...base,item:answer,prompt:`Lequel de ces boss vient de ${answer.zone} ?`,answer:answer.name,options:itemChoices(dofus,answer),fact:factDofus(answer),page:null,code:"BS"};}
    if(type==="INTRUS"){const zones=unique(values("zone")).filter(zone=>dofus.filter(entry=>entry.zone===zone).length>=3);const zone=pick(zones),trio=shuffle(dofus.filter(entry=>entry.zone===zone)).slice(0,3),odd=pick(dofus.filter(entry=>entry.zone!==zone));return {...base,item:odd,prompt:`Qui n’est pas lié à ${zone} ?`,answer:odd.name,options:shuffle([...trio.map(entry=>entry.name),odd.name]),fact:factDofus(odd),page:null,code:"XX"};}
    if(type==="CONNEXION"){const eras=unique(values("era")).filter(era=>dofus.filter(entry=>entry.era===era).length>=2);const era=pick(eras),pair=shuffle(dofus.filter(entry=>entry.era===era)),anchor=pair[0],answer=pair[1];return {...base,item:answer,prompt:`Qui partage l’époque « ${era} » avec ${anchor.name} ?`,answer:answer.name,options:itemChoices(dofus,answer),fact:factDofus(answer),page:null,code:"CN"};}
    if(type==="LIEU") return {...base,prompt:`Quelle figure est associée à ${item.zone} ?`,answer:item.name,options:itemChoices(dofus,item),page:null,code:"LX"};
    if(type==="CLASSE") return {...base,prompt:`Qui correspond à l’archétype « ${item.role} » ?`,answer:item.name,options:itemChoices(dofus,item),page:null,code:"CL"};
    if(type==="LORE"){const answer=`${item.zone} — ${item.era}`;return {...base,prompt:`Quelle fiche de lore correspond à ${item.name} ?`,answer,options:choices(dofus.map(entry=>`${entry.zone} — ${entry.era}`),answer),page:null,code:"LR"};}
    if(type==="BESTIAIRE") return {...base,prompt:`Quelle créature ou figure porte la nature « ${item.nature} » ?`,answer:item.name,options:itemChoices(dofus,item),page:null,code:"BT"};
    return {...base,prompt:"Identification éclair : qui est cette figure ?",code:"CH"};
  }

  const pokemonTypes=["PERSONNAGE","SILHOUETTE","TYPE","DOUBLE TYPE","ÉVOLUTION","HABITAT","COULEUR","POKÉDEX","INTRUS","CONNEXION","CATÉGORIE","MATCH","LORE","BESTIAIRE","CHRONO"];
  const dofusTypes=["PERSONNAGE","SILHOUETTE","NATURE","ZONE","ARCHÉTYPE","ÉPOQUE","ATTITUDE","BOSS","INTRUS","CONNEXION","LIEU","CLASSE","LORE","BESTIAIRE","CHRONO"];
  window.RUN_WORLDS={
    pokemon:{key:"pokemon",title:"KANTO",brand:"KANTO",overline:"UNIVERS 02 // POKÉMON",intro:"Types, silhouettes, familles d’évolution et archives du Pokédex : quinze formats dans un seul run.",entities:pokemon,types:pokemonTypes,build:()=>pokemonTypes.map(pokemonQuestion)},
    dofus:{key:"dofus",title:"KROSMOZ",brand:"KROSMOZ",overline:"UNIVERS 03 // DOFUS",intro:"Boss, héros, zones, époques et connexions du Monde des Douze : quinze formats dans un seul run.",entities:dofus,types:dofusTypes,build:()=>dofusTypes.map(dofusQuestion)}
  };
  window.LORE_RUN_SHARED={pokemon,dofus,shuffle,pick,choices,letters,factPokemon,factDofus};
})();

(() => {
  const shared=window.LORE_RUN_SHARED,{pokemon,dofus,shuffle,pick,choices,letters}=shared;
  const wow=[
    ["Arthas Menethil","Arthas Menethil","Humain","Alliance","Paladin déchu","Wrath of the Lich King"],["Thrall","Thrall","Orc","Horde","Chaman","Warcraft III"],
    ["Jaina Portvaillant","Jaina Proudmoore","Humaine","Alliance","Mage","Battle for Azeroth"],["Illidan Hurlorage","Illidan Stormrage","Elfe de la nuit","Neutre","Chasseur de démons","The Burning Crusade"],
    ["Sylvanas Coursevent","Sylvanas Windrunner","Elfe morte-vivante","Horde","Forestière noire","Shadowlands"],["Aile de mort","Deathwing","Dragon","Neutre","Aspect corrompu","Cataclysm"],
    ["Alexstrasza","Alexstrasza","Dragon","Neutre","Aspect de la Vie","Dragonflight"],["Garrosh Hurlenfer","Garrosh Hellscream","Orc","Horde","Chef de guerre","Mists of Pandaria"],
    ["Khadgar","Khadgar","Humain","Alliance","Archimage","Warlords of Draenor"],["Reine Azshara","Queen Azshara","Naga","Neutre","Reine","Battle for Azeroth"],
    ["Anduin Wrynn","Anduin Wrynn","Humain","Alliance","Prêtre","Battle for Azeroth"],["Varian Wrynn","Varian Wrynn","Humain","Alliance","Roi guerrier","Legion"],
    ["Vol'jin","Vol'jin","Troll","Horde","Chasseur des ombres","Warlords of Draenor"],["Baine Sabot-de-Sang","Baine Bloodhoof","Tauren","Horde","Chef tauren","Battle for Azeroth"],
    ["Tyrande Murmevent","Tyrande Whisperwind","Elfe de la nuit","Alliance","Prêtresse","Warcraft III"],["Malfurion Hurlorage","Malfurion Stormrage","Elfe de la nuit","Alliance","Druide","Warcraft III"],
    ["Kael'thas Haut-Soleil","Kael'thas Sunstrider","Elfe de sang","Neutre","Mage","The Burning Crusade"],["Kel'Thuzad","Kel'Thuzad","Mort-vivant","Fléau","Nécromancien","Wrath of the Lich King"],
    ["Bolvar Fordragon","Bolvar Fordragon","Humain","Alliance","Roi-Liche","Wrath of the Lich King"],["Grommash Hurlenfer","Grommash Hellscream","Orc","Horde","Guerrier","Warcraft III"],
    ["Uther le Porteur de Lumière","Uther the Lightbringer","Humain","Alliance","Paladin","Warcraft III"],["Gul'dan","Gul'dan","Orc","Légion","Démoniste","Legion"],
    ["Ysera","Ysera","Dragon","Neutre","Aspect du Rêve","Legion"],["Ragnaros","Ragnaros","Élémentaire","Neutre","Seigneur du Feu","Classic"]
  ].map(([name,page,race,faction,role,era])=>({name,page,race,faction,role,era}));
  const universes={wow:"WARCRAFT",pokemon:"POKÉMON",dofus:"DOFUS"};
  const rounds=[
    {name:"FLASH MIX",description:"Les trois univers s’enchaînent sans prévenir. Questions directes, dix-huit secondes.",limit:18,multi:1},
    {name:"PORTRAITS",description:"Personnages, créatures et silhouettes. Reconnais la cible avant que le chrono tombe.",limit:18,multi:1.15},
    {name:"MONDES",description:"Zones, factions, types et époques : lis les univers, pas seulement les visages.",limit:18,multi:1.3},
    {name:"CONNEXIONS",description:"Retrouve les liens et les intrus. Chaque erreur casse le multiplicateur de manche.",limit:16,multi:1.5},
    {name:"FINAL BLITZ",description:"Dix secondes par question. Les points comptent double. Aucun temps mort.",limit:10,multi:2}
  ];
  const $=selector=>document.querySelector(selector);
  const el={start:$("#startScreen"),intro:$("#roundIntro"),game:$("#gameScreen"),end:$("#endScreen"),startList:$("#startRoundList"),rail:$("#roundRail"),startTournament:$("#startTournament"),startRound:$("#startRound"),restart:$("#restartTournament"),replay:$("#replayTournament"),introIndex:$("#introIndex"),introTitle:$("#introTitle"),introDescription:$("#introDescription"),questionIndex:$("#questionIndex"),roundName:$("#roundName"),timer:$("#timerValue"),timerFill:$("#timerFill"),panel:$("#mediaPanel"),image:$("#questionImage"),code:$("#mediaCode"),stamp:$("#universeStamp"),kicker:$("#questionKicker"),question:$("#questionText"),answers:$("#answerGrid"),feedback:$("#feedback"),feedbackState:$("#feedbackState"),feedbackAnswer:$("#feedbackAnswer"),feedbackFact:$("#feedbackFact"),next:$("#nextQuestion"),score:$("#scoreValue"),universe:$("#universeValue"),rank:$("#rankValue"),endTitle:$("#endTitle"),endSummary:$("#endSummary"),finalScore:$("#finalScore")};
  let tournament=[],roundIndex=0,questionIndex=0,score=0,correct=0,streak=1,seconds=0,timerId=null,locked=true,renderToken=0;

  el.startList.innerHTML=rounds.map((round,index)=>`<li><b>${String(index+1).padStart(2,"0")}</b><div><strong>${round.name}</strong><small>4 QUESTIONS · COEF ${String(round.multi).replace(".",",")}</small></div></li>`).join("");
  const itemOptions=(items,item)=>choices(items.map(entry=>entry.name),item.name);
  const wowFact=item=>`${item.race} · ${item.faction} · ${item.role} · ${item.era}.`;
  const pokeFact=item=>`#${String(item.id).padStart(3,"0")} · ${item.types.join(" / ")} · ${item.category}.`;
  const dofusFact=item=>`${item.nature} · ${item.zone} · ${item.role} · ${item.era}.`;
  const q=(universe,prompt,answer,options,fact,extra={})=>({universe,prompt,answer,options:shuffle(options),fact,kicker:"TOURNOI MULTI-UNIVERS",...extra});

  function buildFlash(){
    const w=pick(wow),p=pick(pokemon),d=pick(dofus),mix=pick([{name:pick(wow).name,u:"WARCRAFT"},{name:pick(pokemon).name,u:"POKÉMON"},{name:pick(dofus).name,u:"DOFUS"}]);
    return shuffle([
      q("wow",`Quelle est la race de ${w.name} ?`,w.race,choices(wow.map(x=>x.race),w.race),wowFact(w)),
      q("pokemon",`Quel est le type principal de ${p.name} ?`,p.types[0],choices(pokemon.flatMap(x=>x.types),p.types[0]),pokeFact(p)),
      q("dofus",`À quelle zone ${d.name} est-il lié ?`,d.zone,choices(dofus.map(x=>x.zone),d.zone),dofusFact(d)),
      q(mix.u==="WARCRAFT"?"wow":mix.u==="POKÉMON"?"pokemon":"dofus",`À quel univers appartient ${mix.name} ?`,mix.u,["WARCRAFT","POKÉMON","DOFUS","AUCUN"],`${mix.name} appartient à l’univers ${mix.u}.`)
    ]);
  }
  function portrait(universe,silhouette=false){
    if(universe==="wow"){const item=pick(wow);return q("wow",silhouette?"À qui appartient cette silhouette ?":"Qui est ce personnage ?",item.name,itemOptions(wow,item),wowFact(item),{page:item.page,wiki:"wikipedia",silhouette,code:"ID"});}
    if(universe==="pokemon"){const item=pick(pokemon);return q("pokemon",silhouette?"Quel Pokémon se cache dans cette silhouette ?":"Quel est ce Pokémon ?",item.name,itemOptions(pokemon,item),pokeFact(item),{image:item.image,silhouette,code:"PK"});}
    const item=pick(dofus);return q("dofus",silhouette?"À qui appartient cette silhouette ?":"Qui est cette figure du Krosmoz ?",item.name,itemOptions(dofus,item),dofusFact(item),{page:item.page,wiki:"dofus",silhouette,code:"DF"});
  }
  function buildPortraits(){return shuffle([portrait("wow"),portrait("pokemon",true),portrait("dofus"),portrait(pick(["wow","pokemon","dofus"]),true)]);}
  function buildWorlds(){
    const w=pick(wow),p=pick(pokemon),d=pick(dofus),w2=pick(wow);
    return shuffle([
      q("wow",`À quelle extension ou époque associe-t-on ${w.name} ?`,w.era,choices(wow.map(x=>x.era),w.era),wowFact(w)),
      q("pokemon",`Quel habitat est associé à ${p.name} ?`,p.habitat,choices(pokemon.map(x=>x.habitat),p.habitat),pokeFact(p)),
      q("dofus",`À quelle époque rattache-t-on ${d.name} ?`,d.era,choices(dofus.map(x=>x.era),d.era),dofusFact(d)),
      q("wow",`Quelle faction est liée à ${w2.name} ?`,w2.faction,choices(wow.map(x=>x.faction),w2.faction),wowFact(w2))
    ]);
  }
  function intruder(items,field,universe,label,factFn){
    const values=[...new Set(items.map(item=>item[field]))].filter(value=>items.filter(item=>item[field]===value).length>=3),common=pick(values),trio=shuffle(items.filter(item=>item[field]===common)).slice(0,3),odd=pick(items.filter(item=>item[field]!==common));
    return q(universe,`Qui est l’intrus parmi ces cibles liées à « ${common} » ?`,odd.name,[...trio.map(item=>item.name),odd.name],factFn(odd),{code:label});
  }
  function connection(items,field,universe,factFn){
    const values=[...new Set(items.map(item=>item[field]))].filter(value=>items.filter(item=>item[field]===value).length>=2),value=pick(values),pair=shuffle(items.filter(item=>item[field]===value)),anchor=pair[0],answer=pair[1];
    return q(universe,`Qui partage « ${value} » avec ${anchor.name} ?`,answer.name,itemOptions(items,answer),factFn(answer),{code:"CN"});
  }
  function buildConnections(){return shuffle([intruder(wow,"faction","wow","XX",wowFact),intruder(pokemon,"habitat","pokemon","XX",pokeFact),connection(dofus,"era","dofus",dofusFact),connection(wow,"race","wow",wowFact)]);}
  function buildFinal(){
    const w=pick(wow),p=pick(pokemon),d=pick(dofus);
    return shuffle([
      portrait(pick(["wow","pokemon","dofus"]),true),
      q("wow",`Quel rôle correspond à ${w.name} ?`,w.role,choices(wow.map(x=>x.role),w.role),wowFact(w),{code:"BL"}),
      q("pokemon",`Quelle catégorie officielle décrit ${p.name} ?`,p.category,choices(pokemon.map(x=>x.category),p.category),pokeFact(p),{code:"BL"}),
      q("dofus",`Quel archétype correspond à ${d.name} ?`,d.role,choices(dofus.map(x=>x.role),d.role),dofusFact(d),{code:"BL"})
    ]);
  }
  function buildTournament(){return [buildFlash(),buildPortraits(),buildWorlds(),buildConnections(),buildFinal()];}
  function show(name){el.start.hidden=name!=="start";el.intro.hidden=name!=="intro";el.game.hidden=name!=="game";el.end.hidden=name!=="end";window.scrollTo(0,0);}
  function stopTimer(){clearInterval(timerId);timerId=null;}
  function paintRail(){el.rail.innerHTML=rounds.map((round,index)=>`<li class="${index<roundIndex?"done":index===roundIndex?"current":""}">${String(index+1).padStart(2,"0")} · ${round.name}</li>`).join("");}
  function showRoundIntro(){stopTimer();const round=rounds[roundIndex];el.introIndex.textContent=`MANCHE ${String(roundIndex+1).padStart(2,"0")} / 05`;el.introTitle.textContent=round.name;el.introDescription.textContent=round.description;show("intro");}
  async function remoteImage(page,wiki){
    const base=wiki==="dofus"?"https://dofuswiki.fandom.com/fr/api.php":"https://en.wikipedia.org/w/api.php";
    const query=new URLSearchParams({action:"query",format:"json",formatversion:"2",prop:"pageimages",piprop:"thumbnail",pithumbsize:"560",redirects:"1",origin:"*",titles:page});
    try{const response=await fetch(`${base}?${query}`);if(!response.ok)return null;const data=await response.json();return data?.query?.pages?.[0]?.thumbnail?.source||null}catch{return null}
  }
  function loadImage(source){return new Promise(resolve=>{if(!source)return resolve(false);const done=ok=>{el.image.onload=null;el.image.onerror=null;resolve(ok)};el.image.onload=()=>done(true);el.image.onerror=()=>done(false);el.image.referrerPolicy="no-referrer";el.image.src=source;});}
  async function paintMedia(question,token){
    el.image.hidden=true;el.image.removeAttribute("src");el.code.hidden=false;el.code.querySelector("b").textContent=question.code||"MQ";el.panel.classList.toggle("silhouette",Boolean(question.silhouette));let source=question.image||null;if(!source&&question.page)source=await remoteImage(question.page,question.wiki);if(token!==renderToken)return;if(source&&await loadImage(source)&&token===renderToken){el.image.hidden=false;el.code.hidden=true;}
  }
  function startTimer(){
    stopTimer();const limit=rounds[roundIndex].limit;seconds=limit;el.timer.textContent=String(limit);el.timerFill.style.width="100%";el.timerFill.classList.remove("danger");const started=performance.now();timerId=setInterval(()=>{const left=Math.max(0,limit-(performance.now()-started)/1000);seconds=Math.ceil(left);el.timer.textContent=String(seconds);el.timerFill.style.width=`${left/limit*100}%`;el.timerFill.classList.toggle("danger",left<=Math.min(5,limit/3));if(left<=0){stopTimer();answer(null)}},100);
  }
  async function renderQuestion(){
    window.LoreFX?.beat('round',{reset:roundIndex===0&&questionIndex===0,label:`MANCHE ${roundIndex+1} · QUESTION ${questionIndex+1}`});
    const token=++renderToken,question=tournament[roundIndex][questionIndex],absolute=roundIndex*4+questionIndex+1;locked=true;stopTimer();paintRail();el.questionIndex.textContent=`QUESTION ${String(absolute).padStart(2,"0")} / 20`;el.roundName.textContent=rounds[roundIndex].name;el.universe.textContent=universes[question.universe];el.stamp.textContent=universes[question.universe];el.kicker.textContent=question.kicker;el.question.textContent=question.prompt;el.feedback.hidden=true;el.feedback.classList.remove("wrong");
    el.answers.innerHTML=question.options.map((option,index)=>`<button type="button" data-value="${String(option).replace(/"/g,'&quot;')}"><b>${letters[index]}</b><span>${option}</span></button>`).join("");el.answers.querySelectorAll("button").forEach(button=>button.addEventListener("click",()=>answer(button.dataset.value)));locked=false;startTimer();paintMedia(question,token);
  }
  function answer(value){
    if(locked)return;locked=true;stopTimer();const question=tournament[roundIndex][questionIndex],isCorrect=value===question.answer,buttons=[...el.answers.querySelectorAll("button")];buttons.forEach(button=>{button.disabled=true;if(button.dataset.value===question.answer)button.classList.add("correct");else if(button.dataset.value===value)button.classList.add("wrong")});
    if(isCorrect){correct+=1;score+=Math.round((450+seconds*28)*rounds[roundIndex].multi*streak);streak=Math.min(4,streak+.25);el.feedbackState.textContent="CORRECT"}else{streak=1;el.feedbackState.textContent=value===null?"TEMPS ÉCOULÉ":"ERREUR"}window.LoreFX?.beat(isCorrect?'correct':'wrong');el.feedback.classList.toggle("wrong",!isCorrect);el.feedbackAnswer.textContent=question.answer;el.feedbackFact.textContent=question.fact;el.feedback.hidden=false;el.score.textContent=String(score).padStart(5,"0");el.next.textContent=questionIndex===3?(roundIndex===4?"VOIR LE CLASSEMENT →":"MANCHE SUIVANTE →"):"QUESTION SUIVANTE →";
  }
  function finish(){
    window.LoreFX?.beat('finish',{detail:`${score} points`});
    const ratio=correct/20;let rank="D",title="CADET\nDU LORE";if(ratio>=.9){rank="S";title="LORE\nMASTER"}else if(ratio>=.75){rank="A";title="CHAMPION\nD’ARCADE"}else if(ratio>=.55){rank="B";title="ARCHIVISTE\nSOLIDE"}else if(ratio>=.35){rank="C";title="CHALLENGER\nTENACE"}el.rank.textContent=rank;el.endTitle.innerHTML=title.replace("\n","<br />");el.endSummary.textContent=`${correct} bonnes réponses sur 20 à travers Warcraft, Pokémon et Dofus. Le tournoi change de tirage à chaque nouvelle partie.`;el.finalScore.textContent=`${String(score).padStart(5,"0")} POINTS`;const best=Math.max(score,Number(localStorage.getItem("lorediff-mega-best")||0));localStorage.setItem("lorediff-mega-best",String(best));show("end");
  }
  function startTournament(){tournament=buildTournament();roundIndex=0;questionIndex=0;score=0;correct=0;streak=1;el.score.textContent="00000";showRoundIntro();}
  el.startTournament.addEventListener("click",startTournament);el.replay.addEventListener("click",startTournament);el.restart.addEventListener("click",startTournament);el.startRound.addEventListener("click",()=>{questionIndex=0;show("game");renderQuestion()});el.next.addEventListener("click",()=>{if(questionIndex<3){questionIndex+=1;renderQuestion()}else if(roundIndex<4){roundIndex+=1;questionIndex=0;showRoundIntro()}else finish()});
})();
