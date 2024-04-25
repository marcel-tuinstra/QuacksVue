import {createRouter, createWebHistory} from 'vue-router'
import {authGuard} from "@auth0/auth0-vue";
import AuthService from "@/services/AuthService";
import HomeView from '@/views/HomeView.vue'
import CallbackView from "@/views/CallbackView.vue";

function customAuthGuard(to, from, next) {
    if (from.name === "callback") {
        next();
    }

    AuthService.validateToken()
        .then(response => {
            if (response.data.token && response.data.user) {
                AuthService.loginFromSession(response);
                next(); // Token and user are valid, proceed to the requested route
            } else {
                AuthService.logout();
                authGuard(to, from, next); // Redirect to Auth0 login
            }
        })
        .catch(() => {
            AuthService.logout();
            authGuard(to, from, next); // Fallback to Auth0 login on error
        });
}

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes: [
        {path: '/', name: 'home', component: HomeView, beforeEnter: customAuthGuard},
        {path: '/callback', name: 'callback', component: CallbackView},
    ]
})

export default router
