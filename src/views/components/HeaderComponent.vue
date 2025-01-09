<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { isMobile } from '../../utils/mobileDetect';
import userToken from "@/utils/localStorage.js";
import { ref, watchEffect } from 'vue';
import { logout } from '../../utils/apiCalls/logout.js';


const token = ref(userToken);

// Cette fonction sera réexécutée automatiquement quand le localStorage change
watchEffect(() => {
    token.value = userToken.userToken.getUserToken();
});

</script>


<template>
    <div class="containerHeader">
        <nav v-if="token">
            <RouterLink to="/"><span class="material-symbols-outlined">home</span>Home</RouterLink>
            <RouterLink to="/poc"><span class="material-symbols-outlined">stadia_controller</span>Jouer</RouterLink>
            <RouterLink to="/"><button class="material-symbols-outlined" @click="logout">logout</button>Se déconnecter
            </RouterLink>
        </nav>
        <nav v-else>
            <RouterLink to="/"><span class="material-symbols-outlined">home</span>Home</RouterLink>
            <RouterLink to="/login"><span class="material-symbols-outlined">login</span>Se connecter</RouterLink>
            <RouterLink to="/register"><span class="material-symbols-outlined">app_registration</span>S'enregistrer
            </RouterLink>

        </nav>
    </div>
</template>

<style scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.containerHeader {
    margin-top: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
}

nav {
    display: flex;
    justify-content: space-around;
    padding: 1rem;
    background-color: var(--brown);
    border-radius: 30px;
    margin: 0px 15px 0 15px;
    max-width: 800px;
    min-width: 500px;
}

nav a {
    color: var(--beige);
    text-decoration: none;
    font-size: 1rem;
    font-family: 'Rubik', sans-serif;
    display: flex;
    flex-direction: column;
    align-items: center;
}

nav a:hover {
    text-shadow: 0 0 25px var(--beige);
}

nav a.router-link-active span.material-symbols-outlined {
    color: var(--orange);
}
</style>
