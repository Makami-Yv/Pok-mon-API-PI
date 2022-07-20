import React from "react";
import style from "./CardPokemon.module.css";

export function CardPokemon({ id, sprite, name, types }) {
    return (
    <div className={style.card_container} key={id}>
        <div>
            <img className={style.sprite} src={sprite} alt="Sprite"/>
        </div>
        <h3 className={style.name}>{name}</h3>
        <div>
            <h4 className={style.types}>
                {types ? types.map((e) => e.name).join(", ") : types}
            </h4>
        </div>
    </div>
    );
}