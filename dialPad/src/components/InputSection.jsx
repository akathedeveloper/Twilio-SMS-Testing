// src/components/InputSection.js
import React, { useState } from 'react';
import '../css/InputSection.css';

const InputSection = ({ to, setTo, body, setBody, handleSend }) => {
  return (
    <div className="input-section">
      <form onSubmit={handleSend}>
        <input
          type="text"
          placeholder="To"
          value={to}
          onChange={(e) => setTo(e.target.value)}
        />
        <textarea
          placeholder="Body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default InputSection;