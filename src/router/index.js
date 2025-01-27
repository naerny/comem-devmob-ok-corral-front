import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import UserView from '../views/UserView.vue'
import PocView from '../views/PocView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import SessionView from '@/views/SessionView.vue'
import RessourcesView from '@/views/RessourcesView.vue'
import { useSessionStore } from '@/stores/storeSession.js';
const { hasSession } = useSessionStore();


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue'),
    // },
    {
      path: "/user",
      name: "user",
      component: UserView,
    },    
    {
      path: "/login",
      name: "login",
      component: LoginView,
      // meta: { requiresAuth: true },
    },
    {
      path: "/register",
      name: "register",
      component: RegisterView,
      // meta: { requiresAuth: true },
    },   
    {
      path: '/ressources',
      name: 'ressources',
      component: RessourcesView,
      // meta: { requiresAuth: true },
    },
  ],
});


// router.beforeEach((to, from, next) => {
//   if (to.matched.some(record => record.meta.requiresAuth)) {
//     if (hasSession) {
//       next({
//         path: '/',
//         // query: { redirect: to.fullPath } // Save the intended route for redirection after login
//       });
//     } else {
//       next();
//     }
//   } else {
//     next();
//   }
// });

export default router;
