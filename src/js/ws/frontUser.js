import WsClient from './websocketlibrary/WSClient.js';

const wsClient = new WsClient('ws://10.191.46.151:8080');
await wsClient.connect();

document.addEventListener('click', (event) => {
 const position = {
   x: event.clientX,
   y: event.clientY
 };
 wsClient.pub('circle-sync', position);
});