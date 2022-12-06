<!-- 个人信息 -->
<template>
	<view class="app">

		<view class="header">
			<view class="retuen_icon" @click="returnToIndex()"></view>
			<view class="authInfo">个人信息</view>
		</view>

		<view class="auth">
			<u-upload @afterRead="afterRead">
				<image :src="user.avatar"></image>
			</u-upload>

			<view class="user">
				<view class="name" v-if="showName">{{user.xm}}</view>
				<view class="input" v-else>
					<input placeholder="请输入新昵称" border="surround" v-model="userName" style="padding: 0 8rpx;" focus
						@blur="updateUserName"></input>
				</view>
				<view class="edit" @click="showName=false"></view>
			</view>

		</view>

		<view class="line"></view>

		<view class="info">
			<view class="userName">
				<view class="infoid">用户ID</view>
				<view class="uid">{{user.userId}}</view>
			</view>
			<view class="user_line"></view>
			<view class="userSign" @click="showUpdate=true;value=user.sign">
				<view class="sign">个性签名</view>
				<view class="right"></view>
			</view>
			<view class="signContent">{{user.sign||'暂无签名'}}</view>
			<view class="user_line"></view>
		</view>

		<view class="update_btn" v-show="false">确认修改</view>

		<!--修改数据-->
		<u-popup :show="showUpdate" mode="center">
			<view class="pop">
				<view class="title">修改签名</view>
				<textarea placeholder="请输入内容" v-model="value" class="textInput" style="height: 200rpx;"></textarea>
				<view class="btn">
					<view @click="showUpdate=false">取消</view>
					<view @click="updateUserInfo()">确认</view>
				</view>
			</view>
		</u-popup>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				data: ['更换头像', '修改用户名', '修改个性签名'],
				showUpdate: false,
				value: '',
				updateTitle: '',
				fileList: [],
				user: uni.getStorageSync('user'),
				isFile: false,
				userImg: '',
				showName: true, //是否显示用户名
				userName: ''
			}
		},
		mounted() {
			console.log(uni.getStorageSync('user'))
		},
		methods: {
			updateInfo(data) {
				let that = this
				that.showUpdate = true
				if (data == "更换头像") {
					that.isFile = true
					that.fileList = []
					return
				}
				that.updateTitle = data
			},
			// 删除图片
			deletePic(event) {
				this.fileList.splice(event.index, 1)
			},
			// 新增图片
			async afterRead(event) {
				let that = this;
				let userId = uni.getStorageSync('userId')
				uni.uploadFile({
					url: this.$base.apiUrl + 'api/Upload/upheadimgurl', // 仅为示例，非真实的接口地址
					filePath: event.file.url,
					name: 'file',
					formData: {
						userId
					},
					success: (res) => {
						that.user.avatar = JSON.parse(res.data).path
						uni.setStorageSync('user', that.user)
					}
				});
			},
			//修改用户签名
			updateUserInfo() {
				let that = this
				if (!that.value) {
					uni.showToast({
						title: '请输入要修改的内容',
						icon: "none"
					})
					return
				}
				let url = '/index/User/setsign'
				that.utils.tools.luch_get(url, {
					userId: that.user.userId,
					sign: that.value
				}).then(res => {
					if (res.status == 1) {
						that.user.sign = that.value
						uni.setStorageSync('user', that.user)
						that.showUpdate = false
						uni.showToast({
							title: '修改成功',
							icon: "none"
						})
					}
				})

			},

			//修改用户头像,将用户信息放进缓存
			updateAvatar() {
				this.user.avatar = this.userImg
				uni.setStorageSync('user', this.user)
				this.showUpdate = false
				uni.showToast({
					title: '修改成功',
					icon: "none"
				})
			},

			//修改用户名
			updateUserName() {
				let that = this
				if (!that.userName)
					return that.showName = true

				let url = '/index/User/setuname'
				that.utils.tools.luch_get(url, {
					userId: that.user.userId,
					name: that.userName
				}).then(res => {
					if (res.status == 1) {
						uni.showToast({
							title: '修改成功',
							icon: "none"
						})
						that.showName = true
						that.user.xm = that.userName
						uni.setStorageSync('user', that.user)
						that.userName = ''
					}
				})
			},

			returnToIndex() {
				uni.reLaunch({
					url: '../index/index?userId=' + this.user.userId
				})
			}
		}
	}
</script>

<style>
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
</style>
