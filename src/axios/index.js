import axios from 'axios';
import store from "@/store";

export const url = 'http://81.68.121.52:8000/';


const http = axios.create({
	baseURL: url,   // 默认地址
	timeout: 5000    // 超时处理
})

// 请求拦截器
// 所有的请求在发送出去之前 会先进入到拦截器中 拦截器中的代码执行完毕后
// 再去发送这个请求

// 添加请求拦截器
http.interceptors.request.use(function(config) {
	// 在发送请求之前做些什么
	// cookie拿token 很慢
	// vuex拿 效率最高
	// 我们在请求拦截器中 对请求配置进行了修改 添加了请求头 将token写入
	console.log(config);
	config.headers['authorization'] = `Bearer ${store.state.token}`;
	return config;
}, function(error) {
	// 对请求错误做些什么
	return Promise.reject(error);
});
// 相应拦截器


export default http   // 暴露http
