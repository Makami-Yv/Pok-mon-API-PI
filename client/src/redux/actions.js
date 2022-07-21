// Importamos las dependencias
import axios from "axios";

// Exportamos los types de las actions
export  const 
    GET_PKMN = "GET_PKMN", GET_PKMN_BY_NAME = "GET_PKMN_BY_NAME",
    GET_DETAILS = "GET_DETAILS", GET_TYPES = "GET_TYPES",
    CREATE_PKMN = "CREATE_PKMN", FILTER_BY_TYPES = "FILTER_BY_TYPES",
    FILTER_BY_SOURCE = "FILTER_BY_SOURCE", ORDER_BY_NAME = "ORDER_BY_NAME",
    ORDER_BY_ATTACK = "ORDER_BY_ATTACK", RESET = "RESET",
    CLEAN_DETAIL = "CLEAN_DETAIL", LOADING = "LOADING"

// Rutas del Back
const
    URL_POKEMON = "http://localhost:3001/pokemons",
    URL_CREATE_POKEMON = "http://localhost:3001/pokemons/create",
    URL_TYPES = "http://localhost:3001/types"

// Traemos todos los pokemon
export function getAllPokemon() {
    return async function(dispatch) {
        try {
            const pokemons = await axios.get(URL_POKEMON);  // Llamamos al backend
            console.log("action: ",pokemons)
            return dispatch({
                type: GET_PKMN,
                payload: pokemons.data                          // Mandamos los datos
            });
        } catch (e) {
            console.error(e)
            return alert("An error has occured. There's no Pokémon to show right now")
        }
    }
}

// Buscamos pokemon por nombre
export function getPokemonByName(name) {
    return async function(dispatch) {
        try {
            if(name.search(/^[a-zA-Zñáéíóúü]*$/)) {                     // Comprobamos que solo sean letras
                return alert("The Pokémon name should contain only letters")
            }
            const pokemon = await axios.get(URL_POKEMON + `/?name=${name}`) // Buscamos al pokemon por su nombre
            if(pokemon.data.name === "AxiosError"){
                return alert("There's no Pokémon with that name")
            }
            return  dispatch({
                type: GET_PKMN_BY_NAME,
                payload: pokemon.data
            })
        } catch (e) {
            console.error(e)
            return alert("There's no Pokémon with that name")
        }
    }
}

// Buscamos pokemon por id para mostrar los detalles
export function getPokemonDetails(id) {
    return async function(dispatch) {
        try {
            const pokemon = await axios.get(URL_POKEMON + `/${id}`)
            if(pokemon.data.name === "AxiosError"){
                return alert("There's no Pokémon with that name")
            }
            return dispatch({
                type: GET_DETAILS,
                payload: pokemon.data
            })
        } catch (e) {
            console.error(e)
            return alert("There's no Pok{emon to show")
        }
    }
}

// Conseguimos los types de los pokemon
export function getTypes() {
    return async function(dispatch) {
        try {
            const types = await axios.get(URL_TYPES)                // Conseguimos los types
            return dispatch({
                type: GET_TYPES,
                payload: types.data
            })
        } catch (e) {
            console.error(e)
            return alert("An error has occured. There's no Types to show now")
        }
    }
}

// Creamos un nuevo pokemon mediante un post
export function postCreatePokemon(pokemon) {
    return async function(dispatch) {
        try {
            const createdPkmn = await axios.post(URL_CREATE_POKEMON, pokemon)       // Realizamos un post con los datos del nuevo pkmn
            return dispatch({
                type: CREATE_PKMN,
                payload: createdPkmn.data
            })
        } catch (e) {
            console.error(e) 
            return alert("An error has occured. The Pokemon wasn't created, try again")
        }
    }
}

// Filtramos por tipos
export function filterByTypes(type) {
    try {
        return {
            type: FILTER_BY_TYPES,
            payload: type
        }
    } catch (e) {
        console.error(e) 
        return alert("An error has occured. Can't filter by type")
    }
}

// Filtramos etre los pokemon creados
export function filterBySource(source) {
    try {
        return {
            type: FILTER_BY_SOURCE,
            payload: source
        }
    } catch (e) {
        console.error(e)
        return alert("An error has occured. Can't filter by source")
    }
}

// Ordenamos por nombre
export function orderByName(order) {
    try {
        return {
            type: ORDER_BY_NAME,
            payload: order
        }
    } catch (e) {
        console.error(e)
        return alert("An error has occured. Can't order by name")
    }
}

// Ordenamos por ataque
export function orderByAttack(order) {
    try {
        return {
            type: ORDER_BY_ATTACK,
            payload: order
        }
    } catch (e) {
        console.error(e)
        return alert("An error has occured. Can't order by attack")
    }
}

// Reseteamos el state (filtros, ordenamiento)
export function reset() {
    try {
        return {
            type: RESET,
        }
    } catch (e) {
        console.error(e)
        return alert("An error has occured. Can't reset the state")
    }
}

// Limpiamos los detalles del pokemon para que no se muestre el de un pkmn anterior
export function cleanDetails() {
    try {
        return {
            type: CLEAN_DETAIL,
        }
    } catch (e) {
        console.error(e)
        return alert("An error has occured. Can't clean the details")
    }
}
