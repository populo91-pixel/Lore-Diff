import fs from 'node:fs';
import assert from 'node:assert/strict';
import {species,sixths,cries,raids} from '../public/idle-challenges-data.mjs';
import {evolutions,equipment} from '../public/idle-trials-data.js';
import {chooseVaried,readHistory,remember} from '../public/draw-variety.mjs';
import {pick,advance,restore,points} from '../public/idle-trials-engine.mjs';
const root=new URL('../',import.meta.url);
const exists=p=>fs.existsSync(new URL(p,root));
const csv=p=>{const [head,...rows]=fs.readFileSync(new URL(p,import.meta.url),'utf8').trim().split('\n');return rows.map(l=>Object.fromEntries(l.split(',').map((v,i)=>[head.split(',')[i],v])));};
// Fixtures: PokeAPI/pokeapi data/v2/csv/{type_efficacy,pokemon_types}.csv.
const names=['','Normal','Combat','Vol','Poison','Sol','Roche','Insecte','Spectre','Acier','Feu','Eau','Plante','Électrik','Psy','Glace','Dragon','Ténèbres','Fée'];
const table=Object.fromEntries(csv('fixtures/type-efficacy.csv').map(r=>[`${names[r.damage_type_id]}|${names[r.target_type_id]}`,Number(r.damage_factor)/100]));
const types={};for(const r of csv('fixtures/pokemon-types.csv'))(types[r.pokemon_id]??=[]).push(names[r.type_id]);
const mult=(a,ds)=>ds.reduce((n,d)=>n*table[a+'|'+d],1);
for(const p of species)assert.deepEqual(p.types.split(' / ').sort(),types[p.id].sort(),p.name);
for(const q of sixths){
 assert.equal(new Set(q.team).size,5);assert.equal(q.team.length,5);assert(!q.team.includes(q.pokemon));
 if(q.rule){const r=q.rule;const valid=q.candidates.filter(id=>r.kind==='attack'?types[id].some(t=>mult(t,r.target)===r.factor):r.attacks.every((t,i)=>mult(t,types[id])===r.factors[i]));assert.deepEqual(valid,[q.pokemon],q.id);}
 for(const id of [...q.team,...q.candidates])assert(exists(`public/assets/reveal/${id}.png`));
}
for(const q of evolutions)for(const id of [q.from,q.to])assert(exists(`public/assets/reveal/${id}.png`));
for(const q of cries)for(const ext of ['ogg','mp3'])assert(exists(`public/assets/cries/${q.pokemon}.${ext}`));
const bosses=raids.flatMap(q=>q.bosses);assert.equal(new Set(bosses).size,bosses.length);
for(const q of [...sixths,...evolutions,...equipment]){assert.equal(new Set(q.options).size,4);assert(q.options.includes(q.answer));}
for(const pool of [cries,evolutions,equipment,raids,...['easy','normal','expert'].map(d=>sixths.filter(q=>q.difficulty===d))]){
 let history=[],previous=[];
 for(let n=0;n<30;n++){
  const next=chooseVaried(pool,'test-'+n,3,history,q=>q.gen||q.from||q.era||q.id),ids=next.map(q=>q.id);
  assert.equal(new Set(ids).size,3);assert(!ids.some(id=>previous.includes(id)));
  if(pool.filter(q=>!history.includes(q.id)).length>=3)assert(ids.every(id=>!history.includes(id)));
  history=[...history.filter(id=>!ids.includes(id)),...ids];previous=ids;
 }
 assert.deepEqual(chooseVaried(pool,'daily',3),chooseVaried(pool,'daily',3));
}
// Storage denied: the current session must still retain its recent history.
remember('test',['a','b']);remember('test',['b','c']);assert.deepEqual(readHistory('test'),['a','b','c']);
const deck=evolutions.slice(0,3);let state={ids:deck.map(q=>q.id),index:0,answers:[[],[],[]]};
assert.equal(advance(state,deck,1),state);
for(const q of deck){state=pick(state,deck,q.answer,1);const snapshot=JSON.stringify(state);assert.equal(pick(state,deck,q.answer,1),state);assert.equal(points(state.answers[state.index],q),3);assert.deepEqual(restore(snapshot,deck,1),state);state=advance(state,deck,1);}
assert.equal(state.index,3);assert.equal(advance(state,deck,1),state);
assert.equal(restore(JSON.stringify({...state,index:9}),deck,1),null);
console.log(`${cries.length} cris, ${evolutions.length} évolutions, ${sixths.length} équipes, ${raids.length} raids / ${bosses.length} boss : contenu, 210 tirages, sauvegarde et scores validés.`);
