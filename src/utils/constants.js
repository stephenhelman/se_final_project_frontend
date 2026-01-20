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

export const VALIDATION_PATTERNS = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/,
  username: /^[a-zA-Z0-9_-]{3,20}$/,
  url: /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/,
  phone: /^\+?[\d\s-()]+$/,
  alphanumeric: /^[a-zA-Z0-9]+$/,
  alphabetic: /^[a-zA-Z]+$/,
  numeric: /^\d+$/,
};

export const ERROR_SEVERITY = {
  CRITICAL: "critical", // Blocks user, requires modal
  ERROR: "error", // Important but not blocking
  WARNING: "warning", // Caution message
  INFO: "info", // Informational
  FIELD: "field", // Form field validation
};

export const CRITICAL_ERROR_TYPES = {
  // Network/API Errors
  NETWORK_ERROR: "NETWORK_ERROR",
  API_TIMEOUT: "API_TIMEOUT",
  SERVER_ERROR: "SERVER_ERROR",

  // Authentication Errors
  SESSION_EXPIRED: "SESSION_EXPIRED",
  UNAUTHORIZED: "UNAUTHORIZED",

  // Data Errors
  DATA_CORRUPTION: "DATA_CORRUPTION",
  LOAD_FAILURE: "LOAD_FAILURE",
  SAVE_FAILURE: "SAVE_FAILURE",

  // Application Errors
  FATAL_ERROR: "FATAL_ERROR",
  INCOMPATIBLE_VERSION: "INCOMPATIBLE_VERSION",

  // User Action Required
  ACCOUNT_LOCKED: "ACCOUNT_LOCKED",
  PAYMENT_REQUIRED: "PAYMENT_REQUIRED",
};

export const CRITICAL_ERROR_MESSAGES = {
  [CRITICAL_ERROR_TYPES.NETWORK_ERROR]: {
    title: "Network Error",
    message:
      "Unable to connect to the server. Please check your internet connection and try again.",
    action: "Retry",
  },
  [CRITICAL_ERROR_TYPES.API_TIMEOUT]: {
    title: "Request Timeout",
    message: "The request took too long to complete. Please try again.",
    action: "Retry",
  },
  [CRITICAL_ERROR_TYPES.SERVER_ERROR]: {
    title: "Server Error",
    message:
      "Something went wrong on our end. Our team has been notified. Please try again later.",
    action: "OK",
  },
  [CRITICAL_ERROR_TYPES.SESSION_EXPIRED]: {
    title: "Session Expired",
    message: "Your session has expired. Please log in again to continue.",
    action: "Login",
  },
  [CRITICAL_ERROR_TYPES.UNAUTHORIZED]: {
    title: "Access Denied",
    message:
      "You do not have permission to access this resource. Please log in or contact support.",
    action: "Login",
  },
  [CRITICAL_ERROR_TYPES.DATA_CORRUPTION]: {
    title: "Data Error",
    message:
      "We encountered an issue loading your data. Please refresh the page or contact support.",
    action: "Refresh",
  },
  [CRITICAL_ERROR_TYPES.LOAD_FAILURE]: {
    title: "Load Failed",
    message:
      "Failed to load required data. Please refresh the page and try again.",
    action: "Refresh",
  },
  [CRITICAL_ERROR_TYPES.SAVE_FAILURE]: {
    title: "Save Failed",
    message:
      "We couldn't save your changes. Please try again or contact support if the problem persists.",
    action: "Retry",
  },
  [CRITICAL_ERROR_TYPES.FATAL_ERROR]: {
    title: "Unexpected Error",
    message:
      "An unexpected error occurred. Please refresh the page. If the problem continues, contact support.",
    action: "Refresh",
  },
  [CRITICAL_ERROR_TYPES.INCOMPATIBLE_VERSION]: {
    title: "Update Required",
    message: "A new version of the app is available. Please refresh to update.",
    action: "Refresh",
  },
  [CRITICAL_ERROR_TYPES.ACCOUNT_LOCKED]: {
    title: "Account Locked",
    message:
      "Your account has been locked. Please contact support to unlock your account.",
    action: "Contact Support",
  },
  [CRITICAL_ERROR_TYPES.PAYMENT_REQUIRED]: {
    title: "Payment Required",
    message:
      "Your subscription has expired. Please update your payment method to continue.",
    action: "Update Payment",
  },
};
