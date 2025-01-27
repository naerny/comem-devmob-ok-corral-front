import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import RessourcesView from '@/views/RessourcesView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },           
    {
      path: "/login",
      name: "login",
      component: LoginView,      
    },
    {
      path: "/register",
      name: "register",
      component: RegisterView,      
    },   
    {
      path: '/ressources',
      name: 'ressources',
      component: RessourcesView,      
    },
  ],
});

export default router;
