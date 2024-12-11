import { WebSocketServer } from 'ws';
import { storeWs } from '../../stores/storeWs.js';

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', function connection(ws) {
  ws.on('error', console.error);

  ws.on('message', function message(data) { 
    console.log(JSON.parse(data));
    
    // check if data key is orientation
    if (JSON.parse(data).orientation) {
      storeWs.orientation = JSON.parse(data).orientation;
    }



    // Broadcast the message to all connected clients
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
          client.send(data, { binary: false });
      }
  });
    

    
  });

  // ws.send('something');
});
console.log('WebSocket server is running on ws://localhost:8080');