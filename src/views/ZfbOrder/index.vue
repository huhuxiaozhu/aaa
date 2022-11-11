<template>
	<div class="header">
		<el-table :data="tableData" style="width: 100%" :default-sort="{prop: 'date', order: 'descending'}">
			<el-table-column prop="id" label="编号" sortable></el-table-column>
			<el-table-column prop="vip" label="会员" sortable></el-table-column>
			<el-table-column prop="qs_trade_no" label="订单号" sortable></el-table-column>
			<el-table-column prop="total_amount" label="原价" sortable></el-table-column>
			<el-table-column prop="pay_state" :formatter="format" label="交易状态" sortable></el-table-column>
			<el-table-column prop="create_time" label="创建时间" sortable></el-table-column>
			<el-table-column prop="update_time" label="更新时间" sortable></el-table-column>
			<el-table-column label="操作" sortable>
				<el-button @click="success" type="success">刷新记录</el-button>
			</el-table-column>
		</el-table>
		<el-pagination style="width: 100%;text-align: center;margin-top: 20px;" 
			background 
			layout="prev, pager, next" 
			@current-change="handleCurrentChange"
			:total="total"
			v-model="page"
			>
		</el-pagination>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				total: 0,
				page:1,
				tableData: [],
			}
		},
		created() {
			this.rerenderTableData();
		},
		methods: {
			rerenderTableData() {
				this.$http({
					url: `api/alipay_order_query?page=${this.page}`
				}).then(res => {
					console.log(res.data);
					let response = res.data;
					if (response.status == 'success') {
						response.data.forEach(item => {
							item.id = item.id++;
							item.create_time = new Date(item.create_time).toLocaleString(); //转换为年月日
							item.update_time = new Date(item.update_time).toLocaleString(); //转换为年月日
						})
						this.tableData = response.data;
						this.total = (response.count)*10;
					} else {
						this.$message.error(response.msg);
					}
				})
			},
			handleCurrentChange(val){
				console.log(val)
				this.page = val;
				this.rerenderTableData();
			},
			format(row,column,cellValue,index){
				if (cellValue == 'TRADE_CREATE') {
					return "商家订单创建，等待创建支付宝订单"
				} else if(cellValue == 'WAIT_BUYER_PAY'){
					return '交易创建，等待卖家付款'
				}else if(cellValue == 'TRADE_CLOSED'){
					return '未付款交易超时关闭，或支付完成后全额退款'
				}else if(cellValue == 'TRADE_SUCCESS'){
					return '交易支付成功'
				}else if(cellValue == 'TRADE_FINISHED'){
					return '交易结束，不可退款'
				}
			},
			success(){
				this.$http({
					url:'http://81.68.121.52:8000/api/alipay_order_update',
					method:'POST',
					data:`trade_no=${this.tableData.pay_state}`
				}).then(response => {
					let res = response.data;
					if (res.status = 'success') {
						this.$message({
							type: "success",
							message: "修改成功!!",
						});
					} else{
						this.$message.error(response.msg);
					}
				})
			}
		}
	}
</script>

<style scoped>

</style>
