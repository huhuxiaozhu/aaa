<template>
	<div>
		<header class="title_header">
			<el-button type="primary" @click="showAdd">新增视频</el-button>
		</header>
		<Add :values="values" :state="state" @cancel="cancel" @success="success"></Add>

		<el-tree @current-change="handid" :titleid="titleid" class="filter-tree" :data="data" ref="tree">
		</el-tree>
		<div class="el-icon-close x" v-if="close" @click="closee"></div>
		<div ref="player" id="player" v-if="close"></div>
		
		<el-table :data="tableData" style="width: 83.5%;float: right;"
			:default-sort="{prop: 'date', order: 'descending'}">
			<el-table-column prop="id" label="编号" sortable></el-table-column>
			<el-table-column prop="name" label="名称" sortable></el-table-column>
			<el-table-column prop="mp4_url" label="视频" sortable></el-table-column>
			<el-table-column prop="chapter_id" label="章节编号" sortable></el-table-column>
			<el-table-column prop="video_permission" :formatter="format" label="是否免费" sortable></el-table-column>
			<el-table-column prop="create_time" label="创建时间" sortable></el-table-column>
			<el-table-column prop="update_time" label="更新日期" sortable></el-table-column>
			<el-table-column label="操作"><template #default="scope">
					<el-button size="mini" type="success" @click="open(scope.$index, scope.row)">播放</el-button>

					<el-button size="mini" type="info" @click="handleEdit(scope.$index, scope.row)"
						v-loading.fullscreen.lock="fullscreenLoading">编辑</el-button>

					<el-dialog title="" :visible.sync="dialogFormVisible">
						<el-form :model="form" id="okk">
							<el-form-item label="编号：" :label-width="formLabelWidth">
								<el-form-item v-model="form.id" autocomplete="off">{{form.id}}</el-form-item>
							</el-form-item>
							<el-form-item label="名称：" :label-width="formLabelWidth">
								<el-input v-model="form.name" autocomplete="off"></el-input>
							</el-form-item>
						</el-form>
						<div slot="footer" class="dialog-footer">
							<el-button @click="upcancel">取 消</el-button>
							<el-button type="primary" @click="updateok(scope.$index,scope.row)">确 定</el-button>
						</div>
					</el-dialog>

					<el-button style="margin-left: 10px" size="mini" type="danger"
						@click="handleDelete(scope.$index, scope.row)" v-loading.fullscreen.lock="fullscreenLoading">删除
					</el-button>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>
