type Difficulty = "easy" | "normal" | "expert";

export type GeneratedQuestion = {
  universe:"pokemon"|"dofus"|"runeterra";
  type:string;
  prompt:string;
  options:[string,string,string,string];
  correct:number;
  fact:string;
  signal:string;
  difficulty:Difficulty;
  generation?:number;
  image?:string;
  imageMode?:"cover"|"silhouette"|"zoom";
};

function choices(correct:string,pool:string[],offset:number):[string,string,string,string] {
  const unique = [...new Set(pool.filter(item => item !== correct))];
  const picked:string[] = [];
  for (let step = 0; picked.length < 3 && step < unique.length * 2; step += 1) {
    const value = unique[(offset + step * 7) % unique.length];
    if (!picked.includes(value)) picked.push(value);
  }
  while (picked.length < 3) picked.push(`Archive ${picked.length + 2}`);
  return [correct,picked[0],picked[1],picked[2]];
}

const pokemonRecords = [
  [1,"Bulbizarre","Plante / Poison"],[2,"Herbizarre","Plante / Poison"],[3,"Florizarre","Plante / Poison"],[4,"Salamèche","Feu"],[5,"Reptincel","Feu"],[6,"Dracaufeu","Feu / Vol"],[7,"Carapuce","Eau"],[8,"Carabaffe","Eau"],[9,"Tortank","Eau"],[10,"Chenipan","Insecte"],
  [12,"Papilusion","Insecte / Vol"],[13,"Aspicot","Insecte / Poison"],[15,"Dardargnan","Insecte / Poison"],[16,"Roucool","Normal / Vol"],[18,"Roucarnage","Normal / Vol"],[19,"Rattata","Normal"],[21,"Piafabec","Normal / Vol"],[25,"Pikachu","Électrik"],[26,"Raichu","Électrik"],[27,"Sabelette","Sol"],
  [31,"Nidoqueen","Poison / Sol"],[34,"Nidoking","Poison / Sol"],[35,"Mélofée","Fée"],[37,"Goupix","Feu"],[38,"Feunard","Feu"],[39,"Rondoudou","Normal / Fée"],[41,"Nosferapti","Poison / Vol"],[43,"Mystherbe","Plante / Poison"],[45,"Rafflesia","Plante / Poison"],[47,"Parasect","Insecte / Plante"],
  [48,"Mimitoss","Insecte / Poison"],[49,"Aéromite","Insecte / Poison"],[50,"Taupiqueur","Sol"],[52,"Miaouss","Normal"],[53,"Persian","Normal"],[54,"Psykokwak","Eau"],[58,"Caninos","Feu"],[59,"Arcanin","Feu"],[63,"Abra","Psy"],[65,"Alakazam","Psy"],
  [66,"Machoc","Combat"],[68,"Mackogneur","Combat"],[72,"Tentacool","Eau / Poison"],[76,"Grolem","Roche / Sol"],[77,"Ponyta","Feu"],[83,"Canarticho","Normal / Vol"],[84,"Doduo","Normal / Vol"],[87,"Lamantine","Eau / Glace"],[88,"Tadmorv","Poison"],[91,"Crustabri","Eau / Glace"],
  [94,"Ectoplasma","Spectre / Poison"],[95,"Onix","Roche / Sol"],[96,"Soporifik","Psy"],[99,"Krabboss","Eau"],[101,"Électrode","Électrik"],[102,"Noeunoeuf","Plante / Psy"],[103,"Noadkoko","Plante / Psy"],[104,"Osselait","Sol"],[106,"Kicklee","Combat"],[107,"Tygnon","Combat"],
  [113,"Leveinard","Normal"],[112,"Rhinoféros","Sol / Roche"],[121,"Staross","Eau / Psy"],[123,"Insécateur","Insecte / Vol"],[124,"Lippoutou","Glace / Psy"],[125,"Élektek","Électrik"],[126,"Magmar","Feu"],[129,"Magicarpe","Eau"],[130,"Léviator","Eau / Vol"],[131,"Lokhlass","Eau / Glace"],
  [132,"Métamorph","Normal"],[133,"Évoli","Normal"],[134,"Aquali","Eau"],[135,"Voltali","Électrik"],[136,"Pyroli","Feu"],[137,"Porygon","Normal"],[138,"Amonita","Roche / Eau"],[142,"Ptéra","Roche / Vol"],[143,"Ronflex","Normal"],[149,"Dracolosse","Dragon / Vol"],[150,"Mewtwo","Psy"],[151,"Mew","Psy"],
] as const;

const pokemonNames = pokemonRecords.map(item => item[1]);
const pokemonTypes = pokemonRecords.map(item => item[2]);

