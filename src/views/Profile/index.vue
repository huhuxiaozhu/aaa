<template>
	<div class="profile">
		<div class="profile_left">
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
					<p @click="gai" class="xiu">修改头像</p>
				</span>
			</div>
			<el-form :label-position="labelPosition" label-width="80px" :model="user">
				<el-form-item label="账号名称">
					<el-input v-model="user.username"></el-input>
				</el-form-item>
				<el-form-item label="手机号码">
					<el-input v-model="user.phone"></el-input>
				</el-form-item>
				<el-form-item label="性别">
					<el-input v-model="user.gender"></el-input>
				</el-form-item>
				<el-form-item label="邮箱" v-if="user.email">
					<el-input v-model="user.email"></el-input>
				</el-form-item>
				<el-form-item label="邮箱" v-else>
					<el-input v-model="email"></el-input>
					<el-button @click="sendSMS">发送邮箱验证码</el-button>
				</el-form-item>

			</el-form>
		</div>

		<div class="profile_right">
			<p>个人信息</p>
			<div class="down">
				<el-tabs v-model="activeName" @tab-click="handleClick">
					<el-tab-pane label="修改密码" name="first">

						<Left></Left>
					</el-tab-pane>
					<el-tab-pane label="修改邮箱" name="second">

						<Right></Right>
					</el-tab-pane>
				</el-tabs>
			</div>

		</div>
	</div>

</template>

<script>
	import Left from './Left.vue';
	import Right from './Right.vue'
	import {
		mapState
	} from 'vuex';
	export default {
		name: "Profile",
		components: {
			Left,
			Right
		},
		computed: {
			...mapState(['user'])
		},
		data() {
			return {
				activeName: 'first',
				email: '',
				header: {
					authorization: `Bearer ${this.$store.state.token}`
				},
				imageUrl: '',
				state: false,
				labelPosition: 'left',
				formLabelAlign: {
					name: '',
					region: '',
					type: ''
				},
			}
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
			handleClick(tab, event) {
				console.log(tab, event);
			},
			submitUpload() {
				this.$refs.upload.submit()
				this.state = false;
			},
			async sendSMS() {
				let formdata = new FormData();
				formdata.append('email', this.email);
				const response = await this.$http({
					method: "POST",
					url: "/api/superbindemail",
					data: formdata,
				})
				let res = response.data;
				if (res.status == 'error') {
					this.$message.error(res.msg);
				} else {
					let {
						value
					} = await this.$prompt('请输入邮箱中的验证码进行绑定', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
					})
					let response = await this.$http({
						method: "PUT",
						url: "/api/superbindemail",
						data: `text=${value}`,
						headers: {
							'Content-Type': "application/x-www-form-urlencoded"
						}
					})
					let res = response.data;
					if (res.status == 'error') {
						this.$message.error(res.msg)
					} else {
						this.$message({
							type: "success",
							message: res.msg
						})
					}
				}
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
	.profile_left {
		width: 450px;
		background-color: white;
		border: 1px solid #e7eaec;
		padding: 20px;
		border-radius: 5px;
		box-sizing: border-box;
		float: left;
	}

	.xiu {
		cursor: pointer;
		text-align: center;
		margin-bottom: 50px;
	}

	.home_left_top .avator {
		width: 150px;
		height: 150px;
		margin-bottom: 20px;
		border-radius: 50%;
		overflow: hidden;
		margin-left: 50%;
		transform: translate(-50%);
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

	.avatar {
		width: 178px;
		height: 178px;
		display: block;
	}

	.avatar-uploader .el-upload {
		border: 1px dashed #d9d9d9;
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
	}

	.profile_right {
		width: 700px;
		background-color: white;
		height: auto;
		float: right;
		padding: 20px;
	}
</style>
