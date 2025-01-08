<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { isMobile } from './utils/mobileDetect';
import { logout } from './utils/apiCalls/logout.js';

</script>

<template>

  {{ isMobile }}
  <nav>
    <RouterLink to="/">Home</RouterLink>
    <!-- <RouterLink to="/user">Se connecter</RouterLink> -->
    <RouterLink to="/login">Se connecter</RouterLink>
    <RouterLink to="/register">S'inscrire</RouterLink>
    <RouterLink to="/poc">Poc</RouterLink>
    <RouterLink to="/session">Session</RouterLink>
  </nav>
  <button @click="logout">Déconnecter</button>

  <RouterView />
</template>

<style scoped></style>
