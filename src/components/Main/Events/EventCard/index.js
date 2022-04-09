import React from "react";
import ReactMarkdown from "react-markdown";
import "./style.css";

const EventCard = (props) => {
  const { name, desc, date, eventImage } = props.event;
  return (
    <div className="EventCard">
      <div className="ImageDiv">
        <img src={eventImage} alt="" />
      </div>
      <div className="InfoDiv">
        <div className="Title">{name}</div>
        <div className="Date">{date}</div>
        <div className="Information">
          <ReactMarkdown>{desc}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
