import React from "react";
import { Link } from "react-router-dom";
import logo from "../../images/pokeapi.png"
import style from "./LandingPage.module.css"

export function LandingPage() {
    return (
        <div className={style.landing_container}>
            <Link to={"/home"}> 
                <img className={style.logo} src={logo} alt="PokeApi" />
            </Link>
        </div>
    );
}