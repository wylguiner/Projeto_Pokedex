const pokemonContent = document.getElementById('pokemonContent')
const pokedex = document.getElementById('pokedex');
const loadMoreButton = document.getElementById('loadMore');
const pokemonFeatures = document.getElementById("pokemonSelected")
const pokemonStuff = document.getElementById("pokemonStuff")
const limit = 10;
let offset = 0;
const maxRecords = 151;

function loadPokemonItens(offset, limit) {
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    pokedex.innerHTML += pokemons.map((pokemon) => `
      <li id="${pokemon.number}" class="pokemon ${pokemon.type}">
        <span class="number">#${pokemon.number}</span>
        <span class="name">${pokemon.name}</span>
        <div class="detail">
          <ol class="types">
            ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
          </ol>
          <img src="${pokemon.photo}" alt="${pokemon.name}">
        </div>                
      </li>
    `).join('')
    var pokemonDetailsButton = document.querySelectorAll('li.pokemon');
    pokemonDetailsButton.forEach(elemento => {
      elemento.addEventListener('click', () => {
        pokemonContent.style.display= 'none';
        pokemonFeatures.style.display = 'block';
        idPokemon = elemento.id;
        getSpecificPokemon(idPokemon);
      })
    })

  })
}

function getSpecificPokemon(id) {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`
  fetch(url)
      .then((response) => response.json())
      .then((pokemonDetails) => {
        const newPoke = convertPokeApiDetailToPokemon(pokemonDetails)
        console.log(newPoke);
        pokemonStuff.innerHTML = loadPokemonDetails(newPoke);
      })  
      .catch((error) => console.error(error))
      .finally(() => console.log("working"))
}    

loadPokemonItens(offset,limit);

loadMoreButton.addEventListener('click', () => {
  offset += limit;

  const qtdRecordNextPage = offset + limit;

  if(qtdRecordNextPage >= maxRecords) {
    const newLimit = maxRecords - offset;
    loadPokemonItens(offset, newLimit);
    loadMoreButton.parentElement.removeChild(loadMoreButton);
  } else {
    loadPokemonItens(offset,limit);
  }

})


function loadPokemonDetails(pokemonDetails) {
  return `
    <div class="pokeHeader ${pokemonDetails.type}">
      <a href="index.html"><-</a>  
      <span class="name">${pokemonDetails.name}</span>
      <span class="number">${pokemonDetails.number}</span>
      <div class="details">
        <ol class="types">
          ${pokemonDetails.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
        </ol>
      </div>
        <img src="${pokemonDetails.photo}" alt="${pokemonDetails.name}" >
      <div class="pokemonStats">
        <h2>About</h2>
        <h3>HP: </h3> ${pokemonDetails.hp}
        <h3>Attack: </h3> ${pokemonDetails.attack}
        <h3>Defense: </h3> ${pokemonDetails.defense}
        <h3>Sp Attack: </h3> ${pokemonDetails.spAttack}
        <h3>Sp Defense: </h3> ${pokemonDetails.spDefense}
        <h3>Speed: </h3> ${pokemonDetails.speed}
        <h3>Weight: </h3> ${pokemonDetails.weight}
      </div>
    </div>
  `
      }
      
