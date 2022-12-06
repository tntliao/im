<!-- 新的朋友 -->
<template>
	<view class="app">

		<view class="header">
			<view class="return_icon" @click="toBack()"></view>
			<view class="title">新的朋友</view>
			<!-- <view class="more_icon"></view> -->
		</view>

		<view class="search">
			<!-- <u-search placeholder="搜索账号" v-model="keyword" @custom="searchFriend()"  height="30"></u-search> -->
			<input type="text" value="" v-model="keyword" placeholder="搜索账号" />
			<image src="../../static/imgs/search.png" @click="searchFriend()" mode=""></image>
		</view>

		<view class="search_desc" v-if="userInfo.userId">
			<view class="info" @click="toFriendMsg(userInfo)">
				<image :src="userInfo.headimgurl"></image>
				<view class="desc">
					<view class="username">{{userInfo.xm}}</view>
					<view class="signature">个性签名：<text>{{userInfo.sign || '暂无签名'}}</text></view>
				</view>

				<view class="add" @click="addFriend(userInfo)" v-if="userInfo.isfriend==1">添加</view>
				<view class="add" v-else-if="userInfo.isfriend==2">待确认</view>
			</view>
		</view>

		<view class="not_found" v-show="show">
			<u-divider text="未找到相应好友" :hairline="true"></u-divider>
		</view>

		<view class="history_list">
			<!-- <view class="friend">好友历史记录</view> -->
			<view class="history">
				<view class="user" v-for="item in history" :key="item.id">
					<image :src="item.headimgurl"></image>
					<view class="user_name">{{item.xm}}</view>
					<view class="btn" v-if="userId!=item.sender&&item.msg_status==1">
						<view class="btn_cancel" @click="add('no',item.id)">拒绝</view>
						<view class="btn_ok" @click="add('yes',item.id)">同意</view>
					</view>
					<view v-else>
						<view class="operation" v-if="item.msg_status==3">已过期</view>
						<view class="operation" v-else-if="item.msg_status==2">已添加</view>
						<view class="operation" v-else>待确认</view>
					</view>

					<!-- <u-line class="line" length="90%"></u-line> -->
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				keyword: '',
				isadd: 1,
				show: false,
				userInfo: '',
				history: [], //返回的add数据
				userId: uni.getStorageSync('userId')
			}
		},
		mounted() {
			this.getFriendHistory()
		},
		methods: {
			//返回上一页
			toBack() {
				uni.navigateTo({
					url: '../friend/friend'
				})
			},
			searchFriend() {

				if (!this.keyword) {
					uni.showToast({
						title: '请输入要查找的uid',
						icon: "none"
					})
					return
				}
				let that = this
				let url = '/index/Index/addfriend'
				let userId = uni.getStorageSync('userId')
				if (userId === that.keyword * 1) {
					return uni.showToast({
						title: '不能添加自己',
						icon: "none"
					})
				}
				let data = {
					userId: userId,
					searchkey: that.keyword
				}
				that.utils.tools.luch_get(url, data).then(res => {
					if (res.length == 0) {
						that.show = true
						that.userInfo = {}
						return
					}
					that.userInfo = res[0]
					that.show = false
					that.keyword = ''
				})
			},

			//添加好友
			addFriend(userInfo) {

				let that = this
				let url = "/index/Index/addfrienddo"
				let userId = that.userId
				that.utils.tools.luch_get(url, {
					userId,
					friendid: userInfo.userId
				}).then(res => {
					console.log(res)
					if (res.status == 1) {
						uni.showToast({
							title: '请求添加成功!',
							icon: "none"
						})
						userInfo.isfriend = 2
					}
				})
			},

			//获取好友历史记录
			getFriendHistory() {
				let that = this
				let url = '/index/Index/getuaddf'
				let userId = uni.getStorageSync('userId')
				that.utils.tools.luch_get(url, {
					userId
				}).then(res => {
					console.log('好友历史记录=>', res)
					that.history = res
				})
			},

			add(type, id) {
				let that = this
				let url = '/index/Index/handlefmsg'
				let status;
				if (type == 'no') {
					status = 3
				} else {
					status = 2
				}

				that.utils.tools.luch_get(url, {
					userId: that.userId,
					msgId: id,
					status
				}).then(res => {
					if (res.status == 1 && status == 2) {
						uni.showToast({
							title: '添加成功',
							icon: "none"
						})
						that.getFriendHistory()
					}
				})
			},
			//是否是好友
			toFriendMsg(data) {
				if (data.isfriend == 3) {
					uni.reLaunch({
						url: '../msginfo/msginfo?id=' + data.userId + '&name=' + data.xm
					})
				}
			}
		}
	}
