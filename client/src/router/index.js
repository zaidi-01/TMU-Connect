import AcademicServices from '@/components/AcademicServices.vue';
import ForSale from '@/components/ForSale.vue';
import ItemsWanted from '@/components/ItemsWanted.vue';
import LoginPage from '@/components/LoginPage.vue';
import MyAccount from '@/components/MyAccount.vue';
import NewPost from '@/components/NewPost.vue';
import SignupPage from '@/components/SignupPage.vue';
import { createRouter, createWebHistory } from 'vue-router';
import { authService } from '@/services';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: ForSale,
    },

    {
        path: '/items-wanted',
        name: 'ItemsWanted',
        component: ItemsWanted,
    },

    {
        path: '/academic-services',
        name: 'AcademicServices',
        component: AcademicServices,
    },

    {
        path: '/my-account',
        name: 'MyAccount',
        component: MyAccount,
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