/*
 * This module lets us interact with the pokemon REST api
 * using the new fetch interface
 *
 */

const pokeAPI = (function init() {
  const BASE_URL = 'http://pokeapi.co/api/v2';

  function makeRequest(url, callback) {
    fetch(url)
    .then(response => response.json())
    .then(json => callback(json))
    .catch(error => console.log(error));
  }

  function start() {
    // First get a count of the total number of pokemon available
    makeRequest(`${BASE_URL}/pokemon/`,
                (json) => {
                  const counter = document.getElementById('counter');
                  counter.textContent = `Picking from ${json.count} pokemon.`;
                });
  }

  return {
    start,
  };
}());
