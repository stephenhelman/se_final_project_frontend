import Api from "./Api";

class PokeApi extends Api {
  constructor(baseUrl) {
    super(baseUrl);
  }

  _parseUrlForId(url) {
    const splitUrl = url.split("/");
    this._id = splitUrl.at(-2);
  }

  getAllPokemon(count) {
    this._generateRequestOptions({
      endpoint: `pokemon/?count=${count}&limit=${count}`,
      method: "GET",
    });
    return this._initializeRequest().then(this._checkResponse);
  }

  getOnePokemon(id) {
    this._generateRequestOptions({
      endpoint: `pokemon/${id}`,
      method: "GET",
    });
    return this._initializeRequest().then(this._checkResponse);
  }

  getPokemonSpeciesInfo(id) {
    this._generateRequestOptions({
      endpoint: `pokemon-species/${id}`,
      method: "GET",
    });
    return this._initializeRequest().then(this._checkResponse);
  }

  getPokemonEvolutionInfo(url) {
    this._parseUrlForId(url);
    this._generateRequestOptions({
      endpoint: `evolution-chain/${this._id}`,
      method: "GET",
    });
    return this._initializeRequest().then(this._checkResponse);
  }

  getAllGrowthRates() {
    this._generateRequestOptions({
      endpoint: `growth-rate`,
      method: "GET",
    });
    return this._initializeRequest().then(this._checkResponse);
  }

  getGrowthRateInfo(url) {
    this._parseUrlForId(url);
    this._generateRequestOptions({
      endpoint: `growth-rate/${this._id}`,
      method: "GET",
    });
    return this._initializeRequest().then(this._checkResponse);
  }

  getAllTypes(count) {
    this._generateRequestOptions({
      endpoint: `type/?count=${count}&limit=${count}`,
      method: "GET",
    });
    return this._initializeRequest().then(this._checkResponse);
  }

  getOneType(url) {
    this._parseUrlForId(url);
    this._generateRequestOptions({
      endpoint: `type/${this._id}`,
      method: "GET",
    });
    return this._initializeRequest().then(this._checkResponse);
  }
}

export default PokeApi;
