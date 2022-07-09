// Importamos los controllers y dependencias necesarias
const { Router } = require("express");
const { 
    getAllPokemon, 
    getPokemonByName,
    getPokemonByID,
    createPokemon
} = require ('../controllers/pokemonController')

const pokeRouter = Router();

// Configurar los routers

// GET para Todos los pokémon o solo uno por Nombre
pokeRouter.get('/', async (req, res) => {
    try {
        const { name } = req.query;
        if(!name) {
            return res.status(200).send(await getAllPokemon());
        } else {
            const pokeName = await getPokemonByName(name);
            if(pokeName) {
                return res.status(200).json(pokeName)
            }
        }
    } catch (e) {
        console.log(e);
        return res.status(400).send('Pokémon not found')
    }
});

// GET para solo un pokémon por ID
pokeRouter.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        if(id) {
            const pokeID = await getPokemonByID(id)
            if(pokeID) {
                return res.status(200).json(pokeID)
            }
        }
    } catch (e) {
        console.error(e)
        throw new Error (e)
    }
});

// POST para crear un nuevo Pokémon
pokeRouter.post('/create', async (req, res) => {
    try {
        const pokeData = req.body;
        if(pokeData) {
            const pokePost = await createPokemon(pokeData)
            console.log("Estoy en Routes:", pokePost)
            if(pokePost) {
                return res.status(200).send("A New Pokémon was created!")
            }       
        }
    } catch (e) {
        console.error(e)
        throw new Error (e)
    }
})

module.exports = pokeRouter;
