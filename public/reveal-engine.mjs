export const normalize = value => String(value).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]/g, '');
export const dayKey = () => new Intl.DateTimeFormat('sv-SE', {timeZone:'Europe/Paris'}).format(new Date());
export function dailyIndex(day, mode, count) { let hash=0; for(const c of day+mode) hash=(Math.imul(hash,31)+c.charCodeAt(0))>>>0; return hash%count; }
export function submit(state, answer, target) {
 if(state.won || state.turns.length>=6) return state;
 if(answer!==null && state.turns.some(t=>t!==null && normalize(t)===normalize(answer))) return state;
 return {...state, turns:[...state.turns,answer],won:answer!==null && normalize(answer)===normalize(target)};
}
export const finished = state => state.won || state.turns.length>=6;
export function restore(raw, id, candidates, target) {
 try {
  const parsed=JSON.parse(raw); if(parsed.id!==id || !Array.isArray(parsed.turns) || parsed.turns.length>6) return null;
  let state={id,turns:[],won:false};
  for(const turn of parsed.turns) {
   if(finished(state) || (turn!==null && !candidates.includes(turn))) return null;
   const next=submit(state,turn,target); if(next===state)return null; state=next;
  }
  return state;
 } catch{return null;}
}
