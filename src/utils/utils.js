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
    return stat;
  }
  return stat * reductionFactor;
};

export const rotateArrayLeft = (arr, shifts) => {
  // Ensure shifts is within the bounds of the array length
  const actualShifts = shifts % arr.length;

  // If shifts is 0 or the array is empty, return a copy of the original array
  if (actualShifts === 0 || arr.length === 0) {
    return [...arr];
  }

  // Slice the array into two parts:
  // 1. Elements from the shift point to the end
  // 2. Elements from the beginning to the shift point
  const firstPart = arr.slice(actualShifts);
  const secondPart = arr.slice(0, actualShifts);

  // Combine the two parts to form the rotated array
  return [...firstPart, ...secondPart];
};

export const formatNameOwnership = (name) => {
  const lastLetter = name.at(-1);
  if (lastLetter === "s") {
    return `${name}'`;
  } else return `${name}'s`;
};
