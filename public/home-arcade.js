(()=>{
  const filters=[...document.querySelectorAll('[data-filter]')];
  const cards=[...document.querySelectorAll('[data-universe]')];
  const track=document.getElementById('universe-track');
  if(!track)return;
  const prev=document.getElementById('universe-prev'),next=document.getElementById('universe-next');
  const position=document.getElementById('universe-position'),dots=document.getElementById('universe-dots');
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  let frame=0;
  const visible=()=>cards.filter(card=>!card.hidden);
  const leftOf=card=>card.getBoundingClientRect().left-track.getBoundingClientRect().left+track.scrollLeft;
  function closest(){const shown=visible();return shown.reduce((best,card,i)=>Math.abs(leftOf(card)-track.scrollLeft)<Math.abs(leftOf(shown[best])-track.scrollLeft)?i:best,0)}
  function perPage(){const shown=visible();if(shown.length<2)return 1;const width=shown[0].getBoundingClientRect().width,gap=leftOf(shown[1])-leftOf(shown[0])-width;return Math.max(1,Math.floor((track.clientWidth+gap+1)/(width+gap)))}
  function page(){return Math.floor(closest()/perPage())}
  function move(index){const shown=visible(),card=shown[Math.max(0,Math.min(index,shown.length-1))];if(card)track.scrollTo({left:leftOf(card),behavior:reduced.matches?'instant':'smooth'})}
  function update(){const shown=visible(),index=closest();prev.disabled=track.scrollLeft<=2;next.disabled=track.scrollLeft>=track.scrollWidth-track.clientWidth-2;position.textContent=perPage()>1?`${index+1}–${Math.min(index+perPage(),shown.length)} / ${shown.length}`:`${index+1} / ${shown.length}`;[...dots.children].forEach((dot,i)=>dot.setAttribute('aria-pressed',String(i===page())));frame=0}
  function queue(){if(!frame)frame=requestAnimationFrame(update)}
  function makeDots(){const shown=visible(),size=perPage(),count=Math.ceil(shown.length/size);dots.replaceChildren(...Array.from({length:count},(_,i)=>{const dot=document.createElement('button');dot.type='button';dot.setAttribute('aria-label',`Page ${i+1} : ${shown.slice(i*size,(i+1)*size).map(card=>card.querySelector('h3').textContent).join(', ')}`);dot.setAttribute('aria-pressed',String(i===page()));dot.onclick=()=>move(i*size);return dot}));dots.hidden=count<=1;update()}
  filters.forEach(button=>button.addEventListener('click',()=>{
    const value=button.dataset.filter;
    filters.forEach(item=>item.setAttribute('aria-pressed',String(item===button)));
    cards.forEach(card=>card.hidden=value!=='all'&&card.dataset.universe!==value);
    track.scrollTo({left:0,behavior:'instant'});
    document.getElementById('filterStatus').textContent=`${visible().length} univers disponible${visible().length>1?'s':''}`;
    makeDots();
  }));
  prev.onclick=()=>move((page()-1)*perPage());next.onclick=()=>move((page()+1)*perPage());
  track.addEventListener('scroll',queue,{passive:true});
  track.addEventListener('keydown',event=>{if(event.target!==track)return;if(event.key==='ArrowLeft'||event.key==='ArrowRight'){event.preventDefault();move((page()+(event.key==='ArrowLeft'?-1:1))*perPage())}else if(event.key==='Home'||event.key==='End'){event.preventDefault();move(event.key==='Home'?0:visible().length-1)}});
  window.addEventListener('resize',makeDots,{passive:true});
  document.querySelector('.carousel-controls').hidden=false;
  makeDots();
})();
