const { Pokemon, Type, Op } = require('../db.js');
const axios = require('axios');

const getAllPokemon = async (req, res) => {
    try {
        const api = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=40')
        const db = await Pokemon.findAll({include: Type})
        const apiRes = api.data.results?.map(poke => axios.get(poke.url));
        const pkmn = await axios.all(apiRes);
        pkmn.map( async (pk) => {
            return {
                id: pk.data.id,
                name: pk.data.name,
                sprite: pk.data.sprites.other.dream_world.front_default 
                    || "https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/MissingNo.png/320px-MissingNo.png",
                height: pk.data.height,
                weight: pk.data.weight,
                hp: pk.data.stats[0].base_stat,
                attack: pk.data.stats[1].base_stat,
                defense: pk.data.stats[2].base_stat,
                esp_attack: pk.data.stats[3].base_stat,
                esp_defense: pk.data.stats[4].base_stat,
                speed: pk.data.stats[5].base_stat,
                types: pk.data.types.length < 2? [{name: pk.types[0].type.name}] 
                    : [{name: pk.types[0].type.name}, {name: pk.types[0].type.name}]
            }
        })
        if (api || db) {
            let response = [...pkmn, db]
            res.json(response)
        }
    } catch(e) {
        console.error(e)
    }
}

module.exports = {
    getAllPokemon,
}