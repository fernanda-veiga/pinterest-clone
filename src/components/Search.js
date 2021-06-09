import React from "react";
import Loader from "./Loader";
import sadFace from "../assets/sad.svg";
import { Link } from "react-router-dom";

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
              <Link to={"pin/" + img.id} key={img.id + "-link"}>
                <img
                  key={img.id + "-img"}
                  className="Search-image"
                  src={img.url}
                  alt={img.alt === null ? "" : img.alt}
                />
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Search;
