const c = (name, page, race, faction, role, gender, status, era, aliases = []) => ({ name, page, race, faction, role, gender, status, era, aliases });

const CHARACTERS = [
  c("Thrall","Thrall","Orc","Horde","Chaman","Homme","Vivant","Cataclysm",["Go'el"]),
  c("Jaina Portvaillant","Jaina Proudmoore","Humain","Alliance","Mage","Femme","Vivant","Battle for Azeroth",["Jaina Proudmoore"]),
  c("Arthas Menethil","Arthas Menethil","Humain","Fléau","Chevalier de la mort","Homme","Mort","Wrath of the Lich King",["Roi Liche","Lich King"]),
  c("Sylvanas Coursevent","Sylvanas Windrunner","Mort-vivant","Horde","Chasseur","Femme","Vivant","Shadowlands",["Sylvanas Windrunner","Reine Banshee"]),
  c("Illidan Hurlorage","Illidan Stormrage","Elfe de la nuit","Neutre","Chasseur de démons","Homme","Vivant","Legion",["Illidan Stormrage"]),
  c("Varian Wrynn","Varian Wrynn","Humain","Alliance","Guerrier","Homme","Mort","Legion",["Lo'Gosh"]),
  c("Anduin Wrynn","Anduin Wrynn","Humain","Alliance","Prêtre","Homme","Vivant","The War Within"),
  c("Tyrande Murmevent","Tyrande Whisperwind","Elfe de la nuit","Alliance","Prêtre","Femme","Vivant","Battle for Azeroth",["Tyrande Whisperwind"]),
  c("Malfurion Hurlorage","Malfurion Stormrage","Elfe de la nuit","Alliance","Druide","Homme","Vivant","Legion",["Malfurion Stormrage"]),
  c("Genn Grisetête","Genn Greymane","Worgen","Alliance","Guerrier","Homme","Vivant","Legion",["Genn Greymane"]),
  c("Velen","Velen","Draeneï","Alliance","Prêtre","Homme","Vivant","Legion",["Prophète Velen"]),
  c("Magni Barbe-de-Bronze","Magni Bronzebeard","Nain","Alliance","Guerrier","Homme","Vivant","The War Within",["Magni Bronzebeard"]),
  c("Muradin Barbe-de-Bronze","Muradin Bronzebeard","Nain","Alliance","Guerrier","Homme","Vivant","Wrath of the Lich King",["Muradin Bronzebeard"]),
  c("Moira Thaurissan","Moira Thaurissan","Nain","Alliance","Prêtre","Femme","Vivant","The War Within"),
  c("Brann Barbe-de-Bronze","Brann Bronzebeard","Nain","Alliance","Chasseur","Homme","Vivant","The War Within",["Brann Bronzebeard"]),
  c("Alleria Coursevent","Alleria Windrunner","Elfe du Vide","Alliance","Chasseur","Femme","Vivant","The War Within",["Alleria Windrunner"]),
  c("Vereesa Coursevent","Vereesa Windrunner","Haute-elfe","Alliance","Chasseur","Femme","Vivant","Legion",["Vereesa Windrunner"]),
  c("Turalyon","Turalyon","Humain","Alliance","Paladin","Homme","Vivant","Legion",["Grand exarque Turalyon"]),
  c("Khadgar","Khadgar","Humain","Neutre","Mage","Homme","Vivant","Warlords of Draenor"),
  c("Medivh","Medivh","Humain","Neutre","Mage","Homme","Disparu","Legion"),
  c("Anduin Lothar","Anduin Lothar","Humain","Alliance","Guerrier","Homme","Mort","Warcraft II",["Lothar"]),
  c("Uther le Porteur de Lumière","Uther the Lightbringer","Humain","Alliance","Paladin","Homme","Mort","Warcraft III",["Uther","Uther Lightbringer"]),
  c("Bolvar Fordragon","Bolvar Fordragon","Mort-vivant","Neutre","Chevalier de la mort","Homme","Vivant","Shadowlands",["Roi Liche Bolvar"]),
  c("Tirion Fordring","Tirion Fordring","Humain","Alliance","Paladin","Homme","Mort","Wrath of the Lich King"),
  c("Alexandros Mograine","Alexandros Mograine","Mort-vivant","Neutre","Paladin","Homme","Mort","Wrath of the Lich King",["Porte-cendres"]),
  c("Darion Mograine","Darion Mograine","Mort-vivant","Neutre","Chevalier de la mort","Homme","Vivant","Legion"),
  c("Valeera Sanguinar","Valeera Sanguinar","Elfe de sang","Neutre","Voleur","Femme","Vivant","Legion"),
  c("Mathias Shaw","Mathias Shaw","Humain","Alliance","Voleur","Homme","Vivant","Battle for Azeroth"),
  c("Maiev Chantelombre","Maiev Shadowsong","Elfe de la nuit","Alliance","Voleur","Femme","Vivant","Legion",["Maiev Shadowsong"]),
  c("Shandris Pennelune","Shandris Feathermoon","Elfe de la nuit","Alliance","Chasseur","Femme","Vivant","Battle for Azeroth",["Shandris Feathermoon"]),
  c("Ysera","Ysera","Dragon","Vol draconique","Druide","Femme","Mort","Dragonflight"),
  c("Alexstrasza","Alexstrasza","Dragon","Vol draconique","Dragon","Femme","Vivant","Dragonflight"),
  c("Nozdormu","Nozdormu","Dragon","Vol draconique","Dragon","Homme","Vivant","Dragonflight"),
  c("Kalecgos","Kalecgos","Dragon","Vol draconique","Mage","Homme","Vivant","Dragonflight"),
  c("Irion","Wrathion","Dragon","Vol draconique","Voleur","Homme","Vivant","Battle for Azeroth",["Wrathion"]),
  c("Aile de mort","Deathwing","Dragon","Empire noir","Dragon","Homme","Mort","Cataclysm",["Deathwing","Neltharion"]),
  c("Chromie","Chronormu","Dragon","Vol draconique","Mage","Femme","Vivant","Dragonflight",["Chronormu"]),
  c("Malygos","Malygos","Dragon","Vol draconique","Mage","Homme","Mort","Wrath of the Lich King"),
  c("Ébyssian","Ebyssian","Dragon","Vol draconique","Chaman","Homme","Vivant","Dragonflight",["Ebyssian","Ebonhorn"]),
  c("Merithra","Merithra","Dragon","Vol draconique","Druide","Femme","Vivant","Dragonflight"),
  c("Baine Sabot-de-Sang","Baine Bloodhoof","Tauren","Horde","Guerrier","Homme","Vivant","Battle for Azeroth",["Baine Bloodhoof"]),
  c("Cairne Sabot-de-Sang","Cairne Bloodhoof","Tauren","Horde","Guerrier","Homme","Mort","Warcraft III",["Cairne Bloodhoof"]),
  c("Vol'jin","Vol'jin","Troll","Horde","Chasseur","Homme","Mort","Warlords of Draenor"),
  c("Garrosh Hurlenfer","Garrosh Hellscream","Orc","Horde","Guerrier","Homme","Mort","Mists of Pandaria",["Garrosh Hellscream"]),
  c("Grommash Hurlenfer","Grommash Hellscream","Orc","Horde","Guerrier","Homme","Mort","Warlords of Draenor",["Grom","Grom Hellscream"]),
  c("Durotan","Durotan","Orc","Horde","Guerrier","Homme","Mort","Warlords of Draenor"),
  c("Draka","Draka","Orc","Horde","Guerrier","Femme","Mort","Shadowlands"),
  c("Orgrim Marteau-du-Destin","Orgrim Doomhammer","Orc","Horde","Guerrier","Homme","Mort","Warcraft II",["Orgrim Doomhammer"]),
  c("Gul'dan","Gul'dan","Orc","Légion ardente","Démoniste","Homme","Mort","Legion"),
  c("Ner'zhul","Ner'zhul","Orc","Fléau","Chaman","Homme","Mort","Wrath of the Lich King"),
  c("Varok Saurcroc","Varok Saurfang","Orc","Horde","Guerrier","Homme","Mort","Battle for Azeroth",["Saurcroc","Saurfang"]),
  c("Dranosh Saurcroc","Dranosh Saurfang","Orc","Horde","Guerrier","Homme","Mort","Wrath of the Lich King",["Dranosh Saurfang"]),
  c("Rexxar","Rexxar","Mok'nathal","Horde","Chasseur","Homme","Vivant","Battle for Azeroth"),
  c("Rokhan","Rokhan","Troll","Horde","Chasseur","Homme","Vivant","Battle for Azeroth"),
  c("Lor'themar Theron","Lor'themar Theron","Elfe de sang","Horde","Chasseur","Homme","Vivant","Battle for Azeroth"),
  c("Dame Liadrin","Lady Liadrin","Elfe de sang","Horde","Paladin","Femme","Vivant","Legion",["Liadrin"]),
  c("Grand magistère Rommath","Grand Magister Rommath","Elfe de sang","Horde","Mage","Homme","Vivant","The Burning Crusade",["Rommath"]),
  c("Kael'thas Haut-Soleil","Kael'thas Sunstrider","Elfe de sang","Légion ardente","Mage","Homme","Mort","The Burning Crusade",["Kael'thas","Kaelthas"]),
  c("Dame Vashj","Lady Vashj","Naga","Légion ardente","Mage","Femme","Mort","The Burning Crusade",["Vashj"]),
  c("Reine Azshara","Queen Azshara","Naga","Empire noir","Mage","Femme","Vivant","Battle for Azeroth",["Azshara"]),
  c("Première arcaniste Thalyssra","First Arcanist Thalyssra","Sacrenuit","Horde","Mage","Femme","Vivant","Battle for Azeroth",["Thalyssra"]),
  c("Grande magistrice Élisande","Grand Magistrix Elisande","Sacrenuit","Légion ardente","Mage","Femme","Mort","Legion",["Elisande"]),
  c("Zul'jin","Zul'jin","Troll","Neutre","Chasseur","Homme","Mort","The Burning Crusade"),
  c("Princesse Talanji","Princess Talanji","Troll zandalari","Horde","Prêtre","Femme","Vivant","Battle for Azeroth",["Talanji"]),
  c("Roi Rastakhan","King Rastakhan","Troll zandalari","Horde","Prêtre","Homme","Mort","Battle for Azeroth",["Rastakhan"]),
  c("Bwonsamdi","Bwonsamdi","Loa","Neutre","Entité","Homme","Vivant","Shadowlands"),
  c("Chen Brune d'Orage","Chen Stormstout","Pandaren","Neutre","Moine","Homme","Vivant","Mists of Pandaria",["Chen Stormstout","Chen"]),
  c("Li Li Brune d'Orage","Li Li Stormstout","Pandaren","Neutre","Moine","Femme","Vivant","Mists of Pandaria",["Li Li Stormstout","Li Li"]),
  c("Taran Zhu","Taran Zhu","Pandaren","Neutre","Moine","Homme","Vivant","Mists of Pandaria"),
  c("Chroniqueur Cho","Lorewalker Cho","Pandaren","Neutre","Moine","Homme","Vivant","Mists of Pandaria",["Lorewalker Cho","Cho"]),
  c("Kel'Thuzad","Kel'Thuzad","Mort-vivant","Fléau","Mage","Homme","Mort","Shadowlands"),
  c("Anub'arak","Anub'arak","Nérubien","Fléau","Guerrier","Homme","Mort","Wrath of the Lich King"),
  c("Sire Denathrius","Sire Denathrius","Éternel","Ombreterre","Entité","Homme","Vivant","Shadowlands",["Denathrius"]),
  c("Zovaal","Zovaal","Éternel","Ombreterre","Entité","Homme","Mort","Shadowlands",["Geôlier","Jailer"]),
  c("Vyranoth","Vyranoth","Dragon","Vol draconique","Mage","Femme","Vivant","Dragonflight"),
  c("Fyrakka","Fyrakk","Dragon","Primalistes","Dragon","Homme","Mort","Dragonflight",["Fyrakk"]),
  c("Iridikron","Iridikron","Dragon","Primalistes","Dragon","Homme","Vivant","Dragonflight"),
  c("Raszageth","Raszageth the Storm-Eater","Dragon","Primalistes","Chaman","Femme","Mort","Dragonflight"),
  c("Xal'atath","Xal'atath","Entité du Vide","Empire noir","Prêtre","Femme","Vivant","The War Within"),
  c("Reine Ansurek","Queen Ansurek","Nérubien","Empire noir","Guerrier","Femme","Mort","The War Within",["Ansurek"]),
  c("Faerin Lothar","Faerin Lothar","Humain","Alliance","Paladin","Femme","Vivant","The War Within",["Faerin"]),
  c("Odyn","Odyn","Forgé par les Titans","Neutre","Guerrier","Homme","Vivant","Legion"),
  c("Helya","Helya","Forgé par les Titans","Ombreterre","Mage","Femme","Disparu","Legion"),
  c("Cénarius","Cenarius","Demi-dieu","Neutre","Druide","Homme","Vivant","Legion",["Cenarius"]),
  c("Mal'Ganis","Mal'Ganis","Nathrezim","Légion ardente","Démoniste","Homme","Vivant","Shadowlands"),
  c("Archimonde","Archimonde","Érédar","Légion ardente","Démoniste","Homme","Mort","Warlords of Draenor"),
  c("Kil'jaeden","Kil'jaeden","Érédar","Légion ardente","Démoniste","Homme","Mort","Legion"),
  c("Mannoroth","Mannoroth","Démon","Légion ardente","Guerrier","Homme","Mort","Warlords of Draenor"),
  c("Sargeras","Sargeras","Titan","Légion ardente","Guerrier","Homme","Vivant","Legion"),
  c("Aggramar","Aggramar","Titan","Neutre","Guerrier","Homme","Vivant","Legion"),
  c("Argus l'Annihilateur","Argus the Unmaker","Titan","Légion ardente","Entité","Homme","Mort","Legion",["Argus"]),
  c("Ragnaros","Ragnaros","Élémentaire","Neutre","Entité","Homme","Mort","Cataclysm"),
  c("Al'Akir","Al'Akir","Élémentaire","Neutre","Entité","Homme","Mort","Cataclysm"),
  c("Therazane","Therazane","Élémentaire","Neutre","Entité","Femme","Vivant","Cataclysm"),
  c("Neptulon","Neptulon","Élémentaire","Neutre","Entité","Homme","Vivant","Cataclysm"),
  c("N'Zoth","N'Zoth","Dieu très ancien","Empire noir","Entité","Homme","Mort","Battle for Azeroth"),
  c("Yogg-Saron","Yogg-Saron","Dieu très ancien","Empire noir","Entité","Homme","Disparu","Wrath of the Lich King"),
  c("C'Thun","C'Thun","Dieu très ancien","Empire noir","Entité","Homme","Disparu","Classic"),
  c("Hogger","Hogger","Gnoll","Neutre","Guerrier","Homme","Mort","Classic"),
  c("Mankrik","Mankrik","Orc","Horde","Guerrier","Homme","Vivant","Classic"),
  c("Millhouse Tempête-de-Mana","Millhouse Manastorm","Gnome","Neutre","Mage","Homme","Vivant","Cataclysm",["Millhouse Manastorm","Millhouse"]),
  c("Nat Pagle","Nat Pagle","Humain","Neutre","Chasseur","Homme","Vivant","Mists of Pandaria"),
  c("Akama","Akama","Roué","Neutre","Voleur","Homme","Vivant","The Burning Crusade"),
  c("Garona Miorque","Garona Halforcen","Demi-orque","Neutre","Voleur","Femme","Vivant","Warlords of Draenor",["Garona"]),
  c("Yrel","Yrel","Draeneï","Alliance","Paladin","Femme","Vivant","Warlords of Draenor"),
  c("Maraad","Maraad","Draeneï","Alliance","Paladin","Homme","Mort","Warlords of Draenor")
];

