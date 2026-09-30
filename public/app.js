const POKEMON = [
  ["Bulbizarre","bulbasaur"],["Herbizarre","ivysaur"],["Florizarre","venusaur"],["Salamèche","charmander"],["Reptincel","charmeleon"],["Dracaufeu","charizard"],["Carapuce","squirtle"],["Carabaffe","wartortle"],["Tortank","blastoise"],["Chenipan","caterpie"],["Chrysacier","metapod"],["Papilusion","butterfree"],["Aspicot","weedle"],["Coconfort","kakuna"],["Dardargnan","beedrill"],["Roucool","pidgey"],["Roucoups","pidgeotto"],["Roucarnage","pidgeot"],["Rattata","rattata"],["Rattatac","raticate"],["Piafabec","spearow"],["Rapasdepic","fearow"],["Abo","ekans"],["Arbok","arbok"],["Pikachu","pikachu"],["Raichu","raichu"],["Sabelette","sandshrew"],["Sablaireau","sandslash"],["Nidoran♀","nidoran-f"],["Nidorina","nidorina"],["Nidoqueen","nidoqueen"],["Nidoran♂","nidoran-m"],["Nidorino","nidorino"],["Nidoking","nidoking"],["Mélofée","clefairy"],["Mélodelfe","clefable"],["Goupix","vulpix"],["Feunard","ninetales"],["Rondoudou","jigglypuff"],["Grodoudou","wigglytuff"],["Nosferapti","zubat"],["Nosferalto","golbat"],["Mystherbe","oddish"],["Ortide","gloom"],["Rafflesia","vileplume"],["Paras","paras"],["Parasect","parasect"],["Mimitoss","venonat"],["Aéromite","venomoth"],["Taupiqueur","diglett"],["Triopikeur","dugtrio"],["Miaouss","meowth"],["Persian","persian"],["Psykokwak","psyduck"],["Akwakwak","golduck"],["Férosinge","mankey"],["Colossinge","primeape"],["Caninos","growlithe"],["Arcanin","arcanine"],["Ptitard","poliwag"],["Têtarte","poliwhirl"],["Tartard","poliwrath"],["Abra","abra"],["Kadabra","kadabra"],["Alakazam","alakazam"],["Machoc","machop"],["Machopeur","machoke"],["Mackogneur","machamp"],["Chétiflor","bellsprout"],["Boustiflor","weepinbell"],["Empiflor","victreebel"],["Tentacool","tentacool"],["Tentacruel","tentacruel"],["Racaillou","geodude"],["Gravalanch","graveler"],["Grolem","golem"],["Ponyta","ponyta"],["Galopa","rapidash"],["Ramoloss","slowpoke"],["Flagadoss","slowbro"],["Magnéti","magnemite"],["Magnéton","magneton"],["Canarticho","farfetchd"],["Doduo","doduo"],["Dodrio","dodrio"],["Otaria","seel"],["Lamantine","dewgong"],["Tadmorv","grimer"],["Grotadmorv","muk"],["Kokiyas","shellder"],["Crustabri","cloyster"],["Fantominus","gastly"],["Spectrum","haunter"],["Ectoplasma","gengar"],["Onix","onix"],["Soporifik","drowzee"],["Hypnomade","hypno"],["Krabby","krabby"],["Krabboss","kingler"],["Voltorbe","voltorb"],["Électrode","electrode"],["Nœunœuf","exeggcute"],["Noadkoko","exeggutor"],["Osselait","cubone"],["Ossatueur","marowak"],["Kicklee","hitmonlee"],["Tygnon","hitmonchan"],["Excelangue","lickitung"],["Smogo","koffing"],["Smogogo","weezing"],["Rhinocorne","rhyhorn"],["Rhinoféros","rhydon"],["Leveinard","chansey"],["Saquedeneu","tangela"],["Kangourex","kangaskhan"],["Hypotrempe","horsea"],["Hypocéan","seadra"],["Poissirène","goldeen"],["Poissoroy","seaking"],["Stari","staryu"],["Staross","starmie"],["M. Mime","mr-mime"],["Insécateur","scyther"],["Lippoutou","jynx"],["Élektek","electabuzz"],["Magmar","magmar"],["Scarabrute","pinsir"],["Tauros","tauros"],["Magicarpe","magikarp"],["Léviator","gyarados"],["Lokhlass","lapras"],["Métamorph","ditto"],["Évoli","eevee"],["Aquali","vaporeon"],["Voltali","jolteon"],["Pyroli","flareon"],["Porygon","porygon"],["Amonita","omanyte"],["Amonistar","omastar"],["Kabuto","kabuto"],["Kabutops","kabutops"],["Ptéra","aerodactyl"],["Ronflex","snorlax"],["Artikodin","articuno"],["Électhor","zapdos"],["Sulfura","moltres"],["Minidraco","dratini"],["Draco","dragonair"],["Dracolosse","dragonite"],["Mewtwo","mewtwo"],["Mew","mew"]
].map(([fr, slug], index) => ({ id: index + 1, fr, slug }));

