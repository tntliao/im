<template>
	<view class="header">
		<view class="return" @click="returnToBack"></view>
		<view class="title" :style="bold?'font-weight:bold;':''">{{title}}</view>
		<view class="right">
			<image class="info" :src="infoSrc" v-if="infoShow" @click="info()" mode=""></image>
		</view>
	</view>
</template>

<script>
	export default {
		// bold字体是否加粗
		// 返回的按钮如何跳转route
		// [2,'/pages/mine/about']
		// infoClick第三个按钮的点击事件
		// info第三个按钮的图片src
		// right info第三个按钮是否要隐藏
		// 点击返回有一个自定义事件toBack
		props: ['title', 'bold', 'route', 'infoImgSrc', 'right'],
		data() {
			return {
				infoSrc: '../../static/img/more.png',
				infoShow: true
			}
		},
		mounted() {
			if (this.right)
				this.infoShow = false

		},
		methods: {
			info() {
				this.$emit('infoClick')
			},
			returnToBack() {
				this.$emit('toBack');
				let route = this.route
				route ? this.$goBack(route[0], route[1]) : this.$goBack(1)
			}
		}
	}
</script>

<style>
	.header {
		top: 20px;
		width: 100%;
		height: 180rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		z-index: 100;
		background: #FFFFFF;
	}

	.header .return {
		width: 80rpx;
		height: 80rpx;
		background: url(@/static/img/back.png);
		background-size: cover;
		margin-left: 40rpx;
	}

	.header .title {
		color: #22345E;
		font-size: 44rpx;
	}

	.header .info {
		width: 80rpx;
		height: 80rpx;
		margin-right: 40rpx;
	}
	.right{
		width: 80rpx;
	}
</style>
