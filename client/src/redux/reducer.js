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
    filtered: [],
    ordered: [],
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
                ? state.copy
                : state.copy.map(pkmn => pkmn.types[0] === action.payload 
                || pkmn.types[1] === action.payload)
            return {
                ...state,
                filtered: typeFiltered
            };

        case FILTER_BY_SOURCE:
            const sourceFiltered = 
                action.payload === "AllSource"
                ? state.copy
                : action.payload === "API"
                ? state.copy.map(pkmn => isNaN(Number(pkmn.id)) === false)
                : state.copy.map(pkmn => isNaN(Number(pkmn.id)) === true)
            return {
                ...state,
                filtered: sourceFiltered
            };

        case ORDER_BY_NAME:
            let nameSort =
                action.payload === "A-Z"
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
                ordered: nameSort,
            };

        case ORDER_BY_ATTACK:
            let attackSort =
                action.payload === "Min-Max"
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
                ordered: attackSort,
            };

        case RESET:
            return {
                ...state,
                copy: state.pokemons,
                filtered: [],
                ordered: [],
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