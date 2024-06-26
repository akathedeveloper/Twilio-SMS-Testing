// src/components/InputSection.js
import React from 'react';
import '../css/InputSection.css'

const InputSection = ({ to, setTo, body, setBody, handleSend }) => (
  <form onSubmit={handleSend}>
    <div className='input-section'>
      <div>
      <label>To:</label>
      <input type="text" value={to} onChange={(e) => setTo(e.target.value)} />
    </div>
    <div>
      <label>Message:</label>
      <textarea value={body} onChange={(e) => setBody(e.target.value)}></textarea>
    </div>
    <button type="submit">Send</button>
    </div>
  </form>
);

export default InputSection;
