<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { isMobile } from '../utils/mobileDetect';
import { logout } from '../utils/apiCalls/logout';
import { useLogInStore } from '../stores/storeUserLogIn.js';
const { isLoggedIn } = useLogInStore();

</script>

<template>    
    <div class="containerHeader">
        <br>
        <nav>
            <RouterLink to="/" v-if="!isMobile">
                <span class="material-symbols-outlined">home</span>
                Home
            </RouterLink>
            <RouterLink to="/login" v-if="!isMobile && !isLoggedIn">
                <span class="material-symbols-outlined">login</span>
                Se connecter
            </RouterLink>
            <RouterLink to="/register" v-if="!isMobile && !isLoggedIn">
                <span class="material-symbols-outlined">app_registration</span>
                S'enregistrer
            </RouterLink>            
            <RouterLink @click.native="logout" to="/"  v-if="!isMobile && isLoggedIn">
                <span class="material-symbols-outlined">logout</span>
                Se déconnecter
            </RouterLink>
            <RouterLink to="/ressources" v-if="!isMobile && isLoggedIn">
                <span class="material-symbols-outlined">list</span>
                Ressources
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

@media(max-width: 768px) {
    .containerHeader {
        opacity: 0;
        visibility: hidden;
        display: none;
    }
}
</style>
