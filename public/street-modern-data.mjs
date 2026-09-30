import {fighters as legacy,shuffle,normalize} from './street-data.mjs';
export {shuffle,normalize};
// Curated, explicit roster. Numbered appearances include their expanded editions.
const additions=[
['alex','Alex','États-Unis','Homme','Lutte','Street Fighter III','III,V,6','🇺🇸 🤼 🗽 💪'],
['ibuki','Ibuki','Japon','Femme','Ninjutsu','Street Fighter III','III,IV,V','🥷 🇯🇵 📚 💨'],
['dudley','Dudley','Royaume-Uni','Homme','Boxe','Street Fighter III','III,IV','🇬🇧 🥊 🌹 ☕'],
['makoto','Makoto','Japon','Femme','Karaté','Street Fighter III: 3rd Strike','III,IV','🇯🇵 🥋 🟡 🏯'],
['elena','Elena','Kenya','Femme','Capoeira','Street Fighter III','III,IV,6','🇰🇪 🤸 🌿 💚'],
['yun','Yun','Hong Kong','Homme','Kung-fu','Street Fighter III','III,IV','🧢 🛹 🐉 🇭🇰'],
['yang','Yang','Hong Kong','Homme','Kung-fu','Street Fighter III','III,IV','🇭🇰 🥋 🔴 👬'],
['urien','Urien','Inconnu','Homme','Pancrace','Street Fighter III: 2nd Impact','III,V','⚡ 🪞 🏛️ 👔'],
['akuma','Akuma','Japon','Homme','Ansatsuken','Super Street Fighter II Turbo','III,IV,V,6','👹 📿 🔥 天'],
['juri','Juri','Corée du Sud','Femme','Taekwondo','Super Street Fighter IV','IV,V,6','🇰🇷 🕷️ 👁️ 💜'],
['cviper','C. Viper','États-Unis','Femme','Combat équipé','Street Fighter IV','IV,6','🕶️ 📱 ⚡ 🔥'],
['abel','Abel','France','Homme','MMA','Street Fighter IV','IV','🇫🇷 🤼 🐕 ❔'],
['gouken','Gouken','Japon','Homme','Ansatsuken','Street Fighter IV','IV','🇯🇵 🧔 📿 🥋'],
['rashid','Rashid','Inconnu','Homme','Parkour','Street Fighter V','V,6','🌪️ 📱 🤸 🎥'],
['laura','Laura','Brésil','Femme','Jiu-jitsu','Street Fighter V','V','🇧🇷 ⚡ 🤼 🟢'],
['menat','Menat','Égypte','Femme','Arts mystiques','Street Fighter V','V','🇪🇬 🔮 🐈 ✨'],
['ed','Ed','Allemagne','Homme','Boxe','Street Fighter V','V,6','🇩🇪 🥊 💜 🧢'],
['zeku','Zeku','Japon','Homme','Ninjutsu','Street Fighter Alpha 2','V','🥷 👴 🧑 ⏳'],
['luke','Luke','États-Unis','Homme','MMA','Street Fighter V','V,6','🇺🇸 ⭐ 👊 🎮'],
['jamie','Jamie','Hong Kong','Homme','Boxe de l’homme ivre','Street Fighter 6','6','🍶 🕺 🐉 🥋'],
['kimberly','Kimberly','États-Unis','Femme','Ninjutsu','Street Fighter 6','6','🥷 🎨 📼 🎧'],
['marisa','Marisa','Italie','Femme','Pancrace','Street Fighter 6','6','🇮🇹 🏛️ 💍 💪'],
['manon','Manon','France','Femme','Judo','Street Fighter 6','6','🇫🇷 🩰 🥇 👗'],
['jp','JP','Inconnu','Homme','Psycho Power','Street Fighter 6','6','🎩 🦯 💜 💼'],
['lily','Lily','Mexique','Femme','Combat Thunderfoot','Street Fighter 6','6','🇲🇽 🌬️ 🪶 📷'],
['aki','A.K.I.','Chine','Femme','Kung-fu empoisonné','Street Fighter 6','6','🇨🇳 🐍 ☠️ 💅']
].map(([id,name,country,gender,style,debut,games,emoji])=>({id,name,country,gender,style,debut,games:games.split(','),emoji}));
const appearances={ryu:'III,IV,V,6',ken:'III,IV,V,6',chunli:'III,IV,V,6',guile:'IV,V,6',blanka:'IV,V,6',zangief:'IV,V,6',dhalsim:'IV,V,6',honda:'IV,V,6',cammy:'IV,V,6',deejay:'IV,6',thawk:'IV',feilong:'IV',balrog:'IV,V',vega:'IV,V',sagat:'IV,V,6',bison:'IV,V,6'};
export const fighters=[...legacy.map(f=>({...f,games:appearances[f.id].split(',')})),...additions].map(f=>({...f,group:f.games.map(g=>'SF'+g).join(' · ')}));
export const byId=Object.fromEntries(fighters.map(f=>[f.id,f]));
export const compare=(a,b)=>['country','gender','style','debut','group'].map(key=>({key,value:a[key],match:a[key]===b[key]}));
