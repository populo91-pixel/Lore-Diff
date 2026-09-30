import { pokemonTrivia } from '../app/quiz/pokemon-trivia';
export type Question={prompt:string;options:string[];correct:number;fact:string;universe:string;signal?:string};
const emojiRows=[
 ['🍄 🔧 👨🏻','Mario','Luigi','Wario','Toad','Le champignon et le plombier à moustache évoquent Mario.'],
 ['🦔 🔵 💨','Sonic','Kirby','Crash','Yoshi','Sonic est le hérisson bleu connu pour sa vitesse.'],
 ['⚡ 🐭 🟡','Pikachu','Raichu','Rondoudou','Évoli','La souris électrique jaune est Pikachu ; Raichu est orange, Rondoudou est rose et Évoli est brun.'],
 ['🗡️ 🛡️ 🧝','The Legend of Zelda','Halo','Portal','DOOM','L’épée, le bouclier et le héros aux oreilles pointues évoquent Link.'],
 ['⛏️ 🧱 💎','Minecraft','Stardew Valley','Tetris','Roblox','La pioche, les blocs en 3D et le diamant sont des symboles de Minecraft.'],
 ['👻 🟡 🍒','Pac-Man','Kirby','Mario','Sonic','Pac-Man mange des pac-gommes et des fruits en évitant les fantômes.'],
 ['🚪 🔵 🟠','Portal','Half-Life','BioShock','Halo','Portal repose sur deux portails reliés, l’un bleu et l’autre orange.'],
 ['🐉 🗣️ 🏔️','Skyrim','The Witcher 3','Dragon Age','Dark Souls','Les dragons, les cris et les montagnes évoquent Skyrim.'],
 ['🦝 🏝️ 💰','Animal Crossing','Les Sims','Stardew Valley','Pokémon','Tom Nook, l’île et les clochettes évoquent Animal Crossing.'],
 ['🏎️ 🍌 🐢','Mario Kart','Gran Turismo','Forza Horizon','Trackmania','Bananes et carapaces sont des objets de Mario Kart.'],
 ['🟣 🐉 💎','Spyro','Sonic','Yoshi','Kirby','Spyro est un petit dragon violet qui collectionne des gemmes.'],
 ['🦊 🌀 📦','Crash Bandicoot','Ratchet & Clank','Sly Cooper','Jak and Daxter','Les caisses et l’attaque tournoyante évoquent Crash, un bandicoot et non un renard.'],
 ['⚔️ 🐺 ⚪','The Witcher','Skyrim','Elden Ring','Fable','Le Loup blanc est le surnom de Geralt de Riv.'],
 ['🧟 🌿 ☀️','Plants vs. Zombies','Resident Evil','The Last of Us','Left 4 Dead','Les plantes alimentées par le soleil défendent le jardin contre les zombies.'],
 ['🧱 📏 🔄','Tetris','Minecraft','Portal','Pong','Dans Tetris, on tourne les pièces pour compléter des lignes.'],
 ['🦍 🍌 🛢️','Donkey Kong','Crash Bandicoot','Sonic','Kirby','Le gorille, les bananes et les tonneaux évoquent Donkey Kong.'],
 ['🩷 ⚪ 🌬️','Kirby','Rondoudou','Boo','Toad','Kirby est une boule rose capable d’aspirer ses ennemis.'],
 ['🤖 🧡 🔫','Samus Aran','Master Chief','Mega Man','Doom Slayer','Samus porte une armure orange et un canon au bras.']
];
const emoji:Question[]=emojiRows.map(([signal,a,b,c,d,fact])=>({prompt:'Quel jeu ou personnage se cache derrière ces symboles ?',options:[a,b,c,d],correct:0,fact,signal,universe:'Culture JV'}));
// Stable, text-only items from the existing banks. No remote image is required.
const poke:Question[]=pokemonTrivia.filter(q=>q.difficulty==='normal').map(q=>({...q,universe:'Pokémon',signal:undefined}));
const lolRows=[
 ['Quel champion érige le Mur de vent ?','Yasuo','Braum','Janna','Samira','Le Mur de vent de Yasuo bloque de nombreux projectiles.'],
 ['Quel lien unit Yasuo et Yone ?','Ils sont frères','Ils sont père et fils','Ils sont cousins','Aucun lien familial','Yone est le demi-frère aîné de Yasuo.'],
 ['Quel roi tente de ramener Isolde et provoque la Ruine ?','Viego','Azir','Jarvan III','Mordekaiser','Viego est le Roi déchu de Camavor.'],
 ['Quel champion est un demi-dieu forgeron du Freljord ?','Ornn','Volibear','Braum','Anivia','Ornn est associé au feu, à la forge et à l’artisanat.'],
 ['Qui est surnommée la Sorcière de glace ?','Lissandra','Ashe','Sejuani','LeBlanc','Lissandra dirige la Garde de givre.'],
 ['Dans quelle cité vivent Caitlyn et Jayce ?','Piltover','Noxus','Demacia','Shurima','Piltover est surnommée la Cité du progrès.'],
 ['Lequel de ces champions est membre de K/DA ?','Akali','Diana','Riven','Katarina','K/DA réunit Ahri, Akali, Evelynn et Kai’Sa.'],
 ['Quel empereur cherche à restaurer Shurima ?','Azir','Nasus','Renekton','Xerath','Azir relève le Disque solaire de Shurima.'],
 ['Lequel de ces champions n’est pas un Yordle ?','Sett','Teemo','Poppy','Veigar','Sett est un hybride humain-vastaya.'],
 ['Quel duo forme un couple de Vastayas ?','Xayah et Rakan','Ahri et Wukong','Nami et Fizz','Rengar et Neeko','Xayah et Rakan sont les Rebelles amoureux d’Ionia.'],
 ['Qui commande la Légion Trifarienne ?','Darius','Draven','Katarina','Talon','Darius est l’un des dirigeants de Noxus.'],
 ['Quel champion est lié à la Lame du roi déchu ?','Viego','Thresh','Aatrox','Mordekaiser','La lame est celle de Viego.']
];
const lol:Question[]=lolRows.map(([prompt,a,b,c,d,fact])=>({prompt,options:[a,b,c,d],correct:0,fact,universe:'League of Legends'}));
export function dayKey(now=new Date()){return new Intl.DateTimeFormat('en-CA',{timeZone:'Europe/Paris',year:'numeric',month:'2-digit',day:'2-digit'}).format(now)}
export function validDay(day:unknown):day is string {if(typeof day!=='string'||!/^\d{4}-\d{2}-\d{2}$/.test(day))return false;const t=Date.parse(day+'T12:00:00Z');return Number.isFinite(t)&&new Date(t).toISOString().slice(0,10)===day&&day<=dayKey()&&t>Date.now()-31*86400000}
function rng(seed:string){let n=2166136261;for(const c of seed)n=Math.imul(n^c.charCodeAt(0),16777619);return()=>{n+=0x6d2b79f5;let t=Math.imul(n^n>>>15,1|n);t^=t+Math.imul(t^t>>>7,61|t);return((t^t>>>14)>>>0)/4294967296}}
function shuffle<T>(items:T[],r:()=>number){const a=[...items];for(let i=a.length-1;i>0;i--){const j=Math.floor(r()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}
export function dailyQuestions(day:string){const r=rng('daily-v1:'+day);const p=shuffle(poke,r),l=shuffle(lol,r);return [...shuffle(emoji,r).slice(0,3),p[0],l[0],p[1],l[1],p[2],l[2]].map(q=>{const answer=q.options[q.correct];const options=shuffle(q.options,r);return {...q,options,correct:options.indexOf(answer)}})}
export type Answer={choice:number;correct:boolean;earned:number;speed:number;combo:number};
export type State={index:number;score:number;streak:number;bestStreak:number;openedAt:number;bet:number|null;answers:Answer[]};
export function initialState(now=Date.now()):State{return{index:0,score:0,streak:0,bestStreak:0,openedAt:now,bet:null,answers:[]}}
export function answerQuestion(s:State,q:Question,choice:number,now=Date.now()){
 if(s.answers.length!==s.index||s.index>8||!Number.isInteger(choice)||choice<0||choice>3||(s.index===8&&s.bet===null))return null;
 const correct=choice===q.correct,streak=correct?s.streak+1:0;
 const speed=correct?Math.max(0,250-Math.floor(Math.max(0,now-s.openedAt)/60)):0;
 const combo=correct?Math.min(250,Math.max(0,streak-1)*50):0;
 const earned=(correct?1000+speed+combo:0)+(s.index===8?(correct?s.bet!:-s.bet!):0);
 return{...s,score:s.score+earned,streak,bestStreak:Math.max(streak,s.bestStreak),answers:[...s.answers,{choice,correct,earned,speed,combo}]};
}
