import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    const [to, setTo] = useState('');
    const [body, setBody] = useState('');
    const [messages, setMessages] = useState([]);

    // Define your ngrok API URL
    const API_URL = 'https://064f-2402-3a80-10d7-7eb2-e099-e5bf-5ed9-1599.ngrok-free.app/api/messages';

    // Create an Axios instance with custom headers
    const axiosInstance = axios.create({
        baseURL: API_URL,
        headers: {
            'ngrok-skip-browser-warning': true  // Set custom header to bypass ngrok warning page
        }
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
            // if (Array.isArray(response.data)) {
            //     setMessages(response.data);
            //     console.log('Messages state updated:', response.data);
            // } else {
            //     console.error('Unexpected response format:', response.data);
            //     setMessages([]);
            // }
        } catch (error) {
            console.error('Error fetching messages:', error);
            setMessages([]);
        }
    };

    // Load messages on component mount
    useEffect(() => {
        fetchMessages();
    }, []);

    return (
        <div className="App">
            <form onSubmit={sendMessage}>
                <div>
                    <label>To:</label>
                    <input type="text" value={to} onChange={(e) => setTo(e.target.value)} />
                </div>
                <div>
                    <label>Message:</label>
                    <textarea value={body} onChange={(e) => setBody(e.target.value)}></textarea>
                </div>
                <button type="submit">Send</button>
            </form>
            <div>
                <h2>Messages</h2>
                <ul>
                    {messages.map((message, index) => (
                        <li key={index}>
                            <strong>From: {message.from} To: {message.to}</strong> - {message.body}
                            <br />
                            <small>Status: {message.status} | Timestamp: {new Date(message.timestamp).toLocaleString()}</small>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default App;
