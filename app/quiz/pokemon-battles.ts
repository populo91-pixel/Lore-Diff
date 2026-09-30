import type { GeneratedQuestion } from "./quiz-generated";

// Type-only matchups, using the current PokeAPI type_efficacy.csv chart.
// https://github.com/PokeAPI/pokeapi/blob/master/data/v2/csv/type_efficacy.csv
const encounters = [
  [1,25,"Pikachu","Électrik","Sol",2,"easy"], [1,9,"Tortank","Eau","Plante",2,"easy"],
  [1,6,"Dracaufeu","Feu / Vol","Roche",4,"normal"], [1,130,"Léviator","Eau / Vol","Électrik",4,"normal"],
  [1,94,"Ectoplasma","Spectre / Poison","Combat",0,"expert"], [1,82,"Magnéton","Électrik / Acier","Poison",0,"expert"],
  [2,154,"Méganium","Plante","Feu",2,"easy"], [2,157,"Typhlosion","Feu","Eau",2,"easy"],
  [2,212,"Cizayox","Insecte / Acier","Feu",4,"normal"], [2,214,"Scarhino","Insecte / Combat","Vol",4,"normal"],
  [2,197,"Noctali","Ténèbres","Psy",0,"expert"], [2,208,"Steelix","Acier / Sol","Poison",0,"expert"],
  [3,254,"Jungko","Plante","Glace",2,"easy"], [3,382,"Kyogre","Eau","Électrik",2,"easy"],
  [3,260,"Laggron","Eau / Sol","Plante",4,"normal"], [3,334,"Altaria","Dragon / Vol","Glace",4,"normal"],
  [3,302,"Ténéfix","Ténèbres / Spectre","Combat",0,"expert"], [3,303,"Mysdibule","Acier / Fée","Poison",0,"expert"],
  [4,405,"Luxray","Électrik","Sol",2,"easy"], [4,491,"Darkrai","Ténèbres","Combat",2,"easy"],
  [4,445,"Carchacrok","Dragon / Sol","Glace",4,"normal"], [4,460,"Blizzaroi","Plante / Glace","Feu",4,"normal"],
  [4,468,"Togekiss","Fée / Vol","Dragon",0,"expert"], [4,448,"Lucario","Combat / Acier","Poison",0,"expert"],
] as const;
export const pokemonBattles:GeneratedQuestion[] = encounters.map(([generation,id,name,types,attack,multiplier,difficulty])=>{
  const answers:[string,string,string,string]=multiplier===4
    ? ["Dégâts ×4","Dégâts ×2","Dégâts normaux","Aucun effet"]
    : ["Aucun effet","Dégâts réduits de moitié","Dégâts normaux","Dégâts ×2"];
  const answer=multiplier===4?0:multiplier===0?0:3;
  return {universe:"pokemon",generation,difficulty,type:multiplier===4?"DOUBLE FAIBLESSE":multiplier===0?"IMMUNITÉ":"COMBAT",
    prompt:`Une attaque ${attack} touche ${name} : quelle efficacité ? (Types actuels, sans talent ni objet.)`,
    options:answers,correct:answer,
    fact:`${name} est de type ${types}. Face au type ${attack}, le multiplicateur lié aux types est ×${multiplier}.`,
    signal:["KANTO","JOHTO","HOENN","SINNOH"][generation-1],
    image:`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`};
});
