import React from "react";
import APIKeyPath from "../firebase";

let APIKey;

(async function fetchAPIKey() {
  const data = await APIKeyPath.get();
  APIKey = data.data().key;
  console.log(APIKey);
})();

function Search() {
  return <div className="Search"></div>;
}

export default Search;
