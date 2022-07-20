import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CardPokemon as Pokemon } from "../CardPokemon/CardPokemon";
import { Link } from "react-router-dom";

import {
    getAllPokemon,
    getTypes,
    cleanDetails,
} from "../../redux/actions";

import { Loader } from "../Loader/Loader";
import { NavBar } from "../NavBar/NavBar"
// import { ErrorPage } from "../ErrorPage/ErrorPage";
//import ErrorSearch from "../ErrorSearch/ErrorSearch";
import styles from "./Pokemons.module.css";

export function Pokemons() {
    let dispatch = useDispatch();
    let allPokemon = useSelector(state => state.copy);
    let errorRender = useSelector(state => state.copy);

    let [counterPokemon, setCounterPokemon] = useState(1);    // Pagina en la que estamos
    const [pokemonPerPage] = useState(12);              // Cuantos pkmn tendremos por pagina

    let lastPkmn = counterPokemon * pokemonPerPage; // el indice mayor por pagina
    let firstPkmn = lastPkmn - pokemonPerPage; // el indice menor por pagina
    const indexPages = Math.ceil(allPokemon.length / pokemonPerPage);   // Numero de paginas en total

    const pokemonData = useSelector((state) =>
        state.copy ? state.copy.slice(firstPkmn, lastPkmn) : false      // los pkmn de la pagina actual
    );

    useEffect(() => {
        dispatch(cleanDetails());
        dispatch(getAllPokemon());
        dispatch(getTypes());
    }, [dispatch]);

    //const topScreen = document.getElementsByClassName("pokemons_card")

    if (errorRender.length === 0) {
        return (
            <Loader />
        );
    } else {
        //console.log(pokemonData)
        return (
        <div>
            <NavBar />
            <div className={styles.pokemons_card}>
                {pokemonData.length === 0 ? (
                    <h1>Error</h1>
                ) : (
                    pokemonData.map((pkmn, index) => (
                        <Link key={index} to={"/pokemons/" + pkmn.id} style={{ textDecoration: "none" }}>
                            <Pokemon
                            key={index}
                            id={pkmn.id}
                            name={pkmn.name}
                            types={pkmn.types}
                            sprite={pkmn.sprite}
                            hp={pkmn.hp}
                            attack={pkmn.attack}
                            defense={pkmn.defense}
                            esp_attack={pkmn.esp_attack}
                            esp_defense={pkmn.esp_defense}
                            speed={pkmn.speed}
                            />
                        </Link>
                    ))
                )}
            </div>
            <div className={styles.pagination}>
                <button onClick={() => setCounterPokemon(counterPokemon = 1)}>
                    {"<<"}
                </button>
                <button onClick={() => setCounterPokemon(--counterPokemon)}>
                    {"<"}
                </button>
                <p>
                    {counterPokemon} of {indexPages}
                </p>
                <button onClick={() => setCounterPokemon(++counterPokemon)}>
                    {">"}
                </button>
                <button onClick={() => setCounterPokemon(indexPages)}>
                    {">>"}
                </button>
            </div>
        </div>
        );
    }
}