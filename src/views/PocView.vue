<template>
  <main>
    <h1>Create session</h1>
    <div>
      <button @click="create()">Create session</button>
    </div>


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
import { ref } from 'vue';
import { useWebsocket } from '@/composables/useWebsocket.js';
import createSession from '@/utils/apiCalls/createSession.js';

const response = ref('');
const create = async () => {
  console.log('createSession');
  response.value = await createSession();
  console.log(response);
  // ws.send('createSession');
};

// sessionStorage.createSorage();

// const { sendPosition } = useWebsocket(2123);

// document.addEventListener('click', (event) => {
//   const position = {
//     x: event.clientX,
//     y: event.clientY
//   };
//   sendPosition(position);
// });



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