export const generatedPokemon:GeneratedQuestion[] = pokemonRecords.flatMap((record,index) => {
  const [number,name,type] = record;
  const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${number}.png`;
  return [
    { universe:"pokemon",generation:1,type:"SILHOUETTE",prompt:`Qui se cache derrière cette silhouette de Kanto ?`,options:choices(name,[...pokemonNames],index),correct:0,fact:`C’est ${name}, de type ${type} dans les jeux actuels.`,signal:"KANTO",difficulty:"easy" as const,image,imageMode:"silhouette" as const },
    { universe:"pokemon",generation:1,type:"TYPE",prompt:`Quel profil de type correspond à ${name} dans les jeux actuels ?`,options:choices(type,[...pokemonTypes],index+19),correct:0,fact:`${name} possède le profil ${type}.`,signal:"TYPE",difficulty:"normal" as const,image,imageMode:"cover" as const },
  ];
});

const dofusFacts = [
  ["les six Dofus Primordiaux","des œufs de dragons",["des armes divines","des portails dimensionnels","des fragments de Wakfu"],"Les Dofus Primordiaux sont six œufs pondus par de puissants dragons."],
  ["Bonta","la cité blanche",["la cité rouge","une dimension divine","une île glacée"],"Bonta est la grande cité blanche opposée à Brâkmar."],
  ["Brâkmar","la cité rouge",["la cité blanche","une forêt","une dimension temporelle"],"Brâkmar est la cité rivale de Bonta."],
  ["Otomaï","un alchimiste",["un chevalier Iop","un dragon primordial","un dieu"],"Otomaï est l’un des plus célèbres alchimistes du Monde des Douze."],
  ["le Roi Nidas","Enutrosor",["Xélorium","Srambad","Ecaflipus"],"Le Roi Nidas règne sur Enutrosor."],
  ["Vortex","Xélorium",["Enutrosor","Srambad","Frigost"],"Vortex est le boss majeur de Xélorium."],
  ["la Reine des Voleurs","Srambad",["Ecaflipus","Enutrosor","Incarnam"],"La Reine des Voleurs règne sur Srambad."],
  ["le Chalœil","Ecaflipus",["Xélorium","Srambad","Frigost"],"Le Chalœil est le maître de la dimension Ecaflipus."],
  ["le Comte Harebourg","Frigost",["Pandala","Moon","Sufokia"],"Le Comte Harebourg est au cœur de l’histoire de Frigost."],
  ["Missiz Frizz","la Forgefroide",["le Palais des Lacs","l’Aquadôme","le Château d’Amakna"],"Missiz Frizz dirige la Forgefroide."],
  ["Merkator","l’Aquadôme",["le Temple de Koutoulou","la Forgefroide","le Palais du Roi Nidas"],"Merkator attend les aventuriers dans l’Aquadôme."],
  ["le Wa Wabbit","l’île des Wabbits",["Frigost","l’île de Moon","Otomai"],"Le Wa Wabbit est le souverain emblématique de son île."],
  ["le Moon","l’île de Moon",["Pandala","Sakai","Nimotopia"],"Moon est le singe légendaire de l’île qui porte son nom."],
  ["le Kralamoure Géant","une créature marine",["un dragon","un tofu","un meulou"],"Le Kralamoure Géant est un monstre marin colossal."],
  ["le Bouftou","une créature laineuse",["une machine","un esprit","un dragon"],"Le Bouftou est l’une des mascottes du Monde des Douze."],
  ["le Tofu","un petit oiseau jaune",["un félin","un reptile","un automate"],"Le Tofu est une créature jaune extrêmement connue."],
  ["le Meulou","un monstre lupin",["un crustacé","un oiseau","un végétal"],"Le Meulou est une puissante créature apparentée au loup."],
  ["le Chêne Mou","un arbre ancestral",["un forgeron","un dragon","un pirate"],"Le Chêne Mou est un boss végétal ancestral."],
  ["le Dragon Cochon","un gardien lié au Dofus Turquoise",["le protecteur de Bonta","un dieu Xélor","un roi Wabbit"],"Le Dragon Cochon est historiquement associé au Dofus Turquoise."],
  ["Dark Vlad","Goultard",["Joris","Ruel","Kerubim"],"Dark Vlad est une facette sombre de Goultard."],
  ["Kerubim Crépin","le père adoptif de Joris",["le frère de Joris","le roi de Bonta","un dragon"],"Kerubim a recueilli et élevé Joris."],
  ["Atcham","le frère de Kerubim",["son fils","son maître","son dieu"],"Atcham et Kerubim sont deux frères Ecaflips."],
  ["Julith","une Huppermage de Brâkmar",["une Sadida de Bonta","une déesse","une reine Wabbit"],"Julith est l’antagoniste du film Dofus, livre 1."],
  ["Bakara","une Huppermage",["une Iop","une Eniripsa","une Osamodas"],"Bakara est une Huppermage importante du film Dofus."],
  ["Joris","un héros lié à Kerubim",["un protecteur de mois","un boss de Frigost","un dieu"],"Joris est le fils adoptif de Kerubim."],
  ["la classe Xélor","le temps",["les plantes","les portails","les bombes"],"Les Xélors manipulent le temps."],
  ["la classe Eniripsa","les soins",["les pièges","les tourelles","les invocations animales"],"Les Eniripsas sont spécialisés dans les soins."],
  ["la classe Sram","les pièges et l’invisibilité",["les soins","les armures","le hasard"],"Les Srams combattent avec ruse, pièges et invisibilité."],
  ["la classe Iop","la force au corps à corps",["le voyage temporel","les portails","la prospection"],"Les Iops incarnent la bravoure et la force directe."],
  ["la classe Ecaflip","le hasard",["le temps","les masques","les poupées"],"Le jeu et le hasard définissent les Ecaflips."],
  ["la classe Enutrof","la prospection et les trésors",["les soins","les glyphes","les bombes"],"Les Enutrofs sont associés à la richesse et à la prospection."],
  ["la classe Eliotrope","les portails",["les pièges","les tourelles","les châtiments"],"Les Eliotropes se déplacent et attaquent grâce à des portails."],
  ["la classe Steamer","les tourelles",["les poupées","les portails","les cartes"],"Les Steamers utilisent des tourelles technomagiques."],
  ["la classe Roublard","les bombes",["les glyphes","les soins","les invocations"],"Les Roublards construisent des murs de bombes."],
  ["la classe Sadida","les poupées et la nature",["les armes à feu","le temps","les portails"],"Les Sadidas commandent la nature et leurs poupées."],
  ["Astrub","la cité des débutants",["une dimension divine","une île de glace","un donjon"],"Astrub est le grand carrefour historique des nouveaux aventuriers."],
  ["Incarnam","une zone céleste de départ",["une cité ennemie","un raid","une prison"],"Incarnam accueille de nombreux aventuriers au commencement."],
  ["Pandala","une île marquée par les éléments",["une dimension du temps","une cité sous-marine","un désert"],"Pandala est une île fortement liée aux éléments."],
  ["le Chaos d’Ogrest","un déluge provoqué par ses larmes",["une guerre entre Bonta et Brâkmar","une invasion de Wabbits","un tournoi"],"Les larmes d’Ogrest ont submergé une grande partie du monde."],
  ["Djaul","le protecteur de Descendre",["le roi de Bonta","le dieu des Iops","le gardien d’Incarnam"],"Djaul est le protecteur du mois équivalent à décembre."],
] as const;

export const generatedDofus:GeneratedQuestion[] = dofusFacts.flatMap((item,index) => {
  const [subject,answer,wrong,fact] = item;
  const options:[string,string,string,string] = [answer,...wrong];
  return [
    { universe:"dofus",type:"ARCHIVE",prompt:`À quoi associe-t-on ${subject} ?`,options,correct:0,fact,signal:"FILE",difficulty:"easy" as const },
    { universe:"dofus",type:"CONNEXION",prompt:`Complète le dossier : ${subject} → ?`,options,correct:0,fact,signal:`C-${String(index+1).padStart(2,"0")}`,difficulty:"normal" as const },
    { universe:"dofus",type:"LORE EXPERT",prompt:`Quelle donnée correspond précisément à ${subject} ?`,options,correct:0,fact,signal:"LORE",difficulty:"expert" as const },
  ];
});

const runeterraRecords = [
  ["Ahri","Ahri","Mid","Ionia",2011],["Akali","Akali","Mid","Ionia",2010],["Ashe","Ashe","ADC","Freljord",2009],["Azir","Azir","Mid","Shurima",2014],["Braum","Braum","Support","Freljord",2014],["Caitlyn","Caitlyn","ADC","Piltover",2011],["Darius","Darius","Top","Noxus",2012],["Diana","Diana","Mid","Targon",2012],
  ["Draven","Draven","ADC","Noxus",2012],["Ekko","Ekko","Jungle","Zaun",2015],["Evelynn","Evelynn","Jungle","Runeterra",2009],["Ezreal","Ezreal","ADC","Piltover",2010],["Fiora","Fiora","Top","Demacia",2012],["Fizz","Fizz","Mid","Bilgewater",2011],["Garen","Garen","Top","Demacia",2010],["Gnar","Gnar","Top","Freljord",2014],
  ["Graves","Graves","Jungle","Bilgewater",2011],["Hecarim","Hecarim","Jungle","Îles obscures",2012],["Heimerdinger","Heimerdinger","Mid","Piltover",2009],["Irelia","Irelia","Top","Ionia",2010],["Jhin","Jhin","ADC","Ionia",2016],["Jinx","Jinx","ADC","Zaun",2013],["Kai’Sa","Kaisa","ADC","Néant",2018],["Katarina","Katarina","Mid","Noxus",2009],
  ["Kayn","Kayn","Jungle","Ionia",2017],["Kennen","Kennen","Top","Ionia",2010],["Kindred","Kindred","Jungle","Runeterra",2015],["LeBlanc","Leblanc","Mid","Noxus",2010],["Lee Sin","LeeSin","Jungle","Ionia",2011],["Leona","Leona","Support","Targon",2011],["Lux","Lux","Mid","Demacia",2010],["Malphite","Malphite","Top","Ixtal",2009],
  ["Miss Fortune","MissFortune","ADC","Bilgewater",2010],["Mordekaiser","Mordekaiser","Top","Noxus",2010],["Nasus","Nasus","Top","Shurima",2009],["Nautilus","Nautilus","Support","Bilgewater",2012],["Neeko","Neeko","Mid","Ixtal",2018],["Nocturne","Nocturne","Jungle","Runeterra",2011],["Olaf","Olaf","Top","Freljord",2010],["Orianna","Orianna","Mid","Piltover",2011],
  ["Ornn","Ornn","Top","Freljord",2017],["Pantheon","Pantheon","Top","Targon",2010],["Poppy","Poppy","Top","Demacia",2010],["Pyke","Pyke","Support","Bilgewater",2018],["Qiyana","Qiyana","Mid","Ixtal",2019],["Rakan","Rakan","Support","Ionia",2017],["Renekton","Renekton","Top","Shurima",2011],["Riven","Riven","Top","Noxus",2011],
  ["Ryze","Ryze","Mid","Runeterra",2009],["Samira","Samira","ADC","Noxus",2020],["Senna","Senna","Support","Îles obscures",2019],["Sett","Sett","Top","Ionia",2020],["Shen","Shen","Top","Ionia",2010],["Shyvana","Shyvana","Jungle","Demacia",2011],["Swain","Swain","Mid","Noxus",2010],["Syndra","Syndra","Mid","Ionia",2012],
  ["Teemo","Teemo","Top","Bandle",2009],["Thresh","Thresh","Support","Îles obscures",2013],["Twisted Fate","TwistedFate","Mid","Bilgewater",2009],["Vayne","Vayne","ADC","Demacia",2011],["Veigar","Veigar","Mid","Bandle",2009],["Vi","Vi","Jungle","Piltover",2012],["Viego","Viego","Jungle","Îles obscures",2021],["Viktor","Viktor","Mid","Zaun",2011],
  ["Warwick","Warwick","Jungle","Zaun",2009],["Xayah","Xayah","ADC","Ionia",2017],["Yasuo","Yasuo","Mid","Ionia",2013],["Yone","Yone","Mid","Ionia",2020],["Yuumi","Yuumi","Support","Bandle",2019],["Zed","Zed","Mid","Ionia",2012],["Zeri","Zeri","ADC","Zaun",2022],["Ziggs","Ziggs","Mid","Bandle",2012],["Zoe","Zoe","Mid","Targon",2017],
] as const;

const championNames = runeterraRecords.map(item => item[0]);
const championRoles = runeterraRecords.map(item => item[2]);
const championRegions = runeterraRecords.map(item => item[3]);

export const generatedRuneterra:GeneratedQuestion[] = runeterraRecords.flatMap((record,index) => {
  const [name,key,role,region,year] = record;
  const image = `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${key}_0.jpg`;
  return [
    { universe:"runeterra",type:"PORTRAIT",prompt:"Quel champion apparaît dans cette archive ?",options:choices(name,[...championNames],index),correct:0,fact:`${name} est un champion associé à ${region}.`,signal:"ID",difficulty:"easy" as const,image,imageMode:"cover" as const },
    { universe:"runeterra",type:"RÉGION",prompt:`À quelle région associe-t-on ${name} ?`,options:choices(region,[...championRegions],index+13),correct:0,fact:`${name} est associé à ${region}.`,signal:"MAP",difficulty:"normal" as const,image,imageMode:"zoom" as const },
    { universe:"runeterra",type:"PROFIL EXPERT",prompt:`Quel champion ${role}, sorti en ${year}, est associé à ${region} ?`,options:choices(name,[...championNames],index+29),correct:0,fact:`Le profil décrit ${name} : ${role}, ${region}, ${year}.`,signal:String(year),difficulty:"expert" as const,image,imageMode:"silhouette" as const },
    { universe:"runeterra",type:"RÔLE",prompt:`Quel rôle correspond principalement à ${name} ?`,options:choices(role,[...championRoles],index+5),correct:0,fact:`${name} est principalement classé ${role} dans cette archive.`,signal:"ROLE",difficulty:"expert" as const },
  ];
});
