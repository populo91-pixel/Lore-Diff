import {IMPACT} from './boss-motion.mjs';
import {prepareWorld,actorMotion,wakeWorld} from './boss-world.mjs';
import {battleEffect,clearBattleEffect} from './boss-effects.mjs';
import {ACTIONS,LEVELS,initial,intent,choose,resolve,next} from './boss-engine.mjs';
const $=id=>document.getElementById(id),panels=['setup','action-panel','question-panel','review-panel','result-panel'];
let state=initial(),deck=[],index=0,timer=null,deadline=0,resolving=false,run=0;
const names={pokemon:'POKÉMON',wow:'WARCRAFT',runeterra:'LEAGUE OF LEGENDS'};
const reduced=()=>document.body.classList.contains('motion-reduced')||matchMedia('(prefers-reduced-motion: reduce)').matches;
function panel(id){panels.forEach(p=>$(p).hidden=p!==id);$('game').dataset.panel=id;$('help').disabled=id==='question-panel';$('help-panel').hidden=true;$('help').setAttribute('aria-expanded','false');wakeWorld();document.querySelectorAll('[data-step]').forEach(el=>el.classList.toggle('active',id.startsWith(el.dataset.step)));}
function focusPanel(id){const target=$(id).querySelector('h2,button');if(target){target.tabIndex=-1;target.focus({preventScroll:true});}}
function bar(id,value,max){$(id).style.width=`${value/max*100}%`;const parent=$(id).parentElement;parent.setAttribute('aria-valuenow',value);parent.setAttribute('aria-valuemax',max);}
function hud(){bar('hp-fill',state.hp,state.maxHp);bar('mp-fill',state.mp,state.maxMp);bar('boss-fill',state.boss,state.maxBoss);$('hp').textContent=`${state.hp} / ${state.maxHp}`;$('mp').textContent=`${state.mp} / ${state.maxMp}`;$('boss-hp').textContent=`${state.boss} / ${state.maxBoss} PV`;
 $('game').classList.toggle('low-health',state.hp>0&&state.hp/state.maxHp<.3);const i=intent(state);$('arena').classList.toggle('rage',i.fury);$('phase').textContent=i.fury?'PHASE 2 · RAGE':'PHASE 1';$('enemy').classList.toggle('enraged',i.fury);$('round').textContent=`TOUR ${state.turn} · ${LEVELS[state.level].label.toUpperCase()}`;$('turn-chip').textContent=`TOUR ${state.turn}`;$('intent').textContent=`Prépare ${i.name.toLowerCase()} · ${i.damage} dégâts${i.fury?' · en rage':''}`;$('intent').classList.toggle('heavy',i.heavy);wakeWorld();$('player-note').textContent=`${state.correct} bonne${state.correct>1?'s':''} réponse${state.correct>1?'s':''} / ${state.answers}`;
 document.querySelectorAll('[data-action]').forEach(b=>{b.disabled=state.mp<ACTIONS[b.dataset.action].cost||(b.dataset.action==='heal'&&state.hp===state.maxHp);b.title=b.disabled?(b.dataset.action==='heal'&&state.hp===state.maxHp?'Tes PV sont au maximum.':'Mana insuffisant.') : '';});}
async function sprites(){await prepareWorld();}
let assetsReady=false;
async function start(){if($('start').disabled)return;$('start').disabled=true;$('start').textContent='Préparation du combat…';$('load-error').textContent='';const controller=new AbortController(),timeout=setTimeout(()=>controller.abort(),8000);
 try{const response=await fetch(`/api/boss?universe=${encodeURIComponent($('universe').value)}`,{signal:controller.signal});if(!response.ok)throw new Error('Les questions sont indisponibles. Réessaie.');const data=await response.json();if(!Array.isArray(data.questions)||data.questions.length<6)throw new Error('Pas assez de questions disponibles. Choisis un autre univers.');if(!assetsReady){await sprites();assetsReady=true;}
 deck=data.questions;index=0;run++;state=initial($('difficulty').value);resolving=false;$('hero').className='fighter hero';$('enemy').className='fighter enemy';$('battle-call').textContent='';hud();panel('action-panel');focusPanel('action-panel');
 }catch(e){$('load-error').textContent=e.name==='AbortError'?'Le chargement prend trop longtemps. Réessaie.':e.message;}finally{clearTimeout(timeout);$('start').disabled=false;$('start').textContent='Commencer le combat ▶';}}
