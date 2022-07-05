const { Router } = require("express");
const { 
    pkmnApi,
    pkmnDB, 
    getAllPokemon, 
    getPokemonByName,
} = require ('../controllers/pokemonController')

const pokeRouter = Router();

// Configurar los routers

pokeRouter.get('/', async (req, res) => {
    try {
        const { name } = req.query;
        if(!name) {
            return res.status(200).send(await getAllPokemon());
        } else {
            const poke = await getPokemonByName(name);
            if(poke) {
                return res.status(200).json(poke)
            }
        }
    } catch (e) {
        console.log(e);
        return res.status(400).send('Pokémon not found')
    }
});
//pokeRouter.get('/:id', getPokemonById);
//pokeRouter.post('/create', postNewPokemon)

module.exports = pokeRouter;
