
  <script setup>
  import { closeSession } from '../utils/apiCalls/sessionClose.js';
  import { currentSession } from '@/utils/localStorage.js';
  import { useSessionStore } from '@/stores/storeSession.js';
  import { useGameManager } from "@/utils/gameManager.js"
  const { calcResults } = useGameManager();
  const results = calcResults();

</script>

<template>
  <div class="component-container">
    <h2>Results</h2>

    <div class="results">
      <div v-if="results === null">No winners<br>(Seems like we have some cheaters here...)</div>
      <div v-else>Player {{ results.playerId }} won.</div>
    </div>
    <button @click="closeSession(currentSession.getSession().id)">End game and session</button>
  </div>
</template>

<style scoped></style>