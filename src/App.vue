<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { isMobile } from './utils/mobileDetect';
import { logout } from './utils/apiCalls/logout';
import HeaderComponent from './components/Header.vue';
import { useLogInStore } from '@/stores/storeUserLogIn.js';
import { useSessionStore } from '@/stores/storeSession.js';
import Modal from '@/components/ModalInfo.vue';
import { message } from '@/utils/modalManager.js';
import { useGameManager} from "@/utils/gameManager.js"
const { gameStarted, GameResults, resultsObtained } = useGameManager();
const { isLoggedIn } = useLogInStore();
const { hasSession } = useSessionStore();
import { usePlayerStore} from '@/stores/storePlayers.js';
const { storePlayer1, storePlayer2 } = usePlayerStore();

</script>

<template>
  <!-- <p>Message; {{ message }};</p>
  <p v-if="isLoggedIn">You are logged in</p>
  <p v-if="!isLoggedIn">You are not logged in</p>
  <p>Session {{ hasSession }};</p>
  <p>Game started {{ gameStarted }};</p>
  <p>Game results {{ GameResults }};</p>
  <p>Player 1 {{ storePlayer1 }};</p>
  <p>Player 2 {{ storePlayer2 }};</p>
  <p>Results obtained {{ resultsObtained }};</p> -->
  <nav>
    <HeaderComponent />
    <div class="container">
    <Modal :message="message" />
    <div class="form">
      <RouterView />
    </div>
  </div>
  </nav>

  <!-- <RouterView /> -->
</template>

<style scoped lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.container {
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.form {
  background-color: var(--orange);
  padding: 3rem;
  border-radius: 2rem;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  min-height: 200px;
  min-width: 80vw;
  max-width: calc(100vw - 1rem);
  align-content: center;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  @media (max-width: 768px) {
    min-width: 50vw;
    padding: 1rem; 
  }

  @media(min-width: 992px) {
   max-width: 1140px;
   width: 100%;
   min-width: auto;

  }
}
</style>
