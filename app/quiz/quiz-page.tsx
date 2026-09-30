import { GameNav } from "../game-nav";
import { ArcadeCue } from "../arcade-cue";
import type { CSSProperties } from "react";
import styles from "./quiz.module.css";
import type { Difficulty, UniverseConfig } from "./quiz-data";
import { prepareQuestions, questionIdentity } from "./quiz-data";

type RawParams = Record<string, string | string[] | undefined>;

function one(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

function integer(value: string | undefined, fallback: number, min: number, max: number): number {
  const parsed = Number.parseInt(value || "", 10);
  return Number.isFinite(parsed) ? Math.min(max, Math.max(min, parsed)) : fallback;
}

function query(base: string, values: Record<string, string | number>): string {
  const params = new URLSearchParams();
  Object.entries(values).forEach(([key, value]) => params.set(key, String(value)));
  return `${base}?${params.toString()}`;
}

const letters = ["A", "B", "C", "D"];

export function QuizPage({
  config,
  searchParams,
  count = 15,
  roundNames,
}: {
  config: UniverseConfig;
  searchParams: RawParams;
  count?: number;
  roundNames?: string[];
}) {
  const liveSeed = Math.floor(Date.now() / 1000);
  const started = one(searchParams.play) === "1";
  const seed = integer(one(searchParams.seed), liveSeed, 0, 2_000_000_000);
  const requestedDifficulty = one(searchParams.difficulty);
  const difficulty:Difficulty = requestedDifficulty === "easy" || requestedDifficulty === "expert" ? requestedDifficulty : "normal";
  const difficultyQuestions = config.questions.filter(question => (question.difficulty || "normal") === difficulty);
  const exclude = (one(searchParams.exclude)||"").slice(0,2000);
  const questions = prepareQuestions(difficultyQuestions,seed,Math.min(count,difficultyQuestions.length),exclude.split(","));
  const round = integer(one(searchParams.round), 0, 0, questions.length);
  const score = integer(one(searchParams.score), 0, 0, 999_999);
  const streak = integer(one(searchParams.streak), 0, 0, questions.length);
  const pickedRaw = one(searchParams.picked);
  const picked = pickedRaw === undefined ? null : integer(pickedRaw, -1, -1, 3);
  const answered = picked !== null && picked >= 0;

  if (!started) {
    return (
      <main className={`${styles.shell} ${styles[config.accent]}`}>
        <div className={styles.scanlines} aria-hidden="true" />
        <header className={styles.topbar}>
          <a href="/home.html">← ACCUEIL</a>
          <b><i>LD</i> {config.title} <span>{config.outline}</span></b>
          <a href={config.route}>RECOMMENCER</a>
        </header><GameNav />
        <ArcadeCue />
        <section className={styles.startGrid}>
          <div className={styles.hero}>
            <small>{config.kicker}</small>
            <h1>{config.title}<em>{config.outline}</em></h1>
            <p>{config.description}</p>
            <nav className={styles.difficulties} aria-label="Choisir la difficulté">
              <a className={difficulty === "easy" ? styles.selected : ""} href={query(config.route,{ difficulty:"easy" })}><b>FACILE</b><span>Indices directs</span></a>
              <a className={difficulty === "normal" ? styles.selected : ""} href={query(config.route,{ difficulty:"normal" })}><b>NORMAL</b><span>Archives variées</span></a>
              <a className={difficulty === "expert" ? styles.selected : ""} href={query(config.route,{ difficulty:"expert" })}><b>EXPERT</b><span>Profils croisés</span></a>
            </nav>
            <div className={styles.modeActions}>
              <a className={styles.launch} href={query(config.route, { play:1, seed, round:0, score:0, difficulty, exclude })}><small>MODE SOLO · {difficulty.toUpperCase()}</small>LANCER LE RUN <span>→</span></a>
              <a className={styles.multiLaunch} href={`/multi?mode=${config.id}`}><small>2–8 JOUEURS</small>JOUER EN MULTI <span>↗</span></a>
            </div>
            <dl><div><dt>{questions.length}</dt><dd>ÉPREUVES</dd></div><div><dt>{config.questions.length}</dt><dd>QUESTIONS EN BANQUE</dd></div><div><dt>3</dt><dd>DIFFICULTÉS</dd></div></dl>
          </div>
          <aside className={styles.route}>
            <small>ROUTE DE LA PARTIE</small>
            <ol>{questions.map((q, index) => <li key={`${q.prompt}-${index}`}><b>{String(index + 1).padStart(2,"0")}</b><span>{q.type}</span></li>)}</ol>
          </aside>
        </section>
      </main>
    );
  }

  if (round >= questions.length) {
    const max = questions.length * 1000;
    const ratio = max ? score / max : 0;
    const rank = ratio >= .9 ? "S" : ratio >= .7 ? "A" : ratio >= .5 ? "B" : "C";
    return (
      <main className={`${styles.shell} ${styles[config.accent]}`}>
        <div className={styles.scanlines} aria-hidden="true" />
        <header className={styles.topbar}><a href="/home.html">← ACCUEIL</a><b><i>LD</i> RUN TERMINÉ</b><a href={config.route}>QUITTER</a></header><GameNav />
        <ArcadeCue type="finish" id={`${seed}:done`} label={rank === "S" ? "RANG S !" : "RUN TERMINÉ"} detail={`${score.toLocaleString("fr-FR")} points · Rang ${rank}`} />
        <section className={styles.finish} data-arcade-finish>
          <small>ARCHIVE COMPLÈTE // SCORE VALIDÉ</small>
          <h1>RANG <em>{rank}</em></h1>
          <strong>{score.toLocaleString("fr-FR")}<span> / {max.toLocaleString("fr-FR")}</span></strong>
          <p>{Math.round(ratio * 100)}% de bonnes réponses sur {questions.length} épreuves.</p>
          <div><a className={styles.launch} href={query(config.route, { play:1, seed:seed + 104729, round:0, score:0, difficulty, exclude:questions.map(questionIdentity).join(",") })}>NOUVELLE SÉRIE →</a><a className={styles.secondary} href="/home.html">RETOUR AUX JEUX</a></div>
        </section>
      </main>
    );
  }

  const question = questions[round];
  const correct = answered && picked === question.correct;
  const nextScore = score + (correct ? 1000 : 0);
  const nextStreak = answered ? (correct ? streak + 1 : 0) : streak;
  const progress = ((round + (answered ? 1 : 0)) / questions.length) * 100;
  const currentRoundName = roundNames?.[Math.min(roundNames.length - 1, Math.floor(round / Math.max(1, Math.ceil(questions.length / roundNames.length))))];

  return (
    <main className={`${styles.shell} ${styles[config.accent]}`}>
      <div className={styles.scanlines} aria-hidden="true" />
      <header className={styles.topbar}>
        <a href="/home.html">← ACCUEIL</a>
        <b><i>LD</i> {config.title} <span>{config.outline}</span></b>
        <a href={config.route}>RECOMMENCER</a>
      </header><GameNav />
      <ArcadeCue type={answered ? (correct ? "correct" : "wrong") : "round"} id={`${seed}:${round}:${answered}`} reset={round===0 && !answered} streak={nextStreak} points={correct ? 1000 : undefined} label={answered ? undefined : round===questions.length-1 ? "DERNIÈRE ÉPREUVE" : `ÉPREUVE ${round+1} / ${questions.length}`} detail={answered ? undefined : question.type} />
      <section className={styles.playGrid}>
        <aside className={styles.sideRoute}>
          <small>ROUTE DU RUN</small>
          <ol>{questions.map((item, index) => <li className={index === round ? styles.active : index < round ? styles.done : ""} key={`${item.type}-${index}`}><b>{index < round ? "◆" : index === round ? "◇" : "·"}</b><span>{item.type}</span></li>)}</ol>
          <div className={styles.sideScore}><small>SCORE</small><strong data-arcade-score>{nextScore.toLocaleString("fr-FR")}</strong></div>
        </aside>
        <article className={styles.question}>
          <div className={styles.meta}><span>ÉPREUVE {String(round + 1).padStart(2,"0")} / {questions.length}</span><b>{currentRoundName || question.type}</b></div>
          <div className={styles.progress}><i style={{ "--progress": `${progress}%` } as CSSProperties} /></div>
          <div className={`${styles.signal} ${question.image ? styles.hasArtwork : ""} ${styles[question.universe]} ${question.imageMode ? styles[question.imageMode] : ""} ${answered ? styles.revealed : ""}`}>
            {question.image && <img src={question.image} alt="Indice visuel de la question" />}
            <small>ARCHIVE // {question.universe.toUpperCase()}</small><strong>{question.signal}</strong><span>Q-{String(round + 1).padStart(2,"0")}</span>
          </div>
          <p className={styles.type}>{question.type}</p>
          <h1>{question.prompt}</h1>
          <div className={styles.answers} data-arcade-answers>
            {question.options.map((option, index) => {
              const state = answered ? index === question.correct ? styles.correct : index === picked ? styles.wrong : styles.muted : "";
              return answered
                ? <div className={state} data-answer-state={index===question.correct || index===picked ? "revealed" : undefined} key={option}><b>{letters[index]}</b><span>{option}</span></div>
                : <a href={query(config.route, { play:1, seed, round, score, streak, picked:index, difficulty, exclude })} key={option}><b>{letters[index]}</b><span>{option}</span></a>;
            })}
          </div>
          {answered && <section className={styles.reveal} data-arcade-feedback>
            <div><b>{correct ? "BONNE RÉPONSE" : "RÉPONSE INCORRECTE"}</b><p>{question.fact}</p></div>
            <a href={query(config.route, { play:1, seed, round:round + 1, score:nextScore, streak:nextStreak, difficulty, exclude })}>{round + 1 === questions.length ? "VOIR LE SCORE" : "QUESTION SUIVANTE"} →</a>
          </section>}
          {config.id === "runeterra" && <p className={styles.riot}>Lore Diff n’est pas approuvé par Riot Games et ne reflète pas les opinions de Riot Games. Riot Games et toutes les propriétés associées sont des marques de Riot Games, Inc.</p>}
        </article>
      </section>
    </main>
  );
}
