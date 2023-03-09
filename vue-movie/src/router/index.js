import {createRouter, createWebHistory} from 'vue-router';
import HomeView from "@/views/HomeView.vue";
import MovieDetailView from "@/views/movie/MovieDetailView.vue";

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView,
    },
    {
        path: '/movie/:id',
        name: 'MovieDetail',
        component: MovieDetailView
    }
]
const router = createRouter({
    history: createWebHistory('/'),
    routes,
});
export default router;