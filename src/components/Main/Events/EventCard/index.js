import React from "react";

import "./style.css";

const EventCard = (props) => {
  return (
    <div className="EventCard">
      <div className="ImageDiv">
        <img
          src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/tech-event-poster-motion-design-template-8336d288fcc0d6ff912c8b88b4b5c420_screen.jpg?ts=1567082380"
          alt=""
        />
      </div>
      <div className="InfoDiv">
        <div className="Title">Event name go brrr</div>
        <div className="Date">10 Feb 2022</div>
        <div className="Information">
          {" "}
          Here goes description which will be in Markdown
        </div>
      </div>
    </div>
  );
};

export default EventCard;
