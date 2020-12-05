import React from "react";
import Header from "./Header";
import Generos from "./Generos";
import NewGenre from "./NewGenre";
import EditGenre from "./EditGenre";
import Series from "./Series";
import NewSeries from "./NewSerie";
import InfoSerie from "./InfoSerie";

import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";

const Home = () => {
  return <h1>HOME</h1>
}

function App() {
  return (
    <Router>
      <div >
        <Header />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/Generos" exact component={Generos} />
          <Route path="/Generos/novo" exact component={NewGenre} />
          <Route path="/Generos/:id" exact component={EditGenre} />
          <Route path="/Series" exact component={Series} />
          <Route path="/Series/novo" exact component={NewSeries} />
          <Route path="/Series/:id" exact component={InfoSerie} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
