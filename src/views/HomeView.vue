<script setup>
import { isMobile } from '@/utils/mobileDetect';
import { useLogInStore } from '@/stores/storeUserLogIn.js';
import AdminAuth from '@/components/AdminAuth.vue';
import AdminSession from '@/components/AdminSession.vue';
import AdminSessionPlayers from '@/components/AdminSessionPlayers.vue';
import AdminStartGame from '@/components/AdminStartGame.vue';
import AdminGame from '@/components/AdminGame.vue';
import AdminResults from '@/components/AdminResults.vue';
import MobileJoin from '@/components/MobileJoin.vue';
import MobileSession from '@/components/MobileSession.vue';
import MobileGame from '@/components/MobileGame.vue';
import MobileResults from '@/components/MobileResults.vue';
const {} = useSessionStore();
const { isLoggedIn } = useLogInStore();
import { useSessionStore } from '@/stores/storeSession.js';
const { hasSession, sessionPlayers } = useSessionStore();
import { useGameManager} from "@/utils/gameManager.js"
const { gameStarted, GameResults } = useGameManager();



</script>

<template>
  <main>
    <h1>Duel à OK Corral</h1>
    <AdminAuth v-if="!isLoggedIn && !isMobile" />
    <AdminSession v-if="!isMobile && isLoggedIn && !GameResults && !gameStarted" />
    <AdminSessionPlayers v-if="!isMobile && hasSession && !GameResults" />
    <AdminStartGame v-if="!isMobile && hasSession && sessionPlayers===3 && !GameResults && !gameStarted" />
    
    <AdminGame v-if="!isMobile && gameStarted" />
    <AdminResults v-if="!isMobile && hasSession && GameResults" />

    <MobileJoin v-if="isMobile && !hasSession" />
    <MobileSession v-if="isMobile && hasSession && !gameStarted && !GameResults" />

    <MobileGame v-if="isMobile && gameStarted" />
    <MobileResults v-if="isMobile && GameResults" />
    
     
  </main>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}
</style>
