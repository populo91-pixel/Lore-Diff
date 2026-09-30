export function currentMode(){
 const names=[...document.querySelectorAll('[data-rv-tab]')].map(b=>b.dataset.rvTab);
 const hash=location.hash.slice(1);return names.includes(hash)?hash:'classic';
}
export function syncModes(){
 const mode=currentMode();
 document.querySelectorAll('[data-idle-panel]').forEach(p=>p.hidden=p.dataset.idlePanel!==mode);
 document.querySelectorAll('[data-rv-tab]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.rvTab===mode)));
 document.body.classList.toggle('rv-active',mode!=='classic');
 const restart=document.querySelector('#newGameButton, #wowNewGameButton');if(restart)restart.hidden=mode!=='classic';
 window.dispatchEvent(new CustomEvent('lore:modechange',{detail:mode}));
}
document.querySelectorAll('[data-rv-tab]').forEach(b=>b.addEventListener('click',()=>{
 history.replaceState(null,'',b.dataset.rvTab==='classic'?location.pathname:'#'+b.dataset.rvTab);syncModes();
}));
window.addEventListener('hashchange',syncModes);syncModes();
