import { CACHE_KEYS } from "./constants";

export const capitalize = (text) => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};

export const formatPokemonId = (id) => {
  const padded = String(id).padStart(3, "0");
  return `#${padded}`;
};

export const matchData = (id, allDataArray) => {
  const match = allDataArray.find((p) => p.id === id);
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
    (sprite) => sprite.spriteName === "front_default"
  );

  const gallerySprites = sprites.filter(
    (sprite) => sprite.id !== heroSprite.id
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
