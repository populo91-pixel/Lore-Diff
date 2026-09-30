import {chooseVaried,readHistory,remember} from './draw-variety.mjs';
import {currentMode} from './idle-nav.js';
import {normalize,dayKey,dailyIndex,submit,finished,restore} from './reveal-engine.mjs';
const pokemon=document.body.dataset.game==='pokemon', mode=pokemon?'equipe':'butin';
const title=pokemon?'Équipe mystère':'Butin';
const root=document.querySelector('#rv-mode'), classic=document.querySelector('#rv-classic');
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let rows=[],target,state,daily=true,day=dayKey(),loading=false,animations=[];
const answer=r=>pokemon?r.name:r.boss;
const storageKey=()=>`ld-reveal-v1-${mode}-${day}`;
const reduced=()=>document.documentElement.classList.contains('ld-motion-off')||matchMedia('(prefers-reduced-motion: reduce)').matches;
function stop(){animations.forEach(a=>a.cancel());animations=[];const b=root.querySelector('[data-rv="skip"]');if(b)b.hidden=true;}
function animate(kind='clue'){
 stop();if(reduced()||root.hidden)return;
 const selectors=kind==='win'?'.rv-scene, .rv-member img, .rv-answer':'.rv-new, .rv-loot-card, .rv-chest';
 root.querySelectorAll(selectors).forEach((el,i)=>{
  const a=el.animate(kind==='win'?[{transform:'translateY(0)',filter:'brightness(1)'},{transform:'translateY(-12px)',filter:'brightness(1.5)',offset:.45},{transform:'translateY(0)',filter:'brightness(1)'}]:[{opacity:0,transform:'translateY(22px) scale(.7)'},{opacity:1,transform:'translateY(-5px) scale(1.06)',offset:.7},{opacity:1,transform:'translateY(0) scale(1)'}],{duration:kind==='win'?850:550,delay:i*65,easing:'cubic-bezier(.2,.7,.3,1)'});
  animations.push(a);
 });
 const skip=root.querySelector('[data-rv="skip"]');if(skip)skip.hidden=animations.length===0;
 Promise.allSettled(animations.map(a=>a.finished)).then(()=>{if(skip)skip.hidden=true;});
}
function persist(){if(!daily)return;try{localStorage.setItem(storageKey(),JSON.stringify(state));}catch{message('La sauvegarde sur cet appareil est indisponible.');}}
function start(practice=false){
 stop();daily=!practice;day=dayKey();
 target=daily?rows[dailyIndex(day,mode,rows.length)]:chooseVaried(rows,String(Date.now())+Math.random(),1,readHistory(mode))[0];
 remember(mode,[target.id]);state={id:target.id,turns:[],won:false};
 if(daily){try{state=restore(localStorage.getItem(storageKey()),target.id,[...new Set(rows.map(answer))],answer(target))||state;}catch{}}
 render();animate();
}
function message(text){const el=root.querySelector('#rv-message');if(el)el.textContent=text;}
function scene(done){
 const errors=state.turns.filter(t=>t!==answer(target)).length;
 if(pokemon){
  const count=done?target.team.length:Math.min(1+errors,target.team.length);
  return `<div class="rv-scene rv-team-scene ${state.won?'rv-victory':''}"><div class="rv-scene-caption">${done?'ÉQUIPE RÉVÉLÉE':`${count} / ${target.team.length} POKÉMON RÉVÉLÉS`}</div>${done&&target.portrait?`<img class="rv-trainer" src="${esc(target.portrait)}" alt="${esc(target.name)}">`:''}<div class="rv-team" style="--members:${target.team.length}">${target.team.map((p,i)=>`<div class="rv-member ${i===count-1?'rv-new':''}">${i<count?`<img src="/assets/reveal/${p.id}.png" alt="${esc(p.name)}" width="150" height="150"><span>${esc(p.name)}</span>`:`<div class="empty-ball" aria-hidden="true"><span></span></div><span>À découvrir</span>`}</div>`).join('')}</div><div class="rv-scene-bottom">${done?esc(target.region+' · '+target.city):'À qui appartient cette équipe ?'}</div></div>`;
 }
 return `<div class="rv-scene rv-chest-scene ${state.won?'rv-victory':''}"><img class="rv-chest" src="/assets/reveal/chest.webp" alt="Coffre de butin ouvert" width="600" height="600"><div class="rv-scene-caption">${target.quality===5?'LÉGENDAIRE':'ÉPIQUE'}</div><div class="rv-loot-card" style="--loot:${target.quality===5?'#ffb553':'#d596ff'}">${target.icon?`<img src="${esc(target.icon)}" alt="" width="64" height="64">`:''}<strong>${esc(target.name)}</strong></div><div class="rv-scene-bottom">${done?esc(target.raid):'Quel boss laisse tomber ce butin ?'}</div></div>`;
}
function clues(done){
 const n=state.turns.length;
 const list=pokemon?[[target.version,'Version',1],[target.region,'Région',2],[target.city,'Arène',3]]:[[target.kind,'Objet',1],[target.era,'Extension',2],[target.raid,'Raid',3]];
 if(n>=4||done)list.push([`${answer(target).replace(/[^\p{L}]/gu,'').length} lettres`,'Nom',4]);
 if(n>=5||done)list.push([answer(target).charAt(0),'Première lettre',5]);
 return list.map(([value,label,at])=>`<div class="rv-clue ${done||n>=at?'rv-open':''}"><span>${label}</span><b>${done||n>=at?esc(value):`Après ${at} essai${at>1?'s':''}`}</b></div>`).join('');
}
function render(){
 const done=finished(state);
 root.innerHTML=`<div class="rv-top"><div><span class="rv-kicker">${pokemon?'POKÉIDLE · GÉNÉRATIONS I À IV':'WOWIDLE · TRÉSORS D’AZEROTH'}</span><h1>${title}</h1></div><div class="rv-session" aria-label="Type de défi"><button data-rv="daily" aria-pressed="${daily}">Du jour</button><button data-rv="practice" aria-pressed="${!daily}">Entraînement</button></div></div><div class="rv-layout">${scene(done)}<div class="rv-play"><div class="rv-round"><span>${daily?'DÉFI DU '+day.split('-').reverse().join('.'):'ENTRAÎNEMENT LIBRE'}</span><b>${state.turns.length} / 6</b></div><div class="rv-progress" aria-label="${6-state.turns.length} essais restants">${Array.from({length:6},(_,i)=>`<i class="${i<state.turns.length?(state.won&&i===state.turns.length-1?'rv-good':'rv-used'):''}"></i>`).join('')}</div>${done?`<div class="rv-answer"><span>${state.won?'BIEN JOUÉ !':'LE MYSTÈRE EST LEVÉ'}</span><h2>${esc(answer(target))}</h2><p>${state.won?`Trouvé en ${state.turns.length} essai${state.turns.length>1?'s':''}.`:'Tu feras mieux au prochain défi.'}</p></div>`:`<p class="rv-rule">${pokemon?'Retrouve le champion d’arène. Les erreurs révèlent progressivement son équipe et des indices.':'Retrouve le boss. Chaque erreur débloque des indices sur ce butin.'} Six essais pour trouver.</p>`}<div class="rv-clues">${clues(done)}</div>${!done?`<form id="rv-form" autocomplete="off"><label for="rv-input">${pokemon?'Le champion d’arène':'Le boss'}</label><div class="rv-input-row"><input id="rv-input" list="rv-options" placeholder="${pokemon?'Ex. Blanche':'Ex. Ragnaros'}" spellcheck="false" maxlength="80" required><button type="submit">Valider</button></div><datalist id="rv-options">${[...new Set(rows.map(answer))].filter(name=>!state.turns.includes(name)).map(name=>`<option value="${esc(name)}"></option>`).join('')}</datalist></form><button class="rv-subtle" data-rv="clue">${state.turns.length<5?'Indice suivant · coûte 1 essai':'Abandonner et voir la réponse'}</button>`:`<div class="rv-actions"><button data-rv="practice">${daily?'Continuer en entraînement':'Prochain défi'}</button><button data-rv="share">Copier le résultat</button><button class="rv-subtle" data-rv="replay">Revoir l’animation</button></div>`}<p id="rv-message" role="status" aria-live="polite"></p><button class="rv-subtle rv-skip" data-rv="skip" hidden>Passer l’animation</button></div></div><div class="rv-history" aria-label="Tes essais">${state.turns.map((t,i)=>`<span class="${state.won&&i===state.turns.length-1?'rv-correct':''}"><b>${i+1}</b> ${esc(t||'Indice demandé')} ${state.won&&i===state.turns.length-1?'✓':'·'}</span>`).join('')}</div><p class="rv-note">${daily?'Un nouveau défi à minuit, heure de Paris. Progression sauvegardée sur cet appareil.':'Entraîne-toi autant que tu veux. Ton défi du jour reste sauvegardé.'} ${done?`<a href="${esc(target.source)}" target="_blank" rel="noopener noreferrer">Voir la source des données</a>`:''}</p>`;
 root.querySelector('#rv-form')?.addEventListener('submit',e=>{e.preventDefault();guess();});
 root.querySelectorAll('[data-rv]').forEach(b=>b.addEventListener('click',()=>{
  const action=b.dataset.rv;
  if(action==='daily'){if(!daily)start(false);}
  if(action==='practice')start(true);
  if(action==='clue')play(null);
  if(action==='replay')animate(state.won?'win':'clue');
  if(action==='skip')stop();
  if(action==='share')share();
 }));
}
function guess(){
 const value=root.querySelector('#rv-input').value;
 const match=rows.find(r=>[answer(r),...(r.aliases||[]),...(pokemon?[]:({ 'Illidan Hurlorage':['Illidan'],'Le Roi-Liche':['Roi Liche','The Lich King','Arthas'],'Kael’thas Haut-Soleil':['Kaelthas','Kael thas'],'Attumen le Veneur':['Attumen']}[r.boss]||[]))].some(s=>normalize(s)===normalize(value)));
 if(!match){message(pokemon?'Choisis un champion dans les suggestions.':'Choisis un boss dans les suggestions.');return;}
 play(answer(match));
}
function play(value){
 if(daily&&day!==dayKey()){start(false);message('Le nouveau défi du jour est disponible.');return;}
 const next=submit(state,value,answer(target));if(next===state){message('Tu as déjà essayé cette réponse.');return;}
 state=next;persist();render();
 window.LoreFX?.beat(state.won?'correct':finished(state)?'end':value===null?'clue':'wrong');
 animate(state.won?'win':'clue');
 if(!finished(state)){message(value===null?'Nouvel indice révélé.':'Pas encore ! Observe le nouvel indice.');root.querySelector('#rv-input')?.focus({preventScroll:true});}
}
async function share(){
 const text=`Lore Diff · ${title} · ${daily?day:'Entraînement'}\n${state.won?state.turns.length:'X'}/6 ${state.turns.map((t,i)=>state.won&&i===state.turns.length-1?'🟩':t===null?'🟨':'🟥').join('')}\n${location.origin}${location.pathname}#${mode}`;
 try{await navigator.clipboard.writeText(text);message('Résultat copié !');}catch{message(text);}
}
async function show(){
 const active=currentMode()===mode;root.hidden=!active;
 stop();if(!active)return;
 if(rows.length){if(!state)start(false);return;}
 if(loading)return;loading=true;
 root.innerHTML='<p class="rv-loading" role="status">Préparation du défi…</p>';
 try{
  const res=await fetch(pokemon?'/reveal-teams.json':'/reveal-loot.json',{signal:AbortSignal.timeout(4000)});
  if(!res.ok)throw Error('data');rows=await res.json();if(!rows.length)throw Error('empty');start(false);
 }catch{root.innerHTML='<p class="rv-loading" role="alert">Le défi n’a pas pu charger. <button id="rv-retry">Réessayer</button></p>';root.querySelector('#rv-retry').onclick=show;}
 finally{loading=false;}
}
window.addEventListener('lore:modechange',show);window.addEventListener('lore:settings',stop);matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change',stop);
show();
