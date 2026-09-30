"use client";
import { useEffect } from 'react';

type Cue = { type?:string; id?:string; label?:string; detail?:string; points?:number; reset?:boolean; streak?:number };
export function ArcadeCue({ type, id, label, detail, points, reset, streak }:Cue) {
  useEffect(() => {
    let sent=false;
    const send=()=>{if(sent)return;sent=true;if(type)window.dispatchEvent(new CustomEvent('lore:beat',{detail:{type,label,detail,points,reset,streak}}));};
    if(document.documentElement.dataset.arcadeReady==='true')send();
    else {
      window.addEventListener('lore:ready',send);
      if(!document.getElementById('arcade-script')){const script=document.createElement('script');script.id='arcade-script';script.src='/arcade-fx.js';script.onerror=()=>script.remove();document.body.appendChild(script);}
    }
    return()=>window.removeEventListener('lore:ready',send);
  },[type,id,label,detail,points,reset,streak]);
  return null;
}
