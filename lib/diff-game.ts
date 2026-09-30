import {diffChallenges,type Challenge} from './diff-content';
import { allQuestions, type QuizQuestion } from '../app/quiz/quiz-data';

export type World = 'wow' | 'pokemon' | 'runeterra';
export type Skill = 'lore' | 'personnages' | 'mécaniques' | 'géographie' | 'bestiaire' | 'équipement' | 'chronologie';
export type Mark = { world:World; skill:Skill; correct:boolean; blind:boolean; prompt:string; answer:string; fact:string; earned:number; mechanic?:string; difficulty?:string; hintsUsed?:number };
export type DiffState = { rulesVersion?:2|3; hints?:number; clueCount?:number; seed:number; index:number; lives:number; score:number; secured:number; multiplier:number; current:number; choices:boolean; feedback:Mark|null; marks:Mark[]; used:number[]; phase:'question'|'feedback'|'decision'|'finished'; ending?:'bank'|'defeat'|'complete' };
export const LIMIT=12;
export const worlds:World[]=['wow','pokemon','runeterra'];
export const worldNames:Record<World,string>={wow:'Azeroth',pokemon:'Pokémon',runeterra:'Runeterra'};
const tags:Record<string,Skill>={LORE:'lore',PERSONNAGE:'personnages',SILHOUETTE:'personnages',CHAMPION:'personnages',CAPACITÉ:'mécaniques',COMPÉTENCE:'mécaniques',TYPE:'mécaniques',ÉVOLUTION:'mécaniques',MÉCANIQUE:'mécaniques',RÉGION:'géographie',ZONE:'géographie',VILLE:'géographie',BESTIAIRE:'bestiaire',LOOT:'équipement',OBJET:'équipement',CHRONO:'chronologie'};
const legacyBank=allQuestions.map((q,id)=>({q,id,skill:tags[q.type]})).filter((item):item is {q:QuizQuestion;id:number;skill:Skill}=>
  worlds.includes(item.q.universe as World) && !!item.skill && !item.q.image &&
  !/numéro|n°|pokédex|#\d{3}/i.test(item.q.prompt) &&
  item.q.options.length===4 && new Set(item.q.options).size===4 &&
  item.q.options[item.q.correct]?.length>0
);
const bank=[...legacyBank.map(x=>({...x,challenge:undefined as Challenge|undefined})),...diffChallenges.map(c=>({id:c.id,skill:c.skill as Skill,challenge:c,q:{universe:c.world,type:c.mechanic,prompt:c.prompt,options:(c.options.length?c.options:[c.answer,'','','']) as QuizQuestion['options'],correct:Math.max(0,c.options.indexOf(c.answer)),fact:c.fact,signal:'DIFF',difficulty:c.difficulty} as QuizQuestion}))];
export function stage(index:number){return (['easy','normal','expert','expert'] as const)[Math.min(3,Math.floor(index/3))]}
export function mechanic(s:DiffState){return question(s.current).challenge?.mechanic||'recall'}
function ready(s:DiffState,p:Profile){s.current=pick(s,p);s.choices=['intruder','association'].includes(mechanic(s));s.clueCount=0;return s}

