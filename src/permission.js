import router from '@/router';
import cookie from 'js-cookie';
import store from '@/store';
import {Message} from 'element-ui'
// 路由保安系统
router.beforeEach(async (to, from, next) => {
	/* 每次进路由都去cookie中读取一次 效率太低
	 每次这么频繁的操作，就必须进行优化，讲他存放再vuex内存条中
	 
	 EventLoop
	 我先去vuex看看有没有Token
	 如果vuex中没有token
	 如果cookie中都没有了token代表这个用户也跟就没有登录过
	 然后再去检查用户到底去的是不是登陆页面
	 如果去的是登陆页面，那就直接放行
	 如果去的没有登录的用户不能去的路由，我就强制让他去登录路由
	 或者cookie有token，那我先将token存放带vuex，方便下次使用
	 这块代码只能保证你有token
	 但是你的Token待敌是不是仿造的，我们还不清楚*/
	
	
	// 如果用户没有绑定邮箱，就一直提醒
	
	
	
	let token = store.state.token;
	if (!token) { //用户刷新了没有token了 将cookie中的token再次存放到vuex中
		token = cookie.get('rh_id');
		if (!token) { //如果cookie中没有token，代表没登录
			if (to.path === '/login') {
				return next();
			} else {
				return next('/login')
			}
		}
		store.commit('saveToken', token); //存token
		// 第一次没有token就存起来 有token代表 登陆过了
	}
	// const token = cookie.get('rh_id');  //从cookie中读取
	// 去获取个人信息
	// 如果vuex中没有个人信息再去获取个人信息
	let userProfile;
	if (store.state.user.username) { //如果有去store.state.user里拿
		userProfile = store.state.user;
	} else { //如果没有
		// try {
			userProfile = await store.dispatch('getUserProfile'); //异步
		// } catch (error) {
		// 	console.log(error);
		// }
	}
	if (!store.state.user.email) {
		Message({
			type:'warning',
			message:"请先登录邮箱再进行后续操作"
		})
	} else{
		
	}
	// 检查有没有个人信息
	if (!userProfile) { //如果没登
		if (to.path == '/login') {
			next();
		} else {
			next('/login')
		}
	} else {
		// 登陆过的人又翻墙到登录页面 哪来的回哪去
		if (to.path == '/login') {
			next(from);
		} else {
			next()
		}
	}
	// 如果用户直接登录页面
	// if(to.path == '/login' ){
	//     next();
	// }else{
	//     // 看是否有VIP 如果有，检查一下卡是不是假的，如果好着，放行
	//     // 如果过程中有意向有问题，直接送回login
	//     const token = cookie.get('rh_id');
	//     if(!token){
	//         // 没有VIP卡
	//         next('/login');
	//     }else{
	//         next();
	//     }
	//     // 没有会员卡 去跟后端验证一下，这卡是不是假的
	//     // 如何验证 用token去获取一下个人信息，能拿到信息就是好的卡
	// }

})
export default router;
