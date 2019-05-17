// DEFAULT
const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

fetch(TRAINERS_URL)
  .then(function(response){
    return response.json()
  })
  .then(function(trainers){

    const trainersContainer = document.querySelector("main")

    trainers.forEach(function(trainer){
      // trainer.id, .name, .pokemons

      trainersContainer.innerHTML += `
        <div class="card" data-id="${trainer.id}"><p>${trainer.name}</p>
          <button data-trainer-id="${trainer.id}">Add Pokemon</button>
          <ul id="trainer-${trainer.id}-pokemons">
          </ul>
        </div>
      `

      const trainerPokemons = document.querySelector(`#trainer-${trainer.id}-pokemons`)

      trainer.pokemons.forEach(function(pokemon){
        // pokemon.id, .nickname, .species, .trainer_id

        const newPokemon = document.createElement("li")
        newPokemon.id = `pokemon-${pokemon.id}`
        newPokemon.innerHTML += `
          ${pokemon.nickname}
          (${pokemon.species})
          <button class="release" data-pokemon-id="${pokemon.id}">Release</button>
        `
        trainerPokemons.appendChild(newPokemon)

        // RELEASE POKEMON
        trainersContainer.addEventListener('click', function(event){
          if (event.target.dataset.pokemonId === `${pokemon.id}`){
            const currentPokemon = document.querySelector(`#pokemon-${pokemon.id}`)
            currentPokemon.remove()
            return releasePokemon(pokemon)
          } // end release pokemon listener
        }) // end trainersContainer active listener

      }) // end pokemons loop

      // ADD POKEMON

      const trainerCard = document.querySelector(`[data-id="${trainer.id}"]`)

      trainersContainer.addEventListener('click', function(event){
        if (event.target.dataset.trainerId === `${trainer.id}`){
          return addPokemon(trainer)
        } // end add pokemon listener
      }) // end trainersContainer active listener

    }) // end trainers loop
  }) // end trainers promise


// HELPER FUNCTIONS

// add pokemon
function addPokemon(trainer){
  fetch(POKEMONS_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "trainer_id": trainer.id
    })
  })
    .then(function(response){
      return response.json()
    })
    .then(function(pokemon){
      if (!pokemon.error){
        // if the pokemon promise doesn't throw an error, do this:
        const trainerPokemons = document.querySelector(`#trainer-${trainer.id}-pokemons`)
        const newPokemon = document.createElement("li")

        newPokemon.id = pokemon.id
        newPokemon.innerHTML += `
          ${pokemon.nickname}
          (${pokemon.species})
          <button class="release" data-pokemon-id="${pokemon.id}">Release</button>
        `
        trainerPokemons.appendChild(newPokemon)
      } else {
        // else throw the error and prevent the above from happening
        alert(pokemon.error)
      }
    })
} // end addPokemon function

// release pokemon
function releasePokemon(pokemon){
  fetch(POKEMONS_URL + '/' + `${pokemon.id}`, {
    method: 'DELETE'
  })
} //end releasePokemon function
