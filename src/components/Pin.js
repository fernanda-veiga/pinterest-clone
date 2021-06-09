import React from "react";
import arrowLeft from "../assets/arrow-left.svg";

function PinLeft(props) {
  const clickedImage = props.clickedImage;
  return (
    <div className="Pin-container-left">
      <a className="Pin-image-url" href={clickedImage.url} target="blank_">
        <span></span>
        <img
          className="Pin-image"
          src={clickedImage.url}
          alt={clickedImage.alt === null ? "" : clickedImage.alt}
        />
      </a>
    </div>
  );
}

function PinRight(props) {
  const clickedImage = props.clickedImage;
  return (
    <div className="Pin-container-right">
      <span className="Pin-container-right-top">
        <a className="Pin-link" href={clickedImage.link} target="blank_">
          unsplash.com
        </a>
        <button className="Pin-save-button">Save</button>
      </span>

      <h1 className="Pin-title">
        {clickedImage.alt[0].toUpperCase() + clickedImage.alt.slice(1)}
      </h1>

      <span className="Pin-creator-container">
        <img
          className="Pin-creator-image"
          src={clickedImage.creator.profilePicture}
        />
        <p className="Pin-creator-name">{clickedImage.creator.name}</p>
      </span>
    </div>
  );
}

function Pin(props) {
  const images = props.images;
  const imageId = props.id;
  const imageIndex = images.map((img) => img.id).indexOf(imageId);
  const clickedImage = images[imageIndex];

  function returnToPreviousPage() {
    window.history.back();
  }

  return (
    <div className="Pin">
      <button className="back-button" onClick={returnToPreviousPage}>
        <img className="back-icon" src={arrowLeft} alt="" />
      </button>

      <div className="Pin-container">
        <PinLeft clickedImage={clickedImage} />
        <PinRight clickedImage={clickedImage} />
      </div>
    </div>
  );
}

export default Pin;
