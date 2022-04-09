import React from 'react';
import Loader from '../Loader';
//import'./style.css';

const SuspenseLoading = (props)=>{
    return (
      <React.Fragment>
        <div
          open={true}
          className="z-50 bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 h-screen w-screen fixed"
        >
          <div className="flex items-center justify-center h-full">
         <Loader/>
          </div>
        </div>
      </React.Fragment>
    );
};

export default SuspenseLoading ;