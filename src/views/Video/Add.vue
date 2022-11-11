<template>
	<div class="mark" v-if="state">
		<div class="title_from">
			<el-form class="title_add" ref="ruleForm" :rules="rules" label-position="center" label-width="auto"
				:model="formLabelAlign">
				<el-form-item label="章节编号" prop="id">
					{{values}}
				</el-form-item>
				<el-form-item label="视频名称" prop="name">
					<el-input class="wdith" v-model="formLabelAlign.name"></el-input>
				</el-form-item>
				<el-form-item label="视频" prop="mp4_url">
					<el-upload action="http://81.68.121.52:8000/api/chapter_video" list-type="picture-card"
						:on-preview="handlePictureCardPreview" :on-remove="handleRemove" :on-change="change"
						ref="upload" :data="videocount" name="video" :videos="name" :videoss="video_permission"
						:headers="header" :on-success="success">
						<i class="el-icon-plus"></i>
					</el-upload>
					<el-dialog :visible.sync="dialogVisible">
						<img width="100%" :src="dialogImageUrl" alt="">
					</el-dialog>
				</el-form-item>
				<el-form-item label="是否收费" prop="video_permission">
					<el-select v-model="formLabelAlign.value" placeholder="是否收费">
						<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</el-form-item>

				<el-form-item>
					<el-button type="primary" @click="submitFor">确认</el-button>
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
					callback(new Error('请输入视频名称'));
				} else {
					callback();
				}
			}
			return {
				header:{
					authorization:`Bearer ${this.$store.state.token}`
				},
				chapter_id:'',
				name:'',
				video_permission:'',
				dialogImageUrl: '',
				dialogVisible: false,
				options: [{
					value: '1',
					label: '免费'
				}, {
					value: '',
					label: '收费'
				}],
				value: '',
				
				formLabelAlign: {
					name: "",
					value:""
				},
				rules: {
					name: [{
						validator: validateName,
						trigger: "blur"
					}]
					//      自定义函数               触发方式
				},
				videocount: {
					chapter_id:'',
					name:'',
					video_permission:''
				}
			}
		},
		props: {
			state: {
				type: Boolean,
				default () {
					return false
				}
			},
			values: {
				type: Number,
				required: true
			}
		},
		methods: {
			success(res){
				if (res.status == 'error') {
					this.$message.error(res.msg);
				} else{
					this.$message({
						type: 'success',
						message: `${res.msg}:${res.title}`
						
					})
					this.$parent.rerenderTableData()
				
				}
			},
			change(file) {
				console.log(file)
				this.dialogImageUrl = URL.createObjectURL(file.raw)
				this.videocount['name'] = this.formLabelAlign.name
				this.videocount['chapter_id'] = this.values
				this.videocount['video_permission'] = this.formLabelAlign.value
				},
			handleRemove(file, fileList) {
				console.log(file, fileList);
			},
			handlePictureCardPreview(file) {
				this.dialogImageUrl = file.url;
				this.dialogVisible = true;
			},
			submitFor(){
				this.$refs.upload.submit()
				this.$emit('cancel')
			},
			submitForm(name) {
				this.$refs[name].validate((state) => {
					if (state) {
						let name = this.formLabelAlign.name;
						let video = this.dialogImageUrl;
						let video_permission = 1;
						let chapter_id = this.values;
						let formData = new FormData();
						formData.append('name', name);
						formData.append('chapter_id', chapter_id);
						formData.append('video', video);
						formData.append('video_permission', video_permission);
						console.log(name, chapter_id, video, video_permission)
						this.$http({ //发请求
							url: "http://81.68.121.52:8000/api/chapter_video",
							method: 'POST',
							data: formData
						}).then(res => {
							let response = res.data;
							if (response.status == 'success') {
								this.formLabelAlign.name = "";
								this.formLabelAlign.mp4_url = "";
								this.formLabelAlign.video_permission = "";
								this.$emit('cancel');
								this.$message({
									type: 'success',
									message: `${response.msg}:${response.title}`
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
				this.formLabelAlign.name = "";
				this.formLabelAlign.mp4_url = "";
				this.formLabelAlign.video_permission = "";
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
	.wdith {
		width: 300px;
	}

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
