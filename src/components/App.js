import React, { useState, useEffect } from "react";
import { HashRouter, Switch, Route } from "react-router-dom";
import Header from "./Header";
import Search from "./Search";
import Pin from "./Pin";
import "../styles/App.css";
import APIKeyPath from "../firebase";

function App() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  /*useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });*/

  /*function handleScroll() {
    let windowRelativeBottom = document.documentElement.getBoundingClientRect()
      .bottom;
    let windowHeight = document.documentElement.clientHeight;

    if (windowRelativeBottom < windowHeight + 1) {
      setCurrentPage(currentPage + 1);
      fetchImagesOnScroll(searchTerm, currentPage);
    }
  }*/

  /*async function fetchImagesOnScroll(term, page) {
    //Fetch API key
    const doc = await APIKeyPath.get();
    const APIKey = await doc.data().key;

    //Fetch images urls
    const fetchedData = await fetch(
      `https://api.unsplash.com/search/photos?client_id=${APIKey}&page=${page}&per_page=30&query=${term}`,
      { mode: "cors" }
    );
    const fecthedDataJSON = await fetchedData.json();
    console.log("Data for fetch on scroll: ", fecthedDataJSON);
    const newImages = fecthedDataJSON.results.map((img) => {
      return { id: img.id, url: img.urls.regular };
    });

    const imageContainer = document.querySelector(".Search-image-container");
    for (let i = 0; i < newImages.length; i++) {
      const img = document.createElement("img");
      img.setAttribute("key", newImages[i].id);
      img.setAttribute("src", newImages[i].url);
      img.setAttribute("alt", "");
      img.classList.add("Search-image");
      imageContainer.appendChild(img);
    }

    setCurrentPage(currentPage + 1);
  }*/

  async function fetchImagesOnSearch(term) {
    //console.log("Current page for fetch on search: ", currentPage);
    setLoading(true);
    setError(false);

    //Fetch API key
    const doc = await APIKeyPath.get();
    const APIKey = await doc.data().key;

    //Fetch images urls
    const fetchedData = await fetch(
      `https://api.unsplash.com/search/photos?client_id=${APIKey}&page=1&per_page=30&query=${term}`,
      { mode: "cors" }
    );
    const fecthedDataJSON = await fetchedData.json();
    console.log("Data for fetch on search: ", fecthedDataJSON);

    if (fecthedDataJSON.total === 0) {
      setError(true);
    } else {
      setImages(
        fecthedDataJSON.results.map((img) => {
          return {
            id: img.id,
            link: img.links.html,
            url: img.urls.regular,
            alt: img.alt_description,
            creator: {
              profilePicture: img.user.profile_image.large,
              name: img.user.name,
            },
          };
        })
      );
    }

    setLoading(false);
    setCurrentPage(3);
  }

  const IMG_PATH_REGEX = "([a-zA-Z0-9-]{11})";

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
          <Route
            path={"/pin/:id" + IMG_PATH_REGEX}
            render={({ match, props }) => (
              <Pin {...props} id={match.params.id} images={images} />
            )}
          />
          {/*<Route exact path="/user" component={User} />*/}
        </Switch>
      </div>
    </HashRouter>
  );
}

export default App;
