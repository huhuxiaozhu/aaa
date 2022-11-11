<template>
	<div id="header">
		<div class="left">
			<span :class="className" @click="change"></span>
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>首页</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="right">
			<el-dropdown trigger="click">
				<span class="el-dropdown-link">
					<el-image style="width: 36px; height: 36px" class="avator" :src="user.avator"></el-image>
				</span>
				<el-dropdown-menu slot="dropdown">
					<el-dropdown-item>{{user.username}}</el-dropdown-item>
					<el-dropdown-item><div class="aaa" @click="logout">退出登录</div></el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
				className: {
					"el-icon-s-unfold": this.isCollapse,
					"el-icon-s-fold": !this.isCollapse,
					switch: true
				}
			}
		},
		computed: {
			isCollapse(){
				return this.$store.state.isCollapse;
			},
			user() {
				return this.$store.state.user;
			}
		},
		watch: {
			isCollapse(newValue){
				this.className['el-icon-s-unfold'] = newValue;
				this.className['el-icon-s-fold'] = !newValue;
			}
		},
		methods: {
			change() {
				this.$store.commit('changeIsCollapse');
				// this.$EventBus.$emit('changeCollapse'); 
				// this.className['el-icon-s-unfold'] = !this.className['el-icon-s-unfold'];
				// this.className['el-icon-s-fold'] = !this.className['el-icon-s-fold'];
			},
			logout() {
				this.$store.commit('removeToken');
				this.$cookie.remove('rh_id');
				this.$router.push('/login');
				// this.$cookie.remove('rh_id');
				// this.$router.push('/login');
			}
		}
	}
</script>

<style>
	#header .el-breadcrumb {
		display: flex;
		align-items: center;
	}

	#header .el-dropdown-link {
		height: inherit;
		display: flex;
		align-items: center;
		padding: 0px 10px;
	}
	#header .el-dropdown-link:hover{
		background-color: rgba(0, 0, 0, .025);
	}
	.aaa{
		width: 100%;
		height: 100%;
	}
</style>

<style scoped>
	#header {
		height: 60px;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.avator {
		cursor: pointer;
	}
	.right {
		margin-right: 20px;
		height: inherit;
		display: flex;
		align-items: center;
	}
	.left {
		display: flex;
		align-content: center;
	} 
	.switch {
		padding: 0 10px;
		font-size: 30px;
		line-height: 60px;
		cursor: pointer;
		transition: all 500ms;
	}

	.switch:hover {
		background-color: rgba(0, 0, 0, .025);
	}
</style>
