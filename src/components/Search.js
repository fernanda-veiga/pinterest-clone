import React from "react";
import Loader from "./Loader";

function Search(props) {
  return (
    <div className="Search">
      {props.loading === true ? (
        <Loader />
      ) : (
        <div className="Search-image-container">
          {props.images.map((img) => {
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
