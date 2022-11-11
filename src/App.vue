<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
	// Promise 解决异步编程 回调地狱
	// Generator 函数 手动函数
	// Async 函数 是Generator的语法糖 Async是自动的
	import { Button } from 'element-ui';
	export default {
		components: {
			Button
		},
		created: async () => {
			async function fn() {
				// await 必须是promise
				// async 函数执行到await这一行 就会暂时打断函数执行 等待await右边的
				// promise执行完毕 并且结果必须是resolve 然后将resolve的返回值
				// 返回到await上 然后继续执行下边的代码
				// 异步代码改成同步的写法
				const a = await Promise.resolve(100);
				console.log(1, a);
				console.log(1000);
				console.log(1000);
				await Promise.resolve(100);
				console.log(2);
				console.log(1000);
				console.log(1000);
				await Promise.resolve(100);
				console.log(3);
				console.log(1000);
				console.log(1000);
				
				// console.log(1);
				
				// 异步
				// 先执行所有的1000
				// 再执行console.log(1,res);console.log(2,res);console.log(3,res);
				
				// Promise.resolve(100).then(res => {
				// 	console.log(1,res);
				// })
				// console.log(1000);
				// console.log(1000);
				// Promise.resolve(100).then(res => {
				// 	console.log(2,res);
				// })
				// console.log(1000);
				// console.log(1000);
				// Promise.resolve(100).then(res => {
				// 	console.log(3,res);
				// })
				// console.log(1000);
				// console.log(1000);
			}
			fn();  // 调用
		}
	}
</script>

<style>
html,
body, 
#app{
	height: 100%;
}
</style>
