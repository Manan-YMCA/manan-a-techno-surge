import React from "react";
import ReactMarkdown from "react-markdown";
import { motion } from "framer-motion";
import "./style.css";

const boxItem = {
  visible: { opacity: 1, y: 0 },
  hidden: { opacity: 0, y: 20 },
  transition: { ease: "easeOut", duration: 0.5 },
};

const EventCard = (props) => {
  const { name, desc, date, eventImage } = props.event;
  return (
    <div className="flex items-start justify-center w-full">
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ ease: "easeOut", duration: 1 }}
        viewport={{ once: true }}
        className="EventCard"
      >
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
      </motion.div>
    </div>
  );
};

export default EventCard;
