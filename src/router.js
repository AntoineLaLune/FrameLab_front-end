import { createRouter, createWebHistory } from 'vue-router'
import Home from './Home.vue'
import Login from './Login.vue'
import Register from './Register.vue'
import Account from './Account.vue'
import Admin from './Admin.vue'
import Challenge from './Challenge.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/challenge', component: Challenge },
	{ path: '/login', component: Login },
	{ path: '/register', component: Register },
	{ path: '/account', component: Account },
	{ path: '/admin', component: Admin },
]

const router = createRouter({
	history: createWebHistory(),
	routes
})

export default router
