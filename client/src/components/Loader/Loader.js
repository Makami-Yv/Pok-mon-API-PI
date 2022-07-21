import React from "react";

import styles from "./Loader.module.css";
import pokeball from "../../images/pokeball.png"

export function Loader() {
    return (
    <div className={styles.loader_container}>
        <div>
            <img 
                src={pokeball}
                alt="Loading..."/>
        </div>
        <h3 className={styles.label}>Loading...</h3>
    </div>
    );
}