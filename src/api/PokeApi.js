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

  getOnePokemon(url) {
    this._parseUrlForId(url);
    this._generateRequestOptions({
      endpoint: `pokemon/${this._id}`,
      method: "GET",
    });
    return this._initializeRequest().then(this._checkResponse);
  }

  getPokemonSpeciesInfo(url) {
    this._parseUrlForId(url);
    this._generateRequestOptions({
      endpoint: `pokemon-species/${this._id}`,
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

  getGrowthRateInfo(url) {
    this._parseUrlForId(url);
    this._generateRequestOptions({
      endpoint: `growth-rate/${this._id}`,
      method: "GET",
    });
    return this._initializeRequest().then(this._checkResponse);
  }

  getTypesInfo(url) {
    this._parseUrlForId(url);
    this._generateRequestOptions({
      endpoint: `type/${this.id}`,
      method: "GET",
    });
    return this._initializeRequest().then(this._checkResponse);
  }
}

export default PokeApi;
