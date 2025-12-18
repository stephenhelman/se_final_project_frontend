import { formatPokemonId, capitalize, matchData } from "./utils";

const buildTypesArray = (typesData) => {
  const typesArray = [];
  typesData.forEach((type) => {
    typesArray[type.slot - 1] = type.type.name;
  });
  return typesArray;
};

export const hydratePokemonData = (pokemonIdArray, indexedInformation) => {
  return pokemonIdArray.map((id) => {
    const match = matchData(id, indexedInformation);
    return {
      id: id,
      name: match.name,
      sprite: match.sprite,
      types: match.types,
    };
  });
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

const filterFlavorText = (flavorTextArray, type) => {
  return [
    ...new Set(
      flavorTextArray
        .filter((text) => {
          return text.language.name === "en";
        })
        .map((text) => normalizeFlavorText(text[type]))
    ),
  ];
};

const buildPreMoveObject = (move) => {
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
    .map((move) => buildPreMoveObject(move));
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

// Helpers to extract ids from PokéAPI URLs
const getIdFromUrl = (url = "") => {
  const match = url.match(/\/(\d+)\/$/);
  return match ? Number(match[1]) : null;
};

const toEdge = (fromSpecies, toSpecies, evoDetail) => {
  const fromId = getIdFromUrl(fromSpecies.url);
  const toId = getIdFromUrl(toSpecies.url);

  const trigger = evoDetail?.trigger?.name || null;
  const item = evoDetail?.item
    ? { name: evoDetail.item.name, id: getIdFromUrl(evoDetail.item.url) }
    : null;

  const location = evoDetail?.location
    ? {
        name: evoDetail.location.name,
        id: getIdFromUrl(evoDetail.location.url),
      }
    : null;

  const knownMove = evoDetail?.known_move
    ? {
        name: evoDetail.known_move.name,
        id: getIdFromUrl(evoDetail.known_move.url),
      }
    : null;

  const knownMoveType = evoDetail?.known_move_type
    ? {
        name: evoDetail.known_move_type.name,
        id: getIdFromUrl(evoDetail.known_move_type.url),
      }
    : null;

  // Optional “method” label for UI grouping
  let method = "other";
  if (trigger === "use-item" && item) method = "stone";
  if (trigger === "level-up") method = "level-up";
  if (trigger === "trade") method = "trade";

  return {
    fromId,
    toId,
    trigger,
    method,
    item,
    timeOfDay: evoDetail?.time_of_day ?? "",
    minLevel: evoDetail?.min_level ?? null,
    minHappiness: evoDetail?.min_happiness ?? null,
    location,
    knownMove,
    knownMoveType,
    notes: "",
  };
};

const parseEvolutionChain = (evoChainJson) => {
  const nodesMap = new Map();
  const edges = [];

  const visit = (chainNode) => {
    const species = chainNode.species;
    const id = getIdFromUrl(species.url);
    nodesMap.set(id, { id, name: species.name });

    const genOneFilter = chainNode.evolves_to.filter((child) => {
      const id = getIdFromUrl(child.species.url);
      return Number(id) <= 151;
    });

    genOneFilter.forEach((child) => {
      const childSpecies = child.species;
      const childId = getIdFromUrl(childSpecies.url);
      nodesMap.set(childId, { id: childId, name: childSpecies.name });

      (child.evolution_details || []).forEach((detail) => {
        edges.push(toEdge(species, childSpecies, detail));
      });

      // Recurse
      visit(child);
    });
  };

  const root = evoChainJson.chain?.species;
  if (!root) {
    return { path: "none", rootId: null, rootName: "", nodes: [], edges: [] };
  }

  visit(evoChainJson.chain);

  // Determine path type
  const rootId = getIdFromUrl(root.url);
  const outFromRoot = edges.filter((e) => e.fromId === rootId);
  let path = "none";
  if (edges.length === 0) path = "none";
  else if (outFromRoot.length <= 1) path = "linear";
  else path = "branching";

  return {
    path,
    rootId,
    rootName: root.name,
    nodes: Array.from(nodesMap.values()).sort((a, b) => a.id - b.id),
    edges,
  };
};

export const updateEvolutionNodes = (evolutionData, allPokemon) => {
  const evolutionNodes = evolutionData.nodes;
  return evolutionNodes.map((node) => {
    return matchData(node.id, allPokemon);
  });
};

const getMachineName = (url, api) => {
  return api
    .getOneMachine(url)
    .then((machineJson) => {
      return machineJson.item.name;
    })
    .catch((err) => console.log("Error retrieving machine info", err));
};

const updateMoveObject = (moveObject, api) => {
  if (moveObject.method === "level-up") {
    return api
      .getOneMove(moveObject.url)
      .then((moveJson) => {
        return {
          ...moveObject,
          type: moveJson.type.name,
          category: moveJson.damage_class.name,
          accuracy: moveJson.accuracy,
          power: moveJson.power,
          pp: moveJson.pp,
          info: filterFlavorText(moveJson.effect_entries, "short_effect")[0]
            .short_effect,
        };
      })
      .catch((err) =>
        console.log("Error getting single move information", err)
      );
  }
  if (moveObject.method === "machine") {
    return api
      .getOneMove(moveObject.url)
      .then((moveJson) => {
        const filterGroup = ["red-blue", "yellow"];
        const machineUrl = moveJson.machines.filter((move) => {
          return filterGroup.includes(move.version_group.name);
        })[0].machine.url;
        return {
          ...moveObject,
          level: machineUrl,
          type: moveJson.type.name,
          category: moveJson.damage_class.name,
          accuracy: moveJson.accuracy,
          power: moveJson.power,
          pp: moveJson.pp,
          info: filterFlavorText(moveJson.effect_entries, "short_effect")[0]
            .short_effect,
        };
      })
      .then((moveObject) => {
        return getMachineName(moveObject.level, api)
          .then((machineName) => {
            moveObject.level = machineName;
            return moveObject;
          })
          .catch((err) =>
            console.log("Error retrieving machine move info", err)
          );
      })
      .then((finalMoveObject) => finalMoveObject)
      .catch((err) =>
        console.log("Error getting single move information", err)
      );
  }
};

const updateAllMoves = (pokemonObject, api) => {
  const promises = pokemonObject.moves.map((move) => {
    return updateMoveObject(move, api);
  });

  return Promise.all(promises)
    .then((moves) => {
      return {
        ...pokemonObject,
        moves: moves,
      };
    })
    .catch((err) =>
      console.log("Unable to retrieve all move information", err)
    );
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
      pokemonObject.flavorText = filterFlavorText(
        results.flavor_text_entries,
        "flavor_text"
      );
      pokemonObject.attributes = buildAttributesObjectTwo(
        results,
        pokemonObject.attributes
      );
      (pokemonObject.evoChainUrl = results.evolution_chain.url),
        (pokemonObject.growthRate = results.growth_rate);
      return pokemonObject;
    })
    .catch((err) => console.log("Error retreiving pokemon species data", err));
};

