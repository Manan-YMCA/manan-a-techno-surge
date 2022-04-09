import React from 'react';
import Backdrop from "@mui/material/Backdrop";
import Loader from '../Loader';
//import'./style.css';

const LoadingScreen = (props)=>{
    return (
      <React.Fragment>
        <Backdrop
          open={true}
          className="z-50 dark:bg-gray-600/[0.25] bg-gray-200/[0.25] filter backdrop-blur-sm "
        >
          <div className="flex items-center justify-center h-full">
           <Loader/>
          </div>
        </Backdrop>
      </React.Fragment>
    );
};

export default LoadingScreen ;