const $ = selector => document.querySelector(selector);
const el = {
  form: $("#wowGuessForm"), input: $("#wowCharacterInput"), submit: $("#wowSubmitButton"), suggestions: $("#wowSuggestions"),
  count: $("#wowAttemptCount"), message: $("#wowFormMessage"), rows: $("#wowAttemptRows"), empty: $("#wowEmptyState"),
  result: $("#wowResultCard"), resultImage: $("#wowResultImage"), resultPlaceholder: $("#wowResultPlaceholder"),
  resultTitle: $("#wowResultTitle"), resultText: $("#wowResultText"), newGame: $("#wowNewGameButton"),
  playAgain: $("#wowPlayAgainButton"), share: $("#wowShareButton"), streak: $("#wowStreakCount")
};

const portraitCache = new Map();
let target;
let attempts = [];
let won = false;
let visibleSuggestions = [];
let activeSuggestion = -1;
let currentContract;

const CONTRACTS = [
  { label: "TOUTES FACTIONS", test: () => true },
  { label: "DOSSIER ALLIANCE", test: character => character.faction === "Alliance" },
  { label: "DOSSIER HORDE", test: character => character.faction === "Horde" },
  { label: "FORCES OBSCURES", test: character => ["Fléau","Légion ardente","Empire noir"].includes(character.faction) },
  { label: "AGENTS NEUTRES", test: character => ["Neutre","Vol draconique"].includes(character.faction) }
];

