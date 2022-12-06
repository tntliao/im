<!-- 好友 -->
<template>
	<view class="app">

		<view class="header">
			<view class="retuen_icon" @click="returnToIndex()"></view>
			<view class="authInfo">好友信息</view>
		</view>

		<view class="auth">
			<image :src="user.headimgurl"></image>

			<view class="user">
				<view class="name">{{user.xm}}</view>
			</view>

		</view>

		<view class="line"></view>

		<view class="info">
			<view class="userName">
				<view class="infoid">用户ID</view>
				<view class="uid">{{user.userId}}</view>
			</view>
			<view class="remarks">
				<view>备注</view>
				<view @click="remarks = false" v-if="remarks">{{defult}}</view>
				<input type="text" v-else v-model="remarksValue" :focus="true" :auto-blur="true"
					:adjust-position="false" @blur="changeRemarks">
			</view>
			<view class="user_line"></view>
			<view class="userSign">
				<view class="sign">个性签名</view>
				<!-- <view class="right"></view> -->
			</view>
			<view class="signContent">{{user.sign||'暂无签名'}}</view>
			<view class="user_line"></view>
		</view>

		<view class="update_btn" @click="toMsg()">发送消息</view>
		<view class="delete_btn" @click="showDelete=true">删除好友</view>

		<u-popup :show="showDelete" mode="center">
			<view class="isdelete">
				<view class="title">确认删除?</view>
				<view class="btn">
					<view class="cancel" @click="showDelete=false">取消</view>
					<view class="ok" @click="deleteFriend()">确认</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import {
		changeRemarks
	} from '@/common/sendAjax.js'
	import md5 from 'md5'
	import moment from 'moment'
	import {
		secretKey
	} from '@/common/base.js';
	export default {
		data() {
			return {
				user: {},
				friendId: 0,
				showDelete: false,
				remarks: true,
				remarksValue: "",
				defult: "点击备注"
			}
		},
		onLoad(opations) {
			if (opations.friendId) this.friendId = opations.friendId
		},
		mounted() {
			console.log(moment().format('YYYY-MM-DD'));;
			this.getFriendInfo()
		},
		methods: {
			//修改备注
			async changeRemarks() {
				this.remarks = true;
				let data = {
					userId: uni.getStorageSync("userId"),
					friendid: this.friendId,
					remarkname: this.remarksValue
				}
				const response = await changeRemarks(data);
				this.$showToast(response.data.msg);
				if (this.remarksValue != '') {
					this.defult = this.remarksValue
					// this.user.xm = this.remarksValue
				} else {
					this.defult = '点击备注'
				}
			},
			//获取好友信息
			getFriendInfo() {
				const token = uni.getStorageSync('address');
				console.log(token);
				let that = this
				let url = '/index/Index/getuinfo'
				that.utils.tools.luch_get(url, {
					userId: uni.getStorageSync('userId'),
					uId: that.friendId,
					token: md5(token + moment().format('YYYY-MM-DD') + secretKey)
				}).then(res => {
					console.log(res);
					that.user = res
					if (res.remarkname) that.defult = res.remarkname
				})
			},
			returnToIndex() {
				this.$goBack(2, `/pages/msginfo/msginfo?id=${this.friendId}&name=${this.defult||this.user.xm}`);
			},
			//发送消息
			toMsg() {
				uni.reLaunch({
					url: '../msginfo/msginfo?id=' + this.user.userId + '&name=' + this.user.xm
				})
			},
			//删除好友
			deleteFriend() {
				let that = this;
				let url = '/index/Index/delfriend'
				let userId = uni.getStorageSync('userId')
				that.utils.tools.luch_get(url, {
					userId,
					friendid: that.friendId
				}).then(res => {
					if (res.status == 1) {
						uni.showToast({
							title: '删除成功',
							icon: "none"
						})
						uni.removeStorageSync(that.friendId + '')
						uni.reLaunch({
							url: '../index/index?userId=' + userId
						})
					}
				})
			}
		}
	}
</script>

