import React from "react";

import "./style.css";

const ImageCard = (props) => {
  return (
    <React.Fragment>
      <div className="ImageCardDiv">
        <div className="content">
            <div className="content-overlay"></div>
            <img
              className="content-image"
              alt="manan"
              src="https://images.unsplash.com/photo-1433360405326-e50f909805b3?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&w=1080&fit=max&s=359e8e12304ffa04a38627a157fc3362"
            />
            <div className="content-details fadeIn-bottom">
              <h3 className="content-title">This is a title</h3>
              <p className="content-text">This is a short description</p>
            </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ImageCard;
