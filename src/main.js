import Vue from 'vue';
import App from './App.vue';
import router from '@/permission';
import ElementUI from 'element-ui';  // 全局引入会占用大部分内存，导致浪费
import 'element-ui/lib/theme-chalk/index.css';
import 'normalize.css'
import axios from '@/axios'
import Cookie from 'js-cookie'
import store from '@/store'

Vue.use(ElementUI); // 全局引用elementui
// 局部引用 写在需要引用的vue文件上
// import { Button } from element-ui;
// export default {
// 	components: {
// 		Button
// 	}
// }
Vue.config.productionTip = false;
Vue.prototype.$http = axios;
Vue.prototype.$cookie = Cookie;
Vue.prototype.$EventBus = new Vue();



new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')
