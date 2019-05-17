const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`


function grab(selector) {
  return document.querySelector(selector);
}

//////////////////////// fetch begins
fetch(TRAINERS_URL, {method:"GET"})
  .then((response)=>{
    return response.json();
  })
  .then((trainerObj) => {
    const main = document.querySelector("#main")
    trainerObj.forEach(function (trainer, trainer_index) {
      main.innerHTML += `
      <div class="card" data-id="${trainer_index}"><p>${trainer.name}</p>
      <button id="b${trainer_index}" data-trainer-id="${trainer_index}">Add Pokemon</button>
      <ul id="ul${trainer_index}">
      </ul>
      </div>`
      trainer.pokemons.forEach(function (pokemon, poke_index) {
        const ul = document.querySelector(`#ul${trainer_index}`)
        ul.innerHTML += `
        <li>${pokemon.nickname} (${pokemon.species}) <button class="release" data-pokemon-id="${poke_index}">Release</button></li>
        `
      })
    })
  })
