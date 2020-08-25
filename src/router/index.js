import Vue from 'vue'
import VueRouter from 'vue-router'
import Actors from '../views/Actors.vue'
import Movies from '../views/Movies.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Actors
  },
  {
    path: '/actors',
    name: 'Actors',
    component: Actors
  },
  {
    path: '/movies',
    name: 'Movies',
    component: Movies
  },
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
