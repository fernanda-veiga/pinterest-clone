import React from "react";
import { HashRouter, Switch, Route } from "react-router-dom";
import Header from "./Header";
import "../styles/App.css";

function App() {
  return (
    <HashRouter basename="/">
      <div className="App">
        <Header />
        <Switch>
          {/*<Route exact path="/" component={Homepage} />*/}
          {/*<Route exact path="/search" component={Search} />*/}
          {/*<Route exact path="/user" component={User} />*/}
        </Switch>
      </div>
    </HashRouter>
  );
}

export default App;
