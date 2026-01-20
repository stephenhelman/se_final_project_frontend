export const POKE_BASE_URL = "https://pokeapi.co/api/v2/";

export const pokemonGroupTypes = [
  {
    id: "physical",
    label: "Physical",
    types: ["normal", "fighting", "flying"],
  },
  {
    id: "elemental",
    label: "Elemental",
    types: ["fire", "water", "grass", "electric", "ice", "bug"],
  },
  {
    id: "earthMetal",
    label: "Earth / Metal",
    types: ["ground", "rock", "steel"],
  },
  {
    id: "special",
    label: "Special",
    types: ["psychic", "ghost", "dark", "dragon", "fairy", "poison"],
  },
];

export const statusFilterOptions = [
  {
    id: "all",
    label: "All",
    value: "all",
  },
  {
    id: "seen",
    label: "Seen",
    value: "seen",
  },
  {
    id: "caught",
    label: "Caught",
    value: "caught",
  },
];

export const CACHE_KEYS = {
  POKE_LIST: "poke:list:kanto151",
  POKEDEX_INDEX: "poke:index:kanto151",
  TYPE_LIST: "type:list",
  TYPE_INDEX: "type:index",
};

export const mockTeams = [
  {
    id: "1",
    name: "Kanto Starters Core",
    description:
      "Solid early-game squad built around starter lines and utility.",
    lastUpdated: "2025-12-13T10:12:00Z",
    isFavorite: true,
    players: [1, 4, 7, 25, 39, 52],
  },
  {
    id: "2",
    name: "Gym Runner",
    description: "Fast coverage picks for sweeping early gyms.",
    lastUpdated: "2025-12-10T18:30:00Z",
    isFavorite: false,
    players: [16, 18, 27, 58, 63, 74],
  },
  {
    id: "3",
    name: "Rock & Ground Breakers",
    description: "Built to handle Electric, Fire, and normal threats.",
    lastUpdated: "2025-12-09T21:05:00Z",
    isFavorite: false,
    players: [50, 51, 66, 95, 111, 112],
  },
  {
    id: "4",
    name: "Water Control",
    description: "Water-heavy team with status and bulk.",
    lastUpdated: "2025-12-08T14:44:00Z",
    isFavorite: true,
    players: [54, 55, 60, 61, 72, 73],
  },
  {
    id: "5",
    name: "Psychic Pressure",
    description: "High special power and control tools.",
    lastUpdated: "2025-12-06T16:10:00Z",
    isFavorite: false,
    players: [64, 65, 96, 97, 122, 124],
  },
  {
    id: "6",
    name: "Poison & Sleep",
    description: "Status-heavy team focused on poison/sleep setups.",
    lastUpdated: "2025-12-05T09:20:00Z",
    isFavorite: false,
    players: [23, 24, 43, 44, 69, 70],
  },
  {
    id: "7",
    name: "Electric & Speed",
    description: "Speedy picks and electric coverage for momentum.",
    lastUpdated: "2025-12-04T19:55:00Z",
    isFavorite: true,
    players: [26, 81, 82, 100, 101, 125],
  },
  {
    id: "8",
    name: "Late-Game Heavy Hitters",
    description: "High power options for endgame battles.",
    lastUpdated: "2025-12-03T12:01:00Z",
    isFavorite: false,
    players: [130, 131, 134, 143, 149, 150],
  },
  {
    id: "9",
    name: "Flying Utility",
    description: "Map mobility and flexible matchups.",
    lastUpdated: "2025-12-02T08:40:00Z",
    isFavorite: false,
    players: [21, 22, 83, 84],
  },
  {
    id: "10",
    name: "Fire & Ice Coverage",
    description: "Balanced offense with strong coverage options.",
    lastUpdated: "2025-12-01T23:18:00Z",
    isFavorite: true,
    players: [37, 38, 59, 126, 135, 146],
  },
];

export const sizes = {
  NODE_WIDTH: 125,
  NODE_HEIGHT: 150,
  ROW_GAP: 50,
  LEVEL_GAP: 50,
};

export const teamSortOptions = [
  { id: "id-asc", label: "ID [0 - 9]" },
  { id: "id-dec", label: "ID [9 - 0]" },
  { id: "name-asc", label: "Name [A - Z]" },
  { id: "name-dec", label: "Name [Z - A]" },
  { id: "length-asc", label: "Length [0 - 9]" },
  { id: "length-dec", label: "Length [9 - 0]" },
  { id: "updated-asc", label: "Updated [0 - 9]" },
  { id: "updated-dec", label: "Updated [9 - 0]" },
];

export const pokemonSortOptions = [
  { id: "id-asc", label: "ID [0 - 9]" },
  { id: "id-dec", label: "ID [9 - 0]" },
  { id: "name-asc", label: "Name [A - Z]" },
  { id: "name-dec", label: "Name [Z - A]" },
  { id: "height-asc", label: "Height [0 - 9]" },
  { id: "height-dec", label: "Height [9 - 0]" },
  { id: "weight-asc", label: "Weight [0 - 9]" },
  { id: "weight-dec", label: "Weight [9 - 0]" },
];

export const mockUser = {
  name: "Stephen Helman",
  email: "stephenhelman18@gmail.com",
  password: "Pokemon123!",
  favoritePokemon: [1, 2, 5, 7, 8, 10, 23, 25, 110, 150, 151],
};
