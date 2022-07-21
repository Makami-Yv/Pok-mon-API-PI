import React from "react";
import { useDispatch } from "react-redux";
import { useState } from "react";

import { getPokemonByName } from "../../redux/actions";

import styles from "./SearchBar.module.css";

export function SearchBar() {
    const dispatch = useDispatch();
    const [name, setName] = useState("");

    // Handle del input
    function handleInputChange(e) {
        e.preventDefault();
        setName(e.target.value);
    }
    // Handle del searchBar
    function handleSubmit(e) {
        e.preventDefault();
        if(!name) return alert("Write a Pokémon Name")
        else {
            dispatch(getPokemonByName(name.toLowerCase()));
            setName("");
        }
    }

    return (
        <form onSubmit={(e) => handleSubmit(e)} className={styles.search_container}>
            <input
                onChange={(e) => handleInputChange(e)}
                className={styles.input_search}
                value={name}
                type="text"
                placeholder="Search Pokémon..."
            />
            <input type="submit" value="Buscar" className={styles.btn_search}/>
        </form>
    );
}