</script>

<style>
	.app {
		width: 100%;
		min-height: 100vh;
	}

	/*头部*/
	.header {
		width: 750rpx;
		display: flex;
	}

	.header .return_icon {
		width: 80rpx;
		height: 80rpx;
		background: url('@/static/img/back.png');
		background-size: cover;
		margin-top: 108rpx;
		margin-left: 40rpx;
	}

	.header .title {
		font-size: 44rpx;
		font-weight: bold;
		color: #22345E;
		margin-top: 116rpx;
		margin-left: 168rpx;
	}

	.header .more_icon {
		width: 80rpx;
		height: 80rpx;
		background: url('@/static/img/more.png');
		background-size: cover;
		margin-top: 108rpx;
		margin-left: 166rpx;
	}

	.search {
		width: 670rpx;
		margin: 0 auto;
		margin-top: 26rpx;
		position: relative;
	}

	.search input {
		width: 670rpx;
		height: 80rpx;
		background: url('@/static/imgs/Searchbox.png') no-repeat;
		background-size: 100% 100%;
		text-indent: 20rpx;
	}

	.search image {
		position: absolute;
		width: 30rpx;
		height: 30rpx;
		top: 30rpx;
		right: 30rpx;
	}

	.search_desc {
		margin-top: 40rpx;
		background: #FFFFFF;
	}

	.info {
		width: 680rpx;
		height: 100rpx;
		margin-left: 35rpx;
		display: flex;
		align-items: center;
		border-bottom: 1rpx solid rgba(192, 192, 192, 0.5);
	}

	.info image {
		width: 66rpx;
		height: 66rpx;
		border-radius: 50%;
	}

	.info .desc {
		width: 450rpx;
		margin-left: 20rpx;
	}

	.desc .username {
		width: 100%;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		font-size: 28rpx;
	}

	.desc .signature {
		width: 100%;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		font-size: 24rpx;
	}

	.signature text {
		color: rgba(192, 192, 192);
	}

	.info .add {
		width: 140rpx;
		height: 52rpx;
		line-height: 52rpx;
		font-size: 28rpx;
		color: #FFFFFF;
		text-align: center;
		background: #4578D1;
		border-radius: 12rpx;
		opacity: 1;
	}

	.not_found {
		width: 500rpx;
		margin: 0 auto;
	}

	.history_list {
		width: 100%;
		margin-top: 40rpx;
	}

	.history_list .friend {
		font-size: 22rpx;
		margin-left: 20rpx;
		margin-bottom: 10rpx;
	}

	.history_list .history {
		background: #FFFFFF;
	}

	.history_list .history .user {
		position: relative;
		width: 680rpx;
		height: 108rpx;
		margin-left: 35rpx;
		display: flex;
		align-items: center;
		border-bottom: 1rpx solid rgba(192, 192, 192, 0.5);
	}

	.history_list .history .user image {
		width: 66rpx;
		height: 66rpx;
		border-radius: 50%;
	}

	.history_list .history .user .user_name {
		font-size: 28rpx;
		font-weight: bold;
		color: #323643;
		margin-left: 20rpx;
	}

	.history_list .history .user .btn {
		display: flex;
		align-items: center;
	}

	.history_list .history .user .btn_cancel {
		position: absolute;
		right: 150rpx;
		width: 100rpx;
		height: 52rpx;
		line-height: 52rpx;
		font-size: 28rpx;
		color: #FFFFFF;
		text-align: center;
		background: rgba(169, 169, 169, 1);
		border-radius: 12rpx;
		opacity: 1;
	}

	.history_list .history .user .btn_ok {
		position: absolute;
		right: 20rpx;
		width: 100rpx;
		height: 52rpx;
		line-height: 52rpx;
		font-size: 28rpx;
		color: #FFFFFF;
		text-align: center;
		background: #4578D1;
		border-radius: 12rpx;
		opacity: 1;
	}

	.history_list .history .user .line {
		position: absolute;
		bottom: 0rpx;
		right: 0;
	}

	.operation {
		position: absolute;
		top: 40rpx;
		right: 40rpx;
		font-size: 24rpx;
		color: rgba(128, 128, 128);
	}
</style>
