export const capitalize = (text) => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};

export const formatPokemonId = (id) => {
  const padded = String(id).padStart(3, "0");
  return `#${padded}`;
};

export const matchPokemon = (pokemon, allPokemon) => {
  const match = allPokemon.find((p) => p.id === pokemon.id);
  return match;
};
