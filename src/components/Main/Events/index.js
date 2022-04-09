import React from "react";
import MastTitle from "../../Shared/MastTitle";
import EventCard from "./EventCard";
import { MdDateRange } from "react-icons/md";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection } from "firebase/firestore";
import { db } from "../../firebase";
import "./style.css";
import LoadingScreen from "../../Shared/LoadingScreen";

const Events = (props) => {
  const [value, loading, error] = useCollection(collection(db, "events"), {
    snapshotListenOptions: { includeMetadataChanges: true },
  });
  const yearArrayHandler = (array) => {
    const yearArray = array.map((item) => {
      return new Date(item.data().timestamp.toDate()).getFullYear();
    });
    let uniq = (a) => [...new Set(a)];
    return uniq(yearArray).sort().reverse();
  };
  const eventsArrayHandler = (array, year) => {
    const eventsArray = array.map((item) => {
      return (
        new Date(item.data().timestamp.toDate()).getFullYear() === year &&
        item.data()
      );
    });
    return eventsArray;
  };

  return (
    <React.Fragment>
      {value && console.log(eventsArrayHandler(value.docs, 2022))}
      <MastTitle title="Events" />
      {value &&
        yearArrayHandler(value.docs).map((year) => (
          <div className="px-[0.5rem] md:px-[4rem] pt-[4rem] ">
            <div className="flex gap-2 items-center TextOrange text-[34px] mb-12 pl-4 border-l-8 border-[#FB5343] font-bold BackgroundBlur ">
              <MdDateRange />
              <p>{year}</p>
            </div>
            <div className=" grid grid-cols-1 lg:grid-cols-2 gap-12">
              {eventsArrayHandler(value.docs, year).map((event) => (
                <EventCard event={event} />
              ))}
            </div>
          </div>
        ))}
      {loading && (
        <div className="h-screen">
          <LoadingScreen />
        </div>
      )}
    </React.Fragment>
  );
};

export default Events;
