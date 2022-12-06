<!-- 群聊 -->
<template>
	<view class="app">
		<Header select='3' @toPage="toPage" @groupChat="groupChat" @addFriend="addFriend" />
		<view class="block"></view>
		<view class="list" @click="closeMenu">
			<view class="info" v-for="(item,index) in dataList" :key="item.id" @click="toMsg(item)">
				<sudoku :item="item.meberlist"></sudoku>
				<view class="group_name">{{item.groupname}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import sudoku from '@/components/sudoku.vue'
	import PubSub from 'pubsub-js'
	export default {
		components: {
			sudoku
		},
		data() {
			return {
				dataList: [],
			}
		},
		mounted() {
			this.getGroupList()
		},
		methods: {
			closeMenu() {
				PubSub.publish('close', true);
			},
			//自定义事件，添加好友
			addFriend() {
				uni.reLaunch({
					url: '../new_friend/new_friend'
				})
			},
			//页面跳转
			toPage(value) {
				if (value == 'group_chat') return;
				if (value == 'index') {
					uni.reLaunch({
						url: '../index/index?userId=' + uni.getStorageSync('userId')
					})
					return
				}
				uni.reLaunch({
					url: '../' + value + '/' + value
				})
			},
			toMsg(data) {
				uni.navigateTo({
					url: `../group_msg/group_msg?id=${data.group_id}&name=${data.groupname}&group_msg=1`
				})
			},
			//添加群组
			addGroup() {
				let that = this
				let url = '/index/Index/creatgroup'
				let userId = uni.getStorageSync('userId')
				that.utils.tools.luch_get(url, {
					userId
				}).then(res => {
					if (res.status == 1) {
						that.dataList.push(res.groupinfo)
						return uni.showToast({
							title: '创建成功',
							icon: "none"
						})

					}
					uni.showToast({
						title: '未知异常',
						icon: "none"
					})
				})
			},
			//获取已加入群组
			getGroupList() {
				let that = this
				let url = '/index/Index/getgrouplist'
				let userId = uni.getStorageSync('userId')
				that.utils.tools.luch_get(url, {
					userId
				}).then(res => {
					// console.log(res)
					that.dataList = res
				})
			},

			//自定义事件，发起群聊
			groupChat(data) {
				uni.reLaunch({
					url: '../friend/friend?isGroupChat=' + data
				})
			}
		}
	}
</script>

<style>
	.block {
		height: 270rpx;
		width: 100vw;
		/* #ifdef APP-PLUS */
		margin-top: 30rpx;
		/* #endif */
	}

	/*列表*/
	.list {
		background: #FFFFFF;
	}

	.info {
		position: relative;
		width: 680rpx;
		height: 160rpx;
		margin-left: 35rpx;
		display: flex;
		align-items: center;
	}


	/* .info .info_image{
		position: relative;
		width: 750rpx;
		height: 160rpx;
		display: flex;
		align-items: center;
	} */

	.list {
		min-height: 80vh;
	}

	/*群头像*/
	.group_avatar {
		position: absolute;
		top: 20rpx;
		left: 20rpx;
		width: 120rpx;
		height: 120rpx;
		background: #F6F9FF;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		border-radius: 10rpx;
		overflow: hidden;
	}

	.group_avatar image {
		width: 50rpx;
		height: 50rpx;
		margin: auto;
	}

	.list .info .group_name {
		position: absolute;
		/* top: 36rpx; */
		left: 170rpx;
		font-size: 28rpx;
		font-weight: bold;
		color: #323643;
	}

	/* 创建群聊 */
	/* .group {
		position: relative;
		width: 100%;
		height: 80rpx;
		background: #FFFFFF;
		margin-bottom: 20rpx;
	}

	.add_group {
		position: absolute;
		right: 20rpx;
		top: 15rpx;
		width: 150rpx;
		height: 50rpx;
		line-height: 50rpx;
		font-size: 26rpx;
		text-align: center;
		background: rgba(220, 220, 220, 0.5);
		border-radius: 6rpx;
	} */
</style>
