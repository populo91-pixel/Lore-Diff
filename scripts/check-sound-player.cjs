// State-machine checks with simulated media events, NOT a real audio playback test.
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const code=fs.readFileSync('public/sound.js','utf8');
class Element extends EventTarget {
  constructor(){super();this.hidden=false;this.disabled=false;this.textContent='';this.value='';this.currentTime=0;this.duration=30;this.paused=true;this.children=[];this.classList={add(){},remove(){},toggle(){}}}
  pause(){this.paused=true} play(){this.paused=false;return Promise.resolve()}
  load(){} removeAttribute(k){delete this[k]} replaceChildren(){this.children=[]} append(e){this.children.push(e)}
  querySelector(){return this.children[0]} focus(){}
}
function setup(sources={}){
  const elements=new Map();const get=id=>{if(!elements.has(id))elements.set(id,new Element());return elements.get(id)};
  get('#soundMeter').children=Array.from({length:4},()=>new Element());
  const tracks=[{id:1,name:'One',aliases:['one'],track:'Track one',artist:'Artist one'},{id:2,name:'Two',aliases:['two'],track:'Track two',artist:'Artist two'}];
  const timers=new Map();let next=0;const requests=[];
  const context=vm.createContext({console,Event,AbortSignal,document:{querySelector:get,createElement:()=>new Element(),addEventListener(){}},window:{addEventListener(){}},localStorage:{getItem:()=>null,setItem(){}},setTimeout:fn=>{timers.set(++next,fn);return next},clearTimeout:id=>timers.delete(id),fetch:async url=>{requests.push(url);return {ok:true,json:async()=>url.includes('sources')?sources:tracks}}});
  vm.runInContext(code,context);return {context,get,timers,requests,run:s=>vm.runInContext(s,context)};
}
const flush=async()=>{for(let i=0;i<12;i++)await Promise.resolve()};
const source={src:'/audio/soundcheck/test.mp3',startSeconds:3,sourceUrl:'https://example.com/credits',attribution:'Test fixture only'};
(async()=>{
  const empty=setup();await flush();assert.equal(empty.get('#playSound').textContent,'EXTRAITS INDISPONIBLES');assert.equal(empty.get('#soundSubmit').disabled,true);assert.equal(empty.get('#soundOtherModes').hidden,false);assert.equal(empty.requests.length,2);
  const one=setup({1:source});await flush();one.get('#soundSource').dispatchEvent(new Event('loadedmetadata'));await flush();assert.equal(one.get('#playSound').disabled,false);assert.equal(one.get('#roundCount').textContent,'1 / 1');assert.equal(one.get('#soundSubmit').disabled,true);
  for(const seconds of [2,4,7,12]){
    await one.run('play()');assert.equal(one.get('#soundSource').currentTime,3);assert.equal(one.get('#soundSubmit').disabled,false);
    one.get('#soundSource').currentTime=3+seconds;one.get('#soundSource').dispatchEvent(new Event('timeupdate'));assert.equal(one.get('#soundSource').paused,true);
    if(seconds!==12)one.run('hint()');
  }
  one.run('reveal(true)');assert.equal(one.get('#soundResult').hidden,false);one.get('#soundNext').dispatchEvent(new Event('click'));assert.equal(one.get('#soundComplete').hidden,false);
  const short=setup({1:source});await flush();short.get('#soundSource').duration=5;short.get('#soundSource').dispatchEvent(new Event('loadedmetadata'));await flush();assert.equal(short.get('#playSound').disabled,true);assert.equal(short.get('#soundRetry').hidden,false);
  const timeout=setup({1:source});await flush();for(const fn of [...timeout.timers.values()])fn();await flush();assert.equal(timeout.get('#playSound').textContent,'EXTRAIT INDISPONIBLE');
  const skip=setup({1:source,2:source});await flush();skip.get('#soundSource').dispatchEvent(new Event('error'));await flush();skip.get('#soundSkip').dispatchEvent(new Event('click'));await flush();skip.get('#soundSource').dispatchEvent(new Event('loadedmetadata'));await flush();assert.equal(skip.get('#roundCount').textContent,'1 / 1');assert.equal(skip.get('#mistakeCount').textContent,0);assert.equal(skip.get('#scoreCount').textContent,'0000');
  const bad=setup({1:{...source,src:'https://example.com/unverified.mp3'}});await flush();assert.equal(bad.get('#playSound').disabled,true);
  console.log('Sound player: empty catalogue, 2/4/7/12s media boundaries, one-round completion, short/broken/timed-out audio and skipping checked with simulated events. No real OST tested.');
})().catch(error=>{console.error(error);process.exitCode=1});
