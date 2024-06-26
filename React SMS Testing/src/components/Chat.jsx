import React from 'react';
import styled from 'styled-components';
import Message from './Message'; // Import the Message component

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%; /* Adjust width as per your layout */
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 5px;
`;

const Chat = ({ messages, twilioNumber }) => {
  return (
    <ChatContainer>
      {messages.map((message, index) => (
        <Message key={index} message={message} twilioNumber={twilioNumber} />
      ))}
    </ChatContainer>
  );
};

export default Chat;
