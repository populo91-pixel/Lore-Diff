/* Shared, event-driven arcade feedback. No gameplay timers or score mutations. */
(() => {
  if (window.LoreFX) return;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let sound = false, motion = true, ctx, streak = 0, hideTimer;
  const animations = new Set();
  try { sound = localStorage.getItem('ld-arcade-sound') === 'on'; motion = localStorage.getItem('ld-arcade-motion') !== 'off'; } catch {}
  const style = document.createElement('link'); style.rel = 'stylesheet'; style.href = '/arcade-fx.css'; document.head.append(style);
  const dock = document.createElement('div'); dock.className = 'ld-fx-controls'; dock.setAttribute('aria-label', 'Ambiance arcade');
  const soundButton = document.createElement('button'), motionButton = document.createElement('button');
  soundButton.type = motionButton.type = 'button'; dock.append(soundButton, motionButton);
  const toast = document.createElement('div'); toast.className = 'ld-fx-toast'; toast.hidden = true; toast.setAttribute('role', 'status'); toast.setAttribute('aria-live', 'polite');
  const title = document.createElement('strong'), detail = document.createElement('span'); toast.append(title, detail);
  const sparks = document.createElement('div'); sparks.className = 'ld-fx-sparks'; sparks.setAttribute('aria-hidden', 'true');
  document.body.append(toast, sparks); const header=document.querySelector('header'); if(header)header.after(dock);else document.body.prepend(dock);
  const enabled = () => motion && !reduced.matches;
  function cancel() { for (const a of animations) a.cancel(); animations.clear(); sparks.replaceChildren(); }
  function sync() {
    document.documentElement.classList.toggle('ld-motion-off', !enabled());
    soundButton.textContent = sound ? 'SON ON' : 'SON OFF'; soundButton.setAttribute('aria-pressed', String(sound));
    motionButton.textContent = enabled() ? 'EFFETS ON' : 'EFFETS RÉDUITS'; motionButton.setAttribute('aria-pressed', String(enabled()));
    motionButton.title = reduced.matches ? 'Animations réduites selon les préférences de ton appareil' : 'Réduire les animations';
    if (!enabled()) cancel();
    window.dispatchEvent(new CustomEvent('lore:settings', { detail: { sound, motion: enabled() } }));
  }
  function tone(type) {
    if (!sound || document.hidden) return;
    try {
      ctx ??= new (window.AudioContext || window.webkitAudioContext)();
      ctx.resume().catch(() => {});
      const notes = type === 'finish' ? [392, 523, 659, 784] : type === 'correct' ? [523, 784] : type === 'wrong' ? [196, 147] : [330, 440];
      notes.forEach((frequency, i) => { const o=ctx.createOscillator(), g=ctx.createGain(), t=ctx.currentTime+i*.075; o.type='triangle';o.frequency.value=frequency;g.gain.setValueAtTime(.001,t);g.gain.linearRampToValueAtTime(.025,t+.012);g.gain.exponentialRampToValueAtTime(.001,t+.14);o.connect(g);g.connect(ctx.destination);o.onended=()=>{o.disconnect();g.disconnect()};o.start(t);o.stop(t+.15); });
    } catch { sound = false; sync(); }
  }
  soundButton.onclick = () => { sound=!sound;try{localStorage.setItem('ld-arcade-sound',sound?'on':'off')}catch{}sync();if(sound)tone('correct');else ctx?.suspend().catch(()=>{}); };
  motionButton.onclick = () => { motion=!motion;try{localStorage.setItem('ld-arcade-motion',motion?'on':'off')}catch{}sync(); };
  reduced.addEventListener('change', sync);
  function animate(node, frames, options={}) {
    if (!enabled() || !node?.animate) return;
    const a=node.animate(frames,{duration:350,easing:'cubic-bezier(.16,1,.3,1)',...options}); animations.add(a);a.onfinish=()=>animations.delete(a);a.oncancel=()=>animations.delete(a);
  }
  function enter(selector) {
    document.querySelectorAll(selector || '#answerGrid > *, #choices > *, .multi-answers > *, [data-arcade-answers] > *').forEach((n,i)=>animate(n,[{opacity:.35,transform:'translateY(12px)'},{opacity:1,transform:'translateY(0)'}],{delay:Math.min(i,7)*45,duration:300}));
  }
  function announce(head, sub, type) {
    clearTimeout(hideTimer);toast.hidden=false;toast.dataset.tone=type;title.textContent=head;detail.textContent=sub||'';
    animate(toast,[{opacity:0,transform:'translateY(-12px) scale(.96)'},{opacity:1,transform:'none'}]);
    hideTimer=setTimeout(()=>{toast.hidden=true},type==='finish'?2400:1400);
  }
  function burst() {
    if (!enabled()) return;
    sparks.replaceChildren();
    for(let i=0;i<18;i++){const n=document.createElement('i');sparks.append(n);const angle=i*Math.PI*2/18, distance=90+(i%4)*32;const a=n.animate([{transform:'translate(0,0) rotate(0deg)',opacity:1},{transform:`translate(${Math.cos(angle)*distance}px,${Math.sin(angle)*distance}px) rotate(${i*42}deg)`,opacity:0}],{duration:700+(i%3)*100,easing:'cubic-bezier(.1,.6,.3,1)'});animations.add(a);a.onfinish=()=>{animations.delete(a);n.remove()};a.oncancel=()=>{animations.delete(a);n.remove()};}
  }
  function beat(type, data={}) {
    if(document.hidden)return;
    if(type==='round') {
      if(data.reset)streak=0;
      clearTimeout(hideTimer);toast.hidden=true;cancel();requestAnimationFrame(()=>enter(data.selector));
      if(data.label)announce(data.label,data.detail||'À toi de jouer.','round');
      return;
    }
    if(type==='correct') {
      streak=Number.isFinite(data.streak)?data.streak:streak+1;
      announce(streak>=3?`${streak} D’AFFILÉE !`:'BIEN VU !',data.points>0?`+${new Intl.NumberFormat('fr-FR').format(data.points)} POINTS`:data.label||'Bonne réponse.', 'correct');
      if(streak===3||streak===5||streak===10)burst();
    } else if(type==='wrong') { streak=0;announce(data.label||'ON SE REPREND.',data.detail||'La prochaine est pour toi.','wrong'); }
    else if(type==='clue') { announce(data.label||'NOUVELLE PISTE',data.detail||'Compare les indices révélés.','clue');enter(data.selector||'.attempt-row:first-child > *'); }
    else if(type==='finish') { announce(data.label||'RUN TERMINÉ',data.detail||'Prêt pour le suivant ?','finish');burst();requestAnimationFrame(()=>enter('#result > *, #finish > *, #endScreen > *, #complete > *, [data-arcade-finish] > *, .finish-screen > *')); }
    else if(type==='end') { announce(data.label||'BIEN TENTÉ.',data.detail||'Une nouvelle partie t’attend.','end'); }
    tone(type);
    if(type==='correct'||type==='wrong')requestAnimationFrame(()=>document.querySelectorAll('button.correct, button.wrong, [data-arcade-answers] > [data-answer-state], .answer-button.correct').forEach(n=>animate(n,[{transform:'scale(.975)'},{transform:'scale(1.015)',offset:.5},{transform:'scale(1)'}],{duration:360})));
    if(type==='correct'||type==='wrong')document.querySelectorAll('#feedback, .reveal-fact, [data-arcade-feedback]').forEach(n=>animate(n,[{transform:type==='wrong'?'translateX(-5px)':'translateY(8px)',opacity:.55},{transform:'none',opacity:1}]));
    document.querySelectorAll('#scoreValue, #score, #finalScore, [data-arcade-score]').forEach(n=>animate(n,[{transform:'scale(1.09)'},{transform:'scale(1)'}]));
  }
  window.LoreFX={beat,enter,tone,get motion(){return enabled()},get sound(){return sound}};
  window.addEventListener('lore:beat',e=>beat(e.detail.type,e.detail));
  document.addEventListener('visibilitychange',()=>{if(document.hidden){cancel();clearTimeout(hideTimer);toast.hidden=true;ctx?.suspend().catch(()=>{})}});
  document.documentElement.dataset.arcadeReady='true';sync();window.dispatchEvent(new Event('lore:ready'));
})();
