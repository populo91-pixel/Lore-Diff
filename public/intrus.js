import {makeRun,Run} from './intrus-engine.mjs';
const $=id=>document.getElementById(id);
const KEY='loreDiffIntrusV1';
function readSaved(){try{const v=JSON.parse(localStorage.getItem(KEY)||'{}');return {best:Number.isFinite(v.best)&&v.best>=0?v.best:0,recent:Array.isArray(v.recent)?v.recent.filter(Number.isInteger).slice(-20):[]}}catch{return {best:0,recent:[]}}}
let saved=readSaved(),game=null,startedAt=0,hiddenAt=null,hiddenDuration=0,recordBefore=0;
function save(){try{localStorage.setItem(KEY,JSON.stringify(saved))}catch{/* Storage is optional; the game remains playable. */}}
function number(n){return n.toLocaleString('fr-FR')}
function updateStats(){ $('round').textContent=`${game.index+1} / 5`;$('lives').textContent=`${game.lives} / 3`;$('lives').setAttribute('aria-label',`${game.lives} vie${game.lives>1?'s':''} restante${game.lives>1?'s':''}`);$('score').textContent=number(game.score);$('streak').textContent=game.streak;
  $('progress').replaceChildren();for(let i=0;i<5;i++){const span=document.createElement('span');span.className=game.answers[i]?(game.answers[i].correct?'correct':'wrong'):i===game.index?'current':'';span.setAttribute('aria-label',`Manche ${i+1} : ${game.answers[i]?(game.answers[i].correct?'réussie':'ratée'):i===game.index?'en cours':'à venir'}`);$('progress').append(span)}
}
function rememberQuestion(id){saved.recent=[...saved.recent.filter(x=>x!==id),id].slice(-20);save()}
function showQuestion(){
  updateStats();const q=game.current;rememberQuestion(q.id);$('category').textContent=q.category.toUpperCase();$('difficulty').textContent=['ÉCHAUFFEMENT','ON MONTE D’UN CRAN','DERNIÈRE MANCHE'][q.tier-1];$('prompt').textContent=q.prompt;
  $('choices').replaceChildren();$('feedback').hidden=true;$('next').hidden=true;$('roundNote').textContent='Prends ton temps. Seul le bonus de rapidité diminue.';
  q.options.forEach((option,index)=>{const b=document.createElement('button');b.type='button';b.className='choice';b.dataset.choice=option;b.setAttribute('aria-label',`${index+1}. ${option}`);const key=document.createElement('span');key.className='choice-key';key.setAttribute('aria-hidden','true');key.textContent=index+1;const copy=document.createElement('span');copy.className='choice-copy';copy.textContent=option;b.append(key,copy);b.addEventListener('click',()=>choose(option));$('choices').append(b)});
  window.LoreFX?.beat('round',{reset:game.index===0,label:game.index===4?'DERNIÈRE MANCHE':`MANCHE ${game.index+1} / 5`});
  startedAt=performance.now();hiddenDuration=0;hiddenAt=document.hidden?startedAt:null;$('prompt').focus({preventScroll:true});$('arena').scrollIntoView({block:'start',behavior:'instant'});
}
function start(){recordBefore=saved.best;game=new Run(makeRun(saved.recent));$('welcome').hidden=true;$('finish').hidden=true;$('arena').hidden=false;showQuestion()}
function choose(option){
  if(!game||game.locked||document.hidden)return;
  const elapsed=Math.max(0,performance.now()-startedAt-hiddenDuration);const result=game.answer(option,elapsed);if(!result)return;updateStats();window.LoreFX?.beat(result.correct?'correct':'wrong',{points:result.earned,streak:game.streak,detail:`${game.lives} vie(s) restante(s).`});
  for(const b of $('choices').children){b.disabled=true;const correct=b.dataset.choice===game.current.answer,selected=b.dataset.choice===option;b.classList.add(correct?'correct':selected?'wrong':'muted');if(correct||selected){const tag=document.createElement('span');tag.className='choice-tag';tag.textContent=correct?'✓ L’INTRUS':'✕ TON CHOIX';b.querySelector('.choice-copy').append(tag)}}
  $('feedback').hidden=false;$('feedback').classList.toggle('wrong',!result.correct);$('verdict').textContent=result.correct?'BIEN VU.':`L’INTRUS ÉTAIT : ${game.current.answer}`;$('explanation').textContent=game.current.explanation;
  $('earned').textContent=result.correct?`+${number(result.earned)} points · ${number(result.bonus.base)} + rapidité ${result.bonus.speed} + série ${result.bonus.series}`:'−1 vie · Aucun point retiré';
  $('next').textContent=game.done?'VOIR LE RÉSULTAT →':'MANCHE SUIVANTE →';$('next').hidden=false;$('roundNote').textContent=game.done?'La partie est terminée.':'Une seule réponse par manche.';$('next').focus({preventScroll:true});
}
function finish(){
  window.LoreFX?.beat(game.lives===0?'end':'finish',{label:game.score>recordBefore?'NOUVEAU RECORD !':game.lives===0?'PLUS DE VIES':'RUN TERMINÉ',detail:`${number(game.score)} points`});
  $('arena').hidden=true;$('finish').hidden=false;const correct=game.answers.filter(a=>a.correct).length;
  $('finishLabel').textContent=game.lives===0?'PLUS DE VIES / FIN DE PARTIE':'CINQ MANCHES / TERMINÉ';$('finishTitle').textContent=correct===5?'SANS FAUTE.':game.lives===0?'BIEN TENTÉ.':'BIEN JOUÉ.';$('finalScore').textContent=number(game.score);$('summary').textContent=`${correct} bonne${correct>1?'s':''} réponse${correct>1?'s':''} sur ${game.answers.length} · Meilleure série : ${game.bestStreak} · ${game.lives} vie${game.lives>1?'s':''} restante${game.lives>1?'s':''}.`;
  $('newRecord').hidden=game.score<=recordBefore;saved.best=Math.max(saved.best,game.score);save();$('record').textContent=number(saved.best);$('review').replaceChildren();
  for(const result of game.answers){const li=document.createElement('li');const title=document.createElement('strong');title.textContent=`${result.correct?'✓':'✕'} ${result.question.category} — ${result.question.answer}`;const answer=document.createElement('p');answer.textContent=`Ton choix : ${result.choice} · ${number(result.earned)} points`;const explanation=document.createElement('p');explanation.textContent=result.question.explanation;li.append(title,answer,explanation);$('review').append(li)}
  $('finishTitle').focus({preventScroll:true});$('finish').scrollIntoView({block:'start',behavior:'instant'});
}
function next(){if(!game||!game.locked)return;if(game.done)finish();else if(game.next())showQuestion()}
$('start').addEventListener('click',start);$('replay').addEventListener('click',start);$('next').addEventListener('click',next);$('record').textContent=saved.best?number(saved.best):'—';
document.addEventListener('keydown',event=>{if(event.repeat||event.altKey||event.ctrlKey||event.metaKey||!game||$('arena').hidden)return;if(/^[1-4]$/.test(event.key)&&!game.locked){event.preventDefault();choose(game.current.options[Number(event.key)-1])}else if(event.key==='Enter'&&game.locked){event.preventDefault();next()}});
document.addEventListener('visibilitychange',()=>{if(!game||game.locked)return;if(document.hidden){hiddenAt=performance.now()}else if(hiddenAt!==null){hiddenDuration+=performance.now()-hiddenAt;hiddenAt=null}});
