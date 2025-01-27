<script setup>
import { useSessionStore } from "@/stores/storeSession.js";
const {sessionPlayers} = useSessionStore();
</script>

<template>
 <div class="component-container">
  <h2>Session Players</h2>
  <p>Players in session:
    <span v-if="sessionPlayers>0">{{ sessionPlayers-1 }}</span>
    <span v-if="sessionPlayers<1">0</span>
  </p>
 </div>
</template>

<style scoped>
</style>