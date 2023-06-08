import {createRouter as createRouter, createWebHistory} from 'vue-router';
import ichiran from '../components/0201_ichiran.vue';

const routes = [
    {
        path: '/',
        component: ichiran
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;