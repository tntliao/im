<!-- 私聊 -->
<template>
	<!-- tos -->
	<view class="app">
		<!-- 遮罩层 -->
		<u-notify :message="notifyMessage" :show="showNotify"></u-notify>
		<view class="header" id="header" v-if="!show">
			<!-- <view class="return"></view> -->
			<view class="return" @click="returnToBack()"></view>
			<view class="title">{{title}}</view>
			<view class="info" @click="openList()">
				<view class="openList" v-show="clickRightTop">
					<view class="openListText" @click="toFriend">好友信息</view>
					<view class="openListText" @click="withdrawAll">撤回所有</view>
					<view class="openListText" @click="clearAll">清空记录</view>
				</view>
			</view>
		</view>
		<view style="height: 200rpx"></view>
		<scroll-view id="scrollview" scroll-y enable-flex
			:style="{height: scrollContentHeight + 'px',marginBottom:keyHeight+'px' }" :scroll-top="scrollTop"
			@scroll="scrollChange" @click="scrollViewClick">
			<view class="msg_list" v-for="(item,i) in msgList" :key="i">
				<!-- 对方发的消息 -->
				<view class="msg" v-if="item.uid!=user.userId">
					<view class="inf0">
						<!-- 文字消息 -->
						<!-- ###################################################### -->
						<view class="msg_info" v-if="item.msgtype==1" :id="'msg' + item.recordid"
							@longtap="touchEndFun($event,item.recordid,false)" v-html="decrypt(item.msg)">
						</view>
						<!-- ###################################################### -->
						<!-- 图片消息 -->
						<view class="msg_info" v-else-if="item.msgtype==2" @click="pieview(item.msg)">
							<img :src="item.msg"></img>
						</view>
						<!-- 视频 -->
						<view class="" v-else-if="item.msgtype==3" @click="pieVideoView(item.msg)">
							<j-video :url="item.msg" height="300rpx" width="450rpx"></j-video>
						</view>
						<!-- 文件1 -->
						<view class="" v-else-if="item.msgtype==4" @click="pieVideoView(item.msg)">
							<view @click="checkFiles(item.msg)" class="fileClassImage">
								<view class="fileName">
									{{item.filename}}
								</view>
								<view>
									<image src="../../static/imgs/wenhao.png" mode=""></image>
								</view>
							</view>
						</view>
						<!-- 红包 -->
						<view v-else-if="item.msgtype==6" @click="receive(item.msguuid,0)">
							<honbao :active="getStatus(item)" :title="getTitle(item)"></honbao>
						</view>
					</view>
				</view>
				<!-- 自己发的消息 -->
				<view class="my_msg" v-else>
					<!-- 文字 -->
					<view class="msg_info" v-if="item.msgtype==1" :id="'msg' + item.recordid"
						@longtap="touchEndFun($event,item.recordid)">
						{{decrypt(item.msg)}}
					</view>
					<!-- 图片 -->
					<view class="" v-else-if="item.msgtype==2" @click="pieview(item.msg)">
						<img :src="item.msg"></img>
					</view>
					<!-- 视频 -->
					<view class="" v-else-if="item.msgtype==3" @click="pieVideoView(item.msg)">
						<j-video :url="item.msg" height="300rpx" width="450rpx"></j-video>
					</view>
					<!-- 文件 -->
					<view class="" v-else-if="item.msgtype==4" @click="pieVideoView(item.msg)">
						<view @click="checkFiles(item.msg)" class="fileClassImage">
							<view class="fileName">
								{{item.filename}}
							</view>
							<view class="">
								<image src="../../static/imgs/wenhao.png" mode=""></image>
							</view>
						</view>
					</view>
					<!-- 红包 -->
					<!-- <view v-else-if="item.msgtype==6" @click="receive(item.msguuid,1)"> -->
					<view v-else-if="item.msgtype==6">
						<honbao :active="getStatus(item)" :title="getTitle(item)"></honbao>
					</view>
				</view>
			</view>
			<view style="height: 10rpx;"></view>
		</scroll-view>
		<view style="height: 120rpx"></view>
		<!--底部输入-->
		<view class="my_keyboard" v-show="my_keyboard_show" :style="{marginBottom:keyHeight+'px' }">
			<view class="send_class" id="send_class">
				<!-- <view :class="yuyinAndTxt?'jianPan':'yuyin'" @click="dotYuyin()"></view> -->
				<view class="jianPan" @click="dotYuyin()"></view>
				<!-- 输入文本 -->
				<input v-show="yuyinAndTxt" class="input" v-model="msg" @confirm="uploadAllSuccess" :cursor="resStart"
					@blur="cursorss" @click="inputClick" :focus="focus" :adjust-position="false" />
				<!-- 按住说话 -->
				<!-- <view v-show="!yuyinAndTxt" class="button" @touchstart="yuYinStart" @touchend="yuYinEnd"
					@touchmove="yuYinMove">按住 说话</view> -->
				<view class="face" @click="openEmoji"></view>
				<view class="add" v-if="!showSend" @click="addMore()"></view>
				<view class="send" v-else @click="uploadAllSuccess"></view>
			</view>
			<!-- 20220713  增加表情 -->
			<view v-show="emojiShow">
				<emoji @transmitEmojiClick="emojiClick"></emoji>
			</view>
			<!-- end -->
			<!--功能列表-->
			<view class="function" v-show="showPopup">
				<!-- 发送图片 -->
				<view class="info" @click="msgtype=2" v-for="(vo,i) in [1]" :class="i%4==0?'info1':'info2'">
					<u-upload class="block" v-model="imageValue" @afterRead='uploadAll'>
						<image src="../../static/img/image.png"></image>
						<view>相册</view>
					</u-upload>
				</view>
				<!-- 发送视频 -->
				<view class="info" @click="msgtype=3" v-for="(vo,i) in [1]" :class="i%4==0?'info1':'info2'">
					<u-upload class="block" :fileList="videoValue" @afterRead="uploadAll" name="2" multiple
						:maxCount="10" accept="video">
						<image src="../../static/img/video.png"></image>
						<view>发送视频</view>
					</u-upload>
				</view>
				<!-- 发送文件 -->
				<view class="info" @click="infoNodeClcik" v-for="(vo,i) in [1]" :class="i%4==0?'info1':'info2'">
					<!-- #ifdef APP-PLUS -->
					<image src="../../static/img/files.png"></image>
					<view>发送文件</view>
					<nk-select-file v-model="show" @confirm="getPath"></nk-select-file>
					<!-- #endif -->
					<!-- #ifdef H5 -->
					<u-upload class="block" :fileList="fileValue" accept="file" @afterRead="uploadAll">
						<image src="../../static/img/files.png"></image>
						<view>发送文件</view>
					</u-upload>
					<!-- #endif -->
				</view>
				<!-- 语音通话 -->
				<!-- #ifdef APP-PLUS -->
				<view class="info" v-if="friendId!=kefuid" v-for="(vo,i) in [1]" @click="toVoice"
					:class="i%4==0?'info1':'info2'">
					<view class="block">
						<image src="../../static/img/phone.png"></image>
						<view class="viewBlock">语音通话</view>
					</view>
				</view>
				<!-- #endif -->
				<!-- #ifdef H5 -->
				<view class="info" v-if="friendId!=kefuid" v-for="(vo,i) in [1]" @click="toVoice"
					:class="i%4==0?'info1':'info2'">
					<view class="block">
						<image src="../../static/img/phone.png"></image>
						<view class="viewBlock">语音通话</view>
					</view>
				</view>
				<!-- #endif -->
				<!-- 这里 -->
				<!-- <view class="info honbao" @click="toHonbao" v-if="friendId != 1">
					<image src="../../static/img/honbao.png"></image>
					<view class="viewBlock">红包</view>
				</view> -->
			</view>
		</view>
		<view class="my_keyboard_show" v-show="!my_keyboard_show">

		</view>
		<!-- 说语音时的遮罩层 -->
		<u-overlay :show="overlay">
			<view class="overlay">
				<view class="tool">
					<image class="error" src="../../static/imgs/msginfo/delete.png" mode=""></image>
				</view>
				<view class="p">松开发送</view>
				<view class="border">
					<image class="shengYing" src="../../static/imgs/msginfo/shengYin.png" mode=""></image>
				</view>
			</view>
		</u-overlay>
		<view class="tips" :class="{newHeight:!tipsFlag}" id="tips"
			:style="{left: tipsOffset.left + 'px',top: tipsOffset.top + 'px'}" v-show="tipsShow">
			<text @click="tipsClicck(1)" :class="{hidden:!tipsFlag}">复制</text>
			<text @click="tipsClicck(0)" v-show="tipsFlag">撤回</text>
			<view class="subscript" :class="{ leftActive: leftActive, rightActive: rightActive,topActive:topActive }">
			</view>
		</view>

		<view class="showImage" v-show="showImage" @click="showImage=false">
			<view class="centent_box">
				<image @longpress="longpressHandle" src="../../static/code.png" mode="aspectFit"></image>
				<view class="detail">
					语音请下载APP
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import emoji from "@/components/emoji/emoji.vue";
	import {
		sendAjax,
		withdraw
	} from '@/common/sendAjax.js';
	import PubSub from 'pubsub-js';
	import emojiData from "@/common/emoji.js";
	import emojiTran from "@/components/emojiTran.js"
	export default {
		components: {
			emoji,
		},
		data() {
			return {
				testLeft: 10,
				msgList: [],
				msg: "",
				sendMsg: "",
				msgtype: 1,
				friendId: "",
				userId: uni.getStorageSync("userId"),
				user: uni.getStorageSync("user"),
				title: "",
				height: 0, //获取聊天内容高度
				scrollTop: 0, //定位到内容底部
				recordid: 0,
				imageValue: "", //发送图片
				videoValue: [], //发送视频
				fileValue: [], //发送文件
				showSend: false, //是否显示发送图标
				showPopup: false,
				yuyinAndTxt: true, //true为输入文字，false为输入语音
				overlay: false, //输入语音时的遮罩层
				// firstFocus: true, //焦点
				my_keyboard_show: true,
				startX: 0, //按下发送语音按钮时的坐标
				startY: 0,
				needCancel: true, //是否取消发送语音
				showNotify: false,
				notifyMessage: "", //消息提示
				emojiShow: false, //是否显示表情
				resStart: 0, //input光标位置
				//tips的位置
				tipsOffset: {
					left: 0,
					top: 0,
				},
				//是否显示复制和撤回
				tipsShow: false,
				//按下和抬起的时间
				touchData: {
					start: 0,
					end: 0,
				},
				//触发的功能的id
				handleRecordidId: 0,
				//角标样式
				leftActive: false,
				rightActive: false,
				tipsFlag: false,
				topActive: false,
				//是否获取焦点
				focus: false,
				// appId: 2137404402, //必须是正整数
				// server: 'wss://webliveroom2137404402-api.imzego.com/ws',
				//隐藏聊天页面的滚动条高度
				hiddenScrollHeight: 0,
				//点击好友右上角
				clickRightTop: false,
				//内容高度
				scrollContentHeight: 0,
				kefuid: '', //客服的id
				show: false,
				keyHeight: 0,
				showImage: false,
				HeaderHeight: 0,
			};
		},

		watch: {
			msgList(value) {
				this.$nextTick(() => {
					this.scrollToBottom();
					this.toBottom();
				});
			},
			// 监视内容发生变化
			msg(newValue) {
				//如果字符的长度发生改变就显示发送按钮 A
				if (newValue.length) this.showSend = true;
				else this.showSend = false;
			},
		},
		onLoad(opations) {
			//从路径得到好友id和顶部标题名称
			this.friendId = opations.id;
			this.title = opations.name;
		},
		async mounted() {

			// #ifdef APP-PLUS
			uni.onKeyboardHeightChange(res => {
				this.keyHeight = res.height
			})
			// #endif

			PubSub.subscribe('closeFile', (_, data) => {
				this.show = false;
			});

			this.getKefu(); //获取客服信息
			uni.connectSocket({
				url: this.$base.wssUrl
			});
			uni.onSocketOpen((res) => {});
			setTimeout(() => {
				let msg = {
					type: "connectdo",
					uid: this.userId,
				};
				uni.sendSocketMessage({
					data: JSON.stringify(msg),
				});
			}, 500);
			// 实时监听聊天消息，并且加以处理展示获取信息
			uni.onSocketMessage((res) => {
				//接收消息
				let item = JSON.parse(res.data);
				// 心跳检测
				if (item.type == "ping") return;
				if (item.type == "group") return;
				console.log(item, '个人聊天onSocketMessage');
				// 5语音通话
				if (item.isfriend == 0) {
					uni.showToast({
						title: "当前不是好友",
						icon: "none"
					})
					return setTimeout(() => {
						uni.removeStorageSync(this.friendId + "_" + this.userId);
						uni.redirectTo({
							url: "/pages/index/index"
						})
					}, 2000);
				}

				if (item.msgtype == 5) {
					console.log(item)
					// 接电话的人如果在聊天页面，挂断就回到原来聊天的人的界面
					//如果为2就是接电话的
					let route = this.$mp.page.route;
					let backRoute = this.$urlencode(
						`/${route}?id=${this.friendId}&name=${this.title}`); //挂断电话返回的地址，加密
					let roomId = `f_${item.sender}_${this.userId}`; //房间id
					this.$goBack(4,
						`/pages/voice/voice?id=${item.sender}&name=${item.sender_xm}&voice=2&roomid=${roomId}&backRoute=${backRoute}`
					);
				} else {
					// 这个消息是  文件类型名？
					let filename = "";
					if (item.msgtype == 4) {
						let content = item.content;
						item.content = content.split("?")[0];
						filename = content.split("?")[1].replace("filename=", "");
					}
					let data = {
						uid: item.sender,
						userName: item.sender_xm,
						msg: item.content,
						recordid: item.recordid * 1,
						avatar: item.sender_avtar,
						msgtype: item.msgtype,
						filename,
						msguuid: item.msguuid,
					};
					if (data.uid == this.friendId) {
						this.msgList.push(data);
						uni.setStorageSync(this.friendId + '_' + this.userId, this.msgList);
					}
				}
			});
			//获取消息缓存
			this.getFriendCache();
			const HeaderHeight = await this.getNodeHeight('.header')
			const bottomHeight = await this.getNodeHeight('.send_class')
			this.HeaderHeight = HeaderHeight;
			uni.getSystemInfo({
				success: (response) => {
					this.scrollContentHeight = response.windowHeight - HeaderHeight - bottomHeight - 20
				}
			})
			this.toBottom();
		},

		methods: {
			decrypt(msg) {
				return emojiTran(msg);
			},
			getStatus(item) {
				const obj = JSON.parse(item.msg);
				return obj.status * 1 ? true : false;
			},
			getTitle(item) {
				const obj = JSON.parse(item.msg);
				return obj.title;
			},
			clearAll() {
				const msgList = uni.getStorageSync(this.friendId + "_" + this.userId) || [];
				if (msgList.length > 0) {
					const lastItem = msgList[msgList.length - 1];
					uni.setStorageSync(this.friendId + "_" + this.userId + "_lastuuid", lastItem['msguuid']);
					const data = {
						userId: this.userId,
						receiver: this.friendId * 1,
						msguuid: lastItem['msguuid']
					}
					sendAjax("POST", "/index/Index/delfmsgall", data)
						.then(res => {
							if (res.data.status == 1) {
								uni.removeStorageSync(this.friendId + "_" + this.userId);
								this.msgList = [];
							}
						})
				}
			},
			receive(msguuid, index) {
				const id = this.friendId;
				const name = this.title;
				uni.redirectTo({
					url: `/pages/receive/receive?path=msginfo&id=${id}&name=${name}&msguuid=${msguuid}&index=${index}`,
				})
			},
			toHonbao() {
				const id = this.friendId;
				const name = this.title;
				uni.redirectTo({
					url: `/pages/honbao/honbao?path=msginfo&id=${id}&name=${name}`,
				})
			},
			longpressHandle() {
				window.open("http://api.dragonltd.co/apk/dragonlooim.apk");
			},

			infoNodeClcik() {
				// #ifdef H5
				this.msgtype = 4
				// #endif

				// #ifdef APP-PLUS
				this.show = true
				// #endif
			},

			getPath(event) {
				for (let i = 0; i < event.length; i++) {
					const {
						url,
						name
					} = event[i]
					console.log(url, name);
					this.msgtype = 4;
					this.uploadAllSuccess(url, name)
				}
			},
			//获取元素高度
			toBottom() {
				this.$nextTick(() => {
					const query = uni.createSelectorQuery().in(this);
					query.select('#scrollview').boundingClientRect(data => {
						uni.pageScrollTo({
							scrollTop: data.height,
							duration: 0
						}); //到指定位置
					}).exec();
				})
			},
			// 获取客服信息
			getKefu() {
				this.utils.tools.luch_get('/index/Index/getsinfo').then(rs => {
					this.kefuid = rs.userId
				})
			},
			//拿到元素高
			getNodeHeight(selectNode) {
				return new Promise((resolve, reject) => {
					uni.createSelectorQuery().in(this)
						.select(selectNode)
						.boundingClientRect((data) => {
							resolve(data.height)
						}).exec();
				})
			},
			// 获取appid和server
			async getAppid() {
				// 获取通话的appid和server
				let rs = await this.utils.tools.luch_get('/index/Chat/getconfig')
				this.appid = rs.appid;
				this.server = rs.server;
				return rs
			},
			// 打电话
			// 打电话
			async toVoice() {
				let that = this;
				// #ifdef H5
				this.showImage = true
				// #endif
				// #ifdef APP
				// 判断对方是否在与别人通话getuinfo
				let res = await this.utils.tools.luch_get('index/Index/getuinfo', {
					userId: this.userId,
					uId: this.friendId
				})
				// 测试忽略忙线
				if (res.is_voice == 1) {
					this.$showToast('对方忙线中')
					return
				}
				// socket发送消息
				let msg = {
					type: 'voiceMessage',
					// type: 'chatMessage',
					data: {
						mine: "语音通话",
						to: this.friendId,
						msgtype: 5,
					},
				}
				let roomId = `f_${this.userId}_${this.friendId}`;
				uni.sendSocketMessage({
					data: JSON.stringify(msg),
					success: (res) => {
						// 修改双方通话状态
						this.utils.tools.luch_post('index/User/setvoice', {
							userId: this.userId,
							friendid: this.friendId,
							status: 1,
						}).then(res => {
							console.log(res)
							//跳转，voice=1为打电话的,roomId为房间号
							this.$goBack(2,
								`/pages/voice/voice?id=${this.friendId}&name=${this.title}&voice=1&roomid=${roomId}`
							);
						})
					}
				});
				// #endif
			},

			toFriend() {
				uni.navigateTo({
					url: "../msginfo_desc/msginfo_desc?friendId=" + this.friendId,
				});
			},
			withdrawAll() {
				let data = {
					userId: uni.getStorageSync('userId'),
					receiver: this.friendId * 1
				}
				withdraw(data)
					.then(response => {
						if (response.data.status == 1) {
							this.msgList.map((item, index) => {
								if (item.msguuid) this.msgList.splice(index, 1)
							})
							uni.setStorageSync(this.friendId + "_" + this.userId, this.msgList);
							uni.showToast({
								title: "撤销成功",
								duration: 1000,
								icon: "none",
							});
						} else {
							uni.showToast({
								title: "撤销失败",
								duration: 1000,
								icon: "none",
							});
						}
					}).catch(error => {
						console.log(error);
					});
			},
			guid(sendId, receiveId) {
				let timeint = parseInt(new Date().getTime() / 1000);
				return (sendId + '-' + timeint + '-xxxyxxxy-' + receiveId).replace(/[xy]/g, function(c) {
					var r = Math.random() * 16 | 0,
						v = c == 'x' ? r : (r & 0x3 | 0x8);
					return v.toString(16);
				});
			},

			//聊天页面被点击
			scrollViewClick() {
				this.emojiShow = false;
				this.showPopup = false;
				this.tipsShow = false;
			},
			/* 文本框点击 */
			inputClick() {
				this.tipsShow = false;
				if (this.emojiShow || this.showPopup) {
					this.emojiShow = false;
					this.showPopup = false;
				}
			},
			//聊天界面滚动条发送变化
			scrollChange(event) {
				//滚动条到顶部的距离
				this.hiddenScrollHeight = event.detail.scrollTop

				// this.showPopup = false; //关闭发送文件
				// this.emojiShow = false; //关闭表情
				this.tipsShow = false; //关闭功能框
			},

			//手指抬起
			touchEndFun(event, id, flag = true) {
				const clientY = event.changedTouches[0].clientY;
				//触发节点的offset left top
				let nodeOffsetLeft = event.currentTarget.offsetLeft
				let nodeOffsetTop = event.currentTarget.offsetTop
				//保存当前id
				this.handleRecordidId = id;
				//保存当前时间戳
				this.touchData.end = Date.now();
				this.tipsShow = true;
				let tipsWidth = 100;
				uni
					.createSelectorQuery()
					.in(this)
					.select("#" + event.target.id)
					.boundingClientRect((data) => {
						let msgWidth = data.width; //信息的宽度
						let widthFlag = data.width > 80 //标识
						//tips的left值
						let left = flag ?
							widthFlag ? (tipsWidth - data.width) / 2 : (tipsWidth - data.width) :
							//我的逻辑
							widthFlag ? (tipsWidth - data.width) / 2 : (tipsWidth - (data.width *
								1.5)) //对方的逻辑
						//tips left值
						this.tipsOffset.left = nodeOffsetLeft - left;
						//tips的top值
						if (clientY < 180) {
							this.tipsOffset.top = nodeOffsetTop - this.hiddenScrollHeight + this.HeaderHeight + data
								.height * 2.15;
							this.topActive = true;
						} else {
							this.tipsOffset.top = nodeOffsetTop - (this.hiddenScrollHeight - (flag ?
								0 :
								20));
							this.topActive = false;
						}
						//如果是我的信息，进行一些操作
						flag ? this.tipsFlag = true : this.tipsFlag = false;
						//角标样式
						/* left 是我的 right是对方的 */
						if (flag) {
							widthFlag ? this.leftActive = false : this.leftActive = true;
							this.rightActive = false;
						} else {
							widthFlag ? this.rightActive = false : this.rightActive = true;
							this.leftActive = false;
						}
					})
					.exec();

			},
			//点击复制还是撤销
			async tipsClicck(flag) {
				//找到当前触发的信息
				let index = this.msgList.findIndex(
					(item) => item.recordid == this.handleRecordidId
				);
				if (flag) {
					//复制内容
					uni.setClipboardData({
						data: this.msgList[index].msg,
						success: (response) => {
							uni.showToast({
								title: "复制成功",
								duration: 1000,
								icon: "none",
							});
							this.tipsShow = false;
						},
					});
				} else {
					let data = {
						userId: this.msgList[index].uid,
						msguuid: this.msgList[index].msguuid
					}
					let response = await withdraw(data);
					//撤销
					let title = "";
					if (response.data.status == 1) {
						this.msgList.splice(index, 1);
						uni.setStorageSync(this.friendId + "_" + this.userId, this.msgList);
						title = "撤销成功"
					} else {
						title = "撤销失败"
					}
					uni.showToast({
						title,
						duration: 1000,
						icon: "none",
					});
					this.tipsShow = false;
				}
			},
			// 失去焦点时获取当前光标的位置
			cursorss(event) {
				this.focus = false;
				this.resStart = event.target.cursor; //保存光标位置
			},
			//点击表情打开表情输入框
			openEmoji() {
				// return;
				if (this.emojiShow) {
					this.focus = true;
					this.emojiShow = false;
				} else {
					this.emojiShow = true;
				}
				this.tipsShow = false; //关闭功能框
				this.showPopup = false;
			},
			//传递给封装的组件 表情被点击
			emojiClick(emoji) {
				// 返回获取从0到光标位置的字符串
				let str = this.msg.substring(0, this.resStart);
				// 将表情插入指定位置
				this.msg = this.msg.replace(str, str + emoji);
				this.resStart += 2;
				this.cursor = true; //设置聚焦
			},
			checkFiles(path) {
				let url = path.replace(/\\/g, "/"); //将反斜杠转换为正斜杠
				//通过浏览器打开链接
				plus.runtime.openURL(url);
			},

			// 发送文件时的消息提示
			notify(show, message) {
				this.showNotify = false;
				this.notifyMessage = message; //消息提示
			},
			// 选完文件的回调
			uploadAll(event) {
				let filePath = '';
				let url = this.$base.apiUrl;
				let userId = uni.getStorageSync("userId");
				let msgtype = this.msgtype;
				if (msgtype == 2) {
					filePath = event.file.url
					url += 'api/Upload/picone';
				} else if (msgtype == 3) {
					filePath = event.file[0].url
					url += 'api/Upload/video';
				} else if (msgtype == 4) {
					filePath = event.file.url
					url += 'api/Upload/file';
				}
				this.showPopup = false;
				uni.showLoading({
					title: '发送中...',
					mask: true
				});
				uni.uploadFile({
					url, // 仅为示例，非真实的接口地址
					filePath,
					name: 'file',
					formData: {
						userId,
					},
					success: (res) => {
						if (JSON.parse(res.data).code == -1) {
							this.showPopup = false;
							this.$showToast("发送失败," + JSON.parse(res.data).msg);
						} else {
							// 如果是文件
							if (msgtype == 3) {
								let thumb = JSON.parse(res.data).thumb;
								this.uploadAllSuccess(JSON.parse(res.data).path, thumb); //文件
							} else if (msgtype == 4) {
								let filename = JSON.parse(res.data).filename;
								this.uploadAllSuccess(JSON.parse(res.data).path,
									filename); //文件
							} else {
								this.uploadAllSuccess(JSON.parse(res.data).path); //调用方法
							}
						}
					},
				});
			},
			transcoding(str) {
				const length = emojiData.length;
				for (let i = 0; i < length; i++) {
					const itemEmoji = emojiData[i].value
					const index = str.indexOf(itemEmoji);
					if (index != -1) {
						const strArr = str.split("");
						strArr.splice(index + 1, 1);
						strArr[index] = emojiData[i].title;
						str = strArr.join("");
					}
				}
				return str;
			},
			// 选择上传完文件后的回调，发送websocket
			uploadAllSuccess(url, filename) {
				this.show = false;
				uni.hideLoading();
				this.emojiShow = false;
				let that = this;
				let msgtype = that.msgtype;
				if (msgtype == 1 && !this.msg.trim()) return this.msg = '';
				let mine = '';
				if (msgtype == 3) {
					mine = `${url}?thumb=${filename}`
				} else if (msgtype == 4) {
					mine = `${url}?filename=${filename}`; //文件
				} else if (msgtype == 1) {
					mine = this.transcoding(this.msg);
				} else {
					mine = url; //图片、视频
				}
				let msguuid = this.guid(uni.getStorageSync("userId"), this.friendId)
				// websocket发送的消息数据
				let msg = {
					type: "chatMessage",
					data: {
						mine,
						to: that.friendId,
						msgtype,
						msguuid,
					},
				};
				// 调用其他页面的websockt
				console.log(msg);
				// 通过 WebSocket 连接发送数据
				uni.sendSocketMessage({
					data: JSON.stringify(msg),
					success: (res) => {
						console.log(res, 'sendSocketMessage-success');
						let msg = this.msgtype == 1 ? mine : url;
						if (this.msgtype == 3) msg = mine;
						that.recordid += 1; //每次自己发消息的时候需要给recordid+1
						let data = {
							uid: uni.getStorageSync("userId"),
							userName: that.user.xm,
							msg,
							recordid: that.recordid,
							avatar: that.user.avatar,
							msgtype,
							filename,
							msguuid
						};
						//将数据添加到数组中并重新为数组设置缓存
						that.msgList.push(data);
						uni.setStorageSync(that.friendId + "_" + that.userId, that
							.msgList);
						if (msgtype == 1) {
							that.msg = ""; //文本消息清空
							that.showSend = false;
						}
						this.msgtype = 1;
						this.toBottom()
						return;
					},
					fail: (err) => {
						that.openSocket();
					},
				})
			},
			openSocket() {
				uni.closeSocket();
				uni.connectSocket({
					url: this.$base.wssUrl,
					success: (res) => {
						console.log("....websocket正在连接");
					},
					fail: (error) => {
						console.log(error);
					}
				});
			},
			//缓存
			cacheData(data) {
				let that = this;
				//如果存在跟当前用户的聊天记录
				if (uni.getStorageSync(data.uid + "_" + that.userId)) {
					let msgList = uni.getStorageSync(data.uid + "_" + that.userId); //获得聊天记录
					msgList.push(data); //将新的数据缓存进去
					that.msgList = msgList;
					uni.setStorageSync(data.uid + "_" + that.userId, msgList);
				} else {
					let msgList = [];
					msgList.push(data);
					that.msgList = msgList;
					uni.setStorageSync(data.uid + "_" + that.userId, msgList);
				}
			},
			//获取缓存中的聊天记录
			getFriendCache() {
				let that = this;
				let dataList = uni.getStorageSync(this.friendId + "_" + that.userId) || [];
				let recordid = 0;
				if (dataList.length > 0) recordid = dataList[dataList.length - 1].recordid;
				//这里
				let msguuid;
				if (dataList.length > 0) {
					msguuid = dataList[dataList.length - 1].msguuid;
				} else {
					msguuid = uni.getStorageSync(this.friendId + "_" + this.userId + "_lastuuid")
				}
				that.utils.tools
					.luch_get("/index/Index/getfnewg", {
						userId: that.userId,
						friendid: that.friendId,
						recordid,
						msguuid,
					}).then((res) => {
						if (res.length > 0) {
							res.forEach((item) => {
								let filename = "";
								if (item.msgtype == 4) {
									console.log('enter---------');
									let content = item.content;
									item.content = content.split("?")[0];
									try {
										filename = content.split("?")[1].replace("filename=", "");
									} catch (e) {}
								}
								let data = {
									uid: item.sender,
									msg: item.content,
									userName: item.sender_xm,
									recordid: item.recordid,
									avatar: item.sender_avtar,
									msgtype: item.msgtype,
									filename,
									msguuid: item.msguuid
								};
								try {
									if (!dataList.find(item => data.msguuid == item.msguuid)) {
										dataList.push(data);
									}
								} catch (e) {}
							});
							that.msgList.push(...dataList);
							// console.log("非缓存的好友消息", that.msgList);
							that.recordid = that.msgList[that.msgList.length - 1].recordid * 1;
							uni.setStorageSync(that.friendId + "_" + that.userId, that.msgList);
						} else {
							// console.log('走缓存');
							that.msgList =
								uni.getStorageSync(that.friendId + "_" + that.userId) || [];
							// console.log("缓存消息内容", that.msgList);
							if (that.msgList.length) {
								// 记录条数
								that.recordid =
									that.msgList[that.msgList.length - 1].recordid * 1;
							}
						}
					});
				// recordid
			},
			returnToBack() {
				uni.closeSocket();
				uni.reLaunch({
					url: "../index/index?userId=" + this.userId,
				});
			},
			openList() {
				this.clickRightTop = !this.clickRightTop;

			},
			//定位底部
			scrollToBottom() {
				let view = uni.createSelectorQuery().in(this).select("#scrollview");
				view
					.fields({
							size: true,
							scrollOffset: true,
						},
						(data) => {
							this.scrollTop = data.scrollHeight;

						}
					)
					.exec();
			},

			/*****************************预览方法*******************************************/
			//图片预览
			pieview(url) {
				// 预览图片
				let arr = [];
				arr.push(url);
				uni.previewImage({
					urls: arr,
					longPressActions: {
						itemList: ["保存图片"],
					},
				});
			},
			//视频预览
			pieVideoView(url) {
				this.videoContext = uni.createVideoContext("video_play");
				// 进入全屏状态
				this.videoContext.requestFullScreen();
			},
			/************************************************************************/
			//选择更多文件
			addMore() {
				if (this.showPopup) {
					this.showPopup = false;
					this.focus = true;
				} else {
					this.showPopup = true;
				}
				this.tipsShow = false;
				this.emojiShow = false;
			},
			// 点击语音喇叭
			/* dotYuyin() {
				return;
				this.yuyinAndTxt = !this.yuyinAndTxt; //更改状态
				// 当切回输入文本时，输入框获得焦点
				if (this.yuyinAndTxt) {
					this.inputText();
				}
			}, */
			// 按住按钮
			/* yuYinStart(e) {
				this.overlay = true;
				this.my_keyboard_show = false;
				// 获取按下按钮时的坐标
				this.startX = e.touches[0].pageX;
				this.startY = e.touches[0].pageY;
			}, */
			// 松开语音按钮
			/* yuYinEnd() {
				this.overlay = false;
				this.my_keyboard_show = true;
				this.needCancel; //判断是否发送语音
			}, */
			//移动手指时触发，用来计算手指的滑动距离；
			/* yuYinMove(e) {
				//移动时的手指坐标e.touches[0].pageX,e.touches[0].pageY
				if (
					this.startX - e.touches[0].pageX > 14 &&
					this.startY - e.touches[0].pageY > 50
				) {
					this.needCancel = true;
					console.log("取消发送语音");
				} else {
					this.needCancel = false;
					console.log("发送语音");
				}
			}, */
		},
	};
