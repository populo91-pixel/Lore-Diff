export const MODES=['classic','quote','ability','emoji','splash'];
export const normalize=s=>String(s).normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]/gi,'').toLowerCase();
export const attrs=['gender','roles','regions','species','resource','range','year'];
export const labels=['Genre','Rôle','Région','Espèce','Ressource','Portée','Sortie'];
export function roster(rows){return rows.map(([name,id,roles,regions,species,resource,range,year,gender])=>({name,id,gender:gender?.split(' / '),roles:roles.split(' / '),regions:regions.split(' / '),species:species.split(' / '),resource,range:range.split(' / '),year}))}
export function compare(a,b){if(a==null||b==null)return'unknown';if(Array.isArray(a)){const same=a.filter(x=>b.includes(x)).length;return same===a.length&&same===b.length?'exact':same?'partial':'wrong'}return a===b?'exact':'wrong'}
export function signature(guess,target){return attrs.map(k=>k==='year'?(guess.year==null?'unknown':guess.year===target.year?'exact':guess.year<target.year?'up':'down'):compare(guess[k],target[k])).join('|')}
export function candidates(all,guesses,target){return all.filter(c=>guesses.every(g=>signature(g,c)===signature(g,target)))}
export function seed(s){let n=2166136261;for(const c of s)n=Math.imul(n^c.charCodeAt(0),16777619);return n>>>0}
export function chooseTarget(all,mode,day,practiceSeed,content){const pool=all.filter(c=>mode==='quote'||mode==='emoji'?!!content[c.id]?.[mode]&&(practiceSeed||!content[c.id].introducedDay||day>=content[c.id].introducedDay):true).sort((a,b)=>a.id.localeCompare(b.id));return pool[seed(`rift-v3:${day}:${mode}:${practiceSeed||'daily'}`)%pool.length]}
export function clueLevel(misses){return Math.min(3,Math.max(0,misses))}
export function rankedSearch(all,query,used=[]){const q=normalize(query);if(!q)return[];const rank=c=>[c.name,c.id,...(c.aliases||[])].some(n=>normalize(n)===q)?0:[c.name,c.id,...(c.aliases||[])].some(n=>normalize(n).startsWith(q))?1:2;return all.filter(c=>!used.includes(c.id)&&[c.name,c.id,...(c.aliases||[])].some(n=>normalize(n).includes(q))).sort((a,b)=>rank(a)-rank(b)||a.name.localeCompare(b.name,'fr'))}
