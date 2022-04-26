import Vue from 'vue'
import VueRouter from 'vue-router'
import RavelrySearchView from "@/views/RavelrySearchView";

Vue.use(VueRouter)

const routes = [
  {
    path: '/search',
    name: 'search',
    component: RavelrySearchView,
    props: true
  },
  {
    path: '/',
    name: 'yarn stash',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/YarnDisplayView.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
