import React from 'react';
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";
//import'./style.css';

const LoadingScreen = (props)=>{
    return (
      <React.Fragment>
        <Backdrop
          open={true}
          className="z-50 dark:bg-gray-600/[0.25] bg-gray-200/[0.25] filter backdrop-blur-sm "
        >
          <div className="flex items-center justify-center h-full">
            <CircularProgress />
          </div>
        </Backdrop>
      </React.Fragment>
    );
};

export default LoadingScreen ;