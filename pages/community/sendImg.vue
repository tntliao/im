<!-- 写文章加图片 -->
<template>
	<view class="">
		<view class="header">
			<view class="return" @click="$goBack(1, 1)"></view>
			<view class="title" style="font-weight:bold;">写文章</view>
			<view>
				<!-- f2f5f8 -->
				<u-button :disabled="disabled" @click="send" class="info" text="确定">发送</u-button>
			</view>
		</view>
		<view class="content">
			<u--textarea class="son" v-model="value1" autoHeight maxlength="-1" confirmType="done"
				placeholder="分享新鲜事...">
			</u--textarea>
		</view>
		<view class="upload">
			<u-upload :fileList="fileList1" @afterRead="afterRead" accept="image" @delete="deletePic" name="1"
				:previewFullImage="true" multiple :maxCount="9">
				<image src="../../static/imgs/upload.png" style="width: 80px;height: 80px;"></image>
			</u-upload>
		</view>
	</view>
</template>

<script>
	import {
		apiUrl
	} from '@/common/base.js'
	export default {
		data() {
			return {
				value1: '',
				fileList1: [],
				flag: true
			}
		},
		methods: {
			afterRead(res) {
				this.fileList1.push(...res.file)
			},
			// 删除图片
			deletePic(index) {
				this.fileList1.splice(index.index, 1);
			},
			// 发送
			send() {
				if (this.flag) {
					this.flag = false
					console.log(this.fileList1);
					uni.uploadFile({
						url: apiUrl + '/index/Moments/sendpic', //仅为示例，非真实的接口地址
						filePath: this.fileList1[0].url,
						// files:this.fileList1,
						formData: {
							userId: uni.getStorageSync('userId'),
							content: this.value1
						},
						success: (rs) => {
							rs = JSON.parse(rs.data)
							if (rs.status == 1) {
								this.$showToast(rs.msg + '1秒后自动跳转到社区');
								setTimeout(() => {
									this.$goBack(4, '/pages/community/community');
								}, 1000)
							} else {
								this.$showToast(rs.msg);
							}
							this.flag = true
						}
					});
				} else {
					let data = {
						type: 'default',
						message: '正在发送,请勿重复点击发送',
						icon: 'https://cdn.uviewui.com/uview/demo/toast/default.png'
					}
					this.$refs.uToast.show({
						...data
					});
				}

			}
		},
		computed: {
			disabled() {
				if (this.fileList1.length > 0)
					return false
				return true
			}
		},
		mounted() {
			this.fileList1 = this.$store.state.imImgs.map(x => {
				return {
					url: x
				}
			});
		}
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
	/deep/.u-upload__deletable{
		width: 30rpx;
		height: 30rpx;
		border-radius: 0;
		background: url('../../static/imgs/error.png') no-repeat;
		background-size:100% 100% ;
	}
	/deep/.u-upload__deletable span{
		display: none;
	}
</style>
