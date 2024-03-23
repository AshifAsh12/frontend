import React from "react";
import "./loader.css";
import DotLoader from "react-spinners/RiseLoader";


const Loader = () => {
  return (
    <div className="loader">
      <div className="svg-wrapper">
       
        <DotLoader color="#ffff" />
        <div className="loading-text"> &nbsp; Loading...</div>
      </div>
    </div>
  );
};

export default Loader;