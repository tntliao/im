<!-- 写文章 -->
<template>
	<view class="">
		<view class="header">
			<view class="return" @click="$goBack(1, 1)"></view>
			<view class="title" style="font-weight:bold;">写文章</view>
			<view>
				<u-button :disabled="disabled" @click="send" class="info" text="确定">发送</u-button>
			</view>
		</view>
		<view class="content">
			<u--textarea class="son" v-model="value1" autoHeight maxlength="-1" confirmType="done"
				placeholder="分享新鲜事...">
			</u--textarea>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				value1: '',
				disabled: false,
			}
		},
		methods: {
			send() {
				let data = {
					userId: uni.getStorageSync('userId'),
					content: this.value1,
				}
				this.utils.tools.luch_post('/index/Moments/send', data).then(rs => {
					if (rs.status == 1) {
						this.$showToast(rs.msg + '1秒后自动跳转到社区');
						setTimeout(() => {
							this.$goBack(4, '/pages/community/community');
						}, 1000)
					} else {
						this.$showToast(rs.msg)
					}
				})
			}
		},
		watch: {
			value1(value) {
				this.disabled = value.length > 0 ? false : true
			}
		},
		mounted() {}
	}
</script>

<style lang="scss" scoped>
	.content {
		.son {
			min-height: 180rpx;
			border: none;
		}
	}

	.header {
		top: 0;
		width: 100%;
		height: 180rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		z-index: 100;
		background: #FFFFFF;
		position: sticky;
		z-index: 2;
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
		width: 116rpx;
		height: 78rpx;
		margin-right: 40rpx;
		background: #F2F5F8;
		border-radius: 32rpx;
		line-height: 78rpx;
		font-size: 24rpx;
		text-align: center;
		color: #22345E;
	}
</style>
