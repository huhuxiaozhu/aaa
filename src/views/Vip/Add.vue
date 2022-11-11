<template>
	<div class="mark" v-if="state">
		<div class="title_from">
			<el-form class="title_add" ref="ruleForm" :rules="rules" label-position="center" label-width="auto"
				:model="formLabelAlign">
				<el-form-item label="新增标题名称" prop="name">
					<el-input v-model="formLabelAlign.name"></el-input>
				</el-form-item>
				<el-form-item label="价格" prop="price">
					<el-input v-model.number="formLabelAlign.price"></el-input>
				</el-form-item>
				<el-form-item label="描述" prop="description">
					<el-input v-model="formLabelAlign.description"></el-input>
				</el-form-item>
				<el-form-item label="原价" prop="origin_price">
					<el-input v-model.number="formLabelAlign.origin_price"></el-input>
				</el-form-item>
				<el-form-item label="天数" prop="expires">
					<el-input v-model.number="formLabelAlign.expires"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="submitForm('ruleForm')">确认</el-button>
					<el-button @click="cancelForm('ruleForm')">取消</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>
<script>
	// $chilren $parent $root $emit props ref注册 this.$refs去找你注册的这个组件
	export default {
		data() {
			const validateName = (rule, value, callback) => {
					if (value == "") {
						callback(new Error('请输入标题名称'));
					} else {
						callback();
					}
				}
					const validateDescription = (rule, value, callback) => {
							if (value == "") {
								callback(new Error('请输入会员描述'));
							} else {
								callback();
							}
						}
				const validatePrice = (rule, value, callback) => {
					if (value == "") {
						 return callback(new Error('请输入会员单价'));
					}
					setTimeout(() => {
						if (!Number.isInteger(value)) {
							callback(new Error("请输入数值"))
						} else {
							callback()
						}
					}, 1000)
				}
				const validateOriginPrice = (rule, value, callback) => {
					if (value == "") {
						 return callback(new Error('请输入会员原价'));
					}
					setTimeout(() => {
						if (!Number.isInteger(value)) {
							callback(new Error("请输入数值"))
						} else {
							callback()
						}
					}, 1000)
				}
				const validateExpires = (rule, value, callback) => {
					if (value == "") {
						 return callback(new Error('请输入会员天数'));
					}
					setTimeout(() => {
						if (!Number.isInteger(value)) {
							callback(new Error("请输入数值"))
						} else {
							callback()
						}
					}, 1000)
				}
			return {
				formLabelAlign: {
					name: "",
					price: "",
					description:"",
					origin_price:"",
					expires:""
				},
				rules: {
					name: [{
						validator: validateName,
						trigger: "blur"
					}],
					price: [{
						validator: validatePrice,
						trigger: "blur"
					}],
					expires: [{
						validator: validateExpires,
						trigger: "blur"
					}],
					description: [{
						validator: validateDescription,
						trigger: "blur"
					}],
					origin_price: [{
						validator: validateOriginPrice,
						trigger: "blur"
					}]
					//      自定义函数               触发方式
				},
			}
		},
		props: {
			state: {
				type: Boolean,
				default () {
					return false
				}
			}
		},
		methods: {
			submitForm(ruleForm) {
				this.$refs[ruleForm].validate((state) => {
					if (state) {
						let name = this.formLabelAlign.name;
						let price = this.formLabelAlign.price;
						let expires = this.formLabelAlign.expires;
						let origin_price = this.formLabelAlign.origin_price;
						let description = this.formLabelAlign.description;
						let formData = new FormData();
						formData.append('name', name);
						formData.append('price', price);
						formData.append('expires', expires);
						formData.append('origin_price', origin_price);
						formData.append('description', description);
						this.$http({ //发请求
							url: "/api/vip",
							method: 'POST',
							data: formData
						}).then(res => {
							let response = res.data;
							console.log(response)
							if (response.status == 'success') {
								this.formLabelAlign.name = "";
								this.formLabelAlign.price = "";
								this.formLabelAlign.expires = "";
								this.formLabelAlign.origin_price = "";
								this.formLabelAlign.description = "";
								this.$emit('cancel');
								this.$message({
									type: 'success',
									message: '会员创建成功'
								})
								console.log(response)
								this.$emit('success')
							} else {
								this.$message.error(response.msg);
							}
						}).catch(error => {
							this.$message.error('接口错误');
						})
					} else {
						return false;
					}
				})
			},
			cancelForm() {
				this.formLabelAlign.name = "";
				this.formLabelAlign.price = "";
				this.formLabelAlign.expires = "";
				this.formLabelAlign.origin_price = "";
				this.formLabelAlign.origin_price = "";
				this.$emit('cancel')
			}
		}
	}
</script>
<style>
	.title_add .el-form-item__content {
		margin-left: 0 !important;
	}

	.mark {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(0, 0, 0, .4);
		z-index: 999;
	}
</style>
<style scoped>
	.title_from {
		width: 400px;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		background-color: #fff;
		padding: 20px;
		border-radius: 5px;
		padding-top: 40px;
	}
</style>
