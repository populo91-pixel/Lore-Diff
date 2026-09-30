const ROUND_TOTAL = 5;
const $ = selector => document.querySelector(selector);
const el = {
  form: $("#screenForm"), input: $("#screenInput"), submit: $("#screenSubmit"), suggestions: $("#screenSuggestions"),
  message: $("#screenMessage"), image: $("#screenImage"), frame: $("#screenFrame"), code: $("#screenCode"), clarity: $("#screenClarity"),
  round: $("#roundCount"), score: $("#scoreCount"), mistakes: $("#mistakeCount"), meter: $("#screenMeter"), hint: $("#screenHint"),
  result: $("#screenResult"), resultImage: $("#screenResultImage"), resultLabel: $("#screenResultLabel"), resultTitle: $("#screenResultTitle"),
  next: $("#screenNext"), complete: $("#screenComplete"), finalScore: $("#screenFinalScore"), restart: $("#screenRestart"), newRun: $("#newRunButton")
};

let deck = [];
let roundIndex = 0;
let score = 0;
let wrong = 0;
let revealLevel = 0;
let locked = false;
let current;
let roundToken = 0;
let visibleSuggestions = [];
let activeSuggestion = -1;
const CLARITY_LABELS = ["BROUILLÉE", "INDICE 1", "INDICE 2", "NETTE"];

function paintStats() {
  el.round.textContent = `${Math.min(roundIndex + 1, ROUND_TOTAL)} / ${ROUND_TOTAL}`;
  el.score.textContent = String(score).padStart(4, "0");
  el.mistakes.textContent = wrong;
  el.code.textContent = String(roundIndex + 1).padStart(2, "0");
  [...el.meter.children].forEach((node, index) => node.classList.toggle("on", index <= revealLevel));
  el.frame.className = `screen-frame level-${revealLevel}`;
  el.clarity.textContent = `IMAGE ${revealLevel + 1}/4 · ${CLARITY_LABELS[revealLevel]}`;
  el.hint.disabled = locked || revealLevel >= 3;
}

function hideSuggestions() {
  el.suggestions.hidden = true;
  el.input.setAttribute("aria-expanded", "false");
  activeSuggestion = -1;
}

function renderSuggestions(value) {
  const needle = MediaCore.normalize(value);
  if (!needle || locked) { visibleSuggestions = []; hideSuggestions(); return; }
  const rank = game => {
    const names = [game.name, ...game.aliases].map(MediaCore.normalize);
    if (names.includes(needle)) return 0;
    if (names.some(name => name.startsWith(needle))) return 1;
    return 2;
  };
  visibleSuggestions = MEDIA_GAMES
    .filter(game => MediaCore.normalize(game.name).includes(needle) || game.aliases.some(alias => MediaCore.normalize(alias).includes(needle)))
    .sort((a, b) => rank(a) - rank(b) || a.name.localeCompare(b.name, "fr"));
  activeSuggestion = -1;
  if (!visibleSuggestions.length) {
    el.suggestions.innerHTML = `<p class="media-suggestion-empty">Aucun jeu trouvé. Essaie un autre titre.</p>`;
    el.suggestions.hidden = false;
    el.input.setAttribute("aria-expanded", "true");
    return;
  }
  const resultLabel = `${visibleSuggestions.length} jeu${visibleSuggestions.length > 1 ? "x" : ""}`;
  el.suggestions.innerHTML = `<p class="media-suggestion-summary">${resultLabel}<span>Fais défiler pour tout voir</span></p>` + visibleSuggestions.map((game, index) => `<button class="media-suggestion" type="button" role="option" aria-selected="false" data-index="${index}" data-id="${game.id}"><strong>${game.name}</strong><small>${game.genre}</small></button>`).join("");
  el.suggestions.hidden = false;
  el.input.setAttribute("aria-expanded", "true");
}

function choose(game) {
  el.input.value = game.name;
  hideSuggestions();
  el.input.focus();
}

function updateActiveSuggestion() {
  [...el.suggestions.querySelectorAll(".media-suggestion")].forEach((item, index) => {
    const active = index === activeSuggestion;
    item.classList.toggle("active", active);
    item.setAttribute("aria-selected", String(active));
    if (active) item.scrollIntoView({ block: "nearest" });
  });
}

function addReveal(isWrong) {
  if (locked) return;
  if (isWrong) { wrong += 1; if(wrong<3)window.LoreFX?.beat('clue',{label:'LE SIGNAL SE PRÉCISE',detail:`${3-wrong} essai(s) restant(s).`}); } else window.LoreFX?.beat('clue',{label:'IMAGE DÉVOILÉE',detail:'Observe les nouveaux détails.'});
  revealLevel = Math.min(3, revealLevel + 1);
  paintStats();
  if (wrong >= 3) reveal(false);
  else el.message.textContent = isWrong
    ? `Ce n’est pas ce jeu. Image plus nette — ${3 - wrong} essai${3 - wrong > 1 ? "s" : ""} restant${3 - wrong > 1 ? "s" : ""}.`
    : "Indice utilisé : l’image est plus nette, mais elle rapporte moins.";
}