function selectAction(action){const result=choose(state,action);if(result===state||resolving)return;state=result;const q=deck[index];$('question-category').textContent=`${names[q.universe]} · ${ACTIONS[action].label.toUpperCase()}`;$('question').textContent=q.prompt;$('answers').replaceChildren();q.options.forEach((option,i)=>{const button=document.createElement('button');const key=document.createElement('b');key.textContent='ABCD'[i];const text=document.createElement('span');text.textContent=option;button.append(key,text);button.addEventListener('click',()=>answer(i));$('answers').append(button);});panel('question-panel');focusPanel('question-panel');deadline=Date.now()+LEVELS[state.level].time*1000;tick();timer=setInterval(tick,150);}
function tick(){$('time-fill').style.width=`${Math.max(0,(deadline-Date.now())/(LEVELS[state.level].time*1000))*100}%`;const seconds=Math.max(0,Math.ceil((deadline-Date.now())/1000));$('timer').textContent=`${seconds} s`;$('timer').classList.toggle('urgent',seconds<=5);if(seconds===0)answer(-1);}
const pause=ms=>new Promise(r=>setTimeout(r,reduced()?50:ms));
function fx(id,kind){actorMotion(id,kind);$(id).classList.remove('strike','hurt','healing','shield','casting','breath');void $(id).offsetWidth;$(id).classList.add(kind);}
function floating(id,text){const el=$(id);el.textContent='';void el.offsetWidth;el.textContent=text;}
async function answer(choice){if(state.phase!=='question'||resolving)return;resolving=true;clearInterval(timer);timer=null;if(Date.now()>=deadline)choice=-1;const q=deck[index],correct=choice===q.correct,result=resolve(state,correct),token=run;if(!result){resolving=false;return;}
 [...$('answers').children].forEach((b,i)=>{b.disabled=true;b.classList.toggle('correct',i===q.correct);b.classList.toggle('wrong',i===choice&&!correct);});$('battle-call').textContent=correct?ACTIONS[state.action].label:choice===-1?'Temps écoulé !':'Action manquée !';
 $('arena').classList.add('resolving');
 if(correct){
  if(state.action==='heal'){fx('hero','healing');await pause(IMPACT.heal);battleEffect('heal');floating('hero-float',`+${result.heal}`);}
  else if(state.action==='guard'){fx('hero','shield');battleEffect('guard');await pause(IMPACT.guard);fx('enemy','hurt');floating('enemy-float',`−${result.hit}`);}
  else if(state.action==='spell'){fx('hero','casting');await pause(180);battleEffect('spell');await pause(400);fx('enemy','hurt');floating('enemy-float',`−${result.hit}`);}
  else{fx('hero','strike');await pause(IMPACT.attack);battleEffect('attack');fx('enemy','hurt');floating('enemy-float',`−${result.hit}`);}
  if(token!==run)return;
  bar('boss-fill',result.state.boss,state.maxBoss);bar('mp-fill',result.state.mp,state.maxMp);
 }
 await pause(650);if(token!==run)return;
 if(result.incoming){
  $('battle-call').textContent=result.intent.name;
  fx('enemy',result.intent.heavy?'breath':'strike');
  if(correct&&state.action==='guard')fx('hero','shield');
  if(result.intent.heavy){await pause(450);battleEffect('fire');await pause(400);}
  else{await pause(IMPACT.claw);battleEffect('claw');}
  if(token!==run)return;
  if(!(correct&&state.action==='guard'))fx('hero','hurt');
  floating('hero-float',`−${result.incoming}`);
  bar('hp-fill',result.state.hp,state.maxHp);
 }
 await pause(500);if(token!==run)return;$('arena').classList.remove('shake','resolving');const wasFury=intent(state).fury;state=result.state;hud();$('enemy').classList.remove('strike','hurt','breath');$('hero').classList.remove('strike','hurt','shield','healing','casting');$('enemy-float').textContent='';$('hero-float').textContent='';$('battle-call').textContent=!wasFury&&intent(state).fury&&!state.outcome?'La wyverne entre en rage !':'';
 $('review-title').textContent=correct?'BONNE RÉPONSE':choice===-1?'TEMPS ÉCOULÉ':'MAUVAISE RÉPONSE';$('review-answer').textContent=q.options[q.correct];$('fact').textContent=q.fact;$('combat-summary').textContent=`${result.hit?`${result.hit} dégâts infligés. `:''}${result.heal?`${result.heal} PV récupérés. `:''}${result.incoming?`${result.incoming} dégâts subis.`:'Le boss ne peut plus riposter.'}${!correct?' Ton mana est conservé.':''}`;$('continue').textContent=state.outcome?'Bilan du combat →':'Tour suivant →';panel('review-panel');focusPanel('review-panel');resolving=false;
 if(!wasFury&&intent(state).fury&&!state.outcome){battleEffect('rage');actorMotion('enemy','rage');}
 if(state.outcome)$('enemy').classList.toggle('defeated',state.outcome==='win');if(state.outcome)$('hero').classList.toggle('defeated',state.outcome==='lose');}
