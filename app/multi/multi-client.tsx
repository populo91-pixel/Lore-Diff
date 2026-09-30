"use client";

import { GameNav } from "../game-nav";
import { ArcadeCue } from "../arcade-cue";
import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Player = { id:string;nickname:string;isHost:boolean;score:number;correctCount:number;avatarSeed:number;connected:boolean };
type Question = { id:string;type:string;era:string;universe:"wow"|"pokemon"|"dofus"|"runeterra";prompt:string;options:string[];audio:string|null;image:string|null;imageMode:"cover"|"silhouette"|"zoom"|null;correctIndex?:number;fact?:string };
type MultiMode = "mega"|"wow"|"pokemon"|"dofus"|"runeterra";
type Snapshot = {
  room:{ code:string;status:string;questionCount:number;mode:MultiMode };
  me:{ id:string;nickname:string;isHost:boolean };
  players:Player[];
  phase:"lobby"|"countdown"|"answer"|"reveal"|"finished";
  round:number;
  remainingMs:number;
  answeredCount:number;
  selectedChoice:number|null;
  question:Question|null;
};

const AVATAR_SIGNS = ["◆","▲","●","✦","■","✚","⬟","⌁"];
const MODE_INFO:Record<MultiMode,{label:string;title:string;description:string;questions:number;universes:number}> = {
  mega:{ label:"MÉGA QUIZ",title:"ENTRE DANS L’ARÈNE.",description:"WoW, Pokémon, Dofus et League of Legends. Un tournoi à cinq manches, classement en direct.",questions:20,universes:4 },
  wow:{ label:"AZEROTH RUN // MULTI",title:"DÉFIE TES POTES.",description:"Une partie entièrement consacrée à Warcraft : lore, instances, personnages, loot et extensions.",questions:20,universes:1 },
  pokemon:{ label:"KANTO RUN // MULTI",title:"DÉFIE TES POTES.",description:"Une partie 100 % Pokémon : types, évolutions, Pokédex et connexions de Kanto.",questions:15,universes:1 },
  dofus:{ label:"KROSMOZ RUN // MULTI",title:"DÉFIE TES POTES.",description:"Une partie 100 % Dofus : boss, zones, personnages et lore du Monde des Douze.",questions:15,universes:1 },
  runeterra:{ label:"RUNETERRA RUN // MULTI",title:"DÉFIE TES POTES.",description:"Une partie 100 % League of Legends : champions, régions, compétences et lore.",questions:20,universes:1 },
};

function tokenKey(code: string) { return `lorediff:room:${code}`; }

function Avatar({ player,big = false }: { player:Pick<Player,"nickname"|"avatarSeed">;big?:boolean }) {
  return <span className={`m-avatar seed-${player.avatarSeed % 8}${big ? " big" : ""}`} aria-hidden="true">
    <i>{AVATAR_SIGNS[player.avatarSeed % AVATAR_SIGNS.length]}</i><b>{player.nickname.slice(0,2).toUpperCase()}</b>
  </span>;
}

