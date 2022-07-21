// Importamos las actions
import {
    GET_PKMN, GET_PKMN_BY_NAME,
    GET_DETAILS, GET_TYPES,
    CREATE_PKMN, FILTER_BY_TYPES,
    FILTER_BY_SOURCE, ORDER_BY_NAME,
    ORDER_BY_ATTACK, RESET,
    CLEAN_DETAIL
} from './actions'

const initialState = {
    pokemons: [],
    copy: [],
    types: [],
    details: {},
};

function rootReducer(state = initialState, action) {
    switch(action.type) {
        case GET_PKMN:
            return {
                ...state,
                pokemons: action.payload,
                copy: action.payload
            };

        case GET_PKMN_BY_NAME:
            return {
                ...state,
                copy: action.payload
            };

        case GET_DETAILS:
            return {
                ...state,
                details: action.payload
            };

        case GET_TYPES:
            return {
                ...state,
                types: action.payload
            };

        case CREATE_PKMN:
            return {
                ...state,
                pokemons: state.pokemons.concat(action.payload),
                copy: state.pokemons
            };

        case FILTER_BY_TYPES:
            const typeFiltered =
            action.payload === "All"
            ? state.pokemons
            : state.copy.filter(pkmn => 
                pkmn.types.map(type => type.name)[0] === action.payload 
                || pkmn.types.map(type => type.name)[1] === action.payload)
            if(typeFiltered.length === 0) {
                alert("There's no Pokémon with that Type.")
                return {
                    ...state,
                    copy: state.pokemons
                }
            }
            return {
            ...state,
            copy: typeFiltered
            };

        case FILTER_BY_SOURCE:
            const sourceFiltered = 
                action.payload === "AllSource"
                ? state.pokemons
                : action.payload === "API"
                ? state.copy.filter(pkmn => isNaN(Number(pkmn.id)) === false)
                : state.copy.filter(pkmn => isNaN(Number(pkmn.id)) === true)
            if(sourceFiltered.length === 0) {
                alert("There's no Pokémon with that Source.")
                return {
                    ...state,
                    copy: state.pokemons
                }
            }
            return {
                ...state,
                copy: sourceFiltered
            };

        case ORDER_BY_NAME:
            let nameSort =
                action.payload === "Any"
                ? state.pokemons
                : action.payload === "A-Z"
                ? state.copy.sort(function (a, b) {
                    if (a.name > b.name) return 1;
                    if (b.name > a.name) return -1;
                    return 0;
                    })
                : state.copy.sort(function (a, b) {
                    if (a.name > b.name) return -1;
                    if (b.name > a.name) return 1;
                    return 0;
                    })
            return {
                ...state,
                copy: nameSort,
            };

        case ORDER_BY_ATTACK:
            let attackSort =
                action.payload === "None"
                ? state.pokemons
                : action.payload === "Min-Max"
                ? state.copy.sort(function (a, b) {
                    if (a.attack > b.attack) return 1;
                    if (b.attack > a.attack) return -1;
                    return 0;
                    })
                : state.copy.sort(function (a, b) {
                    if (a.attack > b.attack) return -1;
                    if (b.attack > a.attack) return 1;
                    return 0;
                    });
            return {
                ...state,
                copy: attackSort,
            };

        case RESET:
            return {
                ...state,
                copy: state.pokemons,
            };

        case CLEAN_DETAIL:
            return {
                ...state,
                details: {}
            };

        default:
            return state;
    }
}

export default rootReducer;