<!-- 主页面 -->
<template>
	<view class="app">
		<Header class="header" id="header" select="1" @toPage="toPage" @groupChat="groupChat" @addFriend="addFriend" />
		<view class="block"></view>
		<!--好友会话列表-->
		<view class="firend_msg" v-for="(vo,i) in dialogueList" :key="vo.id" @click="toMsgInfo(vo)"
			:class="{active:noreadnum(vo.noreadnum),move:move && moveId == vo.id}" @longtap.stop="moveEnd(vo.id)">
			<!--  好友对话列表 -->
			<view class="group_avatar" v-if="vo.groupid!=0">
				<sudoku :item="vo.meberlist"></sudoku>
			</view>
			<image :src="vo.avatar" v-else class="avatar"></image>
			<view class="msg_info">
				<view :class="+vo.friendid==kefuid?'msg_title kefuCss':'msg_title ' " class="msg_title">{{vo.name}}
				</view>
				<view class="msg_desc">{{decrypt(vo.lastmsg)}}</view>
				<view class="msg_num" v-if="vo.noreadnum>0">{{vo.noreadnum}}</view>
			</view>
			<view class="msg_data">{{vo.lasttime}}</view>
			<view class="delete" @click.stop="deleteMsg(vo.id)" :class="{move:move && moveId == vo.id}">
				删除
			</view>
		</view>
	</view>
</template>

