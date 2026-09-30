export const ACTIONS = {
 attack:{label:'Attaque',cost:0,damage:40,mana:8},
 guard:{label:'Garde',cost:0,damage:18,mana:6},
 heal:{label:'Soin',cost:12,damage:0,mana:0},
 spell:{label:'Éclat astral',cost:16,damage:70,mana:0},
};
export const LEVELS={discovery:{hp:200,damage:0,time:30,label:'Découverte'},normal:{hp:280,damage:4,time:22,label:'Aventure'},heroic:{hp:360,damage:8,time:16,label:'Héroïque'}};
export function initial(level='normal'){return {level,hp:140,maxHp:140,mp:40,maxMp:40,boss:LEVELS[level].hp,maxBoss:LEVELS[level].hp,turn:1,correct:0,answers:0,phase:'action',action:null,outcome:null};}
export function intent(s){const fury=s.boss<=s.maxBoss/2;const heavy=s.turn%3===0;return {name:heavy?'Souffle ardent':'Griffes',damage:(heavy?30:16)+LEVELS[s.level].damage+(fury?8:0)+Math.max(0,s.turn-12)*5,heavy,fury};}
export function choose(s,action){if(s.phase!=='action'||!ACTIONS[action]||s.mp<ACTIONS[action].cost)return s;return {...s,phase:'question',action};}
export function resolve(s,correct){if(s.phase!=='question')return null;const a=ACTIONS[s.action],i=intent(s);let hp=s.hp,mp=s.mp,boss=s.boss;let hit=0,heal=0;
 if(correct){mp=Math.min(s.maxMp,mp-a.cost+a.mana);hit=Math.min(boss,a.damage);boss-=hit;if(s.action==='heal'){heal=Math.min(42,s.maxHp-hp);hp+=heal;}}
 const incoming=boss===0?0:Math.ceil((i.damage+(correct?0:10))*(correct&&s.action==='guard'?.3:1));hp=Math.max(0,hp-incoming);
 const outcome=boss===0?'win':hp===0?'lose':null;
 return {state:{...s,hp,mp,boss,answers:s.answers+1,correct:s.correct+Number(correct),phase:outcome?'finished':'review',outcome},hit,heal,incoming,correct,intent:i};
}
export function next(s){return s.phase==='review'?{...s,turn:s.turn+1,phase:'action',action:null}:s;}
