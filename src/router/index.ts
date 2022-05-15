import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/about',
    name: 'about',
    component: AboutView,
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView,
  },
]

const router = new VueRouter({
  routes
  
})

router.replace('/home')
export default router
