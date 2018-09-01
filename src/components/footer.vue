<template>
	<div class="footer">
		<img src="../../static/images/购物车空.png" alt="" class="car_icon">	
		<span class="null_txt">购物车还是空的呢~</span>	
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
.footer{
	position: fixed;
	left: 0;
	right: 0;
	bottom: 0;
  width:100%;
  height:50px;
  line-height: 50px;
  background-color: #c7c7c7;
}
.car_icon{
	position: absolute;
	left: 10px;
	top: -36px;
	width: 72px;
}
.null_txt{
	font-weight: bold;
	font-size: 18px;
	color: white;
	margin-left: 74px;
}
	
</style>













