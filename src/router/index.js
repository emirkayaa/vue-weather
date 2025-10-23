import {createRouter, createWebHistory} from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Profile from '../views/Profile.vue';
import NotFound from '../views/404.vue';
import {useAuthStore} from '../store/auth.js';


const routes = [
    {path: '/', redirect:'/home' , meta: {requiresAuth: true}},
    {path: '/home', name: 'Home', component: Home, meta: {requiresAuth: true}},
    {path: '/login', name: 'Login', component: Login},
    {path: '/profile', name: 'Profile', component: Profile, meta: {requiresAuth: true}},
    {path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound},
]

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    const authStore = useAuthStore()

    if (to.path === '/login') {
        authStore.logout()
        return next()
    }

    if (to.meta.requiresAuth && !authStore.isAuthenticated) {
        return next('/login')
    }

    next()
})

export default router;