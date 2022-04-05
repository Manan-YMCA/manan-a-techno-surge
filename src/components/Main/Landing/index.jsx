import React from "react";
import { BiChevronsDown } from "react-icons/bi";
import "./style.css";
import InfoDivs from "./InfoDivs";
import { motion, AnimatePresence } from "framer-motion";
import BackgroundIcons from "./BackgroundIcons";
const Landing = (props) => {
  return (
    <div>
      <div className="Landing">
        {/* <BackgroundIcons /> */}
        <div className="TitleBox">
          <p className="HeadOne PurpleGradient  ">
            <span className="Title">Manan&nbsp;</span>
            <span className="Subtitle">A Techno Surge</span>
          </p>
          <div className="HeadThree">
            <p className=" ">Know More</p>
            <div className="flex justify-center">
              <motion.div
                animate={{ y: 5 }}
                transition={{
                  duration: 0.5,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              >
                <BiChevronsDown className="TextColorBasic" />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
      <InfoDivs />
    </div>
  );
};

export default Landing;