export function MultiClient() {
  const [snapshot,setSnapshot] = useState<Snapshot|null>(null);
  const [code,setCode] = useState("");
  const [token,setToken] = useState("");
  const [nickname,setNickname] = useState("");
  const [joinCode,setJoinCode] = useState("");
  const [selectedMode,setSelectedMode] = useState<MultiMode>("mega");
  const [busy,setBusy] = useState(false);
  const [error,setError] = useState("");
  const [copied,setCopied] = useState(false);

  const api = useCallback(async (path:string,init?:RequestInit,authToken = token) => {
    const response = await fetch(path,{
      ...init,
      headers:{ "Content-Type":"application/json",...(authToken ? { Authorization:`Bearer ${authToken}` } : {}),...(init?.headers || {}) },
    });
    const data = await response.json() as any;
    if (!response.ok) throw new Error(data.error || "Erreur réseau");
    return data;
  },[token]);

  const loadRoom = useCallback(async (roomCode = code,roomToken = token) => {
    if (!roomCode || !roomToken) return;
    try {
      const data = await api(`/api/rooms/${roomCode}`,undefined,roomToken) as Snapshot;
      setSnapshot(data);
      setError("");
    } catch (cause) {
      const message = cause instanceof Error ? cause.message : "Connexion au salon impossible.";
      setError(message);
      if (message.includes("rejoindre") || message.includes("invalide")) {
        localStorage.removeItem(tokenKey(roomCode));
        setToken("");
        setSnapshot(null);
      }
    }
  },[api,code,token]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const requestedMode = params.get("mode");
    if (requestedMode && requestedMode in MODE_INFO) setSelectedMode(requestedMode as MultiMode);
    const room = params.get("room")?.toUpperCase() || "";
    if (!room) return;
    setJoinCode(room);
    setCode(room);
    const saved = localStorage.getItem(tokenKey(room)) || "";
    if (saved) setToken(saved);
  },[]);

  useEffect(() => {
    if (snapshot?.room.mode) setSelectedMode(snapshot.room.mode);
  },[snapshot?.room.mode]);

  useEffect(() => {
    if (!code || !token) return;
    loadRoom(code,token);
    const interval = window.setInterval(() => loadRoom(code,token),1_000);
    return () => window.clearInterval(interval);
  },[code,token,loadRoom]);

  const enterRoom = (roomCode:string,playerToken:string) => {
    localStorage.setItem(tokenKey(roomCode),playerToken);
    setCode(roomCode);
    setToken(playerToken);
    window.history.replaceState({},"",`/multi?room=${roomCode}`);
  };

  const createRoom = async (event:FormEvent) => {
    event.preventDefault(); setBusy(true); setError("");
    try {
      const data = await api("/api/rooms",{ method:"POST",body:JSON.stringify({ nickname,mode:selectedMode }) },"");
      enterRoom(data.roomCode,data.playerToken);
    } catch (cause) { setError(cause instanceof Error ? cause.message : "Création impossible."); }
    finally { setBusy(false); }
  };

  const joinRoom = async (event:FormEvent) => {
    event.preventDefault(); setBusy(true); setError("");
    const room = joinCode.trim().toUpperCase();
    try {
      const data = await api(`/api/rooms/${room}`,{ method:"POST",body:JSON.stringify({ action:"join",nickname }) },"");
      enterRoom(data.roomCode,data.playerToken);
    } catch (cause) { setError(cause instanceof Error ? cause.message : "Salon inaccessible."); }
    finally { setBusy(false); }
  };

  const action = async (payload:Record<string,unknown>) => {
    setBusy(true); setError("");
    try { await api(`/api/rooms/${code}`,{ method:"POST",body:JSON.stringify(payload) }); await loadRoom(); }
    catch (cause) { setError(cause instanceof Error ? cause.message : "Action impossible."); }
    finally { setBusy(false); }
  };

  const copyInvite = async () => {
    await navigator.clipboard.writeText(`${window.location.origin}/multi?room=${code}`);
    setCopied(true); window.setTimeout(() => setCopied(false),1_600);
  };

  const leave = () => {
    if (code) localStorage.removeItem(tokenKey(code));
    setSnapshot(null); setCode(""); setToken(""); setError("");
    window.history.replaceState({},"","/multi");
  };

  const currentPlayer = snapshot?.players.find(player => player.id === snapshot.me.id);
  const modeInfo = MODE_INFO[snapshot?.room.mode || selectedMode];
  const questionCount = modeInfo.questions;
  const questionsPerRound = Math.ceil(questionCount / 5);
  const timerMax = snapshot?.phase === "countdown" ? 3_000 : snapshot?.phase === "answer" ? 18_000 : 6_000;
  const timerPercent = snapshot ? Math.max(0,Math.min(100,(snapshot.remainingMs / timerMax) * 100)) : 0;
  const podium = useMemo(() => snapshot?.players.slice(0,3) || [],[snapshot]);

  return <main className="multi-app">
    <ArcadeCue type={snapshot?.phase === 'reveal' ? (snapshot.selectedChoice === snapshot.question?.correctIndex ? 'correct' : 'wrong') : snapshot?.phase === 'finished' ? 'finish' : snapshot?.phase === 'answer' ? 'round' : undefined} id={`${code}:${snapshot?.round}:${snapshot?.phase}`} reset={snapshot?.round === 0 && snapshot?.phase === 'answer'} label={snapshot?.phase === 'finished' ? 'MATCH TERMINÉ' : snapshot?.phase === 'answer' ? `ÉPREUVE ${snapshot.round+1} / ${snapshot.room.questionCount}` : undefined} />
    <div className="multi-scan" aria-hidden="true" />
    <header className="multi-topbar">
      <a href="/home.html" className="multi-brand"><i>LD</i><span>LORE//DIFF</span><b>MULTI</b></a>
      {code && <span className="top-room">ROOM {code}</span>}
      {snapshot ? <button type="button" onClick={leave}>QUITTER</button> : <a href="/home.html">← MODES</a>}
    </header><GameNav />

    {!snapshot && <section className="multi-entry">
      <div className="entry-title">
        <span>{modeInfo.label} // 2–8 JOUEURS</span>
        <h1>{modeInfo.title.split(" ").slice(0,-1).join(" ")}<br/><em>{modeInfo.title.split(" ").at(-1)}</em></h1>
        <p>{modeInfo.description}</p>
      </div>
      <div className="entry-forms">
        <form onSubmit={createRoom} className="entry-card create-card">
          <span className="entry-no">01</span><small>NOUVEAU SALON</small><h2>CRÉER</h2>
          <label htmlFor="createName">TON PSEUDO</label>
          <Input id="createName" value={nickname} onChange={event => setNickname(event.target.value)} maxLength={16} placeholder="Ex: Populo" autoComplete="nickname" />
          <Button type="submit" disabled={busy}>CRÉER LE SALON <b>→</b></Button>
        </form>
        <form onSubmit={joinRoom} className="entry-card join-card">
          <span className="entry-no">02</span><small>CODE D’INVITATION</small><h2>REJOINDRE</h2>
          <div className="join-fields">
            <label htmlFor="joinCode">CODE DU SALON</label>
            <Input id="joinCode" value={joinCode} onChange={event => setJoinCode(event.target.value.toUpperCase())} maxLength={6} placeholder="AZ7K2P" autoCapitalize="characters" />
            <label htmlFor="joinName">TON PSEUDO</label>
            <Input id="joinName" value={nickname} onChange={event => setNickname(event.target.value)} maxLength={16} placeholder="Ex: Arthas91" autoComplete="nickname" />
          </div>
          <Button type="submit" disabled={busy}>ENTRER DANS LE SALON <b>→</b></Button>
        </form>
      </div>
      {error && <p className="multi-error" role="alert">{error}</p>}
    </section>}

    {snapshot?.phase === "lobby" && <section className="lobby-screen">
      <div className="lobby-main">
        <span className="eyebrow">SALON PRIVÉ // EN ATTENTE</span>
        <div className="room-code"><small>CODE DE LA ROOM</small><strong>{snapshot.room.code}</strong></div>
        <Button className="copy-button" onClick={copyInvite}>{copied ? "LIEN COPIÉ ✓" : "COPIER LE LIEN D’INVITATION"}</Button>
        <p>Envoie le code ou le lien à tes amis. Aucun compte nécessaire.</p>
        {snapshot.me.isHost ? <div className="host-controls">
          <small>FORMAT DU TOURNOI</small>
          <div className="mega-format"><span><b>05</b> MANCHES</span><span><b>{String(questionCount).padStart(2,"0")}</b> QUESTIONS</span><span><b>{String(modeInfo.universes).padStart(2,"0")}</b> UNIVERS</span></div>
          <Button className="start-button" disabled={busy || snapshot.players.length < 2} onClick={() => action({ action:"start",questionCount })}>LANCER {selectedMode === "mega" ? "LE MÉGA QUIZ" : "LE RUN MULTI"} <b>→</b></Button>
          {snapshot.players.length < 2 && <small className="need-player">EN ATTENTE D’UN ADVERSAIRE…</small>}
        </div> : <div className="guest-wait"><i /><b>L’HÔTE PRÉPARE LA PARTIE</b><span>Le lancement sera automatique pour tous les joueurs.</span></div>}
        {error && <p className="multi-error" role="alert">{error}</p>}
      </div>
      <aside className="roster-panel">
        <div className="roster-head"><span>JOUEURS CONNECTÉS</span><b>{snapshot.players.length}/8</b></div>
        <ol>{snapshot.players.map((player,index) => <li key={player.id}>
          <span className="player-rank">{String(index+1).padStart(2,"0")}</span><Avatar player={player} />
          <div><b>{player.nickname}</b><small>{player.isHost ? "HÔTE" : player.connected ? "PRÊT" : "RECONNEXION"}</small></div>
          <i className={player.connected ? "online" : ""} />
        </li>)}</ol>
      </aside>
    </section>}

    {snapshot?.phase === "countdown" && <section className="countdown-screen">
      <span>CONNEXION DES JOUEURS</span><strong>{Math.max(1,Math.ceil(snapshot.remainingMs/1000))}</strong><p>LA PARTIE COMMENCE</p>
    </section>}

    {snapshot && (snapshot.phase === "answer" || snapshot.phase === "reveal") && snapshot.question && <section className="match-screen">
      <aside className="match-scoreboard">
        <span className="side-title">CLASSEMENT LIVE</span>
        <ol>{snapshot.players.map((player,index) => <li key={player.id} className={player.id === snapshot.me.id ? "me" : ""}>
          <b className="place">{index+1}</b><Avatar player={player} /><span>{player.nickname}<small>{player.correctCount} BONNES</small></span><strong>{player.score}</strong>
        </li>)}</ol>
      </aside>
      <div className="match-main">
        <div className="match-head"><span>MANCHE {Math.min(5,Math.floor(snapshot.round/questionsPerRound)+1)} / 05 · QUESTION {(snapshot.round%questionsPerRound)+1} / {Math.min(questionsPerRound,questionCount-Math.floor(snapshot.round/questionsPerRound)*questionsPerRound)}</span><b>{["FLASH MIX","PORTRAITS","MONDES","CONNEXIONS","FINAL BLITZ"][Math.min(4,Math.floor(snapshot.round/questionsPerRound))]} · {snapshot.question.type}</b><strong>{Math.ceil(snapshot.remainingMs/1000)}<small>SEC</small></strong></div>
        <div className="multi-timer"><i style={{ width:`${timerPercent}%` }} /></div>
        <article className={`question-card universe-${snapshot.question.universe}`}>
          <div className="question-signal"><span>{snapshot.question.universe === "wow" ? "WARCRAFT" : snapshot.question.universe === "runeterra" ? "LEAGUE OF LEGENDS" : snapshot.question.universe.toUpperCase()} // {snapshot.question.era}</span><b>{snapshot.question.type === "QUI A DIT ÇA" ? "VO" : "Q"}{String(snapshot.round+1).padStart(2,"0")}</b></div>
          {snapshot.question.image && <div key={snapshot.question.id} className={`multi-question-visual ${snapshot.question.imageMode || "cover"} ${snapshot.phase === "reveal" ? "revealed" : ""}`}>
            <img src={snapshot.question.image} alt="Indice visuel de la question" onError={event => event.currentTarget.parentElement?.classList.add("is-broken")} />
            <span>VISUEL INDISPONIBLE · QUESTION TEXTE ACTIVE</span>
          </div>}
          {snapshot.question.audio && <audio key={snapshot.question.id} src={snapshot.question.audio} controls preload="metadata" />}
          <span className="question-era">ARCHIVE {snapshot.question.era}</span>
          <h2>{snapshot.question.prompt}</h2>
          <div className="multi-answers">{snapshot.question.options.map((option,index) => {
            const selected = snapshot.selectedChoice === index;
            const correct = snapshot.phase === "reveal" && snapshot.question?.correctIndex === index;
            const wrong = snapshot.phase === "reveal" && selected && !correct;
            return <Button key={option} disabled={snapshot.phase !== "answer" || snapshot.selectedChoice !== null || busy} className={`${selected ? "selected" : ""} ${correct ? "correct" : ""} ${wrong ? "wrong" : ""}`} onClick={() => action({ action:"answer",round:snapshot.round,choice:index })}><b>{String.fromCharCode(65+index)}</b><span>{option}</span></Button>;
          })}</div>
          {snapshot.phase === "answer" && snapshot.selectedChoice !== null && <p className="answer-locked">RÉPONSE VERROUILLÉE · {snapshot.answeredCount}/{snapshot.players.length} JOUEURS ONT RÉPONDU</p>}
          {snapshot.phase === "reveal" && <div className="reveal-fact"><b>{snapshot.selectedChoice === snapshot.question.correctIndex ? "CORRECT" : "RÉPONSE"}</b><p>{snapshot.question.fact}</p></div>}
        </article>
      </div>
    </section>}

    {snapshot?.phase === "finished" && <section className="finish-screen">
      <span className="eyebrow">MATCH TERMINÉ // {snapshot.room.questionCount} QUESTIONS</span>
      <h1>FIN DE<br/><em>TRANSMISSION.</em></h1>
      <div className="podium">{podium.map((player,index) => <div key={player.id} className={`podium-${index+1}`}><span>{index+1}</span><Avatar player={player} big /><b>{player.nickname}</b><strong>{player.score} PTS</strong><small>{player.correctCount}/{snapshot.room.questionCount} BONNES RÉPONSES</small></div>)}</div>
      {currentPlayer && <p className="my-result">TON SCORE : <b>{currentPlayer.score}</b> · POSITION <b>#{snapshot.players.findIndex(player => player.id === currentPlayer.id)+1}</b></p>}
      <div className="finish-actions">{snapshot.me.isHost && <Button disabled={busy} onClick={() => action({ action:"start",questionCount })}>REVANCHE <b>↻</b></Button>}<Button variant="outline" className="secondary" onClick={leave}>NOUVEAU SALON</Button></div>
      {error && <p className="multi-error" role="alert">{error}</p>}
    </section>}
  </main>;
}
