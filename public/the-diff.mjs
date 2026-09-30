const $=id=>document.getElementById(id);
let run=null,player=null,busy=false;
const fmt=n=>new Intl.NumberFormat('fr-FR').format(n||0);
const visible=(id,yes)=>{$(id).hidden=!yes};
const el=(tag,text,cls)=>{const n=document.createElement(tag);if(text!==undefined)n.textContent=text;if(cls)n.className=cls;return n};
const button=(text,action,cls)=>{const b=el('button',text,cls);b.type='button';b.onclick=action;return b};
async function api(body){const controller=new AbortController(),timeout=setTimeout(()=>controller.abort(),8000);try{const r=await fetch('/api/diff',{method:body?'POST':'GET',headers:body?{'Content-Type':'application/json'}:undefined,body:body?JSON.stringify(body):undefined,signal:controller.signal});const data=await r.json();if(!r.ok)throw Error(data.error||'Le serveur ne répond pas.');return data}finally{clearTimeout(timeout)}}
async function task(action,extra={}){
 if(busy)return;busy=true;$('error').hidden=true;document.querySelector('main').inert=true;
 try{const data=await api(action?{action,id:run?.id,version:run?.version,...extra}:undefined);run=data.run;player=data.profile;render()}
 catch(e){$('error').replaceChildren(el('p',e.name==='AbortError'?'Le serveur tarde à répondre. Ta progression reste sauvegardée.':e.message||'Réessaie.'),button('RECHARGER LA PARTIE',()=>task()));$('error').hidden=false}
 finally{busy=false;document.querySelector('main').inert=false}
}
function stats(target,items,names){const box=$(target);box.replaceChildren();for(const item of items){const row=el('div',undefined,'stat'),head=el('span'),name=el('b',names[item.key]||item.key),score=el('small',`${item.correct} / ${item.played}`),track=el('div',undefined,'stat-track'),bar=el('i');head.append(name,score);bar.style.width=`${Math.round(item.correct/item.played*100)}%`;track.append(bar);row.append(head,track);box.append(row)}}
function mechanics(q){
 const stage=$('mechanic-stage');stage.replaceChildren();stage.className='mechanic-stage '+q.mechanic;
 if(q.mechanic==='deduction'){
  const cards=el('div',undefined,'clue-cards');
  for(let i=0;i<3;i++){const card=el('div',undefined,'clue-card'+(i<q.clues.length?' opened':''));card.append(el('small',`INDICE ${i+1}`),el('p',q.clues[i]||'DOSSIER SCELLÉ'));cards.append(card)}
  stage.append(cards);if(q.canClue)stage.append(button(`OUVRIR UN INDICE · −${50*run.multiplier} PTS${run.index>=6?' · 1 AIDE':''}`,()=>task('clue'),'clue-open'));
 }
 if(q.mechanic==='association'){
  let selected=q.confirmed?1:0;const placed=[null,null,null];if(q.confirmed)placed[q.confirmed.row]=q.confirmed.target;
  const help=el('p','Choisis un élément à gauche, puis son partenaire. Relie les trois avant de valider.','link-help');
  const layout=el('div',undefined,'link-layout'),left=el('div',undefined,'link-left'),right=el('div',undefined,'link-right');
  const submit=button('VALIDER LES 3 LIENS',()=>task('answer',{order:placed}),'primary');
  const status=el('p',undefined,'link-status');status.setAttribute('aria-live','polite');
  function draw(){left.replaceChildren();right.replaceChildren();q.left.forEach((label,i)=>{const b=button('',()=>{if(q.confirmed?.row===i)return;selected=i;draw()},'link-row'+(selected===i?' selected':'')+(placed[i]!==null?' linked':''));b.append(el('b',`${i+1}. ${label}`),el('span',placed[i]===null?'CHOISIR SON PARTENAIRE':q.targets[placed[i]]));b.setAttribute('aria-pressed',String(selected===i));if(q.confirmed?.row===i){b.disabled=true;b.append(el('small','LIEN CONFIRMÉ'))}left.append(b)});q.targets.forEach((label,i)=>{const assigned=placed.indexOf(i);const b=button(label,()=>{if(selected===null)return;const old=placed.indexOf(i);if(old!==-1)placed[old]=null;placed[selected]=i;selected=placed.findIndex(x=>x===null);if(selected===-1)selected=null;draw()},'link-target'+(assigned>=0?' assigned':''));b.disabled=(q.confirmed?.target===i)||selected===null;b.setAttribute('aria-label',assigned>=0?`${label}, relié au numéro ${assigned+1}`:label);right.append(b)});submit.disabled=placed.some(x=>x===null);status.textContent=selected===null?'Les trois liens sont prêts. Tu peux les modifier avant de valider.':`Relie : ${q.left[selected]}.`}
  layout.append(left,right);stage.append(help,layout,status);if(q.canClue)stage.append(button(`CONFIRMER UN LIEN · −${50*run.multiplier} PTS${run.index>=6?' · 1 AIDE':''}`,()=>task('clue'),'clue-open'));stage.append(submit);draw();
 }
}
function render(){
 const phase=run?.phase||'lobby';visible('lobby',phase==='lobby');visible('game',['question','feedback','decision'].includes(phase));visible('question',phase==='question');visible('feedback',phase==='feedback');visible('decision',phase==='decision');visible('finish',phase==='finished');visible('dna',!!player?.runs);visible('sector',phase==='question');
 $('record').textContent=player?.runs?String(player.record).padStart(2,'0'):'—';$('best').textContent=player?.runs?`${player.runs} RUN${player.runs>1?'S':''} · ${fmt(player.bestScore)} PTS`:'PREMIÈRE EXPÉDITION';
 if(player?.runs){stats('universe-stats',player.universes,{wow:'Azeroth',pokemon:'Pokémon',runeterra:'Runeterra'});stats('skill-stats',player.skills,{});$('dna-note').textContent=`${player.runs} run${player.runs>1?'s':''} terminée${player.runs>1?'s':''} sur ce navigateur. Seules les épreuves The Diff alimentent ce relevé pour l’instant.`}
 if(!run)return;
 $('depth').textContent=`${String(Math.min(run.index+1,12)).padStart(2,'0')} / 12`;$('lives').textContent='♥ '.repeat(run.lives)+'♡ '.repeat(3-run.lives);$('score').textContent=`${fmt(run.score)} / ${fmt(run.secured)}`;$('multiplier').textContent=`×${run.multiplier}`;
 $('rail').replaceChildren(...Array.from({length:12},(_,i)=>el('i',undefined,i<run.index?'done':i===run.index?'active':'')));
 if(phase==='question'){
  const q=run.question,limited=run.rulesVersion>=2&&run.index>=6,hasFree=['deduction','recall'].includes(q.mechanic);
  const names=['DÉPART','DÉDUCTION','SOUS PRESSION','MAÎTRISE'],level={easy:'ACCESSIBLE',normal:'CONFIRMÉ',expert:'EXPERT'},kind={deduction:'DÉDUCTION',intruder:'INTRUS',association:'ASSOCIATION',recall:'RAPPEL'};
  $('sector').textContent=`SECTEUR ${Math.floor(run.index/3)+1} · ${names[Math.floor(run.index/3)]} · ${q.difficulty?level[q.difficulty]+' · ':''}${limited?run.hints+' AIDE'+(run.hints>1?'S':'')+' RESTANTE'+(run.hints>1?'S':''):'INDICES À LA DEMANDE'} · ${fmt(run.score-run.secured)} PTS EN JEU`;
  $('world').textContent=q.world;$('skill').textContent=kind[q.mechanic]+' / '+q.skill;$('trial-number').textContent=String(run.index+1).padStart(2,'0');$('prompt').textContent=q.prompt;mechanics(q);
  visible('answer-early',hasFree&&!run.choices);visible('reveal',hasFree&&!run.choices&&(!limited||run.hints>0));visible('choices',!!q.options);
  const freePoints=Math.max(50,200-(q.clueCount||0)*50)*run.multiplier,choicePoints=(q.mechanic==='deduction'?Math.max(50,100-(q.clueCount||0)*50):100)*run.multiplier;
  $('free-label').textContent=`SANS LES CHOIX · ${fmt(freePoints)} PTS`;
  $('reveal').textContent=`VOIR LES CHOIX · ${fmt(choicePoints)} PTS${limited?' · 1 AIDE':''}`;
  $('choices').classList.toggle('intruder-options',q.mechanic==='intruder');
  if(q.options){$('choices').replaceChildren(...q.options.map((value,i)=>{const b=button('',()=>task('answer',{choice:i}));b.append(el('b',q.mechanic==='intruder'?`DOSSIER ${i+1}`:'ABCD'[i]),el('span',value));return b}))}else $('free-answer').value='';
 }
 if(phase==='feedback'){const f=run.feedback;$('verdict').textContent=f.correct?`VALIDÉ · +${fmt(f.earned)} POINTS`:`ERREUR · ${run.lives} VIE${run.lives>1?'S':''} RESTANTE${run.lives>1?'S':''}`;$('answer').textContent=f.answer;$('fact').textContent=f.fact;$('next').textContent=run.lives===0?'VOIR LE RÉSULTAT':run.index===12?'EXTRACTION':run.index%3===0?'CHOISIR LA SUITE':'ÉPREUVE SUIVANTE';window.LoreFX?.beat(f.correct?'correct':'wrong',{points:f.earned})}
 if(phase==='decision'){
  const floor=run.rulesVersion>=2?(run.index===6?Math.max(run.secured,Math.floor(run.score/2)):run.secured):run.score;
  $('risk-description').textContent=run.rulesVersion>=2?(run.index===6?'Checkpoint : la moitié de ton score sera protégée si tu continues. Le reste reste en jeu.':'Encaisse tout maintenant, ou continue. Une défaite te fera perdre les points encore en jeu.'):'Cette partie conserve ses règles initiales : continuer protège le score actuel.';
  $('risk-stats').replaceChildren(...[`ENCAISSER : ${fmt(run.score)} PTS`,`DÉFAITE APRÈS CONTINUATION : ${fmt(floor)} PTS`,`À RISQUER : ${fmt(run.score-floor)} PTS`,`PROCHAIN SECTEUR : ×${run.multiplier+1}`].map(label=>el('b',label)));$('next-multi').textContent=`×${run.multiplier+1}`;window.LoreFX?.beat('round',{label:'CHOIX DU SECTEUR'});
 }
 if(phase==='finished'){const e=run.ending;$('ending-label').textContent=e==='defeat'?'RUN INTERROMPUE':e==='bank'?'SCORE SÉCURISÉ':'EXPÉDITION COMPLÈTE';$('final-depth').textContent=String(run.depth).padStart(2,'0');$('ending-title').textContent=e==='defeat'?'La Diff t’a trouvé.':e==='bank'?'Tu connais ta limite.':'Tu as traversé les 12 paliers.';$('final-score').textContent=`${fmt(run.score)} points conservés · ${run.depth} paliers traversés`;$('record-note').textContent=`Diff Record : ${player.record}. Ton relevé est sauvegardé sur ce navigateur.`;showResult(run.review||[]);window.LoreFX?.beat('finish',{detail:`Diff ${run.depth}`})}
}
function showResult(marks){const groups=new Map();for(const m of marks){const key=m.world+'|'+m.skill,g=groups.get(key)||{world:m.world,skill:m.skill,total:0,right:0};g.total++;g.right+=Number(m.correct);groups.set(key,g)}const list=[...groups.values()],strong=[...list].filter(g=>g.right>0).sort((a,b)=>b.right/b.total-a.right/a.total||b.total-a.total)[0],weak=[...list].filter(g=>g.right<g.total).sort((a,b)=>a.right/a.total-b.right/b.total||b.total-a.total)[0],names={wow:'Azeroth',pokemon:'Pokémon',runeterra:'Runeterra'};const box=$('run-summary');box.replaceChildren();for(const [title,g] of [['POINT FORT SUR CETTE RUN',strong],['À TRAVAILLER',weak]]){const card=el('div');card.append(el('small',title),el('p',g?`${names[g.world]} · ${g.skill} : ${g.right}/${g.total}`:title==='À TRAVAILLER'?'Aucune erreur sur cette run.':'Aucune bonne réponse sur cette run.'));box.append(card)}const target=weak||strong;visible('training',!!target);if(target){$('training').href={wow:'/run.html',pokemon:'/play/pokemon',runeterra:'/play/runeterra'}[target.world];$('training').textContent=`M’ENTRAÎNER SUR ${names[target.world].toUpperCase()} →`}$('review-list').replaceChildren(...marks.filter(m=>!m.correct).map(m=>{const article=el('article');article.append(el('h3',m.prompt),el('p','RÉPONSE : '+m.answer),el('p',m.fact));return article}));visible('review',marks.some(m=>!m.correct))}
$('skip').onclick=()=>task('skip');$('start').onclick=()=>task('start');$('again').onclick=()=>{run=null;task('start')};$('reveal').onclick=()=>task('reveal');$('submit-free').onclick=()=>{const text=$('free-answer').value.trim();if(text)task('answer',{text})};$('free-answer').onkeydown=e=>{if(e.key==='Enter')$('submit-free').click()};$('next').onclick=()=>task('next');$('bank').onclick=()=>task('decide',{decision:'bank'});$('push').onclick=()=>task('decide',{decision:'push'});task();
