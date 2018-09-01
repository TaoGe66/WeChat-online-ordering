<template>
	<div class="index">
		<div v-title>在 · 人 · 间</div>
		<!-- 头部图片 -->
		<div class="head">
			<img src="" alt="加载失败" class="head_img">
		</div>

		<!-- 中间 -->
		<section class="flex_box">
			<!-- 左侧菜单栏 -->
			<ul class="left_nav">
				<li class="nav_list" :class="{'nav_active_Bg':navIndex==navListActive}" v-for="(navItem,navIndex) in navList" @click="navTab(navItem,navIndex)">{{navItem.name}}</li>
				<li class="nav_list2">&nbsp;<br>&nbsp;</li>
			</ul>

			<!-- 右侧商品栏 -->
			<ul class="right_goods">
				<li class="sort" v-for="(sortItem,sortInex) in goodsList" :id="sortItem.id">
					<p class="sort_title">- {{sortItem.sortName}} -</p>
					<ul>
						<li class="goods_list" v-for="(goodsItem,goodsIndex) in sortItem.sort">
							<div class="flex_box">
								<img :src="goodsItem.img" alt="" class="goods_img" @click="detailFood(goodsItem,goodsIndex)">
								<div class="content_box">
									<p class="goods_name">{{goodsItem.name}}</p>
									<p class="goods_summary"><span>{{goodsItem.summarys}}</span></p>
									<p class="goods_row">
										<!-- 如需要在金额后面添加两位小数点，使用方法 ==> currency('¥',2) -->
										<span class="price">{{goodsItem.price | currency('¥')}}</span>
									</p>
								</div>
							</div>
							<div class="count">
								<img src="../../static/images/减少商品.png" alt="" class="reduce" @click="reduceCart(goodsItem,goodsIndex)" v-if="goodsItem.quantity>0">
								<span class="quantity" v-if="goodsItem.quantity>0">{{goodsItem.quantity}}</span>
								<img src="../../static/images/添加商品.png" alt="" class="add" @click="addCart(goodsItem,goodsIndex)" v-model="quantity">
							</div>
						</li>
					</ul>
					
				</li>
				<div class="padding_height"></div>
			</ul>
		</section>

		<!-- 底部购物车 -->
		<div class="footer">
			<img src="../../static/images/购物车空.png" v-if="shoppingCart.length==0" class="car_icon">	
			<img src="../../static/images/已添加购物车.png" v-if="shoppingCart.length>0" class="car_icon" @click="showCartList()">	
			<span class="car_quantity" v-if="shoppingCart.length>0">{{shoppingCart.length}}</span>
			<span class="null_txt" v-if="shoppingCart.length==0">购物车还是空的呢~</span>	
			<div class="car_no_null" v-if="shoppingCart.length>0">
				<span class="total">总共: {{totalMoney | currency('¥')}}</span>
				<router-link to="/order" tag="span">
					<span class="sub" @click="send()">下单</span>
				</router-link>
			</div>
		</div>

		<!-- 规格弹窗 -->
		<div class="format_model" v-show="formatModel">
			<div class="bg"></div>
			<div class="format_box">
				<!-- <img src="../../static/images/取消.png" alt="" class="format_cancel" @click="formatCancel()"> -->
				<div class="flex_box format_goods">
					<img src="goodsItem.img" alt="" class="goods_img">
					<div class="content_box">
						<p class="f_goods_name goods_name">{{onlyGoods.name}}</p>
						<p class="f_goods_summary goods_summary"><span>{{onlyGoods.summarys}}</span></p>
						<p class="goods_row">
							<!-- 如需要在金额后面添加两位小数点，使用方法 ==> currency('¥',2) -->
							<span class="price">{{onlyGoods.price | currency('¥')}}</span>
						</p>
					</div>
				</div>
				<div class="row">
					<p class="format_title">规格</p>
					<div class="flex_box2">
						<div class="formatTab" :class="{'format_active':bigSmollTab == index,'format_no_active':bigSmollTab != index}" v-for="(item,index) in formatSelect1" @click="formatTab1(item,index)">{{item}}</div>
					</div>
				</div>
				<div class="row">
					<p class="format_title">规格</p>
					<div class="flex_box2">
						<div class="formatTab" :class="{'format_active':TasteTab == index,'format_no_active':TasteTab != index}" v-for="(item,index) in formatSelect2" @click="formatTab2(item,index)">{{item}}</div>
					</div>
				</div>
				<p class="red_color" style="font-size: 14px;">
					已选:<span class="select_result" v-model="bigSmallResult">{{bigSmallResult}};</span><span class="select_result" v-model="tasteResult">{{tasteResult}}</span>
				</p>
				<p class="format_btn" @click="formatModelBtn()">确定</p>
			</div>
		</div>

		<!-- 购物车弹窗 -->
		<div class="cart_model" v-show="cartListModel">
			<div class="bg" @click="cartBg()"></div>
			<div class="cart_box">
				<p class="cart_title">
					<span class="cart_title_left">已选商品</span>
					<span class="cart_title_right" @click="deleteCart()">
						<img src="../../static/images/清空购物车.png" class="delete_icon">
						<span class="delete_text">清空</span>
					</span>
				</p>
				<ul>
					<li class="cart_row" v-for="(foodItem,foodIndex) in shoppingCart">
						<div class="detail">
							<span class="food_name">{{foodItem.name}}</span>
							<div style="float: right;">
								<img src="../../static/images/减少商品.png" class="reduce" @click="foodReduceCart(foodItem,foodIndex)" v-if="foodItem.quantity>0">
								<span class="quantity" v-if="foodItem.quantity>0">{{foodItem.quantity}}</span>
								<img src="../../static/images/添加商品.png" class="add" @click="addCart(foodItem,foodIndex)">
							</div>
							<span class="food_price">{{foodItem.price | currency('¥')}}</span>
						</div>
						<p class="food_format">{{foodItem.format}}</p>
					</li>
				</ul>
			</div>
		</div>

		<!-- 商品详情弹窗 -->
		<div class="detail_model" v-show="detailModel">
			<img src="" alt="" class="detail_img">
			<div class="detail_zhong">
				<p class="detail_name">{{detailData.name}}</p>
				<p class="detail_price">{{detailData.price | currency('¥')}}</p>
				<div class="add_and_reduce">
					<img src="../../static/images/减少商品.png" class="reduce" @click="detailReduceCart(detailData,detailIndex)" v-if="detailData.quantity>0">
					<span class="quantity" v-if="detailData.quantity>0">{{detailData.quantity}}</span>
					<img src="../../static/images/添加商品.png" class="add" @click="addCart(detailData)">
				</div>
			</div>
			<p class="detail_content">{{detailData.summarys}}</p>
		</div>

	</div>
