import WsClient from '../websocket/WSClient.js';

const wsClient = new WsClient('ws://localhost:8887');
await wsClient.connect();

document.addEventListener('click', (event) => {
 const position = {
   x: event.clientX,
   y: event.clientY
 };
 wsClient.pub('circle-sync', position);
});