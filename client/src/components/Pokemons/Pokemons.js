import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import {
    getAllPokemon,
    getTypes,
} from "../../redux/actions";

import { CardPokemon as Pokemon } from "../CardPokemon/CardPokemon";
import { Loader } from "../Loader/Loader";
import { NavBar } from "../NavBar/NavBar"
import styles from "./Pokemons.module.css";

export function Pokemons() {
    let dispatch = useDispatch();
    let allPokemon = useSelector(state => state.copy);
    let errorRender = useSelector(state => state.copy);

    let [counterPokemon, setCounterPokemon] = useState(1);    // Pagina en la que estamos
    const [pokemonPerPage] = useState(12);              // Cuantos pkmn tendremos por pagina

    let lastPkmn = counterPokemon * pokemonPerPage;     // el indice mayor por pagina
    if(allPokemon.length < 12) lastPkmn = allPokemon.length;

    let firstPkmn = lastPkmn - pokemonPerPage;          // el indice menor por pagina
    if(firstPkmn < 1) firstPkmn = 0;
    
    const indexPages = Math.ceil(allPokemon.length / pokemonPerPage);   // Numero de paginas en total

    const pokemonData = useSelector((state) =>
        state.copy.length > 1 
            ? state.copy.slice(firstPkmn, lastPkmn) 
            : [state.copy]                                     // los pkmn de la pagina actual
    );

    useEffect(() => {
        dispatch(getAllPokemon());
        dispatch(getTypes());
    }, [dispatch]);

    if (pokemonData.flat().length === 0) {
        if(errorRender.length === 0) {
            return (
                <Loader />
            );
        }
    } else {
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