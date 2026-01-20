import { CACHE_KEYS } from "./constants";

export const capitalize = (text) => {
  if (typeof text !== "string") return text;
  const splitText = text.split("-");
  if (splitText.length <= 1) {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }
  return splitText
    .map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join("-");
};

export const formatPokemonId = (id) => {
  const padded = String(id).padStart(3, "0");
  return `#${padded}`;
};

export const matchData = (id, allDataArray) => {
  const match = allDataArray.find((p) => Number(p.id) === Number(id));
  return match;
};

export const parseGenderAndShiny = (spriteKey) => {
  const splitKey = spriteKey.split("_");
  let gender = "Male";
  let classification = "Normal";

  if (splitKey.includes("female")) {
    gender = "Female";
  }

  if (splitKey.includes("shiny")) {
    classification = "Shiny";
  }

  return [classification, gender];
};

export const buildSpriteGallery = (sprites) => {
  if (!sprites) {
    return {
      heroSprite: null,
      gallerySprites: [],
    };
  }

  const heroSprite = sprites.find(
    (sprite) => sprite.spriteName === "front_default",
  );

  const gallerySprites = sprites.filter(
    (sprite) => sprite.id !== heroSprite.id,
  );

  return { heroSprite, gallerySprites };
};

export const convertStat = (stat, reductionFactor) => {
  if (typeof stat !== "number") {
    return capitalize(stat);
  }
  const returnStat = stat * reductionFactor;
  return returnStat.toFixed(1);
};

export const rotateArrayLeft = (arr, shifts) => {
  const actualShifts = shifts % arr.length;

  if (actualShifts === 0 || arr.length === 0) {
    return [...arr];
  }

  const firstPart = arr.slice(actualShifts);
  const secondPart = arr.slice(0, actualShifts);

  return [...firstPart, ...secondPart];
};

export const formatNameOwnership = (name) => {
  const lastLetter = name.at(-1);
  if (lastLetter === "s") {
    return `${name}'`;
  } else return `${name}'s`;
};

export const playBattleCry = (currentAudio, audioArray, setterFunction) => {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
  }
  const randomIndex = Math.floor(Math.random() * audioArray.length);
  const newAudio = new Audio(audioArray[randomIndex]);
  setterFunction(newAudio);
  newAudio.play();
};

export const setItemToLocalStorage = (cacheKey, item) => {
  localStorage.setItem(cacheKey, JSON.stringify(item));
};

export const getItemFromLocalStorage = (cachekey) => {
  localStorage.getItem(cachekey);
};

export const formatKeyTitle = (key) => {
  if (!key) {
    return "";
  }
  const spacedString = key.replace(/(?<!^)([A-Z])/g, " $1");
  const titleCaseString = spacedString.replace(/^./, function (match) {
    return match.toUpperCase();
  });

  return titleCaseString;
};
export const parseUrlForId = (url) => {
  const splitUrl = url.split("/");
  return splitUrl.at(-2);
};

export const resolveCacheKey = (key) => {
  let cacheKey;
  switch (key) {
    case "pokemon-list":
      cacheKey = CACHE_KEYS.POKE_LIST;
      break;
    case "pokemon-index":
      cacheKey = CACHE_KEYS.POKEDEX_INDEX;
      break;
    case "type-list":
      cacheKey = CACHE_KEYS.TYPE_LIST;
      break;
    case "type-index":
      cacheKey = CACHE_KEYS.TYPE_INDEX;
      break;
    default:
      break;
  }
  return cacheKey;
};

export const normalizeMachineName = (machine) => {
  if (typeof machine !== "string") return machine;
  return machine.toUpperCase();
};

