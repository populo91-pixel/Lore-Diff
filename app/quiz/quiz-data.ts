import {varietyRunQuestions} from '../../lib/diff-content';
import { generatedDofus, generatedPokemon, generatedRuneterra } from "./quiz-generated";
import { expandedPokemon } from "./pokemon-expanded";
import { pokemonBattles } from "./pokemon-battles";
import { pokemonTrivia } from "./pokemon-trivia";

export type UniverseId = "pokemon" | "dofus" | "wow" | "runeterra";
export type Difficulty = "easy" | "normal" | "expert";

export type QuizQuestion = {
  universe: UniverseId;
  type: string;
  prompt: string;
  options: [string, string, string, string];
  correct: number;
  fact: string;
  signal: string;
  difficulty?: Difficulty;
  generation?: number;
  image?: string;
  imageMode?: "cover" | "silhouette" | "zoom";
};

export type UniverseConfig = {
  id: UniverseId;
  kicker: string;
  title: string;
  outline: string;
  description: string;
  route: string;
  accent: string;
  tests: string[];
  questions: QuizQuestion[];
};

const pokemon: QuizQuestion[] = [
  { universe:"pokemon", type:"PERSONNAGE", prompt:"Quel Pokémon porte le numéro 006 du Pokédex ?", options:["Dracaufeu","Tortank","Florizarre","Dracolosse"], correct:0, fact:"Dracaufeu est le n°006, ultime évolution de Salamèche.", signal:"#006" },
  { universe:"pokemon", type:"TYPE", prompt:"Quel est le double type d’Ectoplasma ?", options:["Spectre / Poison","Spectre / Psy","Ténèbres / Poison","Poison / Psy"], correct:0, fact:"Ectoplasma est de type Spectre et Poison.", signal:"SP/PO" },
  { universe:"pokemon", type:"ÉVOLUTION", prompt:"En quoi évolue Mimitoss ?", options:["Aéromite","Papilusion","Dardargnan","Parasect"], correct:0, fact:"Mimitoss évolue en Aéromite au niveau 31.", signal:"LV.31" },
  { universe:"pokemon", type:"CONNEXION", prompt:"Quel Pokémon évolue en Dodrio ?", options:["Doduo","Piafabec","Roucool","Canarticho"], correct:0, fact:"Doduo évolue en Dodrio au niveau 31.", signal:"→ 085" },
  { universe:"pokemon", type:"DOUBLE TYPE", prompt:"Quel est le type de Léviator en première génération ?", options:["Eau / Vol","Eau / Dragon","Eau / Ténèbres","Dragon / Vol"], correct:0, fact:"Malgré son apparence, Léviator est Eau / Vol.", signal:"EA/VOL" },
  { universe:"pokemon", type:"POKÉDEX", prompt:"Quel Pokémon occupe l’entrée n°150 ?", options:["Mewtwo","Mew","Dracolosse","Électhor"], correct:0, fact:"Mewtwo est le n°150 ; Mew est le n°151.", signal:"#150" },
  { universe:"pokemon", type:"ÉVOLUTION", prompt:"Quelle pierre fait évoluer Évoli en Aquali ?", options:["Pierre Eau","Pierre Lune","Pierre Glace","Pierre Aube"], correct:0, fact:"La Pierre Eau déclenche l’évolution d’Évoli en Aquali.", signal:"H₂O" },
  { universe:"pokemon", type:"FOSSILE", prompt:"Quel Pokémon renaît du Fossile Nautile ?", options:["Amonita","Kabuto","Ptéra","Kokiyas"], correct:0, fact:"Le Fossile Nautile permet de ranimer Amonita.", signal:"HELIX" },
  { universe:"pokemon", type:"LÉGENDAIRE", prompt:"Lequel des oiseaux légendaires est associé à la glace ?", options:["Artikodin","Électhor","Sulfura","Ho-Oh"], correct:0, fact:"Artikodin est l’oiseau légendaire de type Glace / Vol.", signal:"ICE" },
  { universe:"pokemon", type:"COULEUR", prompt:"Quel grand Pokémon rose porte un œuf dans sa poche ?", options:["Leveinard","Grodoudou","Mélodelfe","Excelangue"], correct:0, fact:"Leveinard transporte un œuf dans sa poche ventrale.", signal:"ŒUF" },
  { universe:"pokemon", type:"TYPE", prompt:"Quels sont les types d’Onix ?", options:["Roche / Sol","Roche / Acier","Sol / Acier","Roche / Dragon"], correct:0, fact:"Onix est Roche / Sol. Son évolution Steelix gagne le type Acier.", signal:"RO/SOL" },
  { universe:"pokemon", type:"FAMILLE", prompt:"Quel Pokémon précède Mackogneur dans sa famille ?", options:["Machopeur","Machoc","Tygnon","Kicklee"], correct:0, fact:"Machopeur évolue en Mackogneur lors d’un échange.", signal:"→ 068" },
  { universe:"pokemon", type:"INTRUS", prompt:"Lequel n’est pas un Pokémon de type Eau ?", options:["Magmar","Lokhlass","Staross","Poissoroy"], correct:0, fact:"Magmar est de type Feu.", signal:"1 ≠ 3" },
  { universe:"pokemon", type:"ORIGINE", prompt:"Quel est le premier Pokémon du Pokédex national ?", options:["Bulbizarre","Pikachu","Salamèche","Mew"], correct:0, fact:"Bulbizarre ouvre le Pokédex avec le numéro 001.", signal:"#001" },
  { universe:"pokemon", type:"ÉVOLUTION", prompt:"Quel Pokémon évolue en Noadkoko avec une Pierre Plante ?", options:["Noeunoeuf","Mystherbe","Chétiflor","Paras"], correct:0, fact:"Noeunoeuf évolue en Noadkoko grâce à une Pierre Plante.", signal:"LEAF" },
  { universe:"pokemon", type:"TYPE", prompt:"Quel Pokémon est de type Eau / Glace ?", options:["Lokhlass","Lamantine","Crustabri","Tous les trois"], correct:3, fact:"Lokhlass, Lamantine et Crustabri partagent le type Eau / Glace.", signal:"3/3" },
  { universe:"pokemon", type:"ARCHIVE", prompt:"Arbok est l’évolution de quel Pokémon ?", options:["Abo","Smogo","Soporifik","Nosferapti"], correct:0, fact:"Abo évolue en Arbok au niveau 22.", signal:"023→024" },
  { universe:"pokemon", type:"MATCH", prompt:"Quel duo correspond à deux évolutions finales de starters de Kanto ?", options:["Florizarre et Tortank","Roucoups et Spectrum","Draco et Rhinoféros","Raichu et Persian"], correct:0, fact:"Florizarre et Tortank terminent les familles de Bulbizarre et Carapuce.", signal:"START" },
  { universe:"pokemon", type:"CAPACITÉ", prompt:"Quel Pokémon est célèbre pour la capacité Morphing ?", options:["Métamorph","M. Mime","Porygon","Mewtwo"], correct:0, fact:"Métamorph copie l’apparence, les statistiques et les capacités de sa cible.", signal:"COPY" },
  { universe:"pokemon", type:"CHRONO", prompt:"Lequel appartient bien à la première génération ?", options:["Ronflex","Togepi","Marill","Noctali"], correct:0, fact:"Ronflex vient de Kanto ; les trois autres arrivent en deuxième génération.", signal:"GEN.1" },
];

