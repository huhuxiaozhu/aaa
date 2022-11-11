import VueX from 'vuex';
import Vue from 'vue';
import axios from '@/axios';
import { url } from "@/axios";

Vue.use(VueX);

export default new VueX.Store({
	state: {
		msg: "Hello VueX",
		isCollapse: false,
		user: {
			username: "",
			avator: ""
		},
		token: ""
	},
	mutations: {
		removeToken(state){
			state.token = "";
		},
		saveToken(state, token) {
			state.token = token;
		},
		changeMsg(state) {
			state.msg = 10000;
		},
		changeIsCollapse(state) {
			state.isCollapse = !state.isCollapse;
		},
		saveUserProfile(state, payload) {
			state.user.username = payload.username;
			state.user.avator = payload.avator;
		}
	},
	actions: {
		getUserProfile({
			commit
		}) {
			return new Promise((resolve, reject) => {
				axios({
					url: "api/superprofile",
				}).then(res => {
					if (!res.data.status) {
						// 成功了 拿到信息了 接下来到vuex
						res.data.avator = `${url}${res.data.avator}`;
						commit('saveUserProfile', res.data);
						resolve(res.data);
					} else {
						reject(res.data);
					}
				}).catch(error => {
					reject(error);
				})
			})
		}
	}
});

// actions 存放异步操作
// mutations 存放的同步操作
