import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '@/views/HomeView.vue'
import MovieList from '@/views/movie/MovieList.vue'
import MovieDetail from '@/views/movie/MovieDetail.vue'
import RecommendList from '@/views/movie/RecommendList.vue'
import TvDetail from '@/views/tv/TvDetail.vue'
import ReviewList from '@/views/reviews/ReviewList.vue'

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
    name: 'MovieList',
    component: MovieList
  },
  {
    path: '/movie/:id',
    name: 'MovieDetail',
    component: MovieDetail
  },
  {
    path: '/tv/:id',
    name: 'TvDetail',
    component: TvDetail
  },
  {
    path: '/recommend',
    name: 'Recommend',
    component: RecommendList
  },
  {
    path: '/reviews',
    name: 'Reviews',
    component: ReviewList
  }
]
const router = createRouter({
  history: createWebHistory('/'),
  routes
})

router.beforeEach((to, from, next) => {
  // console.log(to)
  // console.log(from)

  if (to.name === 'MovieDetail' && from.name === 'MovieList') {
    next()
  } else if (
    to.name === 'MovieList' &&
    from.name === 'MovieDetail' &&
    from.query.currentPage !== undefined &&
    to.query.currentPage === undefined
  ) {
    next({
      path: '/movie',
      query: from.query
    })
  } else {
    next()
  }
})
export default router