</template>

<script>
	export default {
		data(){
			return {
				formatModel: false, //规格弹窗显示隐藏
				cartListModel: false, //购物车列表弹窗显示隐藏
				detailModel: false, //商品详情弹窗显示隐藏
				detailIndex: 0,
				bigSmollTab: 0,
				TasteTab: 0,
				formatSelect1: ['大份','中份','小份'],
				formatSelect2: ['辣','中辣','微辣','微微辣'],
				bigSmallResult: '大份', //分量选择结果
				tasteResult: '辣', //味道选择结果
				selfIndex: '', //当前增加商品的下标
				onlyGoods: {
					indx: '',
					name: '',
					img: '',
					summarys: '',
					price: '',
					quantity: 0,
					format: '',
				},
				detailData: '',
				goodsIndex: 10000,
				quantity: 0,

				navListActive: 0,
				navList: [
					{
						id: 1,
						name: '热销',
					},
					{
						id: 2,
						name: '促销产品和热卖',
					},
					{
						id: 3,
						name: '主食',
					},
					{
						id: 1,
						name: '热销',
					},
					{
						id: 2,
						name: '促销产品和热卖',
					},
					{
						id: 3,
						name: '主食',
					},
					{
						id: 1,
						name: '热销',
					},
					{
						id: 2,
						name: '促销产品和热卖',
					},
					{
						id: 3,
						name: '主食',
					},
					{
						id: 1,
						name: '热销',
					},
					{
						id: 2,
						name: '促销产品和热卖',
					},
					{
						id: 3,
						name: '主食',
					},
					{
						id: 1,
						name: '热销',
					},
					{
						id: 2,
						name: '促销产品和热卖',
					},
					{
						id: 3,
						name: '主食',
					},
					{
						id: 1,
						name: '热销',
					},
					{
						id: 2,
						name: '促销产品和热卖',
					},
					{
						id: 3,
						name: '主食',
					},
				],
				goodsList: [
					{
						id: '1',
						sortName: '热销',
						sort: [
							{
								id: 1,
								name: '热销促销产品和热卖促销产品和热卖促销产品',
								img: '',
								summarys: '入味 特色 薄脆',
								price: 80,
								quantity: 0,  //创建数据库必须字段，默认为0
								format: '',  //创建数据库必须字段，默认为空
							},
							{
								id: 2,
								name: '促销产品和热卖',
								img: '',
								summarys: '入味 特色 薄脆入味 特色 薄脆特色 薄脆',
								price: 50,
								quantity: 0,
								format: '',
							},
							{
								id: 3,
								name: '主食',
								img: '',
								summarys: '入味 特色 薄脆',
								price: 60,
								quantity: 0,
								format: '',
							},
						],
					},
					{
						id: '2',
						sortName: '促销产品和热卖',
						sort: [
							{
								id: 1,
								name: '热销促销产品和热卖促销产品和热卖促销产品',
								img: '',
								summarys: '入味 特色 薄脆',
								price: 88,
								quantity: 0,
								format: '',
							},
							{
								id: 2,
								name: '促销产品和热卖',
								img: '',
								summarys: '入味 特色 薄脆入味 特色 薄脆特色 薄脆',
								price: 88,
								quantity: 0,
								format: '',
							},
							{
								id: 3,
								name: '主食',
								img: '',
								summarys: '入味 特色 薄脆',
								price: 88,
								quantity: 0,
								format: '',
							},
						],
					},
					{
						id: '3',
						sortName: '主食',
						sort: [
							{
								id: 1,
								name: '热销促销产品和热卖促销产品和热卖促销产品',
								img: '',
								summarys: '入味 特色 薄脆',
								price: 88,
								quantity: 0,
								format: '',
							},
							{
								id: 2,
								name: '促销产品和热卖',
								img: '',
								summarys: '入味 特色 薄脆入味 特色 薄脆特色 薄脆',
								price: 88,
								quantity: 0,
								format: '',
							},
							{
								id: 3,
								name: '主食',
								img: '',
								summarys: '入味 特色 薄脆',
								price: 88,
								quantity: 0,
								format: '',	
							},
						],
					},
				],

				shoppingCart: [],
				shopCartTestArr: [],
			}
		},
		wacth: {
			onlyGoods(){
				console.log(this.onlyGoods)
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
			// 左侧tab
			navTab(navItem,navIndex){
				this.navListActive = navIndex;
			},

			// 列表上的减少
			reduceCart(goodsItem,goodsIndex){
				goodsItem.quantity --;
				this.onlyGoods = goodsItem;
				if(goodsItem.quantity == 0){
					let shopCartArrIdex = this.shopCartTestArr.indexOf(goodsIndex);
					this.shoppingCart.splice(shopCartArrIdex,1)
					this.shopCartTestArr.splice(shopCartArrIdex,1)
				}
				if(this.shoppingCart.length==0){
					this.cartListModel = false;
				}
			},
			// 购物车里面的减少
			foodReduceCart(foodItem,foodIndex){
				foodItem.quantity --;
				this.onlyGoods = foodItem;
				if(foodItem.quantity == 0){
					let shopCartArrIdex = this.shopCartTestArr.indexOf(foodIndex);
					this.shoppingCart.splice(foodIndex,1)
					this.shopCartTestArr.splice(shopCartArrIdex,1)
				}
				if(this.shoppingCart.length==0){
					this.cartListModel = false;
				}
			},
			// 详情里面的减少
			detailReduceCart(foodItem,foodIndex){
				foodItem.quantity --;
				this.onlyGoods = foodItem;
				if(foodItem.quantity == 0){
					let shopCartArrIdex = this.shopCartTestArr.indexOf(foodIndex);
					this.shoppingCart.forEach((item,index)=>{
						if(item.indx == foodIndex){
							this.shoppingCart.splice(index,1);
							// console.log(index);
						}
					})
					this.shopCartTestArr.splice(shopCartArrIdex,1)
					this.detailModel = false;
				}
				if(this.shoppingCart.length==0){
					this.cartListModel = false;
				}
			},
			// 添加进购物车
			addCart(goodsItem,goodsIndex){
				this.detailModel = false;
				// this.quantity += 1;
				this.selfIndex = '';
				if(goodsItem.quantity<=0){
					this.formatModel = true;
					this.onlyGoods = goodsItem;
					this.onlyGoods.quantity ++;
					this.onlyGoods.indx = goodsIndex;
					this.shopCartTestArr.push(goodsIndex);
					this.shoppingCart.push(this.onlyGoods);
					this.selfIndex = goodsIndex;
				}else{
					this.onlyGoods = goodsItem;
					this.onlyGoods.quantity ++;
					// this.onlyGoods.indx = goodsIndex;
				};
			},

			// 商品详情展示
			detailFood(goodsItem,goodsIndex){
				this.detailModel = true;
				this.detailData = goodsItem;
				this.detailIndex = goodsIndex;
			},

			// 分量选择
			formatTab1(item,index){
				this.bigSmollTab = index;
				this.bigSmallResult = item;
			},
			// 味道选择
			formatTab2(item,index){
				this.TasteTab = index;
				this.tasteResult = item;
			},
			// 规格弹窗确定按钮
			formatModelBtn(){
				this.formatModel = false;
				this.shoppingCart.forEach((item,index)=>{
					if(item.indx == this.selfIndex){
						item.format = this.bigSmallResult + "," + this.tasteResult
					}
				})
			},

			// 显示购物车列表
			showCartList(){
				this.cartListModel = true;
			},
			cartBg(){
				this.cartListModel = false;
			},
			deleteCart(){
				this.cartListModel = false;
				this.shoppingCart.forEach((item,index)=>{
					item.quantity = 0;
				})
				this.shoppingCart = [];
			},

			// 提交订单
			send(){
				sessionStorage.setItem('shoppingCart','');
				sessionStorage.setItem('shoppingCart',JSON.stringify(this.shoppingCart));
			},

			// 显示隐藏规格弹窗
			// formatCancel(){
			// 	this.onlyGoods={
			// 		indx: '',
			// 		name: '',
			// 		img: '',
			// 		summarys: '',
			// 		price: '',
			// 		quantity: 0,
			// 		format: '',
			// 	},
			// 	this.formatModel = false;
			// 	this.shoppingCart.splice(this.selfIndex,1)
			// },
		},

	}
</script>

<style scoped>
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
	padding-left: 30px;
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

.index{
	width:100%;
	height:100vh;
}

.head_img{
	display: inline-block;
	width: 100%;
	height: 15vh;
	opacity: 0.3;
	border: 1px solid red;
}

/*中间*/
.flex_box{
	display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
}
.left_nav{
	width: 90px;
	height: 80vh;
	background-color: #f9f9f9;
	/*overflow-x: hidden;
	overflow-y: scroll;*/
}
.right_goods{
	-webkit-box-flex: 1;
	    -ms-flex: 1;
	        flex: 1;
	height: 80vh;
  overflow-x: hidden;
  overflow-y: scroll;
}
.padding_height{
	height: 15px;
}

/*左侧菜单栏*/
.nav_list{
	width: 100%;
	line-height: 20px;
	padding: 10px 5px;
	text-align: center;
	border-bottom: 1px solid #f0f0f0;
	background-color: #f9f9f9;

	font-size: 12px;
	color: #333;
}
.nav_list2{
	width: 100%;
	/*line-height: 20px;*/
	height: 100px;
	padding: 10px 5px;
	text-align: center;
	border-bottom: 1px solid #f0f0f0;
	background-color: #f9f9f9;

	font-size: 12px;
	color: #333;
}
.nav_list:last-child{
	border: none;
}
.nav_active_Bg{
	background-color: white;
}

/*右边商品*/
.sort_title{
	width: 100%;
	padding: 10px 0 0px 10px;
	font-size: 12px;
	font-weight: bold;
	color: #df3031;
}
.goods_list{
	position: relative;
	margin-left: 10px;
	border-bottom: 1px solid #f0f0f0;
	padding: 20px 10px 20px 0;
}
.goods_img{
	width: 80px;
	height: 80px;
	margin: 0 15px 0 0;
	border-radius: 10px;
	border: 1px solid red;
}
.content_box{
	position: relative;
	-webkit-box-flex: 1;
	    -ms-flex: 1;
	        flex: 1;
	font-size: 15px;
}
.goods_name{
	width: 170px;
	color: #333;
	font-weight: bold;
	overflow: hidden;
	-o-text-overflow:ellipsis;
	   text-overflow:ellipsis;
	white-space: nowrap;
}
.goods_summary{
	width: 170px;
	margin-top: 9px;
	font-size: 12px;
	color: #999;
	overflow: hidden;
	-o-text-overflow:ellipsis;
	   text-overflow:ellipsis;
	white-space: nowrap;
}
.f_goods_name{
	width: 250px;
}
.f_goods_summary{
	width: 250px;
}
.goods_row{
	position: absolute;
	left: 0;
	right: 10px;
	bottom: 0;
}
.price{
	color: #df3031;
}
.count{
	position: absolute;
	right: 27px;
	bottom: 15px;
	height: 24px;
	line-height: 24px;
}
.add,.reduce{
	width: 24px;
	vertical-align: top;
}
.reduce{
	display: inline-block;
	text-align: center;
	color: #666;
	width: 24px;
	vertical-align: top;
}
.quantity{
	display: inline-block;
	width: 20px;
	text-align: center;
	color: #666;
	vertical-align: top;
}
/*.none{
	display: inline-block;
	text-align: center;
	color: #666;
	width: 24px;
	vertical-align: top;
}*/

/*底部购物车*/
.footer{
	position: fixed;
	left: 0;
	right: 0;
	bottom: 0;
  width:100%;
  height:50px;
  line-height: 50px;
  z-index: 1;
	-webkit-box-shadow: 0px -3px 5px #f6f6f6;
	        box-shadow: 0px -3px 5px #f6f6f6;
}
.car_icon{
	position: absolute;
	left: 10px;
	top: -36px;
	width: 72px;
}
.null_txt{
	display: inline-block;
  width:100%;
  height:50px;
	font-weight: bold;
	font-size: 18px;
	color: white;
	padding-left: 74px;
  background-color: #c7c7c7;
}
.car_quantity{
	position: absolute;
	top: -30px;
	left: 60px;
	display: block;
	width: 20px;
	height: 20px;
	line-height: 20px;
	border-radius: 50%;
	background-color: #333;
	color: #fff;
	font-size: 12px;
	text-align: center;
}

/*规格弹窗*/
.bg{
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	margin: auto;
	background-color: rgba(0,0,0,0.2);
	z-index: 2;
}
.format_box{
	position: fixed;
	left: 0;
	right: 0;
	bottom: 0;
	margin: auto;
	height: 490px;
	padding: 0 15px;
	background-color: white;
	z-index: 2;
}
.format_cancel{
	position: absolute;
	right: 15px;
	top: 15px;
	width: 15px;
}
.format_goods{
	padding: 34px 0 26px;
}
.flex_box2{
	font-size: 0;
	margin-bottom: 7px;
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
	margin-right: 25px;
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
.select_result{
	margin-left: 5px;
}
.format_btn{
	width: 90%;
	height: 50px;
	line-height: 50px;
	margin: 25px auto 0;
	border-radius: 30px;
	background-color: rgb(212,43,38);
	font-size: 15px;
	color: white;
	text-align: center;
}

/*购物车列表弹窗*/
.cart_box{
	position: fixed;
	left: 0;
	right: 0;
	bottom: 0;
	margin: auto;
	color: #333;
	padding: 0 15px;
	background-color: white;
	z-index: 2;
}
.cart_title{
	height: 50px;
	line-height: 50px;
	font-size: 0;
	border-bottom: 1px solid #f0f0f0;
}
.cart_title_left{
	font-size: 18px;
	font-weight: bold;
}
.cart_title_right{
	float: right;
}
.delete_icon{
	display: inline-block;
	height: 18px;
	margin: 16px 7px 0 0;
	vertical-align: top;
}
.delete_text{
	display: inline-block;
	font-size: 14px;
	vertical-align: top;
}

.cart_row{
	padding: 10px 0;
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
.food_format{
	font-size: 12px;
	color: #999;
}

/*商品详情弹窗*/
.detail_model{
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	margin: auto;
	background-color: white;
	z-index: 0;
}
.detail_img{
	display: block;
	width: 100%;
	height: 250px;  /*填充完图片把这行代码注释、边框去掉*/
	border: 1px solid red;
}
.detail_zhong{
	position: relative;
	padding: 15px 0;
	margin-left: 15px;
	border-bottom: 1px solid #f0f0f0;
}
.detail_name{
	width: 95%;
	font-size: 18px;
	font-weight: bold;
	color: #333;
	margin-bottom: 14px;
	overflow: hidden;
	-o-text-overflow:ellipsis;
	   text-overflow:ellipsis;
	white-space: nowrap;
}
.detail_price{
	font-size: 15px;
	color: #df3031;
}
.add_and_reduce{
	position: absolute;
	right: 15px;
	bottom: 11px;
}
.detail_content{
	padding: 15px;
	color: #999;
	font-size: 14px;
	line-height: 20px;
}



@media (max-width: 320px){
	.left_nav,.nav_list{
		width: 80px;
	}
	.goods_img{
		width: 60px;
		height: 60px;
	}
	.goods_name,.goods_summary{
		width: 140px;
		margin: 0;
	}
	.f_goods_name,.f_goods_summary{
		width: 210px;
		margin: 0;
	}
	.add{
		right: 15px;
	}
	.car_icon{
		left: 4px;
	}
	.total{
		padding-left: 40px;
	}
	.food_name{
		width: 160px;
	}
	.format_box{
		height: 510px;
	}
}
</style>













