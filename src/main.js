import Vue from 'vue'
import App from './App.vue'
import routes from './router/router'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'

// import 'bootstrap/dist/css/bootstrap.css'
import '@/assets/style/app.scss'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import {firestorePlugin} from "vuefire";

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.use(firestorePlugin)

Vue.config.productionTip = false

new Vue({
  router: routes,
  render: h => h(App)
}).$mount('#app')
