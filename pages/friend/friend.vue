<template>
	<view class="app" @click="closeMenu">
		<Header select="2" @toPage="toPage" @groupChat="groupChat" @addFriend="addFriend" />
		<view class="block"></view>
		<!-- <view class="list_title" @click="toNewFriend()" v-if="!isGroupChat">添加新的朋友</view> -->
		<scroll-view class="scroll" scroll-y="true">
			<view class="friend_list" :class="{active:isGroupChat}">
				<block v-if="!isGroupChat">
					<view class="info" v-for="item in friendList" :key="item.friendid" @click="toFriend(item)">
						<image :src="item.avatar"></image>
						<view class="name">{{item.friendname}}</view>
						<view class="icon"></view>
					</view>
				</block>

				<block v-else>
					<view class="info" v-for="item in friendList" :key="item.friendid">
						<image :src="item.avatar"></image>
						<view class="name">{{item.friendname}}</view>
						<view class="show" v-if="isShow(item.friendid)">
							<view class="uncheck" v-if="!item.isSelect" @click="selectFriend(item)"></view>
							<view class="check" v-else @click="selectFriend(item)"></view>
						</view>
					</view>
				</block>

			</view>

			<view class="btn" v-if="isGroupChat">
				<view class="cancel" @click="isGroupChat=false">取消</view>
				<view class="ok" :style="groupList.length>0?'background:#4578D1;':''" @click="createGroup()">完成
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import PubSub from 'pubsub-js'
	import {
		sendAjax
	} from "@/common/sendAjax.js";
	export default {
		data() {
			return {
				friendList: [],
				isGroupChat: false, //是否是组建群组
				groupList: [], //好友数组
				type: 0, //是否是拉好友，2是拉好友
				groupId: 0, //拉人进群时群id
				groupName: '',
				friendGropList: [],
			}
		},
		onLoad(opations) {
			if (opations.type) {
				this.type = opations.type
			}
			if (opations.groupId) {
				this.groupId = opations.groupId
				uni.setStorageSync('groupId', opations.groupId)
			}
			if (opations.groupName) {
				this.groupName = opations.groupName
				uni.setStorageSync('groupName', opations.groupName)
			}
			if (opations.isGroupChat) {
				this.isGroupChat = opations.isGroupChat
				const data = {
					userId: uni.getStorageSync("userId"),
					groupid: opations.groupId
				}

				sendAjax("POST", "/index/Index/getallgropmb", data)
					.then(res => {
						const memberlist = res.data.memberlist;
						const arr = [];
						memberlist.forEach(item => {
							arr.push(item.userId)
						})
						this.friendGropList.push(...arr);
					})
			}
		},
		mounted() {
			this.getFriendList();
			// this.indexVoice();
		},
		methods: {
			isShow(id) {
				return !this.friendGropList.find(item => item == id);
			},
			indexVoice() {
				this.$websocket.create(); //创建websocket
				setTimeout(() => {
					let msg = {
						type: "connectdo",
						uid: this.userId,
					};
					this.$websocket.sendMessage(msg);
				}, 500);
				uni.onSocketMessage(res => {
					console.log(res);
					if (JSON.parse(res.data)) {
						let item = JSON.parse(res.data);
						if (item.msgtype == 5) {
							uni.setStorageSync('backRoute', this.$websocket.getRoute());
							let param = uni.getStorageSync('backRoute');
							// 语音通话
							let roomId = `f_${item.sender}_${this.userId}`;
							this.$goBack(4,
								`/pages/voice/voice?id=${item.sender}&name=${item.sender_xm}&voice=2&roomid=${roomId}&backRoute=${param}`
							);
						}
					}
				});
			},
			//关闭header组件的menu
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
				if (value == 'friend') return;
				if (value == 'index') {
					return uni.reLaunch({
						url: '../index/index?userId=' + uni.getStorageSync('userId')
					})
				}
				uni.reLaunch({
					url: '../' + value + '/' + value
				})
			},
			toFriend(data) {
				// console.log(item)
				uni.navigateTo({
					url: `../msginfo/msginfo?id=${data.friendid}&name=${data.friendname}`
				})
			},
			toNewFriend() {
				uni.reLaunch({
					url: '../new_friend/new_friend'
				})
			},
			jump(index) {
				uni.reLaunch({
					url: index == 1 ? "../group_chat/group_chat" : "../new_friend/new_friend"
				})
			},
			getFriendList() {
				let that = this
				let url = '/index/Index/friendlist'
				let userId = uni.getStorageSync('userId')
				that.utils.tools.luch_get(url, {
					userId
				}).then(res => {
					// console.log('res=>', that.friendList)
					let arr = []
					arr = res.map(item => {
						// item.isSelect = false
						that.$set(item, 'isSelect', false)
						return item
					})
					that.friendList = arr
				})
			},
			//跳转到好友界面并开始组件群组
			groupChat(value) {
				this.isGroupChat = value
				this.friendList.forEach(item => {
					item.isSelect = false
				})
			},
			selectFriend(data) {
				// console.log('data=>', this.groupList.toString())

				let flag = true //默认是添加
				let num = 0;

				for (var i = 0; i < this.groupList.length; i++) {
					if (this.groupList[i] == data.friendid) {
						flag = false
						num = i
						break
					} else {
						flag = true

					}
				}

				if (flag) {
					data.isSelect = true
					this.groupList.push(data.friendid)
				} else {
					data.isSelect = false
					this.groupList.splice(num, 1)
				}
			},
			//创建群组
			createGroup() {
				if (this.type == 2) {
					if (this.groupList.length < 1) return;
					let this_ = this
					let url = '/index/Index/adduingroup'
					let groupId = this_.groupId
					let uliststr = this_.groupList.toString()
					this_.utils.tools.luch_get(url, {
						userId: uni.getStorageSync('userId'),
						groupid: groupId,
						uliststr
					}).then(res => {
						if (res.status == 1) {
							this.$goBack(1, 1);
						} else {
							uni.showToast({
								title: res.msg,
								icon: "none"
							})
							setTimeout(() => {
								uni.redirectTo({
									url: "/pages/index/index",
									fail: (err) => {
										console.log(err);
									}
								})
							}, 300)

						}
					})
					return
				}
				if (this.groupList.length <= 0) {
					uni.showToast({
						title: '至少需要邀请一位好友',
						icon: "none"
					})
					return
				}
				let that = this
				let url = '/index/Index/creatgroup'
				let uliststr = that.groupList.toString()
				that.utils.tools.luch_get(url, {
					userId: uni.getStorageSync('userId'),
					uliststr
				}).then(res => {
					if (res.status == 1) {
						uni.showToast({
							title: '创建成功',
							icon: "none"
						})
						let name = res.groupinfo.groupname
						let id = res.groupinfo.id
						uni.reLaunch({
							url: '../group_msg/group_msg?id=' + id + '&name=' + name
						})
					} else {
						uni.showToast({
							title: res.msg,
							icon: "none"
						})
					}
				})
			}
		}
	}
