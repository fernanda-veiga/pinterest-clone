import React from "react";
import Loader from "./Loader";
import sadFace from "../assets/sad.svg";

function Search(props) {
  return (
    <div className="Search">
      {props.loading === true ? (
        <Loader />
      ) : props.error === true ? (
        <div className="Search-error">
          <img alt="" src={sadFace} />
          <p>Sorry, we couldn't find any Pins for this search.</p>
        </div>
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
