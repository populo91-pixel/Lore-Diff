// Screen-space battle feedback. All effects stop for reduced motion or a hidden tab.
const canvas=document.getElementById('battle-effects'),ctx=canvas.getContext('2d');
let raf=0,active=null;
const reduced=()=>document.hidden||document.body.classList.contains('motion-reduced')||matchMedia('(prefers-reduced-motion: reduce)').matches;
const palette={spell:['#fff4fb','#d8aeff','#927bff'],heal:['#fffbd1','#95ffd0','#3cceae'],guard:['#ffffff','#a7e8ff','#69aaff'],fire:['#fff4a8','#ffca59','#ff7145'],attack:['#ffffff','#fff1ac','#ffc46d'],rage:['#ffdc8c','#ff704b','#ec497b']};
export function clearBattleEffect(){cancelAnimationFrame(raf);active=null;ctx.clearRect(0,0,canvas.width,canvas.height);}
export function battleEffect(type){clearBattleEffect();if(reduced())return;const rect=canvas.getBoundingClientRect();canvas.width=Math.round(rect.width);canvas.height=Math.round(rect.height);const center=id=>{const r=document.getElementById(id).getBoundingClientRect();return{x:r.left-rect.left+r.width*.5,y:r.top-rect.top+r.height*.53}};
 const hero=center('hero'),enemy=center('enemy'),target=['heal','guard','fire','claw'].includes(type)?hero:enemy,source=type==='fire'?enemy:hero;
 const colors=palette[type]||palette.attack;
 const particles=Array.from({length:type==='fire'?65:42},(_,i)=>({angle:Math.random()*Math.PI*2,speed:35+Math.random()*170,size:3+Math.random()*6,delay:Math.random()*.18,color:colors[i%colors.length]}));
 active={start:performance.now(),type,target,source,particles,colors};
 function draw(now){if(!active||reduced()){clearBattleEffect();return;}const t=(now-active.start)/1000;ctx.clearRect(0,0,canvas.width,canvas.height);if(t>1.1){clearBattleEffect();return;}const {type,target,source,particles,colors}=active;
 if(type==='spell'||type==='fire'){const progress=Math.min(1,t/.4);const x=source.x+(target.x-source.x)*progress,y=source.y+(target.y-source.y)*progress;for(let i=0;i<8;i++){ctx.globalAlpha=(1-i/8)*Math.max(0,1-t/.7);ctx.fillStyle=colors[i%3];const size=(type==='fire'?35:23)-i*2;ctx.fillRect(x+(type==='fire'?-1:1)*i*10-size/2,y-size/2,size,size);}}
 if(type==='guard'){ctx.strokeStyle='#acf0ff';ctx.lineWidth=5;ctx.globalAlpha=Math.max(0,1-t);ctx.beginPath();ctx.ellipse(target.x,target.y,55+t*15,85+t*15,0,0,Math.PI*2);ctx.stroke();}
 if(type==='attack'||type==='claw'){ctx.strokeStyle='#fff5b1';ctx.lineWidth=8;ctx.globalAlpha=Math.max(0,1-t*2);for(let i=0;i<3;i++){ctx.beginPath();ctx.moveTo(target.x-45+i*30,target.y-55);ctx.lineTo(target.x+20+i*30,target.y+45);ctx.stroke();}}
 const burstStart=['fire','spell'].includes(type)?.3:0;
 for(const p of particles){const age=t-p.delay-burstStart;if(age<0)continue;ctx.globalAlpha=Math.max(0,1-age/0.8);ctx.fillStyle=p.color;const x=target.x+Math.cos(p.angle)*p.speed*age;const y=target.y+Math.sin(p.angle)*p.speed*age+(type==='heal'?-age*100:age*age*65);ctx.fillRect(Math.round(x),Math.round(y),p.size,p.size);}
 ctx.globalAlpha=1;raf=requestAnimationFrame(draw);}
 raf=requestAnimationFrame(draw);
}
addEventListener('pagehide',clearBattleEffect);document.addEventListener('visibilitychange',()=>{if(document.hidden)clearBattleEffect();});
