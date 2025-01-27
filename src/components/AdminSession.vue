<script setup>
import { createSession } from '../utils/apiCalls/sessionPost.js';
import { closeSession } from '../utils/apiCalls/sessionClose.js';
import { currentSession } from '@/utils/localStorage.js';
import { useSessionStore } from '@/stores/storeSession.js';
const { hasSession } = useSessionStore();
</script>

<template>
 <div class="component-container" v-if="!hasSession">
      <h2>Create session</h2>
      <button @click="createSession">Create session</button>
 </div>
    <div class="component-container" v-if="hasSession">
      <h2>Open session</h2>
      <p>Session code:</p>
      <div class="session_code">
        {{ currentSession.getSession()?.code}}
      </div>
      <button @click="closeSession(currentSession.getSession().id)">Close session</button>      
    </div>
</template>

<style scoped>
.session_code {
  font-size: 2rem;
  font-weight: bold;
  /* margin-bottom: 2rem; */
  border: 5px solid var(--gray);;
  padding: .75rem 1rem;
  border-radius: 5rem;
}
</style>