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
   * @param id
   *
   * @return {Promise}
   *   Returns a promise that resolves to parks.
   */
  parks(id = null) {
    var params = `parkCode=${id}`;
    var url = `${this.url}parks?${params}${this.auth}`;

    return fetch(url)
      .then(res => res.json())
      .then(json => json.data)
      .catch(this.handleErrors);
  }
}

module.exports = {
  api: new NPSAPI()
}
