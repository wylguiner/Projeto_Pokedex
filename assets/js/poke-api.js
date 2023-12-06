const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types
    
    pokemon.types = types
    pokemon.type = type
    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    const hpStat = pokeDetail.stats.find(stat => stat.stat.name === 'hp');
    const defStat = pokeDetail.stats.find(stat => stat.stat.name === 'defense');
    const attStat = pokeDetail.stats.find(stat => stat.stat.name === 'attack');
    const spAttStat = pokeDetail.stats.find(stat => stat.stat.name === 'special-attack')
    const spDefStat = pokeDetail.stats.find(stat => stat.stat.name === 'special-defense')
    const speedStat = pokeDetail.stats.find(stat => stat.stat.name === 'speed');

    pokemon.weight = pokeDetail.weight;

    pokemon.hp = hpStat.base_stat;
    pokemon.defense = defStat.base_stat;
    pokemon.attack = attStat.base_stat;
    pokemon.spAttack = spAttStat.base_stat;
    pokemon.spDefense = spDefStat.base_stat;
    pokemon.speed = speedStat.base_stat; 

    return pokemon
}

pokeApi.getPokemonsDetails = (pokemon) =>  {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonsDetails))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonDetails) => pokemonDetails)
        .catch((error) => console.log(error))
}

