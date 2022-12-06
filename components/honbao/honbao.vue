<template>
	<view class="honbaoInfo" :class="{active}">
		<view class="content">
			<image src="../../static/img/hbimg.png" mode="" class="hbimg"></image>
			<view class="detail">
				{{title}}
			</view>
		</view>
		<view class="introduce">
			<view class="line"></view>
			<text>LOO红包</text>
		</view>
	</view>
</template>

<script>
	export default {
		name: "honbao",
		props: {
			active: {
				type: Boolean,
				default: false,
			},
			title: {
				type: String,
				default: "恭喜发财"
			}
		},
		data() {
			return {

			};
		}
	}
</script>

<style>
	.honbaoInfo {
		margin: 0 30rpx;
		background-color: #f99f3e;
		border-radius: 10rpx;
		width: 330rpx;
		height: 130rpx;
		box-sizing: border-box;
	}

	.honbaoInfo.active {
		opacity: .5;
	}

	.honbaoInfo .content {
		display: flex;
		padding: 0 10rpx;
		box-sizing: border-box;
		height: 90rpx;
	}

	.honbaoInfo .content .hbimg {
		margin-top: 15rpx;
		width: 70rpx;
		height: 70rpx;
	}

	.honbaoInfo .content .detail {
		width: 240rpx;
		color: white;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.honbaoInfo .introduce {
		height: 40rpx;
		border-top: 1rpx solid rgba(255, 255, 255, .1);
		padding: 0 10rpx;
	}

	.honbaoInfo .introduce text {
		display: inline-block;
		color: #ffdbaf;
		margin-top: 6rpx;
		margin-left: -10rpx;
		transform: scale(.7);
	}
</style>
