const assert=require("node:assert/strict");
const fs=require("node:fs");
const ts=require("typescript");
require.extensions[".ts"]=(module,filename)=>module._compile(ts.transpileModule(fs.readFileSync(filename,"utf8"),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,esModuleInterop:true}}).outputText,filename);
const {universeConfigs,prepareQuestions,allQuestions}=require("../app/quiz/quiz-data.ts");
const bank=universeConfigs.pokemon.questions;
for(const q of bank){
  assert.equal(q.options.length,4,q.prompt);
  assert.equal(new Set(q.options).size,4,q.prompt);
  assert(q.correct>=0&&q.correct<4,q.prompt);
  assert(!/(numéro|entrée n°|premier Pokémon du Pokédex)/i.test(q.prompt),q.prompt);
  assert(q.generation>=1&&q.generation<=4,q.prompt);
}
for(const difficulty of ["easy","normal","expert"]){
  const pool=bank.filter(q=>(q.difficulty||"normal")===difficulty);
  for(let seed=0;seed<100;seed++){
    const run=prepareQuestions(pool,seed,15);
    assert.equal(run.length,15);
    const counts=[1,2,3,4].map(g=>run.filter(q=>q.generation===g).length);
    assert(Math.max(...counts)-Math.min(...counts)<=1);
    assert.deepEqual(run,prepareQuestions(pool,seed,15));
  }
}
assert(allQuestions.filter(q=>q.universe==="pokemon").length===bank.length);
const tracks=require("../public/sound-tracks.json");
assert.equal(tracks.length,10);
assert.equal(new Set(tracks.map(t=>t.id)).size,10);
console.log(JSON.stringify({pokemonQuestions:bank.length,generations:[1,2,3,4].map(g=>({generation:g,total:bank.filter(q=>q.generation===g).length})),soundtracks:tracks.length,balancedRunsTested:300}));
async function testAudio(){
  const {GET}=require("../app/api/soundtrack/route.ts");
  let fetched=false;global.fetch=async()=>{fetched=true;throw new Error("Unexpected network request")};
  const response=await GET();
  assert.equal(response.status,410);
  assert.equal(response.headers.get("Cache-Control"),"no-store");
  assert.equal(fetched,false);
  console.log("Retired audio API does not contact an external catalogue.");
}
testAudio().catch(e=>{console.error(e);process.exitCode=1});
