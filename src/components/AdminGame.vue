<template>
   <div class="component-container">
    <h2 v-if="countdown>0">Get ready!</h2>
    <div class="countdown">
      <p v-if="countdown>0">{{ countdown }}</p>
        <h1 v-else>BANG BANG!</h1>
    </div>
   </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { startCountdown, countdown } from '@/utils/countdown.js';
  
  const countdownDisplay = ref(countdown);

  
  onMounted(() => {
    startCountdown();
  });
  
  </script>
  
  <style scoped>
  .countdown {
    font-size: 2em;
    text-align: center;
    margin-top: 20px;
  }
  </style>