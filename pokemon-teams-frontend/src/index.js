const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

const trainerContainer = document.querySelector("#trainer-container")


fetch(TRAINERS_URL)
  .then(function(resp){
    return resp.json();
  }).then(function(trainers){

    trainers.forEach(function(trainer){
      const eachTrainer = document.createElement('div')
      eachTrainer.innerHTML = `
      <div class="card" data-id="${trainer.id}"><p>${trainer.name}</p>
      <button data-trainer-id="${trainer.id}">Add Pokemon</button>
        <ul id="ul-${trainer.id}">
        <!-- eachPokemon here -->
        </ul>
      </div>
      `
      trainerContainer.appendChild(eachTrainer)
      // trainers are added to dom



      //animation
      eachTrainer.addEventListener("click",function(event){

              // eachTrainer.style.position = "absolute"


                var id = setInterval(frame, 5);
                function frame(eachTrainer) {


                    eachTrainer.style.backgroundcolor = "red"
                    // elem.style.backgroundcolor = "blue"

                }


      })









      const addButton = document.querySelector(`[data-trainer-id="${trainer.id}"]`)

      addButton.addEventListener("click",function(event){
        fetch(POKEMONS_URL, {
          method:"POST",
          headers:{
            'Content-Type': 'application/json'
          },
          body:JSON.stringify({
            "trainer_id":`${trainer.id}`
          })
        }).then(function(resp){
          return resp.json()
        }).then(function(pokemon){
          if (!pokemon.error) {
            const eachPokemon = document.createElement('li')
            eachPokemon.innerHTML = `
            ${pokemon.nickname} (${pokemon.species}) <button class="release" data-pokemon-id="${pokemon.id}">Release</button>
            `
            pokeContainer.appendChild(eachPokemon)

            const releaseButton = document.querySelector(`[data-pokemon-id="${pokemon.id}"]`)

            releaseButton.addEventListener("click",function(event){
              fetch(POKEMONS_URL + "/" + `${pokemon.id}`,
              {method:"Delete"})
              eachPokemon.remove()
            })// end of release button event listener
          }else {
            alert(pokemon.error)
          }
        })// end of post fetch for pokemon

      })// end of addButton event listener

      const pokeContainer = document.querySelector(`#ul-${trainer.id}`)
      trainer.pokemons.forEach(function(pokemon){
        const eachPokemon = document.createElement('li')
        eachPokemon.innerHTML = `
        ${pokemon.nickname} (${pokemon.species}) <button class="release" data-pokemon-id="${pokemon.id}">Release</button>
        `
        pokeContainer.appendChild(eachPokemon)
        //pokemon added to dom

        const releaseButton = document.querySelector(`[data-pokemon-id="${pokemon.id}"]`)

        releaseButton.addEventListener("click",function(event){
          fetch(POKEMONS_URL + "/" + `${pokemon.id}`,
          {method:"Delete"})
          eachPokemon.remove()
        })// end of release button event listener

      })// end of pokemon for each
    })// end of trainers for each










  })//end of fecht.then for trainers