const TYPE_FR = {
  normal: "Normal", fire: "Feu", water: "Eau", electric: "Électrik", grass: "Plante",
  ice: "Glace", fighting: "Combat", poison: "Poison", ground: "Sol", flying: "Vol",
  psychic: "Psy", bug: "Insecte", rock: "Roche", ghost: "Spectre", dragon: "Dragon",
  dark: "Ténèbres", steel: "Acier", fairy: "Fée"
};

const TYPE_COLORS = {
  normal: "#a8a77a", fire: "#ee8130", water: "#6390f0", electric: "#f7d02c", grass: "#7ac74c",
  ice: "#96d9d6", fighting: "#c22e28", poison: "#a33ea1", ground: "#e2bf65", flying: "#a98ff3",
  psychic: "#f95587", bug: "#a6b91a", rock: "#b6a136", ghost: "#735797", dragon: "#6f35fc",
  dark: "#705746", steel: "#b7b7ce", fairy: "#d685ad"
};

const COLOR_FR = {
  black: "Noir", blue: "Bleu", brown: "Marron", gray: "Gris", green: "Vert",
  pink: "Rose", purple: "Violet", red: "Rouge", white: "Blanc", yellow: "Jaune"
};

const COLOR_HEX = {
  black: "#222536", blue: "#5999ee", brown: "#a67556", gray: "#9aa2b5", green: "#59c97a",
  pink: "#f18ebc", purple: "#9a6be8", red: "#ef6262", white: "#f4f4f1", yellow: "#f4ca49"
};

const API = "https://pokeapi.co/api/v2";
const ART = id => `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
const SPRITE = id => `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
const cache = new Map();

const $ = selector => document.querySelector(selector);
const elements = {
  form: $("#guessForm"), input: $("#pokemonInput"), submit: $("#submitButton"), suggestions: $("#suggestions"),
  status: $("#gameStatus"), count: $("#attemptCount"), message: $("#formMessage"), rows: $("#attemptRows"),
  empty: $("#emptyState"), result: $("#resultCard"), resultImage: $("#resultImage"), resultTitle: $("#resultTitle"),
  resultText: $("#resultText"), newGame: $("#newGameButton"), playAgain: $("#playAgainButton"),
  share: $("#shareButton"), streak: $("#streakCount")
};

let target = null;
let targetPromise = null;
let attempts = [];
let won = false;
let activeSuggestion = -1;
let visibleSuggestions = [];
let currentContract;

const CONTRACTS = [
  { label: "ARCHIVE TOTALE // #001—#151", test: () => true },
  { label: "SECTEUR 01 // #001—#050", test: pokemon => pokemon.id <= 50 },
  { label: "SECTEUR 02 // #051—#100", test: pokemon => pokemon.id >= 51 && pokemon.id <= 100 },
  { label: "SECTEUR 03 // #101—#151", test: pokemon => pokemon.id >= 101 }
];

