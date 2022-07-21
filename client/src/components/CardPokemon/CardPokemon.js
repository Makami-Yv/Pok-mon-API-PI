import React from "react";
import style from "./CardPokemon.module.css";

export function CardPokemon({ id, sprite, name, types }) {
    return (
    <div className={style.card_container} key={id}>
        <div>
            <img className={style.sprite} 
            src={sprite
                || "https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/MissingNo.png/320px-MissingNo.png"} 
            alt="Sprite"/>
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