import { createRouter, createWebHistory } from "vue-router";
import Home from "./home-page.vue";
import Login from "./login-page.vue";
import Register from "./register-page.vue";
import Account from "./account-page.vue";
import Admin from "./admin-page.vue";
import Challenge from "./challenge-page.vue";

const routes = [
	{ path: "/", component: Home },
	{ path: "/challenge", component: Challenge },
	{ path: "/login", component: Login },
	{ path: "/register", component: Register },
	{ path: "/account", component: Account },
	{ path: "/admin", component: Admin },
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
