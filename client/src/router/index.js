import Home from '@/components/Home.vue';
import LoginPage from '@/components/LoginPage.vue';
import NewPost from '@/components/NewPost.vue';
import SignupPage from '@/components/SignupPage.vue';
import { createRouter, createWebHistory } from 'vue-router';
import { authService } from '@/services';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },

    {
        path: '/new-post',
        name: 'NewPost',
        component: NewPost,
    },

    {
        path: '/login',
        name: 'Login',
        component: LoginPage,
    },

    {
        path: '/register',
        name: 'Register',
        component: SignupPage,
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach(async (to, from, next) => {
    const publicPages = ['/login', '/register'];
    const authRequired = !publicPages.includes(to.path);

    if (authRequired) {
        const isAuthenticated = await authService.isAuthenticated();

        if (!isAuthenticated) {
            console.log('User is not authenticated. Redirecting to login page.');
            return next('/login');
        }
    }

    next();
});

export default router;