const dofus: QuizQuestion[] = [
  { universe:"dofus", type:"LORE", prompt:"Que sont les six Dofus Primordiaux ?", options:["Des œufs de dragons","Des armes divines","Des portails","Des fragments de Wakfu"], correct:0, fact:"Les Dofus Primordiaux sont six œufs pondus par de puissants dragons.", signal:"6 ŒUFS" },
  { universe:"dofus", type:"VILLE", prompt:"Quelle cité blanche s’oppose à Brâkmar ?", options:["Bonta","Astrub","Amakna","Sufokia"], correct:0, fact:"Bonta et Brâkmar sont les deux grandes cités rivales.", signal:"BONT" },
  { universe:"dofus", type:"PERSONNAGE", prompt:"Quel alchimiste est lié à l’île qui porte son nom ?", options:["Otomaï","Joris","Kerubim","Allister"], correct:0, fact:"Otomaï est l’alchimiste emblématique de l’île d’Otomaï.", signal:"ALCH." },
  { universe:"dofus", type:"BOSS", prompt:"Quel boss règne sur la dimension Enutrosor ?", options:["Roi Nidas","Vortex","Reine des Voleurs","Chalœil"], correct:0, fact:"Le Roi Nidas est le maître du Palais du Roi Nidas en Enutrosor.", signal:"OR" },
  { universe:"dofus", type:"DIMENSION", prompt:"Dans quelle dimension affronte-t-on Vortex ?", options:["Xélorium","Srambad","Ecaflipus","Enutrosor"], correct:0, fact:"Vortex est le grand boss de Xélorium.", signal:"TIME" },
  { universe:"dofus", type:"CONNEXION", prompt:"Dark Vlad est lié à quel héros ?", options:["Goultard","Joris","Ruel","Tristepin"], correct:0, fact:"Dark Vlad est une facette sombre de Goultard.", signal:"DV/G" },
  { universe:"dofus", type:"FACTION", prompt:"Quelle cité est associée aux ailes rouges ?", options:["Brâkmar","Bonta","Astrub","Pandala"], correct:0, fact:"Brâkmar est traditionnellement représentée par l’alignement rouge.", signal:"RED" },
  { universe:"dofus", type:"BESTIAIRE", prompt:"Quel monstre laineux est devenu une mascotte du Monde des Douze ?", options:["Bouftou","Tofu","Piou","Prespic"], correct:0, fact:"Le Bouftou est l’une des créatures les plus iconiques de Dofus.", signal:"BAA" },
  { universe:"dofus", type:"CLASSE", prompt:"Quelle classe vénère le dieu du temps ?", options:["Xélor","Sram","Iop","Eniripsa"], correct:0, fact:"Les Xélors sont les disciples du dieu Xélor et manipulent le temps.", signal:"⌛" },
  { universe:"dofus", type:"ZONE", prompt:"Quel comte règne sur l’île glacée de Frigost ?", options:["Comte Harebourg","Roi Nidas","Wa Wabbit","Merkator"], correct:0, fact:"Le Comte Harebourg est au cœur du destin de Frigost.", signal:"-273°" },
  { universe:"dofus", type:"BOSS", prompt:"Quelle forgeronne redoutable vit à Frigost ?", options:["Missiz Frizz","Julith","Dathura","Pandore"], correct:0, fact:"Missiz Frizz dirige sa Forgefroide sur Frigost.", signal:"FORGE" },
  { universe:"dofus", type:"PERSONNAGE", prompt:"Quelle Huppermage de Brâkmar est l’antagoniste du film Dofus ?", options:["Julith","Bakara","Dathura","Noximilien"], correct:0, fact:"Julith est la grande antagoniste de Dofus, livre 1 : Julith.", signal:"JUL." },
  { universe:"dofus", type:"FAMILLE", prompt:"Quel Ecaflip a recueilli Joris ?", options:["Kerubim Crépin","Atcham","Ush Galesh","Chalœil"], correct:0, fact:"Kerubim Crépin est le père adoptif de Joris.", signal:"PAPYCHA" },
  { universe:"dofus", type:"DIEUX", prompt:"Combien de dieux donnent son nom au Monde des Douze ?", options:["Douze","Six","Dix-huit","Vingt-quatre"], correct:0, fact:"Le monde tire son nom des douze divinités majeures historiques.", signal:"XII" },
  { universe:"dofus", type:"INTRUS", prompt:"Lequel n’est pas une dimension divine ?", options:["Frigost","Enutrosor","Srambad","Xélorium"], correct:0, fact:"Frigost est une île ; les trois autres sont des dimensions divines.", signal:"1 ≠ 3" },
  { universe:"dofus", type:"GÉO", prompt:"Quelle cité sert de point de départ historique aux aventuriers ?", options:["Astrub","Brâkmar","Bonta","Sufokia"], correct:0, fact:"Astrub est la cité des mercenaires et le grand carrefour des débutants.", signal:"START" },
  { universe:"dofus", type:"PROTECTEUR", prompt:"Djaul est le protecteur de quel mois ?", options:["Décembre","Javian","Maisial","Fraouctor"], correct:0, fact:"Djaul est le protecteur de Descendre, l’équivalent de décembre.", signal:"12" },
  { universe:"dofus", type:"BOSS", prompt:"Qui règne sur Srambad ?", options:["La Reine des Voleurs","Le Roi Nidas","Vortex","Merkator"], correct:0, fact:"La Reine des Voleurs est le boss majeur de Srambad.", signal:"SRAM" },
  { universe:"dofus", type:"ZONE", prompt:"Quel boss mécanique est associé à l’Aquadôme de Sufokia ?", options:["Merkator","Kralamoure Géant","Nileza","Toxoliath"], correct:0, fact:"Merkator attend les aventuriers dans l’Aquadôme, près de Sufokia.", signal:"AQUA" },
  { universe:"dofus", type:"CHRONO", prompt:"Quel cataclysme est causé par les larmes d’Ogrest ?", options:["Le Chaos d’Ogrest","L’Aurore Pourpre","La Fronde","La Malédiction d’Ulgrude"], correct:0, fact:"Les larmes d’Ogrest provoquent un déluge appelé le Chaos d’Ogrest.", signal:"DÉLUGE" },
];

