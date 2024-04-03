import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/components/Home.vue';
import NewPost from '@/components/NewPost.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
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

];

const router = createRouter(
    {
        history: createWebHistory(),
        routes,
    });

export default router;