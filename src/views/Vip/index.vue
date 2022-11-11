<template>
	<div class="vip_width">
		<header class="title_header">
			<el-button type="primary" @click="showAdd">新增标题</el-button>
		</header>
		<Add :state="state" @cancel="cancel" @success="success"></Add>
		<el-table :data="tableData" style="width: 100%" :default-sort="{prop: 'date', order: 'descending'}">
			<el-table-column prop="id" label="编号" sortable></el-table-column>
			<el-table-column prop="name" label="名称" sortable></el-table-column>
			<el-table-column prop="price" label="价格" sortable></el-table-column>
			<el-table-column prop="description" label="描述" sortable></el-table-column>
			<el-table-column prop="origin_price" label="原价" sortable></el-table-column>

			<el-table-column prop="expires" label="天数" sortable></el-table-column>
			<el-table-column prop="create_time" label="创建时间" sortable></el-table-column>
			<el-table-column prop="update_time" label="更新日期" sortable></el-table-column>
			<el-table-column label="操作"><template #default="scope">

					<el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
						v-loading.fullscreen.lock="fullscreenLoading">编辑</el-button>

					<el-dialog title="" :visible.sync="dialogFormVisible">
						<el-form :model="form" id="okk">
							<el-form-item label="编号：" :label-width="formLabelWidth">
								<el-form-item v-model="form.id" autocomplete="off">{{form.id}}</el-form-item>
							</el-form-item>
							<el-form-item label="名称：" :label-width="formLabelWidth">
								<el-input v-model="form.name" autocomplete="off"></el-input>
							</el-form-item>
							<el-form-item label="价格：" :label-width="formLabelWidth">
								<el-input v-model="form.price" autocomplete="off"></el-input>
							</el-form-item>
							<el-form-item label="描述：" :label-width="formLabelWidth">
								<el-input v-model="form.description" autocomplete="off"></el-input>
							</el-form-item>
							<el-form-item label="原价：" :label-width="formLabelWidth">
								<el-input v-model="form.origin_price" autocomplete="off"></el-input>
							</el-form-item>
							<el-form-item label="天数：" :label-width="formLabelWidth">
								<el-input v-model="form.expires" autocomplete="off"></el-input>
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

	export default {
		name: "Title",
		components: {
			Add,
		},
		data() {
			return {
				tableData: [],
				state: false,
				//新加--------一大堆---------------------
				fullscreenLoading: false,
				upindex: 0,
				dialogFormVisible: false,
				form: {
					name: '',
					price:'',
					description:'',
					origin_price:"",
					expires:'',
					date1: '',
					date2: '',
					delivery: false,
					type: [],
					resource: '',
					desc: '',
					
				},

				formLabelWidth: '100px',
				//-------------------------

			}
		},
		created() {
			this.rerenderTableData();
		},
		methods: {
			rerenderTableData() {
				this.$http({
					url: "/api/vip"
				}).then(res => {
					console.log(res.data);
					let response = res.data;
					if (response.status == 'success') {
						response.data.forEach(item => {
							item.id = item.id++;
							item.expries = item.expries + '天';
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
				this.form.price = newtable.price;
				this.form.description = newtable.description;
				this.form.origin_price = newtable.origin_price;
				this.form.expires = newtable.expires;
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
						url: "/api/vip",
						method: "PUT",
						//--------------------------pk这样传参的------
						data: `pk=${this.form.id}&name=${this.form.name}&price=${this.form.price}
						&description=${this.form.description}&origin_price=${this.form.origin_price}&expires=${this.form.expires}`,
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
						url: "/api/classify",
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

	.vip_width .el-table .el-table__header-wrapper .el-table__header colgroup col:nth-child(1) {

		width: 80px;
	}

	.vip_width .el-table .el-table__header-wrapper .el-table__header colgroup col:nth-child(2) {

		width: 80px;
	}

	.vip_width .el-table .el-table__header-wrapper .el-table__header colgroup col:nth-child(3) {

		width: 80px;
	}

	.vip_width .el-table .el-table__body-wrapper .el-table__body colgroup col:nth-child(1) {
		width: 80px;
	}

	.vip_width .el-table .el-table__body-wrapper .el-table__body colgroup col:nth-child(2) {
		width: 80px;
	}

	.vip_width .el-table .el-table__body-wrapper .el-table__body colgroup col:nth-child(3) {
		width: 80px;
	}
</style>
<style scoped>
	.title_header {
		background-color: #fff;
		margin-bottom: 10px;
		padding: 10px;
	}
</style>
