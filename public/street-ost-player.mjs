// A fresh controller per clue prevents audio continuing after a guess or tab change.
export function createOstPlayer({src,seconds,onHeard=()=>{},onSkip}){
 const root=document.createElement('div');root.className='ost-console';
 root.innerHTML='<span class="eyebrow">THÈME MYSTÈRE</span><div class="voice-wave" aria-hidden="true"></div><div class="ost-lengths" aria-label="Durée débloquée"></div><button type="button" class="listen">Écouter</button><p class="audio-status" role="status">Lance l’extrait, puis propose un combattant.</p><button type="button" class="ost-skip" hidden>Autre morceau · sans pénalité</button>';
 const wave=root.querySelector('.voice-wave'),play=root.querySelector('.listen'),status=root.querySelector('.audio-status'),skip=root.querySelector('.ost-skip');
 for(let i=0;i<19;i++){const bar=document.createElement('i');bar.style.setProperty('--h',`${20+(i*37)%80}%`);bar.style.setProperty('--delay',`${i*-.07}s`);wave.append(bar)}
 for(const n of [3,6,10,15]){const label=document.createElement('span');label.textContent=n+' s';label.className=n===seconds?'current':n<seconds?'unlocked':'';root.querySelector('.ost-lengths').append(label)}
 const audio=new Audio();audio.preload='none';let disposed=false,timer=null,loading=null,started=false;
 const clear=()=>{clearInterval(timer);clearTimeout(loading);timer=loading=null};
 const idle=()=>{clear();wave.classList.remove('playing');play.disabled=false;play.textContent=`Réécouter · ${seconds} s`};
 const fail=()=>{if(disposed)return;audio.pause();audio.removeAttribute('src');audio.load();idle();play.textContent='Réessayer';status.textContent='Cet extrait ne charge pas. Réessaie ou change de morceau sans perdre d’essai.';skip.hidden=!onSkip};
 const finish=()=>{audio.pause();idle();status.textContent='À toi de trouver le combattant.'};
 audio.onplaying=()=>{if(disposed)return;clearTimeout(loading);wave.classList.add('playing');play.disabled=false;play.textContent='Pause';status.textContent=`Écoute · ${seconds} secondes`;if(!started){started=true;onHeard()}clearInterval(timer);timer=setInterval(()=>{if(audio.currentTime>=seconds)finish()},60)};
 audio.ontimeupdate=()=>{if(audio.currentTime>=seconds)finish()};audio.onended=finish;audio.onerror=fail;
 audio.onpause=()=>{if(!disposed)idle()};audio.onwaiting=()=>{wave.classList.remove('playing');status.textContent='Chargement de l’extrait…';clearTimeout(loading);loading=setTimeout(fail,8000)};
 play.textContent=`Écouter · ${seconds} s`;
 play.onclick=async()=>{if(disposed)return;if(!audio.paused){audio.pause();status.textContent='En pause. Relance l’extrait quand tu veux.';return}play.disabled=true;play.textContent='Chargement…';skip.hidden=true;clearTimeout(loading);loading=setTimeout(fail,8000);try{if(!audio.src)audio.src=src;audio.currentTime=0;await audio.play();if(disposed)audio.pause()}catch{fail()}};
 skip.onclick=()=>{dispose();onSkip?.()};
 function dispose(){disposed=true;clear();audio.onplaying=audio.onpause=audio.onended=audio.onerror=audio.ontimeupdate=audio.onwaiting=null;audio.pause();audio.removeAttribute('src');audio.load()}
 return {element:root,dispose};
}
