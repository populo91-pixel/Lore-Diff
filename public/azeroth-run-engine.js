/* Four actions, three short stages. Format and question rotations are independent. */
globalThis.AzerothRun = (() => {
  const families = {
    recognize:{label:'Reconnaître',types:['PERSONNAGE','FACTION','BESTIAIRE','SILHOUETTE']},
    explore:{label:'Explorer',types:['GÉO','BIOME','VILLE','INSTANCE','ZOOM','CARTE EXPRESS']},
    deduce:{label:'Déduire',types:['INTRUS','LORE','LOOT','CONNEXION','EXTENSION','ERREUR LORE','STATUT','CHRONO']},
    listen:{label:'Écouter',types:['QUI A DIT ÇA','OST / THÈME']}
  };
  const stages = ['Départ','Exploration','Défi final'];
  const slots = [
    ['recognize',['PERSONNAGE','FACTION']], ['explore',['GÉO']],
    ['deduce',['INTRUS','LORE','EXTENSION']], ['listen',['QUI A DIT ÇA']],
    ['explore',['BIOME','VILLE','CARTE EXPRESS']], ['recognize',['FACTION','BESTIAIRE','PERSONNAGE']],
    ['deduce',['LOOT','CONNEXION','STATUT']], ['deduce',['INTRUS','EXTENSION','LORE']],
    ['recognize',['SILHOUETTE','BESTIAIRE']], ['explore',['INSTANCE','ZOOM','CARTE EXPRESS']],
    ['deduce',['ERREUR LORE','CHRONO']], ['listen',['OST / THÈME']]
  ];
  const key = q => [q.answer,q.subject,q.page,q.audio,q.image,q.prompt].filter(Boolean).join('|');
  function shuffle(items,rng){const a=[...items];for(let i=a.length-1;i>0;i--){const j=Math.floor(rng()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}
  function draw(bank,rotations={},rng=Math.random){
    const next = {...rotations},usedTypes=new Set(),usedSubjects=new Set(),usedImages=new Set();
    const recent=Array.isArray(rotations.__formats)?rotations.__formats:[];
    const run = slots.map(([family,types],index)=>{
      const candidates=shuffle(bank.filter(s=>types.includes(s.type)&&s.questions.length&&!usedTypes.has(s.type)),rng);
      candidates.sort((a,b)=>recent.indexOf(a.type)-recent.indexOf(b.type));
      const step=candidates[0];if(!step)throw Error('Banque Azeroth insuffisante');usedTypes.add(step.type);
      const byKey=new Map(step.questions.map(q=>[key(q),q])),saved=rotations[step.type]||{};
      let remaining=Array.isArray(saved.remaining)?saved.remaining.filter(k=>byKey.has(k)):[];
      if(!remaining.length){remaining=shuffle([...byKey.keys()],rng);if(remaining.length>1&&remaining[0]===saved.last)[remaining[0],remaining[1]]=[remaining[1],remaining[0]]}
      // Prefer a different figure or illustration without discarding the rotation queue.
      const fresh=remaining.findIndex(k=>{const q=byKey.get(k);return !usedSubjects.has(q.subject||q.answer)&&(!q.image||!usedImages.has(q.image))});
      const selected=remaining.splice(Math.max(0,fresh),1)[0],question=byKey.get(selected);
      usedSubjects.add(question.subject||question.answer);if(question.image)usedImages.add(question.image);
      next[step.type]={remaining,last:selected};
      return {...step,question:{...question},family,stage:Math.floor(index/4)};
    });
    next.__formats=[...recent.filter(t=>!usedTypes.has(t)),...run.map(s=>s.type)];
    return {run,rotations:next};
  }
  function duration(level,stage){return ({easy:[28,26,24],normal:[24,22,20],expert:[20,18,16]}[level]||[24,22,20])[Math.max(0,Math.min(2,stage))]}
  return {families,stages,key,draw,duration};
})();
