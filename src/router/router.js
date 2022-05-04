import Vue from 'vue'
import VueRouter from 'vue-router'
import RavelrySearchView from "@/views/RavelrySearchView";
import HomeView from "@/views/HomeView";
import FavoritesView from "@/views/FavoritesView";
import BadgesView from "@/views/BadgesView";

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
    component: () => import(/* webpackChunkName: "about" */ '../views/YarnDisplayView.vue'),
    props: true
  },
  {
    path: '/',
    name: 'home',
    component: HomeView,
    props: true
  },
  {
    path: '/favorites',
    name: 'favorites',
    component: FavoritesView,
    props: true
  },
  {
    path: '/badges',
    name: 'badges',
    component: BadgesView,
    props: true
  }
]

const router = new VueRouter({
  routes
})

export default router
