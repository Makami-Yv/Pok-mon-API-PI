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
            
        return pokeData

    } catch (e) {
        console.log(e);
        return e;
    }
}

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
        let pkmnData = pkmnFormating(response.data);
        
        return pkmnData                                   // Enviamos los datos del pokemon ya formateados

    } catch (e) {
        console.log(e);
        return e;
    }
}

// Obtener los pokemon buscando por ID
const getPokemonByID = async (id) => {
    try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`) // Nos devuelve los datos del pokemon por su id
        let pkmnData = pkmnFormating(response.data);

        return pkmnData;                                  // Enviamos los datos del pokémon ya formateados

    } catch (e) {
        console.error(e);
        throw new Error (`Pokemon with id: ${id} Not Found`)
    }
}

// Formateamos los datos de los pokemon
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

// Creamos un nuevo pokémon
const createPokemon = async (pokeData) => {
    try {
        let createdPoke = {}
        if(pokeData) {
            const { name, sprite, height, weight, hp, attack, defense, esp_attack, esp_defense, speed, types } = pokeData;
            let pokeFound = await Pokemon.findOne({
                where: {
                    name: name.toLowerCase()
                }
            })
            if(pokeFound) {
                throw new Error ("This Pokemon Name already Exists, try another")
            }
            let newPokemon = await Pokemon.create({
                name: name.toLowerCase(),
                sprite: sprite,
                height: height,
                weight: weight,
                hp: hp,
                attack: attack,
                defense: defense,
                esp_attack: esp_attack,
                esp_defense: esp_defense,
                speed: speed,
            });
            let pkmnType = await Type.findAll({
                where: {
                    name: types[0].name
                }
            })
            console.log("Estoy en controller:", pkmnType)
            createdPoke = await newPokemon.addType(pkmnType);
        } 

        return true
        
    } catch(e) {
        console.error(e)
        throw new Error (e)
    }
}

module.exports = {
    pkmnApi,
    pkmnDB,
    getAllPokemon,
    getPokemonByName,
    getPokemonByID,
    createPokemon,
}