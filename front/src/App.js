import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import SignIn from "./components/SignIn";
import Header from "./components/Header";
import './App.css';

function App() {
  return (
      <div>
          <Router>
              <Switch>
                    <Route exact path={"/"} component={SignIn} />
                    <Route exact path={"/home"} component={Header} />
              </Switch>
          </Router>
    </div>
  );
}

export default App;
