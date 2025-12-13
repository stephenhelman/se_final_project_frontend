import { formatPokemonId, capitalize } from "./utils";

const buildTypesArray = (typesData) => {
  const typesArray = [];
  typesData.forEach((type) => {
    typesArray[type.slot - 1] = type.type.name;
  });
  return typesArray;
};

export const buildTypeMatchupModel = (typeResponse) => {
  const relations = typeResponse.damage_relations;

  const object = {
    id: typeResponse.id,
    typeName: typeResponse.name,

    attack: {
      strongAgainst: relations.double_damage_to.map((type) => type.name),
      weakAgainst: relations.half_damage_to.map((type) => type.name),
      noDamageTo: relations.no_damage_to.map((type) => type.name),
    },

    defense: {
      weakTo: relations.double_damage_from.map((type) => type.name),
      resists: relations.half_damage_from.map((type) => type.name),
      immuneTo: relations.no_damage_from.map((type) => type.name),
    },
  };

  console.log(object);

  return object;
};

const buildStatsObject = (statsData) => {
  const statsObject = {};
  statsData.forEach((stat) => {
    statsObject[stat.stat.name] = stat.base_stat;
  });
  return statsObject;
};

const buildAttributesObjectOne = (data) => {
  return {
    height: data?.height,
    weight: data?.weight,
  };
};

const buildAttributesObjectTwo = (data, attributesObject) => {
  return {
    ...attributesObject,
    color: data?.color?.name,
    habitat: data?.habitat?.name,
  };
};

const normalizeFlavorText = (text) => {
  return text
    .replace(/[\n\f]/g, " ")
    .replace(/[\s+]/g, " ")
    .trim();
};

const filterFlavorText = (flavorTextArray) => {
  return [
    ...new Set(
      flavorTextArray
        .filter((text) => {
          return text.language.name === "en";
        })
        .map((text) => normalizeFlavorText(text.flavor_text))
    ),
  ];
};

const buildMoveObject = (move) => {
  return {
    name: move.move.name,
    method: move.version_group_details[0].move_learn_method.name,
    level: move.version_group_details[0].level_learned_at,
    url: move.move.url,
  };
};

const filterMoves = (movesList) => {
  const filterGroup = ["red-blue", "yellow"];
  return movesList
    .filter((move) => {
      return move.version_group_details.some((version) => {
        return filterGroup.includes(version.version_group.name);
      });
    })
    .map((move) => buildMoveObject(move));
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

const getPokemonData = (pokemonObject, api) => {
  return api
    .getOnePokemon(pokemonObject.id)
    .then((results) => {
      pokemonObject.sprites = buildSpritesArray(results.sprites);
      pokemonObject.cries = results.cries;
      pokemonObject.stats = buildStatsObject(results.stats);
      pokemonObject.moves = filterMoves(results.moves);
      pokemonObject.attributes = buildAttributesObjectOne(results);
      return pokemonObject;
    })
    .catch((err) => console.log("Error retrieving pokemon data", err));
};

const getSpeciesData = (pokemonObject, api) => {
  return api
    .getPokemonSpeciesInfo(pokemonObject.id)
    .then((results) => {
      pokemonObject.flavorText = filterFlavorText(results.flavor_text_entries);
      pokemonObject.attributes = buildAttributesObjectTwo(
        results,
        pokemonObject.attributes
      );
      (pokemonObject.evoChainUrl = results.evolution_chain),
        (pokemonObject.growthRate = results.growth_rate.name);
      return pokemonObject;
    })
    .catch((err) => console.log("Error retreiving pokemon species data", err));
};

export const buildDetailPokemon = (data, api) => {
  const pokemonObject = { ...data };
  return Promise.all([
    getPokemonData(pokemonObject, api),
    getSpeciesData(pokemonObject, api),
  ]).then(() => {
    return pokemonObject;
  });
};

export const buildLightweightPokemon = (pokemonData) => {
  return {
    id: pokemonData?.id,
    formattedId: formatPokemonId(pokemonData?.id),
    name: capitalize(pokemonData?.name),
    sprite: pokemonData?.sprites?.front_default,
    types: buildTypesArray(pokemonData?.types),
  };
};
