import React from "react";
import MastTitle from "../../Shared/MastTitle";
import MemberCard from "./MemberCard";
import { MdDateRange } from "react-icons/md";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection } from "firebase/firestore";
import { db } from "../../firebase";
import LoadingScreen from "../../Shared/LoadingScreen";
import { motion } from "framer-motion";

//import'./style.css';
const boxList = {
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.3,
    },
  },
  hidden: {
    opacity: 0,
    transition: {
      when: "afterChildren",
    },
  },
};

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
    let uniq = (a) => [...new Set(a)];
    return uniq(yeararray).sort();
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
            .reverse()
            .map((year) => (
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ ease: "easeOut", duration: 1 }}
                viewport={{ once: true }}
                key={year}
                className="px-[0.5rem] md:px-[4rem] pt-[3rem] md:pt-[4rem] "
              >
                <div className="flex gap-2 items-center TextOrange text-[34px] mb-12 pl-4 border-l-8 border-[#FB5343] font-bold BackgroundBlur ">
                  <MdDateRange />
                  <p>{year}</p>
                </div>
                <motion.li
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={boxList}
                  className=" grid grid-cols-1 lg:grid-cols-2 gap-12 align-top"
                >
                  {yearwiseMemberHandeler(value.docs, year).map(
                    (member, index) => {
                      let members;
                      if (member) {
                        members = <MemberCard member={member} key={index} />;
                      }
                      return members;
                    }
                  )}
                </motion.li>
              </motion.div>
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
