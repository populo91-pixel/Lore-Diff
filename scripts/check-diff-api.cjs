const ts=require('typescript'),fs=require('fs'),vm=require('vm'),assert=require('assert/strict'),{DatabaseSync}=require('node:sqlite'),{pathToFileURL}=require('node:url');
const sqlite=new DatabaseSync(':memory:');sqlite.exec(fs.readFileSync('drizzle/0002_bright_vin_gonzales.sql','utf8'));
const db={prepare(sql){return{bind(...args){const s=sqlite.prepare(sql);return{async first(){return s.get(...args)||null},async all(){return{results:s.all(...args)}},async run(){return{meta:{changes:Number(s.run(...args).changes)}}}}}}}};
async function main(){
 const game=await import(pathToFileURL(process.argv[2]||'/tmp/lore-diff-engine.mjs'));
 const code=ts.transpileModule(fs.readFileSync('app/api/diff/route.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText,module={exports:{}};
 vm.runInNewContext(code,{module,exports:module.exports,require:p=>p==='@/db'?{getRawDb:()=>db}:p==='@/lib/diff-game'?game:(()=>{throw Error(p)})(),Date,Math,console,Request,Response,URL,crypto});const api=module.exports;
 async function call(owner,body,origin='https://example.com'){const req=new Request('https://example.com/api/diff',{method:body?'POST':'GET',headers:{cookie:'ld_daily='+owner,...(body?{'Content-Type':'application/json',origin}:{})},body:body?JSON.stringify(body):undefined});const r=await api[body?'POST':'GET'](req);assert.equal(r.headers.get('Cache-Control'),'no-store');return{status:r.status,data:await r.json()}}
 const empty=game.profile([],[]),seen=new Set();let completed=0;
 for(let seed=0;seed<3;seed++){
  const owner=crypto.randomUUID(),stranger=crypto.randomUUID(),id=crypto.randomUUID();const initial=game.initial(empty,seed);
  sqlite.prepare('INSERT INTO diff_runs VALUES (?, ?, ?, 0, 0, ?)').run(id,owner,JSON.stringify(initial),Date.now());
  let run=(await call(owner)).data.run;assert.equal(run.rulesVersion,3);assert.equal((await call(owner,{action:'start'})).data.run.id,id);assert.equal((await call(stranger,{action:'next',id,version:0})).status,404);assert.equal((await call(owner,{action:'start'},'https://foreign.example')).status,403);
  for(let i=0;i<12;i++){
   const state=JSON.parse(sqlite.prepare('SELECT state FROM diff_runs WHERE id = ?').get(id).state),q=game.question(state.current),publicQ=run.question;seen.add(publicQ.mechanic);
   for(const forbidden of ['answer','correct','fact','pairs','aliases','source'])assert.equal(publicQ[forbidden],undefined);
   assert.equal(publicQ.confirmed,undefined);assert.equal(run.review,undefined);
   if(publicQ.mechanic==='association'){assert.equal((await call(owner,{action:'answer',id,version:run.version,order:[0,0,2]})).status,400);assert.equal((await call(owner,{action:'answer',id,version:run.version,order:[0,1,3]})).status,400);}
   assert.equal((await call(owner,{action:'next',id,version:run.version})).status,400);
   const body={action:'answer',id,version:run.version,...(q.challenge.pairs?{order:q.challenge.pairs.map(v=>game.associationTargets(state).indexOf(v[1]))}:state.choices?{choice:game.options(state).indexOf(q.q.options[q.q.correct])}:{text:q.q.options[q.q.correct]})};
   const [first,duplicate]=await Promise.all([call(owner,body),call(owner,body)]);assert.equal(first.status,200);assert.equal(duplicate.status,200);run=(await call(owner)).data.run;assert.equal(run.index,i+1);assert.equal(run.version,body.version+1);assert.equal(run.feedback.correct,true);assert.equal(run.question,null);
   run=(await call(owner,{action:'next',id,version:run.version})).data.run;
   if(run.phase==='decision')run=(await call(owner,{action:'decide',id,version:run.version,decision:'push'})).data.run;
  }
  assert.equal(run.phase,'finished');assert.equal(run.score,6000);assert.equal(run.review.length,12);const saved=(await call(owner)).data;assert.equal(saved.run,null);assert.equal(saved.profile.runs,1);assert.equal(saved.profile.bestScore,6000);completed++;
 }
 assert.equal(seen.size,3);
 const owner=crypto.randomUUID(),id=crypto.randomUUID();let state=game.initial(empty,3);sqlite.prepare('INSERT INTO diff_runs VALUES (?, ?, ?, 0, 0, ?)').run(id,owner,JSON.stringify(state),Date.now());let run=(await call(owner)).data.run;
 run=(await call(owner,{action:'clue',id,version:run.version})).data.run;assert.equal(run.question.clues.length,2);assert.equal(run.question.clueCount,1);assert.equal(run.hints,2);assert.equal((await call(owner)).data.run.question.clues.length,2);
 run=(await call(owner,{action:'reveal',id,version:run.version})).data.run;assert.equal(run.question.options.length,4);assert.equal(run.question.canClue,true);
 // The late shared aid budget is enforced by the route as well as the engine.
 state={...state,index:6,hints:0,choices:false};state.current=game.pick(state,empty);sqlite.prepare('UPDATE diff_runs SET state = ? WHERE id = ?').run(JSON.stringify(state),id);assert.equal((await call(owner,{action:'clue',id,version:run.version})).status,400);assert.equal((await call(owner,{action:'reveal',id,version:run.version})).status,400);
 console.log(`Diff API: ${completed} complete runs, all mechanics, ownership, secrecy, concurrent answers, resume, profile, hints and invalid actions passed`);
 sqlite.close();
}
main().catch(e=>{console.error(e);process.exitCode=1});
