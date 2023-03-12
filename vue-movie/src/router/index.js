import {createRouter, createWebHistory} from 'vue-router';

import HomeView from "@/views/HomeView.vue";
import MovieListView from "@/views/movie/MovieListView.vue";
import MovieDetailView from "@/views/movie/MovieDetailView.vue";
import RecommendListView from "@/views/movie/RecommendListView.vue";
import TvDetailView from "@/views/tv/TvDetailView.vue";

const routes = [
    {
        path: '/',
        name: 'root',
        component: HomeView
    },
    {
        path: '/home',
        name: 'Home',
        component: HomeView
    },
    {
        path: '/movie',
        name: 'MovieListView',
        component: MovieListView,
    },
    {
        path: '/movie/:id',
        name: 'MovieDetail',
        component: MovieDetailView
    },
    {
        path: '/tv/:id',
        name: 'TvDetail',
        component: TvDetailView
    },
    {
        path: '/recommend',
        name: 'Recommend',
        component: RecommendListView
    }
];
const router = createRouter({
    history: createWebHistory('/'),
    routes,
});
export default router;