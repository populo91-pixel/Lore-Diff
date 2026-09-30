import {shuffle} from './idle-trials-engine.mjs';
const memory=new Map();
export function readHistory(name){
 try{const ids=JSON.parse(localStorage.getItem('ld-variety-v1-'+name)||'[]');if(Array.isArray(ids))return ids.filter(v=>typeof v==='string').slice(-250);}catch{}
 return memory.get(name)||[];
}
export function remember(name,ids){
 const history=[...readHistory(name).filter(id=>!ids.includes(id)),...new Set(ids)].slice(-250);
 memory.set(name,history);try{localStorage.setItem('ld-variety-v1-'+name,JSON.stringify(history));}catch{}
}
// Unseen questions first; once exhausted, oldest questions return first.
// Groups only break ties among equally fresh entries, never override freshness.
export function chooseVaried(items,seed,count,history=[],group=q=>q.id){
 const pool=shuffle([...new Map(items.map(q=>[q.id,q])).values()],seed),chosen=[],groups=new Set();
 while(pool.length&&chosen.length<count){
  const oldest=Math.min(...pool.map(q=>history.indexOf(q.id)));
  let index=pool.findIndex(q=>history.indexOf(q.id)===oldest&&!groups.has(group(q)));
  if(index<0)index=pool.findIndex(q=>history.indexOf(q.id)===oldest);
  const [q]=pool.splice(index,1);chosen.push(q);groups.add(group(q));
 }
 return chosen;
}
