import { createRouter, createWebHistory } from 'vue-router'
import AppVue from '@/App.vue';
import HomeView from '@/views/HomeView.vue'
import Login from '@/views/LoginView.vue'


const user = JSON.parse(localStorage.getItem('user'));

var routeView = '';
if (user) {
    routeView = HomeView
} else {
    routeView = Login
}
const router = createRouter({
    history: createWebHistory('/'),
    routes: [

        {
            path: '/',
            name: 'WhatsappWeb',
            // route level code-splitting
            // this generates a separate chunk (login.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: routeView
        }
    ]
})

export default router