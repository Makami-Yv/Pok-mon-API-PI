const { Pokemon, Type, Op } = require('../db.js');
const axios = require('axios');

// Obtenemos los pokemons desde la api
const pkmnApi = async () => {
    try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=40');    // Devuelve a los pokemon de la api
        const subResponse = response.data.results?.map(pk => axios.get(pk.url));           // Realizamos otra petición a la url de cada pokemon 
        const pokeRes = await axios.all(subResponse);

        let pokemons = pokeRes.map(pk => pk.data);                                         // Devuelve los datos de cada pokemon
        let pokeData = pokemons.map(pk => pkmnFormating(pk))                               // Mapeamos los datos con la forma de nuestro modelo 
            
        console.log(pokeData)
        return pokeData

    } catch (e) {
        console.log(e);
        return e;
    }
};

// Obtenemos los  pokemon desde la DB
const pkmnDB = async () => {
    try {
        return await Pokemon.findAll({                         // Devuelve a todos los pokemon de la DB 
            include: {
                model: Type,                                   // Agrega la información de sus tipos
                attibutes: ['name'],
            }
        })

    } catch (e) {
        console.log(e);
        return e;
    }
}

// Mandamos todos los pokemon, tanto de Api como DB
const getAllPokemon = async () => {
    try {
        const pokemonApi = await pkmnApi();                    // Recibe los pokemon de la Api
        const pokemonDB = await pkmnDB();                      // Recibe los pokemon de la DB
        let response = [...pokemonApi, ...pokemonDB];          // Los concatena para enviarlos juntos
        return response;

    } catch (e) {
        console.log(e);
        return e;
    }
}

// Obtenemos los Pokemon buscando por su nombre
const getPokemonByName = async (name) => {
    try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)   // Nos devuelve los datos del pokemon que buscamos
        const pkmnData = {                                                              // Formateamos la info a nuestro modelo
            id: response.data.id,
            name: response.data.name,
            sprite: response.data.sprites.other.dream_world.front_default 
            || "https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/MissingNo.png/320px-MissingNo.png",
            height: response.data.height,
            weight: response.data.weight,
            hp: response.data.stats[0].base_stat,
            attack: response.data.stats[1].base_stat,
            defense: response.data.stats[2].base_stat,
            esp_attack: response.data.stats[3].base_stat,
            esp_defense: response.data.stats[4].base_stat,
            speed: response.data.stats[5].base_stat,
            types: response.data.types.length < 2? [{name: response.data.types[0].type.name}] 
            : [{name: response.data.types[0].type.name}, {name: response.data.types[1].type.name}]
        };
        
        return pkmnData              // Enviamos los datos del pokemon ya formateados

    } catch (e) {
        console.log(e);
        return e;
    }
}

const pkmnFormating = (Poke) => {
    try {
        const pkmnFormated = {
            id: Poke.id,
            name: Poke.name,
            sprite: Poke.sprites.other.dream_world.front_default 
                || "https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/MissingNo.png/320px-MissingNo.png",
            height: Poke.height,
            weight: Poke.weight,
            hp: Poke.stats[0].base_stat,
            attack: Poke.stats[1].base_stat,
            defense: Poke.stats[2].base_stat,
            esp_attack: Poke.stats[3].base_stat,
            esp_defense: Poke.stats[4].base_stat,
            speed: Poke.stats[5].base_stat,
            types: Poke.types.length < 2? [{name: Poke.types[0].type.name}] 
                : [{name: Poke.types[0].type.name}, {name: Poke.types[1].type.name}]
        };
        return pkmnFormated;

    } catch(e) {
        console.error(e);
        throw new Error ("There's no Pokémon to format")
    }
}

module.exports = {
    pkmnApi,
    pkmnDB,
    getAllPokemon,
    getPokemonByName,
}