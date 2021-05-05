import React, { useState, useEffect } from "react";
import APIKeyPath from "../firebase";

function Search() {
  const [images, setImages] = useState(undefined);

  useEffect(() => {
    async function fetchImages() {
      //Fetch API key
      const doc = await APIKeyPath.get();
      const APIKey = await doc.data().key;

      //Fetch images urls
      const fetchedData = await fetch(
        `https://api.unsplash.com/search/photos?client_id=${APIKey}&query=cat`,
        { mode: "cors" }
      );
      const fecthedDataJSON = await fetchedData.json();
      console.log(fecthedDataJSON);
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
        <h1>Undefined</h1>
      ) : (
        images.map((img) => {
          return <img key={img.key} src={img.url} />;
        })
      )}
    </div>
  );
}

/*class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      APIKey: undefined,
      imagesUrls: undefined,
    };
  }

  componentDidMount() {




    APIKeyPath.get().then((doc) => {
      const APIKey = doc.data().key;
      fetch(
        `https://api.unsplash.com/search/photos?client_id=${APIKey}&query=cat`,
        { mode: "cors" }
      ).then((result) => {
        console.log(result.json());
      });
      .then((data) => {
          const urls = data.results.map((img) => {
            return img.urls.regular;
          });
          this.setState({ imagesUrls: urls });

          //this.setState({ APIKey: doc.data().key });
        });
    });
  }

  render() {
    return <div className="Search"></div>;
  }
}*/

/*{this.state.APIKey === undefined ? (
          <h1>Undefined</h1>
        ) : (
          <h1>{this.state.APIKey}</h1>
        )}*/

//const [APIKey, setAPIKey] = useState(undefined);
//const [results, setResults] = useState([]);
//let results;
//let APIKey;

/*(async function fetchAPIKey() {
  const data = await APIKeyPath.get();
  APIKey = data.data().key;
  //setAPIKey(data.data().key);
  console.log(APIKey);

  const fetchImages = await fetch(
    `https://api.unsplash.com/search/photos?client_id=${APIKey}&query=cat`,
    { mode: "cors" }
  );
  const imagesDataJSON = await fetchImages.json();
  storeResults(imagesDataJSON);
  console.log(imagesDataJSON);
})();

function storeResults(json) {
  const newResults = json.results.map((result) => {
    return result.urls.regular;
  });
  results = newResults;
  //setResults(newResults);
}

function Search() {
  useEffect(() => {
    // Do something
  }, []);

  return <div className="Search"></div>;
}*/

export default Search;
