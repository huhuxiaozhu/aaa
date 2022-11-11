<template>
	<div class="header">
		<el-table :data="tableData" style="width: 100%" :default-sort="{prop: 'date', order: 'descending'}">
			<el-table-column prop="id" label="编号" sortable></el-table-column>
			<el-table-column prop="username" label="名称" sortable></el-table-column>
			<el-table-column prop="ip" label="地址" sortable></el-table-column>
			<el-table-column prop="create_time" label="登录" sortable></el-table-column>
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
					url: `api/supersigninlogs?page=${this.page}`
				}).then(res => {
					console.log(res.data);
					let response = res.data;
					if (response.status == 'success') {
						response.data.forEach(item => {
							item.id = item.id++;
							item.create_time = new Date(item.create_time).toLocaleString(); //转换为年月日
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
			}
		}
	}
</script>

<style scoped>

</style>
