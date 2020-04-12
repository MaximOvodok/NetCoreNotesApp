import React from "react";
import "./Spinner.scss";

const Spinner = () => {
  return (
    <div className="spinner-box-container">
      <div className="spinner-box">
        <div className="circle-border">
          <div className="circle-core"></div>
        </div>
        <h3>Loading...</h3>
      </div>
    </div>
  );
};

export default Spinner;
