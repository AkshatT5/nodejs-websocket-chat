const express = require('express');
const app = express();
const server = require('http').createServer(app);

const WebSocket = require('ws');
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.on('close', () => {
    console.log('Client disconnected');
  });

  ws.on('message', (message) => {
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });
});

// Serve static files from the same directory as this script
app.use(express.static(__dirname));

server.listen(3000, () => {
  console.log('Server started on port 3000');
});