import assert from 'node:assert/strict';
import {BANK,makeRun,Run,points} from '../public/intrus-engine.mjs';
assert.equal(BANK.length,36);assert.equal(new Set(BANK.map(q=>q.id)).size,36);
for(const q of BANK){assert.equal(new Set([...q.group,q.answer]).size,4);assert(q.prompt&&q.explanation&&q.category);assert([1,2,3].includes(q.tier))}
for(let seed=1;seed<=100;seed++){
 let state=seed;const random=()=>((state=Math.imul(state,1664525)+1013904223>>>0)/4294967296);
 const questions=makeRun([],random);assert.deepEqual(questions.map(q=>q.tier),[1,1,2,2,3]);assert.equal(new Set(questions.map(q=>q.id)).size,5);
 const subsequent=makeRun(questions.map(q=>q.id),random);assert(subsequent.every(q=>!questions.some(p=>p.id===q.id)));
 const run=new Run(questions);assert.equal(run.next(),false);
 for(let i=0;i<5;i++){const r=run.answer(run.current.answer,0);assert(r.correct);const score=run.score;assert.equal(run.answer(run.current.answer,0),null);assert.equal(run.score,score);if(i<4)assert(run.next())}
 assert(run.done);assert.equal(run.score,7400);assert.equal(run.lives,3);assert.equal(run.next(),false);
 const lost=new Run(questions);for(let i=0;i<3;i++){lost.answer(lost.current.group[0],0);if(i<2)lost.next()}assert(lost.done);assert.equal(lost.lives,0);assert.equal(lost.answers.length,3);assert.equal(lost.score,0);
 const mixed=new Run(questions);mixed.answer(mixed.current.answer,50000);mixed.next();mixed.answer(mixed.current.group[0],0);mixed.next();assert.equal(mixed.answer(mixed.current.answer,50000).bonus.series,0);
}
assert.equal(points(0,1).speed,300);assert.equal(points(15000,1).speed,0);assert.equal(points(-100,1).speed,300);
console.log('36 questions checked; 100 runs: progression, no repeats, scoring, three-life loss, streak reset and duplicate-answer protection passed.');
