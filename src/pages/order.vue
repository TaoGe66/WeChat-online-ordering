<template>
	<div class="order">
		<div v-title>确认订单</div>
		<!-- 桌号信息 -->
		<p class="desk_number padding-15">{{deskNo}}</p>
		<p class="person_number padding-15" @click="modelShow()">
			<span class="person_text">就餐人数</span>
			<span class="selete">{{result}}<img src="../../static/images/箭头_右.png" alt="" class="selete_icon"></span>
		</p>

		<!-- 订单列表 -->
		<ul>
			<li class="cart_row" v-for="(foodItem,foodIndex) in shoppingCart">
				<div class="detail">
					<span class="food_name">{{foodItem.name}}</span>
					<span class="total_price">{{foodItem.price*foodItem.quantity | currency('¥')}}</span>
					<span class="food_price">{{foodItem.price | currency('¥')}}</span>
				</div>
				<p class="food_format">{{foodItem.format}}</p>
			</li>
		</ul>

		<!-- 底部合计提交 -->
		<div class="footer">
			<div class="car_no_null">
				<span class="total">总共: {{totalMoney | currency('¥')}}</span>
				<span class="sub" @click="send()">下单</span>
			</div>
		</div>
		
		<!-- 就餐人数弹窗 -->
		<div class="model" v-if="model">
			<div class="bg"></div>
			<div class="box">
				<p class="box_title">就餐人数</p>
				<div class="flex_box2">
					<div class="formatTab" :class="{'format_active':tab == index,'format_no_active':tab != index}" v-for="(item,index) in personSelect" @click="personTab(item,index)">{{item}}</div>
				</div>
				<p class="model_btn" @click="modelBtn()">确定</p>
			</div>
		</div>
		
	</div>
</template>

<script>
	export default {
		data(){
			return {
				deskNo: 'A12',
				model: false,
				tab: 3,
				personSelect: ['1人','2人','3人','4人','5人','6人','7人','8人','9人','10人','11','11人以上'],
				result: '请选择就餐人数', //分量选择结果
				shoppingCart: JSON.parse(sessionStorage.getItem('shoppingCart')),
			}
		},
		computed: {
			totalMoney(){
				let count = 0;
				for(let i = 0 ; i < this.shoppingCart.length ; i++){
			    count += this.shoppingCart[i].price * this.shoppingCart[i].quantity;
				}
				return count;
			} 
		},
		methods: {
			// 提交订单
			send(){
				sessionStorage.setItem('deskNo',this.deskNo);
				this.$router.replace('/success');
				sessionStorage.setItem('shoppingCart','');
			},

			// 人数弹窗显示
			modelShow(){
				this.model = true;
			},

			// 人数选择
			personTab(item,index){
				this.tab = index;
				this.result = item;
			},

			// 规格弹窗确定按钮
			modelBtn(){
				this.model = false;
			},

		},

	}
</script>

<style scoped>
.order{
	width:100%;
	height:100vh;
	background-color: #f8f8f8;
}
.padding-15{
	padding: 0 15px;
}

.desk_number{
	width: 100%;
	height: 50px;
	line-height: 50px;
	font-weight: bold;
	font-size: 18px;
	color: #333;
	background-color: white;
	border-bottom: 1px solid #f0f0f0;
}
.person_number{
	width: 100%;
	height: 50px;
	line-height: 50px;
	font-size: 15px;
	color: #333;
	background-color: white;
	margin-bottom: 10px;
}
.selete{
	float: right;
	color: #999;
}
.selete_icon{
	vertical-align: top;
	height: 16px;
	margin-top: 17px;
	margin-left: 10px;
}

/*订单列表*/
.cart_row{
	padding: 10px 15px;
	background-color: white;
	font-size: 15px;
	color: #333;
}
.detail{
	height: 24px;
	line-height: 24px;
	font-size: 14px;
}
.food_name{
	display: inline-block;
	width: 200px;
	overflow: hidden;
	-o-text-overflow:ellipsis;
	   text-overflow:ellipsis;
	white-space: nowrap;
}
.food_price{
	float: right;
	margin-right: 20px;
}
.total_price{
	float: right;
	color: #df3031;
}
.food_format{
	font-size: 12px;
	color: #999;
}

/*底部购物车*/
.footer{
	position: fixed;
	left: 0;
	right: 0;
	bottom: 0;
  width:100%;
  height:50px;
  line-height: 50px;
	-webkit-box-shadow: 0px -3px 5px #f6f6f6;
	        box-shadow: 0px -3px 5px #f6f6f6;
}
.car_no_null{
	font-size: 18px;
	font-weight: bold;
}
.total{
	display: inline-block;
	width: 60%;
	height: 50px;
	line-height: 50px;
	text-align: center;
	color: #df3031;
	background-color: white;
}
.sub{
	float: right;
	width: 40%;
	height: 50px;
	line-height: 50px;
	text-align: center;
	color: #fff;
	background-color: #df3031;
}

/*就餐人数弹窗*/
.bg{
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	margin: auto;
	background-color: rgba(0,0,0,0.2);
}
.box{
	position: fixed;
	left: 0;
	right: 0;
	bottom: 0;
	margin: auto;
	color: #333;
	padding: 0 15px;
	background-color: white;
}
.box_title{
	text-align: center;
	margin: 30px 0;
}
.flex_box2{
	font-size: 0;
	margin: 0 auto 7px;
	text-align: center;
}
.format_title{
	font-size: 13px;
	color: #666;
	margin-bottom: 15px;
}
.formatTab{
	display: inline-block;
	width: 80px;
	height: 30px;
	line-height: 30px;
	border-radius: 30px;
	font-size: 13px;
	margin: 0 12px;
	text-align: center;
	margin-bottom: 19px;
}
.format_no_active{
	color: #bbbbbb;
	border: 1px solid #bbbbbb;
}
.format_active{
	border: 1px solid #df3031;
	color: #df3031;
	background-color: rgba(213,43,38,0.1);
}
.model_btn{
	width: 90%;
	height: 50px;
	line-height: 50px;
	margin: 20px auto;
	border-radius: 30px;
	background-color: rgb(212,43,38);
	font-size: 15px;
	color: white;
	text-align: center;
}

@media (max-width: 320px){
	.formatTab{
		width: 70px;
	}
}
	
</style>