function random(seed:number){let n=seed>>>0;return()=>{n+=0x6d2b79f5;let x=Math.imul(n^n>>>15,1|n);x^=x+Math.imul(x^x>>>7,61|x);return((x^x>>>14)>>>0)/4294967296}}
export function normalize(value:string){return value.toLocaleLowerCase('fr').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[’']/g,' ').replace(/[^a-z0-9]+/g,' ').trim().replace(/^(le|la|les|l|un|une) /,'')}
export function profile(marks:Mark[][],runs:{depth:number;score:number}[]){
  const samples=marks.flat();const group=<K extends string>(key:(m:Mark)=>K)=>{const totals={} as Record<K,{played:number;correct:number}>;for(const mark of samples){const k=key(mark);totals[k]??={played:0,correct:0};totals[k].played++;totals[k].correct+=Number(mark.correct)}return Object.keys(totals).map(k=>({key:k,played:totals[k as K].played,correct:totals[k as K].correct}))};
  return { record:Math.max(0,...runs.map(r=>r.depth)),bestScore:Math.max(0,...runs.map(r=>r.score)),runs:runs.length,skills:group(m=>m.skill),universes:group(m=>m.world) };
}
export type Profile=ReturnType<typeof profile>;
export function pick(s:DiffState,p:Profile){
  const world=worlds[s.index%3];const kind=(['deduction','intruder','association'] as const)[(s.index+Math.floor(s.index/3)+(s.seed%3))%3];const available=bank.filter(x=>x.q.universe===world&&!s.used.includes(x.id)&&(s.rulesVersion===3?x.challenge?.mechanic===kind&&x.challenge.difficulty===stage(s.index):!x.challenge));
  if(!available.length)throw new Error('Diff question bank exhausted');
  const marks=s.marks.filter(m=>m.world===world);
  const expertise=(skill:Skill)=>{const old=p.skills.find(x=>x.key===skill);const recent=marks.filter(m=>m.skill===skill);const tried=(old?.played||0)+recent.length;const correct=(old?.correct||0)+recent.filter(m=>m.correct).length;return tried?(correct+1)/(tried+2):.5};
  const rng=random(s.seed+s.index*937);const ranked=available.map(x=>({x,weight:1-expertise(x.skill),tie:rng()})).sort((a,b)=>b.weight-a.weight||a.tie-b.tie);
  return ranked[0].x.id;
}
export function initial(p:Profile,seed:number):DiffState{const s:DiffState={rulesVersion:3,hints:2,clueCount:0,seed,index:0,lives:3,score:0,secured:0,multiplier:1,current:-1,choices:false,feedback:null,marks:[],used:[],phase:'question'};return ready(s,p)}
export function question(id:number){const item=bank.find(x=>x.id===id);if(!item)throw new Error('Unknown Diff question');return item}
export function options(s:DiffState){const q=question(s.current).q;const rng=random(s.seed^((s.index+1)*123457));const order=[0,1,2,3];for(let i=3;i>0;i--){const j=Math.floor(rng()*(i+1));[order[i],order[j]]=[order[j],order[i]]}return order.map(i=>q.options[i])}
export function answer(s:DiffState,entry:{text?:string;choice?:number;skip?:boolean;order?:number[]}){
  if(s.phase!=='question')return null;
  const {q,skill,challenge}=question(s.current);const blind=!s.choices;const kind=mechanic(s);
  if(!entry.skip&&kind==='association'&&(!Array.isArray(entry.order)||entry.order.length!==3||new Set(entry.order).size!==3||entry.order.some(x=>!Number.isInteger(x)||x<0||x>2)))return null;
  if(!entry.skip&&kind!=='association'&&(blind&&typeof entry.text!=='string'||!blind&&(!Number.isInteger(entry.choice)||entry.choice!<0||entry.choice!>3)))return null;
  const correct=!entry.skip&&(kind==='association'?entry.order!.every((v,i)=>associationTargets(s)[v]===challenge!.pairs![i][1]):blind?[q.options[q.correct],...(challenge?.aliases||[])].some(value=>normalize(entry.text!)===normalize(value)):options(s)[entry.choice!]===q.options[q.correct]);
  const base=challenge?Math.max(50,(kind==='deduction'?(blind?200:100):200)-(s.clueCount||0)*50):100*(blind?2:1);
  const earned=correct?base*s.multiplier:0;
  const mark:Mark={world:q.universe as World,skill,correct,blind,prompt:q.prompt,answer:q.options[q.correct],fact:q.fact,earned,mechanic:kind,difficulty:q.difficulty,hintsUsed:(s.clueCount||0)+Number(kind==='deduction'&&s.choices)};
  const marks=[...s.marks,mark],lives=s.lives-Number(!correct),score=s.score+earned,index=s.index+1;
  return {...s,lives,score,index,marks,feedback:mark,used:[...s.used,s.current],phase:'feedback' as const};
}
export function advance(s:DiffState,p:Profile):DiffState|null{
  if(s.phase!=='feedback')return null;
  if(s.lives<=0)return {...s,score:s.secured,phase:'finished',ending:'defeat'};
  if(s.index>=LIMIT)return {...s,secured:s.score,phase:'finished',ending:'complete'};
  if(s.index%3===0)return {...s,phase:'decision'};
  const next={...s,feedback:null,choices:false,phase:'question' as const};return ready(next,p);
}
export function decide(s:DiffState,p:Profile,decision:'bank'|'push'):DiffState|null{
  if(s.phase!=='decision')return null;
  if(decision==='bank')return {...s,secured:s.score,phase:'finished',ending:'bank'};
  const next={...s,secured:(s.rulesVersion||1)>=2?(s.index===6?Math.max(s.secured,Math.floor(s.score/2)):s.secured):s.score,multiplier:s.multiplier+1,feedback:null,choices:false,phase:'question' as const};return ready(next,p);
}

export function reveal(s:DiffState):DiffState|null{
 if(s.phase!=='question'||s.choices)return null;
 const limited=(s.rulesVersion||1)>=2&&s.index>=6;
 if(limited&&(s.hints??2)<=0)return null;
 return {...s,choices:true,hints:limited?(s.hints??2)-1:s.hints};
}

export function associationTargets(s:DiffState){const pairs=question(s.current).challenge?.pairs;if(!pairs)return [];const values=pairs.map(p=>p[1]);const rng=random(s.seed+s.current*13);for(let i=values.length-1;i>0;i--){const j=Math.floor(rng()*(i+1));[values[i],values[j]]=[values[j],values[i]]}return values}
export function clue(s:DiffState):DiffState|null{
 if(s.phase!=='question')return null;
 const c=question(s.current).challenge,count=s.clueCount||0;
 if(!c||c.mechanic==='intruder'||count>=(c.mechanic==='association'?1:2))return null;
 const limited=s.index>=6;if(limited&&(s.hints??2)<=0)return null;
 return {...s,clueCount:count+1,hints:limited?(s.hints??2)-1:s.hints};
}
export function publicQuestion(s:DiffState){const {q,skill,challenge:c}=question(s.current);const targets=associationTargets(s);return {world:worldNames[q.universe as World],skill,prompt:q.prompt,mechanic:c?.mechanic||'recall',difficulty:c?.difficulty||null,options:s.choices&&c?.mechanic!=='association'?options(s):null,clues:c?.clues?.slice(0,1+(s.clueCount||0)),left:c?.pairs?.map(p=>p[0]),targets:c?.pairs?targets:undefined,confirmed:c?.pairs&&(s.clueCount||0)>0?{row:0,target:targets.indexOf(c.pairs[0][1])}:undefined,clueCount:s.clueCount||0,canClue:!!c&&c.mechanic!=='intruder'&&(s.clueCount||0)<(c.mechanic==='association'?1:2)&&(s.index<6||(s.hints??2)>0)};}
