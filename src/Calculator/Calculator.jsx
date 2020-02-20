import React, { useReducer } from "react";
import Display from "../Display/Display";
import "./Calculator.css";
import Button from "../Button/Button";

const INITIAL_STATE = {
  totalValue: null,
  displayValue: "0",
  operation: null
};

const resolvePendingOperation = (num1, num2, operationType) => {
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

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_DISPLAY_VALUE":
      let newValue =
        state.displayValue !== "0"
          ? `${state.displayValue}${action.value}`
          : action.value;
      return {
        ...state,
        displayValue: newValue
      };
    case "CLEAR_ALL_VALUES": {
      return INITIAL_STATE;
    }
    case "HANDLE_DELETE_VALUE": {
      let newDisplayValue =
        state.displayValue.length !== 1 ? state.displayValue.slice(0, -1) : "0";

      return {
        ...state,
        displayValue: newDisplayValue.toString()
      };
    }
    case "SET_DECIMAL": {
      let newDisplayValue;
      if (!state.displayValue.includes(".")) {
        newDisplayValue = `${state.displayValue}.`;
      }
      return {
        ...state,
        displayValue: newDisplayValue
      };
    }
    case "SET_PERCENTAGE":
      let newDisplayValue = parseFloat(state.displayValue);
      return {
        ...state,
        displayValue: (newDisplayValue * 0.01).toString()
      };
    case "SET_OPERATION":
      let newTotal;
      if (state.totalValue) {
        newTotal = resolvePendingOperation(
          state.totalValue,
          parseFloat(state.displayValue),
          state.operation
        );
      } else {
        newTotal = parseFloat(state.displayValue);
      }
      return {
        totalValue: newTotal,
        operation: action.operationType,
        displayValue: "0"
      };

    case "SET_EQUAL":
      if (state.operation) {
        const newTotal = resolvePendingOperation(
          state.totalValue,
          parseFloat(state.displayValue),
          state.operation
        ).toString();
        return {
          totalValue: null,
          displayValue: newTotal,
          operation: null
        };
      }
      break;
    default:
      return state;
  }
};

const Calculator = () => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const { displayValue } = state;

  const handleNumberInput = numberValue =>
    dispatch({ type: "SET_DISPLAY_VALUE", value: numberValue });

  const handleClear = () => dispatch({ type: "CLEAR_ALL_VALUES" });

  const handleDelete = () => dispatch({ type: "HANDLE_DELETE_VALUE" });

  const handlePercentage = () => dispatch({ type: "SET_PERCENTAGE" });

  const handleDecimal = () => dispatch({ type: "SET_DECIMAL" });

  const handleOperation = operationType =>
    dispatch({ type: "SET_OPERATION", operationType });

  const handleEquals = () => dispatch({ type: "SET_EQUAL" });

  return (
    <div className="Calculator">
      <Display>{displayValue}</Display>
      <div className="Calculator-row">
        <Button isGrey onClick={handleClear}>
          C
        </Button>
        <Button isGrey onClick={handleDelete}>
          ␡
        </Button>
        <Button isGrey onClick={handlePercentage}>
          %
        </Button>
        <Button isOrange onClick={() => handleOperation("divide")}>
          ÷
        </Button>
      </div>
      <div className="Calculator-row">
        <Button onClick={() => handleNumberInput("7")}>7</Button>
        <Button onClick={() => handleNumberInput("8")}>8</Button>
        <Button onClick={() => handleNumberInput("9")}>9</Button>
        <Button isOrange onClick={() => handleOperation("multiply")}>
          X
        </Button>
      </div>
      <div className="Calculator-row">
        <Button onClick={() => handleNumberInput("4")}>4</Button>
        <Button onClick={() => handleNumberInput("5")}>5</Button>
        <Button onClick={() => handleNumberInput("6")}>6</Button>
        <Button isOrange onClick={() => handleOperation("substract")}>
          -
        </Button>
      </div>
      <div className="Calculator-row">
        <Button onClick={() => handleNumberInput("1")}>1</Button>
        <Button onClick={() => handleNumberInput("2")}>2</Button>
        <Button onClick={() => handleNumberInput("3")}>3</Button>
        <Button isOrange onClick={() => handleOperation("add")}>
          +
        </Button>
      </div>
      <div className="Calculator-row">
        <Button isZero onClick={() => handleNumberInput("0")}>
          0
        </Button>
        <Button onClick={handleDecimal}>.</Button>
        <Button isOrange onClick={handleEquals}>
          =
        </Button>
      </div>
    </div>
  );
};

export default Calculator;
