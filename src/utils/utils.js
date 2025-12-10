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
