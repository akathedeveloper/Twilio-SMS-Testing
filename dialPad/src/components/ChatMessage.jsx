// src/components/ChatMessage.js
import React from 'react';
import '../css/ChatMessage.css';

const ChatMessage = ({ message }) => {
  return (
    <div className="chat-message">
      <div className="message-to">To: {message.to}</div>
      <div className="message-body">{message.body}</div>
      <div className="message-info">
        Status: {message.status} | Timestamp: {new Date(message.timestamp).toLocaleString()}
      </div>
    </div>
  );
};

export default ChatMessage;
