"use client";
import {useEffect,useRef,useState} from 'react';
import {GameNav} from '../game-nav';
import {ArcadeCue} from '../arcade-cue';
import {questionIdentity,type Difficulty,type QuizQuestion} from './quiz-data';
import {localPokemonArt} from './pokemon-local-art';
import {buildPokemonRun,pokemonAnswer,pokemonNext,pokemonSkip,pokemonScore,pokemonFamily,pokemonFamilies,pokemonTiers,restorePokemonRun,type PokemonSession} from '../../lib/pokemon-run';
import styles from './pokemon-run.module.css';
const saveKey='ld-pokemon-run-v1',historyKey='ld-pokemon-run-history-v1';
const levelNames={easy:'Facile',normal:'Normal',expert:'Expert'},phaseNames=['Découverte','Réflexion','Maîtrise'];
function Picture({q,revealed,onFailure}:{q:QuizQuestion;revealed:boolean;onFailure:()=>void}){
 const id=Number(q.image?.match(/\/(\d+)\.png$/)?.[1]),local=localPokemonArt.has(id),[remote,setRemote]=useState(false);
 return <img src={local&&!remote?`/assets/reveal/${id}.png`:q.image} alt="Pokémon de l’épreuve" className={q.imageMode==='silhouette'&&!revealed?styles.masked:''} onError={()=>{if(local&&!remote)setRemote(true);else onFailure()}}/>;
}
export function PokemonRunClient({bank,initialLevel='normal'}:{bank:QuizQuestion[];initialLevel?:Difficulty}){
 const [session,setSession]=useState<PokemonSession|null>(null),[saved,setSaved]=useState<PokemonSession|null>(null),[level,setLevel]=useState(initialLevel),[ready,setReady]=useState(false),[storageError,setStorageError]=useState(false),[mediaError,setMediaError]=useState(false),focus=useRef<HTMLHeadingElement>(null),feedback=useRef<HTMLDivElement>(null);
 useEffect(()=>{try{const prior=restorePokemonRun(localStorage.getItem(saveKey),bank);if(prior&&prior.index<15)setSaved(prior)}catch{setStorageError(true)}setReady(true)},[bank]);
 useEffect(()=>{setMediaError(false);if(session){focus.current?.focus({preventScroll:true});focus.current?.scrollIntoView({block:'nearest',behavior:'instant'})}},[session?.seed,session?.index]);
 useEffect(()=>{if(session?.answers[session.index]!==null)feedback.current?.scrollIntoView({block:'nearest',behavior:'instant'})},[session?.answers]);
 function persist(next:PokemonSession){try{localStorage.setItem(saveKey,JSON.stringify(next));setStorageError(false)}catch{setStorageError(true)}setSession(next)}
 function start(){let history:string[]=[];try{const h=JSON.parse(localStorage.getItem(historyKey)||'[]');if(Array.isArray(h))history=h.filter(v=>typeof v==='string').slice(-500)}catch{}
  const seed=crypto.getRandomValues(new Uint32Array(1))[0],deck=buildPokemonRun(bank,seed,level,history),ids=deck.map(questionIdentity);
  try{localStorage.setItem(historyKey,JSON.stringify([...history.filter(id=>!ids.includes(id)),...ids].slice(-500)))}catch{setStorageError(true)}
  setSaved(null);persist({version:1,seed,level,deck,answers:deck.map(()=>null),index:0,skipped:[]});
 }
 const stats=session?pokemonScore(session):null,q=session?.deck[session.index],picked=session?.answers[session.index],answered=picked!==null&&picked!==undefined,done=session?.index===15,phase=session?Math.min(2,Math.floor(session.index/5)):0;
 return <main className={styles.shell}>
  <header className={styles.top}><a href="/home.html">Lore Diff</a><b>POKÉMON RUN</b><a href="/pokemon.html">Pokéidle</a></header><GameNav/>
  <ArcadeCue type={done?'finish':session?answered?(picked===q?.correct?'correct':picked===-1?'round':'wrong'):'round':undefined} id={session?`${session.seed}:${session.index}:${picked}`:'lobby'} reset={session?.index===0&&!answered} points={answered&&picked===q?.correct?1000:undefined}/>
  {!session?<section className={styles.lobby}>
   <div><small>DE KANTO À SINNOH</small><h1>Ta prochaine<br/>aventure Pokémon.</h1><p>Reconnais un Pokémon, exploite ses types et retrouve ses évolutions. Quinze épreuves, sans chrono.</p><div className={styles.families}>{Object.values(pokemonFamilies).map(name=><span key={name}>{name}</span>)}</div>
   <fieldset className={styles.levels}><legend>Point de départ</legend>{(['easy','normal','expert'] as Difficulty[]).map(value=><button key={value} aria-pressed={level===value} onClick={()=>setLevel(value)}><b>{levelNames[value]}</b><small>{levelNames[pokemonTiers[value][0]]} → {levelNames[pokemonTiers[value][2]]}</small></button>)}</fieldset>
   <div className={styles.actions}>{saved&&<button className={styles.primary} onClick={()=>{setSaved(null);setLevel(saved.level);persist(saved)}}>Reprendre · épreuve {saved.index+1}/15</button>}<button className={saved?styles.secondary:styles.primary} disabled={!ready} onClick={start}>{!ready?'Préparation…':saved?'Nouvelle partie':'Lancer le Run'}</button><a href="/multi?mode=pokemon">Jouer avec mes amis</a></div></div><img src="/assets/arcade/gengar.png" alt="Ectoplasma"/>
  </section>:done?<section className={styles.finish}>
   <small>AVENTURE TERMINÉE</small><h1>{stats?.correct===stats?.played&&stats?.played?'Sans faute !':'Run terminé.'}</h1><strong>{stats?.score.toLocaleString('fr-FR')} <span>points</span></strong><p>{stats?.correct} bonnes réponses sur {stats?.played} épreuves jouables.{session.skipped.length>0&&` ${session.skipped.length} visuel(s) indisponible(s), sans pénalité.`}</p>
   <div className={styles.recap}>{Object.entries(pokemonFamilies).map(([id,label])=>{const records=session.deck.map((v,i)=>({q:v,a:session.answers[i]})).filter(r=>pokemonFamily(r.q)===id&&r.a!==-1);return records.length?<div key={id}><span>{label}</span><b>{records.filter(r=>r.a===r.q.correct).length}/{records.length}</b></div>:null})}</div>
   <details><summary>Revoir mes erreurs</summary>{session.deck.map((v,i)=>session.answers[i]!==v.correct&&session.answers[i]!==-1?<article key={i}><b>{v.prompt}</b><p>{v.options[v.correct]} · {v.fact}</p></article>:null)}</details><div className={styles.actions}><button className={styles.primary} onClick={start}>Une autre aventure</button><a href="/home.html">Tous les jeux</a></div>
  </section>:q?<section className={styles.arena}>
   <div className={styles.hud}><div><small>{phaseNames[phase]} · {levelNames[q.difficulty||'normal']}</small><b>Épreuve {session.index+1}/15</b></div><div><small>Score</small><b data-arcade-score>{stats?.score.toLocaleString('fr-FR')}</b></div><button className={styles.exit} onClick={()=>{setSaved(session);setSession(null)}}>Pause</button></div>
   <div className={styles.progress} aria-label={`Épreuve ${session.index+1} sur 15`}>{session.deck.map((_,i)=><i key={i} className={i<session.index?styles.completed:i===session.index?styles.current:''}/>)}</div>
   <div className={styles.board}><div className={styles.play}><span className={styles.family}>{pokemonFamilies[pokemonFamily(q)]}</span><h1 ref={focus} tabIndex={-1}>{q.prompt}</h1>
    {mediaError?<div className={styles.mediaError} role="status"><p>Ce visuel n’a pas chargé. Tu peux réessayer ou passer sans perdre de points.</p><button onClick={()=>setMediaError(false)}>Réessayer</button><button onClick={()=>persist(pokemonSkip(session))}>Passer sans pénalité</button></div>:null}
    <div className={styles.answers} data-arcade-answers>{q.options.map((option,i)=><button key={option} disabled={answered||(!!q.image&&mediaError)} onClick={()=>persist(pokemonAnswer(session,i))} className={answered?(i===q.correct?styles.correct:i===picked?styles.wrong:styles.muted):''} data-answer-state={answered&&(i===q.correct||i===picked)?'revealed':undefined}><b>{'ABCD'[i]}</b><span>{option}</span></button>)}</div>
    {answered&&<div className={styles.feedback} ref={feedback} data-arcade-feedback role="status"><b>{picked===-1?'ÉPREUVE PASSÉE':picked===q.correct?'Bien vu · +1 000 points':'La réponse était…'}</b><strong>{q.options[q.correct]}</strong><p>{q.fact}</p><button className={styles.primary} onClick={()=>persist(pokemonNext(session))}>{session.index===14?'Voir mon résultat':'Continuer'}</button></div>}
   </div>{q.image&&!mediaError?<figure className={styles.art} key={`${session.seed}:${session.index}`}><Picture q={q} revealed={answered} onFailure={()=>setMediaError(true)}/><figcaption>{answered?'Pokémon révélé':q.imageMode==='silhouette'?'Qui se cache dans le flou ?':'Observe avant de choisir'}</figcaption></figure>:null}</div>
  </section>:null}
  <p className={styles.note}>{storageError?'La sauvegarde est indisponible sur cet appareil.':'Progression et historique sauvegardés sur cet appareil.'} Score solo libre · types actuels sauf indication.</p>
 </main>;
}
