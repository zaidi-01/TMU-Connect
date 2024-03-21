import { createRouter, createWebHistory } from 'vue-router';
import ForSale from '@/components/ForSale.vue';
import ItemsWanted from '@/components/ItemsWanted.vue';
import AcademicServices from '@/components/AcademicServices.vue';
import MyAccount from '@/components/MyAccount.vue';
import NewPost from '@/components/NewPost.vue';

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

];

const router = createRouter(
    {
        history: createWebHistory(),
        routes,
    });

export default router;