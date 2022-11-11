<template>
	<div class="mark" v-if="state">
		<div class="title_from">
			<el-form class="title_add" ref="ruleForm" :rules="rules" label-position="center" label-width="auto"
				:model="formLabelAlign">
				<el-form-item label="新增编号" prop="id">
					{{value}}
				</el-form-item>
				<el-form-item label="新增标题名称" prop="chapter_name">
					<el-input v-model="formLabelAlign.chapter_name"></el-input>
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
			const validateChapterName = (rule, value, callback) => {
				if (value == "") {
					callback(new Error('请输入标题名称'));
				} else {
					callback();
				}
			}
			return {
				formLabelAlign: {
					chapter_name: ""
				},
				rules: {
					chapter_name: [{
						validator: validateChapterName,
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
			},
			value:{
				type:Number,
				require:true
			}
		},
		methods: {
			submitForm(chapter_name) {
				this.$refs[chapter_name].validate((state) => {
					if (state) {
						console.log(this.formLabelAlign.chapter_name,this.value)
						let chapter_name = this.formLabelAlign.chapter_name;
						let pk = this.value;
						let formData = new FormData();
						formData.append('chapter_name', chapter_name);
						formData.append('pk', pk);
						this.$http({ //发请求
							url: `/api/chapter`,
							method: 'POST',
							data: formData
						}).then(res => {
							let response = res.data;
							if (response.status == 'success') {
								this.formLabelAlign.chapter_name = "";
								this.$emit('cancel');
								this.$message({
									type: 'success',
									message: `${response.msg}`
								})
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
				this.formLabelAlign.chapter_name = "";
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
