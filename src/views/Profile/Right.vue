<template>
	<div class="topa">
		<div class="top" style="width: 600px;">
			<el-steps :active="one" align-center class="tops">
				<el-step title="步骤1"></el-step>
				<el-step title="步骤2"></el-step>
				<el-step title="步骤3"></el-step>
				<el-step title="步骤4"></el-step>
			</el-steps>

			<el-form :label-position="labelPosition" label-width="130px" :model="formLabelAlign">
				<el-form-item label="输入旧邮箱">
					<el-input v-model="formLabelAlign.name" class="topa"></el-input>
					<el-button @click="click1">发送邮箱验证码</el-button>
				</el-form-item>
				<el-form-item label="输入旧邮箱验证码">
					<el-input v-model="formLabelAlign.region" class="topa"></el-input>
					<el-button @click="click2">确定</el-button>
				</el-form-item>
				<el-form-item label="输入新邮箱">
					<el-input v-model="formLabelAlign.type" class="topa"></el-input>
					<el-button @click="click3">发送邮箱验证码</el-button>
				</el-form-item>
				<el-form-item label="输入新邮箱验证码" >
					<el-input v-model="formLabelAlign.gender" class="topa"></el-input>
					<el-button @click="click4">确定</el-button>
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
					type: '',
					gender:''
				}
			}
		},
		methods: {
			click1() {
				this.$http({
					method: "POST",
					url: "/api/superchangeemail",
				}).then(response =>{
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
					url: "/api/superchangeemail",
					data: `text=${this.formLabelAlign.region}`,
					headers: {
						'Content-Type': "application/x-www-form-urlencoded"
					}
				}).then(response =>{
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
			},
			click3() {
				this.$http({
					method: "POST",
					url: "/api/superbindnewemail",
					data: `email1=${this.formLabelAlign.type}&email2=${this.formLabelAlign.type}`,
				
					headers: {
						'Content-Type': "application/x-www-form-urlencoded"
					}
				}).then(response =>{
					let res = response.data;
					if (res.status == 'error') {
						this.$message.error(res.msg);
					} else {
						this.$message({
							type: "success",
							message: res.msg,
						})
						this.one = 3
					}
				})
			},
			click4() {
				this.$http({
					method: "PUT",
					url: "/api/superbindnewemail",
					data: `text=${this.formLabelAlign.gender}`,
					headers: {
						'Content-Type': "application/x-www-form-urlencoded"
					}
				}).then(response =>{
					let res = response.data;
					if (res.status == 'error') {
						this.$message.error(res.msg);
					} else {
						this.$message({
							type: "success",
							message: res.msg,
						})
						this.one = 4
						this.formLabelAlign.name=""
						this.formLabelAlign.regio= ''
						this.formLabelAlign.type=''
						this.formLabelAlign.gender=''
					}
				})
			},
		}
	}
</script>

<style scoped>
	.tops {
		margin-bottom: 50px;
	}
	.topa{
			width: 300px;
	}
</style>
