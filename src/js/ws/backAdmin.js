import WsClient from "./websocketlibrary/WSClient.js";

// WebSocket
const wsClient = new WsClient("ws://10.191.57.104:5173");
await wsClient.connect();

// WebSocket Sub
// register click position
wsClient.sub("circle-sync", (position) => {
  console.log("circle-sync", position);
});