<script>
	import sudoku from '@/components/sudoku.vue';
	import {
		mainUrl
	} from "@/common/base.js"
	import emojiTran from "@/components/emojiTran.js"
	import {
		sendAjax
	} from "@/common/sendAjax.js"
	export default {
		components: {
			sudoku
		},
		data() {
			return {
				dialogues: '', //JSON对话数组
				userId: "",
				showaddf: false,
				searchkey: '',
				searchlist: [],
				dialogueList: [],
				timer: '',
				kefuid: 0,
				currentPageInfo: "",
				actionId: '',
				toTP: false,
				move: false,
				startInfo: [],
				moveId: 0,
			}
		},
		onReady() {},
		onLoad(options) {
			if (options.no) {
				uni.showToast({
					title: "没有权限",
					icon: "none"
				})
			}
			// 获取客服信息
			this.utils.tools.luch_get('/index/Index/getsinfo').then(rs => {
				this.kefuid = rs.userId
			})
			// #ifdef H5
			if (options.userId) {
				this.userId = options.userId
				uni.setStorageSync('userId', this.userId);
			}
			// #endif

			// 如果附带了其他路由，就跳转到这个路由
			// 用于 语音通话后的跳转刷新
			if (options.goGo) {
				console.log('index收到的参数', options.goGo);
				this.$goBack(2, options.goGo);
			}
		},
		onHide() {
			clearInterval(this.timer)
		},
		onUnload() {
			clearInterval(this.timer)
		},
		onReachBottom() {
			//console.log('触底加载更多');
		},
		onShow(props) {
			let userId = uni.getStorageSync('userId')
			// console.log("userId.onLoad: ", userId);
			if (userId) {
				this.userId = userId
			}
			if (this.userId) {
				this.getUserInfo();
				this.getUserDialogueList(); //定时获取消息
				this.changeMyVoice(); //重置通话状态
				/*********************websockt***************************/
				this.indexVoice();
				return
			}
			if (this.toTP) {
				this.check()
				this.toTP = false
			} else {
				// 拉起tp登录
				// #ifdef APP
				let num = parseInt(Math.random() * 10000)
				num = num >= 1000 ? '' + num : '0' + num
				this.actionId = new Date().getTime() + num
				// 生成拉起tp钱包的url参数
				this.url = 'tpoutside://pull.activity?param=' + JSON.stringify({
					"callbackUrl": encodeURIComponent(
						mainUrl + "/api/Pageinit/tpcallback"), //登录成功的回调地址
					"action": "login", // 拉起功能  login 登录
					"actionId": this.actionId, // 生成的唯一id，通过该参数从后端获取登录信息
					"blockchains": [{
						"chainId": "1",
						"network": "tron"
					}],
					"dappIcon": encodeURIComponent("https://chatapi.dragonloo.co/logoloo.png"), //授权登录时显示的图标
					"dappName": "LOOIM", //授权登录时显示的名字
					"protocol": "TokenPocket",
					"version": "2.0"
				})
				this.toTP = true
				plus.runtime.openURL(this.url)
				// #endif
			}
		},
		onPageScroll() {
			this.move = false;
			this.moveId = null;
		},
		methods: {
			noreadnum(num) {
				return num > 0;
			},
			moveEnd(id) {
				this.move = true;
				this.moveId = id;
			},
			deleteMsg(id) {
				const index = this.dialogueList.findIndex(item => item.id == id);
				if (index != -1) {
					const data = {
						userId: uni.getStorageSync('userId'),
						dialogueid: id
					}
					uni.showLoading({
						title: "Loading"
					})
					sendAjax("POST", "index/Index/deldialogue", data)
						.then(res => {
							if (res.data.status == 1) {
								this.dialogueList.splice(index, 1);
							} else {
								uni.showToast({
									title: "删除错误",
									icon: 'none'
								})
							}
							uni.hideLoading();
						})
				}
			},
			decrypt(msg) {
				return emojiTran(msg);
			},
			check() {
				this.utils.tools.API_get('/api/Pageinit/getuactionid', {
					actionId: this.actionId
				}).then(res => {
					console.log("API_get.res: ", res);
					if (res.status == 1) {
						this.utils.tools.API_post('/api/Pageinit/home', {
							wallet: res.data.wallet
						}).then(result => {
							// result={wallet,userId,token}
							console.log("result=====> ", result);
							this.userId = result.userId
							uni.setStorageSync('userId', result.userId)
							this.getUserInfo();


							this.getUserDialogueList(); //定时获取消息
							this.changeMyVoice(); //重置通话状态
							/*********************websockt***************************/
							this.indexVoice();
						})
					}
				}).catch(error => {
					console.log(error, 1111);
				})
			},

			// 接收语音
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
					if (JSON.parse(res.data)) {
						if (this.getUserDialogueList) {
							this.getUserDialogueList();
						}
						let item = JSON.parse(res.data);
						if (item.msgtype == 5) {
							let param = this.$websocket.getRoute(); //获取路由
							// 语音通话
							let roomId = `f_${item.sender}_${this.userId}`;
							console.log('传递的路由', param);
							this.$goBack(4,
								`/pages/voice/voice?id=${item.sender}&name=${item.sender_xm}&voice=2&roomid=${roomId}&backRoute=${param}`
							);
						}
					}
				});
			},
			// 重置自己的通话状态
			changeMyVoice() {
				let voice = uni.getStorageSync('myVoiceState'); //如果为true就是重置过了，就不做操作
				// 为false就重置通话状态
				if (voice) return
				// 重置自己的通话状态、
				this.utils.tools.luch_get('index/Index/initvoice', {
					userId: this.userId,
					status: 0
				}).then(rs => {
					console.log(rs);
					uni.setStorageSync('myVoiceState', 'true');
				})
			},
			//自定义事件，发起群聊
			groupChat(data) {
				uni.navigateTo({
					url: '../friend/friend?isGroupChat=' + data
				})
			},
			//自定义事件，添加好友
			addFriend() {
				uni.reLaunch({
					url: '../new_friend/new_friend'
				})
			},
			// 进入聊天
			toMsgInfo(data) {
				if (this.move) return this.move = false;
				// console.log(data.groupid);
				if (data.groupid) {
					uni.navigateTo({
						url: `/pages/group_msg/group_msg?id=${data.groupid}&name=${data.name}&group_msg=0`
					})
				} else {
					uni.navigateTo({
						url: '/pages/msginfo/msginfo?id=' + data.friendid + '&name=' + data.name
					})
				}
			},
			//页面跳转
			toPage(value) {
				if (value == 'index') return;
				// this.$websocket.closeWebsocket();//关闭websocket
				this.$goBack(4, `../${value}/${value}`);
			},
			// 获取本人账户信息
			getUserInfo() {
				let that = this
				let url = '/index/Index/intuinfo'
				that.utils.tools.luch_get(url, {
					userId: that.userId,
					deviceid: uni.getStorageSync('registerID')
				}).then(res => {
					let data = {
						avatar: res.headimgurl,
						sign: res.sign,
						userId: res.userId,
						xm: res.xm,
					}
					uni.setStorageSync('address', res.address);
					uni.setStorageSync('user', data)
					uni.setStorageSync('userId', res.userId)
				})
			},
			//获取对话信息列表
			getUserDialogueList() {
				let url = '/index/Index/getdialogue'
				let userId = this.userId
				this.utils.tools.luch_get(url, {
					userId
				}).then(res => {
					// console.log(res, 'getUserDialogueList');
					this.getDialogueUnread(res)
				})
			},
			//获取每个对话对应的未读条数
			getDialogueUnread(dialogList) {
				let that = this
				let url = '/index/Index/getnoreadnum'
				let arr = []
				dialogList.forEach(item => { //循环对话列表
					// console.log(item)
					let id = item.id
					/* let msguuid = 0;
					// console.log(item)
					if (item.friendid) { //如果好友id不为0，说明是好友聊天
						let friend = uni.getStorageSync(item.friendid + '_' + that.userId) //得到好友的缓存信息
						if (friend) {
							msguuid = friend[friend.length - 1].msguuid
						}
					} else { //群聊
						let group = uni.getStorageSync(item.groupid + '_' + that.userId)
						if (group) {
							msguuid = group[group.length - 1].msguuid
						}
					} */
					let data = {
						id,
						// msguuid
					}
					arr.push(data)
				})
				that.utils.tools.luch_get(url, {
					userId: that.userId,
					dialdata: JSON.stringify(arr)
				}).then(res => {
					res.forEach(item => {
						dialogList.map(data => {
							if (data.id == item.id) {
								data.noreadnum = item.noreadnum
								data.avatar = this.imgJoin(data.avatar);
							}
						})
					})
					that.dialogueList = dialogList
					// console.log(dialogList);
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

	.firend_msg {
		position: relative;
		width: 100%;
		height: 160rpx;
		display: flex;
		transition: .3s;
	}

	.firend_msg.move {
		transform: translateX(-140rpx);
	}

	.firend_msg .delete {
		position: absolute;
		right: -140rpx;
		height: 160rpx;
		width: 140rpx;
		font-size: 30rpx;
		text-align: center;
		line-height: 160rpx;
		color: white;
		display: none;
		box-sizing: border-box;
		background-color: red;
	}

	.firend_msg .delete.move {
		display: inline-block;
	}

	.firend_msg .avatar {
		position: absolute;
		top: 20rpx;
		left: 40rpx;
		width: 120rpx;
		height: 120rpx;
		border-radius: 50rpx;
	}


	.msg_title {
		position: absolute;
		left: 190rpx;
		font-size: 28rpx;
		font-weight: bold;
		color: #323643;
		margin-top: 36rpx;
	}

	/* 客服的独特样式 */
	.kefuCss {
		color: #2b9939;
	}

	.msg_data {
		position: absolute;
		right: 40rpx;
		top: 48rpx;
		font-size: 20rpx;
		color: #AEB5C0;
	}

	.msg_desc {
		position: absolute;
		top: 80rpx;
		left: 190rpx;
		width: 400rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		font-size: 28rpx;
		color: #AEB5C0;
		margin-top: 10rpx;
	}

	.msg_num {
		position: absolute;
		top: 10rpx;
		left: 132rpx;
		width: 40rpx;
		height: 40rpx;
		line-height: 40rpx;
		font-size: 20rpx;
		font-weight: 500;
		color: #ffffff;
		text-align: center;
		border-radius: 50%;
		background: #F65959;
	}

	.active {
		background: #F6F9FF;
	}

	/*群头像*/
	.group_avatar {
		position: absolute;
		top: 20rpx;
		left: 40rpx;
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
</style>
