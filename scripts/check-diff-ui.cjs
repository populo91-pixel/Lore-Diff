// Exercise the real interaction handlers with a small DOM adapter; no layout claim.
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
class Element{
 constructor(tag='div'){this.tagName=tag;this.children=[];this.style={};this.hidden=false;this.disabled=false;this.attributes={};this.classList={toggle(){},add(){},remove(){}}}
 append(...nodes){this.children.push(...nodes)}
 replaceChildren(...nodes){this.children=[...nodes]}
 setAttribute(name,value){this.attributes[name]=value}
 click(){if(!this.disabled)this.onclick?.()}
}
const nodes=new Map(),node=id=>{if(!nodes.has(id))nodes.set(id,new Element());return nodes.get(id)};
const posts=[],context=vm.createContext({document:{getElementById:node,createElement:tag=>new Element(tag),querySelector:()=>node('main')},Intl,Map,Array,AbortController,setTimeout,clearTimeout,window:{},fetch:async(url,init)=>{posts.push(JSON.parse(init.body));return{ok:true,json:async()=>({run:null,profile:{runs:0}})}}});
vm.runInContext(fs.readFileSync('public/the-diff.mjs','utf8').replace(/task\(\);\s*$/,''),context);
function show(question){vm.runInContext('run='+JSON.stringify({id:'ui-test',version:2,index:0,lives:3,score:0,secured:0,multiplier:1,rulesVersion:3,hints:2,phase:'question',choices:question.mechanic!=='deduction',question})+';player={runs:0};render()',context)}
function links(){const stage=node('mechanic-stage'),layout=stage.children[1];return{left:layout.children[0],right:layout.children[1],submit:stage.children.at(-1)}}
async function main(){
 show({world:'Azeroth',skill:'géographie',prompt:'Relie les capitales',mechanic:'association',difficulty:'easy',left:['Hurlevent','Forgefer','Darnassus'],targets:['Nains','Elfes de la nuit','Humains'],canClue:true,clueCount:0});
 let {left,right,submit}=links();assert(submit.disabled);assert(node('choices').hidden);assert(node('answer-early').hidden);right.children[2].click();assert(submit.disabled);right.children[0].click();assert(submit.disabled);right.children[1].click();assert(!submit.disabled);
 // A completed selection remains editable, and duplicate assignments clear the old row.
 left.children[0].click();right.children[0].click();assert(submit.disabled);right.children[2].click();assert(!submit.disabled);submit.click();await new Promise(setImmediate);assert.deepEqual(posts[0].order,[0,2,1]);assert.equal(posts[0].version,2);assert.equal(node('main').inert,false);
 show({world:'Pokémon',skill:'mécaniques',prompt:'Relie les types',mechanic:'association',difficulty:'easy',left:['Bulbizarre','Salamèche','Carapuce'],targets:['Eau','Feu','Plante / Poison'],confirmed:{row:0,target:2},canClue:false,clueCount:1});({left,right,submit}=links());assert(left.children[0].disabled);assert(right.children[2].disabled);right.children[1].click();right.children[0].click();assert(!submit.disabled);submit.click();await new Promise(setImmediate);assert.deepEqual(posts[1].order,[2,1,0]);
 show({world:'Runeterra',skill:'personnages',prompt:'Identifie le champion',mechanic:'deduction',difficulty:'normal',clues:['Un héros'],canClue:true,clueCount:1});assert(!node('answer-early').hidden);assert.equal(node('free-label').textContent,'SANS LES CHOIX · 150 PTS');assert.equal(node('reveal').textContent,'VOIR LES CHOIX · 50 PTS');
 show({world:'Azeroth',skill:'lore',prompt:'Écarte l’intrus',mechanic:'intruder',difficulty:'easy',options:['A','B','C','D'],canClue:false,clueCount:0});assert(!node('choices').hidden);assert(node('reveal').hidden);node('choices').children[3].click();await new Promise(setImmediate);assert.equal(posts[2].choice,3);
 console.log('Diff UI handlers: three-link completion, editing, duplicate removal, confirmed link, score labels and intruder submission passed');
}
main().catch(e=>{console.error(e);process.exitCode=1});
