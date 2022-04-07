import React from "react";
import MastTitle from "../../Shared/MastTitle";
import MemberCard from "./MemberCard";
import { MdDateRange } from "react-icons/md";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection } from "firebase/firestore";
import { db } from "../../firebase";
import LoadingScreen from "../../Shared/LoadingScreen";
//import'./style.css';

const Members = (props) => {
  const [value, loading, error] = useCollection(
    collection(db, "userProfiles"),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );
  const yearArrayHandler = (array) => {
    const yeararray = array.map((item) => {
      return item.data().admission;
    });
    return yeararray;
  };
  const yearwiseMemberHandeler = (array, year) => {
    const memberArray = array.map((item) => {
      return item.data().admission === year && item.data();
    });
    return memberArray;
  };
  return (
    <React.Fragment>
      <MastTitle title="Members" />
      {value && (
        <div>
          {yearArrayHandler(value.docs)
            .sort()
            .reverse()
            .map((year) => (
              <div key={year} className="px-[0.5rem] md:px-[4rem] pt-[4rem] ">
                <div className="flex gap-2 items-center TextOrange text-[34px] mb-12 pl-4 border-l-8 border-[#FB5343] font-bold BackgroundBlur ">
                  <MdDateRange />
                  <p>{year}</p>
                </div>
                <div className=" grid grid-cols-1 lg:grid-cols-2 gap-12">
                  {yearwiseMemberHandeler(value.docs, year).map(
                    (member, index) => {
                      let members;
                      if (member) {
                        members = <MemberCard member={member} key={index} />;
                      }
                      return members;
                    }
                  )}
                </div>
              </div>
            ))}
        </div>
      )}
      {!value && (
        <div className="w-screen h-screen">
          <LoadingScreen />
        </div>
      )}
    </React.Fragment>
  );
};

export default Members;
