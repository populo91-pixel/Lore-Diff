export const CLIPS={
 hero:{idle:{frames:[0,1,0,1],step:280,loop:true},strike:{frames:[2,2,3,3,4,4,5,2,0],step:85},shield:{frames:[0,5,5,5,5,5,0],step:130},casting:{frames:[0,6,6,6,6,0],step:140},healing:{frames:[0,6,6,6,0],step:160},hurt:{frames:[7,7,5,0],step:120}},
 enemy:{idle:{frames:[0,1,1,0],step:340,loop:true},strike:{frames:[2,2,3,3,0],step:140},breath:{frames:[2,4,4,5,5,5,0],step:150},hurt:{frames:[6,6,0],step:150},rage:{frames:[4,1,4,1,0],step:180},defeated:{frames:[7],step:1000,loop:true}}
};
export const IMPACT={attack:340,spell:480,guard:300,heal:300,claw:280,fire:570};
export function poseAt(actor,kind,elapsed){const clip=CLIPS[actor][kind]||CLIPS[actor].idle;const n=Math.floor(Math.max(0,elapsed)/clip.step);if(clip.loop)return clip.frames[n%clip.frames.length];return clip.frames[Math.min(n,clip.frames.length-1)];}
export function sceneLayout(W,H){const mobile=W<700,scale=Math.max(W/512,H/342)*(mobile?1.25:1),bw=512*scale,bh=342*scale,bx=(W-bw)/2,by=(H-bh)*(mobile?1:.48);const enemyFoot=Math.min(by+bh*.65,H*.64),heroFoot=Math.min(by+bh*.685,H*.66);return {background:{x:bx,y:by,w:bw,h:bh},enemy:{x:W*(mobile?.28:.26),y:enemyFoot,w:W*(mobile?.40:.28),h:H*(mobile?.21:.28)},hero:{x:W*(mobile?.75:.76),y:heroFoot,w:W*(mobile?.25:.16),h:H*(mobile?.17:.20)}};}
export function travelAt(id,kind,t,distance){if(kind!=='strike')return 0;const reach=id==='hero'?-distance*.55:distance*.15;if(t<.22)return reach*(t/.22);if(t<.57)return reach;return reach*Math.max(0,1-(t-.57)/.43);}
