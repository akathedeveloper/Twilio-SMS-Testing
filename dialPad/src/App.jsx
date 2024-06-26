import React, { useState, useEffect } from 'react';
import InputSection from './components/InputSection';
import DialPad from './components/DialPad';
import ChatSection from './components/ChatSection';
import axios from 'axios';
import './App.css';

const App = () => {
    const [to, setTo] = useState('');
    const [body, setBody] = useState('');
    const [messages, setMessages] = useState([]);

    // Define your ngrok API URL
    const API_URL = 'https://e506-223-226-133-13.ngrok-free.app/api/messages';

    // Create an Axios instance with custom headers
    const axiosInstance = axios.create({
        baseURL: API_URL,
        headers: {
            'ngrok-skip-browser-warning': true
        },
        withCredentials: true
    });

    // Function to send a message
    const sendMessage = async (e) => {
        e.preventDefault();
        try {
            console.log("Sending TO", to);
            console.log("Body data", body);
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
                        from: 'me'
                    }
                ]);
            } else {
                alert('Failed to send message: ' + response.data.message);
            }
        } catch (error) {
            alert('Failed to send message');
        }
    };

    // Function to fetch all messages
    const fetchMessages = async () => {
        try {
            console.log('Fetching messages...');
            const response = await axiosInstance.get('/all');
            console.log('Fetch messages response status:', response.status);
            console.log('Fetch messages response data:', response.data);

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

    // Load messages on component mount
    useEffect(() => {
        fetchMessages();
    }, []);

    const handleDial = (num) => {
        setTo((prevTo) => prevTo + num);
    };

    return (
        <div className="app">
            <div className="left-section">
                <InputSection to={to} setTo={setTo} body={body} setBody={setBody} handleSend={sendMessage} />
                <DialPad onDial={handleDial} />
            </div>
            <div className="right-section">
                <h1>Chats</h1>
                <ChatSection messages={messages} />
            </div>
        </div>
    );
};

export default App;
