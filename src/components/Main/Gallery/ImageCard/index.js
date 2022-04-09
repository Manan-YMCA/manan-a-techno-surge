import React from "react";

import "./style.css";

const ImageCard = (props) => {
  const { name, desc, image } = props.gallery;
  return (
    <React.Fragment>
      <div className="ImageCardDiv">
        <div className="content">
          <div className="content-overlay"></div>
          <img
            className="content-image"
            alt="manan"
            src="https://cdn.pixabay.com/photo/2012/08/27/14/19/mountains-55067__340.png"
          />
          <div className="content-details fadeIn-bottom">
            <h3 className="content-title">{name}</h3>
            <p className="content-text">{desc}</p>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ImageCard;