const wow: QuizQuestion[] = [
  { universe:"wow", type:"PERSONNAGE", prompt:"Qui devient le Roi-Liche après avoir pris Deuillegivre ?", options:["Arthas Menethil","Bolvar Fordragon","Tirion Fordring","Muradin Barbe-de-Bronze"], correct:0, fact:"Arthas fusionne avec l’esprit de Ner’zhul et devient le Roi-Liche.", signal:"LK" },
  { universe:"wow", type:"FACTION", prompt:"À quelle faction appartient Thrall ?", options:["La Horde","L’Alliance","Le Fléau","La Légion ardente"], correct:0, fact:"Thrall a libéré les orcs et dirigé la nouvelle Horde.", signal:"HORDE" },
  { universe:"wow", type:"CONNEXION", prompt:"Qui est le père de Thrall ?", options:["Durotan","Orgrim","Garrosh","Grommash"], correct:0, fact:"Thrall est le fils de Durotan et Draka.", signal:"FILS" },
  { universe:"wow", type:"EXTENSION", prompt:"Dans quelle extension affronte-t-on Illidan au Temple noir ?", options:["The Burning Crusade","Wrath of the Lich King","Cataclysm","Legion"], correct:0, fact:"Le Temple noir est l’un des raids majeurs de The Burning Crusade.", signal:"TBC" },
  { universe:"wow", type:"VILLE", prompt:"Quelle ville est la capitale des Réprouvés à l’époque classique ?", options:["Fossoyeuse","Lune-d’Argent","Orgrimmar","Stratholme"], correct:0, fact:"Fossoyeuse est bâtie sous les ruines de Lordaeron.", signal:"UC" },
  { universe:"wow", type:"LORE", prompt:"Quel Aspect draconique devient Aile de mort ?", options:["Neltharion","Malygos","Nozdormu","Kalecgos"], correct:0, fact:"Neltharion, Aspect de la Terre, est corrompu et devient Aile de mort.", signal:"EARTH" },
  { universe:"wow", type:"RAID", prompt:"Quel raid de Wrath abrite Yogg-Saron ?", options:["Ulduar","Naxxramas","Citadelle de la Couronne de glace","Caveau d’Archavon"], correct:0, fact:"Yogg-Saron est emprisonné sous Ulduar.", signal:"ULD" },
  { universe:"wow", type:"PERSONNAGE", prompt:"Qui remplace Ysera comme Aspect du Rêve ?", options:["Mérithra","Alexstrasza","Chromie","Tyrande"], correct:0, fact:"Mérithra, fille d’Ysera, prend la tête du Vol draconique vert.", signal:"GREEN" },
  { universe:"wow", type:"ERREUR LORE", prompt:"Quelle affirmation sur Thrall est fausse ?", options:["Il a été élevé par des humains","Il est le fils de Durotan","Son nom orc est Go’el","Il est né sur Draenor"], correct:3, fact:"Thrall est né en Azeroth, peu après l’arrivée de ses parents par la Porte des ténèbres.", signal:"ER-16" },
  { universe:"wow", type:"BESTIAIRE", prompt:"Quel ancien dieu manipule notamment le Cauchemar d’émeraude ?", options:["N’Zoth","C’Thun","Yogg-Saron","Y’Shaarj"], correct:0, fact:"N’Zoth est étroitement lié à la corruption du Rêve d’émeraude.", signal:"EYE" },
  { universe:"wow", type:"PERSONNAGE", prompt:"Quelle mage dirige Kul Tiras après les événements de Battle for Azeroth ?", options:["Jaina Portvaillant","Katherine Portvaillant","Valeera Sanguinar","Calia Menethil"], correct:0, fact:"Jaina devient Grand Amiral de Kul Tiras.", signal:"ADMIRAL" },
  { universe:"wow", type:"EXTENSION", prompt:"Quelle extension ouvre les terres du Norfendre ?", options:["Wrath of the Lich King","The Burning Crusade","Cataclysm","Mists of Pandaria"], correct:0, fact:"Wrath of the Lich King emmène les joueurs au Norfendre.", signal:"WOTLK" },
  { universe:"wow", type:"LOOT", prompt:"Quelle arme runique est liée à Arthas ?", options:["Deuillegivre","Porte-Cendres","Hurlesang","Marteau-du-Destin"], correct:0, fact:"Deuillegivre vole les âmes et scelle la chute d’Arthas.", signal:"FROST" },
  { universe:"wow", type:"RACE", prompt:"De quel peuple Sylvanas était-elle générale des forestiers ?", options:["Hauts-elfes","Elfes de la nuit","Humains","Sacrenuit"], correct:0, fact:"Sylvanas défendait Quel’Thalas avant d’être relevée par Arthas.", signal:"QUEL" },
  { universe:"wow", type:"DONJON", prompt:"Dans quel donjon classique trouve-t-on Edwin VanCleef ?", options:["Les Mortemines","Ombrecroc","Maraudon","Profondeurs de Rochenoire"], correct:0, fact:"Edwin VanCleef commande la Confrérie défias dans les Mortemines.", signal:"DM" },
  { universe:"wow", type:"FACTION", prompt:"Quel chef orc fonde le clan Loup-de-Givre ?", options:["Garad","Gul’dan","Main-Noire","Kargath"], correct:0, fact:"Garad est le père de Durotan et chef du clan Loup-de-Givre.", signal:"FROSTWOLF" },
  { universe:"wow", type:"ZONE", prompt:"Dans quelle zone se trouve la Porte des ténèbres en Azeroth ?", options:["Terres foudroyées","Marais des Chagrins","Défilé de Deuillevent","Steppes ardentes"], correct:0, fact:"La Porte des ténèbres domine les Terres foudroyées.", signal:"PORTAL" },
  { universe:"wow", type:"INTRUS", prompt:"Lequel n’est pas un membre des quatre Cavaliers de Naxxramas classique ?", options:["Kel’Thuzad","Thane Korth’azz","Dame Blaumeux","Sire Zeliek"], correct:0, fact:"Kel’Thuzad est le maître final de Naxxramas, pas un Cavalier.", signal:"1 ≠ 3" },
  { universe:"wow", type:"CHRONO", prompt:"Quelle extension arrive juste après The Burning Crusade ?", options:["Wrath of the Lich King","Cataclysm","Legion","Mists of Pandaria"], correct:0, fact:"Wrath of the Lich King est la deuxième extension de World of Warcraft.", signal:"02" },
  { universe:"wow", type:"QUI A DIT ÇA", prompt:"À qui associe-t-on la réplique « Vous n’êtes pas prêts ! » ?", options:["Illidan Hurlorage","Arthas Menethil","Kael’thas Haut-Soleil","Archimonde"], correct:0, fact:"Cette réplique est devenue la signature d’Illidan.", signal:"VOICE" },
];

