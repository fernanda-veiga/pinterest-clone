import React, { useState } from "react";
import { HashRouter, Switch, Route } from "react-router-dom";
import Header from "./Header";
import Search from "./Search";
import "../styles/App.css";
import APIKeyPath from "../firebase";

function App() {
  //const [searchTerm, setSearchTerm] = useState("");

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  async function fetchImages(term) {
    setLoading(true);
    setError(false);

    //Fetch API key
    const doc = await APIKeyPath.get();
    const APIKey = await doc.data().key;

    //Fetch images urls
    const fetchedData = await fetch(
      `https://api.unsplash.com/search/photos?client_id=${APIKey}&per_page=20&query=${term}`,
      { mode: "cors" }
    );
    const fecthedDataJSON = await fetchedData.json();

    if (fecthedDataJSON.total === 0) {
      setError(true);
    } else {
      setImages(
        fecthedDataJSON.results.map((img) => {
          return { key: img.id, url: img.urls.regular };
        })
      );
    }

    setLoading(false);
  }

  return (
    <HashRouter basename="/">
      <div className="App">
        <Header fetchImages={fetchImages} />
        <Switch>
          {/*<Route exact path="/" component={Homepage} />*/}
          <Route
            exact
            path="/search"
            render={(props) => (
              <Search
                {...props}
                images={images}
                loading={loading}
                error={error}
              />
            )}
          />
          {/*<Route exact path="/user" component={User} />*/}
        </Switch>
      </div>
    </HashRouter>
  );
}

export default App;
