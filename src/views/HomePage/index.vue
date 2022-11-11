<template>
	<div class="home">
		<div class="home_left">
			<p>个人资料</p>
			<div class="home_left_tou" v-if="state">
				<el-upload class="avatar-uploader" ref="upload" :auto-upload="false" :headers="header"
					action="http://81.68.121.52:8000/api/changesuperavator" name="avator">
					<img v-if="imageUrl" :src="imageUrl" class="avatar">
					<i v-else class="el-icon-plus avatar-uploader-icon"></i>
				</el-upload>
				<el-form ref="form" label-width="80px" size="mini" class="home_toux">
					<el-form-item size="large">
						<el-button class="home_touxx" type="primary" @click="submitUpload">确定</el-button>
						<el-button @click="state = false">取消</el-button>
					</el-form-item>
				</el-form>
			</div>
			<div class="home_left_top">
				<span class="el-dropdown-link">
					<el-image :src="user.avator" class="avator"></el-image>
					<p @click="gai">修改头像</p>
				</span>
			</div>
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
				<el-form-item label="登录名称" prop="name">
					<el-input v-model="ruleForm.name"></el-input>
				</el-form-item>
				<el-form-item label="手机号码" prop="region">
					<el-input v-model="ruleForm.region"></el-input>
				</el-form-item>
				<el-form-item label="邮箱地址" prop="address">
					<el-input v-model="ruleForm.address"></el-input>
				</el-form-item>
			</el-form>
		</div>
		<div class="home_right">
			<p>修改密码</p>
			<el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
			  <el-form-item label="密码" prop="pass">
			    <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
			  </el-form-item>
			  <el-form-item label="确认密码" prop="checkPass">
			    <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
			  </el-form-item>
			  <el-form-item>
			    <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
			    <el-button @click="resetForm('ruleForm')">重置</el-button>
			  </el-form-item>
			</el-form>
		</div>
	</div>



</template>

<script>
	export default {
		data() {
			return {
				header: {
					authorization: `Bearer ${this.$store.state.token}`
				},
				imageUrl: '',
				state: false,
				ruleForm: {
					name: 'superadmin',
					region: '15888888888',
					address: '268346@qq.com'
				},
				rules: {
					name: [{
							required: true,
							message: '请输入活动名称',
							trigger: 'blur'
						},
						{
							min: 3,
							max: 5,
							message: '长度在 3 到 5 个字符',
							trigger: 'blur'
						}
					],
					region: [{
						required: true,
						message: '请输入手机号码',
						trigger: 'change'
					}],
					address: [{
						type: 'date',
						required: true,
						message: '请输入邮箱地址',
						trigger: 'change'
					}]
				}
			};
		},
		created() {
			this.imageUrl = this.$store.state.user.avator;
		},
		computed: {
			user() {
				return this.$store.state.user
			}
		},
		methods: {
			submitUpload() {
				this.$refs.upload.submit()
				this.state = false;
			},
			gai() {
				this.state = true;
			},
			onSubmit() {
				this.$refs.upload.submit()
			},
			handleAvatarSuccess(res, file) {
				this.imageUrl = URL.createObjectURL(file.raw);
			},
			beforeAvatarUpload(file) {
				const isJPG = file.type === 'image/jpeg';
				const isLt2M = file.size / 1024 / 1024 < 2;

				if (!isJPG) {
					this.$message.error('上传头像图片只能是 JPG 格式!');
				}
				if (!isLt2M) {
					this.$message.error('上传头像图片大小不能超过 2MB!');
				}
				return isJPG && isLt2M;
			},
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						alert('submit!');
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
			}
		}
	}
</script>

<style scoped>
	.home {
		background-color: white;
	}
.home_right{
	float: right;
	width: 500px;
	border: 1px solid #e7eaec;
	height: 400px;
	padding: 40px;
	background-color: white;
	margin-right: 20px;
}
	.home_left {
		width: 500px;
		padding: 10px;
		height: 500px;
		background-color: white;
		border: 1px solid #e7eaec;
		float: left;
	}

	.home_left_top {
		text-align: center;

	}

	.home_left_top p {
		cursor: pointer;
	}

	.home_left_top .avator {
		width: 200px;
		height: 200px;
		margin-bottom: 20px;
		border-radius: 50%;
		overflow: hidden;
	}

	.home_toux {
		margin-top: 30px;
	}

	.home_left_tou {
		text-align: center;
		border: 1px solid #e7eaec;
		padding: 30px;
		background: white;
		position: absolute;
		left: 300px;
		top: 100px;
		z-index: 999;

	}

	.avatar-uploader .el-upload {
		border: 1px dashed #d9d9d9;
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
	}

	.avatar-uploader .el-upload:hover {
		border-color: #409EFF;
	}

	.avatar-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 178px;
		height: 178px;
		line-height: 178px;
		text-align: center;
	}

	.avatar {
		width: 178px;
		height: 178px;
		display: block;
	}
</style>
<style>
	.home_left_tou .block span {
		width: 200px !important;
		height: 200px !important;
		margin-left: 50px;
	}

	.el-form-item .el-form-item__content {
		margin: 0;
	}
</style>
