<template>
	<div class="loginview">
		<div class="login-form">
			<h1 class="login-title">系统登录</h1>
			<el-input class="login-input" v-model="login.username" prefix-icon="el-icon-user" placeholder="请输入内容"
				clearable></el-input>
			<el-input class="login-input" prefix-icon="el-icon-lock" placeholder="请输入密码" v-model="login.password"
				show-password clearable></el-input>
			<div class="v-code">
				<!-- 验证码 -->
				<el-input class="login-input v-input" prefix-icon="el-icon-key" placeholder="请输入验证码"
					v-model="login.text">
				</el-input>
				<img :src="imgsrc" class="v-img" @click="changevcode">
			</div>
			<el-button type="primary" class="login-submit" @click="logindl">登录</el-button>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				login: {
					username: "",
					password: "",
					text: "",
					uuid: "",
				},
				imgsrc: "",
				time: "",
			};
		},
		created() {
			this.reRender();
			this.intervalRerender();
		},
		methods: {
			reRender() {
				let uuid = this.uuid();
				this.login.uuid = uuid;
				this.imgsrc = `http://81.68.121.52:8000/api/generateimagecode?uuid=${uuid}`;
			},
			uuid() {
				return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
					var r = Math.random() * 16 | 0,
						v = c == 'x' ? r : (r & 0x3 | 0x8);
					return v.toString(16);
				});
			},
			intervalRerender() { //定时器，一分钟刷新一次
				clearInterval(this.time); //清除定时器
				this.time = setInterval(() => {
					this.reRender();
				}, 1000 * 60);
			},
			changevcode() {
				this.reRender();
				this.intervalRerender();

			},
			logindl() { //登录验证
				this.$http({
					url: "api/supersignin", //发post请求
					method: "POST",
					data: `username=${this.login.username}&password=${this.login.password}&text=${this.login.text}&uuid=${this.login.uuid}`,
				}).then(res => {
					console.log(res.data);
					if (res.data.status == "error") {
						this.$message.error(res.data.msg);
					} else {
						// 将后端的Token存起来 方便后期使用 cookie
						let date = new Date();
						date.setHours(date.getHours() + 10);
						this.$cookie.set('rh_id', res.data.token, {
							expires: date
						});
						this.$store.commit('saveToken', res.data.token)
						this.$message({
							message: `${res.data.username}-${res.data.msg}`,
							type: 'success',
						});
						this.$router.push('/');
					};
					// this.login.username = "";
					// this.login.password = "";
					// this.login.text = "";
					// this.reRender();
					// this.intervalRerender();
				}).catch(error => {
					this.$message.error("登录异常，请稍后重试");
				});
				this.login.username = "";
				this.login.password = "";
				this.login.text = "";
				this.reRender();
				this.intervalRerender();
			},
		},
	};
</script>
<style>
	.login-input input:focus {
		border: 1px solid hsla(0, 0%, 100%, .1);
	}

	.login-input input {
		color: #eee;
		outline: none;
		border: 1px solid hsla(0, 0%, 100%, .1);
		background-color: transparent;
	}
</style>

<style scoped>
	.v-input {
		width: 50%;
		margin: 0 !important;
	}

	.v-img {
		height: 40px;
		cursor: pointer;
	}

	.v-code {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.login-submit {
		width: 100%;
		margin-top: 30px;
	}

	.login-input {
		margin-bottom: 30px;
	}

	.login-title {
		font-size: 26px;
		color: #eee;
		margin: 0 auto 40px;
		text-align: center;
		font-weight: 700;
	}

	.login-form {
		margin: 0 auto;
		width: 450px;
		height: auto;
		padding: 160px 35px 0px 35px;

	}

	.loginview {
		height: inherit;
		background-color: #2d3a4b;
	}
</style>