const runeterra: QuizQuestion[] = [
  { universe:"runeterra", type:"PERSONNAGE", prompt:"Quelle Vastaya charme ses ennemis avant de leur voler leur essence ?", options:["Ahri","Xayah","Neeko","Nami"], correct:0, fact:"Ahri est une Vastaya ionienne capable de manipuler les émotions et l’essence vitale.", signal:"FOX", image:"https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Ahri_0.jpg", imageMode:"cover" },
  { universe:"runeterra", type:"SILHOUETTE", prompt:"Quel champion se cache derrière cette silhouette ?", options:["Thresh","Hecarim","Mordekaiser","Viego"], correct:0, fact:"La lanterne et la silhouette décharnée appartiennent à Thresh, le Garde aux chaînes.", signal:"CHAIN", image:"https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Thresh_0.jpg", imageMode:"silhouette" },
  { universe:"runeterra", type:"COMPÉTENCE", prompt:"À quel champion appartient « Super méga roquette de la mort ! » ?", options:["Jinx","Ziggs","Caitlyn","Ezreal"], correct:0, fact:"C’est l’ultime global de Jinx.", signal:"R", image:"https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Jinx_0.jpg", imageMode:"cover" },
  { universe:"runeterra", type:"RÉGION", prompt:"Quelle région est la patrie de Garen et Lux ?", options:["Demacia","Noxus","Piltover","Ionia"], correct:0, fact:"Garen et Lux appartiennent à la famille Crownguard de Demacia.", signal:"CREST" },
  { universe:"runeterra", type:"CONNEXION", prompt:"Quel lien unit Yasuo et Yone ?", options:["Ils sont frères","Ils sont rivaux sans lien","Ils sont père et fils","Ils sont maîtres et élèves"], correct:0, fact:"Yone est le demi-frère aîné de Yasuo.", signal:"BLOOD", image:"https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Yone_0.jpg", imageMode:"cover" },
  { universe:"runeterra", type:"RÔLE", prompt:"Quel poste est historiquement associé à Jinx ?", options:["Carry AD","Jungle","Top","Support"], correct:0, fact:"Jinx est un tireur joué principalement sur la voie du bas.", signal:"ADC" },
  { universe:"runeterra", type:"SPLASH ZOOM", prompt:"Quel champion est représenté sur ce fragment de splash art ?", options:["Kai’Sa","Kassadin","Bel’Veth","Rek’Sai"], correct:0, fact:"Il s’agit de Kai’Sa, la Fille du Néant.", signal:"VOID", image:"https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Kaisa_0.jpg", imageMode:"zoom" },
  { universe:"runeterra", type:"FACTION", prompt:"Qui commande la Légion Trifarienne de Noxus ?", options:["Darius","Draven","Swain","Katarina"], correct:0, fact:"Darius est le commandant de la Légion Trifarienne et l’un des dirigeants du Trifarix.", signal:"NOXUS" },
  { universe:"runeterra", type:"OBJET", prompt:"À quel roi déchu l’objet « Lame du roi déchu » fait-il référence ?", options:["Viego","Jarvan III","Azir","Mordekaiser"], correct:0, fact:"La lame est celle de Viego, souverain de Camavor devenu le Roi déchu.", signal:"BORK", image:"https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Viego_0.jpg", imageMode:"cover" },
  { universe:"runeterra", type:"INTRUS", prompt:"Lequel de ces champions n’est pas un Yordle ?", options:["Sett","Poppy","Veigar","Teemo"], correct:0, fact:"Sett est un hybride humain-vastaya ; les trois autres sont des Yordles.", signal:"1 ≠ 3" },
  { universe:"runeterra", type:"LORE", prompt:"Qui provoque la Ruine en tentant de ramener Isolde ?", options:["Viego","Thresh","Karthus","Hecarim"], correct:0, fact:"Le rituel désespéré de Viego déclenche la Ruine et la Brume noire.", signal:"RUIN" },
  { universe:"runeterra", type:"COMPÉTENCE", prompt:"Quel champion érige le Mur de vent ?", options:["Yasuo","Braum","Samira","Janna"], correct:0, fact:"Le Z de Yasuo, Mur de vent, bloque de nombreux projectiles.", signal:"W", image:"https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Yasuo_0.jpg", imageMode:"cover" },
  { universe:"runeterra", type:"DUO", prompt:"Quel duo de Vastayas forme un couple et partage une histoire commune ?", options:["Xayah et Rakan","Ahri et Wukong","Neeko et Nidalee","Nami et Fizz"], correct:0, fact:"Xayah et Rakan sont les Rebelles amoureux d’Ionia.", signal:"X/R" },
  { universe:"runeterra", type:"CHRONO", prompt:"Lequel de ces champions est sorti en premier ?", options:["Ashe","Yasuo","Jinx","Ekko"], correct:0, fact:"Ashe fait partie des champions présents dès 2009.", signal:"2009" },
  { universe:"runeterra", type:"RÉGION", prompt:"Dans quelle région technologique vivent notamment Caitlyn et Jayce ?", options:["Piltover","Shurima","Targon","Freljord"], correct:0, fact:"Piltover est la Cité du progrès, bâtie au-dessus de Zaun.", signal:"HEX" },
  { universe:"runeterra", type:"BESTIAIRE", prompt:"Quel champion est un demi-dieu forgeron du Freljord ?", options:["Ornn","Volibear","Anivia","Braum"], correct:0, fact:"Ornn est le demi-dieu du feu, de la forge et de l’artisanat.", signal:"FORGE", image:"https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Ornn_0.jpg", imageMode:"silhouette" },
  { universe:"runeterra", type:"UNIVERS SKIN", prompt:"Lequel de ces champions est membre du groupe virtuel K/DA ?", options:["Akali","Riven","Katarina","Diana"], correct:0, fact:"Akali forme K/DA avec Ahri, Evelynn et Kai’Sa.", signal:"K/DA" },
  { universe:"runeterra", type:"COMPÉTENCE", prompt:"À qui appartient l’ultime « Sentence capitale » ?", options:["Thresh","Pyke","Nautilus","Leona"], correct:0, fact:"Sentence capitale crée la prison spectrale de Thresh.", signal:"BOX" },
  { universe:"runeterra", type:"LORE", prompt:"Quel empereur ressuscité cherche à restaurer Shurima ?", options:["Azir","Nasus","Xerath","Renekton"], correct:0, fact:"Azir renaît et relève le Disque solaire de Shurima.", signal:"SUN", image:"https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Azir_0.jpg", imageMode:"cover" },
  { universe:"runeterra", type:"FINAL BLITZ", prompt:"Qui est connue comme la Sorcière de glace et dirige la Garde de givre ?", options:["Lissandra","Sejuani","Ashe","LeBlanc"], correct:0, fact:"Lissandra règne sur la Garde de givre et dissimule le retour des Veilleurs.", signal:"ICE" },
];

