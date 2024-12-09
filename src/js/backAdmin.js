import WsClient from '../websocket/WSClient.js';

// WebSocket
const wsClient = new WsClient('ws://10.192.111.230:5173');
await wsClient.connect();

// WebSocket Sub
// register click position
wsClient.sub('circle-sync', (position) => {
    console.log('circle-sync', position);
});


