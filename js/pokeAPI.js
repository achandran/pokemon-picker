/*
 * This module lets us interact with the pokemon REST api
 * using the new fetch interface
 *
 */

const pokeAPI = (function init() {
  const BASE_URL = 'http://pokeapi.co/api/v2';
  let count;

  function makeRequest(url, callback) {
    return fetch(url)
    .then(response => response.json())
    .then(json => callback(json))
    .catch(error => console.log(error));
  }

  function setCounter() {
    return makeRequest(`${BASE_URL}/pokemon/`,
                       (json) => {
                         count = json.count;
                         document.getElementById('counter')
                         .textContent = `Picking from ${count} pokemon...`;
                       });
  }

  function getPokemonByID(id) {
    return makeRequest(`${BASE_URL}/pokemon/${id}/`,
                       (json) => {
                         console.log(json);
                         return json;
                       }
                      );
  }

  // returns a random integer between min and max, inclusive
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // loads a pokemon (json returned from api) into a slot (1 or 2)
  function loadPokemon(pokemon, slot) {
    document.getElementById(`pokemon${slot}`).textContent = pokemon.name;
  }

  function switchPokemon() {
    const id1 = getRandomInt(1, count);
    const id2 = getRandomInt(1, count);
    console.log(`Randomly picked ${id1} and ${id2}`);
    getPokemonByID(id1)
    .then(pokemon => loadPokemon(pokemon, 1));
    getPokemonByID(id2)
    .then(pokemon => loadPokemon(pokemon, 2));
  }

  function start() {
    setCounter()
    .then(switchPokemon);
  }


  return {
    start,
    switchPokemon,
  };
}());
