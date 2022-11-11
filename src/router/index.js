import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 引入组件   懒加载
const Login = () => import("@/views/Login/index");
const LayOut = () => import("@/layout/index");

 // Home
 const Home = () => import("@/views/Home/index");
// Chapter
 const Chapter = () => import("@/views/Chapter/index");
 // Title
 const Title = () => import("@/views/Title/index");
 // Logs
 const Logs = () => import("@/views/Logs/index");
 // Model
 const Model = () => import("@/views/Model/index");
 // Video
 const Video = () => import("@/views/Video/index");
 // Vip
 const Vip = () => import("@/views/Vip/index");
 // WxOrder
 const WxOrder = () => import("@/views/WxOrder/index");
 // ZfbOrder
 const ZfbOrder = () => import("@/views/ZfbOrder/index");
// Manager
 const Manager = () => import("@/views/Manager/index");
 const ManagerInsert = () => import("@/views/Manager/Insert");
// Profile
 const Profile = () => import("@/views/Profile/index");


const routes = [
  {
    path:'/',
		redirect:'/home',
    component:LayOut,
		children:[
			{
				path:'home',
				component:Home,
				meta:{
					title:'首页'
					
				}
			}
		]
  },
	{
		path:'/chapter',
		component:LayOut,
		children:[
			{
				path:'',
				component:Chapter,
				meta:{
					title:'章节管理'
				}
			}
		]
	},
	{
		path:'/profile',
		redirect:'/profile/index',
		component:LayOut,
		children:[
			{
				path:'index',
				component:Profile,
				meta:{
					title:'个人信息'
				}
			}
		]
	},
	{
		path:'/manager',
		component:LayOut,
		redirect:'/manager/index',
		children:[
			{
				path:'index',
				component:Manager,
				meta:{
					title:'查询管理员信息'
				}
			},
			{
				path:'insert',
				component:ManagerInsert,
				meta:{
					title:'新增管理员'
				}
			}
		]
	},
	{
		path:'/title',
		component:LayOut,
		children:[
			{
				path:'',
				component:Title,
				meta:{
					title:'大标题管理'
					
				}
			}
		]
	},
	{
		path:'/logs',
		component:LayOut,
		children:[
			{
				path:'',
				component:Logs,
				meta:{
					title:'登录日志'
				}
			}
		]
	},
	{
		path:'/model',
		component:LayOut,
		children:[
			{
				path:'',
				component:Model,
				meta:{
					title:'模块管理'
				}
			}
		]
	},
	{
		path:'/video',
		component:LayOut,
		children:[
			{
				path:'',
				component:Video,
				meta:{
					title:'视频管理'
				}
			}
		]
	},
	{
		path:'/vip',
		component:LayOut,
		children:[
			{
				path:'',
				component:Vip,
				meta:{
					title:'会员管理'
				}
			}
		]
	},
	{
		path:'/wxorder',
		component:LayOut,
		children:[
			{
				path:'',
				component:WxOrder,
				meta:{
					title:'微信订单'
				}
			}
		]
	},
	{
		path:'/zfborder',
		component:LayOut,
		children:[
			{
				path:'',
				component:ZfbOrder,
				meta:{
					title:'支付宝订单'
				}
			}
		]
	},
  {
    path:'/login',
    component:Login,
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
