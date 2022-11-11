<template>
	<div>
		<Top></Top>
		<div id="main" ref="main" style=" float: left; width: 40%; height: 550px;background-color: white; padding: 20px;border-radius: 10px;">
		
		</div>
		<Right></Right>
	</div>
</template>

<script>
	import * as echarts from 'echarts'
	import Right from './Right.vue'
	import Top from './Top.vue'
	// var myChart = echarts.init(document.getElementById('main'));
	export default {
		name: "Home",
		components: {
			Right,
			Top
		},
		mounted() {
			const myChart = echarts.init(this.$refs.main)
			const option = {
				title: {
					text: '会员管理',
					subtext: '金额',
					left: 'center'
				},
				tooltip: {
					trigger: 'item'
				},
				legend: {
					orient: 'vertical',
					left: 'left'
				},
				series: [{
					name: '人员',
					type: 'pie',
					radius: '50%',
					data: [{
							value: 1048,
							name: '百年会员1'
						},
						{
							value: 735,
							name: '百年会员2'
						},
						{
							value: 580,
							name: '百年会员3'
						},
						{
							value: 484,
							name: '百年会员4'
						},
						{
							value: 300,
							name: '百年会员5'
						}
					],
					emphasis: {
						itemStyle: {
							shadowBlur: 10,
							shadowOffsetX: 0,
							shadowColor: 'rgba(0, 0, 0, 0.5)'
						}
					}
				}]
			};
			myChart.setOption(option)
		}
	}
</script>

<style scoped>

</style>
