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
									<keep-alive include="Title">
										<router-view></router-view>
									</keep-alive>
                </el-main>
            </el-container>
        </el-container>
    </div>

</template>

<script>
// 1需要在首页获取个人信息
// 获取个人信息需要发送请求 请求需要携带token
// 只能去cookie里拿 操作是在硬盘中操作 小效率低
// 我们可能把token存放在vue中 vuex操作效率高 为啥高？
// 因为vuex中的数据是存放到内存条中的 CPU操作内存条速度比操作硬盘快
// 但vuex中的数据 只要浏览器一刷就全没了
// 要在导航守卫中进行检查
// 

import Header from './header.vue'
import Aside from './aside.vue';
import { url } from '@/axios';
export default {
    components:{
        Aside,
        Header
    },
    data() {
        return {
            // user: {
            //     username: "",
            //     avator: ''
            // }
        }
    },
    computed:{
        // msg(){
        //    return  this.$store.state.msg;
        // }
    },
    methods: {
        // letoff() {
        //     this.$cookie.remove('rh_id');
        //     this.$router.push('/login')
        // },
        cd(){
            // this.$store.state.msg = 1000;
            // 通过mutations修改state的值
            this.$store.commit('changeMsg',20000); //通过commit调用
        }
    },
    // created() {
    //     let token = this.$cookie.get('rh_id');
    //     if (!token) {
    //         this.$message.error("请先登录")
    //         return this.$router.push('/login');
    //     }
        // this.$http({
        //     url: "api/superprofile",
        //     headers: {
        //         authorization: `Bearer ${token}`
        //     }
        // }).then(res => {
        //     if (res.data.status) {
        //         this.$message.error(res.data.msg);
        //     } else {
        //         console.log(res.data);
        //         this.user.username = res.data.username;
        //         this.user.avator = `${url}${res.data.avator}`;
        //         console.log(this.user.avator)
        //     }
        // }).catch(error => {
        //     this.$message.error('接口错误')
        // })
//     }
}
</script>
<style>
#home{
    height: inherit;
    background-color: #f0f2f5;
}
</style>
<style>
.el-container,.el-aside{
    height: inherit;
}
.el-header{
    background-color: #fff;
    padding: 0px;
}
</style>