import Vue from 'vue'
import App from './App.vue'
import router from '@/permission'
import ElementUI from 'element-ui';  /* npm i element-ui -S */
import 'element-ui/lib/theme-chalk/index.css';
import "normalize.css"  /* npm install normalize.css */
import axios from '@/axios';  /* npm install axios */
import Cookie from 'js-cookie';  /* npm install js-cookie -S */
import store from '@/store'
// import VueDplayer from 'vue-dplayer';/* npm install dplayer -S */
// import 'vue-dplayer/dist/vue-dplayer.css'
// Vue.use(VueDplayer)

Vue.config.productionTip = false;
Vue.use(ElementUI);    //vue use原理
Vue.prototype.$http = axios;
Vue.prototype.$cookie = Cookie;
Vue.prototype.$EventBus = new Vue();


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
