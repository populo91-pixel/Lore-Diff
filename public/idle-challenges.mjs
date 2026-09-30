import {chooseVaried,readHistory,remember} from './draw-variety.mjs';
import {currentMode} from './idle-nav.js';
import {dayKey,normalize} from './reveal-engine.mjs';
import {shuffle,pick,advance,restore,resolved,points} from './idle-trials-engine.mjs';
import {species,byId,cries,sixths,raids} from './idle-challenges-data.mjs';
const root=document.querySelector('#ic-mode');
const pokemon=document.body.dataset.game==='pokemon';
const modes=pokemon?['cri','sixieme']:['raid'];
const titles={cri:'Cri mystère',sixieme:'Le Bon sixième',raid:'L’Intrus du raid'};
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let mode='',difficulty='normal',daily=true,day='',deck=[],state=null,audio=null,audioTimer,heard=false,epoch=0,animation=null,storageFailed=false;
const sessions=new Map();
const limit=()=>mode==='cri'?3:1;
const key=()=>`ld-challenges-v1-${mode}-${difficulty}-${day}`;
const score=()=>deck.reduce((sum,q,i)=>sum+points(state.answers[i],q),0);
function stop(){epoch++;clearTimeout(audioTimer);if(audio){audio.pause();audio.removeAttribute('src');audio.load();audio=null;}animation?.cancel();root.querySelector('.ic-wave')?.classList.remove('ic-playing');const b=root.querySelector('[data-ic="listen"]');if(b)b.disabled=false;}
function animate(){
 if(root.hidden||document.documentElement.classList.contains('ld-motion-off')||matchMedia('(prefers-reduced-motion: reduce)').matches)return;
 animation=root.querySelector('.ic-scene')?.animate([{opacity:.4,transform:'translateY(12px)'},{opacity:1,transform:'translateY(0)'}],{duration:400,easing:'ease-out'});
}
function persist(){if(!daily)return;try{localStorage.setItem(key(),JSON.stringify(state));storageFailed=false;}catch{storageFailed=true;}}
function build(seed){
 let pool;
 if(mode==='cri')pool=cries.map(q=>({...q,options:[q.answer,...shuffle(cries.filter(p=>p.id!==q.id),seed+q.id).slice(0,difficulty==='easy'?3:difficulty==='normal'?7:cries.length-1).map(p=>p.answer)]}));
 if(mode==='sixieme')pool=sixths.filter(q=>q.difficulty===difficulty);
 if(mode==='raid'){const active=raids.filter(r=>!daily||!r.introducedDay||r.introducedDay<=day);pool=active.filter(r=>r.bosses.length>=3).map(r=>{
  const other=shuffle(active.filter(v=>v.id!==r.id&&(difficulty==='easy'?v.era!==r.era:v.era===r.era)),seed+r.id)[0];
  const answer=shuffle(other.bosses,seed+other.id+r.id)[0];
  return {id:'raid-'+r.id,raid:r.name,era:r.era,answer,options:[...shuffle(r.bosses,seed+r.id).slice(0,3),answer],fact:`${answer} se rencontre dans ${other.name}. Les trois autres appartiennent à ${r.name}.`,source:`https://warcraft.wiki.gg/wiki/${other.source}`};
 });}
 const chosen=chooseVaried(pool,seed,3,daily?[]:readHistory(mode),q=>mode==='cri'?q.gen:mode==='raid'?q.era:q.rule?.kind||'defend');
 remember(mode,chosen.map(q=>q.id));
 return chosen.map(q=>({...q,options:shuffle(q.options,seed+q.id+'answers')}));
}
function start(practice=false){
 stop();daily=!practice;day=dayKey();heard=false;
 deck=build(daily?`${day}-${mode}-${difficulty}`:`${Date.now()}-${Math.random()}`);
 state={ids:deck.map(q=>q.id),index:0,answers:deck.map(()=>[])};
 if(daily)try{state=restore(localStorage.getItem(key()),deck,limit())||state;}catch{}
 render();animate();
}
function sprite(id,types=false){const p=byId[id];return `<div class="ic-member"><img src="/assets/reveal/${id}.png" alt="${esc(p.name)}" width="130" height="130"><b>${esc(p.name)}</b>${types?`<small>${esc(p.types)}</small>`:''}</div>`;}
function scene(q,done){
 if(mode==='cri')return `<div class="ic-scene ic-cry">${done?sprite(q.pokemon,true):'<div class="ic-wave" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div><strong>À QUI EST CE CRI ?</strong>'}<button type="button" data-ic="listen">Écouter le cri</button><p id="ic-audio-status" role="status">Lecture au clic · volume de ton appareil</p>${!done&&state.answers[state.index].length?`<div class="ic-clue">Type : ${esc(q.types)}${state.answers[state.index].length>1?` · Génération ${q.gen}`:''}</div>`:''}</div>`;
 if(mode==='sixieme')return `<div class="ic-scene"><p class="ic-label">TON ÉQUIPE · 5 / 6</p><div class="ic-team">${q.team.map(id=>sprite(id,difficulty==='easy')).join('')}${done?sprite(q.pokemon,true):'<div class="ic-member ic-slot"><strong>?</strong><b>À recruter</b></div>'}</div></div>`;
 return `<div class="ic-scene ic-raid"><span>${esc(q.era)}</span><strong>${esc(difficulty==='expert'&&!done?'TROIS BOSS, UN RAID':q.raid)}</strong><p>${difficulty==='expert'&&!done?'Trois de ces boss se rencontrent dans le même raid. Lequel vient d’ailleurs ?':'Un des quatre boss n’appartient pas à ce raid.'}</p><div class="ic-seals" aria-hidden="true"><b>I</b><b>II</b><b>III</b><b>?</b></div></div>`;
}
function render(){
 stop();const over=state.index>=deck.length,q=deck[state.index],entry=over?[]:state.answers[state.index],done=!over&&resolved(entry,q,limit());
 const result=score();
 root.innerHTML=`<header class="it-header"><div><span class="it-kicker">${pokemon?'POKÉIDLE':'WOWIDLE'} · 3 DÉFIS</span><h1>${titles[mode]}</h1></div><nav aria-label="Type de série"><button data-ic="daily" aria-pressed="${daily}">Du jour</button><button data-ic="practice" aria-pressed="${!daily}">Entraînement</button></nav></header><nav class="ic-difficulty" aria-label="Difficulté du défi">${[['easy','Accessible'],['normal','Normal'],['expert','Expert']].map(([v,label])=>`<button data-difficulty="${v}" aria-pressed="${difficulty===v}">${label}</button>`).join('')}</nav><p class="ic-help">${mode==='cri'?'Reconnais le Pokémon au son. Trois essais ; les erreurs révèlent le type puis la génération.':mode==='sixieme'?'Complète l’équipe en respectant l’objectif. Types actuels, sans talent ni objet. Pour les défis offensifs, chaque candidat dispose d’une attaque de chacun de ses types. Une seule réponse.':`Repère le boss intrus. ${difficulty==='easy'?'L’intrus vient d’une autre extension.':difficulty==='normal'?'Les quatre boss viennent de la même extension.':'Même extension, nom du raid masqué.'} Une seule réponse.`}</p><div class="it-route" aria-label="Progression">${deck.map((_,i)=>`<span class="${i===state.index?'it-current':''}">${i+1}<small>${i<state.index?'TERMINÉ':i===state.index?'EN COURS':'À VENIR'}</small></span>`).join('')}</div>${over?`<div class="it-summary"><span class="it-kicker">${daily?'DÉFI DU JOUR TERMINÉ':'SÉRIE TERMINÉE'}</span><h2>${result===9?'Sans faute !':'Série terminée'}</h2><div class="it-total">${result}<small>/ 9 points</small></div><div class="it-recap">${deck.map((v,i)=>`<div><b>${state.answers[i].includes(v.answer)?'✓':'×'}</b><span>${esc(v.answer)}</span><strong>${points(state.answers[i],v)}/3</strong></div>`).join('')}</div><button data-ic="practice">Nouvelle série d’entraînement →</button></div>`:`${scene(q,done)}<div class="ic-play"><div class="it-round"><span>DÉFI ${state.index+1} / 3</span><b>${result} POINTS</b></div><h2>${mode==='sixieme'?esc(q.objective):mode==='cri'?'Quel Pokémon as-tu entendu ?':'Qui est l’intrus ?'}</h2>${mode==='cri'&&difficulty==='expert'&&!done?`<form id="ic-form"><label for="ic-input">Nom du Pokémon</label><div class="rv-input-row"><input id="ic-input" list="ic-names" placeholder="Écoute puis propose un nom" autocomplete="off" required maxlength="60" ${!heard?'disabled':''}><button ${!heard?'disabled':''}>Valider</button></div><datalist id="ic-names">${q.options.map(v=>`<option value="${esc(v)}"></option>`).join('')}</datalist></form>`:`<div class="it-options ic-options">${q.options.map((v,i)=>{const p=mode==='sixieme'?species.find(p=>p.name===v):null;return `<button data-choice="${i}" ${done||entry.includes(v)||(mode==='cri'&&!heard)?'disabled':''} class="${done&&v===q.answer?'it-correct':entry.includes(v)?'it-wrong':''}"><span>${String.fromCharCode(65+i)}</span>${p?`<img src="/assets/reveal/${p.id}.png" alt="" width="70" height="70">`:''}<b>${esc(v)}${p&&difficulty==='easy'?`<small>${esc(p.types)}</small>`:''}</b>${done&&v===q.answer?'<em>✓</em>':entry.includes(v)?'<em>×</em>':''}</button>`;}).join('')}</div>`}${entry.length&&!done?`<p role="status">Pas encore ! ${limit()-entry.length} essai${limit()-entry.length>1?'s':''} restant${limit()-entry.length>1?'s':''}. Un indice est apparu.</p>`:''}${done?`<div class="it-feedback ${entry.includes(q.answer)?'it-success':''}" role="status"><strong>${entry.includes(q.answer)?`Bien joué · +${points(entry,q)} points`:'La réponse était : '+esc(q.answer)}</strong><p>${esc(q.fact)}</p><a href="${esc(q.source)}" target="_blank" rel="noopener noreferrer">Source</a></div><button data-ic="next">${state.index===2?'Voir mon résultat':'Défi suivant →'}</button>`:''}</div>`}<p class="it-storage">${storageFailed?'Sauvegarde indisponible sur cet appareil.':daily?'Défi du '+day.split('-').reverse().join('.')+' · progression sauvegardée sur cet appareil.':'Entraînement · le défi du jour reste sauvegardé.'}</p><p id="ic-status" role="status" aria-live="polite"></p>`;
 root.querySelectorAll('[data-difficulty]').forEach(b=>b.onclick=()=>{if(difficulty===b.dataset.difficulty)return;difficulty=b.dataset.difficulty;start(!daily);});
 root.querySelectorAll('[data-choice]').forEach(b=>b.onclick=()=>choose(q.options[Number(b.dataset.choice)]));
 root.querySelector('#ic-form')?.addEventListener('submit',e=>{e.preventDefault();const v=q.options.find(v=>normalize(v)===normalize(root.querySelector('#ic-input').value));if(v)choose(v);else root.querySelector('#ic-status').textContent='Choisis un Pokémon parmi les suggestions.';});
 root.querySelectorAll('[data-ic]').forEach(b=>b.onclick=()=>{const action=b.dataset.ic;if(action==='practice')start(true);if(action==='daily'&&!daily)start(false);if(action==='listen')listen();if(action==='next'){const next=advance(state,deck,limit());if(next===state)return;state=next;heard=false;persist();render();animate();root.querySelector('h2')?.setAttribute('tabindex','-1');root.querySelector('h2')?.focus({preventScroll:true});}});
}
function choose(value){
 if(daily&&day!==dayKey()){start(false);return;}
 if(mode==='cri'&&!heard)return;
 const next=pick(state,deck,value,limit());if(next===state){root.querySelector('#ic-status').textContent='Tu as déjà proposé ce Pokémon.';return;}
 state=next;persist();render();animate();window.LoreFX?.beat(value===deck[state.index].answer?'correct':'wrong');
}
function listen(){
 stop();const token=epoch,q=deck[state.index],button=root.querySelector('[data-ic="listen"]'),status=root.querySelector('#ic-audio-status');
 button.disabled=true;status.textContent='Chargement du cri…';
 const el=new Audio();audio=el;el.preload='auto';el.volume=.8;
 el.src=`/assets/cries/${q.pokemon}.${el.canPlayType('audio/ogg')?'ogg':'mp3'}`;
 const fail=()=>{if(token!==epoch)return;stop();button.disabled=false;button.textContent='Réessayer le cri';status.textContent='Lecture impossible. Vérifie le volume et réessaie. Aucun essai perdu.';root.querySelector('.ic-wave')?.classList.remove('ic-playing');};
 audioTimer=setTimeout(fail,6000);
 el.onerror=fail;
 el.onplaying=()=>{if(token!==epoch)return;clearTimeout(audioTimer);heard=true;button.disabled=false;button.textContent='Réécouter le cri';status.textContent='À toi de jouer !';root.querySelector('.ic-wave')?.classList.add('ic-playing');if(!resolved(state.answers[state.index],q,limit())){root.querySelectorAll('[data-choice]').forEach(b=>b.disabled=state.answers[state.index].includes(q.options[Number(b.dataset.choice)]));root.querySelectorAll('#ic-form input,#ic-form button').forEach(b=>b.disabled=false);}};
 el.onended=()=>{if(token===epoch)root.querySelector('.ic-wave')?.classList.remove('ic-playing');};
 el.play().catch(fail);
}
function show(){
 const next=currentMode();
 if(mode&&state)sessions.set(mode,{difficulty,daily,day,deck,state,heard});
 stop();root.hidden=!modes.includes(next);if(root.hidden)return;
 mode=next;root.dataset.idlePanel=mode;
 const cached=sessions.get(mode);
 if(cached&&(!cached.daily||cached.day===dayKey())){({difficulty,daily,day,deck,state,heard}=cached);render();}else start(false);
}
window.addEventListener('lore:modechange',show);
window.addEventListener('pagehide',stop);
window.addEventListener('lore:settings',()=>{stop();root.querySelector('.ic-wave')?.classList.remove('ic-playing');const b=root.querySelector('[data-ic="listen"]');if(b)b.disabled=false;});
document.addEventListener('visibilitychange',()=>{if(document.hidden)stop();});
show();
