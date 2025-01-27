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
// import { ref, onMounted, watch } from 'vue';
// import { sessionStorage } from '@/utils/localStorage';
// import storeSessionData from '@/stores/sessionDataStore.js';
// import { WebSocketServer } from 'ws';
// import { fetchOrientation } from '@/utils/deviceOrientation';
// import {isMobile} from '@/utils/mobileDetect.js';
// import {useWebsocket} from '@/composables/useWebsocket.js';

// sessionStorage.createSorage();

const {sendPosition} = useWebsocket(2123);

document.addEventListener('click', (event) => {
 const position = {
   x: event.clientX,
   y: event.clientY
 };
 sendPosition(position);
});



// function startDuel() {
//   ws.send(JSON.stringify({ "type": "startDuel" }));
//   // ws.send('startDuel');
// }

</script>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>