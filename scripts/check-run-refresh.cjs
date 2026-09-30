const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),ts=require('typescript');
require.extensions['.ts']=(module,file)=>module._compile(ts.transpileModule(fs.readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText,file);
const {universeConfigs,questionIdentity}=require('../app/quiz/quiz-data.ts');
const p=require('../lib/pokemon-run.ts'),bank=universeConfigs.pokemon.questions;
let pokemonRuns=0;
for(const level of ['easy','normal','expert']){
 let history=[];
 for(let seed=0;seed<100;seed++){
  const deck=p.buildPokemonRun(bank,seed,level,history);
  assert.equal(deck.length,15);assert.equal(new Set(deck.map(questionIdentity)).size,15);
  assert.deepEqual(deck,p.buildPokemonRun(bank,seed,level,history));
  const counts=[1,2,3,4].map(g=>deck.filter(q=>q.generation===g).length);assert(Math.max(...counts)-Math.min(...counts)<=1);
  deck.forEach((q,i)=>{assert.equal(q.difficulty||'normal',p.pokemonTiers[level][Math.floor(i/5)]);assert.equal(new Set(q.options).size,4)});
  let s={version:1,seed,level,deck,answers:deck.map(()=>null),index:0,skipped:[]};
  assert.equal(p.pokemonNext(s),s);assert.equal(p.pokemonAnswer(s,4),s);
  for(let i=0;i<15;i++){
   assert(p.restorePokemonRun(JSON.stringify(s),bank));
   s=i===2?p.pokemonSkip(s):p.pokemonAnswer(s,deck[i].correct);
   assert.equal(p.pokemonAnswer(s,0),s);assert.equal(p.pokemonSkip(s),s);
   assert(p.restorePokemonRun(JSON.stringify(s),bank));s=p.pokemonNext(s);
  }
  assert.deepEqual(p.pokemonScore(s),{played:14,correct:14,score:14000});assert.equal(s.index,15);
  assert(p.restorePokemonRun(JSON.stringify(s),bank));
  assert.equal(p.restorePokemonRun(JSON.stringify({...s,index:16}),bank),null);
  assert.equal(p.restorePokemonRun(JSON.stringify({...s,skipped:[]}),bank),null);
  const invalid=JSON.parse(JSON.stringify(s));invalid.deck[0].options[1]=invalid.deck[0].options[0];assert.equal(p.restorePokemonRun(JSON.stringify(invalid),bank),null);
  history=[...history.filter(id=>!deck.some(q=>questionIdentity(q)===id)),...deck.map(questionIdentity)].slice(-500);pokemonRuns++;
 }
}
const data=vm.createContext({});
for(const file of ['public/run-extra.js','public/run-variety.js'])vm.runInContext(fs.readFileSync(file,'utf8'),data);
vm.runInContext(fs.readFileSync('public/run.js','utf8').split('const $ = selector')[0]+';globalThis.bank=RUN_STEPS;',data);
vm.runInContext(fs.readFileSync('public/azeroth-run-engine.js','utf8'),data);
const engine=data.AzerothRun;let rotations={},azerothRuns=0,seenFormats=new Set();
for(let i=0;i<300;i++){
 const draw=engine.draw(data.bank,rotations);assert.equal(draw.run.length,12);assert.equal(new Set(draw.run.map(s=>s.type)).size,12);
 assert.equal(draw.run.filter(s=>s.mode==='audio').length,2);assert.equal(draw.run.filter(s=>s.mode==='geo').length,1);
 draw.run.forEach((s,j)=>{
  seenFormats.add(s.type);assert.equal(s.stage,Math.floor(j/4));assert(engine.families[s.family].types.includes(s.type));
  if(s.mode!=='geo'){assert.equal(new Set(s.question.options).size,4);assert(s.question.options.includes(s.question.answer),s.type)}
  if(s.question.image?.startsWith('/'))assert(fs.existsSync('public'+s.question.image),s.question.image);
  if(rotations[s.type]?.remaining?.length)assert.notEqual(engine.key(s.question),rotations[s.type].last,s.type);
 });
 for(const [type,state] of Object.entries(rotations))if(type!=='__formats'&&!draw.run.some(s=>s.type===type))assert.equal(draw.rotations[type],state);
 rotations=draw.rotations;azerothRuns++;
}
assert.equal(seenFormats.size,20);
for(const level of ['easy','normal','expert'])assert(engine.duration(level,0)>engine.duration(level,1)&&engine.duration(level,1)>engine.duration(level,2));
assert(fs.existsSync('public/assets/eastern-kingdoms-map.webp'));
console.log(JSON.stringify({pokemonRuns,azerothRuns,azerothFormats:seenFormats.size,checked:'tirages, difficulté, réponses doubles, reprise, scores, rotation et fichiers locaux'}));
