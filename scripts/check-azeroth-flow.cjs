// Exercise the real classic-script handlers using a small DOM adapter.
const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
class Element {
 constructor(){this.hidden=false;this.children=[];this.events={};this.dataset={};this.style={};this.paused=true;this.currentTime=0;const classes=new Set();this.classList={add:c=>classes.add(c),remove:c=>classes.delete(c),toggle:(c,on)=>{on??=!classes.has(c);on?classes.add(c):classes.delete(c)},contains:c=>classes.has(c)}}
 addEventListener(name,fn){(this.events[name]??=[]).push(fn)}
 emit(name){for(const fn of this.events[name]||[])fn({})}
 append(e){this.children.push(e)}appendChild(e){this.append(e)}replaceChildren(){this.children=[]}
 set innerHTML(value){this.children=[];this.html=value}get innerHTML(){return this.html||''}
 querySelector(){return this.child??=new Element()}
 querySelectorAll(selector){return selector==='button'?this.children:[]}
 setAttribute(k,v){this[k]=v}focus(){}scrollIntoView(){}load(){}
 async play(){this.paused=false;this.emit('playing')}pause(){this.paused=true}
 set src(v){this.source=v;if(this.onload)queueMicrotask(()=>this.onload?.())}get src(){return this.source}
}
const elements=new Map(),get=s=>{if(!elements.has(s))elements.set(s,new Element());return elements.get(s)};
const html=fs.readFileSync('public/run.html','utf8');
for(const match of html.matchAll(/<[^>]*\bid="([^"]+)"[^>]*>/g))get('#'+match[1]).hidden=/\bhidden\b/.test(match[0]);
const difficulties=['easy','normal','expert'].map(value=>{const e=new Element();e.dataset.runDifficulty=value;return e});
const storage=new Map(),timers=new Map();let seq=0;
const context=vm.createContext({console,Math,queueMicrotask,performance,localStorage:{getItem:k=>storage.get(k)||null,setItem:(k,v)=>storage.set(k,v)},document:{querySelector:get,querySelectorAll:()=>difficulties,createElement:()=>new Element()},window:{scrollTo(){}},setInterval:(fn)=>{timers.set(++seq,fn);return seq},clearInterval:id=>timers.delete(id),setTimeout:()=>++seq,clearTimeout(){}});
for(const file of ['run-extra.js','run-variety.js','azeroth-run-engine.js','run.js'])vm.runInContext(fs.readFileSync('public/'+file,'utf8'),context);
const evaluate=code=>vm.runInContext(code,context),flush=()=>new Promise(resolve=>setImmediate(resolve));
(async()=>{
 evaluate('startRun()');await flush();assert.equal(evaluate('run.length'),12);
 for(let i=0;i<12;i++){
  await flush();assert.equal(evaluate('round'),i);
  const mode=evaluate('run[round].mode');
  if(mode==='audio'){
   assert.equal(timers.size,0);assert(get('#answerGrid').children.every(b=>b.disabled));
   await evaluate('playAudioSignal()');assert.equal(timers.size,1);
  }
  if(i===6){evaluate('mediaFailure("test")');assert.equal(timers.size,0);assert.equal(evaluate('locked'),true);const score=evaluate('score');evaluate('answer(run[round].question.answer)');assert.equal(evaluate('score'),score);get('#skipMedia').emit('click');assert.equal(evaluate('skippedCount'),1);continue}
  if(mode==='geo')evaluate('finishGeo({x:run[round].question.x,y:run[round].question.y})');else evaluate('answer(run[round].question.answer)');
  const score=evaluate('score');evaluate('answer(run[round].question.answer)');assert.equal(evaluate('score'),score);assert.equal(timers.size,0);
  get('#nextQuestion').emit('click');if(i<11){get('#nextQuestion').emit('click');assert.equal(evaluate('round'),i+1,'double next must not skip an unanswered round')}
 }
 assert.equal(evaluate('correctCount'),11);assert.equal(get('#endScreen').hidden,false);assert.equal(get('#familyRecap').children.length,4);assert.match(get('#endSummary').textContent,/11 jouables/);
 console.log('Azeroth flow: 12 étapes, lecture avant chrono, média passé sans pénalité, doubles clics et bilan vérifiés.');
})().catch(error=>{console.error(error);process.exitCode=1});
