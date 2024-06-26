// src/components/DialPad.js
import React from 'react';
import '../css/DialPad.css';

const DialPad = ({ onDial }) => {
  const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '+'];

  return (
    <div className="dial-pad">
      {numbers.map((num) => (
        <button key={num} className="dial-button" onClick={() => onDial(num)}>
          {num}
        </button>
      ))}
    </div>
  );
};

export default DialPad;
