<template>
  <main>
    <h1>Poc</h1>
    
    <button @click="startDuel()">Start Duel</button>
    <div>
      <h2>Message from server</h2>
      <div class="message"></div>
    </div>
    
  </main>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { sessionStorage } from '@/utils/localStorage';
import storeSessionData from '@/stores/sessionDataStore.js';
import { WebSocketServer } from 'ws';
import { fetchOrientation } from '@/utils/deviceOrientation';
import {isMobile} from '@/utils/mobileDetect.js';

sessionStorage.createSorage();





const ws = new WebSocket('ws://10.191.56.80:8080');

ws.onopen = function () {
  console.log('Client is connected to server!');
};

ws.onmessage = function (event) {
  console.log('Message from server:', JSON.parse(event.data));

  const message = document.querySelector('.message');
  message.innerHTML = JSON.stringify(event.data);
};

// ws.addEventListener('message', (event) => {
//   console.log('Message from server:', event.data);
// });




document.addEventListener('click', (event) => {
  // const position = {
  //   x: event.clientX,
  //   y: event.clientY
  // };
  // ws.send('Click event! ' + position.x + ' ' + position.y);

  fetchOrientation().then((result) => {
    ws.send('{ "orientation": ' + JSON.stringify(result) + '}');
  });
 
});

ws.onclose = function () {
  console.log('Disconnected from server');
};



function startDuel() {
  ws.send(JSON.stringify({ "type": "startDuel" }));
  // ws.send('startDuel');
}

</script>

<style scoped>
/* Add your styles here */
</style>