function normalize(value) {
  return value.toLocaleLowerCase("fr").replaceAll("œ", "oe").replaceAll("æ", "ae").normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[. '\u2019-]/g, "");
}

function findPokemon(value) {
  const needle = normalize(value);
  return POKEMON.find(p => normalize(p.fr) === needle || normalize(p.slug) === needle);
}

function findEvolution(node, slug, depth = 0) {
  if (node.species.name === slug) return { depth, hasNext: node.evolves_to.length > 0 };
  for (const child of node.evolves_to) {
    const result = findEvolution(child, slug, depth + 1);
    if (result) return result;
  }
  return null;
}

function evolutionLabel(info) {
  if (!info) return "Inconnue";
  if (info.depth === 0 && !info.hasNext) return "Sans évolution";
  if (info.depth === 0) return "De base";
  if (info.hasNext) return "Intermédiaire";
  return "Finale";
}

async function fetchJSON(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Erreur Pokédex (${response.status})`);
  return response.json();
}

async function getPokemonData(entry) {
  if (cache.has(entry.id)) return cache.get(entry.id);
  const promise = (async () => {
    const [pokemon, species] = await Promise.all([
      fetchJSON(`${API}/pokemon/${entry.id}`),
      fetchJSON(`${API}/pokemon-species/${entry.id}`)
    ]);
    const chain = await fetchJSON(species.evolution_chain.url);
    const evoInfo = findEvolution(chain.chain, entry.slug);
    return {
      ...entry,
      types: pokemon.types.sort((a,b) => a.slot - b.slot).map(item => item.type.name),
      color: species.color.name,
      height: pokemon.height / 10,
      weight: pokemon.weight / 10,
      evolution: evolutionLabel(evoInfo)
    };
  })();
  cache.set(entry.id, promise);
  try { return await promise; }
  catch (error) { cache.delete(entry.id); throw error; }
}

function setLoading(isLoading) {
  elements.submit.disabled = isLoading || won;
  elements.input.disabled = isLoading || won;
  if (isLoading) {
    elements.status.classList.remove("ready");
    elements.status.innerHTML = "<i></i>Connexion au Pokédex…";
  } else {
    elements.status.classList.add("ready");
    elements.status.innerHTML = "<i></i>Pokédex prêt · 151 espèces";
  }
}

function updateCount() {
  elements.count.textContent = `${attempts.length} tentative${attempts.length > 1 ? "s" : ""}`;
  LoreChallenge.update(attempts.length);
}

function showMessage(text, good = false) {
  elements.message.textContent = text;
  elements.message.style.color = good ? "var(--good)" : "var(--bad)";
}

function formatNumber(value) {
  return value.toLocaleString("fr-FR", { maximumFractionDigits: 1 });
}

function statusClass(matches) { return matches ? "status-cell good" : "status-cell bad"; }

function direction(guess, answer) {
  if (guess === answer) return "=";
  return guess < answer ? "↑" : "↓";
}

function renderAttempt(guess) {
  const row = document.createElement("div");
  row.className = "attempt-row";
  const types = guess.types.map(type => {
    const match = target.types.includes(type);
    return `<span class="type-chip ${match ? "match" : ""}" style="--type:${TYPE_COLORS[type]};background:color-mix(in srgb, ${TYPE_COLORS[type]} 38%, transparent);color:#fff">${TYPE_FR[type]}</span>`;
  }).join("");
  const colorMatch = guess.color === target.color;
  const evolutionMatch = guess.evolution === target.evolution;
  const heightMatch = guess.height === target.height;
  const weightMatch = guess.weight === target.weight;
  row.innerHTML = `
    <div class="pokemon-cell">
      <img src="${ART(guess.id)}" onerror="this.src='${SPRITE(guess.id)}'" alt="${guess.fr}" />
      <span><strong>${guess.fr}</strong><small>#${String(guess.id).padStart(3,"0")}</small></span>
    </div>
    <div><div class="type-list">${types}</div></div>
    <div class="${statusClass(colorMatch)}" data-label="Couleur"><span class="color-dot" style="background:${COLOR_HEX[guess.color]}"></span>${COLOR_FR[guess.color]}</div>
    <div class="${statusClass(evolutionMatch)}" data-label="Évolution">${guess.evolution}</div>
    <div class="measure ${heightMatch ? "good" : ""}" data-label="Taille"><span>${formatNumber(guess.height)} m</span><b>${direction(guess.height, target.height)}</b></div>
    <div class="measure ${weightMatch ? "good" : ""}" data-label="Poids"><span>${formatNumber(guess.weight)} kg</span><b>${direction(guess.weight, target.weight)}</b></div>`;
  elements.rows.prepend(row);
  elements.empty.hidden = true;
}

function renderSuggestions(value) {
  const needle = normalize(value);
  if (!needle || won) {
    elements.suggestions.hidden = true;
    elements.input.setAttribute("aria-expanded", "false");
    visibleSuggestions = [];
    return;
  }
  visibleSuggestions = POKEMON
    .filter(p => normalize(p.fr).includes(needle) || normalize(p.slug).includes(needle))
    .filter(p => !attempts.some(a => a.id === p.id))
    .sort((a, b) => {
      const rank = pokemon => {
        const names = [pokemon.fr, pokemon.slug].map(normalize);
        if (names.includes(needle)) return 0;
        if (names.some(name => name.startsWith(needle))) return 1;
        return 2;
      };
      return rank(a) - rank(b) || a.fr.localeCompare(b.fr, "fr");
    });
  activeSuggestion = -1;
  if (!visibleSuggestions.length) {
    elements.suggestions.innerHTML = `<p class="suggestion-empty">Aucun Pokémon trouvé. Essaie un autre nom.</p>`;
    elements.suggestions.hidden = false;
    elements.input.setAttribute("aria-expanded", "true");
    return;
  }
  const resultLabel = `${visibleSuggestions.length} Pokémon${visibleSuggestions.length > 1 ? "s" : ""}`;
  elements.suggestions.innerHTML = `<p class="suggestion-summary">${resultLabel}<span>Fais défiler pour tout voir</span></p>` + visibleSuggestions.map((p, index) => `
    <button class="suggestion" type="button" role="option" data-index="${index}" aria-selected="false">
      <img src="${SPRITE(p.id)}" alt="" /><strong>${p.fr}</strong><small>#${String(p.id).padStart(3,"0")}</small>
    </button>`).join("");
  elements.suggestions.hidden = false;
  elements.input.setAttribute("aria-expanded", "true");
}

function chooseSuggestion(index) {
  const entry = visibleSuggestions[index];
  if (!entry) return;
  elements.input.value = entry.fr;
  elements.suggestions.hidden = true;
  elements.input.setAttribute("aria-expanded", "false");
  elements.input.focus();
}

function updateActiveSuggestion() {
  [...elements.suggestions.querySelectorAll(".suggestion")].forEach((item, index) => {
    const active = index === activeSuggestion;
    item.classList.toggle("active", active);
    item.setAttribute("aria-selected", String(active));
    if (active) item.scrollIntoView({ block: "nearest" });
  });
}

async function submitGuess(value) {
  if (won) return { ok: false, error: "La partie est terminée." };
  const entry = findPokemon(value);
  if (!entry) {
    showMessage("Ce Pokémon n’est pas dans les 151 de Kanto.");
    return { ok: false, error: "Pokémon introuvable dans la première génération." };
  }
  if (attempts.some(item => item.id === entry.id)) {
    showMessage(`${entry.fr} a déjà été proposé.`);
    return { ok: false, error: "Pokémon déjà proposé." };
  }
  showMessage("");
  setLoading(true);
  try {
    if (!target) target = await targetPromise;
    const guess = await getPokemonData(entry);
    attempts.push(guess);
    renderAttempt(guess);
    updateCount();
    elements.input.value = "";
    elements.suggestions.hidden = true;
    const isWin = guess.id === target.id;
    if(!isWin)window.LoreFX?.beat('clue');
    if (isWin) finishGame();
    else if (LoreChallenge.exhausted(attempts.length)) loseGame();
    else setLoading(false);
    return { ok: true, correct: isWin, attempt: attempts.length, pokemon: guess.fr };
  } catch (error) {
    setLoading(false);
    showMessage("Impossible de joindre le Pokédex. Vérifie ta connexion puis réessaie.");
    return { ok: false, error: error.message };
  }
}

function finishGame() {
  window.LoreFX?.beat('finish',{label:'IDENTITÉ TROUVÉE !',detail:`${attempts.length} essai(s). Bien joué.`});
  won = true;
  setLoading(false);
  elements.input.disabled = true;
  elements.submit.disabled = true;
  const streak = Number(localStorage.getItem("pokedle151-streak") || 0) + 1;
  localStorage.setItem("pokedle151-streak", String(streak));
  elements.streak.textContent = streak;
  elements.result.classList.remove("lost");
  elements.result.querySelector(".eyebrow").innerHTML = "<span></span>POKÉMON IDENTIFIÉ";
  elements.resultImage.src = ART(target.id);
  elements.resultImage.alt = target.fr;
  elements.resultTitle.textContent = `${target.fr}, trouvé !`;
  elements.resultText.textContent = `${LoreChallenge.label()} · Pokémon #${String(target.id).padStart(3,"0")} identifié en ${attempts.length} tentative${attempts.length > 1 ? "s" : ""}.`;
  elements.result.hidden = false;
  setTimeout(() => elements.result.scrollIntoView({ behavior: "smooth", block: "center" }), 120);
}

function loseGame() {
  window.LoreFX?.beat('end',{label:'FIN DES ESSAIS',detail:'Consulte les indices et retente ta chance.'});
  won = true;
  setLoading(false);
  elements.input.disabled = true;
  elements.submit.disabled = true;
  localStorage.setItem("pokedle151-streak", "0");
  elements.streak.textContent = "0";
  elements.result.classList.add("lost");
  elements.result.querySelector(".eyebrow").innerHTML = "<span></span>CIBLE PERDUE";
  elements.resultImage.src = ART(target.id);
  elements.resultImage.alt = target.fr;
  elements.resultTitle.textContent = `C’était ${target.fr}.`;
  elements.resultText.textContent = `${LoreChallenge.label()} terminé : la cible s’est échappée après ${attempts.length} essais.`;
  elements.result.hidden = false;
  setTimeout(() => elements.result.scrollIntoView({ behavior: "smooth", block: "center" }), 120);
}

async function newGame() {
  window.LoreFX?.beat('round',{reset:true,label:'NOUVEAU MYSTÈRE',detail:'Le premier nom ouvre la piste.'});
  const previousId = target?.id;
  currentContract = LoreChallenge.pick(CONTRACTS, currentContract);
  const pool = POKEMON.filter(currentContract.test);
  let recent=[];
  try { const saved=JSON.parse(localStorage.getItem("loreDiffPokemonRecent")||"[]"); if(Array.isArray(saved))recent=saved.filter(Number.isInteger); } catch {}
  let candidates=pool.filter(p=>p.id!==previousId&&!recent.includes(p.id));
  if(!candidates.length)candidates=pool.filter(p=>p.id!==previousId);
  if(!candidates.length)candidates=pool;
  const next=candidates[Math.floor(Math.random()*candidates.length)];
  try { localStorage.setItem("loreDiffPokemonRecent",JSON.stringify([...recent,next.id].slice(-40))); } catch {}
  target = null;
  document.querySelector("#targetTypeBadges").textContent="Chargement…";
  targetPromise = getPokemonData(next);
  attempts = [];
  won = false;
  elements.rows.innerHTML = "";
  elements.empty.hidden = false;
  elements.result.hidden = true;
  elements.result.classList.remove("lost");
  elements.input.value = "";
  elements.input.disabled = true;
  elements.submit.disabled = true;
  updateCount();
  showMessage("");
  LoreChallenge.reset(currentContract.label);
  setLoading(true);
  try {
    target = await targetPromise;
    const badges=document.querySelector("#targetTypeBadges");
    badges.replaceChildren(...target.types.map(type=>{const badge=document.createElement("b");badge.textContent=TYPE_FR[type]||type;badge.style.setProperty("--type-color",TYPE_COLORS[type]||"#bbb");return badge;}));
    setLoading(false);
    elements.input.focus({ preventScroll: true });
    return { ok: true, generation: 1, poolSize: 151 };
  } catch (error) {
    elements.input.disabled = false;
    elements.submit.disabled = false;
    document.querySelector("#targetTypeBadges").textContent="Type indisponible — relance une partie";
    showMessage("Le Pokédex ne répond pas. Réessaie dans quelques secondes.");
    return { ok: false, error: error.message };
  }
}

function shareResult() {
  const squares = attempts.map(item => {
    if (item.id === target.id) return "🟩";
    const type = item.types.some(t => target.types.includes(t));
    const traits = [item.color === target.color, item.evolution === target.evolution, item.height === target.height, item.weight === target.weight].filter(Boolean).length;
    return type || traits ? "🟨" : "⬛";
  }).join("");
  const text = `POKÉDLE 151 · ${LoreChallenge.label()} — ${attempts.length} tentative${attempts.length > 1 ? "s" : ""}\n${squares}`;
  navigator.clipboard?.writeText(text).then(() => {
    elements.share.textContent = "Résultat copié !";
    setTimeout(() => { elements.share.textContent = "Copier le résultat"; }, 1800);
  }).catch(() => showMessage("Impossible de copier automatiquement le résultat."));
}

elements.form.addEventListener("submit", event => {
  event.preventDefault();
  submitGuess(elements.input.value.trim());
});

elements.input.addEventListener("input", event => {
  showMessage("");
  renderSuggestions(event.target.value);
});

elements.input.addEventListener("keydown", event => {
  if (elements.suggestions.hidden || !visibleSuggestions.length) return;
  if (event.key === "ArrowDown") {
    event.preventDefault();
    activeSuggestion = (activeSuggestion + 1) % visibleSuggestions.length;
    updateActiveSuggestion();
  } else if (event.key === "ArrowUp") {
    event.preventDefault();
    activeSuggestion = (activeSuggestion - 1 + visibleSuggestions.length) % visibleSuggestions.length;
    updateActiveSuggestion();
  } else if (event.key === "Enter" && activeSuggestion >= 0) {
    event.preventDefault();
    chooseSuggestion(activeSuggestion);
  } else if (event.key === "Escape") {
    elements.suggestions.hidden = true;
    elements.input.setAttribute("aria-expanded", "false");
  }
});

elements.suggestions.addEventListener("mousedown", event => {
  const button = event.target.closest(".suggestion");
  if (button) { event.preventDefault(); chooseSuggestion(Number(button.dataset.index)); }
});

document.addEventListener("click", event => {
  if (!event.target.closest(".search-wrap")) {
    elements.suggestions.hidden = true;
    elements.input.setAttribute("aria-expanded", "false");
  }
});

elements.newGame.addEventListener("click", newGame);
elements.playAgain.addEventListener("click", () => { newGame(); window.scrollTo({ top: 0, behavior: "smooth" }); });
elements.share.addEventListener("click", shareResult);
elements.streak.textContent = localStorage.getItem("pokedle151-streak") || "0";
LoreChallenge.bind(newGame);

function registerWebMCP() {
  const context = document.modelContext;
  if (!context?.registerTool) return;
  const safe = promise => Promise.resolve(promise).catch(() => undefined);
  safe(context.registerTool({
    name: "guess_pokemon",
    title: "Proposer un Pokémon",
    description: "Propose un Pokémon de la première génération dans la partie visible et retourne si la réponse est correcte.",
    inputSchema: { type: "object", properties: { pokemon: { type: "string", description: "Nom français ou anglais du Pokémon" } }, required: ["pokemon"], additionalProperties: false },
    annotations: { readOnlyHint: false, untrustedContentHint: false },
    execute: input => {
      if (!input || typeof input.pokemon !== "string" || !input.pokemon.trim()) throw new Error("Le nom du Pokémon est requis.");
      return submitGuess(input.pokemon.trim());
    }
  }));
  safe(context.registerTool({
    name: "start_new_game",
    title: "Commencer une nouvelle partie",
    description: "Réinitialise la partie visible et choisit un nouveau Pokémon mystère parmi les 151 de Kanto.",
    inputSchema: { type: "object", properties: {}, additionalProperties: false },
    annotations: { readOnlyHint: false, untrustedContentHint: false },
    execute: () => newGame()
  }));
}

registerWebMCP();
newGame();
