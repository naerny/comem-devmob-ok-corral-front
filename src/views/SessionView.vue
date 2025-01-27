<script setup>
import { ref, onMounted } from 'vue';
// import { getSessions } from '../utils/apiCalls/sessionGet.js';
import { createSession } from '../utils/apiCalls/sessionPost.js';
import { currentSession } from '@/utils/localStorage.js';
const sessions = ref([]);

// const fetchSessions = async () => {
//     try {
//         const data = await getSessions();
//         sessions.value = data;
//     } catch (error) {
//         console.error('Error fetching sessions:', error);
//     }
// };

// onMounted(() => {
//   fetchSessions();
// });

// console.log('sessions', sessions);
</script>

<template>
    <h1>Sessions</h1>
    <button @click="createSession">Créer une session</button>
    <div v-if="currentSession.getSession">
      <h2>Session ouverte</h2>
      <div class="session_code">
        {{ currentSession.getSession()?.session_code}}
      </div>
    </div>
</template>

<style scoped></style>