<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { isMobile } from './utils/mobileDetect';
import HeaderComponent from './views/components/HeaderComponent.vue';

</script>

<template>
  {{ isMobile }}
  <nav>
    <HeaderComponent />
    <div class="container">
      <div class="form">
        <RouterView />
      </div>
    </div>
  </nav>

  <!-- <RouterView /> -->
</template>

<style scoped>
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
  padding: 20px;
  border-radius: 25px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  min-height: 200px;
  min-width: 300px;
  align-content: center;
}
</style>
