import React from "react";

function Pin(props) {
  const images = props.images;
  const imageId = props.id;
  const imageIndex = images.map((img) => img.key).indexOf(imageId);
  const clickedImage = images[imageIndex];

  return (
    <div>
      <img
        src={clickedImage.url}
        alt={clickedImage.alt === null ? "" : clickedImage.alt}
      />
    </div>
  );
}

export default Pin;
