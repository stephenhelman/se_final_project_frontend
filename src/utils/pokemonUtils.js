import { formatPokemonId, capitalize } from "./utils";

const buildTypesArray = (typesData) => {
  const typesArray = [];
  typesData.forEach((type) => {
    typesArray[type.slot - 1] = type.type.name;
  });
  return typesArray;
};

const buildStatsObject = (statsData) => {
  const statsObject = [];
  statsData.forEach((stat) => {
    statsObject[stat.stat.name] = stat.base_stat;
  });
  return statsObject;
};

const buildAttributesObject = (data) => {
  return {
    height: data.height,
    weight: data.weight,
    color: "",
    habitat: "",
  };
};

const pickSprites = (spritesObject) => {
  return Object.entries(spritesObject).slice(0, 7);
};

const buildSPritesObject = (spriteEntry, index) => {
  if (spriteEntry[1] === null) {
    return {
      id: null,
    };
  }
  return {
    id: index,
    spriteName: spriteEntry[0],
    url: spriteEntry[1],
  };
};

const buildSpritesArray = (spritesData) => {
  const sprites = pickSprites(spritesData);
  const spritesArray = [];
  sprites.forEach((sprite, index) => {
    const spriteObject = buildSPritesObject(sprite, index);
    spritesArray.push(spriteObject);
  });
  return spritesArray.filter((sprite) => sprite.id !== null);
};

export const buildInitialPokemon = (data) => {
  const formattedId = formatPokemonId(data.id);
  const sprites = buildSpritesArray(data.sprites);
  const pokemonData = {
    id: data.id,
    formattedId,
    name: capitalize(data.name),
    types: buildTypesArray(data.types),
    sprites,
    stats: buildStatsObject(data.stats),
    attributes: buildAttributesObject(data),
    cries: Object.values(data.cries),
    speciesUrl: data.species.url,
  };
  return pokemonData;
};
