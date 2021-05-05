import React, { useState, useEffect } from "react";
import APIKeyPath from "../firebase";
import Loader from "./Loader";

function Search() {
  const [images, setImages] = useState(undefined);

  useEffect(() => {
    async function fetchImages() {
      //Fetch API key
      const doc = await APIKeyPath.get();
      const APIKey = await doc.data().key;

      //Fetch images urls
      const fetchedData = await fetch(
        `https://api.unsplash.com/search/photos?client_id=${APIKey}&per_page=20&query=cat`,
        { mode: "cors" }
      );
      const fecthedDataJSON = await fetchedData.json();
      setImages(
        fecthedDataJSON.results.map((img) => {
          return { key: img.id, url: img.urls.regular };
        })
      );
    }
    fetchImages();
  }, []);

  return (
    <div className="Search">
      {images === undefined ? (
        <Loader />
      ) : (
        <div className="Search-image-container">
          {images.map((img) => {
            return (
              <img
                key={img.key}
                className="Search-image"
                src={img.url}
                alt=""
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Search;
