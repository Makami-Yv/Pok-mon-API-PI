import React from "react";
//import { SearchBar } from "../SearchBar/SearchBar";
import { Link } from "react-router-dom";
import Logo from "../../images/pokeapi_flat.png";
import styles from "./NavBar.module.css";

export function NavBar() {
    return (
        <div className={styles.nav_container}>
                <div>
                    <Link to="/home" style={{ textDecoration: "none" }}>
                        <img
                            className={styles.logo}
                            src={Logo}
                            alt="Pokemon App Logo"
                        />
                    </Link>
                </div>
                <Link to="/pokemon/create" style={{ textDecoration: "none" }}>
                    Create
                </Link>
                <Link to={"/about"} style={{ textDecoration: "none" }}>
                    About
                </Link>
                <div className={styles.search_container}>
                    Search
                </div>
        </div>
    );
}