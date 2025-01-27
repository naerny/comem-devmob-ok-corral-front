<script setup>
import { createGame } from "@/utils/apiCalls/gamePost.js"
import { useGameManager} from "@/utils/gameManager.js"
const { gameStarted, startGame } = useGameManager();
</script>

<template>
 <div class="component-container">
  <h2>Start a game</h2>

  <button @click="startGame()">Start Game</button>
 </div>
</template>

<style scoped>
</style>