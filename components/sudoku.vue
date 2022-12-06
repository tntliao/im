<template>
	<view class="item-img">
		<image :class="item.length>9?'item-img-img9':'item-img-img'+item.length" v-for="(it,idx) of item" v-if="idx<9" :key="idx" :src="it.avatar"></image>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				index: 9
			}
		},
		methods: {},
		props:['item'],
		mounted() {
			
		}
	}
</script>

<style lang="scss" scoped>
	.item-img {
		width: 120rpx;//改这个
		height: 120rpx;//改这个
		font-size: 34rpx;//改这个
		border-radius: 6rpx;
		color: #0D0E15;
		background: red;
		overflow: hidden;
		display: flex;
		justify-content: center;
		flex-wrap: wrap-reverse;
		align-items: center;
		align-content: center;
		justify-items: center;
		background-color: rgb(221, 222, 224);
		flex: none;
	}

	 .item-img image {
		background-color: rgb(240, 240, 241);
	}

	.item-img-img1 {
		height: 98%;
		width: 98%;
	}

	.item-img-img2,
	.item-img-img3,
	.item-img-img4 {
		justify-self: center;
		height: 46%;
		width: 46%;
		margin: 1%;
	}

	.item-img-img5,
	.item-img-img6,
	.item-img-img7,
	.item-img-img8,
	.item-img-img9 {
		height: 31.16666%;
		width: 31.16666%;
		margin: 1%;
	}
</style>
