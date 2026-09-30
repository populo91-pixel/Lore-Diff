const DURATIONS=[2,4,7,12], HISTORY_KEY="loreDiffOSTHistoryV1";
const $=selector=>document.querySelector(selector);
const el={form:$("#soundForm"),input:$("#soundInput"),submit:$("#soundSubmit"),suggestions:$("#soundSuggestions"),message:$("#soundMessage"),source:$("#soundSource"),play:$("#playSound"),duration:$("#soundDuration"),deck:$("#soundDeck"),disc:$("#soundDisc"),code:$("#soundCode"),round:$("#roundCount"),score:$("#scoreCount"),mistakes:$("#mistakeCount"),meter:$("#soundMeter"),hint:$("#soundHint"),result:$("#soundResult"),resultImage:$("#soundResultImage"),resultLabel:$("#soundResultLabel"),resultTitle:$("#soundResultTitle"),track:$("#soundTrack"),storeLink:$("#soundStoreLink"),next:$("#soundNext"),complete:$("#soundComplete"),finalScore:$("#soundFinalScore"),restart:$("#soundRestart"),newRun:$("#newRunButton"),retry:$("#soundRetry"),skip:$("#soundSkip"),other:$("#soundOtherModes"),intro:$("#soundIntro"),attribution:$("#soundAttribution")};
const normalize=s=>s.normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9]/gi,"").toLowerCase();
function shuffle(items){const a=[...items];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}
function history(){try{const v=JSON.parse(localStorage.getItem(HISTORY_KEY)||"[]");return Array.isArray(v)?v.filter(Number.isFinite).slice(-5):[]}catch{return []}}
function remember(id){try{localStorage.setItem(HISTORY_KEY,JSON.stringify([...history().filter(x=>x!==id),id].slice(-5)))}catch{}}
// Only installed, explicitly configured files can enter a run. No catalogue searches.
function validSource(s){return s && typeof s.src==="string" && /^\/audio\/soundcheck\/[a-z0-9_-]+\.(mp3|m4a|ogg|wav)$/i.test(s.src) && Number.isFinite(s.startSeconds??0) && (s.startSeconds??0)>=0 && typeof s.attribution==="string" && s.attribution.trim() && typeof s.sourceUrl==="string" && /^https:\/\//.test(s.sourceUrl)}
let tracks=[],available=[],sources={},pool=[],current,sample,round=0,total=0,score=0,wrong=0,level=0,locked=true,loading=false,played=false,loadToken=0,playToken=0,stopTimer,cancelLoad,playing=false;
function stats(){el.round.textContent=total?`${Math.min(round+1,total)} / ${total}`:"—";el.score.textContent=String(score).padStart(4,"0");el.mistakes.textContent=wrong;el.duration.textContent=`${DURATIONS[level]} SEC`;el.code.textContent=total?String(round+1).padStart(2,"0"):"—";[...el.meter.children].forEach((e,i)=>e.classList.toggle("on",i<=level))}
function controls(){el.play.disabled=loading||locked;el.submit.disabled=loading||locked||!played;el.hint.disabled=loading||locked||!played||level===3;el.input.disabled=loading||locked;el.newRun.disabled=!available.length}
function stop(){++playToken;playing=false;clearTimeout(stopTimer);el.source.pause();el.deck.classList.remove("playing");el.disc.classList.remove("playing");if(!loading&&!locked)el.play.textContent=played?"RÉÉCOUTER L’EXTRAIT":"ÉCOUTER L’OST"}
function failed(message){stop();loading=false;locked=true;controls();el.message.textContent=message;el.play.textContent="EXTRAIT INDISPONIBLE";el.retry.hidden=false;el.skip.hidden=!pool.length;el.other.hidden=false}
function empty(message){++loadToken;cancelLoad?.();stop();loading=false;locked=true;current=null;sample=null;el.source.removeAttribute("src");el.source.load();el.result.hidden=true;el.complete.hidden=true;el.suggestions.hidden=true;el.retry.hidden=true;el.skip.hidden=true;el.other.hidden=false;controls();el.message.textContent=message;el.play.textContent="EXTRAITS INDISPONIBLES";el.round.textContent="—";el.code.textContent="—"}
function matches(track,text){return [track.name,...track.aliases].some(s=>normalize(s)===normalize(text))}
function suggestions(){const q=normalize(el.input.value);el.suggestions.replaceChildren();el.suggestions.hidden=!q||locked;if(!q||locked)return;tracks.filter(t=>[t.name,...t.aliases].some(s=>normalize(s).includes(q))).forEach(t=>{const b=document.createElement("button");b.type="button";b.className="media-suggestion";b.textContent=t.name;b.addEventListener("click",()=>{el.input.value=t.name;el.suggestions.hidden=true;el.input.focus()});el.suggestions.append(b)})}
function metadata(token){return new Promise((resolve,reject)=>{
  const finish=err=>{clearTimeout(timer);el.source.removeEventListener("loadedmetadata",ready);el.source.removeEventListener("error",fail);if(cancelLoad===cancel)cancelLoad=null;err?reject(err):resolve()};
  const cancel=()=>finish(new Error("Chargement annulé."));
  const ready=()=>{if(token!==loadToken)return cancel();const end=(sample.startSeconds??0)+12;finish(Number.isFinite(el.source.duration)&&el.source.duration>=end?null:new Error("Cet extrait est trop court ou illisible. Passe au suivant sans pénalité."))};
  const fail=()=>finish(new Error("Ce morceau ne peut pas être chargé. Réessaie ou passe sans pénalité."));
  const timer=setTimeout(fail,6000);cancelLoad=cancel;
  el.source.addEventListener("loadedmetadata",ready,{once:true});el.source.addEventListener("error",fail,{once:true});el.source.load();
})}
async function loadCurrent(){
  if(!current)return;
  const token=++loadToken;cancelLoad?.();stop();loading=true;locked=true;played=false;
  sample=sources[current.id];controls();el.retry.hidden=true;el.skip.hidden=true;el.other.hidden=true;el.message.textContent="";el.play.textContent="CHARGEMENT DE L’OST…";
  try{if(!validSource(sample))throw new Error("Aucun extrait disponible pour ce morceau.");el.source.src=sample.src;await metadata(token);if(token!==loadToken)return;loading=false;locked=false;controls();el.play.textContent="ÉCOUTER L’OST"}
  catch(error){if(token===loadToken)failed(error.message)}
}
async function play(){
  if(loading||locked||playing)return;stop();const token=loadToken,attempt=playToken;
  el.source.currentTime=sample.startSeconds??0;
  // Prevent a stalled play() promise from leaving an endless loading state.
  const watchdog=setTimeout(()=>{if(token===loadToken&&attempt===playToken){stop();el.message.textContent="La lecture ne démarre pas. Réessaie ou passe sans pénalité.";el.retry.hidden=false;el.skip.hidden=!pool.length}},6000);
  try{await el.source.play();if(token!==loadToken||attempt!==playToken){if(token===loadToken)el.source.pause();return}playing=true;played=true;remember(current.id);controls();el.message.textContent="";el.deck.classList.add("playing");el.disc.classList.add("playing");el.play.textContent="LECTURE…";stopTimer=setTimeout(stop,(DURATIONS[level]+6)*1000)}
  catch{if(token===loadToken&&attempt===playToken){stop();el.message.textContent="Lecture bloquée. Appuie à nouveau sur ÉCOUTER."}}
  finally{clearTimeout(watchdog)}
}
// Measure played audio, not wall-clock time: buffering must not shorten the clue.
el.source.addEventListener("timeupdate",()=>{if(playing&&el.source.currentTime>=(sample.startSeconds??0)+DURATIONS[level])stop()});
el.source.addEventListener("error",()=>{if(!loading&&!locked&&current)failed("La lecture a été interrompue. Réessaie ou passe sans pénalité.")});
function reveal(success){
  locked=true;stop();if(success)score+=Math.max(100,1100-level*210-wrong*130);stats();controls();el.suggestions.hidden=true;el.retry.hidden=true;el.skip.hidden=true;
  el.result.classList.toggle("wrong",!success);el.resultLabel.textContent=success?"OST RECONNUE":"C’ÉTAIT…";el.resultTitle.textContent=current.name;el.track.textContent=current.track+" — "+current.artist;
  el.resultImage.hidden=true;el.attribution.textContent=sample.attribution;el.storeLink.href=sample.sourceUrl;el.next.textContent=round===total-1?"RÉSULTAT":"SUIVANT";el.result.hidden=false;
}
function hint(mistake=false){if(locked||loading||!played)return;stop();if(mistake)wrong++;if(wrong>=4){reveal(false);return}level=Math.min(3,level+1);stats();controls();el.message.textContent=(mistake?"Pas ce jeu. ":"")+`L’extrait dure maintenant ${DURATIONS[level]} secondes.`}
function startRound(){stop();current=pool.shift();wrong=0;level=0;el.input.value="";el.suggestions.hidden=true;el.result.hidden=true;el.complete.hidden=true;stats();if(!current){empty("Aucun autre extrait disponible dans cette série. Tu peux relancer ou choisir un autre mode.");return}loadCurrent()}
function startRun(){const recent=new Set(history());pool=[...shuffle(available.filter(t=>!recent.has(t.id))),...shuffle(available.filter(t=>recent.has(t.id)))];round=0;score=0;total=Math.min(5,available.length);if(!total){stats();empty("Les extraits audio ne sont pas disponibles pour le moment. Tu peux jouer aux autres modes.");return}el.intro.textContent=`${total} manche${total>1?"s":""}. Retrouve le jeu en 2, 4, 7 ou 12 secondes.`;startRound()}
el.form.addEventListener("submit",e=>{e.preventDefault();if(locked||loading||!played)return;const known=tracks.find(t=>matches(t,el.input.value));if(!known){el.message.textContent="Choisis un jeu dans les suggestions.";return}known.id===current.id?reveal(true):hint(true);el.input.value="";el.suggestions.hidden=true});
el.input.addEventListener("input",suggestions);
el.input.addEventListener("keydown",e=>{if(e.key==="Escape")el.suggestions.hidden=true;if(e.key==="ArrowDown"){e.preventDefault();el.suggestions.querySelector("button")?.focus()}});
el.suggestions.addEventListener("keydown",e=>{if(e.key==="ArrowDown"||e.key==="ArrowUp"){e.preventDefault();const buttons=[...el.suggestions.children],i=buttons.indexOf(document.activeElement);if(buttons.length)buttons[(i+(e.key==="ArrowDown"?1:-1)+buttons.length)%buttons.length]?.focus()}if(e.key==="Escape"){el.suggestions.hidden=true;el.input.focus()}});
document.addEventListener("click",e=>{if(!e.target.closest(".media-search"))el.suggestions.hidden=true});
el.play.addEventListener("click",play);el.hint.addEventListener("click",()=>hint());el.retry.addEventListener("click",loadCurrent);el.skip.addEventListener("click",()=>{total=Math.min(total,round+pool.length);startRound()});
el.next.addEventListener("click",()=>{round++;if(round>=total){stop();el.result.hidden=true;el.complete.hidden=false;const ratio=score/(total*1100);el.finalScore.textContent=`${score} POINTS · RANG ${ratio>=.7?"S":ratio>=.5?"A":ratio>=.3?"B":"C"}`;return}startRound()});
el.restart.addEventListener("click",startRun);el.newRun.addEventListener("click",startRun);el.source.addEventListener("ended",stop);document.addEventListener("visibilitychange",()=>{if(document.hidden)stop()});window.addEventListener("pagehide",()=>{++loadToken;cancelLoad?.();stop()});
async function catalogue(){
  controls();
  try{const data=await Promise.all(["./sound-tracks.json","./sound-sources.json"].map(async url=>{const r=await fetch(url,{signal:AbortSignal.timeout(5000),cache:"no-store"});if(!r.ok)throw new Error();return r.json()}));
    if(!Array.isArray(data[0])||!data[1]||Array.isArray(data[1])||typeof data[1]!=="object")throw new Error();
    tracks=data[0];sources=data[1];available=tracks.filter(t=>validSource(sources[t.id]));startRun();
  }catch{empty("Le catalogue ne peut pas être chargé. Recharge la page ou choisis un autre mode.")}
}
catalogue();
