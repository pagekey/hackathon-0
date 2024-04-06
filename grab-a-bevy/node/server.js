const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
    console.log('connected');
    ws.send('hello and welcome');
    ws.on('message', (message) => {

        console.log(`recevied: ${message}`);
        wss.clients.forEach((client) => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                console.log('sending',message.toString())
                client.send(message.toString());
            }
        })
    });
    ws.on('close', () => {
        console.log('disconnected ws')
    });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`)
});
