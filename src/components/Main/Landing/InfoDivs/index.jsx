import React from "react";
import {  RiBracesLine } from "react-icons/ri";
import { MdDeveloperMode } from "react-icons/md";
import { CgFigma } from "react-icons/cg";
import "./style.css";

const InfoDivs = (props) => {
  return (
    <React.Fragment>
      <div className="px-[1rem] sm:px-[2rem] md:px-[3rem] lg:px-[5rem] py-[5rem]">
        <div className="ClubIntro TextColorBasic ">
          <div className="Intro BackgroundBlur">
            <p>
              <strong>
                We are the Technical Society of YMCA University of Science and
                Technology
              </strong>
              , believes in rising by the means of learning ever so more. The
              word Manan comes from Sanskrit and it means deep thought,
              contemplation, or profound reflection. We are proud of our culture
              wherein we share our knowledge between people to gather more
              perspective towards things.
              <br />
              <strong>
                That’s why we organise, and also take part in tech-talks,
                workshops, hackathons, coding contests, gaming events , and much
                more.
              </strong>
            </p>
          </div>
        </div>
        {data.map((item, index) => (
          <div
            key={index}
            className={`flex flex-col ${
              item.rev ? "md:flex-row-reverse" : "md:flex-row"
            } pt-[5rem]`}
          >
            <div className=" flex items-center justify-center h-[20rem]">
              <iframe
                title={item.title}
                className={`relative h-full z-10 pointer-events-none ${
                  item.invert && "dark:invert"
                }`}
                src={item.frame}
              ></iframe>
            </div>
            <div className="flex items-center justify-center w-full px-[1rem] md:px-[2rem]">
              <div className="px-4 py-5 BackgroundBlur">
                <p className=" text-[18px] md:text-[24px] font-medium TextColorBasic">
                  <span className="flex items-center text-[#FB5343] font-bold text-[21px] md:text-[45px]">
                    {item.title}&nbsp;
                    <div className="flex">{item.icon}</div>
                    <br />
                  </span>
                  {item.subtitle}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </React.Fragment>
  );
};

const data = [
  {
    frame: "https://embed.lottiefiles.com/animation/55932",
    title: "We are Programmers",
    subtitle:
      "Our members are proficient in various programming languages and excel in coding competitions around the world like code hash and ICPC etc.",
    icon: <RiBracesLine className=" text-[60px]" />,
  },
  {
    frame: "https://embed.lottiefiles.com/animation/96512",
    title: "We are Developers",
    subtitle:
      "We have one of the best developers in various domains such as Web, Mobile, Blockchain, etc and exploring various domains such as data science and machine learning.",
    rev: true,
    icon: <MdDeveloperMode className=" text-[60px]" />,
  },
  {
    frame: "https://embed.lottiefiles.com/animation/89964",
    title: "We are Designers",
    subtitle:
      "Our Designers stays up to date with the latest trend in web designing, graphic designing and have great skills in software like Figma and Photoshop.",
    icon: <CgFigma className=" text-[60px]" />,
  },
];

export default InfoDivs;
