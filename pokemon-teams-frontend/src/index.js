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
  .then((trainersArr) => {

    /////// Have TrainersARR, can start creating html
    const trainerContainer = grab('#trainer-container')




    for (const trainer of trainersArr) {
      const trainerDiv = document.createElement('div');

      ////// create new div so div props can be targeted
      trainerDiv.innerHTML += `
      <div class="card" data-id="${trainer.id}"><p>${trainer.name}</p>
        <button data-trainer-id="${trainer.id}">ADD POKEMON</button>
        <ul id="trainer-${trainer.id}-pokemon">

        </ul>
      </div>
      `
      trainerContainer.appendChild(trainerDiv);
    }

    const pokemonList = grab(`#trainer-${trainer.id}-pokemon`);
    for (const pokemon of trainer.pokemons) {
      const pokemon = document.createElement('li');
      pokemon.innerHTML += `
        ${pokemon.nickname} (${pokemon.species})
        <button class="release" data-pokemon-id="${pokemon.id}">Release</button>
      `
      return pokemonList.appendChild(pokemon)
    }

  })
