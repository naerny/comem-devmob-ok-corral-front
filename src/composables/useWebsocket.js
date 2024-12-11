
import WsClient from '../js/ws/websocketlibrary/WSClient.js';

const wsClient = new WsClient('ws://10.191.56.80:8080');
await wsClient.connect();



export function useWebsocket(gameId) {
    
    function sendPosition(position) {
        wsClient.pub('circle-sync', position);
        wsClient.pub(`game-${gameId}`, position);
    }

  return {
    sendPosition,
    wsClient,
  }
}