<template>
	<div style="height: 190px;width: 100%;display: flex;justify-content: space-between;">
		<div class="top" style="display: flex;">
			<div class="el-icon-user-solid  xiao"></div>
			<div class="right">
				<h2>新增用户</h2>
				<h3 :visit="user">{{user}}</h3>

			</div>
		</div>
		<div class="top" style="display: flex;">
			<div class="el-icon-s-comment xiao  xin"></div>
			<div class="right">
				<h2>新增会员</h2>
				<h3 :vips="vip">{{vip}}</h3>
			</div>
		</div>
		<div class="top" style="display: flex;">
			<div class="el-icon-bank-card  xiao money"></div>
			<div class="right">
				<h2>今日营收额</h2>
				<h3 :purchase="purchases">{{purchases}}</h3>
			</div>
		</div>
		<div class="top" style="display: flex;">
			<div class="el-icon-shopping-cart-2 gouwu  xiao"></div>
			<div class="right">
				<h2>总盈利额</h2>
				<h3 :shopping="shoppings">{{shoppings}}</h3>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				user: '',
				vip: '',
				purchases:'',
				shoppings:''
			}
		},
		created() {
			this.visit();
			this.vips();
			this.purchase();
			this.shopping();
		},
		methods: {
			visit() {
				this.$http({
					url: 'http://81.68.121.52:8000/api/currentusers'
				}).then(response => {
					let res = response.data;
					console.log(res, res.data.length)
					if (res.status = 'success') {
						this.$message({
							type: "success",
							message: res.msg,
						})
						this.user = res.data.length
					} else {
						this.$message.error(res.msg);
					}
				})
			},
			vips() {
				this.$http({
					url: 'http://81.68.121.52:8000/api/currentvipusers'
				}).then(response => {
					let res = response.data;
					console.log(res, res.data.length)
					if (res.status = 'success') {
						this.$message({
							type: "success",
							message: res.msg,
						})
						this.vip = res.data.length
					} else {
						this.$message.error(res.msg);
					}
				})
			},
			purchase(){
				this.$http({
					url: 'http://81.68.121.52:8000/api/currenttotalpay'
				}).then(response => {
					let res = response.data;
					console.log(res, res.total_price)
					if (res.status = 'success') {
						this.$message({
							type: "success",
							message: res.msg,
						})
						this.purchases = res.total_price
					} else {
						this.$message.error(res.msg);
					}
				})
			},
			shopping(){
				this.$http({
					url: 'http://81.68.121.52:8000/api/gop'
				}).then(response => {
					let res = response.data;
					console.log(res, res.total_price)
					if (res.status = 'success') {
						this.$message({
							type: "success",
							message: res.msg,
						})
						this.shoppings = res.total_price
					} else {
						this.$message.error(res.msg);
					}
				})
			}
		},
	}
</script>

<style scoped>
	.top {
		width: 290px;
		height: 150px;
		background-color: white;
		border-radius: 10px;
		position: relative;
	}

	.xiao {
		font-size: 70px;
		color: #40c9c6;
		/* padding: 10px; */
		border-radius: 10px;
		height: 80px;
		margin-top: 20px;
		margin-left: 20px;
	}

	.xin {
		color: #36a3f7;
	}

	.money {
		color: #f4516c;
	}

	.gouwu {
		color: #34bfa3;
	}

	.xiao:hover {
		color: white;
		background-color: #40c9c6;
	}

	.xin:hover {
		color: white;
		background-color: #36a3f7;
	}

	.money:hover {
		color: white;
		background-color: #f4516c;
	}

	.gouwu:hover {
		color: white;
		background-color: #34bfa3;
	}

	.right {
		margin-top: 15px;
		margin-left: 30px;

	}

	h2 {
		color: rgba(0, 0, 0, .45);
	}

	h3 {
		color: #666;
	}
</style>
