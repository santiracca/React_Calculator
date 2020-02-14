import React from "react";
import "./Button.css";

const Button = ({
  children,
  isZero,
  addToDisplay,
  clearValues,
  deleteValue,
  handlePercent,
  onDecimal,
  onDivide,
  onMultiply,
  onSubstract,
  onAdd,
  onEquals,
  isGrey,
  isOrange,
  onParty
}) => {
  //FUNCTION TO DETERMINE WHAT TYPE OF PROP EVENT GETS EXECUTED IN THE ON CLICK EVENT
  const handleClick = () => {
    if (addToDisplay) {
      addToDisplay();
    } else if (clearValues) {
      clearValues();
    } else if (deleteValue) {
      deleteValue();
    } else if (handlePercent) {
      handlePercent();
    } else if (onDecimal) {
      onDecimal();
    } else if (onDivide) {
      onDivide();
    } else if (onMultiply) {
      onMultiply();
    } else if (onSubstract) {
      onSubstract();
    } else if (onAdd) {
      onAdd();
    } else {
      onEquals();
    }
  };

  //FUNCTION TO SET THE BACKGROUND COLOR OF THE BUTTON
  const buttonColor = () => {
    if (isGrey) {
      return "#A5A6A6";
    } else if (isOrange) {
      return "#ff9e0a";
    }
  };

  const style = {
    color: isGrey ? "#000" : "#fff",
    backgroundColor: isOrange || isGrey ? buttonColor() : "#333333",
    width: isZero ? "100px" : "50px",
    borderRadius: isZero ? "30px" : "50%"
  };

  return (
    <button onClick={handleClick} style={style} className='Button'>
      {children}
    </button>
  );
};

export default Button;
