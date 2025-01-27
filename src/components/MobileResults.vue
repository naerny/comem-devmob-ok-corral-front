<script setup>
const playerId = localStorage.getItem("player_id") ? 1 : 2;
</script>

<template>
  <div class="component-container">
    <h2>Results</h2>
    <h3>Player {{ PlayerId }}</h3>
    <p>Watch Results on the admin screen.</p>
  </div>
</template>

<style scoped></style>