const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`


function grab(selector) {
  return document.querySelector(selector);
}


function slapPokeOnTheDOM(poke, pokemonList) {
  const newPoke = document.createElement("li");

  newPoke.innerHTML = `${poke.nickname} (${poke.species})
      <button class="release" data-pokemon-id="${poke.id}">Release</button>`;

  pokemonList.appendChild(newPoke);

  const releaseButton = grab(`[data-pokemon-id="${poke.id}"]`)
  releaseButton.addEventListener("click", () => {
    newPoke.remove();
    fetch(POKEMONS_URL + "/" + poke.id, {method: "DELETE"}) //.then NOT NECESSARY, WE DON'T NEED A RESP FOR DELETE
  })
}



// BEGIN FETCH ///////////////
fetch(TRAINERS_URL, {method: "GET"})
  .then(resp => resp.json())
  .then(trainersArr => {
    const trainerContainer = grab("#trainer-container");

    for (const trainer of trainersArr) {
      const trainerDiv = document.createElement("div");
      trainerDiv.innerHTML = `
        <div class="card" data-id="${trainer.id}"><p>${trainer.name}</p>
          <button data-trainer-id="${trainer.id}">Add Pokemon</button>
          <ul id="trainer-${trainer.id}-pokemon">
            <!-- POKEMON GO HERE -->
          </ul>
        </div>
      `;

      trainerContainer.appendChild(trainerDiv);
      // add button
      const addButton = grab(`[data-trainer-id="${trainer.id}"]`)
      addButton.addEventListener("click",function(e){
        fetch(POKEMONS_URL, {
          method: "POST",
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({"trainer_id": trainer.id})
        })
          .then(resp => resp.json())
          .then(addPoke => {
            !addPoke.error ? slapPokeOnTheDOM(addPoke, pokemonList) : alert(addPoke.error)
          })
      })

      // list of each trainers pokemon
      const pokemonList = grab(`#trainer-${trainer.id}-pokemon`);

      for (const poke of trainer.pokemons) {
        slapPokeOnTheDOM(poke, pokemonList);
      }
    } // END OF for trainer of trainersARR
  }); // END OF SECOND .then