// Numerical Pokédex trivia is deliberately excluded from every shared game mode.
const pokemonBank:QuizQuestion[] = [
  ...pokemon.filter(q=>!/(numéro|entrée n°|premier Pokémon du Pokédex)/i.test(q.prompt)).map(q=>({...q,generation:1})),
  ...generatedPokemon,...expandedPokemon,...pokemonTrivia,...pokemonBattles,
  ...pokemonTrivia.filter(q=>q.difficulty==="normal"&&["STARTER","RÉGION","CHAMPION","OBJET","FACTION","LÉGENDAIRE"].includes(q.type)).map(q=>({...q,difficulty:"easy" as const})),
];
const dofusBank:QuizQuestion[] = [...dofus,...generatedDofus];
const runeterraBank:QuizQuestion[] = [...runeterra,...generatedRuneterra];

export const universeConfigs: Record<"pokemon" | "dofus" | "runeterra", UniverseConfig> = {
  pokemon: {
    id:"pokemon", kicker:"UNIVERS 02 // GÉNÉRATIONS I–IV", title:"POKÉMON", outline:"RUN",
    description:"De Kanto à Sinnoh : silhouettes, types actuels, évolutions, talents, légendaires et régions. Quatre générations, aucune question de numéro du Pokédex.",
    route:"/play/pokemon", accent:"cyan", tests:["SILHOUETTE","TYPE","ÉVOLUTION","TALENT","LÉGENDAIRE"], questions:[...pokemonBank,...varietyRunQuestions.filter(q=>q.universe==="pokemon")],
  },
  dofus: {
    id:"dofus", kicker:"UNIVERS 03 // DOFUS", title:"KROSMOZ", outline:"RUN",
    description:"Boss, zones, personnages et chronologie du Monde des Douze. ",
    route:"/play/dofus", accent:"orange", tests:["PERSONNAGE","BOSS","ZONE","LORE","CHRONO"], questions:[...dofusBank,...varietyRunQuestions.filter(q=>q.universe==="dofus")],
  },
  runeterra: {
    id:"runeterra", kicker:"UNIVERS 04 // LEAGUE OF LEGENDS", title:"RUNETERRA", outline:"RUN",
    description:"Champions, régions, sorts, connexions et lore de Runeterra. Vingt épreuves alimentées par les visuels officiels Riot.",
    route:"/play/runeterra", accent:"gold", tests:["PERSONNAGE","COMPÉTENCE","RÉGION","LORE","CHRONO"], questions:[...runeterraBank,...varietyRunQuestions.filter(q=>q.universe==="runeterra")],
  },
};

