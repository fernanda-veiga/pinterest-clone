import React, { useState, useEffect } from "react";
import { HashRouter, Switch, Route } from "react-router-dom";
import Header from "./Header";
import Search from "./Search";
import "../styles/App.css";
import APIKeyPath from "../firebase";

function App() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  function handleScroll() {
    let windowRelativeBottom = document.documentElement.getBoundingClientRect()
      .bottom;
    let windowHeight = document.documentElement.clientHeight;
    console.log("Relative Bottom: ", windowRelativeBottom);
    console.log("Window Height: ", windowHeight);

    if (windowRelativeBottom - 1 < windowHeight) {
      console.log("Reached the bottom");
      console.log("Current page when reach bottom: ", currentPage);
      setCurrentPage(currentPage + 1);
      fetchImagesOnScroll(searchTerm, currentPage);
    }
  }

  async function fetchImagesOnScroll(term, page) {
    console.log("Current page for fetch on scroll: ", currentPage);

    //Fetch API key
    const doc = await APIKeyPath.get();
    const APIKey = await doc.data().key;

    //Fetch images urls
    const fetchedData = await fetch(
      `https://api.unsplash.com/search/photos?client_id=${APIKey}&page=${page}&per_page=10&query=${term}`,
      { mode: "cors" }
    );
    const fecthedDataJSON = await fetchedData.json();
    console.log("Data for fetch on scroll: ", fecthedDataJSON);
    const newImages = fecthedDataJSON.results.map((img) => {
      return { key: img.id, url: img.urls.regular };
    });

    const imageContainer = document.querySelector(".Search-image-container");
    for (let i = 0; i < newImages.length; i++) {
      const img = document.createElement("img");
      img.setAttribute("key", newImages[i].key);
      img.setAttribute("src", newImages[i].url);
      img.setAttribute("alt", "");
      img.classList.add("Search-image");
      imageContainer.appendChild(img);
    }

    setCurrentPage(currentPage + 1);
  }

  async function fetchImagesOnSearch(term) {
    console.log("Current page for fetch on search: ", currentPage);
    setLoading(true);
    setError(false);

    //Fetch API key
    const doc = await APIKeyPath.get();
    const APIKey = await doc.data().key;

    //Fetch images urls
    const fetchedData = await fetch(
      `https://api.unsplash.com/search/photos?client_id=${APIKey}&page=1&per_page=10&query=${term}`,
      { mode: "cors" }
    );
    const fecthedDataJSON = await fetchedData.json();
    console.log("Data for fetch on search: ", fecthedDataJSON);

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
    setCurrentPage(2);
  }

  return (
    <HashRouter basename="/">
      <div className="App">
        <Header
          fetchImagesOnSearch={fetchImagesOnSearch}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
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
