const { Router } = require("express");
const { 
    getAllPokemon, 
    //getPokemonById, 
    //getPokemonByName,
    //postNewPokemon
} = require ('../controllers/pokemonController')

const pokeRouter = Router();

// Configurar los routers

pokeRouter.get('/', getAllPokemon);
//pokeRouter.get('/:id', getPokemonById);
//pokeRouter.get('/', getPokemonByName);
//pokeRouter.post('/create', postNewPokemon)

module.exports = pokeRouter;