<style>
	/* 	.app {
		width: 100%;
		min-height: 100vh;
		background: rgba(220, 220, 220, 0.3);
	} */
	.info .remarks {
		display: flex;
		justify-content: space-between;
		margin: 26px 11px;
	}

	.info .remarks input {
		border: 1px solid #F2F5F8;
	}

	/*  */
	.header {
		width: 100%;
		display: flex;
		align-items: center;
	}

	.header .retuen_icon {
		width: 80rpx;
		height: 80rpx;
		background: url('@/static/img/back.png');
		background-size: cover;
		margin-top: 108rpx;
		margin-left: 40rpx;
	}

	.header .authInfo {
		font-size: 44rpx;
		color: #22345E;
		margin-top: 120rpx;
		margin-left: 168rpx;
	}

	/*头像昵称*/
	.auth image {
		width: 190rpx;
		height: 190rpx;
		border-radius: 50%;
		margin-top: 142rpx;
		margin-left: 280rpx;
	}

	.auth .user {
		display: flex;
		align-items: center;
	}

	.auth .user .name {
		width: 190rpx;
		font-size: 40rpx;
		color: #22345E;
		text-align: center;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		margin: 44rpx 0 0 280rpx;
	}

	.auth .user .input {
		width: 190rpx;
		height: 40rpx;
		border: 1rpx solid #dcdcdc;
		border-radius: 5rpx;
		margin: 40rpx 10rpx 0 280rpx;
	}

	.auth .user .edit {
		width: 40rpx;
		height: 42rpx;
		background: url('@/static/img/edit_1.png');
		background-size: cover;
		margin-top: 44rpx;
	}

	.line {
		width: 750rpx;
		height: 2rpx;
		background: #F2F5F8;
		margin-top: 60rpx;
	}

	/*用户信息*/
	.info {
		width: 670rpx;
		margin-left: 40rpx;
	}

	.info .userName {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-top: 48rpx;
		margin-bottom: 50rpx;
	}

	.info .userName .infoid {
		font-size: 28rpx;
		color: #323643;
		margin-left: 20rpx;
	}

	.info .userName .uid {
		font-size: 28rpx;
		color: #AEB5C0;
		margin-right: 20rpx;
	}

	.user_line {
		width: 670rpx;
		height: 2rpx;
		background: #F2F5F8;

	}

	.info .userSign {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-top: 48rpx;
		margin-bottom: 18rpx;
	}

	.info .userSign .sign {
		font-size: 28rpx;
		color: #323643;
		margin-left: 20rpx;
	}

	.info .userSign .right {
		width: 12rpx;
		height: 20rpx;
		background: url('@/static/img/right.png');
		background-size: cover;
		margin-right: 40rpx;
	}

	.signContent {
		width: 630rpx;
		line-height: 40rpx;
		font-size: 24rpx;
		color: #AEB5C0;
		margin-left: 22rpx;
		margin-bottom: 16rpx;
	}

	.update_btn {
		width: 670rpx;
		height: 100rpx;
		line-height: 100rpx;
		background: #4578D1;
		border-radius: 40rpx;
		opacity: 1;
		font-size: 24rpx;
		color: #FFFFFF;
		text-align: center;
		filter: blur(undefinedpx);
		margin-top: 156rpx;
		margin-left: 40rpx;
	}

	.delete_btn {
		width: 670rpx;
		height: 100rpx;
		line-height: 100rpx;
		background: #F65959;
		border-radius: 40rpx;
		opacity: 1;
		font-size: 24rpx;
		color: #FFFFFF;
		text-align: center;
		filter: blur(undefinedpx);
		margin-top: 28rpx;
		margin-left: 40rpx;
	}

	.content {
		width: 100%;
		margin-top: 40rpx;
		background-color: #FFFFFF;
	}

	.content .desc {
		width: 680rpx;
		height: 100rpx;
		margin-left: 35rpx;
		font-weight: 700;
		display: flex;
		align-items: center;
	}

	.content .desc image {
		width: 50rpx;
		height: 50rpx;
	}

	.content .desc .info {
		width: 600rpx;
		line-height: 80rpx;
		margin-left: 20rpx;
	}

	.content .desc .left {
		margin-left: -20rpx;
		color: rgba(211, 211, 211);
	}

	.bottom {
		width: 100%;
		margin-top: 40rpx;
		background-color: #FFFFFF;
	}

	.bottom .desc {
		width: 680rpx;
		height: 80rpx;
		margin-left: 35rpx;
		display: flex;
		align-items: center;
	}

	.bottom .desc image {
		width: 50rpx;
		height: 50rpx;
	}

	.bottom .desc .sz {
		width: 600rpx;
		/* line-height: 80rpx; */
		margin-left: 20rpx;
		font-weight: 700;
	}

	.bottom .desc .left {
		margin-left: -20rpx;
		color: rgba(211, 211, 211);
	}

	.pop {
		width: 600rpx;
		height: 440rpx;
		border-radius: 20rpx;
	}

	.pop .title {
		width: 200rpx;
		margin: 20rpx auto;
		text-align: center;
	}

	.textInput {
		width: 500rpx;
		line-height: 40rpx;
		font-size: 26rpx;
		border: 1rpx solid #dcdcdc;
		padding: 10rpx 10rpx;
		margin: 30rpx auto;
	}

	.pop .btn {
		width: 380rpx;
		margin: 40rpx auto;
		display: flex;
		justify-content: space-between;
	}

	.pop .btn view {
		width: 150rpx;
		height: 60rpx;
		line-height: 60rpx;
		text-align: center;
		border-radius: 10rpx;
		background: rgba(220, 220, 220, 0.5);
	}

	.file {
		width: 400rpx;
		height: 300rpx;
	}

	.file .ok {
		width: 150rpx;
		height: 50rpx;
		line-height: 50rpx;
		text-align: center;
		margin: 0 auto;
		border-radius: 8rpx;
		background: rgba(220, 220, 220, 0.5);
	}

	.upload {
		margin: 20rpx 120rpx;
	}

	/*删除好友*/
	.isdelete {
		position: relative;
		width: 590rpx;
		height: 222rpx;
	}

	.isdelete .title {
		position: absolute;
		top: 54rpx;
		left: 206rpx;
		font-size: 36rpx;
		color: #666666;
	}

	.btn {
		position: absolute;
		bottom: 0;
		width: 100%;
		height: 72rpx;
		display: flex;
		align-items: center;
	}

	.btn .cancel {
		width: 50%;
		height: 72rpx;
		line-height: 72rpx;
		font-size: 28rpx;
		color: #333333;
		text-align: center;
		border-top: 1rpx solid #F3F3F3;
	}

	.btn .ok {
		width: 50%;
		height: 72rpx;
		line-height: 72rpx;
		font-size: 28rpx;
		color: #FFFFFF;
		text-align: center;
		background: #4578D1;
	}
</style>
