<template>
	<div class="login">
		<div v-title>点餐宝</div>

		<p class="title">——— 在 · 人 · 间 ———</p>
		<p class="welcome">欢迎光临</p>
		<router-link to="/index" tag="div">
			<p class="btn">开始点餐</p>
		</router-link>

	</div>
</template>

<script>
	export default {
		data(){
			return {
			}
		}
	}
</script>

<style scoped>
.login{
	width:100%;
	height:100vh;
	text-align: center;
	color: white;
	background-image: url(../../static/images/背景图.png);
	background-size: 100% 100vh;
}
.title{
	height: 160px;
	line-height: 50px;
	font-size: 24px;
	font-weight: 700;
	padding: 100px 0 10px;
}
.welcome{
	font-size: 18px;
}
.btn{
	display: block;
	position: fixed;
	left: 0;
	right: 0;
	bottom: 50px;
	margin: auto;
	width: 90%;
	height: 50px;
	line-height: 50px;
	border-radius: 30px;
	background-color: rgb(212,43,38);
	font-size: 18px;
	color: white;
}

@media (max-width:  320px){
  .btn{
    height: 40px;
    line-height: 40px;
    font-size: 16px;
  }
}
	
</style>