function reveal(success) {
  window.LoreFX?.beat(success?'correct':'wrong',{label:success?'Jeu identifié.':'SIGNAL PERDU'});
  locked = true;
  const usedLevel = revealLevel;
  revealLevel = 3;
  if (success) score += Math.max(100, 1000 - usedLevel * 170 - wrong * 120);
  paintStats();
  el.input.disabled = true;
  el.submit.disabled = true;
  el.hint.disabled = true;
  hideSuggestions();
  el.result.classList.toggle("wrong", !success);
  el.resultLabel.textContent = success ? "IDENTIFIÉ" : "SIGNAL PERDU";
  el.resultTitle.textContent = current.name;
  el.resultImage.src = MediaCore.image(current);
  el.resultImage.alt = current.name;
  el.next.textContent = roundIndex === ROUND_TOTAL - 1 ? "RÉSULTAT" : "SUIVANT";
  el.result.hidden = false;
}

function submit(value) {
  if (locked || !value.trim()) return;
  const known = MEDIA_GAMES.find(game => MediaCore.matches(game, value));
  if (!known) { el.message.textContent = "Titre inconnu dans cette sélection."; return; }
  if (known.id === current.id) reveal(true);
  else addReveal(true);
  el.input.value = "";
}

async function startRound() {
  const token = ++roundToken;
  current = deck[roundIndex];
  window.LoreFX?.beat('round',{reset:roundIndex===0,label:`SIGNAL ${roundIndex+1} / ${ROUND_TOTAL}`,detail:'Reconnais le jeu.'});
  wrong = 0;
  revealLevel = 0;
  locked = false;
  el.image.src = MediaCore.image(current);
  el.image.alt = "Image mystère";
  el.input.value = "";
  el.input.disabled = false;
  el.submit.disabled = false;
  el.hint.disabled = false;
  el.result.hidden = true;
  el.complete.hidden = true;
  el.message.textContent = "Trouve le jeu : propose un titre ou utilise un indice.";
  paintStats();
  try {
    const shot = await MediaCore.screenshot(current);
    if (token === roundToken) el.image.src = shot;
  } catch {
    // The official header already loaded as a fallback.
  }
  el.input.focus({ preventScroll: true });
}

function startRun() {
  deck = MediaCore.shuffle(MEDIA_GAMES).slice(0, ROUND_TOTAL);
  roundIndex = 0;
  score = 0;
  startRound();
}

function nextRound() {
  if (roundIndex >= ROUND_TOTAL - 1) {
    el.result.hidden = true;
    el.complete.hidden = false;
    window.LoreFX?.beat('finish',{detail:`${score} points · Les signaux sont décodés.`});
    el.finalScore.textContent = `${score} POINTS · ${score >= 3500 ? "RANG S" : score >= 2500 ? "RANG A" : score >= 1500 ? "RANG B" : "RANG C"}`;
    return;
  }
  roundIndex += 1;
  startRound();
}

el.form.addEventListener("submit", event => { event.preventDefault(); submit(el.input.value); });
el.input.addEventListener("input", event => { el.message.textContent = ""; renderSuggestions(event.target.value); });
el.input.addEventListener("keydown", event => {
  if (el.suggestions.hidden || !visibleSuggestions.length) return;
  if (event.key === "ArrowDown") { event.preventDefault(); activeSuggestion = (activeSuggestion + 1) % visibleSuggestions.length; updateActiveSuggestion(); }
  else if (event.key === "ArrowUp") { event.preventDefault(); activeSuggestion = (activeSuggestion - 1 + visibleSuggestions.length) % visibleSuggestions.length; updateActiveSuggestion(); }
  else if (event.key === "Enter" && activeSuggestion >= 0) { event.preventDefault(); choose(visibleSuggestions[activeSuggestion]); }
  else if (event.key === "Escape") hideSuggestions();
});
el.suggestions.addEventListener("mousedown", event => { const button = event.target.closest(".media-suggestion"); if (!button) return; event.preventDefault(); choose(MEDIA_GAMES.find(game => game.id === Number(button.dataset.id))); });
document.addEventListener("click", event => { if (!event.target.closest(".media-search")) hideSuggestions(); });
el.hint.addEventListener("click", () => addReveal(false));
el.next.addEventListener("click", nextRound);
el.restart.addEventListener("click", startRun);
el.newRun.addEventListener("click", startRun);
el.image.addEventListener("error", () => {
  const fallback = MediaCore.image(current);
  if (el.image.src !== fallback) { el.image.src = fallback; return; }
  el.message.textContent = "Image indisponible. Passe à la manche suivante.";
  reveal(false);
});

startRun();
