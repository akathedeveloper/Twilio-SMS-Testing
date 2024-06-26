import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Chat from './components/Chat';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  max-width: 600px;
  margin: auto;
`;

const ChatContainer = styled.div`
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 20px;
  overflow-y: auto;
  max-height: 400px; /* Adjust max height as needed */
`;

const Form = styled.form`
  display: flex;
  width: 100%;
  margin-top: 10px;
`;

const Input = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  padding: 10px 15px;
  background-color: #007BFF;
  color: white;
  border: none;
  border-radius: 5px;
  margin-left: 10px;
  cursor: pointer;
`;

function App() {
    const [to, setTo] = useState('+917231811204'); // Hardcoded recipient number for demo
    const [body, setBody] = useState('');
    const [messages, setMessages] = useState([]);

    const API_URL = 'https://ba48-223-226-133-13.ngrok-free.app/api/messages';

    const axiosInstance = axios.create({
        baseURL: API_URL,
        headers: {
            'ngrok-skip-browser-warning': true
        }
    });

    const sendMessage = async () => {
        try {
            const response = await axiosInstance.post('/send', null, {
                params: { to, body }
            });
            if (response.data.statusCode === 200) {
                alert('Message sent!');
                fetchMessages();
                setMessages(prevMessages => [
                    ...prevMessages,
                    {
                        body,
                        timeStamp: new Date().toISOString(),
                        from: 'me' // Mark sent messages with 'me'
                    }
                ]);
            } else {
                alert('Failed to send message: ' + response.data.message);
            }
        } catch (error) {
            alert('Failed to send message');
        }
    };

    const fetchMessages = async () => {
        try {
            const response = await axiosInstance.get('/all');
            if (response.data.statusCode === 200) {
                setMessages(response.data.data);
            } else {
                setMessages([]);
            }
        } catch (error) {
            console.error('Error fetching messages:', error);
            setMessages([]);
        }
    };

    useEffect(() => {
        fetchMessages();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        sendMessage();
        setBody('');
    };

    return (
        <Container>
            <ChatContainer>
                <Chat messages={messages} />
            </ChatContainer>
            <Form onSubmit={handleSubmit}>
                <Input type="text" value={body} onChange={(e) => setBody(e.target.value)} placeholder="Type your message..." />
                <Button type="submit">Send</Button>
            </Form>
        </Container>
    );
}

export default App;
