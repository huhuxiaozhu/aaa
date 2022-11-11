<template>
	<div>
		<el-table :data="list" style="width: 100%">
			<el-table-column prop="id" label="编号">
			</el-table-column>
			<el-table-column prop="username" label="用户名">
			</el-table-column>
			<el-table-column prop="phone" label="手机号">
			</el-table-column>
			<el-table-column prop="email" label="邮箱">
			</el-table-column>
			<el-table-column prop="gender" :formatter="format" label="性别">
			</el-table-column>
			<el-table-column prop="avator" label="头像">
				<template #default="{row}">
					<el-avatar shape="square" size="small" :src="url+row.avator"></el-avatar>
				</template>
			</el-table-column>
			<el-table-column prop="create_time" label="创建日期">
			</el-table-column>
			<el-table-column prop="update_time" label="更新日期">
			</el-table-column>
			<el-table-column fixed="right" label="操作" width="100">
				<template #default='{row}'>
					<el-button type="danger" size="small" @click="remove(row.id)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>

<script>
	import {
		url
	} from '@/axios';
	export default {
		data() {
			return {
				list: [],
				url
			}
		},
		created() {
			this.render()
		},
		methods: {
			render() {
				this.$http({
					url: 'api/superusers'
				}).then(response => {
					let res = response.data;
					if (res.status == 'error') {
						this.$message.error(res.msg)
					} else {
						res.data.forEach(item => {
							item.id = item.id++;
							item.create_time = new Date(item.create_time).toLocaleString(); //转换为年月日
							item.update_time = new Date(item.update_time).toLocaleString();
						})
						this.list = res.data;
					}
				});
			},
			format(row,column,cellValue,index){
				if (cellValue == 1) {
					return "男"
				} else{
					return '女'
				}
			},
			remove(pk){
				this.$http({
					method:"DELETE",
					data:`pk=${pk}`,
					headers:{
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					url:"api/removesuperuser"
				}).then(response => {
					let res = response.data;
					if (res.data == 'error') {
						this.$message.error(res.msg);
					} else{
						this.$message({
							type:"success",
							message:res.msg
						})
						this.render()
					}
				})
			}
		}
	}
</script>

<style>
</style>
