import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [displayValue, setDisplayValue] = useState("0");

  const handleClick = (value) => {
    if (displayValue === "0") {
      setDisplayValue(value);
    } else {
      setDisplayValue((prevValue) => prevValue + value);
    }
  };

  const handleClear = () => {
    setDisplayValue("0");
  };

  const calculateResult = () => {
    try {
      const result = eval(displayValue); // eslint-disable-line no-eval
      setDisplayValue(result.toString());
    } catch (error) {
      setDisplayValue("Error");
    }
  };

  return (
    <>
      <div className="calculator-container">
        <h1>Calculator</h1>
        <div className="display">
          <input 
            type="text" 
            value={displayValue} 
            readOnly
          />
        </div>
        <div className="grid">
          <button onClick={() => handleClick("7")}>7</button>
          <button onClick={() => handleClick("8")}>8</button>
          <button onClick={() => handleClick("9")}>9</button>
          <button className="fun" onClick={() => handleClick("+")}>+</button>

          <button onClick={() => handleClick("4")}>4</button>
          <button onClick={() => handleClick("5")}>5</button>
          <button onClick={() => handleClick("6")}>6</button>
          <button className="fun" onClick={() => handleClick("-")}>-</button>

          <button onClick={() => handleClick("1")}>1</button>
          <button onClick={() => handleClick("2")}>2</button>
          <button onClick={() => handleClick("3")}>3</button>
          <button className="fun" onClick={() => handleClick("*")}>*</button>

          <button onClick={() => handleClick("0")}>0</button>
          <button onClick={() => handleClick(".")}>.</button>
          <button className="clear" onClick={handleClear}>C</button>
          <button className="fun" onClick={() => handleClick("/")}>/</button>
          
          <button onClick={calculateResult} className="span-two">Calculate</button>
        </div>
      </div>
    </>
  );
};

export default App;
