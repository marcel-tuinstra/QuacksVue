import {createRouter, createWebHistory} from 'vue-router'
import {authGuard} from "@auth0/auth0-vue";
import AuthService from "@/services/AuthService";
import CallbackView from "@/views/CallbackView.vue";
import HomeView from '@/views/HomeView.vue'
import ProjectsView from '@/views/ProjectsView.vue'
import ProfileView from "@/views/ProfileView.vue";

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
        {
            path: '/callback',
            name: 'callback',
            component: CallbackView
        },
        {
            path: '/',
            name: 'home',
            component: HomeView,
            meta: {title: 'My Dashboard'},
            beforeEnter: customAuthGuard
        },
        {
            path: '/project',
            name: 'project',
            component: ProjectsView,
            meta: {title: 'Project Management'},
            beforeEnter: customAuthGuard
        },
        {
            path: '/profile',
            name: 'profile',
            component: ProfileView,
            meta: {title: 'Profile'},
            beforeEnter: customAuthGuard
        },
    ]
})

router.beforeEach((to, from, next) => {
    document.title = "Quacks | " + to.meta.title || '???';  // Set the document title using the meta title
    next();
});

export default router
