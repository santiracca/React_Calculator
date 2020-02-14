import React, { useState, useReducer } from "react";
import Display from "../Display/Display";
import "./Calculator.css";
import Button from "../Button/Button";

const Calculator = () => {
  ///STATE VARIABLES
  const [totalValue, setTotalValue] = useState(null);
  const [displayValue, setDisplayValue] = useState("0");
  const [operation, setOperation] = useState(null);

  //FUNCTION TO ADD A NUMBER TO THE DISPLAY
  const handleNumberInput = numberValue => {
    setDisplayValue(
      displayValue !== "0" ? `${displayValue}${numberValue}` : numberValue
    );
  };

  //FUNCTION TO CLEAR ALL ALL INPUT AND RESET THE STATE
  const handleClear = () => {
    setDisplayValue("0");
    setOperation(null);
    setTotalValue(null);
  };

  //FUNCTION TO DELETE THE LAST ELEMENT FROM THE STRING
  const handleDelete = () => {
    setDisplayValue(
      displayValue.length !== 1 ? displayValue.slice(0, -1) : "0"
    );
  };

  //FUNCTION TO RETURN THE ONE PERCENT OF THE CURRENT DISPLAY VALUE
  const handlePercentage = () => {
    const valueToBeOperated = +displayValue;
    if (valueToBeOperated) {
      setDisplayValue((valueToBeOperated * 0.01).toString());
    }
  };

  //FUNCTION TO ADD A DECIMAL POINT TO THE THE DISPLAY VALUE
  const handleDecimal = () => {
    if (!displayValue.includes(".")) {
      setDisplayValue(`${displayValue}.`);
    }
  };

  //FUNCTION SET THE CURRENT OPERATION TYPE
  //IN CASE OF MULTIPLE OPERATIONS, THE FUNCTION WILL FIRST USE THE CURRENT OPERATION TYPE TO OPERATE ON THE TOTAL VALUE IN THE STATE
  // AND THEN SET THE NEW OPERATION TYPE
  const handleOperation = operationType => {
    if (totalValue) {
      setTotalValue(operationHelper(totalValue, +displayValue, operation));
      setOperation(operationType);
      setDisplayValue("0");
    } else {
      setTotalValue(+displayValue);
      setOperation(operationType);
      setDisplayValue("0");
    }
  };

  //FUNCTION TO RETURN THE TOTAL VALUE
  const handleEquals = () => {
    if (operation) {
      const total = operationHelper(totalValue, +displayValue, operation);
      setDisplayValue(total.toString());
      setTotalValue(null);
      setOperation(null);
    }
  };

  //HELPER FUNCTION TO DETERMINE THE TYPE OF OPERATION TO PERFORM
  const operationHelper = (num1, num2, operationType) => {
    if (operationType === "add") {
      return num1 + num2;
    } else if (operationType === "substract") {
      return num1 - num2;
    } else if (operationType === "divide") {
      return num1 / num2;
    } else {
      return num1 * num2;
    }
  };

  return (
    <div className='Calculator'>
      <Display>{displayValue}</Display>
      <div className='Calculator-row'>
        <Button isGrey clearValues={handleClear}>
          C
        </Button>
        <Button isGrey deleteValue={handleDelete}>
          ␡
        </Button>
        <Button isGrey handlePercent={handlePercentage}>
          %
        </Button>
        <Button isOrange onDivide={() => handleOperation("divide")}>
          ÷
        </Button>
      </div>
      <div className='Calculator-row'>
        <Button
          onParty={() => {
            console.log("handle it: ", 7);
          }}
          addToDisplay={() => handleNumberInput("7")}
        >
          7
        </Button>
        <Button
          onParty={() => {
            console.log("handle it: ", 8);
          }}
          addToDisplay={() => handleNumberInput("8")}
        >
          8
        </Button>
        <Button addToDisplay={() => handleNumberInput("9")}>9</Button>
        <Button isOrange onMultiply={() => handleOperation("multiply")}>
          X
        </Button>
      </div>
      <div className='Calculator-row'>
        <Button addToDisplay={() => handleNumberInput("4")}>4</Button>
        <Button addToDisplay={() => handleNumberInput("5")}>5</Button>
        <Button addToDisplay={() => handleNumberInput("6")}>6</Button>
        <Button isOrange onSubstract={() => handleOperation("substract")}>
          -
        </Button>
      </div>
      <div className='Calculator-row'>
        <Button addToDisplay={() => handleNumberInput("1")}>1</Button>
        <Button addToDisplay={() => handleNumberInput("2")}>2</Button>
        <Button addToDisplay={() => handleNumberInput("3")}>3</Button>
        <Button isOrange onAdd={() => handleOperation("add")}>
          +
        </Button>
      </div>
      <div className='Calculator-row'>
        <Button isZero addToDisplay={() => handleNumberInput("0")}>
          0
        </Button>
        <Button onDecimal={handleDecimal}>.</Button>
        <Button isOrange onEquals={handleEquals}>
          =
        </Button>
        <pre>{JSON.stringify({}, null, 2)}</pre>
      </div>
    </div>
  );
};

export default Calculator;
