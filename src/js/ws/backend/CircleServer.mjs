import WSServerPubSub from '../websocketlibrary/WSServerPubSub.mjs';

const wsServer = new WSServerPubSub({
  port: 8080,
  origins: '*',
});

wsServer.addChannel('circle-sync');

// wsServer.addRpc('create-game', (data, client, wsServer) => {
//   const gameId = parseInt(Math.random() * 1000);
//   wsServer.addChannel(`game-${gameId}`);
//   return { gameId };
// })

wsServer.start();
