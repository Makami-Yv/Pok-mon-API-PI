import styles from "./Home.module.css"
//import { NavBar } from "../Nav/NavBar";
import { Pokemons } from "../Pokemons/Pokemons"
//import { Footer } from "../Footer/Footer";
//import { Aside as Filter } from "../Aside/Aside";

export function Home() {
    return (
        <div className={styles.home_container}>
            <Pokemons />
        </div>
    );
}