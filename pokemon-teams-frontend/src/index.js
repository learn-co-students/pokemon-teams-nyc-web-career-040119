const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

  function grab(selector){
    return document.querySelector(selector)
  };


// find trainers and slap them on the dom

const trainerContainer = grab("#trainer-container")

fetch(TRAINERS_URL)
.then(function(resp){
  return resp.json();
}).then(function(trainers){

  // trainers to dom
  trainers.forEach(function(trainer){
    const eachTrainer = document.createElement('li')
      // console.log(trainer)
    eachTrainer.innerHTML = `
      <div class="card" data-id=${trainer.id}><p>${trainer.name}</p>
      <button data-trainer-id=${trainer.id}>Add Pokemon</button>
      <ul id="ul${trainer.id}">

      </ul>
    </div>
    `

    trainerContainer.appendChild(eachTrainer);
    addFunction(trainer)
    trainer.pokemons.forEach(function(pokemon){
      const eachPokemon = document.createElement('li')

      const trainerUL = grab(`#ul${trainer.id}`)

      eachPokemon.innerHTML = `${pokemon.nickname}(${pokemon.species}) <button class="release" data-pokemon-id="${trainer.id}-${pokemon.id}">Release</button>`


      trainerUL.appendChild(eachPokemon)
      releaseFunction(eachPokemon, trainer, pokemon)
    })//each pokemon


  })//each trainer

})


function addFunction(trainer) {
  const addButton = grab(`[data-trainer-id="${trainer.id}"]`)

  addButton.addEventListener("click",function(event){

    fetch(POKEMONS_URL,
      {method:"POST",
      headers:{
        'Content-Type': 'application/json'
      },
      body:
      JSON.stringify({"trainer_id": `${trainer.id}`})

    })
    .then(function(resp){
      return resp.json();
    }).then(function(pokemon){
      if (trainer.pokemons.length < 6) {

        const trainerUL = grab(`#ul${trainer.id}`)

        trainerUL.innerHTML += `<li>${pokemon.nickname}(${pokemon.species}) <button class="release" data-pokemon-id="${pokemon.id}">Release</button></li>`
      }else {
        alert(pokemon.error)
      }
    })// then end
  })//add button event listener
}

function releaseFunction(eachPokemon, trainer, pokemon) {
  const releaseButton = grab(`[data-pokemon-id="${trainer.id}-${pokemon.id}"]`)

  releaseButton.addEventListener("click",function(event){

      eachPokemon.remove();
      fetch(POKEMONS_URL + "/" + `${pokemon.id}`,
      {method:"DELETE"} ).then(function(resp){
        return resp.json();

      })

    })//end of releaseButton listener
}
