<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { isMobile } from './utils/mobileDetect';

</script>

<template>

  {{ isMobile }}
  <nav>
    <RouterLink to="/">Home</RouterLink>
    <!-- <RouterLink to="/user">Se connecter</RouterLink> -->
    <RouterLink to="/login">Se connecter</RouterLink>
    <RouterLink to="/register">S'inscrire</RouterLink>
    <RouterLink to="/poc">Poc</RouterLink>
  </nav>

  <RouterView />
</template>

<style scoped></style>
