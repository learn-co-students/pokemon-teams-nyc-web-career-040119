const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

fetch(TRAINERS_URL)
  .then(function(res){
    return res.json()
  })
  .then(function(trainers){

    trainers.forEach(function(trainer){

      let pokemons = trainer.pokemons

      const main = document.querySelector("main")
      const card = document.createElement("div")
      card.className = "card"
      card.dataId = trainer.id

      const trainerName = document.createElement("p")
      trainerName.innerText = trainer.name
      card.appendChild(trainerName)

      const addPokemon = document.createElement("button")
      addPokemon.dataTrainerId = trainer.id
      addPokemon.innerText = "Add Pokemon"
      card.appendChild(addPokemon)

      const cb = function(poke){
        const pokemon = document.createElement("li")
        pokemon.innerText = `${poke.nickname} (${poke.species}) `
        pokemon.id = poke.id
        pokemonContainer.appendChild(pokemon)

        const releaseBtn = document.createElement("button")
        releaseBtn.innerText = "Release"
        releaseBtn.className = "release"

        releaseBtn.addEventListener("click", function(){
          fetch(POKEMONS_URL + `/${pokemon.id}`, {method: "DELETE"})
          releaseBtn.parentNode.remove();
        })

        pokemon.appendChild(releaseBtn)
      }

      addPokemon.addEventListener("click", function(){
        fetch(POKEMONS_URL, {
          method: "POST",
          body: JSON.stringify({"trainer_id": trainer.id}),
          headers:{'Content-Type': 'application/json'}
        })
        .then(function(res){
          return res.json()
        })
        .then(function(pokemon){
          if (pokemon.error === undefined){
            // if(!pokemon.error)
            cb(pokemon)
          }else{
          alert(`${pokemon.error}`)
        }
        })
      })

      const pokemonContainer = document.createElement("ul")
      card.appendChild(pokemonContainer)

      pokemons.forEach(cb
      //  function(poke){
      //   const pokemon = document.createElement("li")
      //   pokemon.innerText = `${poke.nickname} (${poke.species}) `
      //   pokemon.id = poke.id
      //   pokemonContainer.appendChild(pokemon)
      //
      //   const releaseBtn = document.createElement("button")
      //   releaseBtn.innerText = "Release"
      //   releaseBtn.className = "release"
      //
      //   releaseBtn.addEventListener("click", function(){
      //     fetch(POKEMONS_URL + `/${pokemon.id}`, {method: "DELETE"})
      //     releaseBtn.parentNode.remove();
      //   })
      //
      //   pokemon.appendChild(releaseBtn)
      //
      // }
    )

      main.appendChild(card)
    })
  })
