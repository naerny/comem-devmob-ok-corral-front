<script setup>
import { isMobile } from '@/utils/mobileDetect';

</script>

<template>
  <main>
    <h1>Duel à OK Corral</h1>
    <button v-if="!isMobile">Créer une session</button>
    <div v-if="isMobile">
      <input type="text" id="inputUsername" placeholder="Username">
      <button @click="sendMessage">Send</button>
    </div>
  </main>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