function normalize(value) {
  return value.toLocaleLowerCase("fr").replaceAll("œ","oe").replaceAll("æ","ae").normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[.'’\- ]/g, "");
}

function initials(name) {
  return name.split(/[ '\-]/).filter(Boolean).slice(0,2).map(word => word[0]).join("").toUpperCase();
}

function findCharacter(value) {
  const needle = normalize(value);
  return CHARACTERS.find(character => [character.name, character.page, ...character.aliases].some(name => normalize(name) === needle));
}

function searchRank(character, needle) {
  const names = [character.name, character.page, ...character.aliases].map(name => normalize(name));
  if (names.some(name => name === needle)) return 0;
  if (normalize(character.name).startsWith(needle)) return 1;
  if (names.some(name => name.startsWith(needle))) return 2;
  if (character.name.split(/[ '\-]/).filter(Boolean).some(name => normalize(name).startsWith(needle))) return 3;
  return 4;
}

async function getPortrait(character) {
  if (portraitCache.has(character.page)) return portraitCache.get(character.page);
  const promise = (async () => {
    const params = new URLSearchParams({ action:"query", format:"json", formatversion:"2", prop:"pageimages", piprop:"thumbnail", pithumbsize:"420", redirects:"1", origin:"*", titles:character.page });
    const response = await fetch(`https://warcraft.wiki.gg/api.php?${params}`);
    if (!response.ok) return null;
    const data = await response.json();
    return data?.query?.pages?.[0]?.thumbnail?.source || null;
  })().catch(() => null);
  portraitCache.set(character.page, promise);
  return promise;
}

function showMessage(text, good = false) {
  el.message.textContent = text;
  el.message.style.color = good ? "var(--wow-gold-bright)" : "var(--bad)";
}

function updateCount() {
  el.count.textContent = `${attempts.length} tentative${attempts.length > 1 ? "s" : ""}`;
  LoreChallenge.update(attempts.length);
}

function matchClass(value, answer) { return `status-cell ${value === answer ? "good" : "bad"}`; }

async function attachPortrait(container, character, imageClass = "") {
  const placeholder = container.querySelector(".portrait-placeholder");
  const source = await getPortrait(character);
  if (!source || !container.isConnected) return;
  const fallback = placeholder?.cloneNode(true);
  const image = document.createElement("img");
  image.className = imageClass;
  image.src = source;
  image.alt = character.name;
  image.referrerPolicy = "no-referrer";
  image.addEventListener("error", () => fallback ? image.replaceWith(fallback) : image.remove(), { once: true });
  placeholder?.replaceWith(image);
}

function renderAttempt(character) {
  const row = document.createElement("div");
  row.className = "attempt-row wow-attempt-row";
  row.innerHTML = `
    <div class="wow-character-cell">
      <span class="portrait-placeholder">${initials(character.name)}</span>
      <span><strong>${character.name}</strong><small>${character.era}</small></span>
    </div>
    <div class="${matchClass(character.race,target.race)}" data-label="Race">${character.race}</div>
    <div class="${matchClass(character.faction,target.faction)}" data-label="Faction">${character.faction}</div>
    <div class="${matchClass(character.role,target.role)}" data-label="Rôle">${character.role}</div>
    <div class="${matchClass(character.gender,target.gender)}" data-label="Genre">${character.gender}</div>
    <div class="${matchClass(character.status,target.status)}" data-label="État">${character.status}</div>
    <div class="${matchClass(character.era,target.era)}" data-label="Ère">${character.era}</div>`;
  el.rows.prepend(row);
  el.empty.hidden = true;
  attachPortrait(row.querySelector(".wow-character-cell"), character);
}

function renderSuggestions(value) {
  const needle = normalize(value);
  if (!needle || won) {
    el.suggestions.hidden = true;
    el.input.setAttribute("aria-expanded","false");
    visibleSuggestions = [];
    return;
  }
  visibleSuggestions = CHARACTERS
    .filter(character => [character.name, character.page, ...character.aliases].some(name => normalize(name).includes(needle)))
    .filter(character => !attempts.includes(character))
    .sort((first, second) => searchRank(first, needle) - searchRank(second, needle) || first.name.localeCompare(second.name,"fr"));
  activeSuggestion = -1;
  if (!visibleSuggestions.length) {
    el.suggestions.innerHTML = `<p class="suggestion-empty">Aucun personnage trouvé. Essaie un nom, un prénom ou un alias.</p>`;
    el.suggestions.hidden = false;
    el.input.setAttribute("aria-expanded","true");
    return;
  }
  const resultLabel = `${visibleSuggestions.length} personnage${visibleSuggestions.length > 1 ? "s" : ""} trouvé${visibleSuggestions.length > 1 ? "s" : ""}`;
  el.suggestions.innerHTML = `<p class="suggestion-summary">${resultLabel}<span>Fais défiler pour tout voir</span></p>` + visibleSuggestions.map((character,index) => `
    <button class="suggestion" type="button" role="option" data-index="${index}" aria-selected="false">
      <span class="wow-suggestion-mark">${initials(character.name)}</span><strong>${character.name}</strong><small>${character.race}</small>
    </button>`).join("");
  el.suggestions.hidden = false;
  el.input.setAttribute("aria-expanded","true");
}

function chooseSuggestion(index) {
  const character = visibleSuggestions[index];
  if (!character) return;
  el.input.value = character.name;
  el.suggestions.hidden = true;
  el.input.setAttribute("aria-expanded","false");
  el.input.focus();
}

function updateActiveSuggestion() {
  [...el.suggestions.querySelectorAll(".suggestion")].forEach((item,index) => {
    const active = index === activeSuggestion;
    item.classList.toggle("active",active);
    item.setAttribute("aria-selected",String(active));
    if (active) item.scrollIntoView({block:"nearest"});
  });
}

async function submitGuess(value) {
  if (won) return {ok:false,error:"La partie est terminée."};
  const character = findCharacter(value);
  if (!character) {
    showMessage("Ce personnage ne fait pas partie des 106 archives.");
    return {ok:false,error:"Personnage introuvable."};
  }
  if (attempts.includes(character)) {
    showMessage(`${character.name} a déjà été proposé.`);
    return {ok:false,error:"Personnage déjà proposé."};
  }
  attempts.push(character);
  renderAttempt(character);
  updateCount();
  el.input.value = "";
  el.suggestions.hidden = true;
  showMessage("");
  const correct = character === target;
  if(!correct)window.LoreFX?.beat('clue');
  if (correct) await finishGame();
  else if (LoreChallenge.exhausted(attempts.length)) await loseGame();
  return {ok:true,correct,attempt:attempts.length,character:character.name};
}

async function finishGame() {
  window.LoreFX?.beat('finish',{label:'IDENTITÉ TROUVÉE !',detail:`${attempts.length} essai(s). Bien joué.`});
  won = true;
  el.input.disabled = true;
  el.submit.disabled = true;
  const streak = Number(localStorage.getItem("wowdle-streak") || 0) + 1;
  localStorage.setItem("wowdle-streak",String(streak));
  el.streak.textContent = streak;
  el.result.classList.remove("lost");
  el.result.querySelector(".eyebrow").innerHTML = "<span></span>IDENTITÉ RÉVÉLÉE";
  el.resultTitle.textContent = `${target.name}, trouvé !`;
  el.resultText.textContent = `${LoreChallenge.label()} · Secret percé en ${attempts.length} tentative${attempts.length > 1 ? "s" : ""}.`;
  el.resultPlaceholder.textContent = initials(target.name);
  el.resultPlaceholder.hidden = false;
  el.resultImage.hidden = true;
  el.result.hidden = false;
  const portrait = await getPortrait(target);
  if (portrait) {
    el.resultImage.src = portrait;
    el.resultImage.alt = target.name;
    el.resultImage.referrerPolicy = "no-referrer";
    el.resultImage.hidden = false;
    el.resultPlaceholder.hidden = true;
  }
  setTimeout(() => el.result.scrollIntoView({behavior:"smooth",block:"center"}),120);
}

async function loseGame() {
  window.LoreFX?.beat('end',{label:'FIN DES ESSAIS',detail:'Consulte les indices et retente ta chance.'});
  won = true;
  el.input.disabled = true;
  el.submit.disabled = true;
  localStorage.setItem("wowdle-streak", "0");
  el.streak.textContent = "0";
  el.result.classList.add("lost");
  el.result.querySelector(".eyebrow").innerHTML = "<span></span>ARCHIVES VERROUILLÉES";
  el.resultTitle.textContent = `C’était ${target.name}.`;
  el.resultText.textContent = `${LoreChallenge.label()} terminé : les archives se referment après ${attempts.length} essais.`;
  el.resultPlaceholder.textContent = initials(target.name);
  el.resultPlaceholder.hidden = false;
  el.resultImage.hidden = true;
  el.result.hidden = false;
  const portrait = await getPortrait(target);
  if (portrait) {
    el.resultImage.src = portrait;
    el.resultImage.alt = target.name;
    el.resultImage.referrerPolicy = "no-referrer";
    el.resultImage.hidden = false;
    el.resultPlaceholder.hidden = true;
  }
  setTimeout(() => el.result.scrollIntoView({behavior:"smooth",block:"center"}),120);
}

function newGame() {
  window.LoreFX?.beat('round',{reset:true,label:'NOUVEAU MYSTÈRE',detail:'Le premier nom ouvre la piste.'});
  const previous = target;
  const eligibleContracts = CONTRACTS.filter(contract => CHARACTERS.filter(contract.test).length >= 8);
  currentContract = LoreChallenge.pick(eligibleContracts, currentContract);
  const pool = CHARACTERS.filter(currentContract.test);
  do { target = pool[Math.floor(Math.random() * pool.length)]; } while (target === previous && pool.length > 1);
  attempts = [];
  won = false;
  el.rows.innerHTML = "";
  el.empty.hidden = false;
  el.result.hidden = true;
  el.result.classList.remove("lost");
  el.input.value = "";
  el.input.disabled = false;
  el.submit.disabled = false;
  updateCount();
  showMessage("");
  LoreChallenge.reset(currentContract.label);
  el.input.focus({preventScroll:true});
  return {ok:true,poolSize:CHARACTERS.length};
}

function shareResult() {
  const squares = attempts.map(character => {
    if (character === target) return "🟩";
    const traits = ["race","faction","role","gender","status","era"].filter(key => character[key] === target[key]).length;
    return traits ? "🟨" : "⬛";
  }).join("");
  const text = `WOWDLE · ${LoreChallenge.label()} — ${attempts.length} tentative${attempts.length > 1 ? "s" : ""}\n${squares}`;
  navigator.clipboard?.writeText(text).then(() => {
    el.share.textContent = "Résultat copié !";
    setTimeout(() => {el.share.textContent = "Copier le résultat";},1800);
  }).catch(() => showMessage("Impossible de copier automatiquement le résultat."));
}

el.form.addEventListener("submit",event => { event.preventDefault(); submitGuess(el.input.value.trim()); });
el.input.addEventListener("input",event => { showMessage(""); renderSuggestions(event.target.value); });
el.input.addEventListener("keydown",event => {
  if (el.suggestions.hidden || !visibleSuggestions.length) return;
  if (event.key === "ArrowDown") { event.preventDefault(); activeSuggestion = (activeSuggestion + 1) % visibleSuggestions.length; updateActiveSuggestion(); }
  else if (event.key === "ArrowUp") { event.preventDefault(); activeSuggestion = (activeSuggestion - 1 + visibleSuggestions.length) % visibleSuggestions.length; updateActiveSuggestion(); }
  else if (event.key === "Enter" && activeSuggestion >= 0) { event.preventDefault(); chooseSuggestion(activeSuggestion); }
  else if (event.key === "Escape") { el.suggestions.hidden = true; el.input.setAttribute("aria-expanded","false"); }
});
el.suggestions.addEventListener("mousedown",event => { const button = event.target.closest(".suggestion"); if (button) { event.preventDefault(); chooseSuggestion(Number(button.dataset.index)); } });
document.addEventListener("click",event => { if (!event.target.closest(".search-wrap")) { el.suggestions.hidden = true; el.input.setAttribute("aria-expanded","false"); } });
el.newGame.addEventListener("click",newGame);
el.playAgain.addEventListener("click",() => {newGame();window.scrollTo({top:0,behavior:"smooth"});});
el.share.addEventListener("click",shareResult);
el.resultImage.addEventListener("error",() => { el.resultImage.hidden = true; el.resultPlaceholder.hidden = false; });
el.streak.textContent = localStorage.getItem("wowdle-streak") || "0";
LoreChallenge.bind(newGame);

function registerWebMCP() {
  const context = document.modelContext;
  if (!context?.registerTool) return;
  const safe = promise => Promise.resolve(promise).catch(() => undefined);
  safe(context.registerTool({
    name:"guess_wow_character", title:"Proposer un personnage de Warcraft",
    description:"Propose un personnage dans la partie WoWdle visible et retourne si la réponse est correcte.",
    inputSchema:{type:"object",properties:{character:{type:"string"}},required:["character"],additionalProperties:false},
    annotations:{readOnlyHint:false,untrustedContentHint:false},
    execute:input => { if (!input || typeof input.character !== "string" || !input.character.trim()) throw new Error("Le nom est requis."); return submitGuess(input.character.trim()); }
  }));
  safe(context.registerTool({
    name:"start_new_wow_game", title:"Commencer une partie WoWdle",
    description:"Réinitialise la partie visible et choisit un nouveau personnage mystère.",
    inputSchema:{type:"object",properties:{},additionalProperties:false},
    annotations:{readOnlyHint:false,untrustedContentHint:false}, execute:() => newGame()
  }));
}

registerWebMCP();
newGame();
