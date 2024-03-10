import React, { useState, useEffect } from 'react';

const App = () => {
    const [socket, setSocket] = useState(null);
    const [message, setMessage] = useState('');
    const [receivedMessage, setReceivedMessage] = useState('');

    useEffect(() => {
        const ws = new WebSocket('ws://localhost:3001');
        ws.onopen = () => {
            console.log('connected');
            setSocket(ws);
        };
        ws.onmessage = (event) => {
            setReceivedMessage(event.data);
        };
        ws.onclose = () => {
            console.log('disconnected from wss');
            setSocket(null);
        };
        return () => {
            if (socket) {
                socket.close();
            }
        };
    }, []);
    const sendMessage = () => {
        if (socket && message.trim() !== '') {
            socket.send(message);
            setMessage('');
        }
    };
    return (
        <>
            <h1>Grab a Bevy</h1>
            <div>Received message: {receivedMessage}</div>
            <input 
                type="text" 
                value={message} 
                onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={sendMessage}>Send Message</button>
        </>
    )
};

export default App;
