import Vue from 'vue'
import VueRouter from 'vue-router'
import RavelrySearchView from "@/views/RavelrySearchView";
import HomeView from "@/views/HomeView";

Vue.use(VueRouter)

const routes = [
  {
    path: '/search',
    name: 'search',
    component: RavelrySearchView,
    props: true
  },
  {
    path: '/stash',
    name: 'yarn stash',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/YarnDisplayView.vue')
  },
  {
    path: '/',
    name: 'home',
    component: HomeView,
    props: true
  }
]

const router = new VueRouter({
  routes
})

export default router
