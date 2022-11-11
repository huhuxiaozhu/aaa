<template>
	<div >
		<div class="top" style="width: 600px;">
			<el-steps :active="one" align-center class="tops">
				<el-step title="步骤1"></el-step>
				<el-step title="步骤2"></el-step>
			</el-steps>

			<el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign" class="topq">
				<el-form-item label="验证码">
					<el-input v-model="formLabelAlign.name" class="topa"></el-input>
					<el-button @click="click1">验证码</el-button>
				</el-form-item>
				<el-form-item label="新密码">
					<el-input v-model="formLabelAlign.region" class="topa"></el-input>
				</el-form-item>
				<el-form-item label="新密码">
					<el-input v-model="formLabelAlign.type" class="topa"></el-input>
					<el-button @click="click2">确定</el-button>
				</el-form-item>
			</el-form>
		</div>

	</div>
</template>

<script>
	export default {
		data() {
			return {
				one: 0,
				labelPosition: 'left',
				formLabelAlign: {
					name: '',
					region: '',
					type: ''
				}
			}
		},
		methods: {
			click1() {
				this.$http({
					method: "POST",
					url: "/api/superchangepwd",
				}).then(response => {
					let res = response.data;
					if (res.status == 'error') {
						this.$message.error(res.msg);
					} else {
						this.$message({
							type: "success",
							message: res.msg,
						})
						this.one = 1
					}
				})
			},
			click2() {
				this.$http({
					method: "PUT",
					url: "/api/superchangepwd",
					data: `text=${this.formLabelAlign.name}&pwd1=${this.formLabelAlign.region}&pwd2=${this.formLabelAlign.type}`,
					headers: {
						'Content-Type': "application/x-www-form-urlencoded"
					}
				}).then(response => {
					let res = response.data;
					if (res.status == 'error') {
						this.$message.error(res.msg);
					} else {
						this.$message({
							type: "success",
							message: res.msg,
						})
						this.one = 2
					}
				})
			}
		}
	}
</script>

<style scoped>
	.tops {
		margin-bottom: 50px;
	}
	.topa{
		width: 400px;
	}
</style>
