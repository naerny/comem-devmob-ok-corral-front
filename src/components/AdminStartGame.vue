<script setup>
import { useGameManager} from "@/utils/gameManager.js"
const { startGame } = useGameManager();
</script>

<template>
 <div class="component-container">
  <h2>Start a game</h2>

  <button @click="startGame()">Start Game</button>
 </div>
</template>

<style scoped>
</style>