</script>

<style scoped>
	.app {
		position: relative;
	}

	.header {
		position: fixed;
		top: 0;
		width: 100%;
		height: 20vw;
		display: flex;
		justify-content: space-between;
		align-items: center;
		z-index: 9999;
		background: #ffffff;
	}

	.header .return {
		width: 80rpx;
		height: 80rpx;

		/* #ifdef APP-PLUS */
		margin-top: 60rpx;
		/* #endif */

		background: url(@/static/img/back.png);
		background-size: cover;
		margin-left: 40rpx;
	}

	/* #ifdef APP-PLUS */
	.header .title,
	.header .info {
		margin-top: 60rpx;
	}

	/* #endif */
	.header .info {
		width: 80rpx;
		height: 80rpx;
		background: url(@/static/img/more.png);
		background-size: cover;
		margin-right: 40rpx;
		position: relative;
	}

	.header .info .openList {
		position: fixed;
		top: 150rpx;
		right: 18rpx;
		width: 422rpx;
		height: 252rpx;
		background: #FFFFFF;
		box-shadow: 0px 2px 28px 1px rgb(0 0 0 / 16%);
		border-radius: 60rpx;
		font-size: 32rpx;
		font-weight: bold;
		color: #22345E;
		text-align: center;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		flex-direction: column;

	}

	.header .info .openList .openListText {
		font-weight: bold;
		width: 100%;
		display: inline-block;
		padding: 10px 0;
	}

	.header .info .openList .openListText:nth-of-type(2) {
		border-bottom: 1px solid #F2F5F8;
		border-top: 1px solid #F2F5F8;
	}

	.msg_list {
		width: 730rpx;
		margin-left: 10rpx;
		margin-top: 20rpx;
	}

	/*好友发送的消息*/
	.msg {
		min-height: 80rpx;
		display: flex;
		font-size: 22rpx;
		align-items: flex-start;
	}

	.msg img {
		max-width: 400rpx;
	}

	.msg .info {
		margin-left: 10rpx;
	}

	.msg .msg_info {
		max-width: 450rpx;
		background: #e2e6ec;
		border-radius: 34rpx 34rpx 34rpx 0;
		padding: 26rpx 18rpx 18rpx 40rpx;
		font-size: 28rpx;
		color: #22345e;
		margin-left: 40rpx;
		word-break: break-word;
	}

	/*我发的消息*/
	.my_msg {
		min-height: 80rpx;
		display: flex;
		flex-direction: row-reverse;
		font-size: 24rpx;
		align-items: flex-start;
	}

	.my_msg .msg_info {
		max-width: 450rpx;
		background: #4578d1;
		border-radius: 40rpx 40rpx 0 40rpx;
		padding: 26rpx 40rpx 18rpx 28rpx;
		font-size: 28rpx;
		color: #ffffff;
		margin-right: 40rpx;
		word-break: break-word;
	}

	.my_msg img {
		max-width: 400rpx;
	}

	.my_keyboard {
		position: fixed;
		bottom: 0;
		width: 750rpx;
		display: flex;
		flex-wrap: wrap;
		/* padding-top: 28rpx; */
		border-top: 1rpx solid rgba(220, 220, 220);
		background: #ffffff;
		z-index: 999;
	}

	/* 按住语音时 */
	.my_keyboard_show {
		width: 100vw;
		height: 400rpx;
		position: fixed;
		bottom: 0;
		background: #ffffff;
		background: #f4f4f4;
	}

	.send_class {
		width: 750rpx;
		height: 120rpx;
		display: flex;
		align-items: center;
		background: #ffffff;
	}

	.function {
		width: 100vw;
		height: 24vh;
		box-sizing: border-box;
		background: #f7f7f7;
		/* 高斯模糊毛玻璃效果 */
		filter: blur(undefinedpx);
		display: flex;
		flex-wrap: wrap;
	}

	.function .info {
		width: 130rpx;
		text-align: center;
		margin-top: 50rpx;
		font-size: 28rpx;
		/* 		display: flex;
		justify-content: center;
		align-items: center; */
	}

	.function .info image {
		width: 108rpx;
		height: 108rpx;
		margin-bottom: 8rpx;
		margin: 0 auto;
	}

	.block {
		width: 120rpx;
		height: 160rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.block view {
		min-width: 120rpx;
		text-align: left;
		display: flex;
		justify-content: center;
		padding-bottom: 10rpx;
		margin: 0;
		padding: 0;
	}

	.viewBlock {
		/* margin-top: -8rpx !important; */
	}

	.info1 {
		margin-left: 42rpx;
	}

	.info2 {
		margin-left: 78rpx;
	}

	/* 语音 */
	.yuyin {
		width: 52rpx;
		height: 52rpx;
		background: url(@/static/img/language.png);
		background-size: cover;
		margin-left: 40rpx;
	}

	/* 键盘 */
	.jianPan {
		width: 52rpx;
		height: 52rpx;
		background: url(@/static/imgs/msginfo/jianPan.png);
		background-size: cover;
		margin-left: 40rpx;
	}

	.input,
	.button {
		width: 460rpx;
		height: 80rpx;
		margin-left: 12rpx;
		margin-top: 10rpx;
		padding-left: 30rpx;
		margin-bottom: 10rpx;
		border-radius: 15rpx;
		background: #f2f5f8;
		color: gray;
		font-size: 40rpx;
	}

	/* 输入文本框 */
	.input {
		height: 10vw;
	}

	/* 按钮 */
	.button {
		line-height: 80rpx;
		text-align: center;
	}

	.my_keyboard {
		overflow: hidden;
	}

	.my_keyboard .face {
		width: 62rpx;
		height: 62rpx;
		background: url("@/static/img/bq.png");
		background-size: cover;
		margin-left: 22rpx;
	}

	.my_keyboard .add {
		width: 52rpx;
		height: 52rpx;
		background: url("@/static/img/add.png");
		background-size: cover;
		margin-left: 10rpx;
	}

	.send {
		width: 38rpx;
		height: 28rpx;
		background: url("@/static/img/send.png");
		background-size: cover;
		margin-left: 20rpx;
	}

	.my_scroll {
		/* position: fixed; */
		/* margin-top: 180rpx; */
	}

	/*overlay说语音时的遮罩层*/
	.overlay {
		width: 100vw;
		min-height: 400rpx;
		position: fixed;
		bottom: 0;
	}

	/* 弯弯的块 */
	.border {
		width: 100vw;
		height: 250rpx;
		position: fixed;
		bottom: 0;
		border-radius: 200rpx 200rpx 0 0;
		background-image: linear-gradient(#bfc3bf, #e1e3e1);
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.shengYing {
		width: 80rpx;
		height: 80rpx;
	}

	/* 松开发送 */
	.p {
		text-align: center;
		color: #fff;
		font-size: 30rpx;
	}

	/* 松开发送的位置表示 */
	.tool {
		display: flex;
		justify-content: space-around;
	}

	/* 松开取消 */
	.error {
		width: 100rpx;
		height: 100rpx;
	}

	/* video视频展示 */
	.video {
		width: 400rpx;
		height: 300rpx;
	}

	/* video文件展示 */
	.logo {}

	/* 文件展示 */
	.fileClassImage {
		width: 350rpx;
		height: 104rpx;
		display: flex;
		justify-content: space-between;
		border: 1rpx solid rgba(0, 0, 0, 0.1);
		padding: 10rpx;
		border-radius: 15rpx;
	}

	.fileName {
		color: #333;
		font-size: 26rpx;
		display: flex;
		align-items: center;
		padding: 0 10rpx;
		width: 272rpx;
		line-height: 50rpx;
		color: gray;
		/* 自动换行 */
		word-break: break-all;
		display: -webkit-box;
		/* //显示4行内容 */

		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		box-orient: vertical;
		overflow: hidden;
	}

	.fileClassImage image {
		width: 78rpx;
		height: 104rpx;
	}

	/* 20220715 jiajia start */
	.tips {
		width: 100px;
		height: 65px;
		position: absolute;
		z-index: 999;
		border-radius: 15px;
		background: white;
		color: #5f6c80;
		padding: 10px 5px;
		display: flex;
		align-items: center;
		justify-content: space-around;
		box-shadow: 0px 0px 4px 2px rgb(0 0 0 / 10%);
		flex-direction: column;
	}

	.tips.newHeight {
		height: 45px !important;
	}

	.tips text {
		padding: 10px 0;
		display: inline-block;
		width: 100%;
		text-align: center;
	}

	.tips text:nth-of-type(1) {
		border-bottom: 2rpx solid #f8f7fa;
	}

	.tips text:nth-of-type(1).hidden {
		border: 0;
	}

	.tips .subscript {
		display: inline-block;
		position: absolute;
		left: 50%;
		bottom: 0;
		width: 10px;
		height: 10px;
		transform: translate(-50%, 50%) rotate(135deg);
		background: white;
		z-index: -1;
		box-shadow: 3px -4px 6px -1px rgb(0 0 0 / 10%);
	}

	.tips .subscript.leftActive {
		left: 70% !important;
	}

	.tips .subscript.rightActive {
		left: 30% !important;
	}

	.tips .subscript.topActive {
		box-shadow: 0px 6px 6px -1px rgb(0 0 0 / 10%);
		top: -10px !important;
	}

	#scrollview {
		padding-bottom: 2vw;
		box-sizing: border-box;
	}

	.showImage {
		position: fixed;
		background-color: rgba(0, 0, 0, .5);
		width: 100vw;
		height: 100vh;
		top: 0;
		left: 0;
		z-index: 9999;
	}

	.showImage .centent_box {
		width: 350rpx;
		background-color: white;
		border-radius: 16rpx;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		padding: 30rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.showImage image {
		width: 350rpx;
		height: 350rpx;
	}

	.showImage .detail {
		margin-top: 20rpx;
	}

	.honbao {
		margin-left: 46rpx;
		margin-top: 0 !important;
	}
</style>
