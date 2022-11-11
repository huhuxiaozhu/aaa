import router from '@/router';
import cookie from 'js-cookie';
import store from "@/store";

// 路由的保安系统
router.beforeEach(async (to, from, next) => {
	// 每次进路由都去cookie中 读取一次 效率太低
	// 这么频繁的操作 就必须要进行优化 将他存放到vuex内存条中
	/*
		我先去vuex看有没有token
		如果VUEX中没有token
		我去cookie中检查有没有token
		如果cookie中都没有token 代表这个用户压根就没有登录过
		然后再去检查用户到底去的是不是登录页面
		如果去的是登录页面 那就直接放行
		如果去的没有登录的用户不能去的路由 我就强制让他去登录页面
		或者cookie有token 那我先将token存放到VUEX方便下次使用
		
		这块代码只能保证你有token
		但是你的token到底是不是仿造的 我们还不清楚
	*/
	let token = store.state.token;
	// console.log(token);
	if (!token) {
		// 用户刷新了  VUEX中没有token了  将cookie中的token再次存放
		token = cookie.get('rh_id');
		if (!token) {
			// cookie 里面都没有 代表压根没有登录
			if (to.path === '/login') {
				return next();
			} else {
				return next('/login');
			}
		}
		store.commit('saveToken', token);
	}
	// const token = cookie.get('rh_id');
	/*
		代码进行到这里 可以保证token有
		接下来这块代码将进行token的验证
		如何验证？ 直接去拿这个token获取一下个人信息
		如果能拿到这些信息 你的token肯定没有问题 如果拿不到 你的token就是伪造的
		
		先去检查vuex中有没有个人信息
		如果有 那就直接进行下一步 路由的判断
		如果没有 那就获取个人信息
		获取个人的代码 我们写到了vuex中的actions里面
		获取个人信息的请求代码完全可以写到 登录页面 或者 首页的created中
		个人详情信息组件也可能需要个人信息
		在这种情况下 多个组件需使用这份数据 我们就把代码封装到vuex中
		由于这个操作属于异步操作 我们就要封装actions
		actions中的操作我们需要的得知成功或者失败的状态
		所以我将actions设计为 返回一个promise来达到状态的识别
	*/
	// 如果vuex中没有个人信息 再去获取个人信息
	let userProfile;
	if (store.state.user.username) {
		userProfile = store.state.user;
	} else {
		// 去获取个人信息
		try {
			userProfile = store.dispatch('getUserProfile');
		} catch (error) {}
	}

	// if (userProfile) {
	// 	// token 是真的
	// } else { 
	// 	//
	// }
	// 检查有没有个人信息 没有登录
	if (!userProfile) {
		if (to.path == '/login') {
			next();
		} else {
			cookie.remove('rh_id');
			next('/login');
		}
	} else {
		// 登录过的人  又翻墙来到登录页面 怎么办 哪来的回哪去
		if (to.path == '/login') {
			next(from);
		} else {
			next();
		}
	}

	// // 如果用户直接去登录页面，那就正常流程
	// if (to.path == '/login') {
	// 	next();
	// } else {
	// 	// 小伙子看看有没有VIP卡 如果有卡，检查一下卡是不是假的  如果都好着 放走，正常流程
	// 	// 如果检查过程中有没有问题，有任何问题，就跳转至登录页面
	// 	const token = cookie.get('rh_id');
	// 	if (!token) {
	// 		// 没有会员卡
	// 		next('/login');
	// 	} else {
	// 		next()
	// 	}
	// 	//检查是不是假的 用token获取个人信息，是不是正确的

	// 	// if () {

	// 	// }
	// }
})

export default router;
