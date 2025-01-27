<script setup>
import { startCountdown, countdown } from '@/utils/countdown.js';
import { ref, onMounted, onUnmounted, watch } from 'vue';
import { fetchOrientation } from '@/utils/deviceOrientation.js';
const PlayerId = localStorage.getItem("player_id") ? 1 : 2;
import { wsClient } from '@/composables/useWebsocket';
import { useSessionStore } from '@/stores/storeSession';
const { getSession } = useSessionStore();
const orientation = ref('');
orientation.value = ref({ alpha: 2, beta: 0, gamma: 0 });

const faceDown = ref(false);
let faceDownChecked = false
const faceHorizontal = ref(false);
let faceHorizontalChecked = false;
faceDown.value = ref(false);
faceHorizontal.value = ref(false);
let triggerTime = 0;
let shootValidity = '';

// Checks that when the counter reaches 0 (and the duel starts), the phone is facind down
watch(countdown, (newVal) => {
  if (newVal === 0) {
    // faceDown.value = true;
    if (faceDownChecked === false && orientation.value.beta < -60 && orientation.value.beta > -120) {
      faceDown.value = true;
      faceDownChecked = true;
    } else if (
      faceDownChecked === false && orientation.value.beta > -60 || faceDownChecked === false && orientation.value.beta < -120) {
      faceDown.value = false;
      faceDownChecked = true;
    }
  }
});

// Checks that the phone is facing horizontally when the shoot button is pressed
const shoot = () => {
  if (faceHorizontalChecked === false && orientation.value.beta < 20 && orientation.value.beta > -20) {
    faceHorizontal.value = true;
    faceHorizontalChecked = true;
    triggerTime = Date.now();
  } else if (
    faceHorizontalChecked === false && orientation.value.beta > 20 || faceHorizontalChecked === false && orientation.value.gamma < -20) {
    faceHorizontal.value = false;
    faceHorizontalChecked = true;
    triggerTime = Date.now();
  }

  checkShootValidity();
};

const checkShootValidity = () => {
  const result = {
    shootValidity,
    triggerTime,
    faceDown,
    faceHorizontal,
    playerId: localStorage.getItem("player_id") ? 1 : 2,
  };

  if (faceDown.value===true && faceHorizontal.value===true) {
    result.shootValidity = true;
    Object.defineProperty(result, 'shootValidity', {
      value: true,
      writable: true,
      enumerable: true,
      configurable: true,
    });
    wsClient.pub(getSession().id, { action: 'playerResult', result })
    return true;
  } else {
    shootValidity = false;
    Object.defineProperty(result, 'shootValidity', {
      value: false,
      writable: true,
      enumerable: true,
      configurable: true,
    });
    wsClient.pub(getSession().id, { action: 'playerResult', result })
    return false;
  }
};





onMounted(() => {
  startCountdown();

  window.addEventListener('deviceorientation', (event) => {
    orientation.value.alpha = event.alpha;
    orientation.value.beta = event.beta;
    orientation.value.gamma = event.gamma;
  });
});

onUnmounted(() => {
  clearInterval(interval);
});
</script>

<template>
  <div class="component-container">
  <h2 v-if="countdown > 0">Get ready</h2>
  <h3>Player {{ PlayerId }}</h3>

  <!-- <p>Alpha: {{ orientation.alpha }}</p>
  <p>Beta: {{ orientation.beta }}</p>
  <p>Gamma: {{ orientation.gamma }}</p>
  {{ faceDown }}
  {{ faceHorizontal }}
  <br>
  {{ faceDownChecked }}
  {{ faceHorizontalChecked }}
  {{ countdown }}
  {{ triggerTime }} -->
  <button v-if="countdown > 0" class="disabled">SHOOT</button>
  <button @click="shoot" class="fullsize" v-else>!!SHOOT!!</button>
</div>
</template>

<style scoped>
button {
  color: white;
  width: 100%;
  /* height: 100vh; */
  border: none;
  padding: 30px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: not-allowed;
  border-radius: 5px;
}

.disabled {
  background-color: grey;
  opacity: 0.5;

  pointer-events: none;
}

.fullsize {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  font-size: 3rem;
  font-weight: bold;
}
</style>