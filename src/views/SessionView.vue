<script setup>
import { ref, onMounted } from 'vue';
import { getSessions } from '../utils/apiCalls/sessionGet.js';
const sessions = ref([]);

const fetchSessions = async () => {
    try {
        const data = await getSessions();
        sessions.value = data;
    } catch (error) {
        console.error('Error fetching sessions:', error);
    }
};

onMounted(() => {
  fetchSessions();
});

// console.log('sessions', sessions);
</script>

<template>
    <h1>Sessions</h1>
    <ul>
      <li v-for="session in sessions" :key="session.id">{{ session.name }}</li>
    </ul>
</template>

<style scoped></style>