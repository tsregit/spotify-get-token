const fetch = require('node-fetch');

/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON, status from the response
 */
function parseJSON(response) {
    return new Promise((resolve) => response.json()
      .then((json) => resolve({
        status: response.status,
        status_text: response.statusText,
        ok: response.ok,
        json,
      })));
  }

  /**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {Promise}           The request promise
 */
export default function request(url, options) {
    return new Promise((resolve, reject) => {
      fetch(url, options)
        .then(parseJSON)
        .then((response) => {
          if (response.ok) {
            return resolve(response.json);
          }
          // extract the error from the server's json
          return reject({status: response.status,detail_error:response.json, status_text:response.status_text});
        })
        .catch((error) => reject({
          networkError: error,
        }));
    });
  }