<script>
	import Add from './Add';
	import DPlayer from 'dplayer'
	export default {
		name: "Title",
		components: {
			Add,
		},
		data() {
			return {
				close:false,
				data: [],
				defaultProps: {
					children: 'children',
					label: 'label'
				},
				tableData: [],
				titleid: 25,
				values: 25,
				state: false,
				//新加--------一大堆---------------------
				fullscreenLoading: false,
				upindex: 0,
				dialogFormVisible: false,
				form: {
					name: '',
					date1: '',
					date2: '',
					delivery: false,
					type: [],
					resource: '',
					desc: ''
				},

				formLabelWidth: '100px',
				//-------------------------

			}
		},
		created() {
			this.rerenderTableData();
			this.rerenderTableDatas();
		},
		methods: {
			closee(){
				this.close = false
			},
			open(index,row) {
				this.close = true
				let newtvideo = this.tableData[index].mp4_url; 
				let newvideo = newtvideo.indexOf('.');
				let newbideos = newtvideo.slice(0,newvideo)
				const dp = new DPlayer({
					container: this.$refs.player,
					video: {
						url: `http://81.68.121.52:9000/api/videoplay?path=${newbideos}`
					}
				})
			},
			format(row, column, cellValue, index) {
				if (cellValue == '1') {
					return "免费"
				} else if (cellValue == '2') {
					return '收费'
				}
			},
			handid(a, b) {
				console.log(a, b)
				if (b.level == 2) {
					this.titleid = a.id
					this.values = a.id
				}
				this.rerenderTableData();
			},
			rerenderTableDatas() {
				this.$http({
					url: 'api/classify',
				}).then(res => {
					// 第一层 大标题
					// 第二层 章节14个数组  14个数组每一个都要进行重组
					let datas = res.data.data;
					let newArr = []
					datas.forEach(item => {
						newArr.push(this.$http({
							url: 'api/chapter',
							params: {
								pk: item.id
							}
						}))
					})
					Promise.all(newArr).then(res => {
						// 一次性得到14个数组
						// 对14个数组先进行重组 重组完丢进children属性
						res.forEach((item, index) => {
							// item是每一个response
							let arr = [];
							item.data.data.forEach(item1 => {
								arr.push({
									id: item1.id,
									label: item1.name
								})
							})
							this.data.push({
								id: datas[index].id,
								label: datas[index].name,
								children: arr
							})
						})
					})
				})
			},
			rerenderTableData() {
				this.$http({
					url: `api/chapter_video?pk=${this.titleid}`,
				}).then(res => {
					console.log(res.data);
					let response = res.data;
					if (response.status == 'success') {
						response.data.forEach(item => {
							item.id = item.id++;
							item.create_time = new Date(item.create_time).toLocaleString(); //转换为年月日
							item.update_time = new Date(item.update_time).toLocaleString();
						})
						this.tableData = response.data;
					} else {
						this.$message.error(response.msg);
					}
				})
			},
			//点击编辑按钮后--------------获取数组index个数据
			handleEdit(index, row) {
				this.dialogFormVisible = true
				this.upindex = index;
				let newtable = this.tableData[index];
				let keys = Object.keys(this.form);
				this.form.name = newtable.name;
				this.form.id = newtable.id;
				this.$emit('nameindex', newtable);
				console.log(newtable)
				console.log(this)
			},
			//弹窗里面的确认按钮---------------------
			updateok(index, row) {
				console.log(this.form.name)
				this.$confirm('确认修改文件, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'denger'
				}).then(() => {
					//调PUT接口-------------------------------------
					this.fullscreenLoading = true;
					this.$http({
						url: "/api/chapter_video",
						method: "PUT",
						//--------------------------pk这样传参的------
						data: `pk=${this.form.id}&name=${this.form.name}`,
						headers: {
							'Content-Type': "application/x-www-form-urlencoded"
						}
					}).then(res => {
						this.fullscreenLoading = false;

						let response = res.data;
						// console.log(response)
						if (response.status == 'success') {
							// console.log(response.status)
							this.$message({
								type: "success",
								message: "修改成功!!",
							});
							this.rerenderTableData();
						} else {
							this.$message.error(response.msg);
						}
					}).catch(error => {
						this.$message.error('接口错误');
					})
				}).catch(() => {
					this.fullscreenLoading = false;
					this.$message({
						type: 'info',
						message: '已取消修改'
					});
				});
				this.dialogFormVisible = false;
			},
			upcancel() {
				this.dialogFormVisible = false;
			},
			handleDelete(index, row) {
				this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'denger'
				}).then(() => {
					this.fullscreenLoading = true;
					this.$http({
						url: "/api/chapter_video",
						method: "DELETE",
						data: `pk=${row.id}`,
						headers: {
							'Content-Type': "application/x-www-form-urlencoded"
						}
					}).then(res => {
						console.log(res)
						this.fullscreenLoading = false;
						let response = res.data;
						if (response.status == 'success') {
							this.$message({
								type: "success",
								message: "删除成功！"
							});
							this.rerenderTableData();
						} else {
							this.$message.error(response.msg);
						}
					})
				}).catch(() => {
					this.fullscreenLoading = false;
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
			},
			showAdd() {
				this.state = true;
			},
			cancel() {
				this.state = false;
				this.dialogFormVisible = false;
			},
			success() {
				this.rerenderTableData();
			}
		},
	}
</script>
<style>
	.el-dialog {
		width: 500px;
		position: absolute !important;
		top: 50% !important;
		left: 50% !important;
		transform: translate(-50%, -50%) !important;
		background-color: #fff;
		padding: 20px;
		border-radius: 5px;
		padding-top: 40px;
		box-shadow: none !important;
		margin-top: 0vh !important;
	}

	.el-dialog__header {
		padding: 0px;
	}

	.el-dialog__body {
		padding-bottom: 10px !important;
	}
	#player{
		width: 500px;
		height: 300px;
		position: fixed;
		top: 50%;
		left: 50%;
		transform:  translate(-50%,-50%);
		 z-index: 99; 
	}
</style>
<style scoped>

	.title_header {
		background-color: #fff;
		margin-bottom: 10px;
		padding: 10px;
	}

	.filter-tree {
		width: 200px;
		float: left;
		height: auto;
		background-color: white;
	}

	.x{
		position: fixed;
		top: 20%;
		left:70%;
		z-index: 99;
	}
</style>
