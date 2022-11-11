import axios from "axios";
import store from "@/store";

export const url = 'http://81.68.121.52:8000/';


// export default axios.create({
//     baseURL: 'http://81.68.121.52:8000/', //默认地址
//     timeout: 5000,  // 超时处理
// })
const http = axios.create({
    baseURL:url,
    timeout:5000
});

// 给http添加请求拦截器
http.interceptors.request.use(function (config) {
    config.headers['authorization'] = `Bearar ${store.state.token}`;
    // 在发送请求之前做些什么
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });
  
export default http;  //暴露http
