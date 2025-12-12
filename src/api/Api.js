class Api {
  constructor(baseUrl, token, contentType) {
    this._baseUrl = baseUrl;
    this._headers = {
      authorization: token,
      "Content-Type": contentType,
    };
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  _initializeRequest() {
    return fetch(`${this._baseUrl}${this._endpoint}`, {
      method: this._method,
      headers: this._headers,
      body: this._body ? JSON.stringify(this._body) : null,
    });
  }

  _generateRequestOptions({ endpoint, method, body = null }) {
    this._endpoint = endpoint;
    this._method = method;
    this._body = body;
  }
}

export default Api;