export const getEdgeLabel = (edge) => {
  const { method, trigger, item, minLevel, timeOfDay } = edge;

  if (method === "level-up" || trigger === "level-up") {
    if (minLevel) {
      return `Lv. ${minLevel}`;
    }
    return "Level up";
  }

  if (method === "stone" || trigger === "use-item") {
    if (item?.name) {
      // you can prettify this later
      return `Use ${item.name.replace("-", " ")}`;
    }
    return "Use evolution item";
  }

  if (method === "trade" || trigger === "trade") {
    return "Trade";
  }

  if (timeOfDay) {
    return `Level up (${timeOfDay})`;
  }

  return "Evolves";
};

export const findLongestArray = (...arrays) => {
  let longestArray = [];
  for (const arr of arrays) {
    if (arr.length > longestArray.length) {
      longestArray = arr;
    }
  }
  return longestArray;
};

export const buildLayout = (levels, sizes) => {
  const positions = {};
  const longestFamily = findLongestArray(...levels).length;

  //position the root pokemon in the top middle (x = total width / 2, y = 0)
  //position the next row 1x row gap below root (x = varies per pokemon, y = NODE_HEIGHT + ROW_GAP)

  levels.forEach((levelNodes, levelIndex) => {
    if (levelIndex === 0) {
      //root level pokemon
      levelNodes.forEach((node) => {
        const x =
          Math.floor(longestFamily / 2) * (sizes.NODE_WIDTH + sizes.LEVEL_GAP);
        const y = 0;
        positions[node.id] = { x, y };
      });
    } else {
      //level 2 - not root pokemon
      levelNodes.forEach((node, nodeIndex) => {
        const x = nodeIndex * (sizes.NODE_WIDTH + sizes.LEVEL_GAP);
        const y = levelIndex * (sizes.NODE_HEIGHT + sizes.ROW_GAP);
        positions[node.id] = { x, y };
      });
    }
  });

  return positions;
};

export const buildLevels = (evolutionChain) => {
  if (!evolutionChain || evolutionChain.path === "none")
    return { levels: [], edges: [], rootId: "" };
  const { nodes, edges, rootId } = evolutionChain;

  const idToNode = new Map(nodes.map((n) => [n.id, n]));
  const idToLevel = new Map();

  // default root level
  const rootExists = idToNode.has(rootId);
  const startingId = rootExists ? rootId : nodes[0].id;
  idToLevel.set(startingId, 0);

  const queue = [startingId];

  while (queue.length > 0) {
    const currentId = queue.shift();
    const currentLevel = idToLevel.get(currentId) ?? 0;

    edges
      .filter((edge) => edge.fromId === currentId)
      .forEach((edge) => {
        const childId = edge.toId;
        if (!idToLevel.has(childId)) {
          idToLevel.set(childId, currentLevel + 1);
          queue.push(childId);
        } else {
          // if child already has a level from another path, keep the smallest
          const existing = idToLevel.get(childId);
          if (existing > currentLevel + 1) {
            idToLevel.set(childId, currentLevel + 1);
          }
        }
      });
  }

  // group by level
  const levels = [];
  idToNode.forEach((node, id) => {
    const level = idToLevel.get(id) ?? 0;
    if (!levels[level]) levels[level] = [];
    levels[level].push(node);
  });

  return { levels, edges, rootId };
};

export const chooseEdge = (currentPokemon, pokemonData) => {
  const evolutionData = pokemonData.evolution;
  if (Number(currentPokemon.id) === Number(evolutionData.rootId)) {
    return {
      root: true,
      edge: {
        growthRate: capitalize(pokemonData.growthRate.name),
        trigger: "BASE",
        expRequired: "0",
        levelRequired: "1",
      },
    };
  }
  const edgeToUse = evolutionData.edges.find(
    (edge) => edge.toId === currentPokemon.id,
  );
  return {
    root: false,
    edge: {
      growthRate: pokemonData.growthRate.name,
      ...edgeToUse,
    },
  };
};

export const buildTeamTypes = (players) => {
  if (!players) {
    return [];
  }

  const allTypes = players.flatMap((pokemon) => {
    return pokemon.types;
  });

  const uniqueTypes = Array.from(new Set(allTypes));
  return uniqueTypes;
};
