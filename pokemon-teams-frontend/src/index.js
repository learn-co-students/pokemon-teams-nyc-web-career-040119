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

      const pokemonList = grab(`#trainer-${trainer.id}-pokemon`);

      trainer.pokemons.forEach(function (poke) {
        const newPoke = document.createElement("li");
        
        newPoke.innerHTML = `${poke.nickname} (${poke.species})
            <button class="release" data-pokemon-id="${poke.id}">Release</button>`;

        pokemonList.appendChild(newPoke);
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
