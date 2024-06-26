import React from 'react';
import styled from 'styled-components';

const MessageContainer = styled.div`
  background-color: ${(props) => (props.isSender ? '#DCF8C6' : '#FFC0CB')};
  align-self: ${(props) => (props.isSender ? 'flex-end' : 'flex-start')};
  margin: 5px 0;
  padding: 10px;
  border-radius: 10px;
  max-width: 80%;
  position: relative;
`;

const Tag = styled.div`
  font-size: 0.75rem;
  color: ${(props) => (props.isSender ? 'green' : 'red')};
  position: absolute;
  top: -15px;
  ${(props) => (props.isSender ? 'right: 10px;' : 'left: 10px;')}
`;

const MessageContent = styled.div`
  color: black; /* Adjust text color as needed */
`;

const Timestamp = styled.span`
  display: block;
  font-size: 0.75rem;
  color: #999;
  margin-top: 5px;
`;

const Message = ({ message }) => {
  const { body, timeStamp, from } = message;
  const formattedDate = new Date(timeStamp);

  console.log('Message details:', message); // Log message details for debugging

  const isSender = from === "+17084552405"; // Replace with your own number

  return (
    <MessageContainer isSender={isSender}>
      <Tag isSender={isSender}>{isSender ? 'Sent' : 'Received'}</Tag>
      <MessageContent>{body}</MessageContent>
      <Timestamp>{formattedDate.toLocaleString()}</Timestamp>
    </MessageContainer>
  );
};

export default Message;