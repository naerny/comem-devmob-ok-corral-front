
import WsClient from '../js/ws/websocketlibrary/WSClient.js';

const wsClient = new WsClient('ws://10.191.46.151:8080');
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