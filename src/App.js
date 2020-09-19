import React from "react";
import "./App.css";
import Nav from "./components/nav";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import PageTemplate from "./components/pageTemplate";

function App() {
  return (
    <div className="App">
      <Router>
        <Nav />
        <Switch>
          <Route exact path="/:page" component={PageTemplate} />
          <Route exact path="" render={() => <Redirect to="/home" />} />
          <Route exact path="" render={() => 404} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
