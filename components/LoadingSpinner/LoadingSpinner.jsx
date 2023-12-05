// LoadingSpinner.js
import React from 'react';
import {Triangle} from 'react-loader-spinner';


const LoadingSpinner = () => {
  return (
    <div className="loading-spinner">
 <Triangle
  height="80"
  width="80"
  color="#22d1ee"
  ariaLabel="triangle-loading"
  wrapperStyle={{}}
  wrapperClassName=""
  visible={true}
/>
    </div>
  );
};

export default LoadingSpinner;
