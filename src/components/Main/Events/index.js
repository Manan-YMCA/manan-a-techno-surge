import React from 'react';
import MastTitle from '../../Shared/MastTitle';
import EventCard from './EventCard';
import { MdDateRange } from "react-icons/md";

import'./style.css';

const Events = (props)=>{
    return (
      <React.Fragment>
        <MastTitle title="Events" />
        {[1, 1, 1, 1].map((year) => (
          <div className="px-[0.5rem] md:px-[4rem] pt-[4rem] ">
            <div className="flex gap-2 items-center TextOrange text-[34px] mb-12 pl-4 border-l-8 border-[#FB5343] font-bold BackgroundBlur ">
              <MdDateRange />
              <p>2022</p>
            </div>
            <div className=" grid grid-cols-1 lg:grid-cols-2 gap-12">
              {[1, 1, 1, 1, 1].map((member) => (
                <EventCard />
              ))}
            </div>
          </div>
        ))}
      </React.Fragment>
    );
};

export default Events ;