import React from "react";

import "./style.css";

const MemberCard = (props) => {
  return (
    <React.Fragment>
      <div className="MemberCard">
        <div className="CardDiv">
          <div className="BannerImageDiv">
            <img
              className="Image"
              src="https://media.istockphoto.com/photos/green-binary-code-matrix-background-wide-banner-picture-id898346256?k=20&m=898346256&s=170667a&w=0&h=JR8ldoUpfy4LPmiU82SbhCUbzkN3tfMSGM1fSWxO0b8="
              alt="cover"
            />
          </div>
          <div className="DpImageDiv">
            <img
              className="DpImage"
              src="https://i.pinimg.com/550x/13/98/f5/1398f5a08385e5fc78be3b45a2c5257b.jpg"
              alt="Woman looking front"
            />
          </div>
          <div className="InfoDiv">
            <h2>Arun Shekhar</h2>
            <h3>Full Stack developer</h3>
            <hr className="my-2 h-[2px]" />
            <div className="ExtraInfo">
              <p>
                <span>Languages :&nbsp;</span>
                C++, Python
              </p>
            </div>
            <div className="ExtraInfo">
              <p>
                <span>Frameworks :&nbsp;</span>
                React 
              </p>
            </div>
            <div className="ExtraInfo">
              <p>
                <span>Other skills :&nbsp;</span>
                Web designing, Media creation
              </p>
            </div>
            <div className="ExtraInfo">
              <p className="flex flex-wrap gap-2">
                <span>Profile links :</span>
                {[1,1].map((link, index) => (
                  <div key={index}>
                    <a
                      href="https://www.google.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Github
                    </a>
                  </div>
                ))}
              </p>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default MemberCard;
