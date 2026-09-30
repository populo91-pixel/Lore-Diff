import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {roster,attrs,compare,candidates,chooseTarget,rankedSearch,MODES,clueLevel} from '../public/rift-engine.mjs';
import {CONTENT} from '../public/rift-content.mjs';
const all=roster(JSON.parse(readFileSync('public/rift-roster.json','utf8')));
assert.equal(new Set(all.map(c=>c.id)).size,all.length);assert.ok(all.length>=171);
for(const c of all){for(const k of attrs)assert.ok(c[k]);assert.ok(c.year>=2009&&c.year<=2026)}
assert.equal(compare(['Ionia','Noxus'],['Ionia']),'partial');assert.equal(compare(['Mêlée'],['Mêlée']),'exact');assert.equal(compare(undefined,'Mana'),'unknown');
assert.equal(rankedSearch(all,'maitre yi')[0].id,'MasterYi');assert.equal(rankedSearch(all,'wukong')[0].id,'MonkeyKing');assert.equal(rankedSearch(all,"kai'sa")[0].id,'Kaisa');assert.equal(rankedSearch(all,'zzzzzzz').length,0);assert.ok(rankedSearch(all,'a').length>15);
for(let day=20000;day<20100;day++){for(const m of MODES){const a=chooseTarget(all,m,day,'',CONTENT);assert.equal(a.id,chooseTarget([...all].reverse(),m,day,'',CONTENT).id);if(['quote','emoji'].includes(m))assert.ok(CONTENT[a.id]);const guesses=all.filter(c=>c.id!==a.id).slice(0,15);const remaining=candidates(all,guesses,a);assert.ok(remaining.some(c=>c.id===a.id));assert.ok(remaining.length<all.length)}}
assert.equal(clueLevel(0),0);assert.equal(clueLevel(8),3);
console.log(`Rift: ${all.length} complete profiles, full search, stable targets across roster order, partial comparisons and deduction passed`);

const gender=id=>all.find(c=>c.id===id).gender;
assert.equal(compare(gender('Ahri'),gender('Garen')),'wrong');
assert.equal(compare(gender('Ahri'),gender('Lux')),'exact');
assert.equal(compare(gender('Kindred'),gender('Ahri')),'partial');
assert.equal(compare(gender('Blitzcrank'),gender('Ahri')),'wrong');
