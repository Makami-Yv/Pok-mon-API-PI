import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { LandingPage } from "./components/LandingPage/LandingPage";
import { Home } from "./components/Home/Home";
//import { Create } from "./components/Create/Create.jsx";
import { Details } from "./components/Details/Details";
//import { ErrorPage } from "./components/ErrorPage/ErrorPage.jsx";

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={LandingPage}/>
        <Route exact path="/home" component={Home}/>
        <Route exact path="/pokemons/:id" component={Details}/>
        <Redirect from="*" to="/Error"/>
      </Switch>
    </div>
  );
}

export default App;
