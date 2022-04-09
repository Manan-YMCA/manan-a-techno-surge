import React from "react";
import ImageCard from "./ImageCard";
import MastTitle from "../../Shared/MastTitle";
import { MdDateRange } from "react-icons/md";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection } from "firebase/firestore";
import { db } from "../../firebase";
import LoadingScreen from "../../Shared/LoadingScreen";
//import'./style.css';

const Gallery = (props) => {
  const [value, loading, error] = useCollection(collection(db, "gallery"), {
    snapshotListenOptions: { includeMetadataChanges: true },
  });
  const yearArrayHandler = (array) => {
    const yearArray = array.map((item) => {
      return new Date(item.data().timestamp.toDate()).getFullYear();
    });
    let uniq = (a) => [...new Set(a)];
    return uniq(yearArray).sort().reverse();
  };
  const yearwiseGalleryHandler = (array, year) => {
    const galleryArray = array.map((item) => {
      return (
        new Date(item.data().timestamp.toDate()).getFullYear() === year &&
        item.data()
      );
    });
    return galleryArray;
  };
  return (
    <React.Fragment>
      <MastTitle title="Gallery" />
      {value &&
        yearArrayHandler(value.docs).map((year) => (
          <div className="px-[0.5rem] md:px-[4rem] pt-[4rem] ">
            <div className="flex gap-2 items-center TextOrange text-[34px] mb-12 pl-4 border-l-8 border-[#FB5343] font-bold BackgroundBlur ">
              <MdDateRange />
              <p>{year}</p>
            </div>
            <div className=" grid grid-cols-1 lg:grid-cols-2 gap-12">
              {yearwiseGalleryHandler(value.docs, year).map((gallery) => (
                  <ImageCard gallery={gallery} />
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

export default Gallery;
