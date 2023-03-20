import { createRouter, createWebHistory } from 'vue-router'
import HomePage from './pages/home-page.vue'
import NewPage from './pages/login-page.vue'
import About from './pages/About.vue'
import Register from './pages/register.vue'
import Login from './pages/login.vue'

const routes = [
  {
    path: '/',
    component: HomePage
  },
  {
    path: '/login-page',
    component: NewPage
  },
  {
    path: '/about',
    component: About
  },
  {
    path: '/register',
    component: Register
  },
  {
    path: '/login',
    component: Login
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router