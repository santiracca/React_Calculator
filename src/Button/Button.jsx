import React from "react";
import "./Button.css";

const Button = ({ children, isZero, onClick, isGrey, isOrange }) => {
  const handleClick = () => {
    onClick();
  };

  //FUNCTION TO SET THE BACKGROUND COLOR OF THE BUTTON
  const buttonColor = () => {
    if (isGrey) {
      return "#A5A6A6";
    } else if (isOrange) {
      return "#ff9e0a";
    } else {
      return "#333333";
    }
  };

  const style = {
    color: isGrey ? "#000" : "#fff",
    backgroundColor: buttonColor(),
    width: isZero ? "100px" : "50px",
    borderRadius: isZero ? "30px" : "50%"
  };

  return (
    <button onClick={handleClick} style={style} className="Button">
      {children}
    </button>
  );
};

export default Button;
