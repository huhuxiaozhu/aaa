<template>
	<div class="loginview">
		<div class="login-form">
			<h1 class="login-title">系统登录</h1>
			<el-input class="login-input" clearable v-model="login.username" placeholder="请输入内容"
				prefix-icon="el-icon-search">
			</el-input>
			<el-input prefix-icon="el-icon-lock" clearable class="login-input" placeholder="请输入密码"
				v-model="login.password" show-password></el-input>
			<div class="v-code">
				<el-input v-model="login.text" class="login-input v-input" prefix-icon="el-icon-key"
					placeholder="请输入验证码"></el-input>
				<img :src="imgsrc" class="v-img" @click="changevcode" />
			</div>
			<el-button type="prima ry" class="login-submit" @click="superlogin">登录</el-button>
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
					uuid: ""
				},
				imgsrc: "",
				time: ""
			}
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
				return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
					var r = (Math.random() * 16) | 0,
						v = c == "x" ? r : (r & 0x3) | 0x8;
					return v.toString(16)
				});
			},
			intervalRerender() {
				clearInterval(this.time);
				this.time = setInterval(() => {
					this.reRender();
				}, 1000 * 60)
			},
			changevcode() {
				this.reRender();
				this.intervalRerender();
			},
			superlogin() {
				this.$http({
					url: "api/supersignin",
					method: "POST",
					data: `username=${this.login.username}&password=${this.login.password}&uuid=${this.login.uuid}&text=${this.login.text}`
				}).then(res => {
					if (res.data.status === "error") {
						this.$message.error(res.data.msg)
					} else {
						//将后端给的Token存起来  方便后期使用  cookie
						let date = new Date();
						console.log(date);
						date.setHours(date.getHours() + 10);
						this.$cookie.set('rh_id', res.data.token, { expires: date });
						this.$store.commit('saveToken', res.data.token)
						this.$message({
							message: `${res.data.username}-${res.data.msg}`,
							type: "success"
						});
						this.$router.push('/')
					}
					this.login.username = "";
					this.login.password = "";
					this.login.text = "";
					this.reRender();
					this.intervalRerender();
				}).catch(error => {});
			}
		}
	}
</script>

<style>
	/* .login-input input:focus{   去除高亮
		border: 1px solid hsla(0, 0%, 100%, .1);  
	} */
	.login-input input {
		/* outline: none; */
		color: #eee;
		border: 1px solid hsla(0, 0%, 100%, .1);
		background-color: transparent;
	}
</style>

<style scoped>
	.v-input {
		width: 50%;
		margin: 0px !important;
	}

	.v-code {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 30px;
	}

	.v-img {
		height: 40px;
		cursor: pointer;
	}

	.login-submit {
		width: 100%;
	}

	.login-input {
		margin-bottom: 30px;
	}

	.loginview {
		height: inherit;
		background-color: #2d3a4b;
	}

	.login-form {
		margin: 0 auto;
		width: 450px;
		height: 200px;
		padding: 160px 35px 0px 35px;
	}

	.login-title {
		font-size: 26px;
		color: #eee;
		margin: 0 auto 40px auto;
		text-align: center;
		font-weight: 700;
	}
</style>
