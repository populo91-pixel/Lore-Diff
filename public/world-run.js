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
