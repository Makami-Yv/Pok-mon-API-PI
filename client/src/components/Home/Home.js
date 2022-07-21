import styles from "./Home.module.css"
import { Pokemons } from "../Pokemons/Pokemons"

export function Home() {
    return (
        <div className={styles.home_container}>
            <Pokemons />
        </div>
    );
}