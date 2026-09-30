import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {mkdtempSync,rmSync,existsSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {pathToFileURL} from 'node:url';
const temp=mkdtempSync(join(tmpdir(),'lore-diff-test-')),bundle=process.argv[2]||join(temp,'engine.mjs');
try{
 if(!process.argv[2])execFileSync('node_modules/.pnpm/esbuild@0.27.3/node_modules/esbuild/bin/esbuild',['lib/diff-game.ts','--bundle','--platform=node','--format=esm','--outfile='+bundle],{stdio:'pipe'});
 const g=await import(pathToFileURL(bundle)),p=g.profile([],[]);
 function correct(s){const {q,challenge:c}=g.question(s.current);if(c?.pairs)return g.answer(s,{order:c.pairs.map(v=>g.associationTargets(s).indexOf(v[1]))});return g.answer(s,s.choices?{choice:g.options(s).indexOf(q.options[q.correct])}:{text:q.options[q.correct]})}
 for(let seed=1;seed<=180;seed++){
  let s=g.initial(p,seed);const kinds=[],worlds=[];
  for(let i=0;i<12;i++){const c=g.question(s.current).challenge;kinds.push(c.mechanic);worlds.push(c.world);assert.equal(c.difficulty,g.stage(i));const pub=g.publicQuestion(s);assert.equal(pub.answer,undefined);assert.equal(pub.fact,undefined);assert.equal(pub.pairs,undefined);if(c.mechanic==='deduction')assert.equal(pub.clues.length,1);s=g.advance(correct(s),p);if(s.phase==='decision')s=g.decide(s,p,'push')}
  assert.equal(s.ending,'complete');assert.equal(s.score,6000);assert.equal(new Set(s.used).size,12);for(let i=0;i<12;i+=3)assert.equal(new Set(kinds.slice(i,i+3)).size,3);for(const world of g.worlds)assert.equal(new Set(kinds.filter((_,i)=>worlds[i]===world)).size,3);
 }
 let s=g.initial(p,3);assert.equal(g.mechanic(s),'deduction');s=g.clue(s);assert.equal(s.clueCount,1);assert.equal(correct(s).score,150);s=g.clue(s);assert.equal(g.clue(s),null);assert.equal(correct(s).score,100);
 const alias=g.answer(g.initial(p,3),{text:g.question(g.initial(p,3).current).challenge.aliases?.[0]||g.question(g.initial(p,3).current).q.options[0]});assert.equal(alias.feedback.correct,true);
 s=g.initial(p,4);assert.equal(g.mechanic(s),'intruder');assert.equal(g.clue(s),null);assert.equal(g.answer(s,{choice:9}),null);
 s=g.initial(p,5);assert.equal(g.mechanic(s),'association');assert.equal(g.answer(s,{order:[0,0,2]}),null);assert.equal(g.answer(s,{order:[0,1,3]}),null);s=g.clue(s);assert.equal(g.publicQuestion(s).confirmed.row,0);assert.equal(correct(s).score,150);
 s=g.initial(p,31);for(let i=0;i<3;i++)s=g.advance(correct(s),p);assert.equal(g.decide(s,p,'bank').score,600);s=g.decide(s,p,'push');assert.equal(s.secured,0);for(let i=0;i<3;i++)s=g.advance(correct(s),p);s=g.decide(s,p,'push');assert.equal(s.secured,900);
 for(let i=0;i<3;i++){if(g.mechanic(s)!=='intruder'&&s.hints>0){const h=g.clue(s);if(h)s=h;}s=g.advance(g.answer(s,{skip:true}),p)}assert.equal(s.ending,'defeat');assert.equal(s.score,900);
 let old={...g.initial(p,234),rulesVersion:2};old.current=g.pick(old,p);old.choices=false;for(let i=0;i<3;i++)old=g.advance(correct(old),p);old=g.decide(old,p,'push');assert.equal(old.secured,0);assert.equal(g.mechanic(old),'recall');
 console.log('Diff engine: 180 full runs; three mechanics/sector, difficulty, secrecy, aliases, hints, banking, defeat, legacy passed');
}finally{rmSync(temp,{recursive:true,force:true})}
