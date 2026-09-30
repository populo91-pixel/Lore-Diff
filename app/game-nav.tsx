const games = [
  ["/rift-id.html", "LoLidle"], ["/wow.html", "WoWidle"], ["/pokemon.html", "Pokéidle"],
  ["/sound.html", "Intrus Check"], ["/screen.html", "Screen Check"], ["/daily.html", "Défi du jour"],
  ["/run.html", "Azeroth Run"], ["/play/pokemon", "Pokémon Run"], ["/play/runeterra", "Runeterra Run"],
  ["/play/dofus", "Krosmoz Run"], ["/multi?mode=mega", "Multijoueur"],
];
export function GameNav() {
  return <div className="game-switch"><a href="/home.html">LORE DIFF · TOUS LES JEUX</a><details><summary>Changer de jeu</summary><nav aria-label="Choisir un jeu">{games.map(([href,label]) => <a key={href} href={href}>{label}</a>)}</nav></details></div>;
}
