<template>
	<div>
		<div id="main" ref="main" style=" float: right; width: 40%; height: 550px;background-color: white; padding: 20px;border-radius: 10px;">

		</div>
	</div>
</template>

<script>
	import * as echarts from 'echarts'
	// var myChart = echarts.init(document.getElementById('main'));
	export default {
		mounted() {
			const myChart = echarts.init(this.$refs.main)
			const option = {
  title: {
    text: '支付宝订单'
  },
  legend: {
    data: ['查询订单', '刷新订单']
  },
  radar: {
    // shape: 'circle',
    indicator: [
      { name: '商家订单创建，等待创建支付宝订单', max: 6500 },
      { name: '交易创建，等待买家付款 ', max: 16000 },
      { name: '未付款交易超时关闭', max: 30000 },
      { name: '交易支付成功', max: 38000 },
      { name: '交易结束', max: 52000 },
      { name: '等待买家付款', max: 25000 }
    ]
  },
  series: [
    {
      name: 'Budget vs spending',
      type: 'radar',
      data: [
        {
          value: [4200, 3000, 20000, 35000, 50000, 18000],
          name: '查询订单'
        },
        {
          value: [5000, 14000, 28000, 26000, 42000, 21000],
          name: '刷新订单'
        }
      ]
    }
  ]
};
			myChart.setOption(option)
		}
	}
</script>

<style scoped>

</style>
