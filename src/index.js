const https = require('https');
const querystring = require('querystring');

module.exports = class Yelp {
  constructor(apiKey) {
    this.apiKey = apiKey;
  }

  _request(path) {
    return new Promise((resolve, reject) => {
      https.get({
        protocol: 'https:',
        hostname: 'api.yelp.com',
        path,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${this.apiKey}`
        }
      }, function(response) {
        let results = '';
        response.on('data', data => {
          results += data;
        });
        response.on('end', () => {
          try {
            results = JSON.parse(results);
            resolve(results);
          } catch(error) {
            reject(error);
          }
        });
      });
    });
  }

  search(params) {
    params = querystring.stringify(params);
    const path = `/v3/businesses/search?${params}`;
    return this._request(path);
  }

  searchPhone(params) {
    params = querystring.stringify(params);
    const path = `/v3/businesses/search/phone?${params}`;
    return this._request(path);
  }

  searchTransaction(params) {
    params = querystring.stringify(params);
    const path = `/v3/transactions/delivery/search?${params}`;
    return this._request(path);
  }

  matchesBest(params) {
    params = querystring.stringify(params);
    const path = `/v3/businesses/matches/best?${params}`;
    return this._request(path);
  }

  matchesLookup(params) {
    params = querystring.stringify(params);
    const path = `/v3/businesses/matches/lookup?${params}`;
    return this._request(path);
  }

  businesses(yelp_id, params) {
    params = querystring.stringify(params);
    const path = `/v3/businesses/${yelp_id}?${params}`;
    return this._request(path);
  }

  businessReviews(yelp_id, params) {
    params = querystring.stringify(params);
    const path = `/v3/businesses/${yelp_id}/reviews?${params}`;
    return this._request(path);
  }

  autocomplete(params) {
    params = querystring.stringify(params);
    const path = `/v3/autocomplete?${params}`;
    return this._request(path);
  }
};
