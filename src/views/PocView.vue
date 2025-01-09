<template>
  <main>

    <div v-if="response">
      <h1>Session code: {{ response }}</h1>
      <button @click="startDuel()">Start Duel</button>
      <h2>Players : </h2>
      <ul v-if="players.length > 0">
        <li v-for="player in players" :key="player.id">{{ player.name }}</li>
      </ul>
      <p v-else>No players yet</p>
    </div>
    <div v-else>
      <h1>Create session</h1>
      <button @click="create()">Create session</button>
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
import { ref, onMounted } from 'vue';
import { useWebsocket } from '@/composables/useWebsocket.js';
import createSession from '@/utils/apiCalls/createSession.js';


const response = ref('');
const players = ref([]);

// Vérifie le localStorage au chargement du composant
onMounted(() => {
  const savedSession = localStorage.getItem('sessionCode');
  if (savedSession) {
    response.value = savedSession;
  }
});

const create = async () => {
  response.value = await createSession();
  // Sauvegarde dans le localStorage
  localStorage.setItem('sessionCode', response.value);
  console.log("response - poc", response.value);
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