function continueTurn(){if(resolving)return;if(state.outcome){showResult();return;}if(index+1>=deck.length){$('result-kicker').textContent='FIN DES QUESTIONS';$('result-title').textContent='Combat interrompu';$('result-stats').textContent='Toutes les questions de cette série ont été jouées.';$('result-note').textContent='Relance un combat pour tenter à nouveau ta chance.';panel('result-panel');focusPanel('result-panel');return;}index++;state=next(state);$('battle-call').textContent='';hud();panel('action-panel');focusPanel('action-panel');}
function showResult(){const win=state.outcome==='win';$('result-kicker').textContent=win?'GARDIEN VAINCU':'LE GARDIEN RÉSISTE';$('result-title').textContent=win?'Victoire !':'Défaite…';$('battle-call').textContent=win?'VICTOIRE':'DÉFAITE';$('result-stats').textContent=`${state.correct} / ${state.answers} bonnes réponses · ${state.turn} tours · ${state.hp} PV restants`;$('result-note').textContent=win?'La porte des braises s’ouvre. Tente un niveau de combat supérieur !':'Le souffle arrive tous les trois tours : une garde réussie réduit ses dégâts de 70 %. Soigne-toi avant de tomber.';panel('result-panel');focusPanel('result-panel');}
$('start').addEventListener('click',start);document.querySelectorAll('[data-action]').forEach(b=>b.addEventListener('click',()=>selectAction(b.dataset.action)));$('continue').addEventListener('click',continueTurn);$('replay').addEventListener('click',()=>{run++;clearInterval(timer);state=initial($('difficulty').value);hud();$('hero').className='fighter hero';$('enemy').className='fighter enemy';$('battle-call').textContent='';panel('setup');focusPanel('setup');});$('motion').addEventListener('click',()=>{const on=document.body.classList.toggle('motion-reduced');clearBattleEffect();$('motion').setAttribute('aria-pressed',String(on));$('motion').textContent=on?'Animations réduites':'Animations';wakeWorld();});
if(!document.fullscreenEnabled)$('fullscreen').hidden=true;else $('fullscreen').addEventListener('click',async()=>{try{if(document.fullscreenElement)await document.exitFullscreen();else await $('game').requestFullscreen();}catch{$('fullscreen').hidden=true;}});
addEventListener('pagehide',()=>{run++;clearInterval(timer)});addEventListener('pageshow',e=>{if(e.persisted&&state.phase==='question'){resolving=false;tick();if(state.phase==='question'&&!resolving)timer=setInterval(tick,150);}});
$('help').addEventListener('click',()=>{const open=$('help-panel').hidden;$('help-panel').hidden=!open;$('help').setAttribute('aria-expanded',String(open));if(open)$('close-help').focus();});
$('close-help').addEventListener('click',()=>{$('help-panel').hidden=true;$('help').setAttribute('aria-expanded','false');$('help').focus();});
const actionHints={attack:'40 dégâts et 8 PM récupérés si tu réponds juste.',guard:'18 dégâts. Réduit de 70 % la riposte et récupère 6 PM.',heal:'Récupère jusqu’à 42 PV avant la riposte. Coût : 12 PM.',spell:'Inflige 70 dégâts. Coût : 16 PM.'};
document.querySelectorAll('[data-action]').forEach(b=>{for(const event of ['mouseenter','focus'])b.addEventListener(event,()=>{$('action-description').textContent=b.disabled?b.title:actionHints[b.dataset.action];});});
addEventListener('keydown',e=>{if(e.repeat)return;if(['SELECT','INPUT','TEXTAREA'].includes(document.activeElement?.tagName))return;if(e.key==='Escape'&&!$('help-panel').hidden){$('close-help').click();return;}if(!$('help-panel').hidden||resolving)return;const n=Number(e.key)-1;if(n>=0&&n<4){if(state.phase==='question'){$('answers').children[n]?.click();e.preventDefault();}else if(state.phase==='action'&&!$('action-panel').hidden){document.querySelectorAll('[data-action]')[n]?.click();e.preventDefault();}}});
panel('setup');
// Prepare local art on arrival; a failed load remains retryable from the start button.
sprites().then(()=>{assetsReady=true}).catch(()=>{$('load-error').textContent='Le décor n’a pas chargé. Le bouton de combat permettra de réessayer.';});
