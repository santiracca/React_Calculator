import React from "react";
import "./Display.css";

const Display = ({ children }) => {
  return (
    <div className='Display'>
      <div>{children}</div>
    </div>
  );
};

export default Display;
