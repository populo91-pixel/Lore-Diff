import {chooseVaried,readHistory,remember} from './draw-variety.mjs';
import {currentMode} from './idle-nav.js';
import {dayKey} from './reveal-engine.mjs';
import {shuffle,resolved,points,pick,advance,restore} from './idle-trials-engine.mjs';
import {evolutions,equipment} from './idle-trials-data.js';
const pokemon=document.body.dataset.game==='pokemon',mode=pokemon?'evolution':'equipement',title=pokemon?'Évolution':'Qui porte ça ?';
const root=document.querySelector('#it-mode'),pool=pokemon?evolutions:equipment,limit=pokemon?1:3;
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let daily=true,day=dayKey(),deck=[],state,fx=[],sequence=0,saveFailed=false;
const key=()=>`ld-trials-v1-${mode}-${day}`;
const motion=()=>!document.documentElement.classList.contains('ld-motion-off')&&!matchMedia('(prefers-reduced-motion: reduce)').matches;
function stop(){sequence++;fx.forEach(a=>a.cancel());fx=[];const skip=root.querySelector('[data-it="skip"]');if(skip)skip.hidden=true;}
function effect(kind){
 stop();if(!motion()||root.hidden)return;
 const token=sequence,els=root.querySelectorAll(kind==='evolve'?'.it-before,.it-after,.it-energy':kind==='win'?'.it-item,.it-reveal-name':'.it-art,.it-item,.it-question');
 for(const el of els){
  let frames,duration=600;
  if(kind==='evolve'){
   duration=1100;
   frames=el.classList.contains('it-before')?[{opacity:1,transform:'scale(1)'},{opacity:1,filter:'brightness(2)',transform:'scale(.85)',offset:.35},{opacity:0,transform:'scale(.4)',offset:.65},{opacity:0}]:el.classList.contains('it-after')?[{opacity:0,transform:'scale(.6)'},{opacity:0,transform:'scale(.6)',offset:.4},{opacity:1,transform:'scale(1.12)',offset:.8},{opacity:1,transform:'scale(1)'}]:[{opacity:0,transform:'scale(.3)'},{opacity:.8,transform:'scale(1.1)',offset:.5},{opacity:0,transform:'scale(1.6)'}];
  }else if(kind==='wrong'){frames=[{transform:'translateX(0)'},{transform:'translateX(-7px)'},{transform:'translateX(7px)'},{transform:'translateX(0)'}];duration=300;}
  else frames=[{opacity:0,transform:'translateY(20px) scale(.9)'},{opacity:1,transform:'translateY(-4px) scale(1.02)',offset:.8},{opacity:1,transform:'translateY(0) scale(1)'}];
  const a=el.animate(frames,{duration,easing:'cubic-bezier(.2,.7,.3,1)'});fx.push(a);
 }
 const skip=root.querySelector('[data-it="skip"]');if(skip)skip.hidden=!fx.length;
 Promise.allSettled(fx.map(a=>a.finished)).then(()=>{if(token===sequence&&skip)skip.hidden=true;});
}
function persist(){if(!daily)return;try{localStorage.setItem(key(),JSON.stringify(state));saveFailed=false;}catch{saveFailed=true;}}
function start(practice=false){
 stop();daily=!practice;day=dayKey();const seed=daily?`${day}-${mode}`:`${Date.now()}-${Math.random()}`;
 deck=chooseVaried(pool,seed,3,daily?[]:readHistory(mode),q=>pokemon?q.from:q.answer);remember(mode,deck.map(q=>q.id));deck=deck.map(q=>({...q,options:shuffle(q.options,seed+q.id)}));
 state={ids:deck.map(q=>q.id),index:0,answers:deck.map(()=>[])};
 if(daily){try{const raw=localStorage.getItem(key()),saved=JSON.parse(raw||'null');if(Array.isArray(saved?.ids)){const prior=saved.ids.map(id=>pool.find(q=>q.id===id));if(prior.length===3&&prior.every(Boolean)){const previous=prior.map(q=>({...q,options:shuffle(q.options,seed+q.id)}));const restored=restore(raw,previous,limit);if(restored){deck=previous;state=restored;}}}}catch{}}
 render();effect('enter');
}
function art(q,entry,done){
 const won=entry.includes(q.answer);
 if(pokemon)return `<div class="it-scene it-pokemon ${done?'it-transformed':''}"><span class="it-scene-label">${done?'ÉVOLUTION RÉVÉLÉE':'PRÊT À ÉVOLUER'}</span><div class="it-art"><div class="it-energy" aria-hidden="true"></div><img class="it-before" src="/assets/reveal/${q.from}.png" alt="${esc(q.fromName)}" width="240" height="240">${done?`<img class="it-after" src="/assets/reveal/${q.to}.png" alt="${esc(q.toName)}" width="240" height="240">`:''}</div><strong class="it-pokemon-name">${esc(done?q.toName:q.fromName)}</strong><span class="it-scene-footer">${done?esc(q.fromName+' → '+q.toName):'Trouve la bonne condition'}</span></div>`;
 return `<div class="it-scene it-equipment ${won?'it-won':''}"><span class="it-scene-label">${esc(q.kind)}</span><div class="it-item"><span>ARME EMBLÉMATIQUE</span><strong>${esc(q.item)}</strong></div><div class="it-reveal-name">${done?`<span>${won?'PORTEUR IDENTIFIÉ':'LE PORTEUR ÉTAIT'}</span><strong>${esc(q.answer)}</strong>`:'<span>À QUI APPARTIENT CETTE ARME ?</span>'}</div><span class="it-scene-footer">${esc(q.context)}</span></div>`;
}
function render(){
 const over=state.index===deck.length;
 const score=deck.reduce((n,q,i)=>n+points(state.answers[i],q),0),wins=deck.filter((q,i)=>state.answers[i].includes(q.answer)).length;
 let body='';
 if(over){body=`<div class="it-summary"><span class="it-kicker">${daily?'DÉFI DU JOUR TERMINÉ':'SÉRIE TERMINÉE'}</span><h2>${score===9?'Sans faute !':wins===0?'On apprend aussi en jouant.':'Bien joué !'}</h2><div class="it-total">${score}<small>/ 9 points</small></div><p>${wins} ${pokemon?'évolution'+(wins>1?'s':''):'arme'+(wins>1?'s':'')} trouvée${wins>1?'s':''} sur 3.</p><div class="it-recap">${deck.map((q,i)=>`<div><b>${state.answers[i].includes(q.answer)?'✓':'×'}</b><span>${esc(pokemon?q.fromName+' → '+q.toName:q.item)}<small>${esc(q.answer)}</small></span><strong>${points(state.answers[i],q)}/3</strong></div>`).join('')}</div><div class="it-actions"><button data-it="practice">Continuer en entraînement</button><button class="it-secondary" data-it="share">Copier le résultat</button></div>${daily?'<p class="it-muted">Prochaine série à minuit, heure de Paris.</p>':''}</div>`;}
 else{
  const q=deck[state.index],entry=state.answers[state.index],done=resolved(entry,q,limit),won=entry.includes(q.answer);
  body=`<div class="it-layout">${art(q,entry,done)}<div class="it-play"><div class="it-round"><span>${pokemon?'ÉVOLUTION':'ARME'} ${state.index+1} / 3</span><b>${score} POINT${score>1?'S':''}</b></div><h2 class="it-question">${pokemon?`Comment obtenir ${esc(q.toName)} ?`:'Qui porte cette arme ?'}</h2><p class="it-context">${esc(q.context)}</p><p class="it-rule">${pokemon?'Choisis la bonne condition. Une seule réponse par évolution.':'Trois essais. Chaque erreur révèle un indice et coûte un point.'}</p><div class="it-options">${q.options.map((value,i)=>`<button data-choice="${i}" class="${(done&&value===q.answer)?'it-correct':entry.includes(value)?'it-wrong':''}" ${done||entry.includes(value)?'disabled':''}><span>${String.fromCharCode(65+i)}</span><b>${esc(value)}</b>${done&&value===q.answer?'<em>✓</em>':entry.includes(value)?'<em>×</em>':''}</button>`).join('')}</div>${!pokemon&&entry.length&&!done?`<div class="it-hints">${q.hints.slice(0,entry.length).map((h,i)=>`<p><b>Indice ${i+1}</b> ${esc(h)}</p>`).join('')}</div>`:''}${done?`<div class="it-feedback ${won?'it-success':''}" role="status"><strong>${won?(pokemon?'Bonne condition !':`Trouvé · +${points(entry,q)} points`):'La bonne réponse est révélée.'}</strong><p>${esc(q.fact)}</p><a href="${q.source}" target="_blank" rel="noopener noreferrer">Voir la source</a></div><div class="it-actions"><button data-it="next">${state.index===2?'Voir mon résultat':'Défi suivant →'}</button><button class="it-secondary" data-it="replay">Revoir ${pokemon?'l’évolution':'la révélation'}</button></div>`:''}<button class="it-skip" data-it="skip" hidden>Passer l’animation</button></div></div>`;
 }
 root.innerHTML=`<header class="it-header"><div><span class="it-kicker">${pokemon?'POKÉIDLE':'WOWIDLE'} · 3 DÉFIS</span><h1>${title}</h1></div><nav aria-label="Type de série"><button data-it="daily" aria-pressed="${daily}">Du jour</button><button data-it="practice" aria-pressed="${!daily}">Entraînement</button></nav></header><div class="it-route" aria-label="Progression de la série">${deck.map((q,i)=>`<span class="${i===state.index?'it-current':''} ${state.answers[i].includes(q.answer)?'it-passed':''}">${i+1}<small>${i<state.index?'TERMINÉ':i===state.index?'EN COURS':'À VENIR'}</small></span>`).join('')}</div>${body}<p class="it-storage">${saveFailed?'Sauvegarde indisponible sur cet appareil.':daily?'Progression sauvegardée sur cet appareil · '+day.split('-').reverse().join('.'):'Entraînement libre · ton défi du jour reste sauvegardé.'}</p><p id="it-status" role="status" aria-live="polite"></p>`;
 root.querySelectorAll('[data-choice]').forEach(b=>b.addEventListener('click',()=>choose(Number(b.dataset.choice))));
 root.querySelectorAll('[data-it]').forEach(b=>b.addEventListener('click',()=>{
  const action=b.dataset.it;
  if(action==='daily'&&!daily)start(false);
  if(action==='practice')start(true);
  if(action==='skip')stop();
  if(action==='replay')effect(pokemon?'evolve':'win');
  if(action==='share')share();
  if(action==='next'){
   const next=advance(state,deck,limit);if(next===state)return;stop();state=next;persist();render();effect('enter');root.querySelector('.it-question,.it-summary h2')?.setAttribute('tabindex','-1');root.querySelector('.it-question,.it-summary h2')?.focus({preventScroll:true});
  }
 }));
}
function choose(index){
 if(daily&&day!==dayKey()){start(false);return;}
 if(state.index>=deck.length)return;const q=deck[state.index];const next=pick(state,deck,q.options[index],limit);if(next===state)return;
 stop();state=next;persist();render();const entry=state.answers[state.index],won=entry.includes(q.answer),done=resolved(entry,q,limit);
 window.LoreFX?.beat(won?'correct':'wrong');effect(pokemon&&done?'evolve':won?'win':'wrong');
 if(!done){root.querySelector('#it-status').textContent='Un nouvel indice est disponible.';root.querySelector('[data-choice]:not(:disabled)')?.focus({preventScroll:true});}
}
async function share(){
 const score=deck.reduce((n,q,i)=>n+points(state.answers[i],q),0);
 const text=`Lore Diff · ${title} · ${daily?day:'Entraînement'}\n${deck.map((q,i)=>state.answers[i].includes(q.answer)?'🟩':'🟥').join('')} ${score}/9\n${location.origin}${location.pathname}#${mode}`;
 try{await navigator.clipboard.writeText(text);root.querySelector('#it-status').textContent='Résultat copié !';}catch{root.querySelector('#it-status').textContent=text;}
}
function show(){stop();root.hidden=currentMode()!==mode;if(!root.hidden){if(!state)start(false);else if(daily&&day!==dayKey())start(false);}}
window.addEventListener('lore:modechange',show);window.addEventListener('lore:settings',stop);matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change',stop);show();
