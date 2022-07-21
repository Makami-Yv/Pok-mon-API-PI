import React from "react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getPokemonDetails, cleanDetails } from "../../redux/actions";

import { Loader } from "../Loader/Loader";
import { NavBar } from "../NavBar/NavBar";
import styles from "./Details.module.css";

export function Details() {
    const dispatch = useDispatch();
    const params = useParams();             // desde aqui obtenemos el id del pokemon
    const pkmn = useSelector((state) => state.details);
    let prevPkmn = 0;

    pkmn.id !== 1
        ? prevPkmn = pkmn.id - 1
        : prevPkmn = pkmn.id

    useEffect(() => {
        dispatch(cleanDetails());
        dispatch(getPokemonDetails(params.id));
    }, [dispatch, params.id]);

    console.log(pkmn)

    if (!pkmn.name) {
        return (
        <div>
            <div>
                <Loader />
            </div>
        </div>
        );
    } else if (pkmn.length !== 0) {
        return (
        <div className={styles.background}>
            <NavBar/>
            <div className={styles.frame}>
                <div className={styles.pokebox}>
                    <div className={styles.name}>
                        <h3>
                            {`#${pkmn.id}`} {pkmn.name}
                        </h3>
                    </div>
                    <div className={styles.data_container}>
                        <div className={styles.stats_container}>
                            <h4>{`HP: ${pkmn.hp}`}</h4>
                            <h4>{`Attack: ${pkmn.attack}`}</h4>
                            <h4>{`Defense: ${pkmn.defense}`}</h4>
                            <h4>{`Esp. Attack: ${pkmn.esp_attack}`}</h4>
                            <h4>{`Esp. Defense: ${pkmn.esp_defense}`}</h4>
                            <h4>{`Speed: ${pkmn.speed}`}</h4>
                            <h4>{`Height: ${pkmn.height}`}</h4>
                            <h4>{`Weight: ${pkmn.weight}`}</h4>
                        </div>
                        <div className={styles.pokemon_container}>
                            <img src={pkmn.sprite} alt={pkmn.name} />
                            <p>
                            {pkmn.types
                                ? pkmn.types.map((e) => e.name).join(", ")
                                : pkmn.types}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.button_container}>
                <button>
                    <Link to={"/pokemons/" + (prevPkmn)} style={{ textDecoration: "none"}}>
                        Pokémon anterior
                    </Link>
                </button>
                <button>
                    <Link to="/home" style={{ textDecoration: "none"}}>
                        Volver al inicio
                    </Link>
                </button>
                <button>
                    <Link to={"/pokemons/" + (pkmn.id + 1)} style={{ textDecoration: "none"}}>
                        Pokémon siguiente
                    </Link>
                </button>
            </div>
        </div>
        );
    } else if (!pkmn.length) {
        return (
        <div>
            <NavBar/>
            <div>
                Error
            </div>
        </div>
        );
    }
}