</script>

<style>
	.block {
		height: 270rpx;
		border-bottom: 1px solid #F2F5F8;
	}

	.scroll {
		position: fixed;
		top: 270rpx;
		/* #ifdef APP-PLUS */
		margin-top: 30rpx;
		/* #endif */
		height: 80vh;
		width: 100vw;
	}


	.friend_list {
		width: 100vw;
		position: absolute;
	}

	.friend_list.active {
		padding-bottom: 80rpx;
	}

	.app {
		width: 100%;
		min-height: 100vh;
	}

	.friend_list .info {
		position: relative;
		width: 680rpx;
		height: 108rpx;
		margin-left: 35rpx;
		display: flex;
		align-items: center;
		border-bottom: 1rpx solid rgba(192, 192, 192, 0.5);
	}

	.friend_list .info image {
		width: 66rpx;
		height: 66rpx;
		border-radius: 50%;
	}

	.friend_list .info .name {
		font-size: 28rpx;
		font-weight: bold;
		color: #323643;
		margin-left: 20rpx;
	}

	.friend_list .info .icon {
		position: absolute;
		right: 0;
		width: 44rpx;
		height: 44rpx;
		background: url('@/static/img/msg2.png') no-repeat;
		background-size: contain;
	}


	.list_title {
		width: 670rpx;
		height: 90rpx;
		line-height: 90rpx;
		background: #F7FBFF;
		border-radius: 30rpx;
		font-size: 36rpx;
		color: #AEB5C0;
		text-align: center;
		margin-top: 320rpx;
		margin-left: 42rpx;
	}

	.line {
		width: 750rpx;
		height: 1rpx;
		background: #F2F5F8;
		margin-top: 12rpx;
	}

	.info .show {
		position: absolute;
		right: 0;
		/* bottom: 24rpx; */
		width: 44rpx;
		height: 44rpx;
	}

	.info .uncheck {
		width: 44rpx;
		height: 44rpx;
		background: #FFFFFF;
		opacity: 1;
		border: 2rpx solid #AEB5C0;
		border-radius: 50%;
	}

	.info .check {
		width: 44rpx;
		height: 44rpx;
		background: url('@/static/img/check.png');
		background-size: cover;
	}

	.btn {
		position: fixed;
		bottom: 0;
		width: 750rpx;
		height: 100rpx;
		border-top: 1rpx solid rgba(192, 192, 192, 0.5);
		background: #FFFFFF;
		z-index: 100;
		display: flex;
		align-items: center;
	}

	.btn view {
		min-width: 120rpx;
		height: 50rpx;
		line-height: 50rpx;
		font-size: 28rpx;
		text-align: center;
		background: rgba(192, 192, 192, 0.5);
		border-radius: 15rpx;
	}

	.btn .cancel {
		position: absolute;
		right: 192rpx;
		color: #FFFFFF;
		background: #a8aeb7;
	}

	.btn .ok {
		position: absolute;
		right: 40rpx;
		color: #FFFFFF;
		background: #a8aeb7;
	}
</style>
