// src/components/ChatSection.js
import React from 'react';
import styled from 'styled-components';
import Message from './Message';

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%; /* Fill the available height */
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 5px;
  overflow-y: auto; /* Enable vertical scrolling */
  max-height: calc(100vh - 150px); /* Adjust this value based on your layout */
`;

const ChatSection = ({ messages }) => {
  return (
    <ChatContainer>
      {messages.map((message, index) => (
        <Message key={index} message={message} />
      ))}
    </ChatContainer>
  );
};

export default ChatSection;
