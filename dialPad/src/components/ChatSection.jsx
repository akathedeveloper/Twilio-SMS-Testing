// src/components/ChatSection.js
import React from 'react';
import ChatMessage from './ChatMessage';
import '../css/ChatSection.css';

const ChatSection = ({ messages }) => {
  return (
    <div className="chat-section">
      <h1>Chats</h1>
      {messages.map((msg, index) => (
        <ChatMessage key={index} message={msg} />
      ))}
    </div>
  );
};

export default ChatSection;