export const allQuestions = Array.from({ length: Math.max(wow.length, pokemonBank.length, dofusBank.length, runeterraBank.length) }, (_, index) =>
  [wow[index], pokemonBank[index], dofusBank[index], runeterraBank[index]].filter((question): question is QuizQuestion => Boolean(question)),
).flat().concat(varietyRunQuestions);

export function rotateQuestions<T>(items: T[], seed: number, count: number): T[] {
  if (!items.length) return [];
  const offset = Math.abs(seed) % items.length;
  return [...items.slice(offset), ...items.slice(0, offset)].slice(0, count);
}

function seeded(seed:number) {
  let value = seed >>> 0;
  return () => {
    value += 0x6d2b79f5;
    let next = value;
    next = Math.imul(next ^ (next >>> 15),next | 1);
    next ^= next + Math.imul(next ^ (next >>> 7),next | 61);
    return ((next ^ (next >>> 14)) >>> 0) / 4294967296;
  };
}

export function questionIdentity(question:QuizQuestion):string {
  let hash=2166136261;
  for(const char of `${question.universe}|${question.prompt}|${question.image||""}`)hash=Math.imul(hash^char.charCodeAt(0),16777619);
  return (hash>>>0).toString(36);
}
export function prepareQuestions(items:QuizQuestion[],seed:number,count:number,exclude:string[]=[]):QuizQuestion[] {
  const random = seeded(seed);
  const unique=[...new Map(items.map(q=>[questionIdentity(q),q])).values()];
  const fresh=unique.filter(q=>!exclude.includes(questionIdentity(q)));
  const questionPool = fresh.length>=count ? fresh : unique;
  for (let index = questionPool.length - 1; index > 0; index -= 1) {
    const swap = Math.floor(random() * (index + 1));
    [questionPool[index],questionPool[swap]] = [questionPool[swap],questionPool[index]];
  }
  // A Pokémon-only run rotates between generations to prevent a Kanto-heavy draw.
  const selection:QuizQuestion[]=[];
  if (questionPool.length && questionPool.every(q=>q.universe==="pokemon")) {
    const groups=[1,2,3,4].map(g=>questionPool.filter(q=>q.generation===g));
    const typeCounts=new Map<string,number>();
    const subjects=new Set<string>();
    const start=Math.abs(seed)%4;
    while(selection.length<Math.min(count,questionPool.length)) {
      let added=false;
      for(let i=0;i<4 && selection.length<count;i++) {
        const group=groups[(start+i)%4];
        if(!group.length)continue;
        const cost=(q:QuizQuestion)=>(typeCounts.get(q.type)||0)*10+(selection.at(-1)?.type===q.type?5:0)+(q.image&&subjects.has(q.image)?100:0);
        let best=0;
        for(let j=1;j<group.length;j++)if(cost(group[j])<cost(group[best]))best=j;
        const [q]=group.splice(best,1);selection.push(q);added=true;
        typeCounts.set(q.type,(typeCounts.get(q.type)||0)+1);
        if(q.image)subjects.add(q.image);
      }
      if(!added)break;
    }
  } else {
    const counts=new Map<string,number>();
    while(questionPool.length&&selection.length<count){
      const cost=(q:QuizQuestion)=>(counts.get(q.type)||0)*10+(selection.at(-1)?.type===q.type?100:0);
      let best=0;for(let i=1;i<questionPool.length;i++)if(cost(questionPool[i])<cost(questionPool[best]))best=i;
      const [q]=questionPool.splice(best,1);selection.push(q);counts.set(q.type,(counts.get(q.type)||0)+1);
    }
  }
  return selection.map(question => {
    const correctAnswer = question.options[question.correct];
    const options = [...question.options];
    for (let index = options.length - 1; index > 0; index -= 1) {
      const swap = Math.floor(random() * (index + 1));
      [options[index],options[swap]] = [options[swap],options[index]];
    }
    return { ...question,options:options as QuizQuestion["options"],correct:options.indexOf(correctAnswer) };
  });
}

export const tournamentRounds = ["FLASH MIX", "PORTRAITS", "MONDES", "CONNEXIONS", "FINAL BLITZ"];
