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
  const params=new URLSearchParams(location.search);
  const key=params.get("world")==="dofus"?"dofus":"pokemon";
  const config=window.RUN_WORLDS[key];
  const $=selector=>document.querySelector(selector);
  const el={
    start:$("#startScreen"),game:$("#gameScreen"),end:$("#endScreen"),brand:$("#brandName"),overline:$("#worldOverline"),title:$("#worldTitle"),intro:$("#worldIntro"),pool:$("#poolCount"),manifest:$("#manifestList"),rail:$("#routeRail"),
    launch:$("#launchButton"),restart:$("#restartButton"),replay:$("#replayButton"),roundIndex:$("#roundIndex"),roundType:$("#roundType"),timer:$("#timerValue"),timerFill:$("#timerFill"),panel:$("#visualPanel"),image:$("#questionImage"),fallback:$("#visualFallback"),code:$("#visualCode"),visualIndex:$("#visualIndex"),kicker:$("#questionKicker"),question:$("#questionText"),answers:$("#answerGrid"),feedback:$("#feedback"),feedbackState:$("#feedbackState"),feedbackAnswer:$("#feedbackAnswer"),feedbackFact:$("#feedbackFact"),next:$("#nextButton"),score:$("#scoreValue"),combo:$("#comboValue"),rank:$("#rankValue"),endOverline:$("#endOverline"),endTitle:$("#endTitle"),endSummary:$("#endSummary"),finalScore:$("#finalScore")
  };
  let run=[],round=0,score=0,combo=1,correct=0,seconds=20,timerId=null,locked=true,renderToken=0;

  document.body.dataset.world=key;
  document.title=`${config.title} Run — Lore Diff`;
  el.brand.innerHTML=`${config.brand} <b>RUN</b>`;
  el.overline.textContent=config.overline;
  el.title.textContent=config.title;
  el.intro.textContent=config.intro;
  el.pool.textContent=`${config.entities.length}+`;
  el.manifest.innerHTML=config.types.map((type,index)=>`<li><b>${String(index+1).padStart(2,"0")}</b><span>${type}</span></li>`).join("");

  const formatScore=value=>String(value).padStart(5,"0");
  const stopTimer=()=>{clearInterval(timerId);timerId=null;};
  const stopImage=()=>{el.image.removeAttribute("src");el.image.hidden=true;};
  function show(screen){el.start.hidden=screen!=="start";el.game.hidden=screen!=="game";el.end.hidden=screen!=="end";window.scrollTo(0,0);}
  function paintRail(){el.rail.innerHTML=run.map((entry,index)=>`<li class="${index<round?"done":index===round?"current":""}">${entry.type}</li>`).join("");}
  async function fandomImage(page){
    const query=new URLSearchParams({action:"query",format:"json",formatversion:"2",prop:"pageimages",piprop:"thumbnail",pithumbsize:"520",redirects:"1",origin:"*",titles:page});
    try{const response=await fetch(`https://dofuswiki.fandom.com/fr/api.php?${query}`);if(!response.ok)return null;const data=await response.json();return data?.query?.pages?.[0]?.thumbnail?.source||null}catch{return null}
  }
  function loadImage(source){return new Promise(resolve=>{if(!source)return resolve(false);const done=ok=>{el.image.onload=null;el.image.onerror=null;resolve(ok)};el.image.onload=()=>done(true);el.image.onerror=()=>done(false);el.image.referrerPolicy="no-referrer";el.image.src=source;});}
  async function paintVisual(question,token){
    stopImage();el.panel.classList.toggle("silhouette",Boolean(question.silhouette));el.fallback.hidden=false;el.code.textContent=question.code||"?";
    let source=question.image||null;if(!source&&question.page)source=await fandomImage(question.page);if(token!==renderToken)return;
    if(source&&await loadImage(source)&&token===renderToken){el.image.hidden=false;el.fallback.hidden=true}else{stopImage();el.fallback.hidden=false;}
  }
  function startTimer(){
    stopTimer();seconds=20;el.timer.textContent="20";el.timerFill.style.width="100%";el.timerFill.classList.remove("danger");const started=performance.now();
    timerId=setInterval(()=>{const left=Math.max(0,20-(performance.now()-started)/1000);seconds=Math.ceil(left);el.timer.textContent=String(seconds);el.timerFill.style.width=`${left*5}%`;el.timerFill.classList.toggle("danger",left<=6);if(left<=0){stopTimer();answer(null)}},100);
  }
  async function renderQuestion(){
    window.LoreFX?.beat('round',{reset:round===0,label:`ÉPREUVE ${round+1} / ${run.length}`});
    const token=++renderToken,question=run[round];locked=true;stopTimer();paintRail();
    el.roundIndex.textContent=`ÉPREUVE ${String(round+1).padStart(2,"0")} / ${run.length}`;el.roundType.textContent=question.type;el.visualIndex.textContent=`${key==="pokemon"?"02":"03"}-${String(round+1).padStart(2,"0")}`;el.kicker.textContent=question.kicker;el.question.textContent=question.prompt;el.feedback.hidden=true;el.feedback.classList.remove("wrong");
    el.answers.innerHTML=question.options.map((option,index)=>`<button type="button" data-value="${option.replace(/"/g,'&quot;')}"><b>${window.LORE_RUN_SHARED.letters[index]}</b><span>${option}</span></button>`).join("");
    el.answers.querySelectorAll("button").forEach(button=>button.addEventListener("click",()=>answer(button.dataset.value)));
    locked=false;startTimer();paintVisual(question,token);
  }
  function answer(value){
    if(locked)return;locked=true;stopTimer();const question=run[round],isCorrect=value===question.answer,buttons=[...el.answers.querySelectorAll("button")];
    buttons.forEach(button=>{button.disabled=true;if(button.dataset.value===question.answer)button.classList.add("correct");else if(button.dataset.value===value)button.classList.add("wrong")});
    if(isCorrect){correct+=1;score+=Math.max(120,Math.round((420+seconds*22)*combo));combo=Math.min(5,combo+1);el.feedbackState.textContent="CORRECT"}else{combo=1;el.feedbackState.textContent=value===null?"TEMPS ÉCOULÉ":"ERREUR"}
    window.LoreFX?.beat(isCorrect?'correct':'wrong');el.feedback.classList.toggle("wrong",!isCorrect);el.feedbackAnswer.textContent=question.answer;el.feedbackFact.textContent=question.fact;el.feedback.hidden=false;el.score.textContent=formatScore(score);el.combo.textContent=`×${combo}`;el.next.textContent=round===run.length-1?"VOIR LE CLASSEMENT →":"ÉPREUVE SUIVANTE →";
  }
  function finish(){
    window.LoreFX?.beat('finish',{detail:`${score} points`});
    stopTimer();const ratio=correct/run.length;let rank="D",title="TOURISTE\nDU LORE";if(ratio>=.93){rank="S";title="MAÎTRE\nARCHIVISTE"}else if(ratio>=.8){rank="A";title="EXPERT\nCONFIRMÉ"}else if(ratio>=.6){rank="B";title="ÉRUDIT\nSOLIDE"}else if(ratio>=.4){rank="C";title="APPRENTI\nDU LORE"}
    el.rank.textContent=rank;el.endOverline.textContent=`RUN TERMINÉ // ${config.title}`;el.endTitle.innerHTML=title.replace("\n","<br />");el.endSummary.textContent=`${correct} bonnes réponses sur ${run.length}. Ton meilleur score local est conservé pour cette Run.`;el.finalScore.textContent=`${formatScore(score)} POINTS`;
    const storageKey=`lorediff-${key}-run-best`;const best=Math.max(score,Number(localStorage.getItem(storageKey)||0));localStorage.setItem(storageKey,String(best));show("end");
  }
  function start(){run=config.build();round=0;score=0;combo=1;correct=0;el.score.textContent="00000";el.combo.textContent="×1";show("game");renderQuestion();}
  el.launch.addEventListener("click",start);el.replay.addEventListener("click",start);el.restart.addEventListener("click",()=>{if(el.game.hidden)start();else start()});el.next.addEventListener("click",()=>{if(round>=run.length-1)finish();else{round+=1;renderQuestion()}});
})();
