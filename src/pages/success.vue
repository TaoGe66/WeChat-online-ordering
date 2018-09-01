<template>
	<div class="success">
		<div v-title>点餐宝</div>
		<img src="../../static/images/下单成功.png" alt="" class="icon">
		<p class="title">下单成功</p>
		<p class="num">{{deskNo}}</p>
		<p class="tips">请亲耐心等待，美食稍后就来</p>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				deskNo: sessionStorage.getItem('deskNo')
			}
		}

	}
</script>

<style scoped>
.success{
	width:100%;
	height:100vh;
	color: #333;
	text-align: center;
}
img{
	display: block;
}
	
.icon{
	margin: 90px auto 30px;
	width: 79px;
}
.title{
	font-size: 22px;
	font-weight: bold;
}
.num{
	font-size: 17px;
	margin: 10px 0 20px;
}
.tips{
	font-size: 14px;
	color: #bbb;
}
</style>













