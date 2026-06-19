import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../pages/Dashboard.vue";
import Auth from "../pages/Auth.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [{
        path: '/',
        component: Dashboard
    },
    {
        path: '/Auth',
        component: Auth}
    ]
});

export default router;