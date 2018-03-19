var fetch = require ('node-fetch');
var yaml = require ('node-yaml');

/**
 * National Park Service API Abstraction class.
 *
 * @class NPSAPI
 */
class NPSAPI {

  /**
   * Build the instance and prepare API credentials.
   *
   *  @function constructor
   */
  constructor() {
    var config = yaml.readSync('../config.yml');

    this.auth = `&api_key=${config['nps-api-key']}`;
    this.url = 'https://developer.nps.gov/api/v1/';
  }

  /**
   * Generic error handler.
   *
   * This will log errors to the GraphQL console. This could be expanded to
   * log to a file that could the be ingested by a log parser for better
   * reporting.
   *
   * @function handleError
   */
  handleErrors(error) {
    console.log(error)
    return []
  }

  /**
   * Fetch a park list.
   *
   * @function parks
   *
   * @param parkCode
   *
   * @param stateCode
   *
   * @return {Promise}
   *   Returns a promise that resolves to parks.
   */
  parks(parkCode = null, stateCode = null) {
    // Images are not included by default.
    var params = [
      'fields=images'
    ];

    if (parkCode !== null){
      params.push(`parkCode=${parkCode}`);
    }

    if (stateCode !== null){
      params.push(`stateCode=${stateCode}`);
    }

    return this.getMultiple('parks', params);
  }

  park(parkCode = null) {
    var params = [
      `parkCode=${parkCode}`,
      // Images are not included by default.
      'fields=images'
    ];

    return this.getSingle('parks', params);
  }

  visitorCenters(parkCode = null, stateCode = null) {
    var params = [];

    if (parkCode !== null){
      params.push(`parkCode=${parkCode}`);
    }

    if (stateCode !== null){
      params.push(`stateCode=${stateCode}`);
    }

    return this.getMultiple('visitorCenters', params);
  }

  fetchWrapper(endpoint, params) {
    var url = `${this.url}${endpoint}?${params.join('&')}${this.auth}`;

    return fetch(url).catch(this.handleErrors);
  }

  getSingle(endpoint, params) {
    var fetchObj = this.fetchWrapper(endpoint, params);

    return fetchObj
      .then(res => res.json())
      .then(json => json.data.shift());
  }

  getMultiple(endpoint, params) {
    var fetchObj = this.fetchWrapper(endpoint, params);

    return fetchObj
      .then(res => res.json())
      .then(json => json.data);
  }
}

module.exports = {
  api: new NPSAPI()
}
