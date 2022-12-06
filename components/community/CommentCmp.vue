<!-- 每个人的评论组件 -->
<template>
	<view class="comment">
		<!-- 用户名 -->
		<span>{{item.customer.xm}}:</span>
		<!-- 评论的内容 -->
		<span>{{item.content}} </span>
	</view>
</template>

<script>
	export default {
		props: ['item']
	}
</script>

<style lang="scss" scoped>
	.comment {
		width: 664rpx;
		margin: 0 auto;
		min-height: 34rpx;
		padding: 0 0 16rpx 0;
		font-size: 22rpx;

		span:nth-child(1) {
			color: #345b9e;
			font-weight: bold;
		}

		span:nth-child(2) {
			padding-left: 10rpx;
		}
	}
</style>
