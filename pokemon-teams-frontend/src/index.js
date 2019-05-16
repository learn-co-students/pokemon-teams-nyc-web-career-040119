const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

function grab(selector) {
  return document.querySelector(selector);
}

fetch(TRAINERS_URL, {method: "GET"})
  .then(function (resp) {
    return resp.json();
  }).then(function (trainersArr) {
    const trainerContainer = grab("#trainer-container");

    for (const trainer of trainersArr) {
      const trainerDiv = document.createElement("div");
      trainerDiv.innerHTML = `
        <div class="card" data-id="${trainer.id}"><p>${trainer.name}</p>
          <button data-trainer-id="${trainer.id}">Add Pokemon</button>
          <ul id="trainer-${trainer.id}-pokemon">
            <!-- POKEMON GO HERE -->
          </ul>
        </div>`;

      trainerContainer.appendChild(trainerDiv);
      // add button
      const addButton = grab(`[data-trainer-id="${trainer.id}"]`)
        addButton.addEventListener("click",function(e){
          fetch(POKEMONS_URL, {
          method:"POST",
          headers:
          {
            'Content-Type': 'application/json'
          },
          body:
          JSON.stringify({
            "trainer_id": trainer.id
          })

          })
          .then(function(resp){
            return resp.json();
          })
          .then(function(addPoke){
            if (!addPoke.error) {
              // const pokemonList = grab(`#trainer-${trainer.id}-pokemon`);
              // debugger
              const addNewPoke = document.createElement("li")
              pokemonList.appendChild(addNewPoke)
              addNewPoke.innerHTML = `${addPoke.nickname} (${addPoke.species})
                  <button class="release" data-pokemon-id="${addPoke.id}">Release</button>`;
            }



          })


        })



      // list of each trainers pokemon
      const pokemonList = grab(`#trainer-${trainer.id}-pokemon`);

      //
      trainer.pokemons.forEach(function (poke) {
        const newPoke = document.createElement("li");

        newPoke.innerHTML = `${poke.nickname} (${poke.species})
            <button class="release" data-pokemon-id="${poke.id}">Release</button>`;



        pokemonList.appendChild(newPoke);

          const releaseButton = grab(`[data-pokemon-id="${poke.id}"]`)
          releaseButton.addEventListener("click", function(e){

            newPoke.remove();
            fetch(POKEMONS_URL + "/" + poke.id, {method: "DELETE"})
            .then(function(resp){
              return resp.json()
            })

          })


      });

      // debugger;
    }
  });



// <div class="card" data-id="1"><p>Prince</p>
//   <button data-trainer-id="1">Add Pokemon</button>
//   <ul>
//     <li>Jacey (Kakuna) <button class="release" data-pokemon-id="140">Release</button></li>
//     <li>Zachariah (Ditto) <button class="release" data-pokemon-id="141">Release</button></li>
//     <li>Mittie (Farfetch'd) <button class="release" data-pokemon-id="149">Release</button></li>
//     <li>Rosetta (Eevee) <button class="release" data-pokemon-id="150">Release</button></li>
//     <li>Rod (Beedrill) <button class="release" data-pokemon-id="151">Release</button></li>
//   </ul>
// </div>