const getEvolutionData = (pokemonObject, api) => {
  const evoChainUrl = pokemonObject.evoChainUrl;
  return api
    .getPokemonEvolutionInfo(evoChainUrl)
    .then((evoJsonData) => {
      pokemonObject.evolution = parseEvolutionChain(evoJsonData);
      return pokemonObject;
    })
    .catch((err) => console.log("Error gettin evolution data", err));
};

const getGrowthRateData = (pokemonObject, api) => {
  return api
    .getGrowthRateInfo(pokemonObject.growthRate.url)
    .then((growthRateData) => {
      pokemonObject.growthRate.levels = growthRateData.levels;
      return pokemonObject;
    })
    .catch((err) => console.log("Error retrieving growth rate info", err));
};

export const buildDetailPokemon = (pokemonData, api) => {
  const pokemonObject = { ...pokemonData };
  return getPokemonData(pokemonObject, api)
    .then((pokemonObject) => {
      return getSpeciesData(pokemonObject, api);
    })
    .then((pokemonObject) => {
      return getEvolutionData(pokemonObject, api);
    })
    .then((pokemonObject) => {
      return getGrowthRateData(pokemonObject, api);
    })
    .then((pokemonObject) => {
      return updateAllMoves(pokemonObject, api);
    })
    .then((finalObject) => {
      return finalObject;
    })
    .catch((err) => console.log("Error building pokemon object", err));
};

export const buildLightweightPokemon = (pokemonData) => {
  return {
    id: pokemonData?.id,
    formattedId: formatPokemonId(pokemonData?.id),
    name: capitalize(pokemonData?.name),
    sprite: pokemonData?.sprites?.front_default,
    types: buildTypesArray(pokemonData?.types),
    isFavorite: false,
  };
};
