import {questionIdentity,type QuizQuestion,type Difficulty} from '../app/quiz/quiz-data';
export const pokemonFamilies={recognize:'Reconnaître',types:'Utiliser les types',evolve:'Évoluer',world:'L’aventure'};
export function pokemonFamily(q:QuizQuestion):keyof typeof pokemonFamilies{
 if(['SILHOUETTE','DÉDUCTION','COULEUR'].includes(q.type))return 'recognize';
 if(['TYPE','DOUBLE TYPE','COMBAT','DOUBLE FAIBLESSE','IMMUNITÉ','FAIBLESSE','INTRUS','TALENT'].includes(q.type))return 'types';
 if(['ÉVOLUTION','FAMILLE','CONNEXION','ARCHIVE'].includes(q.type))return 'evolve';
 return 'world';
}
export const pokemonTiers:Record<Difficulty,Difficulty[]>={easy:['easy','easy','normal'],normal:['easy','normal','expert'],expert:['normal','expert','expert']};
function random(seed:number){let n=seed>>>0;return()=>{n+=0x6d2b79f5;let x=Math.imul(n^n>>>15,1|n);x^=x+Math.imul(x^x>>>7,61|x);return((x^x>>>14)>>>0)/4294967296}}
export function buildPokemonRun(bank:QuizQuestion[],seed:number,level:Difficulty,history:string[]=[]){
 const rng=random(seed),pool=[...new Map(bank.map(q=>[questionIdentity(q),q])).values()].map(q=>({q,tie:rng()})),chosen:QuizQuestion[]=[];
 const families=new Map<string,number>(),types=new Map<string,number>(),used=new Set<string>(),images=new Set<string>();
 for(let i=0;i<15;i++){
  const generation=(seed%4+i)%4+1,tier=pokemonTiers[level][Math.floor(i/5)];
  let candidates=pool.filter(({q})=>!used.has(questionIdentity(q))&&q.generation===generation&&(q.difficulty||'normal')===tier);
  if(!candidates.length)throw Error('Banque Pokémon insuffisante');
  const oldest=Math.min(...candidates.map(({q})=>history.indexOf(questionIdentity(q))));candidates=candidates.filter(({q})=>history.indexOf(questionIdentity(q))===oldest);
  const cost=(q:QuizQuestion)=>(q.image&&images.has(q.image)?10000:0)+(chosen.length&&pokemonFamily(chosen.at(-1)!)===pokemonFamily(q)?1000:0)+(families.get(pokemonFamily(q))||0)*10+(types.get(q.type)||0)*3;
  candidates.sort((a,b)=>cost(a.q)-cost(b.q)||a.tie-b.tie);const q=candidates[0].q;
  used.add(questionIdentity(q));if(q.image)images.add(q.image);families.set(pokemonFamily(q),(families.get(pokemonFamily(q))||0)+1);types.set(q.type,(types.get(q.type)||0)+1);
  const answer=q.options[q.correct],options=[...q.options];for(let j=3;j>0;j--){const k=Math.floor(rng()*(j+1));[options[j],options[k]]=[options[k],options[j]]}chosen.push({...q,options:options as QuizQuestion['options'],correct:options.indexOf(answer)});
 }
 return chosen;
}
export type PokemonSession={version:1;seed:number;level:Difficulty;deck:QuizQuestion[];answers:(number|null)[];index:number;skipped:string[]};
export function pokemonAnswer(s:PokemonSession,choice:number){if(s.index>=s.deck.length||s.answers[s.index]!==null||!Number.isInteger(choice)||choice<0||choice>3)return s;const answers=[...s.answers];answers[s.index]=choice;return{...s,answers}}
export function pokemonNext(s:PokemonSession){return s.index<s.deck.length&&s.answers[s.index]!==null?{...s,index:s.index+1}:s}
export function pokemonSkip(s:PokemonSession){if(s.index>=s.deck.length||s.answers[s.index]!==null)return s;const answers=[...s.answers];answers[s.index]=-1;return{...s,answers,skipped:[...s.skipped,questionIdentity(s.deck[s.index])]}}
export function pokemonScore(s:PokemonSession){const played=s.answers.filter(a=>a!==null&&a!==-1).length,correct=s.deck.filter((q,i)=>s.answers[i]===q.correct).length;return{played,correct,score:correct*1000}}
export function restorePokemonRun(raw:string|null,bank:QuizQuestion[]):PokemonSession|null{
 try{const s=JSON.parse(raw||'null');if(!s||s.version!==1||!Number.isInteger(s.seed)||s.seed<0||!['easy','normal','expert'].includes(s.level)||s.deck?.length!==15||s.answers?.length!==15||!Array.isArray(s.skipped)||!Number.isInteger(s.index)||s.index<0||s.index>15)return null;
 const known=new Map(bank.map(q=>[questionIdentity(q),q]));const ids=new Set();
 for(let i=0;i<15;i++){const q=s.deck[i];if(!q||typeof q.prompt!=='string'||!Array.isArray(q.options)||q.options.length!==4||!Number.isInteger(q.correct)||q.correct<0||q.correct>3)return null;const id=questionIdentity(q),original=known.get(id);if(!original||ids.has(id)||q.options[q.correct]!==original.options[original.correct]||q.options.some((v:string)=>!original.options.includes(v)))return null;ids.add(id);if(s.answers[i]!==null&&(!Number.isInteger(s.answers[i])||s.answers[i]<-1||s.answers[i]>3))return null;if(i<s.index&&s.answers[i]===null||i>s.index&&s.answers[i]!==null)return null;s.deck[i]={...original,options:q.options,correct:q.correct};}
 if(s.deck.some((q:QuizQuestion)=>new Set(q.options).size!==4))return null;
 const skipped=s.deck.filter((_:QuizQuestion,i:number)=>s.answers[i]===-1).map(questionIdentity);
 if(s.skipped.length!==skipped.length||new Set(s.skipped).size!==s.skipped.length||s.skipped.some((id:string)=>!skipped.includes(id)))return null;return s;
 }catch{return null}
}
