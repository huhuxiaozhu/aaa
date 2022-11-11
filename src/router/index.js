import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 引入组件 用懒加载引入
const Login = () => import("@/views/Login/index.vue");
const LayOut = () => import("@/layout/index.vue");

const routes = [
	{
		path: '/',
		component: LayOut
	},
	{
		path: '/login',
		component: Login
	}
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router;
