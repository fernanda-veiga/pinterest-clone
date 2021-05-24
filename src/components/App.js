import React, { useState } from "react";
import { HashRouter, Switch, Route } from "react-router-dom";
import Header from "./Header";
import Search from "./Search";
import "../styles/App.css";

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <HashRouter basename="/">
      <div className="App">
        <Header setSearchTerm={setSearchTerm} />
        <Switch>
          {/*<Route exact path="/" component={Homepage} />*/}
          <Route
            exact
            path="/search"
            render={(props) => <Search {...props} searchTerm={searchTerm} />}
          />
          {/*<Route exact path="/user" component={User} />*/}
        </Switch>
      </div>
    </HashRouter>
  );
}

export default App;
