<template>
	<div id="home">
		<el-container>
			<el-aside width="auto">
				<Aside></Aside>
			</el-aside>
		  <el-container>
		    <el-header>
					<Header></Header>
				</el-header>
		    <el-main>
					<router-view></router-view>
				</el-main>
		  </el-container>
		</el-container>
	</div>

</template>

<script>
	// 我需要在首页去获取个人信息
  /* 
		获取个人信息需要发送请求
		请求需要携带token
		只能去cookie里面拿
		cookie操作是在硬盘中操作
		效率肯定低
		我们可以把token存放到vuex中
		vuex操作效率高 为什么高？
		因为vuex中的数据是存放到内存条中 CPU操作内存条速度比操作硬盘快太多了
		但是vuex中的数据 只要浏览器一刷新就全没了
		我们要在导航守卫中进行检查
		先去查看VueX中有没有token 如果有 就正常走
		如果没有 我们去检查cookie中有没有 cookie有token 我们把cookie的token再次存放到vuex中
		然后后续去使用vuex的token达到最高效率
	*/
	import Aside from './aside.vue';
	import Header from './header.vue';
	import { url } from '@/axios';
	export default {
		components: {
			Aside,
			Header
		},
		data() {
			return {}
		}
	}
</script>

<style scoped>
	#home {
		background-color: #f0f2f5;
		height: inherit;
	}
</style>
<style>
	.el-container,
	.el-aside {
		height: inherit;
	}
	.el-header{
		padding: 0px;
		background-color: #fff;
	}
</style>