import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
    filterByTypes,
    filterBySource,
    orderByName,
    orderByAttack,
    reset,
} from "../../redux/actions";

import styles from "./SortFilter.module.css";

export function SortFilter(setPokemons) {
    const [, setOrder] = useState("");
    const [, setType] = useState("All");
    const [, setSource] = useState("AllSource")

    const dispatch = useDispatch();
    const allTypes = useSelector(state => state.types);

    useEffect(() => {
        dispatch(reset());
    }, [dispatch]);

    // filtramos por tipos
    function handleFilterByType(e) {
        e.preventDefault();
        handleReset();
        dispatch(filterByTypes(e.target.value));
        setType(e.target.value)
    }

    // filtramos por origen
    function handleFilterBySource(e) {
        e.preventDefault();
        dispatch(filterBySource(e.target.value));
        setSource(e.target.value)
    }

    // ordenamos por nombres
    function handleOrderByName(e) {
        e.preventDefault();
        dispatch(orderByName(e.target.value));
        setOrder(e.target.value)
    }

    // ordenamos por ataque
    function handleOrderByAttack(e) {
        e.preventDefault();
        dispatch(orderByAttack(e.target.value));
        setOrder(e.target.value)
    }

    // reseteamos los filtros y sorts
    function handleReset() {
        dispatch(reset());
    }

    return (
        <div>
            <div className={styles.sortFilter_container}>
                <h3>Filtrar por:</h3>
                <div className={styles.selectors}>
                    <select 
                        className={styles.case}
                        defaultValue="All"
                        onChange={(e) => handleFilterByType(e)}
                    >
                        <option value="All">
                            All Types
                        </option>
                        {
                            allTypes.map((ty, index) => (
                                <option value={ty} key={index}>
                                    {ty}
                                </option>
                            ))
                        }
                    </select>

                    <select 
                        className={styles.case}
                        defaultValue="AllSource"
                        onChange={(e) => handleFilterBySource(e)}
                    >
                        <option value="AllSource">
                            All Source
                        </option>
                        <option value="API">
                            Poke API
                        </option>
                        <option value="DB">
                            Database
                        </option>
                    </select>
                </div>
                <h3>Ordenar por:</h3>
                <div className={styles.selectors}>
                    <select
                        className={styles.case}
                        defaultValue="order"
                        onChange={(e) => handleOrderByName(e)}
                    >
                        <option value="Any">
                            Name
                        </option>
                        <option value="A-Z">
                            A-Z
                        </option>
                        <option value="Z-A">
                            Z-A
                        </option>
                    </select>

                    <select
                        className={styles.case}
                        defaultValue="order"
                        onChange={(e) => handleOrderByAttack(e)}
                    >
                        <option value="None">
                            Attack
                        </option>
                        <option value="Min-Max">
                            Min-Max
                        </option>
                        <option value="Max-Min">
                            Max-Min
                        </option>
                    </select>
                </div>
                <button className={styles.btn} onClick={() => handleReset()}>
                    Reset
                </button>
            </div>
        </div>
    )
}