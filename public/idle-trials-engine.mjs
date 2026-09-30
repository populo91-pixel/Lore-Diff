export function shuffle(items,seed){
 let n=2166136261;for(const c of seed)n=Math.imul(n^c.charCodeAt(0),16777619)>>>0;
 const out=[...items];for(let i=out.length-1;i>0;i--){n=(Math.imul(n,1664525)+1013904223)>>>0;const j=n%(i+1);[out[i],out[j]]=[out[j],out[i]];}return out;
}
export const resolved=(entry,q,limit)=>entry.includes(q.answer)||entry.length>=limit;
export const points=(entry,q)=>entry.includes(q.answer)?4-entry.length:0;
export function pick(state,deck,value,limit){
 if(state.index>=deck.length)return state;const q=deck[state.index],entry=state.answers[state.index];
 if(resolved(entry,q,limit)||entry.includes(value)||!q.options.includes(value))return state;
 const answers=state.answers.map(a=>[...a]);answers[state.index].push(value);return {...state,answers};
}
export function advance(state,deck,limit){
 if(state.index>=deck.length||!resolved(state.answers[state.index],deck[state.index],limit))return state;
 return {...state,index:state.index+1};
}
export function restore(raw,deck,limit){
 try{
  const p=JSON.parse(raw);if(!p||p.ids?.join('|')!==deck.map(q=>q.id).join('|')||!Number.isInteger(p.index)||p.index<0||p.index>deck.length||!Array.isArray(p.answers)||p.answers.length!==deck.length)return null;
  for(let i=0;i<deck.length;i++){
   const a=p.answers[i],q=deck[i];if(!Array.isArray(a)||a.length>limit||new Set(a).size!==a.length||a.some(v=>!q.options.includes(v)))return null;
   if(a.includes(q.answer)&&a.at(-1)!==q.answer)return null;
   if(i<p.index&&!resolved(a,q,limit))return null;if(i>p.index&&a.length)return null;
  }
  return {ids:p.ids,index:p.index,answers:p.answers};
 }catch{return null;}
}
