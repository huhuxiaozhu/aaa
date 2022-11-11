<template>
	<div id="header">
		<div class="left">
			<span :class="className" @click="change"></span>
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>{{this.$route.meta.title}}</el-breadcrumb-item>
			</el-breadcrumb>
		</div>

		<div class="right">
			<el-dropdown trigger="click" @command="handleCommand">
				<!--trigger="click"点击事件-->
				<span class="el-dropdown-link">
					<el-image :src="user.avator" class="avator"></el-image>
					<i class="el-icon-arrow-down el-icon--right" style="margin-left=0px"></i>
				</span>
				<el-dropdown-menu slot="dropdown">
					<el-dropdown-item command="profile">
						{{user.username}}
					</el-dropdown-item>
					<el-dropdown-item divided command="logout">退出登录</el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>
		</div>
	</div>
</template>
<script>
	import {
		url
	} from '@/axios';
	export default {
		data() {
			return {
				// url: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
				className: {
					"el-icon-s-unfold": this.isCollapse,
					"el-icon-s-fold": !this.isCollapse,
					switch: true
				},
				// state:ture,
				// user: {
				//     username: "",
				//     avator: ''
				// }
			}
		},
		created() {
			this.className['el-icon-s-unfold'] = this.isCollapse;
			this.className['el-icon-s-fold'] = !this.isCollapse;
			document.title = this.$route.meta.title;
		},
		computed: {
			isCollapse() {
				return this.$store.state.isCollapse;
			},
			user() {
				return this.$store.state.user
			}
		},
		watch: {
			isCollapse(newValue) {
				this.className['el-icon-s-unfold'] = newValue;
				this.className['el-icon-s-fold'] = !newValue;
			},
			$route(newValue) {
				document.title = newValue.meta.title;
			}
		},
		methods: {
			change() {
				// this.$EventBus.$emit('changeCollapse');
				// this.className['el-icon-s-unfold'] = !this.className['el-icon-s-unfold'];
				// this.className['el-icon-s-fold'] = !this.className['el-icon-s-fold'];
				this.$store.commit('changeIsCollapse')
			},
			handleCommand(command) {
				if (command == 'logout') {
					this.$store.commit('removeToken'); //调用removeToken
					this.$cookie.remove('rh_id'); //删除rh_id
					this.$router.push('/login'); //跳转
				} else if (command == 'profile') {
					this.$router.push('/profile/index');
				}
			}

		},
	}
</script>
<style>
	#header .el-breadcrumb {
		display: flex;
		align-items: center;
	}

	#header .el-dropdown {
		height: inherit;
		display: flex;
		align-items: center;
		padding: 9px 10px;
		cursor: pointer;
	}

	#header .el-dropdown:hover {
		background-color: rgba(0, 0, 0, .025);
	}
</style>
<style scoped>
	#header {
		height: 60px;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.switch {
		padding: 0px 17px;
		font-size: 25px;
		line-height: 60px;
		cursor: pointer;
		transition: all .3s;
	}

	.switch:hover {
		background-color: rgba(0, 0, 0, .025);
	}

	.left {
		display: flex;
		align-items: center;
	}

	.right {
		display: flex;
		align-items: center;
		padding-right: 17px;
	}

	.avator {
		cursor: pointer;
		border-radius: 10px;
		width: 40px;
		height: 40px;
	}
</style>
