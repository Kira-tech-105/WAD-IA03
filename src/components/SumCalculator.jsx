import React, { useState } from 'react';
import './SumCalculator.css';


const SumCalculator = () => {
  const [number1, setNumber1] = useState('');
  
  const [number2, setNumber2] = useState('');
  
  const [sum, setSum] = useState(null);
  
  const [error, setError] = useState('');

  const validateInputsRealtime = (value1, value2) => {
    const trimmed1 = value1.trim();
    const trimmed2 = value2.trim();

    // Pattern to allow valid number characters (digits, decimal point, minus sign)
    // This allows partial entries like "-", ".", "5.", "-5", etc.
    const numberRegex = /^-?\d*\.?\d*$/;

    // Check for invalid characters in first number
    if (trimmed1 !== '' && !numberRegex.test(trimmed1)) {
      setError('Number 1: Please enter a valid number');
      return;
    }

    // Check for invalid characters in second number
    if (trimmed2 !== '' && !numberRegex.test(trimmed2)) {
      setError('Number 2: Please enter a valid number');
      return;
    }

    // Check if inputs are valid numbers (allow partial entries while typing)
    const isValidNumber = (str) => {
      if (str === '' || str === '-' || str === '.' || str === '-.') {
        return true; // Allow partial entries
      }
      const num = parseFloat(str);
      return !isNaN(num);
    };

    // Validate first number
    if (trimmed1 !== '' && !isValidNumber(trimmed1)) {
      setError('Number 1: Please enter a valid number');
      return;
    }

    // Validate second number
    if (trimmed2 !== '' && !isValidNumber(trimmed2)) {
      setError('Number 2: Please enter a valid number');
      return;
    }

    // If one input has a complete valid number but the other is empty, show a hint
    const isCompleteNumber = (str) => {
      if (str === '' || str === '-' || str === '.' || str === '-.') {
        return false; // Not complete
      }
      const num = parseFloat(str);
      // A number is complete if it parses to a valid number and doesn't end with just a decimal point
      return !isNaN(num) && !str.endsWith('.') && str !== '-';
    };

    if (isCompleteNumber(trimmed1) && trimmed2 === '') {
      setError('Please enter Number 2');
      return;
    }

    if (trimmed1 === '' && isCompleteNumber(trimmed2)) {
      setError('Please enter Number 1');
      return;
    }

    // Clear error if inputs are valid
    setError('');
  };

  /**
   * Handles changes in the first number input field
   * @param {Event} e - The change event
   */
  const handleNumber1Change = (e) => {
    const value = e.target.value;
    setNumber1(value);
    // Validate in real-time
    validateInputsRealtime(value, number2);
    // Reset sum when input changes
    setSum(null);
  };

  /**
   * Handles changes in the second number input field
   * @param {Event} e - The change event
   */
  const handleNumber2Change = (e) => {
    const value = e.target.value;
    setNumber2(value);
    // Validate in real-time
    validateInputsRealtime(number1, value);
    // Reset sum when input changes
    setSum(null);
  };

  /**
   * Validates the input values for calculation
   * @returns {boolean} - True if inputs are valid, false otherwise
   */
  const validateInputs = () => {
    // Check if inputs are empty
    if (number1.trim() === '' || number2.trim() === '') {
      setError('Please enter both numbers');
      return false;
    }

    // Check if inputs are valid numbers
    const num1 = parseFloat(number1);
    const num2 = parseFloat(number2);

    if (isNaN(num1) || isNaN(num2)) {
      setError('Please enter valid numbers');
      return false;
    }

    // Clear any previous errors
    setError('');
    return true;
  };

  /**
   * Handles the Calculate Sum button click
   * Validates inputs and calculates the sum
   */
  const handleCalculate = () => {
    if (validateInputs()) {
      const num1 = parseFloat(number1);
      const num2 = parseFloat(number2);
      const result = num1 + num2;
      setSum(result);
    }
  };

  return (
    <div className="sum-calculator">
      <h1>Sum Calculator</h1>
      
      <div className="calculator-container">
        <div className="input-group">
          <label htmlFor="number1">Number 1:</label>
          <input
            id="number1"
            type="text"
            value={number1}
            onChange={handleNumber1Change}
            placeholder="Enter first number"
            className="number-input"
          />
        </div>

        <div className="input-group">
          <label htmlFor="number2">Number 2:</label>
          <input
            id="number2"
            type="text"
            value={number2}
            onChange={handleNumber2Change}
            placeholder="Enter second number"
            className="number-input"
          />
        </div>

        <button 
          onClick={handleCalculate}
          className="calculate-button"
          type="button"
        >
          Calculate Sum
        </button>

        {/* Display error message if validation fails */}
        {error && (
          <div className="error-message" role="alert">
            {error}
          </div>
        )}

        {/* Display result if calculation is successful */}
        {sum !== null && !error && (
          <div className="result-display">
            <div className="result-label">Result:</div>
            <div className="result-value">{sum}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SumCalculator;